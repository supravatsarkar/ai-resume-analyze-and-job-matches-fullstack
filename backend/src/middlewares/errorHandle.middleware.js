import { serverConfig } from "./../config/server.config.js";
import { sendResponse } from "../utils/sendResponse.js";
import { MulterError } from "./fileUpload.middleware.js";

export const errorHandleMiddleware = (err, req, res, next) => {
  console.log("Global error handler: ", err);
  if (err instanceof MulterError) {
    console.log("MulterError", err.message);
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: err.message,
      error: serverConfig.SERVER_ENV === "prod" ? null : err,
    });
  }
  return sendResponse(res, {
    success: false,
    statusCode: 500,
    message:
      serverConfig.SERVER_ENV === "prod"
        ? "Something went wrong!!"
        : err.message,
    error: serverConfig.SERVER_ENV === "prod" ? null : err,
  });
};
