import { useState } from "react";
import {
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Target,
  ChevronDown,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

/* ========================= */
/* Main Component */
/* ========================= */

export default function PremiumAiOverview({ data }) {
  return (
    <div className="space-y-8">
      <HeroScore data={data} />

      <div className="grid xl:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6">
          <ExpandableCard title="AI Professional Summary" icon={<Target />}>
            <p className="text-gray-700 leading-relaxed">{data.Summery}</p>
          </ExpandableCard>

          <div className="grid md:grid-cols-2 gap-6">
            <ExpandableCard
              title="Key Strengths"
              icon={<CheckCircle2 className="text-emerald-600" />}
            >
              <p className="text-gray-700">{data.Strengths}</p>
            </ExpandableCard>

            <ExpandableCard
              title="Areas to Improve"
              icon={<AlertTriangle className="text-amber-600" />}
            >
              <p className="text-gray-700">{data.Weaknesses}</p>
            </ExpandableCard>
          </div>

          <ExpandableCard
            title="Skill Gap Analysis"
            icon={<TrendingUp className="text-rose-600" />}
          >
            <p className="text-gray-700">{data.SkillGap}</p>
          </ExpandableCard>

          <ExpandableCard title="Future Roadmap 🚀">
            <RoadmapList text={data.FutureRoadmap} />
          </ExpandableCard>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <SkillRadar SkillSnap={data.SkillSnap} />

          <GlassTip suggestion={data.ATSSuggestion} />
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* 🎯 HERO SCORE */
/* ========================= */

function HeroScore({ data }) {
  const score = data.ATScore || 0;
  const strokeDasharray = 440;
  const strokeDashoffset = strokeDasharray - (score / 100) * strokeDasharray;

  return (
    <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT */}
        <div>
          <h2 className="text-sm opacity-90">ATS Compatibility</h2>
          <h1 className="text-5xl font-bold mt-2">{score}%</h1>
          <p className="mt-4 text-white/90 max-w-xl">
            AI-powered analysis of your resume performance in Applicant Tracking
            Systems.
          </p>
        </div>

        {/* RIGHT — Circular Progress */}
        <div className="flex justify-center">
          <div className="relative w-44 h-44">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="70"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="70"
                stroke="white"
                strokeWidth="10"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {score}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* ✨ Expandable Card */
/* ========================= */

function ExpandableCard({ title, children, icon }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>

        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

/* ========================= */
/* 🚀 Roadmap */
/* ========================= */

function RoadmapList({ text }) {
  const items = text?.split(/\d+\.\s/).filter(Boolean) || [];

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex gap-4">
          <div className="mt-1 h-3 w-3 rounded-full bg-indigo-600" />
          <p className="text-gray-700">{item.trim()}</p>
        </div>
      ))}
    </div>
  );
}

/* ========================= */
/* 📊 Radar Chart */
/* ========================= */

function SkillRadar({ SkillSnap }) {
  const data = SkillSnap.map((item) => ({
    subject: item.skill,
    A: item.score,
  }));

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="font-semibold mb-4">Skill Snapshot</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis />
            <Radar dataKey="A" />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ========================= */
/* 💡 Glass Tip */
/* ========================= */

function GlassTip({ suggestion }) {
  return (
    <div className="rounded-2xl p-6 bg-gradient-to-br from-white/60 to-white/30 backdrop-blur border border-white/40 shadow-sm">
      <h3 className="font-semibold mb-2">ATS Improvement Tip</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{suggestion}</p>
    </div>
  );
}
