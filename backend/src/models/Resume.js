import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contentText: { type: String, required: true },
    sortContentText: { type: String, required: true },
    originFile: { type: String, required: true },
    userId: { type: String, ref: "User", default: null },
    aiResponse: { type: String, default: null },
  },
  { timeseries: true, versionKey: false },
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
