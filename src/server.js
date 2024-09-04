const express = require('express')
const {mongoDb} = require('./db/connection')
const { PORT } = require('./config/config')

function start() {
  const app = express()
  mongoDb()
  app.listen(PORT || 3000, () => console.log("server connected"))
}
start()