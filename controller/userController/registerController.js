const { User } = require("../../schema");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  if (req.body.role === undefined) {
    res.status(203).json({ message: "please input role" });
    return;
  }

  if (!req.body.name) {
    res.status(203).json({ message: "please input name" });
    return;
  }

  let check = await User.findOne({ email: req.body.email });
  if (!check) {
    let user = await User.create(req.body);
    const { password, ...mainUser } = user._doc;
    if (mainUser.role === "0") mainUser.role = "Employee";
    if (mainUser.role === "1") mainUser.role = "Customer";
    // signing jwt
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY, {
      expiresIn: "90d",
    });
    mainUser.token = token;
    res.status(200).json(mainUser);
  } else {
    res.status(201).json({ message: "already registered" });
  }
};

module.exports = registerController;
