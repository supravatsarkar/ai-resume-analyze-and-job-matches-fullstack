import multer from "multer";
import path from "path";
import { serverConfig } from "../config/server.config.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExt = path.extname(file.originalname).toLowerCase();
    console.log("FIleExt", fileExt);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExt);
  },
});
export const upload = multer({
  limits: {
    fileSize: serverConfig.RESUME_UPLOAD_SIZE_LIMIT,
  },
  storage: storage,
  fileFilter: (req, file, cb) => {
    //check file type
    const allowedTypes = ["application/pdf"];
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(file.mimetype) && fileExt === ".pdf") {
      cb(null, true);
    } else {
      const newError = new Error(
        `Only ${allowedTypes.join(", ")} files are allowed`,
      );
      cb(newError, false);
    }
  },
});
