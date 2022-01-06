/* eslint-disable no-undef */
const socket = io()

socket.on('message', (message) => {
  console.log(message)
})
