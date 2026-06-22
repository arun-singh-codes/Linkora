import { User } from "../models/user.model.js";
import Profile from "../models/profile.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import fs from "fs";

import PDFDocument from "pdfkit";

const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;

    const real = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(real.id);

    if (!user) {
      return res.json({ message: "user not found" });
    }

    const profile = await Profile.findOne({ userId: user.id });

    if (!profile) {
      return res.json({ message: "profile not found" });
    }

    Object.assign(profile, newUserData);

    await profile.save();
    res.json({ message: "profile updated", profile });
  } catch (err) {
    console.log(err);
    res.json({ message: "error in updating profile", err });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const dummy = await jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(dummy.id);

    if (!user) {
      return res.json({ message: "User not found" });
    }

    const profile = await Profile.findOne({ userId: user.id }).populate(
      "userId",
      "name username email  profilePicture",
    );

    return res.status(200).json({ profile: profile });
  } catch (err) {
    console.error("error in getingUserProfile", err);
    return res.status(500).json({ message: "error in getingUserProfile" });
  }
};

const convertUserDataToPdf = async (userProfile) => {
  const doc = new PDFDocument();
  console.log(userProfile);

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream(`uploads/${outputPath}`);

  doc.pipe(stream);
  doc.image(`uploads/${userProfile.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });
  doc.fontSize(14).text(`Name :${userProfile.userId.name}`);
  doc.fontSize(14).text(`Username :${userProfile.userId.username}`);
  doc.fontSize(14).text(`Email :${userProfile.userId.email}`);
  doc.fontSize(14).text(`Bio :${userProfile.bio}`);
  doc.fontSize(14).text(`Current Position :${userProfile.currentPost}`);
  doc.fontSize(14).text(`PastWork :`);
  userProfile.pastWork.forEach((word) => {
    doc.fontSize(10).text(`Company Name  :${word.company}`);
    doc.fontSize(10).text(`Position  :${word.position}`);
    doc.fontSize(10).text(`Years:${word.years}`);
  });
  doc.fontSize(14).text(`Education :`);
  userProfile.education.forEach((word) => {
    doc.fontSize(10).text(`School:${word.school}`);
    doc.fontSize(10).text(`degree:${word.degree}`);
    doc.fontSize(10).text(`field of Study:${word.fieldOfStudy}`);
  });
  doc.end();
  return outputPath;
};

const downloadProfile = async (req, res) => {
  const userId = req.query.id;

  const userProfile = await Profile.findOne({ userId: userId }).populate(
    "userId",
    "name , username , email , profilePicture",
  );

  let path = await convertUserDataToPdf(userProfile);
  return res.json({ message: path });
};

const updateProfilePhoto = async (req, res) => {
  try {
    const photo = req.file;
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log(user);
    if (!photo) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    user.profilePicture = photo ? photo.path : "";
    await user.save();
    return res.status(200).json({
      message: " profile-picture updated",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "error in updating profile photo form backend" });
  }
};
const mySentConnections = async () => {};

export const getUserProfileAndUserByUsername = async (req, res) => {
  const username = req.query.username;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name username email profilePicture",
    );

    return res.status(200).json({ userProfile: userProfile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllUsersProfile = async (req, res) => {
  try {
    const allUsersProfile = await Profile.find().populate(
      "userId",
      "name username  email profilePicture",
    );
    if (allUsersProfile.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }
    return res.status(200).json({ allUsersProfile });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }
    const allMatchingUsers = await User.find({
      name: {
        $regex: "^" + q,
        $options: "i", // i = case sensitive ignore Aru = aru
      },
    });

    return res.status(200).json({ allMatchingUsers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export {
  updateUserProfile,
  getUserProfile,
  downloadProfile,
  updateProfilePhoto,
  getAllUsersProfile,
  searchUsers,
}; // Named export
