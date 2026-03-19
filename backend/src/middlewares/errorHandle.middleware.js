import { serverConfig } from "./../config/server.config.js";
import { sendResponse } from "../utils/sendResponse.js";
import { CustomMulterError } from "./fileUpload.middleware.js";
import multer from "multer";

export const errorHandleMiddleware = (err, req, res, next) => {
  console.log("Global error handler: ", err);
  // console.log("Global error message: ", err.message);
  // console.log("instance of ", err instanceof multer.MulterError);
  if (err instanceof CustomMulterError) {
    console.log("CustomMulterError", err.message);
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: err.message,
      error: serverConfig.SERVER_ENV === "prod" ? null : err,
    });
  }
  if (err instanceof multer.MulterError) {
    console.log("MulterError", err.message);
    // console.log("MulterError statusCode", err.code);
    let message = "";
    if (err.code === "LIMIT_FILE_SIZE") {
      message = `File size should be less or equal ${serverConfig.RESUME_UPLOAD_SIZE_LIMIT_IN_MB} MB!`;
    }
    return sendResponse(res, {
      success: false,
      statusCode: 400,
      message: message || err.message,
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
