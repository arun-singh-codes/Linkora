import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required : true , 
    unique : true
  },

  email:{
    type: String ,
    required :true ,
    unique: true
  },

  active :{
    type:Boolean , 
    required : true ,
    default:true
  },
  password :{
    type: String , 
    required: true
  },

  profilePicture:{
    type: String,
    default:'https://linkora-bvx4.onrender.com/uploads/nouser.jpg'


  },
  createdAt:{
    type: Date, 
    default: Date.now
  },

  token:{
    type:String
  }




});


export const User = mongoose.model("User" ,userSchema); // named export

