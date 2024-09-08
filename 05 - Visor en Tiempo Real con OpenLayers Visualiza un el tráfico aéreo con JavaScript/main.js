import './style.css';
import {Map, View} from 'ol';
import { Geometry } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { useGeographic } from 'ol/proj';

useGeographic()

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});

let vueloLayer;

function visualizarDatos(){

  fetch('https://opensky-network.org/api/states/all')
  .then((response) => response.json())
  .then((data) => {
    
    let vuelos = data.states

    if(vueloLayer){
      map.removeLayer(vueloLayer)
    }
    
    const markers = vuelos.map(vuelo => {
      const [icao24, callsign, origin_country, time_position, last_contact, longitude, latitude, baro_altitude, on_ground, velocity] = vuelo

      const feature = new Feature({
        geometry: new Point([longitude, latitude]),
        icao24,
        callsign,
        origin_country,
        time_position,
        last_contact,
        baro_altitude,
        on_ground,
        velocity
      });

      return feature

    });

    const vectorSource = new VectorSource({
      features: markers
    });

    vueloLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vueloLayer);

  })
}

map.on('click', function(event){
  map.forEachFeatureAtPixel(event.pixel, function(feature){
    alert(`Se hizo clic en el vuelo: ${feature.get('callsign')}`)
  })
})

visualizarDatos()
setInterval(visualizarDatos, 10000)