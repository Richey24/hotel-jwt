const { User } = require("../../schema");

const updateCustomer = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateCustomer;
