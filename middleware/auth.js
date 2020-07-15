const jwt = require("jsonwebtoken");
const config = require("config");

//middleware function is function with access to req /response cycle or objects, next is a callback we run once we are done to moveto next piece of middleware
module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if not token
  if (!token) {
    //401 is not authorized
    return res.status(401).json({ msg: "no token auth denied" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
