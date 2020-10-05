const express = require('express')
const socket = require('socket.io')

var app = express()
var port = process.env.PORT || 7030

var server = app.listen(port)

app.use(express.static('public'))

var io = socket(server)
const users = []

io.on('connection', socket => {

    socket.on('new-user', name => {
        console.log(`${name} joined`)
        users[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })

    socket.on('send', mesg => {
        socket.broadcast.emit('recieve', { message: mesg, name: users[socket.id] })
    })
})