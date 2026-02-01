import os
import sys
import django

# 👉 ADD PROJECT ROOT TO PYTHON PATH
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(BASE_DIR)

# 👉 SET DJANGO SETTINGS
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

import osmnx as ox
import networkx as nx

from growth.models import City, InfrastructureFeature
def compute_infra_features(city):
    place = f"{city.name}, India"
    print(f"Downloading OSM data for {place}")

    G = ox.graph_from_place(place, network_type="drive")
    G = G.to_undirected()

    nodes = G.number_of_nodes()
    edges = G.number_of_edges()

    avg_degree = sum(dict(G.degree()).values()) / nodes
    intersections = len([n for n, d in G.degree() if d >= 3])

    infra_index = (
        0.4 * (edges / nodes) +
        0.4 * avg_degree +
        0.2 * (intersections / nodes)
    )

    InfrastructureFeature.objects.update_or_create(
        city=city,
        defaults={
            "nodes": nodes,
            "edges": edges,
            "avg_degree": avg_degree,
            "intersections": intersections,
            "infrastructure_index": infra_index,
        }
    )

    print(f"Saved infrastructure for {city.name}")

# Run for all cities
for city in City.objects.all():
    compute_infra_features(city)
