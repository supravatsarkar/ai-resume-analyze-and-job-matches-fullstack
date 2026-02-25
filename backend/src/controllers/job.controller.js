import { getLocationByIp } from "../services/locationService.js";
import { sendResponse } from "../utils/sendResponse.js";
import Resume from "../models/Resume.js";
import { searchJobs } from "../services/jobSearchService.js";

const getJobs = async (req, res) => {
  const page = req.query?.page || 1;
  const limit = req.query?.limit || 10;
  const ip = req.ip;
  console.log("ip", ip);
  const location = await getLocationByIp(ip);
  console.log("location", location);
  // const jobs = await Job.find({ location: location.city });
  return sendResponse(res, {
    data: location,
    statusCode: 200,
  });
};
const getJobsByResumeId = async (req, res) => {
  console.log("req query param: ", req.query);
  const page = req.query?.page || 3;
  const limit = req.query?.limit || 20;
  const resumeId = req.params.id;
  const resume = await Resume.findById(resumeId);
  if (!resume)
    return sendResponse(res, {
      success: false,
      statusCode: 404,
      message: "Resume not found",
    });
  const searchKeywords = resume?.aiResponse?.JobSearchParams;
  const concatKeywords = searchKeywords.join(" ");
  console.log({ searchKeywords, concatKeywords });
  let country = "";
  let city = "";

  if (req.query?.ip && req.query?.country) {
    country = req.query?.country;
    city = req.query?.city;
  } else {
    const ip = req.ip;
    console.log("req.ip", ip);
    const location = await getLocationByIp(ip);
    console.log("location service", location);
    country = location.country;
    city = location.city;
  }

  const jobs = await searchJobs({
    keyword: concatKeywords,
    location: country,
    limit,
    page,
  });
  return sendResponse(res, {
    data: { jobs, country, concatKeywords },
    statusCode: 200,
  });
};

export default { getJobs, getJobsByResumeId };
