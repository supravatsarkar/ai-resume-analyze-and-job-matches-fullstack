import { sendResponse } from "../utils/sendResponse.js";

export default function notFoundMiddleware(req, res, next) {
  return sendResponse(res, {
    success: false,
    statusCode: 404,
    message: "Route not found",
  });
}
