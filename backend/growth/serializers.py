from rest_framework import serializers
from .models import City, InfrastructureFeature, CityGrowthPrediction

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['id', 'name', 'state', 'country', 'latitude', 'longitude', 'population']

class InfrastructureSerializer(serializers.ModelSerializer):
    city = CitySerializer()

    class Meta:
        model = InfrastructureFeature
        fields = "__all__"

class CityGrowthPredictionSerializer(serializers.ModelSerializer):
    city = CitySerializer()
    class Meta:
        model = CityGrowthPrediction
        fields = ['city', 'growth_score', 'predicted_growth', 'livability_score',
                  'livability_growth', 'gdp_current', 'gdp_growth_rate',
                  'positive_factors', 'negative_factors', 'crime_rate',
                  'traffic_index', 'aqi', 'historic_growth']