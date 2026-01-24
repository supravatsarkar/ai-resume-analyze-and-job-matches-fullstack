import { configDotenv } from "dotenv";

configDotenv();
const config = {
  PORT: process.env.PORT || 5001,
};
export { config };
