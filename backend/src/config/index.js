import { configDotenv } from "dotenv";

configDotenv();
const config = {
  PORT: process.env.PORT || 5001,
  RESUME_UPLOAD_SIZE_LIMIT:
    Number(process.env.UPLOAD_FILE_SIZE_LIMIT) || 2 * 1024 * 1024, // 2mb (in byte)
};
console.log(config);
export { config };
