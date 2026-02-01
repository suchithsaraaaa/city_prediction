from django.urls import path
from .views import get_cities, get_infrastructure, get_predictions, get_news

urlpatterns = [
    path("cities/", get_cities, name="get_cities"),
    path("infrastructure/<int:city_id>/", get_infrastructure, name="get_infrastructure"),
    path("predictions/", get_predictions, name="get_predictions"),
    path("news/", get_news, name="get_news"),
]
