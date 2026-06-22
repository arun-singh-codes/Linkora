import Comment from "../models/comments.js";
import Post from "../models/posts.model.js";
export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;
    const commentBody = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = await new Comment({
      postId,
      userId,
      body: commentBody.commentBody,
    });
    const savedComment = await newComment.save();
    post.comments.push(savedComment._id);
    await post.save();
    return res.status(201).json({ comment: savedComment });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = "69bbea173edfac1487f01c19";
    const comments = await Comment.find({ postId: postId }).populate(
      "userId",
      "name profilePicture",
    );
    return res.status(200).json({ comments });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
