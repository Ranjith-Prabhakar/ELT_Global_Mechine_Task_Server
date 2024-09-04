const eventModel = require("../model/event")

class EventRepository {
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

  async GetEvents(data) {
    try {
      console.log("getEvent repo")
      let { rowCount, pageCount, total } = data
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      if (total === "0") {
        total = await eventModel.find({
          date: { $gte: sevenDaysAgo }
        }).countDocuments();
      }
      let start = (parseInt(pageCount) - 1) * parseInt(rowCount);

      let result = await eventModel.find({
        date: { $gte: sevenDaysAgo }
      }).sort({ date: 1 }).skip(start).limit(parseInt(rowCount)).populate("instructor");

      console.log("getEvent repo", result)

      if (result) {
        return { status: 200, message: "event created successfully", data: result }
      } else {
        return { status: 500, message: "something went wrong, please try again" }
      }

    } catch (error) {
      console.log(error.message)
    }
  }

}


module.exports = EventRepository