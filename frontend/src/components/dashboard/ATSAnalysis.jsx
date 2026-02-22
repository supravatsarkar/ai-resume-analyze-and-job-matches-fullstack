import React from "react";
import { Card, CardContent } from "../ui/card";

export default function ATSAnalysis() {
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold mb-4">ATS Analysis</h1>
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <p className="text-gray-500">ATS Score</p>
          <p className="text-4xl font-bold">72</p>
        </CardContent>
      </Card>
    </div>
  );
}
