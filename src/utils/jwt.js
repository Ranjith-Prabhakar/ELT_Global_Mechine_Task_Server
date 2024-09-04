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

exports.verifyToken = function (token, secret) {
  try {
    let ruff ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDgwZGRhZjY3YmZlMDM4YmZlNGY1MSIsImlhdCI6MTcyNTQ1ODI0MiwiZXhwIjoxNzI1NDY1NDQyfQ.k-Qgzxt5fU8BG_Eo5T3gBP4R3Xe3fH8C54sd6u6wT6s"
    console.log("token", token);
    console.log("token length", token.length);
    let newNoken = token.replace(/\s+/g, '');

    console.log("token length after trim", newNoken.length);
    console.log("ruff length", ruff.length)
    console.log("equal check", token === ruff)
    const user = jwt.verify(ruff, secret);
    console.log("user", user);
    return user;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    throw error; 
  }
};
