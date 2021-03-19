var socket = io.connect('https://arcade-games-mix.herokuapp.com/')
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

// var name = prompt('Enter Your name to join the chat : ')
document.addEventListener("DOMContentLoaded",checkCookie())

function checkCookie() {
    var name = getCookie("user")
    if (name != "") {
        socket.emit('new-user',name)
        // alert("Welcome Back!! " + name)
    } else {
        name = prompt("Enter Your Name : ")
        if (name != "" && name !== null) {
            setCookie("user", name, 30)
        }
    }

}

function getCookie(user) {
    var name = user + '='
    var decodedCookie = decodeURIComponent(document.cookie)
    var cookieValues = decodedCookie.split(';')
    for (let i = 0; i < cookieValues.length; i++) {
        var cv = cookieValues[i]
        while (cv.charAt(0) == ' ') {
            cv = cv.substring(1)
        }
        if (cv.indexOf(name) == 0) {
            return cv.substring(name.length, cv.length)
        }
    }
    return ""
}

function setCookie(user, value, days) {
    var d = new Date()
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000))
    var expiry = "expiry=" + d.toGMTString();
    console.log(user)
    console.log(value)
    console.log(expiry)
    document.cookie = `${user}=${value};${expiry};path=/`
    console.log(document.cookie)
}
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
