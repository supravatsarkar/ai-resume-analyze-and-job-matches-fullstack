import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md rounded-2xl shadow">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Create Account</h2>
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Full Name"
          />
          <input className="w-full border p-2 rounded-lg" placeholder="Email" />
          <input
            className="w-full border p-2 rounded-lg"
            placeholder="Password"
            type="password"
          />
          <Button className="w-full">Signup</Button>
          <p className="text-sm text-center">
            Already have account?{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
