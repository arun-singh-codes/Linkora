import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Profile from "../models/profile.js";

const createSecretToken = (id) => {
  const token = jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
  return token;
};

export const signup = async (req, res) => {
  try {
    const { email, username, name, password } = req.body;

    if (!email || !username || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already registered" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
      name,
    });

    const profile = new Profile({ userId: newUser.id });
    await profile.save();
    const token = createSecretToken(newUser.id);

    res.cookie("token", token, {
      // withCredentials: true,  isse axios side pe likhna hota hai
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({ message: "User SignedIn successfully" });
    console.log("user siggned in successfully");
  } catch (err) {
    console.error("error in singing up", err);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    console.log("username:", username);
    console.log("password:", password);

    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "Incorrect password or username " });
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }

    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      // withCredentials:true,  isse axios side pe likho
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ message: "User logged in successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ message: err.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        ///401 status code kis wajah se ye frontend ke catch block me jayga error me  status code ke bajay throw enw error bhi kar skte the par using try catch in this
        isAuthenticated: false,
        message: "No Token",
      });
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        isAuthenticated: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      isAuthenticated: true,
      user: decoded,
    });
  } catch (err) {
    return res.status(401).json({
      isAuthenticated: false,
      message: "Invalid Token",
    });
  }
};

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token Missing" });
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ message: "user not found" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
