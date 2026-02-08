// getting-started.js
import mongoose from "mongoose";
import { serverConfig } from "../config/server.config.js";

async function connect() {
  try {
    await mongoose.connect(serverConfig.MONGO_DB_URI);
    console.log("db connected");
  } catch (error) {
    console.log(err);
  }
}
export default connect;
