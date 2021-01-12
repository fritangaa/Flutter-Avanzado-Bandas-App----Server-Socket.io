const express = require("express");
const path = require("path");
require("dotenv").config();

// App express
const app = express();


//  Node server
const server = require('http').createServer(app);

//exportacion de libreria sockets io
module.exports.io = require('socket.io')(server);

//mensajes de sockets
require("./sockets/socket");



const publicPath = path.resolve( __dirname, "public" );
app.use(express.static(publicPath));



server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', 3000);
});