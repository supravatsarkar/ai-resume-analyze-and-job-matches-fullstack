import React from "react";
import { Card, CardContent } from "../ui/card";

export default function Roadmap() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Career Roadmap</h1>
      <Card className="rounded-2xl">
        <CardContent className="p-6">Your AI learning roadmap.</CardContent>
      </Card>
    </div>
  );
}
