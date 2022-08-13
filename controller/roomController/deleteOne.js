const { Room } = require("../../schema");

const deleteRoomController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { roomNum } = req.params;
  if (roomNum) {
    Room.findByIdAndDelete(roomNum)
      .then(() => {
        res.status(200).json({ status: true, message: "Room deleted!" });
      })
      .catch((err) => {
        res.status(200).json({ status: false, message: err });
      });
  } else {
    res.status(403).json({ message: "valid params required" });
  }
};

module.exports = deleteRoomController;
