var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
// const io = require('socket.io')(http, {
//       cors: {
//         origin: '*',
//       }
//     });

io.on('connection', (socket)=> {
      console.log('User Online');
      socket.on('join-room',room=>{
            console.log(`room joined ${room}`)
            socket.join(room);
      })
      socket.on('canvas-data', (data,room)=> {
            console.log(`${room}`)
            // socket.join(room);
            if(room != ""){
                  console.log("room executed")
                  io.to(room).emit('canvas-data', data);
            }else{
                  console.log("room don't executed")
                  socket.broadcast.emit('canvas-data', data);
            }   
      })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
http.listen(server_port, () => {
    console.log("Started on : "+ server_port);
})