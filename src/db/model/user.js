const { mongoose, Schema } = require('mongoose')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  selectedRole: {
    type: String,
    required: true,
  },
  // bookedEvents: [{ type: String }]
  bookedEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "event",
    required: true,
  }]
}, {
  toJSON: {// when the output document convert to the json this transform function will execute
    transform(doc, ret) {
      delete ret.password;
      delete ret.__v;
    }
  },
  timestamps: true
})

const userModel = mongoose.model("user", userSchema)
module.exports = userModel