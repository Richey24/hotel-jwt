const { Booking } = require("../../schema");

const updateBookingController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  if (!req.params.id) {
    res
      .status(203)
      .json({
        message:
          "send the id of the booking you wish to update in the request parameter",
      });
  } else {
    const room = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(room);
  }
};

module.exports = updateBookingController;
