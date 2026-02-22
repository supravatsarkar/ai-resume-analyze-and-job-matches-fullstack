import React from "react";
import { Card, CardContent } from "../ui/card";
import UploadResume from "./UploadResume";

export default function Resume() {
  return (
    <div className="flex justify-center items-start gap-6">
      <div>
        {" "}
        <h1 className="text-2xl font-bold mb-4">Resume Versions</h1>
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            Resume versions will appear here.
          </CardContent>
        </Card>
      </div>
      <UploadResume />
    </div>
  );
}
