const express = require('express');
const app = express();
const socket = require('socket.io');

let port = process.env.PORT || 6900;


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(express.static('public'));

app.set('view engine', 'ejs');


app.use(require('./routes/index'));
app.use(require('./routes/albums'));
app.use(require('./routes/forum'));
app.use(require('./routes/chat'));

let server = app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
})

let io = socket(server)

//listen for client messages

io.on('connection', socket =>{

    socket.on('postMessage', msgClient=>{ //listening for incoming chat messages

        io.emit('updateMessage', msgClient) //broadcasts back out to all the clients
    })
})