const { Services } = require("../../schema");

const deleteService = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { id } = req.params;
  const stat = await Services.findByIdAndDelete(id);
  res.status(200).json(stat);
};

module.exports = deleteService;
