import express from "express";
import { addComment, getAllCommentsOfPost } from "../controllers/comments.controller.js";
import {authMiddleware} from "../controllers/Authentication.js";

const router = express.Router();



router.post("/commentOnPost/:id", authMiddleware ,addComment );
router.get("/getAllCommentsOfPost/:id",getAllCommentsOfPost );




export default router;