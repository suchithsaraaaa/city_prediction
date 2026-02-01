from django.contrib import admin
from .models import City, InfrastructureFeature, CityGrowthPrediction

admin.site.register(City)
admin.site.register(InfrastructureFeature)
admin.site.register(CityGrowthPrediction)
