const { Services } = require("../../schema");

const getOneServiceController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { id } = req.params;
  try {
    let request = await Services.findById(id).populate("bookings");
    res.status(200).json({ status: true, message: "", request });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
};

module.exports = getOneServiceController;
