const UserRepository = require("../db/repository/userRepository");
const { createToken } = require("../utils/jwt");
const dotEnv = require('dotenv')
dotEnv.config()
console.log("process.env.JWT_SECRET", process.env.JWT_SECRET)
class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignUp({ name, email, password, selectedRole }) {
    try {
      console.log("service", name, email, password)
      const response = await this.repository.SignUp({ name, email, password, selectedRole })

      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async Login({ email, password }) {
    try {
      const response = await this.repository.Login({ email, password })
      const token = createToken(response.user._id.toString(), process.env.JWT_SECRET)
      response.token = token
      console.log("Login", response)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async CreateEvent(data) {
    try {
      const response = await this.repository.CreateEvent(data)
      console.log("CreateEvent", response)
      return response
    } catch (error) {
      console.log(error.message)
    }
  }
}

module.exports = UserService