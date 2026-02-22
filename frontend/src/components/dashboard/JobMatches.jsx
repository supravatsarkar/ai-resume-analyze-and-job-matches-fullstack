import React from "react";
import { Card, CardContent } from "../ui/card";

export default function JobMatches() {
  return (
    <div>
      {" "}
      <h1 className="text-2xl font-bold mb-4">Matched Jobs</h1>
      <Card className="rounded-2xl">
        <CardContent className="p-6">Job results will appear here.</CardContent>
      </Card>
    </div>
  );
}
