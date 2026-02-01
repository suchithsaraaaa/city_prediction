import os
import sys
import django
import random
import numpy as np
from sklearn.ensemble import RandomForestRegressor

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from growth.models import City, InfrastructureFeature, CityGrowthPrediction

# Reformatted Logic to use CityGrowthPrediction data + Infrastructure
# This script assumes seed_cities.py has run and populated basic metrics.

# Fetch all cities
cities = City.objects.all()

X = []
y = []
training_cities = []

for city in cities:
    # 1. Get Infrastructure Features
    try:
        infra = city.infrastructurefeature
    except:
        # If missing, skip or create default (should exist from seed)
        continue

    # 2. Get Existing Prediction Metrics (seeded by seed_cities.py)
    try:
        pred_obj = city.citygrowthprediction
    except:
        continue

    # 3. Create Feature Vector
    # We combine physical infrastructure with Quality of Life metrics
    features = [
        infra.nodes,
        infra.edges,
        infra.infrastructure_index,
        pred_obj.gdp_current,    # Economic Base
        pred_obj.traffic_index,  # Negative Driver
        pred_obj.crime_rate,     # Negative Driver
        pred_obj.aqi             # Negative Driver
    ]
    
    X.append(features)
    training_cities.append(city)

    # 4. Define "Ground Truth" (y) -> Growth Score
    # Growth is complex:
    # + Positive: Infra Index, GDP (high base can convert to stability or growth)
    # - Negative: High Traffic, High Crime, High AQI (Pollution)
    
    # Normalized Factors
    norm_infra = infra.infrastructure_index * 2.0  # (0-2 roughly)
    norm_gdp = min(2.0, pred_obj.gdp_current / 50.0) # Cap impact of massive GDP
    norm_traffic = pred_obj.traffic_index / 10.0   # 0-1
    norm_crime = min(1.0, pred_obj.crime_rate / 800.0) # 0-1
    norm_aqi = min(1.0, pred_obj.aqi / 300.0)      # 0-1
    
    # Base Growth Potential
    # Good Infra + Money = Growth
    growth_potential = (norm_infra * 4.0) + (norm_gdp * 2.0)
    
    # Drag Factors
    # Traffic/Crime slow things down
    drag = (norm_traffic * 2.5) + (norm_crime * 1.5) + (norm_aqi * 1.0)
    
    # Final Score (tuned to be typically 1.0 to 9.0)
    final_score = max(1.0, min(9.5, 3.0 + growth_potential - drag))
    
    # Add some randomness for "market volatility"
    chaos = random.uniform(-0.5, 0.5)
    y.append(final_score + chaos)

X = np.array(X)
y = np.array(y)

# Train Random Forest
if len(X) > 0:
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    predicted_growths = model.predict(X)

    print(f"--- Updating Predictions for {len(training_cities)} Cities ---")

    for i, city in enumerate(training_cities):
        pred_obj = city.citygrowthprediction
        
        # Update Scores
        pred_obj.growth_score = round(y[i], 2)
        pred_obj.predicted_growth = round(predicted_growths[i], 2)
        
        # Recalculate Positive/Negative Factors based on the FULL PICTURE
        pos = []
        neg = []
        
        if pred_obj.gdp_growth_rate > 6.0: pos.append("High Economic Velocity")
        if city.population > 5000000: pos.append("Large Talent Pool")
        if city.infrastructurefeature.infrastructure_index > 0.8: pos.append("Robost Infrastructure")
        if pred_obj.traffic_index < 5.0: pos.append("Efficient Commute (Low Traffic)")
        
        if pred_obj.traffic_index > 8.0: neg.append("Severe Traffic Bottlenecks")
        if pred_obj.crime_rate > 400: neg.append("Safety Concerns")
        if pred_obj.aqi > 150: neg.append("Environmental Stress")
        if pred_obj.predicted_growth < 3.0: neg.append("Stagnation Risk")
        
        pred_obj.positive_factors = pos
        pred_obj.negative_factors = neg
        
        pred_obj.save()
        print(f"   {city.name}: Growth {pred_obj.predicted_growth}, GDP ${pred_obj.gdp_current}B")

print("✅ Global ML Model Trained & Applied")
