import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function UploadResume() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Upload Resume</h1>
      <Card className="rounded-2xl max-w-xl">
        <CardContent className="p-6 space-y-4">
          <input type="file" className="w-full" />
          <Button>Upload & Analyze</Button>
        </CardContent>
      </Card>
    </div>
  );
}
