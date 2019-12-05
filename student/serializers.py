from rest_framework import serializers
from appraisal.serializers import *
from .models import *

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Student
        fields = ('id', 'name')
