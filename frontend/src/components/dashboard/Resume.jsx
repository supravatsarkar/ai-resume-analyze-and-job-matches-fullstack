import React from "react";
import { Card, CardContent } from "../ui/card";
import UploadResume from "./UploadResume";
import ResumeList from "./ResumeList";

export default function Resume() {
  return (
    <div className="flex justify-items-center  gap-6">
      <UploadResume />
      <ResumeList />
    </div>
  );
}
