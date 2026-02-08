import express from "express";
import requestLogger from "./middlewares/requestLogger.middleware.js";
import v1Routers from "./routes/v1/index.js";
import { errorHandleMiddleware } from "./middlewares/errorHandle.middleware.js";

const app = express();

app.use(requestLogger());

app.get("/health", (req, res) => {
  return res.send("Ok");
});

// api routers
app.use("/api/v1", v1Routers);
// global error handler middleware
app.use(errorHandleMiddleware);

export default app;
