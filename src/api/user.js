const UserService = require("../service/userService");

module.exports = (app) => {
  const service = new UserService();

  app.post("/signup", async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      console.log(name, email, password)
      const data  = await service.SignUp({ name, email, password });
      return res.status(data.status).json(data);
    } catch (err) {
      next(err);
    }
  });

  app.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });
};
