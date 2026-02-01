const express = require("express");
module.exports.sendResponse = (
  res,
  {
    success = true,
    data = null,
    statusCode = 200,
    message = null,
    error = null,
  },
) => {
  return res.status(statusCode).json({
    success,
    data,
    message: message || "Execution success!",
    error,
  });
};
