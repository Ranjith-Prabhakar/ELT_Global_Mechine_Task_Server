const EventRepository = require("../db/repository/eventRepository");
const UserRepository = require("../db/repository/userRepository");
const { createToken } = require("../utils/jwt");
const dotEnv = require('dotenv')
dotEnv.config()
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
class UserService {
  constructor() {
    this.usetRepository = new UserRepository();
    this.eventRepository = new EventRepository();
  }

  async SignUp({ name, email, password, selectedRole }) {
    try {
      const response = await this.usetRepository.SignUp({ name, email, password, selectedRole })
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async Login({ email, password }) {
    try {
      const response = await this.usetRepository.Login({ email, password })
      const token = createToken(response.user._id.toString(), process.env.JWT_SECRET)
      response.token = token
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async CreateEvent(data) {
    try {
      const response = await this.eventRepository.CreateEvent(data)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async GetEvents(data, userId) {
    try {
      console.log("/GetEvents ser", data, userId)
      const response = await this.eventRepository.GetEvents(data, userId)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async AddBookedEvents(courseId, userId) {
    try {
      const response = await this.usetRepository.AddBookedEvents(courseId, userId)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }


}

module.exports = UserService