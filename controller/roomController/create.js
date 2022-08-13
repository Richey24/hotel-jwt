const { Room } = require("../../schema");

const createRoomController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { roomNum, isAvailable, price, cusId, category } = req.body;
  let check = await Room.findOne({ roomNum: roomNum });
  if (!check) {
    try {
      let room = await Room.create({
        roomNum,
        isAvailable: isAvailable,
        price,
        category,
      });
      res
        .status(200)
        .json({ status: true, message: "Room successfully created", room });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  } else {
    res.status(403).json({ message: "already created" });
  }
};

module.exports = createRoomController;
