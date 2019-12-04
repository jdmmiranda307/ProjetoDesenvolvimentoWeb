from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class MeasuresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Measures
        fields = '__all__'

class SkinFoldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkinFolds
        fields = '__all__'

class AppraisalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appraisal
        fields = '__all__'