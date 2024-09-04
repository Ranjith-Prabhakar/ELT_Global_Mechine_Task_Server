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
}

module.exports = UserRepository