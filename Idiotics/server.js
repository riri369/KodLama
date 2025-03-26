const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Handle real-time tracking
  socket.on('trackDriver', async ({ start, end }) => {
    try {
      const osrmURL = `http://localhost:5000/route/v1/driving/${start};${end}?overview=full&geometries=geojson`;
      const response = await axios.get(osrmURL);
      const route = response.data.routes[0];
      
      // Emit route data
      socket.emit('routeData', route);

      // Simulate live driver movement
      let index = 0;
      const interval = setInterval(() => {
        if (index >= route.geometry.coordinates.length) {
          clearInterval(interval);
        } else {
          const coord = route.geometry.coordinates[index];
          socket.emit('driverLocation', { lat: coord[1], lng: coord[0] });
          index++;
        }
      }, 1000);
    } catch (error) {
      console.error('Error fetching route:', error.message);
      socket.emit('error', { message: 'Failed to fetch route' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
