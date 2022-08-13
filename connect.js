const mongoose = require("mongoose");
const { User } = require("./schema");
const express = require("express");
const registerController = require("./controller/userController/registerController");
const loginController = require("./controller/userController/loginController");
const createRoomController = require("./controller/roomController/create");
const dotenv = require("dotenv");
const deleteRoomController = require("./controller/roomController/deleteOne");
const getAllRoomsController = require("./controller/roomController/getAll");
const getOneRoomController = require("./controller/roomController/getOne");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const getCustomer = require("./controller/userController/getCustomer");
const deleteCustomer = require("./controller/userController/deleteCustomer");
const updateCustomer = require("./controller/userController/updateCustomer");
const createBookingController = require("./controller/bookingController/createBooking");
const updateBookingController = require("./controller/bookingController/updateBooking");
const removeBookingController = require("./controller/bookingController/removeBooking");
const refreshController = require("./controller/bookingController/refreshController");
const getAllBookingController = require("./controller/bookingController/getAllBooking");
const getOneBookingController = require("./controller/bookingController/getOneBooking");
const createServiceController = require("./controller/serviceService/create");
const getAllServiceController = require("./controller/serviceService/getAll");
const getOneServiceController = require("./controller/serviceService/getOne");
const editOneServiceController = require("./controller/serviceService/editOne");
const cors = require("cors");
const deleteService = require("./controller/serviceService/deleteService");
const app = express();

//dotenv
dotenv.config({ path: "./environ/.env" });

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(port, () => console.log(`listening at ${port}`));
} catch (error) {
  console.log(error);
}

//JWT RESTRICTION

const restrict = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decode = await promisify(jwt.verify)(
          token,
          process.env.TOKEN_KEY
        );
        const user = await User.findById(decode.id);
        req.user = user;
      } catch (error) {}
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

app.get("/", (req, res) => res.send("hello"));

//USER ROUTES

const userRouter = express.Router();
userRouter
  .get("/get/all", async (req, res) => {
    const user = await User.find({});
    for (let i = 0; i < user.length; i++) {
      if (user[i].role === "0") user[i].role = "Employee";
      if (user[i].role === "1") user[i].role = "Customer";
    }
    const count = await User.count({});
    res.json({ count: count, user });
  })
  .post("/register", registerController)
  .post("/login", loginController)
  .get("/get/:id", restrict, getCustomer)
  .delete("/delete/:id", restrict, deleteCustomer)
  .put("/update/:id", restrict, updateCustomer);

/// FOR HANDING SERVICE REQUEST CREATION WITH AND WITHOUT JWT

const serviceRouter = express.Router();
serviceRouter
  .post("/create", restrict, createServiceController)
  .get("/get/all", restrict, getAllServiceController)
  .get("/get/:id", restrict, getOneServiceController)
  .put("/update/:id", restrict, editOneServiceController)
  .delete("/delete/:id", restrict, deleteService);

//BOOKING ROUTES
const bookRouter = express.Router();
bookRouter
  .get("/get/all", restrict, getAllBookingController)
  .get("/get/:cusId", restrict, getOneBookingController)
  .post("/create", restrict, createBookingController)
  .put("/update/:id", restrict, updateBookingController)
  .delete("/remove/:id", restrict, removeBookingController)
  .get("/refresh", restrict, refreshController);

/// FOR HANDING ROOM CREATION WITH AND WITHOUT JWT
const roomRouter = express.Router();
roomRouter
  .post("/create", restrict, createRoomController)
  .get("/get/all", restrict, getAllRoomsController)
  .get("/get/:roomNum", restrict, getOneRoomController)
  .delete("/delete/:roomNum", restrict, deleteRoomController);

app.use("/room", roomRouter);
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/service", serviceRouter);
