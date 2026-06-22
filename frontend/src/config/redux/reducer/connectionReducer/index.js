import { createSlice } from "@reduxjs/toolkit";
import {
  sendConnectionRequest,
  acceptRequest,
  rejectRequest,
  getReceivedRequests,
  getSentRequests,
  getAllConnections
} from "../../action/connectionAction/index.js";

const initialState = {
  //   isError: false,
  //   isSuccess: false,
  //   message: "",
  //   connections: [],

  connections: [], // accepted
  requestsSent: [], // sent
  requestsReceived: [],
  pendingConnections: {}, // pendingConnections = {
  //   [receiverId]: true
  // }
};

const connectionSlice = createSlice({
  name: "connection", // for action ka api name auth/login
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
      .addCase(sendConnectionRequest.fulfilled, (state, action) => {
        const receiverId = action.meta.arg;
        state.requestsSent[receiverId] = true;
        state.pendingConnections[receiverId] = true;
        state.message = action.payload;
      })

      .addCase(acceptRequest.fulfilled, (state, action) => {
        delete state.pendingConnections[action.meta.arg];
        state.requestsReceived = state.requestsReceived.filter(
          (req) => req._id !== action.meta.arg,
        );
      })

      .addCase(rejectRequest.fulfilled, (state, action) => {
        state.requestsReceived = state.requestsReceived.filter(
          (req) => req._id !== action.meta.arg,
        );
      })

      .addCase(getSentRequests.fulfilled, (state, action) => {
        state.requestsSent = {};
        action.payload.forEach((req) => {
          state.requestsSent[req.receiverId] = true;
        });
      })

      .addCase(getReceivedRequests.pending, () => {
        console.log("PENDING HIT");
      })

      .addCase(getReceivedRequests.fulfilled, (state, action) => {
        state.requestsReceived = action.payload;
      })
      .addCase(getReceivedRequests.rejected, () => {
        console.log("rejected");
      })

      .addCase(getAllConnections.fulfilled, (state, action) => {
        state.connections = action.payload;
      });
  },
});

export const { reset } = connectionSlice.actions;

export default connectionSlice.reducer;
