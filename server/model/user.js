import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role:{
    type:String,
    default:"user"
  }
});

const userModel = mongoose.model("user", userSchema);

export default userModel; // Corrected export statement
