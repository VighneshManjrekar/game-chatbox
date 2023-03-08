window.addEventListener("DOMContentLoaded", () => {
    var socket = io.connect('https://arcade-games-mix-chat.glitch.me/')
    document.addEventListener('contextmenu', event => event.preventDefault())
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
    if (name == null || name == "") {
        while (name == null || name == "") {
            name = prompt("Enter your name : ")
        }
        execute()
    } else {
        execute()
    }
    function execute() {
        document.getElementById("send-btn").addEventListener("click", send)
        socket.emit('new-user', name)
        socket.on('user-joined', name => {
            append(`${name} joined the chat`, 'center')
        })
        socket.on('recieve', msgs => {
            append(`${msgs.name} : ${msgs.message}`, 'rec')
        })
        function send() {
            const mesg = message.value
            if(mesg != null && mesg != ""){
                append(`You : ${mesg}`, 'send')
                socket.emit('send', mesg)
                message.value = ''
            }else{
                alert("Enter something to send!!")
            }
        }
        message.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                event.preventDefault()
                send()
            }
        })
    }
})