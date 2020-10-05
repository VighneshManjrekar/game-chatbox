var socket = io.connect('http://localhost:7030')

var message = document.getElementById('msg-box')
var data = document.querySelector('.msg')

const append = (m, p) => {
    var msg = document.createElement('div')
    msg.innerHTML = m
    msg.classList.add('m')
    msg.classList.add(p)
    data.append(msg)
}

var name = prompt('Enter Your name to join the chat : ')
socket.emit('new-user', name)
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'center')
})
socket.on('recieve', msgs => {
    append(`${msgs.name} : ${msgs.message}`, 'rec')
})

function send() {
    const mesg = message.value
    append(`You : ${mesg}`, 'send')
    socket.emit('send', mesg)
    message.value = ''
}

message.addEventListener('keypress', function(event){
    if (event.keyCode === 13){
        event.preventDefault()
        send()
    }
})
