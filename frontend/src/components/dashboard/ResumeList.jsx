import React from "react";
import { Card, CardContent } from "../ui/card";
import UploadResume from "./UploadResume";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { FileText, Download, Trash2 } from "lucide-react";
import ResumeCard from "./ResumeCard";
import { Spinner } from "@/components/ui/spinner";
import PremiumAiOverview from "./PremiumAiOverview";

export default function ResumeList() {
  const [isLoading, setIsLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  const onExport = (resume) => {
    axios
      .get(`/api/v1/resume/download-original-resume-file/${resume._id}`, {
        responseType: "blob",
      })
      .then((res) => {
        console.log("blob res", res);
        const blob = new Blob([res], { type: res.type });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", resume.name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };
  const onDelete = (resumeId) => {
    setIsLoading(true);
    axios
      .delete(`/api/v1/resume/${resumeId}`)
      .then((res) => {
        console.log(res);
        if (res.success) {
          const filtered = resumes.filter((resume) => resume._id !== resumeId);
          setResumes(filtered);
        }
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    axios
      .get("/api/v1/resume")
      .then((res) => {
        setIsLoading(false);
        setResumes(res.data.resumes);
      })
      .finally(() => setIsLoading(false));
  }, []);
  if (!resumes?.length) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
        <FileText className="mx-auto mb-3 text-gray-400" size={36} />
        <p className="text-gray-500">No resume versions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Resume Versions</h1>
      {isLoading && <Spinner className="mx-auto" />}
      {resumes.map((resume) => (
        <ResumeCard
          key={resume._id}
          resume={resume}
          onExport={onExport}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
