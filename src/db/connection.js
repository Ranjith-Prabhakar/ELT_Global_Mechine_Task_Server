const mongoose = require('mongoose')
const { DB_URL } = require('../config/config')
exports.mongoDb = function () {
  mongoose.connect(DB_URL)
    .then((data) => { console.log("db connected") })
    .catch(err => console.log("error while db connecting :", err.message))
}
