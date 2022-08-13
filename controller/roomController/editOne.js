const { Room } = require("../../schema");

const editOneRoomController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { roomNum } = req.params;
  try {
    let room = await Room.findOneAndUpdate(
      {
        roomNum,
      },
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ status: true, message: "Room Update!", room });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
};

module.exports = editOneRoomController;
