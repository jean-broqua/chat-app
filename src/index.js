const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080
const publicDirectotyPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectotyPath))

io.on('connection', (socket) => {
  console.log('New socket connection')
  socket.emit('message', 'Welcome')
})

server.listen(port, () => {
  console.log(`Running on port ${port}`)
})
