const { promisify } = require("util");
const { User } = require("../schema");
const jwt = require("jsonwebtoken");

const restrict = async (req, res, next) => {
  console.log("req.headers.token", req.headers.Authorization);
  try {
    // console.log(req.session)
    const decode = await promisify(jwt.verify)(
      req.headers.token,
      process.env.TOKEN_KEY
    );
    const user = await User.findById(decode.id);
    req.user = user;
  } catch (err) {}

  next();
};

module.exports = restrict;
