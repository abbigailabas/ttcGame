// Include our libraries
var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var express = require('express');
var router = express();
var server = http.createServer(router);
var io = socketio.listen(server);
// Use router to point requests to the 'client' folder 
router.use(express.static(path.resolve(__dirname, 'client')));
// Variables to hold the messages and the sockets
var messages = [];
var sockets = [];
io.on('connection', function (socket) {
    console.log('a user connected');
    
    //Listen for the event from the sensor.html
    socket.on('exitScreen', function (data1) {
        io.emit('exitScreen', data1);

    });
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
// Start our server
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
    var addr = server.address();
    console.log("Our server is listening at", addr.address + ":" + addr.port);
});