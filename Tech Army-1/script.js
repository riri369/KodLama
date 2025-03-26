// Initialize map centered on Bhubaneswar
var map = L.map('map').setView([20.2961, 85.8245], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example congestion data for Bhubaneswar
var locations = [
    { lat: 20.2961, lng: 85.8245, congestion: 'High' },
    { lat: 20.3080, lng: 85.8360, congestion: 'Medium' },
    { lat: 20.3155, lng: 85.8078, congestion: 'Low' }
];

locations.forEach(loc => {
    var color = loc.congestion === 'High' ? 'red' : loc.congestion === 'Medium' ? 'orange' : 'green';
    L.circle([loc.lat, loc.lng], {
        color: color,
        fillColor: color,
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
});

// Update congestion status
document.getElementById('congestion-level').innerText = locations[0].congestion;

// Alternative attractions in Bhubaneswar
var alternatives = ['Lingaraj Temple', 'Nandankanan Zoo', 'Udayagiri Caves'];
var suggestionsList = document.getElementById('suggestions');
alternatives.forEach(attraction => {
    var li = document.createElement('li');
    li.textContent = attraction;
    suggestionsList.appendChild(li);
});