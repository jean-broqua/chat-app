const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 8000
const publicDirectotyPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectotyPath))

app.listen(port, () => {
  console.log(`Running on port ${port}`)
})
