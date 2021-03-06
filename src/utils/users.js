const users = []

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const addUser = ({ id, username, room }) => {
  // Clean the data
  username = username.trim().toLowerCase()

  // Validade the data
  if (!username || !room) {
    return {
      error: 'Nome e sala são obrigatórios'
    }
  }

  // Check for existing user
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username
  })

  // Validade username
  if (existingUser) {
    return {
      error: 'Nome ja esta em uso'
    }
  }

  // Store user
  const color = getRandomColor()
  const user = { id, username, room, color }
  users.push(user)
  return { user }
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room === room)
}

module.exports = { addUser, removeUser, getUsersInRoom, getUser }
