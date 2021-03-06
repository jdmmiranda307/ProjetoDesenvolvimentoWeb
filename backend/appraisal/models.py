from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from student.models import *
# Create your models here.

class Measures(models.Model):
    chest          = models.DecimalField(max_digits=6, decimal_places=2)
    waist          = models.DecimalField(max_digits=6, decimal_places=2)
    abdomen        = models.DecimalField(max_digits=6, decimal_places=2)
    hip            = models.DecimalField(max_digits=6, decimal_places=2)
    thigh          = models.DecimalField(max_digits=6, decimal_places=2)
    proximal_thigh = models.DecimalField(max_digits=6, decimal_places=2)
    calf           = models.DecimalField(max_digits=6, decimal_places=2)
    relaxed_arm    = models.DecimalField(max_digits=6, decimal_places=2)
    arm_contracted = models.DecimalField(max_digits=6, decimal_places=2)
    forearm        = models.DecimalField(max_digits=6, decimal_places=2)
    fist           = models.DecimalField(max_digits=6, decimal_places=2)

class SkinFolds(models.Model):
    biceps      = models.DecimalField(max_digits=6, decimal_places=2)
    triceps     = models.DecimalField(max_digits=6, decimal_places=2)
    abdominal   = models.DecimalField(max_digits=6, decimal_places=2)
    axillary    = models.DecimalField(max_digits=6, decimal_places=2)
    suprailiac  = models.DecimalField(max_digits=6, decimal_places=2)
    subscapular = models.DecimalField(max_digits=6, decimal_places=2)
    chest       = models.DecimalField(max_digits=6, decimal_places=2)
    thigh       = models.DecimalField(max_digits=6, decimal_places=2)
    medial_calf = models.DecimalField(max_digits=6, decimal_places=2)

class Appraisal(models.Model):
    date       = models.DateField()
    weight     = models.DecimalField(max_digits=6, decimal_places=2)
    height     = models.DecimalField(max_digits=6, decimal_places=2)
    body_fat   = models.DecimalField(max_digits=6, decimal_places=2)
    measures   = models.ForeignKey(Measures, related_name='appraisals', on_delete=models.CASCADE)
    skin_folds = models.ForeignKey(SkinFolds, related_name='appraisals', on_delete=models.CASCADE)
    student    = models.ForeignKey(Student, related_name='appraisals', on_delete=models.CASCADE)
