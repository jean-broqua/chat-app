const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080
const publicDirectotyPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectotyPath))

io.on('connection', (socket) => {
  console.log('New socket connection')

  socket.emit('message', 'Welcome')

  socket.broadcast.emit('message', 'A new users has joined.')

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      // eslint-disable-next-line node/no-callback-literal
      return callback('Profanity is not allowed')
    }

    io.emit('message', message)
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'locationMessage',
      `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
    )
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left')
  })
})

server.listen(port, () => {
  console.log(`Running on port ${port}`)
})
