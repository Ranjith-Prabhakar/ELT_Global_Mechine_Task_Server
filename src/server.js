const express = require('express')
const { mongoDb } = require('./db/connection')
const expressApp = require('./expressApp')
const dotEnv = require('dotenv')
dotEnv.config()

function start() {
  let PORT = process.env.PORT
  console.log(PORT)
  const app = express()
  mongoDb()
  expressApp(app)
  app.listen(PORT, () => console.log("server connected",PORT))
}
start()