const { Services } = require("../../schema");

const createServiceController = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorised, send token" });
    return;
  }
  const { description, status } = req.body;
  if (!description || !status) {
    res.status(203).json({ message: "Send All Required Information" });
  }
  try {
    let service = await Services.create(req.body);
    res.status(200).json({
      status: true,
      message: "Request successfully created",
      service,
    });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
};

module.exports = createServiceController;
