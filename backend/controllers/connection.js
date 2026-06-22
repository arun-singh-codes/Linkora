import Connection from "../models/connection.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const sendConnectionRequest = async (req, res) => {
  try {
    const senderId = req.user.id;

    const receiverId = req.body.receiverId;

    if (senderId === receiverId) {
      return res.status(400).json({
        message: "You cannot send a connection request to yourself",
      });
    }
    const existingConnection = await Connection.findOne({
      senderId,
      receiverId,
    });

    if (existingConnection && existingConnection.status == "accepted") {
      return res.status(400).json({ message: "Connection already exists" });
    }
    if (existingConnection && existingConnection.status == "pending") {
      return res
        .status(400)
        .json({ message: "Connection already exists but pending" });
    }

    const connection = new Connection({
      senderId,
      receiverId,
      status: "pending",
    });

    await connection.save();

    return res.status(200).json({ connection });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error in sendConnectionRequest" });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }
    connection.status = "accepted";

    await connection.save();

    return res.status(200).json({ message: "accepted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const rejectRequest = async (req, res) => {
  try {
    const connectionId = req.params.id;

    const connection = await Connection.findById(connectionId);

    if (!connection) {
      return res.status(404).json({ message: "Connection not found" });
    }
    connection.status = "rejected";

    await connection.save();
     return res.status(200).json({ message: "rejected" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const getReceivedRequests = async (req, res) => {
  try {
    const userId = req.user.id; // logged-in user

    const requests = await Connection.find({
      receiverId: userId,
      status: "pending",
    }).populate("senderId", "name email profilePicture");

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};


const getSentRequests = async (req, res) => {
  try {
    const userId = req.user.id; //logged-in user
    const requests = await Connection.find({
      senderId: userId,
      status: "pending",
    });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch sent requests" });
  }
};

const getAllConnections = async (req, res) => {
  try {
    const userId = req.user.id;

    const connections = await Connection.find({
      status: "accepted",
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
      .populate("senderId", "name email profilePicture")
      .populate("receiverId", "name email profilePicture");

    return res.status(200).json(connections);

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to fetch connections"
    });
  }
};

export {
  sendConnectionRequest,
  acceptRequest,
  rejectRequest,
  getReceivedRequests,
  getSentRequests,
  getAllConnections
};
