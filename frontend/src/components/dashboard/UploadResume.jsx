import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Spinner } from "@/components/ui/spinner";

export default function UploadResume() {
  const [isLoading, setIsLoading] = useState(false);
  const formData = new FormData();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileUpload = async () => {
    console.log("File: ", file);
    if (!file) {
      toast.error("No file selected!");
      return;
    }
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
        // setIsLoading(false);
        toast.success("Resume uploaded and analyzed successfully!");
        navigate("/dashboard");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>

      <Card className="rounded-2xl max-w-xl">
        <CardContent className="p-6 space-y-4">
          <label className="text-gray-500">
            Upload your resume in PDF format:
          </label>
          <input
            type="file"
            accept=".pdf"
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
