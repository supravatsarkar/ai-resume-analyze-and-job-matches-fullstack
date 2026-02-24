import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div>
      {" "}
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl font-bold">
            AI Resume Intelligence Platform
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your resume, get ATS score, skill gap analysis, and discover
            matching jobs powered by AI.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
