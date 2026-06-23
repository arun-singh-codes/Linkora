import express from "express";

import { sendConnectionRequest ,acceptRequest  , getReceivedRequests ,getSentRequests , rejectRequest , getAllConnections} from "../controllers/connection.js";
import{authMiddleware} from "../controllers/Authentication.js"

const router = express.Router();
// app.use("/connection", connectionRoutes);

router.post("/sendConnectionRequest" , authMiddleware , sendConnectionRequest);
router.post("/accept/:id" ,authMiddleware ,  acceptRequest);
router.post("/reject/:id" ,authMiddleware ,  rejectRequest);
router.get("/getReceivedRequests" ,authMiddleware ,  getReceivedRequests);
router.get("/getSentRequests"  ,  getSentRequests);
router.get("/getAllConnections" , getAllConnections);


export default router;