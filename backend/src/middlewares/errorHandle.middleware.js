import { serverConfig } from "./../config/server.config.js";
import { sendResponse } from "../utils/sendResponse.js";

export const errorHandleMiddleware = (err, req, res, next) => {
  return sendResponse(res, {
    success: false,
    statusCode: 500,
    message: err.message || "Something went wrong!",
    error: serverConfig.SERVER_ENV === "prod" ? null : err,
  });
};
