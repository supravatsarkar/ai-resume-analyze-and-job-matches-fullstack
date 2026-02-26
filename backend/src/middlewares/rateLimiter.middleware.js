import rateLimiter, { ipKeyGenerator } from "express-rate-limit";
import { sendResponse } from "../utils/sendResponse.js";

const createRateLimiter = ({ windowInMinutes, max, message = "" }) => {
  return rateLimiter({
    // store: //TODO: add redis store
    keyGenerator: (req) => {
      return String(req.user?._id) || ipKeyGenerator(req.ip);
    },
    windowMs: windowInMinutes * 60 * 1000,
    max, // limit each IP to 100 requests per windowMs
    standardHeaders: "draft-8", // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    //   ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    handler: (req, res, next, options) =>
      sendResponse(res, {
        success: false,
        statusCode: 429,
        message:
          message ||
          `Limit exceeded, please try again after ${windowInMinutes} minutes`,
      }),
  });
};

export const aiRateLimiter = createRateLimiter({ windowInMinutes: 20, max: 2 });
export const jobMatchRateLimiter = createRateLimiter({
  windowInMinutes: 10,
  max: 5,
});

export const globalRateLimiter = createRateLimiter({
  windowInMinutes: 30,
  max: 100,
});
