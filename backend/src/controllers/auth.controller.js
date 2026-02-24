import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { serverConfig } from "../config/server.config.js";
import bcrypt from "bcryptjs";

// REGISTER
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return sendResponse(res, {
      statusCode: 400,
      message: "User already exists",
    });
  }

  const user = await User.create({
    email,
    password: await bcrypt.hash(password, 10),
  });

  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: serverConfig.SERVER_ENV === "prod",
      sameSite: "strict",
    });
    sendResponse(res, {
      statusCode: 201,
      data: {
        _id: user._id,
        email: user.email,
        accessToken,
      },
    });
  } else {
    sendResponse(res, { statusCode: 400, message: "Invalid user data" });
  }
};

// LOGIN
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    // console.log(
    //   "User",
    //   user,
    //   user.password,
    //   password,
    //   await bcrypt.compare(password, user.password),
    // );

    if (user && (await user.matchPassword(password))) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      user.refreshToken = refreshToken;
      user.save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      sendResponse(res, {
        statusCode: 200,
        data: {
          _id: user._id,
          email: user.email,
          accessToken,
        },
      });
    } else {
      sendResponse(res, {
        statusCode: 401,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    sendResponse(res, { statusCode: 500, message: error.message });
  }
};

// REFRESH TOKEN
const refresh = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);

    const jwt = require("jsonwebtoken");
    const decoded = jwt.verify(token, serverConfig.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token) return res.sendStatus(403);

    const accessToken = generateAccessToken(user);
    sendResponse(res, {
      statusCode: 201,
      data: {
        _id: user._id,
        email: user.email,
        accessToken,
      },
    });
  } catch (err) {
    sendResponse(res, { statusCode: 403, message: "Forbidden" });
  }
};

// LOGOUT
const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      const user = await User.findOne({ refreshToken: token });
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }
    sendResponse(res, {
      statusCode: 200,
      message: "Successfully logout",
    });
  } catch (error) {
    sendResponse(res, { statusCode: 500, message: error.message });
  }
};

export { registerUser, authUser, refresh, logout };
