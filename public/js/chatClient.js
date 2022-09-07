
const socket = io('http://localhost:6900'); // access to web socket api

//emit a message to the server

let chatUserName = document.getElementById('chat-username')
let chatMessage = document.getElementById('chat-message')
let chatForm = document.querySelector('form')
let chatDisplay = document.querySelector('.chat-display')


// console.log(chatMessage);
//listen to incoming messages from the server
// {username: ..., message: ...}
socket.on('updateMessage', data =>{

    // console.log(data);
    // console.log(chatUserName.value);

    //create a p tag
    let newMessage = document.createElement('p')

    //style p tag
    if(chatUserName.value === data.username){
        newMessage.className = "bg-success chat-text"
    }
    else{
        newMessage.className = "bg-info chat-text"
    }

    //set the innerHTML for the p tag

    newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`

    //append to the top of all message in chatDisplay

    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild)
})

//emit a message to the server
chatForm.addEventListener('submit', e=>{
    e.preventDefault();

    //send message to the server

    socket.emit('postMessage', {
        username: chatUserName.value,
        message: chatMessage.value
    })
})

