const { User } = require("../../schema");

const getCustomer = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  try {
    const user = await User.findOne({ _id: req.params.id });
    const { password, ...mainUser } = user._doc;
    if (mainUser.role === "0") mainUser.role = "Employee";
    if (mainUser.role === "1") mainUser.role = "Customer";
    res.status(200).json(mainUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getCustomer;
