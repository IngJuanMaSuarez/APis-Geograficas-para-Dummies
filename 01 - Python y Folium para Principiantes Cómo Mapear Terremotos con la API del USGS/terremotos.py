import requests
import folium

url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson"
respuesta = requests.get(url)
terremotos = respuesta.json()

mapa = folium.Map(location=(0, 0), zoom_start=2)

for terremoto in terremotos["features"]:
    coordenadas = terremoto["geometry"]["coordinates"]
    lugar = terremoto["properties"]["place"]
    magnitude = terremoto["properties"]["mag"]

    folium.Marker(
        location = [coordenadas[1], coordenadas[0]],
        popup = f"Lugar: {lugar}, Magnitud: {magnitude}",
    ).add_to(mapa)

mapa.save("terremotos.html")