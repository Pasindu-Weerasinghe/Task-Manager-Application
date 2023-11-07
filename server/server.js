import express, { response } from "express";
import mongoose from "mongoose";
import cors from "cors";
//import employeeModel from "./model/employee.js";
import userModel from "./model/user.js";
import bcrypt, { hash } from "bcrypt";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import auth from "./middleware/auth.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(cookieParser());
mongoose.connect("mongodb://localhost:27017/employee");

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      userModel
        .create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err.message));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const userPayload = {
            id: user.id,
            username: user.name,
            role:user.role
          };

          const accessToken = Jwt.sign(userPayload, process.env.TOKEN_KEY, {
            expiresIn: "1h",
          });
          res.cookie("accessToken", accessToken);
          res.json({Status:"Success",role:user.role});
        } else {
          res.json("The password is incorrect");
        }
      });
    } else {
      res.json("No record existed");
    }
  });
});

app.get("/admin", auth, (req, res) => {
  return res.json("Success");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
