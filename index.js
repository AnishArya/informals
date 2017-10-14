/*
  Date                ~> 14 - Oct - 2017
  Author              ~> Anish Budhiraja Arya
  Timestamp           ~> 9 : 44 : 00
  Average Complexity  ~> 3 Everything is cool
*/
//==================Declaring Variables=====================//
let app  = require('express')();//Creates app to be an express app
let http = require('http').Server(app);//Http Server Object //This initilizes app to be a function handler that u can supply to a HTTP Server
let io = require('socket.io')(http);//initialize a new instance of socket.io by passing the http (the HTTP server) object. 
const PORT = process.env.PORT || 3001;
//==========================================================//

//Home Page Route
app.get('/', (req, res)=>{
    console.log("Everythin' is goin' in right direction.");
    res.sendFile(__dirname + '/index.html');//Renders the html page
    
});


//listen on the connection event for incoming sockets
//The event gets fired when we get a new connection
io.on('connection', (socket)=>{//socket is a listener, and is an instance of SocketIO.Socket
  console.log('A new user is connected.');

  console.log("==============================================");

  //if you refresh a tab user will be disconnected by below function
  socket.on('disconnect', ()=> {
    console.log("user diconnected");
    console.log("==============================================");
  });

  //print out the chat message event:
  socket.on('chat message', (msg)=>{
    console.log(msg);
    //send the message to everyone, including the sender.
    io.emit('chat message', msg)
  });
  
});// io.on


//make server listen to something
http.listen(PORT, (err)=>{
  if(err) {
    console.log("Something went wrong with server startup");
  } else {
    console.log("Server is listening to port : " + PORT);
  }
});

