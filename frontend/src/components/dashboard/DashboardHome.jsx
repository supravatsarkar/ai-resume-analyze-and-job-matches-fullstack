import React, { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import AiOverview from "./AiOverview";
import PremiumAiOverview from "./PremiumAiOverview";
import { motion } from "motion/react";
import axios from "axios";
import UploadResume from "./UploadResume";

export default function DashboardHome() {
  const [resume, setResume] = React.useState(null);
  console.log("resume", resume);
  useEffect(() => {
    axios
      .get("/api/v1/resume/latest")
      .then((res) => {
        console.log(res.data);
        setResume(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
