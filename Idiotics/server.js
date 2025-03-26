const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Driver = require('./models/Driver');


dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust if necessary
  }
});

app.use(express.json());

// Socket.IO Connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Update driver location
    socket.on('updateLocation', async (data) => {
      const { driverId, latitude, longitude } = data;
      await Driver.findByIdAndUpdate(driverId, { latitude, longitude });
      console.log(`Driver ${driverId} location updated to (${latitude}, ${longitude})`);
      io.emit('locationUpdate', { driverId, latitude, longitude }); // Broadcast to all users
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Rideable API!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
