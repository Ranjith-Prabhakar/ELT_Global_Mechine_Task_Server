const eventModel = require("../model/event")
const userModel = require("../model/user")

class UserRepository {
  async SignUp(data) {
    try {
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

  async  AddBookedEvents(courseId, userId) {
  try {
    let updatedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { bookedEvents: courseId } },
      { new: true } 
    );

    if (updatedUser) {
      return { status: 201, message: "Event has been added", data: updatedUser };
    } else {
      return { status: 400, message: "User not found or event already booked" };
    }
  } catch (error) {
    console.log(error.message);
    return { status: 500, message: "An error occurred" };
  }
}


}


module.exports = UserRepository