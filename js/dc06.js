const lat = 36.67223784553413
const long = -4.463975945693906
// Initialize the map
var map = L.map('map').setView([lat, long], 15);

// Add the base map layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Set marker
var marker = L.marker([lat, long]).addTo(map);

// Create a polygon
var polygon = L.polygon([
    [36.673024046201505, -4.465263579890948],
    [36.671804200574826, -4.465866556724065],
    [36.67099697775605, -4.465290183328906],
    [36.670541208725005, -4.463831029676877],
    [36.67137293740408, -4.462206448703096],
    [36.67249729705682, -4.463727333062882]
]).addTo(map);

// Add popups to the marker and polygon
marker.bindPopup("Yacimiento fenicio de Cerro del Villar").openPopup();
polygon.bindPopup("Cerro del Villar Archaeological site");