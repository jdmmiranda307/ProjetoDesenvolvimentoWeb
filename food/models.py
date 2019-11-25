# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class MealPlan(models.Model):
    date = models.DateField()
    calories      = models.DecimalField(max_digits=6, decimal_places=2)
    carbohydrates = models.DecimalField(max_digits=6, decimal_places=2)
    proteins      = models.DecimalField(max_digits=6, decimal_places=2)
    fat           = models.DecimalField(max_digits=6, decimal_places=2)

class Food(models.Model):
    name          = models.CharField(max_length=100, blank=True, null=True)
    calories      = models.DecimalField(max_digits=6, decimal_places=2)
    carbohydrates = models.DecimalField(max_digits=6, decimal_places=2)
    proteins      = models.DecimalField(max_digits=6, decimal_places=2)
    fat           = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name

class Meal(models.Model):
    description         = models.CharField(max_length=100, blank=True, null=True)
    total_calories      = models.DecimalField(max_digits=6, decimal_places=2)
    total_carbohydrates = models.DecimalField(max_digits=6, decimal_places=2)
    total_proteins      = models.DecimalField(max_digits=6, decimal_places=2)
    foods               = models.ManyToManyField(Food, through='FoodMeal')
    meal_plan           = models.ForeignKey(MealPlan, related_name='meals', on_delete=models.CASCADE)

    def __str__(str):
        return self.description

class FoodMeal(models.Model):
    food  = models.ForeignKey(Food, on_delete=models.CASCADE)
    meal  = models.ForeignKey(Meal, on_delete=models.CASCADE)
    amout = models.DecimalField(max_digits=6, decimal_places=2)

