# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from .models import *
from .serializers import *
from django.shortcuts import render

# Create your views here.

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class MeasuresViewSet(viewsets.ModelViewSet):
    queryset = Measures.objects.all()
    serializer_class = MeasuresSerializer

class SkinFoldsViewSet(viewsets.ModelViewSet):
    queryset = SkinFolds.objects.all()
    serializer_class = SkinFoldsSerializer

class AppraisalViewSet(viewsets.ModelViewSet):
    queryset = SkinFolds.objects.all()
    serializer_class = SkinFoldsSerializer
