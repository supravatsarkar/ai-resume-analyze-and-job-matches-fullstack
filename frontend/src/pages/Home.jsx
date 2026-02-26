import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const FeatureCard = ({ title, desc, icon }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-all"
  >
    <div className="text-2xl mb-2">{icon}</div>
    <h3 className="font-semibold mb-1">{title}</h3>
    <p className="text-sm text-gray-500">{desc}</p>
  </motion.div>
);
export default function Home() {
  return (
    <div>
      {" "}
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-sm font-medium">
            🚀 AI-Powered Career Intelligence
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Turn Your Resume Into
            <span className="text-blue-600"> Interview Calls</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Get ATS score, uncover skill gaps, receive AI improvement
            suggestions, and discover perfectly matched jobs — all in one
            intelligent platform.
          </p>

          <div className="flex justify-center gap-4 pt-2">
            <Link to="/signup">
              <Button size="lg" className="rounded-xl shadow-lg">
                Analyze My Resume
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="rounded-xl">
                I already have account
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          <FeatureCard
            icon="📤"
            title="Upload Resume"
            desc="Securely upload your resume and let our AI parse every important detail."
          />
          <FeatureCard
            icon="🧠"
            title="AI Deep Analysis"
            desc="Get ATS score, weak points, and personalized improvement suggestions."
          />
          <FeatureCard
            icon="💼"
            title="Smart Job Matches"
            desc="Discover highly relevant jobs tailored to your skills and experience."
          />
        </motion.div>
      </section>
      {/* SCREENSHOT SHOWCASE*/}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-2">
            See the Platform in Action
          </h2>
          <p className="text-gray-500">
            Real insights. Real job matches. Powered by AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Resume Analysis Screenshot */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold">📊 Resume Analysis</h3>
              <p className="text-sm text-gray-500">
                ATS score, weak points & AI suggestions
              </p>
            </div>
            <img
              src="images/resume-analyze.png"
              alt="Resume analysis preview"
              className="w-full h-auto object-cover"
            />
          </motion.div>

          {/* Job Matches Screenshot */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white rounded-2xl border shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b">
              <h3 className="font-semibold">💼 Smart Job Matches</h3>
              <p className="text-sm text-gray-500">
                AI-ranked opportunities tailored for you
              </p>
            </div>
            <img
              src="images/job-matches.png"
              alt="Job matches preview"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </section>
      {/* TRUST STRIP */}
      <section className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <p className="text-sm text-gray-500">
            Built for modern developers • ATS Optimized • AI Explainable
          </p>
        </div>
      </section>
    </div>
  );
}
