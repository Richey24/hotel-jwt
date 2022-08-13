const { Room, Booking } = require("../../schema");

const createBookingController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { checkInDate, checkOutDate, roomNum, cusId } = req.body;
  const check = await Room.findOne({ roomNum: roomNum });
  if (check.isAvailable === false) {
    res.status(201).json({ message: "Room is already taken" });
    return;
  }
  if (checkInDate && checkOutDate && roomNum && cusId) {
    req.body.checkInDate = new Date(checkInDate);
    req.body.checkOutDate = new Date(checkOutDate);
    const book = await Booking.create(req.body);
    const room = await Room.findOneAndUpdate(
      { roomNum: roomNum },
      {
        isAvailable: false,
        bkId: book._id,
      },
      { new: true }
    );
    await Booking.findByIdAndUpdate(book._id, { category: room.category });
    res.status(200).json({ book, room });
  } else {
    res
      .status(203)
      .json({ message: "please send all the required information" });
  }
};

module.exports = createBookingController;
