const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Serve a test route
app.get('/', (req, res) => {
  res.send("Chat app backend is running!");
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for messages
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data); // Broadcast the message
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

