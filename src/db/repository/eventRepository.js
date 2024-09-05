const eventModel = require("../model/event")
const userModel = require("../model/user")

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

  async GetEvents(data, userId) {
    try {

      let { rowCount, pageCount, total, bookedOnlyEvents } = data
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      let start = (parseInt(pageCount) - 1) * parseInt(rowCount);
      if (bookedOnlyEvents > 0) {
        let result = await userModel
          .findOne({ _id: userId })
          .populate({
            path: 'bookedEvents', // First populate booked events
            match: { date: { $gte: sevenDaysAgo } }, // Filter by date
            select: 'courseName date instructor', // Select fields from event model
            populate: { // Nested population for the 'instructor' inside 'bookedEvents'
              path: 'instructor', // Populate the 'instructor' field
              select: 'name email', // Select fields from user model for instructor
            }
          })
          .exec();

        console.log("/GetEvents bookedOnlyEvents repo result 111", result);

        if (total === 0) {
          total = result.bookedEvents.length
          console.log("total", total)
        }



        console.log("/GetEvents bookedOnlyEvents repo result", result);

        if (!result || !result.bookedEvents) {
          return { status: 500, message: "something went wrong, please try again" }
        }

        // Step 2: Sort, paginate, and limit the bookedEvents array
        const sortedEvents = result.bookedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        const paginatedEvents = sortedEvents.slice(start, start + parseInt(rowCount));


        if (paginatedEvents) {
          return { status: 200, message: "event created successfully", data: paginatedEvents, total }
        } else {
          return { status: 500, message: "something went wrong, please try again" }
        }
      } else {
        if (total === "0") {
          total = await eventModel.find({
            date: { $gte: sevenDaysAgo }
          }).countDocuments();
        }


        let result = await eventModel.find({
          date: { $gte: sevenDaysAgo }
        }).sort({ date: 1 }).skip(start).limit(parseInt(rowCount)).populate("instructor");


        if (result) {
          return { status: 200, message: "event created successfully", data: result, total }
        } else {
          return { status: 500, message: "something went wrong, please try again" }
        }

      }

    } catch (error) {
      console.log(error.message)
    }
  }

}


module.exports = EventRepository