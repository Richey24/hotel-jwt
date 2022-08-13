const { User } = require("../../schema");

const deleteCustomer = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  try {
    const msg = await User.findByIdAndDelete(req.params.id, { new: true });
    res.status(200).json(msg);
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteCustomer;
