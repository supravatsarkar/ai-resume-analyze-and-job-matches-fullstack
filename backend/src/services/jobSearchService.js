import linkedIn from "linkedin-jobs-api";

// const queryOptions = {
//   keyword: "Backend Developer Django Golang PostgreSQ",
//   location: "India",
//   dateSincePosted: "past Week",
//   jobType: "full time",
//   remoteFilter: "remote",
//   salary: "100000",
//   experienceLevel: "entry level",
//   limit: "10",
//   page: "0",
//   has_verification: false,
//   under_10_applicants: false,
// };
export const searchJobs = async ({
  keyword,
  location,
  limit = 10,
  page = 0,
}) => {
  try {
    console.log("Before search", { keyword, location, limit, page });
    const jobs = await linkedIn.query({ keyword, location, limit, page });
    return jobs;
  } catch (error) {
    console.log("Job search Error ", error);
    throw error;
  }
};
