const eventModel = require("../model/event")
const userModel = require("../model/user")

class UserRepository {
  async SignUp(data) {
    try {
      console.log("data repo", data)
      const { email } = data
      const isExist = await userModel.findOne({ email })
      if (isExist) {
        return { status: 400, message: "user with this mail already exist" }
      } else {
        const user = await userModel.create(data)
        await user.save()
        return { status: 201, message: "user created successfully" }
      }
    } catch (error) {

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

  async findById(id) {
    try {
      let result = await userModel.findById(id)
      if (result) return result
      else return { status: 400, message: "user not found" }
    } catch (error) {
      console.log(error.message)
    }
  }

  async CreateEvent(data) {
    try {
      let result = await eventModel.create(data)
      await result.save()
      if (result) {
        return { status: 200, message: "event created successfully" }
      } else {
        return { status: 500, message: "something went wrong, please try again" }
      }

    } catch (error) {
      console.log(error.message)
    }
  }
}


module.exports = UserRepository