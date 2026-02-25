import React from "react";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import UploadResume from "./UploadResume";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import JobCard from "./JobCard";
import ResumeCard from "./ResumeCard";

export default function JobMatches() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const latestResume = localStorage.getItem("latestResume")
    ? JSON.parse(localStorage.getItem("latestResume"))
    : null;
  const mockFetchJobs = async (page, limit = 10) => {
    // console.log("ip", ipLookup);
    let ipLookup = localStorage.getItem("ipLookup");
    if (ipLookup) ipLookup = JSON.parse(ipLookup);
    console.log("Get ipLookup", ipLookup);
    const resumeId = latestResume._id;
    console.log("Get resumeId", resumeId);
    if (!resumeId) {
      console.log("Running this");
      toast.warn("Please upload a resume first!");
      return setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
    const { data } = await axios.get(
      `/api/v1/job/by-resume/${resumeId}?page=${page}&limit=${limit}&ip=${ipLookup.ip}&country=${ipLookup.country_name}&city=${ipLookup.city}`,
    );
    return data?.jobs;
  };
  const loadJobs = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newJobs = await mockFetchJobs(page);

    if (!newJobs.length) setHasMore(false);

    setJobs((prev) => [...prev, ...newJobs]);
    setPage((p) => p + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadJobs();
  }, []);
  return (
    <div className="mx-10">
      {" "}
      <h1 className="text-2xl font-bold mb-4">Matched Jobs</h1>
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-slate-400">
          Job showing based on Resume : {latestResume.name}
        </h5>
        <span className="text-sm text-gray-500">{jobs.length} jobs</span>
      </div>
      <div className="grid gap-4 max-w-300">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadJobs} disabled={loading} size="lg">
            {loading ? "Loading..." : "See More Jobs"}
          </Button>
        </div>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400 mt-6">No more jobs available</p>
      )}
    </div>
  );
}
