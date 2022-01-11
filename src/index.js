const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080
const publicDirectotyPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectotyPath))

io.on('connection', (socket) => {
  console.log('New socket connection')

  socket.on('join', ({ username, room }) => {
    socket.join(room)
    socket.emit('message', generateMessage('Bem vindo!'))
    socket.broadcast
      .to(room)
      .emit('message', generateMessage(`${username} entrou na sala.`))
  })

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      // eslint-disable-next-line node/no-callback-literal
      return callback('Profanity is not allowed')
    }

    io.to().emit('message', generateMessage(message))
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit(
      'locationMessage',
      generateLocationMessage(
        `https://google.com/maps?q=${coords.latitude},${coords.longitude}`
      )
    )
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left'))
  })
})

server.listen(port, () => {
  console.log(`Running on port ${port}`)
})
