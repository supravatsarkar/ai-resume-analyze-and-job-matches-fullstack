import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";
import { toast as sonnerToaster } from "sonner";

export default function UploadResume() {
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileUpload = async () => {
    // console.log("File: ", file);
    if (!file) {
      toast.error("No file selected!");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.warning("Maximum file size is 2MB!");
      return;
    }
    // sonnerToaster.warning("Invalid Resume", {
    //   description: `Focus on obtaining certifications in AWS and Kubernetes, contribute to open‑source or larger team projects, lead a small module to gain leadership experience, and incorporate automated testing and CI/CD pipelines into workflows.`,
    //   position: "top-center",
    //   duration: 8000,
    //   // invert: true,
    //   closeButton: true,
    // });
    // return;
    // alert("Resume uploaded successfully!");
    setIsLoading(true);
    formData.append("resume-file", file);
    await axios
      .post("/api/v1/resume/upload-and-analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Resume uploaded data", res.data);
        if (!res.data.isValidResume) {
          console.log("Invalid resume aiResponse", res.data?.aiResponse);
          sonnerToaster.error("Invalid Resume", {
            description: `${res.data?.aiResponse?.ReasonOfInvalidResume}
            ATSSuggestion: ${res.data?.aiResponse?.ATSSuggestion}.`,
            position: "top-center",
            duration: 20000,
            // invert: true,
            closeButton: true,
          });
          return;
        }
        // setIsLoading(false);
        toast.success("Resume uploaded and analyzed successfully!");
        navigate(`/dashboard`, {
          state: { refresh: Date.now() },
        });
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>

      <Card className="rounded-2xl max-w-xl">
        <CardContent className="p-6 space-y-4">
          <label className="text-gray-500">
            Upload your resume in PDF format:{" "}
            <span className="text-red-400"> max 2MB</span>
          </label>
          <input
            type="file"
            accept=".pdf"
            maxLength={2}
            className="w-full border border-gray-300 bg-gray-100 p-2 rounded-md border-dark hover:border-gray-400 cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {isLoading ? (
            <Spinner className="mx-auto" />
          ) : (
            <Button disabled={!file || isLoading} onClick={handleFileUpload}>
              Upload & Analyze
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
