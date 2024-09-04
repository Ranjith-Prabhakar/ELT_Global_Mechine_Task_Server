const mongoose = require('mongoose')
const dotEnv = require('dotenv')
dotEnv.config()
exports.mongoDb = function () {
  mongoose.connect(process.env.DB_URL)
    .then((data) => { console.log("db connected") })
    .catch(err => console.log("error while db connecting :", err.message))
}
