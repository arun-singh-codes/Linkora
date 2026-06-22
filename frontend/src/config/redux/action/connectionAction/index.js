import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../../../index.jsx";

export const sendConnectionRequest = createAsyncThunk(
  "connection/sendConnectionRequest",
  async (id, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/connection/sendConnectionRequest",
        {
          receiverId: id,
        },
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "sendConnectionRequest failed",
      );
    }
  },
);

export const acceptRequest = createAsyncThunk(
  "connection/acceptRequest",
  async (id, thunkAPI) => {
    try {
      const response = await clientServer.post(`/connection/accept/${id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "accept failed",
      );
    }
  },
);

export const rejectRequest = createAsyncThunk(
  "connection/rejectRequest",
  async (id, thunkAPI) => {
    try {
      const response = await clientServer.post(
        `/connection/reject/${id}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to reject request"
      );
    }
  }
);

export const getReceivedRequests = createAsyncThunk(
  "connection/getReceivedRequests",
  async (_, thunkAPI) => {
    try {
      console.log("Thunk called");

      const res = await clientServer.get("/connection/getReceivedRequests");

      return res.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  },
);



export const getSentRequests = createAsyncThunk(
  "connection/getSentRequests",
  async (_, thunkAPI) => {
    try {
      const requestsSent = await clientServer.get(
        "/connection/getSentRequests",
      );
      return requestsSent.data;
      
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  },
);

export const getAllConnections = createAsyncThunk(
  "connection/getAllConnections",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get(
        "/connection/getAllConnections"
      );

      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to fetch connections"
      );
    }
  }
);
