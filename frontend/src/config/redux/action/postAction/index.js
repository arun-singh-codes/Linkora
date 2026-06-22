import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";

export const getAllPosts = createAsyncThunk(
  "/posts",
  async (action, thunkAPI) => {
    try {
      const response = await clientServer.get("/post/posts");
      return response.data.posts;
    } catch (err) {
      return err.response.data;
    }
  },
);



export const deletePost = createAsyncThunk(
  "/post/deletePost",
  async (postId, thunkAPI) => {
    try {
      const response = await clientServer.delete(`/post/deletePost/${postId}`);
      return response.data.post;
    } catch (err) {
      return err.response.data;
    }
  },
);

export const togglePostLike = createAsyncThunk(
  "/post/togglePostLike",
  async (postId, thunkAPI) => {
    try {
      const response = await clientServer.patch(
        `/post/togglePostLike/${postId}`,
      );
      return response.data.populatedPost;
    } catch (err) {
      return err.response.data;
    }
  },
);

export const commmentOnPost = createAsyncThunk(
  "/comment/commentOnPost",
  async ({ postId, commentBody }, thunkAPI) => {
    try {
      const response = await clientServer.post(
        `/comment/commentOnPost/${postId}`,
        { commentBody },
      );
      return response.data.comment;
    } catch (err) {
      return err.response.data;
    }
  },
);

export const createPost = createAsyncThunk(
  "/post/createPost",
  async (postData, thunkAPI) => {
    try {
      const formData = new FormData(); /// sue Formdata object because files cannot be sent in normal JSON format.
      formData.append("body", postData.postContent);
      formData.append("media", postData.uploadedFile);

      const response = await clientServer.post("/post/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      return response.data.post;
    } catch (err) {
      console.log(err.response.data);
    }
  },
);

export const getAllCommentsOnPost = createAsyncThunk(
  "/comment/getAllCommentsOfPost",
  async (postId, thunkAPI) => {
    try {
      const response = await clientServer.get(
        `/comment/getAllCommentsOfPost/${postId}`,
      );
      return response.data.comments;
    } catch (err) {
      return err.response.data;
    }
  },
);
