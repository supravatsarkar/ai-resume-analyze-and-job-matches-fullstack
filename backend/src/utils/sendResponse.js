import { serverConfig } from "../config/server.config.js";

export const sendResponse = (
  res,
  {
    success = true,
    data = null,
    statusCode = 200,
    message = null,
    error = null,
  },
) => {
  if (success === false && statusCode >= 500) {
    console.error("Error", error);
    if (serverConfig.SERVER_ENV === "prod") {
      message = "Something went wrong!";
      error = null;
    }
  }
  return res.status(statusCode).json({
    success,
    data,
    message: message || "Execution success!",
    error,
  });
};
