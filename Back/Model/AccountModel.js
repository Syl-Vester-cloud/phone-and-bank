
import mongoose from "mongoose";

 const AccountSchema= new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone:{type:Number},
  createdAt: { type: Date, default: Date.now },
});

const AccountModel = mongoose.model("Account", AccountSchema);
export default AccountModel;
