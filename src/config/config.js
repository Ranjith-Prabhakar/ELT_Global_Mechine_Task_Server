require('dotenv').config()

exports.config = {
  PORT:process.env.PORT,
  DB_URL:process.env.DB_URL
}