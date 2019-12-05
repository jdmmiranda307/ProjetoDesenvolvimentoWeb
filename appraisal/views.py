# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from .models import *
from .serializers import *
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend

class AppraisalViewSet(viewsets.ModelViewSet):
    queryset = Appraisal.objects.all()
    serializer_class = AppraisalSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['student']

class SkinFoldViewSet(viewsets.ModelViewSet):
    queryset = SkinFolds.objects.all()
    serializer_class = SkinFoldsSerializer

    def list(self, request, *args, **kwargs):
        try:
            status_code = status.HTTP_404_NOT_FOUND
            data = {"detail": "Não encontrado."}
            appraisal = Appraisal.objects.filter(id=kwargs["appraisals_pk"]).last()
            if appraisal and hasattr(appraisal, 'skin_folds'):
                    serializer = SkinFoldsSerializer(appraisal.skin_folds)
                    data = serializer.data
                    status_code = status.HTTP_200_OK
            return Response(data, status=status_code)

        except AttributeError as e:
            return Response({'msg':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MeasureViewSet(viewsets.ModelViewSet):
    queryset = Measures.objects.all()
    serializer_class = MeasuresSerializer

    def list(self, request, *args, **kwargs):
        try:
            status_code = status.HTTP_404_NOT_FOUND
            data = {"detail": "Não encontrado."}
            appraisal = Appraisal.objects.filter(id=kwargs["appraisals_pk"]).last()
            if appraisal and hasattr(appraisal, 'measures'):
                    serializer = MeasuresSerializer(appraisal.measures)
                    data = serializer.data
                    status_code = status.HTTP_200_OK
            return Response(data, status=status_code)

        except AttributeError as e:
            return Response({'msg':str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)