const axios = require('axios')

const apiKey = "pk.99b11b386bdb98032e2484cebf760601"
const url = `https://us1.locationiq.com/v1/directions/driving/-0.12393465,51.511693;-0.12012071,51.514335?key=${apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full&`

axios.get(url)
    .then(response => {
        console.log(response.data)
    })