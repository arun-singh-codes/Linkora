import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  checkAuth,
  loginUser,
  getAboutUser,
  updateUserProfilePhoto,
  getAllUsersProfile,
  searchUsers
} from "../../action/authAction/index.js";

const initialState = {
  user: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: false,
  message: "",
  profileFetched: false,
  connections: [],
  connectionRequest: [],
  isAuthenticated: false,
  authMessage: "" ,
  allUsersProfile :[],
  searchedUsers:[]
};


const authSlice = createSlice({
  name: "auth",                   // for action ka api name auth/login
  initialState,
  reducers: {
    // (sync actions)
    reset: () => initialState,
    handleLoginUser: (state) => {
      state.message = " hello";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Checking details ...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.loggedIn = true),
          (state.message = action.payload));
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating New User...";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        ((state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.loggedIn = true),
          (state.message = action.payload));
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAuthenticated = false;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
        state.authMessage = action.payload.message;
      })


      .addCase(getAboutUser.fulfilled ,(state , action)=>{
        state.profileFetched  = true;
        state.user = action.payload.profile.userId;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getAboutUser.pending ,(state , action)=>{
        state.isError = false;
        state.isLoading =true;
      })
      .addCase(getAboutUser.rejected ,(state , action)=>{
        state.profileFetched  = false;
        state.isError = true;
        state.isSuccess = false;
        state.message= action.payload.message;
      })
      .addCase(updateUserProfilePhoto.fulfilled ,(state , action)=>{
        state.message = action.payload;
      })

      .addCase(getAllUsersProfile.fulfilled , (state ,action)=>{
        console.log(action.payload)
        state.allUsersProfile = action.payload;
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.message = "";
      })
      .addCase(getAllUsersProfile.pending , (state , action)=>{
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = "Fetching All Users";
      })
      .addCase(getAllUsersProfile.rejected , (state , action)=>{
        state.isError = true;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })

      .addCase(searchUsers.fulfilled , (state , action)=>{
        console.log(action)
        state.searchedUsers = action.payload

      })
      
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
