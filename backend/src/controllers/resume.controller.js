import { PDFParse } from "pdf-parse";
import path from "path";
import { sendResponse } from "../utils/sendResponse.js";
import Resume from "../models/Resume.js";
import { unlink } from "fs/promises";
import { generateAiResponse } from "../services/aiService.js";

const uploadController = async (req, res) => {
  try {
    console.log(req.file, process.cwd());
    // return;

    const link = path.join(process.cwd(), req.file.path);
    console.log("link", link);
    const parser = new PDFParse({ url: link });
    const pageInfoResult = await parser.getInfo({ parsePageInfo: true });
    const pdfTextResult = await parser.getText();
    await parser.destroy();
    if (pageInfoResult.total > 3) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "Max 3 pages are allowed.",
      });
    }

    if (!req.file) {
      return sendResponse(res, {
        success: false,
        statusCode: 400,
        message: "No file uploaded or invalid file",
      });
    }
    // console.log(pdfTextResult.text);
    let resume = {};
    if (pdfTextResult.text) {
      resume = await Resume.create({
        name: req.file.originalname,
        sortContentText: pdfTextResult.text.slice(0, 100),
        contentText: pdfTextResult.text,
        originFile: req.file.filename,
      });
    }

    return sendResponse(res, {
      data: { resumeId: resume._id },
      statusCode: 201,
      message: "Resume uploaded successfully!",
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(res, {
      success: false,
      message: error.message,
      error,
      statusCode: 500,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    const filePath = path.join(process.cwd(), "/uploads", resume.originFile);
    await unlink(filePath);
    return sendResponse(res, {
      statusCode: 200,
      message: "Resume deleted successfully!",
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(res, {
      success: false,
      message: error.message,
      error,
      statusCode: 500,
    });
  }
};

const getUploadedList = async (req, res) => {
  try {
    const limit = req.query?.limit || 10;
    const page = req.query?.page || 1;
    const skip = (page - 1) * limit;
    const count = await Resume.countDocuments({});
    const resumes = await Resume.find({})
      .select("-contentText")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const finalResult = {
      total: count,
      limit,
      page,
      resumes,
    };
    return sendResponse(res, {
      data: finalResult,
      statusCode: 200,
      message: "Resume uploaded successfully!",
    });
  } catch (error) {
    console.log("error", error);
    return sendResponse(res, {
      success: false,
      message: error.message,
      error,
      statusCode: 500,
    });
  }
};

export default {
  getUploadedList,
  uploadController,
  deleteResume,
  getAiResponse,
};
