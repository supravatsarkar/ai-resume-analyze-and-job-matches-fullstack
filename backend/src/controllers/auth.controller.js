import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return sendResponse(res, {
        statusCode: 400,
        message: "User already exists",
      });
    }

    const user = await User.create({
      email,
      password,
    });

    if (user) {
      sendResponse(res, {
        statusCode: 201,
        data: {
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } else {
      sendResponse(res, { statusCode: 400, message: "Invalid user data" });
    }
  } catch (error) {
    sendResponse(res, { statusCode: 500, message: error.message });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      sendResponse(res, {
        statusCode: 200,
        data: {
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
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

export { registerUser, authUser };
