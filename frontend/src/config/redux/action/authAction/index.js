import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";
// import { create } from "@mui/material/styles/createTransitions.js";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/Auth/login", {
        username: user.username,
        password: user.password,
      });
      return response.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  },
);

// frontend se dispatch(registerUser(formData)) dispatch hone ke bad  Redux automatically 3 actions banata hai:registerUser.pending
// registerUser.fulfilled , registerUser.rejected  agar success to  return request.data; Ye automatically fulfilled me chala jata hai Ye hi action.payload ban jata hai

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const request = await clientServer.post("/Auth/signup", {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });
      console.log(request.data);
      return request.data.message;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "User Registration failed");
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkToken",
  async (_, thunkAPI) => {
    try {
      const res = await clientServer.get("/Auth/checkToken", {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "checking token failed");
    }
  },
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (_ , thunkAPI) => {
    try {
      const profile = await clientServer.get("/user/getUserProfile");

      return profile.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Cannot Find User Profile");
    }
  },
);

export const updateUserProfilePhoto = createAsyncThunk(
  "user/updateUserProfilePhoto",
  async(picture , thunkAPI) => {  
    try{
      const formData = new FormData();
      formData.append("picture", picture);
      const response = await clientServer.patch("/user/uploadProfilePicture", formData,
      //    {       // Axios automatically set kar deta hai jab FormData use hota hai
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // }
    );
      return response.data.message;

    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data?.message ||" Unable To Update User ProfilePhoto");
    }
  }
)

export const getAllUsersProfile =createAsyncThunk(
  "user/getAllUsersProfile" ,     // "sliceName/actionName"
  async(_, thunkAPI) =>{      // _ for payload
    try{
      const response = await clientServer.get("/user/getAllUsers");
      return response.data.allUsersProfile;

    }catch(err){
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Unable to Fetch All Users Profile"
      )
    }
  }

)


export const searchUsers = createAsyncThunk(
  "user/searchUsers" , 
  async(query , thunkAPI) =>{
    try{
      const response = await clientServer.get(`user/getMatchingUsers?q=${query}`);
      return response.data.allMatchingUsers;
    }catch(err){
      return thunkAPI.rejectWithValue(err.response?.data?.message || "error in searchUsers action frontend ");
    }
  }
)