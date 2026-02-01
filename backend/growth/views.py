from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    City,
    InfrastructureFeature,
    CityGrowthPrediction
)

from .serializers import (
    CitySerializer,
    InfrastructureSerializer,
    CityGrowthPredictionSerializer
)

from .services.news import fetch_growth_news
from django.http import JsonResponse

# Create your views here.
def get_cities(request):
    cities = City.objects.all()
    serializer = CitySerializer(cities, many=True)
    return JsonResponse(serializer.data, safe=False)

def get_news(request):
    country = request.GET.get('country', 'India')
    news = fetch_growth_news(country)
    return JsonResponse(news, safe=False)


@api_view(['GET'])
def get_infrastructure(request):
    infra = InfrastructureFeature.objects.all()
    serializer = InfrastructureSerializer(infra, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_predictions(request):
    predictions = CityGrowthPrediction.objects.all()
    serializer = CityGrowthPredictionSerializer(predictions, many=True)
    return Response(serializer.data)
