const { isAuth } = require("../middlewares/isAuth");
const UserService = require("../service/userService");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    try {
      console.log("signup", req.body)
      const { name, email, password, selectedRole } = req.body;
      console.log(name, email, password)
      const data = await service.SignUp({ name, email, password, selectedRole });
      return res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await service.Login({ email, password });

      return res.status(data.status).json(data)
    } catch (err) {
      next(err);
    }
  });

  app.post("/createEvent", isAuth, async (req, res, next) => {
    try {
      const { courseName, date } = req.body;
      const data = await service.CreateEvent({ courseName, date, instructor: req.user._id });

      console.log("courseName, date,token  ", courseName, date)
      return res.status(data.status).json(data)
    } catch (err) {
      next(err);
    }
  });

  app.post("/fetchEvents", isAuth, async (req, res, next) => {
    try {
      console.log("inside fetchEvent")
      const data = await service.GetEvents(req.body);

      console.log("fetchEvents-user  ",data)
      return res.status(data.status).json(data)
    } catch (err) {
      next(err);
    }
  });


};
