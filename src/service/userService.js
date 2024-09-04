const UserRepository = require("../db/repository/userRepository");

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

    }
  }

  async Login({ email, password }){
    try {
      const response = await this.repository.Login({email, password })
      return response
    } catch (error) {
      
    }
  }
}

module.exports = UserService