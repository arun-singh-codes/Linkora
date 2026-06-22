import { Router } from "express";
import { activeCheck } from "../controllers/posts.controller.js";
import multer from "multer";
import { createPost, getAllPosts  ,deletePost ,togglePostLike , postsByUserId} from "../controllers/posts.controller.js";
const router = Router();
import {storage} from "../CloudConfig.js";

const upload = multer({ storage });

router.route("/").get(activeCheck);
router.route("/createPost").post(
  upload.single("media"),
  createPost
);

router.route("/posts").get(getAllPosts);

router.route("/deletePost/:id").delete(deletePost);
router.route("/togglePostLike/:id").patch(togglePostLike);postsByUserId
router.route("/postsByUser/:id").get(postsByUserId);

// router.route("/decrementPostLike/:id").patch(decrementPostLike);

export default router;
