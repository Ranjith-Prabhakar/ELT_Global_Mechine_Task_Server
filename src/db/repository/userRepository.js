const userModel = require("../model/user")

class UserRepository {
  async SignUp(data) {
    const { email } = data
    const isExist = await userModel.findOne({ email })
    if (isExist) {
      return { status: 400, message: "user with this mail already exist" }
    } else {
      const user = await userModel.create(data)
      await user.save()
      return { status: 201, message: "user created successfully" }
    }
  }

  async Login(data) {
    try {
      let { email, password } = data
      const isExist = await userModel.findOne({ email, password })
      if (isExist) {
        return { status: 200, message: "user fetch successfully", user: isExist }
      } else {
        return { status: 400, message: "invalid credentials", }
      }
    } catch (error) {
      
    }
  }
}

module.exports = UserRepository