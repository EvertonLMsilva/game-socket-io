const env = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

env.config({path: process.env.NODE_ENV !== 'dev' ? './src/config/.env.prod' : './src/config/.env'})

app.get('/', cors(), (req, res) => {
    res.sendFile(__dirname + '/src/publish/index.html');
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  
server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`listening on http://${process.env.HOST}/${process.env.PORT}`);
});