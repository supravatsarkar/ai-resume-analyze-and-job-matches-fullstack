import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import AiOverview from "./AiOverview";
import PremiumAiOverview from "./PremiumAiOverview";
import { motion } from "motion/react";
import axios from "axios";
import UploadResume from "./UploadResume";
import { useLocation } from "react-router";

export default function DashboardHome() {
  const location = useLocation();
  const [resume, setResume] = React.useState(null);

  if (resume) {
    localStorage.setItem("latestResume", JSON.stringify(resume));
  }
  // console.log("resume", resume);
  useEffect(() => {
    axios
      .get("/api/v1/resume/latest")
      .then((res) => {
        // console.log(res.data);
        setResume(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [location.state]);

  if (!resume) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="max-w-6xl mx-auto p-6">
          {/* <AiOverview data={aiData} /> */}
          <UploadResume />
        </div>
      </motion.div>
    );
  }
  if (resume && !resume?.aiResponse) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="max-w-6xl mx-auto p-6">
          <h1>AI Analysis will appear here</h1>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-6"
    >
      <div className="max-w-6xl mx-auto p-6">
        {/* <AiOverview data={aiData} /> */}
        <PremiumAiOverview data={resume.aiResponse} />
      </div>
    </motion.div>
  );
}
