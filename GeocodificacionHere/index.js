mapboxgl.accessToken = "pk.eyJ1IjoiaW5nanVhbm1hc3VhcmV6IiwiYSI6ImNsZDZjMXJpYTFhdzgzdnBhZXdkczQxcnQifQ.25y1PWrOTW12YssZ73JQtA"
const apiKey = "zqVfiojTFXFJtmVndyEOu8luVqE7LQqWskiQt_ysWDM"
const direccion = "Museo Panoptico, Ibague, Colombia"
const coordenadasLatitud = 6.2524786277415725
const coordenadasLongitud = -75.5735446627675

fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${direccion}&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        latitud =data.items[0].position.lat
        longitud = data.items[0].position.lng

        const mapa = new mapboxgl.Map({
            container: "contenedor-del-mapa",
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-74.12, 4.65],
            zoom: 11
        })

        const marcador = new mapboxgl.Marker({
            color: "green",
            rotation: 45
        }).setLngLat([longitud, latitud]).addTo(mapa)

    })

fetch(`https://revgeocode.search.hereapi.com/v1/revgeocode?at=${coordenadasLatitud},${coordenadasLongitud}&apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
    })