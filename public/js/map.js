let map = L.map("map").setView([16.212, 77.343], 10);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let marker = L.marker([16.212, 77.343]).addTo(map);

marker.bindPopup("<b>Raichur</b>").openPopup();