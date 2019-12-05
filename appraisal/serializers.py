from rest_framework import serializers
from .models import *

class MeasuresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measures
        fields = '__all__'

class SkinFoldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkinFolds
        fields = '__all__'

class AppraisalSerializer(serializers.ModelSerializer):
    skin_folds = SkinFoldsSerializer()
    measures = MeasuresSerializer()
    class Meta:
        model = Appraisal
        fields = '__all__'

    def create(self, validated_data):
        skin_folds = validated_data.pop("skin_folds")
        measures = validated_data.pop("measures")
        skin_folds = SkinFoldsSerializer(data=skin_folds)
        if skin_folds.is_valid():
            skin_folds.save()
        measures = MeasuresSerializer(data=measures)
        if measures.is_valid():
            measures.save()
        appraisal = Appraisal(**validated_data)
        appraisal.skin_folds_id = skin_folds.data["id"]
        appraisal.measures_id = measures.data["id"]
        appraisal.save()
        return appraisal

    def update(self, instance, validated_data):
        if "skin_folds" in validated_data.keys():
            skin_folds = validated_data.pop("skin_folds")
            serializer = SkinFoldsSerializer(instance.skin_folds, data=skin_folds, partial=True)
            if serializer.is_valid():
                serializer.save()
        if "measures" in validated_data.keys():
            measures = validated_data.pop("measures")
            serializer = SkinFoldsSerializer(instance.measures, data=measures, partial=True)
            if serializer.is_valid():
                serializer.save()
        for key in validated_data.keys():
            setattr(instance, key, validated_data[key])
        instance.save()
        return instance
