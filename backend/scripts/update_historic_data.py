import os
import sys
import django
import random

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from growth.models import CityGrowthPrediction

def update_historic_data():
    print("--- Generatig Historic Growth Data (2019-2024) ---")
    
    predictions = CityGrowthPrediction.objects.all()
    
    for pred in predictions:
        print(f"Processing {pred.city.name}...")
        
        # Current (2025) predicted growth is the anchor
        current_growth = pred.predicted_growth
        current_gdp = pred.gdp_current
        
        history = []
        
        # Generate 5 years back
        # Logic: Growth fluctuates but trends towards the current value
        
        # Start "5 years ago"
        simulated_growth = current_growth * random.uniform(0.8, 1.1) 
        
        for year in range(2019, 2025):
            # Variance per year
            simulated_growth = simulated_growth + random.uniform(-0.5, 0.8)
            
            # Ensure not negative unless huge issue (rare)
            simulated_growth = max(0.5, simulated_growth)
            
            # Estimate GDP for that year (retroactively)
            # Roughly: predicted_gdp / (1.05 ^ years_diff)
            years_diff = 2025 - year
            est_gdp = current_gdp / (pow(1.05, years_diff))
            
            history.append({
                "year": year,
                "growth_rate": round(simulated_growth, 2),
                "gdp": round(est_gdp, 2)
            })
            
        pred.historic_growth = history
        pred.save()
        print(f"   Added {len(history)} years of history.")

if __name__ == "__main__":
    update_historic_data()
