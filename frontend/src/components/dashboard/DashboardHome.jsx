import React from "react";
import { Card, CardContent } from "../ui/card";

export default function DashboardHome() {
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {["ATS Score", "Skill Gap", "Job Matches"].map((item) => (
          <Card key={item} className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-gray-500">{item}</p>
              <p className="text-3xl font-bold">--</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
