import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Post from "../models/posts.model.js";

export const activeCheck = async (req, res) => {
  return res.status(200).json({ message: "RUNNING" });
};

const createPost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const dummy = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(dummy.id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = new Post({
      userId: user.id,
      body: req.body.body,
      filename: req.file ? req.file.originalname : "",
      media: req.file ? req.file.path : "",
      fileType: req.file != undefined ? req.file.mimetype.split("/")[1] : "",
    });
    console.log(req.file);
    const savedPost = await post.save();

    // ✅ THEN populate
    const populatedPost = await Post.findById(savedPost._id).populate(
      "userId",
      "name username email profilePicture active",
    );

    return res
      .status(201)
      .json({ message: "Post Created", post: populatedPost });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate(
      "userId",
      "name username email profilePicture",
    );

    return res.status(200).json({ posts: allPosts });
  } catch (err) {
    return res.status(500).json({ message: "Error in getting all posts" });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const togglePostLike = async (req, res) => {
  try {
    console.log("Toggling like for post ID:", req.params.id);
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    const decodedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.likedBy.includes(decodedUser.id)) {
      post.likes -= 1;
      post.likedBy = post.likedBy.filter(
        (userId) => userId.toString() !== decodedUser.id.toString(),
      );
    } else {
      post.likes += 1;
      post.likedBy.push(decodedUser.id);
    }

    await post.save();
    const populatedPost = await Post.findById({ _id: post._id }).populate(
      "userId",
      "name username email profilePicture",
    );
    return res.status(200).json({ populatedPost });
  } catch (err) {
    res.status(500).json({ message: err.message });
    // console.log(err);
  }
};

const postsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find({
      userId: userId,
    }).populate(
      "userId",
      "name username email profilePicture"
    );

    return res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Posts not found",
    });
  }
};

export { createPost, getAllPosts, deletePost, togglePostLike , postsByUserId };
