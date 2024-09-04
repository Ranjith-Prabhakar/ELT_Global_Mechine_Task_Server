const jwt = require('jsonwebtoken');

exports.createToken = function (payload, secret) {
  try {
    const token = jwt.sign({ id: payload }, secret, { expiresIn: '2h' });
    console.log("Generated Token:", token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};
