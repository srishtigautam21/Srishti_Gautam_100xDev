const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req.headers.authorization;
  //   console.log(req.headers, token);
  const jwtToken = token.split(" ")[1];

  const isValid = jwt.verify(jwtToken, JWT_SECRET);
  //   console.log(isValid, "isValid", jwtToken);
  if (isValid.username) {
    next();
  } else {
    res.json({ msg: "SignIn first" });
  }
}

module.exports = userMiddleware;
