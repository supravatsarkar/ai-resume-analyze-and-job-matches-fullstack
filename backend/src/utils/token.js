import jwt from "jsonwebtoken";
import { serverConfig } from "../config/server.config.js";

export const generateAccessToken = (payload) => {
  return jwt.sign(
    { id: payload._id, role: payload.role },
    serverConfig.JWT_ACCESS_SECRET,
    { expiresIn: "15m" },
  );
};
export const generateRefreshToken = (payload) => {
  return jwt.sign({ id: payload._id }, serverConfig.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};
