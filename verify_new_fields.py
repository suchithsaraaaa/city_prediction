import requests
import json

try:
    response = requests.get("http://127.0.0.1:8000/api/predictions/")
    data = response.json()
    if len(data) > 0:
        print("✅ Received Prediction Data")
        
        # Check specific cities to verify tier logic
        cities_to_check = ["Mumbai", "Indore", "Jaipur"]
        
        for p in data:
            name = p['city']['name']
            if name in cities_to_check:
                print(f"\nCity: {name}")
                print(f"   GDP: ${p.get('gdp_current')}B")
                print(f"   Crime Rate: {p.get('crime_rate')} /100k")
                print(f"   Traffic Index: {p.get('traffic_index')}/10")
                print(f"   AQI: {p.get('aqi')}")
                
        # General check for new fields
        first_pred = data[0]
        if 'crime_rate' in first_pred and 'traffic_index' in first_pred:
             print("\n🎉 SUCCESS: Crime and Traffic fields are present.")
        else:
             print("\n❌ FAILURE: New fields are MISSING.")
    else:
        print("⚠️ No predictions found.")
except Exception as e:
    print(f"Error: {e}")
