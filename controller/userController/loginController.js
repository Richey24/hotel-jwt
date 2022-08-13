const { User } = require("../../schema");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    let validate = user.password === req.body.password;
    if (validate) {
      const { password, ...mainUser } = user._doc;
      if (mainUser.role === "0") mainUser.role = "Employee";
      if (mainUser.role === "1") mainUser.role = "Customer";
      //signing jwt
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
        expiresIn: "90d",
      });
      mainUser.token = token;
      res.status(200).json(mainUser);
    } else {
      res.status(203).json({ message: "incorrect password" });
    }
  } else {
    res.status(404).json({ message: "no user found with this email" });
  }
};

module.exports = loginController;
