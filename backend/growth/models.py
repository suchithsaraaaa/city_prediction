from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default="India")
    population = models.IntegerField(default=0)
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return self.name


class InfrastructureFeature(models.Model):
    city = models.OneToOneField(City, on_delete=models.CASCADE)
    nodes = models.IntegerField()
    edges = models.IntegerField()
    avg_degree = models.FloatField()
    intersections = models.IntegerField()
    infrastructure_index = models.FloatField()

    def __str__(self):
        return f"{self.city.name} Infrastructure"


class CityGrowthPrediction(models.Model):
    city = models.OneToOneField(City, on_delete=models.CASCADE)
    growth_score = models.FloatField()
    predicted_growth = models.FloatField()
    livability_score = models.FloatField(default=5.0)
    livability_growth = models.FloatField(default=0.0)
    gdp_current = models.FloatField(default=0.0) # in billions
    gdp_growth_rate = models.FloatField(default=0.0) # percentage
    crime_rate = models.FloatField(default=0.0) # per 100k
    traffic_index = models.FloatField(default=0.0) # 0-10
    aqi = models.IntegerField(default=100) # 0-500
    historic_growth = models.JSONField(default=list) # [{year: 2020, growth: 5.5}, ...]
    positive_factors = models.JSONField(default=list)
    negative_factors = models.JSONField(default=list)

    def __str__(self):
        return f"{self.city.name} Growth Prediction"
