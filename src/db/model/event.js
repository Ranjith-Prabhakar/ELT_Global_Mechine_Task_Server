const { mongoose, Schema } = require('mongoose')

const eventSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
}, {
  timestamps: true
})

const eventModel = mongoose.model("event", eventSchema)
module.exports = eventModel