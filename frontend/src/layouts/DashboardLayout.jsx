import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import React from "react";
import { Outlet } from "react-router";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div>
      <header className="bg-white p-4 shadow-lg border border-bottom-1 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">App Logo & title</h1>
        </div>
        <div>
          <Button>Logout</Button>
        </div>
      </header>
      <div className="flex bg-gray-50 min-h-screen">
        <DashboardSidebar />
        <Outlet />
      </div>
    </div>
  );
}

{
  /* <DashboardLayout>
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
</DashboardLayout>; */
}
