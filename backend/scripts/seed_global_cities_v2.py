import os
import sys
import django
import random
import wikipedia
from geopy.geocoders import Nominatim
import time

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from growth.models import City, CityGrowthPrediction

# --- GLOBAL CONFIGURATION ---
# Base GDP Per Capita (USD)
GDP_PER_CAPITA = {
    "India": 2800,
    "USA": 80000,
    "UK": 46000,
    "France": 44000,
    "Germany": 51000,
    "Australia": 62000,
    "Canada": 53000,
    "Japan": 34000
}

# Regional Multipliers (Urban centres are wealthier)
URBAN_MULTIPLIER = 1.8 

GLOBAL_CITIES = [
    # --- USA (50 Cities) ---
    {"name": "New York City", "state": "New York", "country": "USA"},
    {"name": "Los Angeles", "state": "California", "country": "USA"},
    {"name": "Chicago", "state": "Illinois", "country": "USA"},
    {"name": "Houston", "state": "Texas", "country": "USA"},
    {"name": "Phoenix", "state": "Arizona", "country": "USA"},
    {"name": "Philadelphia", "state": "Pennsylvania", "country": "USA"},
    {"name": "San Antonio", "state": "Texas", "country": "USA"},
    {"name": "San Diego", "state": "California", "country": "USA"},
    {"name": "Dallas", "state": "Texas", "country": "USA"},
    {"name": "San Jose", "state": "California", "country": "USA"},
    {"name": "Austin", "state": "Texas", "country": "USA"},
    {"name": "Jacksonville", "state": "Florida", "country": "USA"},
    {"name": "Fort Worth", "state": "Texas", "country": "USA"},
    {"name": "Columbus", "state": "Ohio", "country": "USA"},
    {"name": "Indianapolis", "state": "Indiana", "country": "USA"},
    {"name": "Charlotte", "state": "North Carolina", "country": "USA"},
    {"name": "San Francisco", "state": "California", "country": "USA"},
    {"name": "Seattle", "state": "Washington", "country": "USA"},
    {"name": "Denver", "state": "Colorado", "country": "USA"},
    {"name": "Washington D.C.", "state": "District of Columbia", "country": "USA"},
    {"name": "Boston", "state": "Massachusetts", "country": "USA"},
    {"name": "El Paso", "state": "Texas", "country": "USA"},
    {"name": "Nashville", "state": "Tennessee", "country": "USA"},
    {"name": "Detroit", "state": "Michigan", "country": "USA"},
    {"name": "Oklahoma City", "state": "Oklahoma", "country": "USA"},
    {"name": "Portland", "state": "Oregon", "country": "USA"},
    {"name": "Las Vegas", "state": "Nevada", "country": "USA"},
    {"name": "Memphis", "state": "Tennessee", "country": "USA"},
    {"name": "Louisville", "state": "Kentucky", "country": "USA"},
    {"name": "Baltimore", "state": "Maryland", "country": "USA"},
    {"name": "Milwaukee", "state": "Wisconsin", "country": "USA"},
    {"name": "Albuquerque", "state": "New Mexico", "country": "USA"},
    {"name": "Tucson", "state": "Arizona", "country": "USA"},
    {"name": "Fresno", "state": "California", "country": "USA"},
    {"name": "Mesa", "state": "Arizona", "country": "USA"},
    {"name": "Sacramento", "state": "California", "country": "USA"},
    {"name": "Atlanta", "state": "Georgia", "country": "USA"},
    {"name": "Kansas City", "state": "Missouri", "country": "USA"},
    {"name": "Colorado Springs", "state": "Colorado", "country": "USA"},
    {"name": "Miami", "state": "Florida", "country": "USA"},
    {"name": "Raleigh", "state": "North Carolina", "country": "USA"},
    {"name": "Omaha", "state": "Nebraska", "country": "USA"},
    {"name": "Oakland", "state": "California", "country": "USA"},
    {"name": "Minneapolis", "state": "Minnesota", "country": "USA"},
    {"name": "Tulsa", "state": "Oklahoma", "country": "USA"},
    {"name": "Wichita", "state": "Kansas", "country": "USA"},
    {"name": "New Orleans", "state": "Louisiana", "country": "USA"},
    {"name": "Arlington", "state": "Texas", "country": "USA"},
    {"name": "Cleveland", "state": "Ohio", "country": "USA"},
    {"name": "Bakersfield", "state": "California", "country": "USA"},

    # --- EUROPE (50 Cities) ---
    {"name": "London", "state": "England", "country": "UK"},
    {"name": "Berlin", "state": "Berlin", "country": "Germany"},
    {"name": "Madrid", "state": "Madrid", "country": "Spain"},
    {"name": "Rome", "state": "Lazio", "country": "Italy"},
    {"name": "Paris", "state": "Ile-de-France", "country": "France"},
    {"name": "Bucharest", "state": "Bucharest", "country": "Romania"},
    {"name": "Vienna", "state": "Vienna", "country": "Austria"},
    {"name": "Hamburg", "state": "Hamburg", "country": "Germany"},
    {"name": "Warsaw", "state": "Masovian", "country": "Poland"},
    {"name": "Budapest", "state": "Central Hungary", "country": "Hungary"},
    {"name": "Barcelona", "state": "Catalonia", "country": "Spain"},
    {"name": "Munich", "state": "Bavaria", "country": "Germany"},
    {"name": "Milan", "state": "Lombardy", "country": "Italy"},
    {"name": "Prague", "state": "Prague", "country": "Czech Republic"},
    {"name": "Sofia", "state": "Sofia", "country": "Bulgaria"},
    {"name": "Brussels", "state": "Brussels", "country": "Belgium"},
    {"name": "Birmingham", "state": "England", "country": "UK"},
    {"name": "Cologne", "state": "North Rhine-Westphalia", "country": "Germany"},
    {"name": "Naples", "state": "Campania", "country": "Italy"},
    {"name": "Stockholm", "state": "Stockholm", "country": "Sweden"},
    {"name": "Turin", "state": "Piedmont", "country": "Italy"},
    {"name": "Marseille", "state": "Provence-Alpes-Cote d'Azur", "country": "France"},
    {"name": "Amsterdam", "state": "North Holland", "country": "Netherlands"},
    {"name": "Zagreb", "state": "Zagreb", "country": "Croatia"},
    {"name": "Valencia", "state": "Valencia", "country": "Spain"},
    {"name": "Leeds", "state": "England", "country": "UK"},
    {"name": "Krakow", "state": "Lesser Poland", "country": "Poland"},
    {"name": "Frankfurt", "state": "Hesse", "country": "Germany"},
    {"name": "Oslo", "state": "Oslo", "country": "Norway"},
    {"name": "Helsinki", "state": "Uusimaa", "country": "Finland"},
    {"name": "Copenhagen", "state": "Capital Region", "country": "Denmark"},
    {"name": "Athens", "state": "Attica", "country": "Greece"},
    {"name": "Dublin", "state": "Leinster", "country": "Ireland"},
    {"name": "Lisbon", "state": "Lisbon", "country": "Portugal"},
    {"name": "Manchester", "state": "England", "country": "UK"},
    {"name": "Lyon", "state": "Auvergne-Rhone-Alpes", "country": "France"},
    {"name": "Zurich", "state": "Zurich", "country": "Switzerland"},
    {"name": "Stuttgart", "state": "Baden-Wurttemberg", "country": "Germany"},
    {"name": "Rotterdam", "state": "South Holland", "country": "Netherlands"},
    {"name": "Dortmund", "state": "North Rhine-Westphalia", "country": "Germany"},
    {"name": "Essen", "state": "North Rhine-Westphalia", "country": "Germany"},
    {"name": "Dusseldorf", "state": "North Rhine-Westphalia", "country": "Germany"},
    {"name": "Genoa", "state": "Liguria", "country": "Italy"},
    {"name": "Glasgow", "state": "Scotland", "country": "UK"},
    {"name": "Gothenburg", "state": "Vastra Gotaland", "country": "Sweden"},
    {"name": "Hanover", "state": "Lower Saxony", "country": "Germany"},
    {"name": "Leipzig", "state": "Saxony", "country": "Germany"},
    {"name": "Antwerp", "state": "Antwerp", "country": "Belgium"},
    {"name": "Edinburgh", "state": "Scotland", "country": "UK"},
    {"name": "Liverpool", "state": "England", "country": "UK"},
    
    # --- Oceania (Expanded) ---
    {"name": "Sydney", "state": "New South Wales", "country": "Australia"},
    {"name": "Melbourne", "state": "Victoria", "country": "Australia"},
    {"name": "Brisbane", "state": "Queensland", "country": "Australia"},
    {"name": "Perth", "state": "Western Australia", "country": "Australia"},
    {"name": "Adelaide", "state": "South Australia", "country": "Australia"},
    {"name": "Auckland", "state": "Auckland", "country": "New Zealand"},
    {"name": "Wellington", "state": "Wellington", "country": "New Zealand"},
    
    # --- Asia Keys (Japan) ---
    {"name": "Tokyo", "state": "Tokyo", "country": "Japan"},
    {"name": "Osaka", "state": "Osaka", "country": "Japan"},
]

def seed_global_data():
    geolocator = Nominatim(user_agent="city_growth_global_v2")

    for city_data in GLOBAL_CITIES:
        name = city_data["name"]
        country = city_data["country"]
        
        print(f"Processing {name}, {country}...")
        
        # 1. Fetch Location
        try:
            location = geolocator.geocode(f"{name}, {country}")
            if not location:
                print(f"   Skipping {name}: Location not found.")
                continue
            lat, lon = location.latitude, location.longitude
        except Exception as e:
            print(f"   Error fetching location: {e}")
            continue

        # 2. Fetch Population (Wikipedia)
        try:
            # Simple heuristic: try to find population in wiki summary or default
            wiki_page = wikipedia.page(f"{name}, {country}")
            # Very rough estimate if parsing fails
            population = 2000000 
            if "population" in wiki_page.summary:
                pass # Advanced parsing is hard, using placeholder with random variance for demo
            
            # Simulated Population based on tier
            if name in ["New York City", "Tokyo", "London"]:
                population = random.randint(8000000, 14000000)
            elif name in ["Los Angeles", "Paris", "Sydney", "Toronto"]:
                population = random.randint(4000000, 7000000)
            else:
                population = random.randint(1500000, 3500000)

        except:
            population = 1000000 # Fallback

        # 3. Create/Update City
        city_obj, created = City.objects.get_or_create(
            name=name,
            defaults={
                "state": city_data["state"],
                "country": country,
                "latitude": lat,
                "longitude": lon,
                "population": population
            }
        )
        if not created:
            city_obj.country = country
            city_obj.population = population
            city_obj.save()

        # 4. Generate Advanced Metrics
        # Economic Logic
        base_gdp_per_capita = GDP_PER_CAPITA.get(country, 20000)
        city_gdp_total = (population * base_gdp_per_capita * URBAN_MULTIPLIER) / 1000000000 # Billions
        
        # Regional Baselines
        if country in ["India"]:
            crime_base = 50; traffic_base = 8.5; aqi_base = 150
        elif country in ["USA"]:
            crime_base = 60; traffic_base = 7.5; aqi_base = 45
        elif country in ["UK", "France", "Germany", "Canada", "Australia"]:
            crime_base = 40; traffic_base = 6.0; aqi_base = 25
        elif country in ["Japan"]:
            crime_base = 20; traffic_base = 7.0; aqi_base = 30
        else:
            crime_base = 50; traffic_base = 7.0; aqi_base = 50

        # Calculate Growth Score (Simple weighted average)
        gdp_growth_rate = round(random.uniform(1.5, 4.0), 2)
        crime_rate = round(crime_base + random.uniform(-10, 10), 1)
        traffic_index = round(min(10, traffic_base + random.uniform(-1, 1)), 1)
        aqi = int(aqi_base + random.uniform(-10, 20))

        # GDP (+) Traffic (-) Crime (-) AQI (-)
        raw_score = 5.0 + (gdp_growth_rate * 0.5) - (traffic_index * 0.2)
        if aqi < 50: raw_score += 1.0
        
        growth_score = round(min(10, max(1, raw_score)), 2)
        predicted_growth = round(growth_score * 0.8, 2) # % growth

        # Generate History
        history = []
        simulated_growth = predicted_growth
        current_gdp_val = city_gdp_total
        for year in range(2019, 2025):
             simulated_growth += random.uniform(-0.2, 0.3)
             est_gdp = city_gdp_total / (pow(1.02, 2025-year))
             history.append({"year": year, "growth_rate": round(max(0, simulated_growth), 2), "gdp": round(est_gdp, 2)})
        
        # Determine Factors
        positive_factors = ["Economy"] if gdp_growth_rate > 2.5 else []
        if aqi < 50: positive_factors.append("Clean Air")
        if crime_rate < 30: positive_factors.append("Safety")
        
        negative_factors = []
        if traffic_index > 8: negative_factors.append("High Traffic")
        if crime_rate > 60: negative_factors.append("Crime Rate")

        # Create/Update Prediction safely
        pred, created = CityGrowthPrediction.objects.update_or_create(
            city=city_obj,
            defaults={
                "gdp_current": round(city_gdp_total, 2),
                "gdp_growth_rate": gdp_growth_rate,
                "crime_rate": crime_rate,
                "traffic_index": traffic_index,
                "aqi": aqi,
                "growth_score": growth_score,
                "predicted_growth": predicted_growth,
                "historic_growth": history,
                "positive_factors": positive_factors,
                "negative_factors": negative_factors
            }
        )
        
        print(f"   -> GDP: ${pred.gdp_current}B | Growth: {pred.growth_score}/10")

if __name__ == "__main__":
    seed_global_data()
