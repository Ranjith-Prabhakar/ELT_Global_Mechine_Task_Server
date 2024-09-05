const jwt = require('jsonwebtoken');

exports.createToken = function (payload, secret) {
  try {
    const token = jwt.sign({ id: payload }, secret, { expiresIn: '24h' });
    console.log("Generated Token:", token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};

exports.verifyToken = function (token, secret) {
  try {
    const user = jwt.verify(token, secret);
    return user;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw error;
  }
};
