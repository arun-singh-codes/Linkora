import mongoose from "mongoose";
import {Schema} from "mongoose";

const postSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    } ,
    body:{
        type: String,
        required: true
    },
    likes:{
        type: Number ,
        default : 0
    },
    createdAt:{
        type : Date , 
        default : Date.now
    },
    media:{
        type:String ,
        default: '',
        filename:String
    }
    ,
    active:{
        type: Boolean,
        default: true
    },
    fileType:{
        type : String , 
        default: ''
    },

    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Comment"
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }

    
})

const Post = mongoose.model("Post" , postSchema);

export default Post;