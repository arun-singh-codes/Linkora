import multer from "multer";
import express from "express";

const router = express.Router();
import path from "path";
import {
  updateUserProfile,
  getUserProfileAndUserByUsername,
  updateProfilePhoto,
  downloadProfile,
  getUserProfile,
  getAllUsersProfile ,
  searchUsers
} from "../controllers/user.controller.js";
// import { isUserLoggedIn } from "../controllers/Authentication.js";
import { authMiddleware } from "../controllers/Authentication.js";
import { storage } from "../CloudConfig.js";

const upload = multer({ storage });

router
  .route("/uploadProfilePicture")
  .patch(upload.single("picture"), authMiddleware, updateProfilePhoto);

router.route("/getUserProfile").get(authMiddleware, getUserProfile);

router.route("/updateUserProfile").post(authMiddleware, updateUserProfile);

router.route("/user/download_Resume").get(downloadProfile);
router.route("/getUserProfileByUsername").get( getUserProfileAndUserByUsername);
router.route("/getAllUsers").get(getAllUsersProfile);

router.route("/getMatchingUsers").get(searchUsers);

export default router;
