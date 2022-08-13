const { Booking } = require("../../schema");

const getAllBookingController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const room = await Booking.find({});
  const count = await Booking.count({});
  res.status(200).json({ count: count, room });
};

module.exports = getAllBookingController;
