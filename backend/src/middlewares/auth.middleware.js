import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResponse } from "../utils/sendResponse.js";
import { serverConfig } from "../config/server.config.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, serverConfig.JWT_ACCESS_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      if (error.name === "TokenExpiredError") {
        return sendResponse(res, {
          success: false,
          statusCode: 401,
          message: "Not authorized, token expired",
        });
      }
      return sendResponse(res, {
        success: false,
        statusCode: 401,
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return sendResponse(res, {
      success: false,
      statusCode: 401,
      message: "Not authorized, no token",
    });
  }
};

export { protect };
