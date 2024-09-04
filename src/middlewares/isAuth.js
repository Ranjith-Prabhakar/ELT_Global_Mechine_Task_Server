const UserRepository = require("../db/repository/userRepository")
const { verifyToken } = require("../utils/jwt")
const dotEnv = require('dotenv')
dotEnv.config()
exports.isAuth = async function (req, res, next) {
  try {
    let userRepo = new UserRepository()
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header is missing or malformed' });
    }

    const token = authHeader.split(' ')[1];


    const userId = verifyToken(token, process.env.JWT_SECRET).id;
    console.log("userId", userId);
    let user = await userRepo.findById(userId)
    req.user = user

    next();
  } catch (error) {
    console.log("errrr");
    console.log(error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
}
