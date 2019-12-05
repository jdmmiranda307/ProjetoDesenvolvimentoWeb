# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
# class Gender(models.Model):
#     description = models.CharField(max_length=9, blank=True, null=True)

#     def __str__(self):
#         return self.description

class Student(models.Model):
    name        = models.CharField(max_length=100)
    birthday    = models.DateField(null=True)
    # gender      = models.ForeignKey(Gender, on_delete=models.CASCADE, related_name='student')

    def __str__(self):
        return self.name

