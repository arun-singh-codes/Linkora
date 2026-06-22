import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  createPost,
  deletePost,
  togglePostLike,
  getAllCommentsOnPost,
  commmentOnPost
} from "../../action/postAction";

import { updateUserProfilePhoto } from "../../action/postAction/index.js";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  comments: [],
  message: "",
  postId: "",
  PostedbyUser: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: () => initialState,
    addPostId: (state, action) => {
      state.postId = action.payload;
      console.log("post id added to state ", state.postId);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.message = "Loading All posts...";
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.posts = [...action.payload].reverse();
        state.isError = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        // state.posts.unshift(action.payload);
        state.posts = [action.payload, ...state.posts];
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id,
        );
      })

      .addCase(togglePostLike.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post._id === updatedPost._id,
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = updatedPost;
        }
      })
      .addCase(togglePostLike.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      })

      .addCase(commmentOnPost.fulfilled, (state, action) => {
        const newComment = action.payload;
        // comments state update
        state.comments.push(newComment);
        // posts state update
        const postIndex = state.posts.findIndex(
          (post) => post._id === newComment.postId,
        );
        if (postIndex !== -1) {
          state.posts[postIndex].comments.push(newComment._id);
        }
      })

      .addCase(getAllCommentsOnPost.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getAllCommentsOnPost.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload.message;
      });
    // .addCase(updateUserProfilePhoto.fulfilled, (state, action) => {
    //   state.PostedbyUser = action.payload.profilePicture;
    // });
  },
});
export const { addPostId, reset } = postSlice.actions;
export default postSlice.reducer;
