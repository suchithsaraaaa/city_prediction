import requests
import sys

def check_url(url, name):
    try:
        response = requests.get(url)
        print(f"✅ {name} is UP ({url})")
        print(f"   Status Code: {response.status_code}")
        print(f"   Headers: {response.headers['content-type']}\n")
        return True
    except requests.exceptions.ConnectionError:
        print(f"❌ {name} is DOWN ({url})\n")
        return False
    except Exception as e:
        print(f"⚠️ {name} Error: {e}\n")
        return False

print("--- DRY RUN INTEGRATION CHECK ---\n")

backend_up = check_url("http://127.0.0.1:8000/api/cities/", "Backend (Cities API)")
backend_growth_up = check_url("http://127.0.0.1:8000/api/predictions/", "Backend (Predictions API)")
frontend_up = check_url("http://localhost:8080", "Frontend")

if backend_up and frontend_up:
    print("🎉 INTEGRATION SUCCESSFUL: Both services are running and reachable.")
else:
    print("nm INTEGRATION ISSUES DETECTED: Check the logs above.")
