import express from "express";
import { config } from "./config/index.js";

const app = express();

app.get("/health", (req, res) => {
  return res.send("Ok");
});

app.listen(config.PORT, () => {
  console.log("Server listen port: ", config.PORT);
});
