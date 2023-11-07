import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role:{
    type:String,
    default:"user"
  }
});

const employeeModel = mongoose.model("employees", employeeSchema);

export default employeeModel; // Corrected export statement
