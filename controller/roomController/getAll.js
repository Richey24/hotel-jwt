const { Room } = require("../../schema");

const getAllRoomsController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  try {
    let rooms = await Room.find();
    let count = await Room.count({});
    res
      .status(200)
      .json({
        status: true,
        count: count,
        message: "Room successfully fetched!",
        rooms,
      });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = getAllRoomsController;
