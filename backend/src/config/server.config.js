import { configDotenv } from "dotenv";

configDotenv();
const serverConfig = {
  PORT: process.env.PORT || 5001,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  RESUME_UPLOAD_SIZE_LIMIT_IN_MB:
    process.env.RESUME_UPLOAD_SIZE_LIMIT_IN_MB || 2, // 2mb (in mb)
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  GROQ_AI_MODEL: "openai/gpt-oss-20b",
  GROQ_AI_API_KEY: process.env.GROQ_AI_API_KEY,
  SERVER_ENV: process.env.SERVER_ENV,
};
console.log(serverConfig);
export { serverConfig };
