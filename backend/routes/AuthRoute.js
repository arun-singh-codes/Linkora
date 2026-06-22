import express from "express";

import{login , signup , isAuthenticated} from "../controllers/Authentication.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.get("/checkToken" ,isAuthenticated )

export default router;
// token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5N2YwNWJhMTliZjdiMzkwZmFkOTgxZiIsImlhdCI6MTc3MDM5NTg4MCwiZXhwIjoxNzcwNjU1MDgwfQ.0r86gq7RLpAhMYKSSeT0v--C_KIUFTl5cfkp15n7vt8