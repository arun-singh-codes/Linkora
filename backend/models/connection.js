import mongoose from "mongoose";
import { Schema } from "mongoose";
const connectionSchema = new mongoose.Schema({

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },


  
});

const Connection = new mongoose.model("Connection", connectionSchema);
export default Connection;







  // userId : {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User"
  // },

  // connectionId:{
  //     type:mongoose.Schema.Types.ObjectId,
  //     ref :"User"

  // },

  // status_accepted :{
  //     type: Boolean ,
  //     default :   null
  // }

