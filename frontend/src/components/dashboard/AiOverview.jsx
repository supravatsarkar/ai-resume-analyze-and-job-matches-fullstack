import { CheckCircle, AlertTriangle, TrendingUp, Target } from "lucide-react";

export default function AiOverview({ data }) {
  return (
    <div className="space-y-6">
      {/* ===== ATS SCORE CARD ===== */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-sm opacity-90">ATS Compatibility Score</h2>
            <p className="text-4xl font-bold mt-1">{data.ATScore}%</p>
          </div>

          <div className="text-sm max-w-xl opacity-95">
            {data.ATSSuggestion}
          </div>
        </div>
      </div>

      {/* ===== SUMMARY ===== */}
      <SectionCard title="AI Professional Summary" icon={<Target />}>
        <p className="text-gray-700 leading-relaxed">{data.Summery}</p>
      </SectionCard>

      {/* ===== STRENGTH & WEAKNESS ===== */}
      <div className="grid md:grid-cols-2 gap-6">
        <SectionCard
          title="Key Strengths"
          icon={<CheckCircle className="text-green-600" />}
        >
          <p className="text-gray-700">{data.Strengths}</p>
        </SectionCard>

        <SectionCard
          title="Areas to Improve"
          icon={<AlertTriangle className="text-amber-600" />}
        >
          <p className="text-gray-700">{data.Weaknesses}</p>
        </SectionCard>
      </div>

      {/* ===== SKILL GAP ===== */}
      <SectionCard
        title="Skill Gap Analysis"
        icon={<TrendingUp className="text-rose-600" />}
      >
        <p className="text-gray-700">{data.SkillGap}</p>
      </SectionCard>

      {/* ===== FUTURE ROADMAP ===== */}
      <SectionCard title="Future Roadmap 🚀">
        <RoadmapList text={data.FutureRoadmap} />
      </SectionCard>
    </div>
  );
}

/* ========================= */
/* Reusable Section Card */
/* ========================= */
function SectionCard({ title, children, icon }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      {children}
    </div>
  );
}

/* ========================= */
/* Roadmap Parser */
/* ========================= */
function RoadmapList({ text }) {
  const items = text?.split(/\d+\.\s/).filter(Boolean) || [];

  return (
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-3">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-600" />
          <span className="text-gray-700">{item.trim()}</span>
        </li>
      ))}
    </ul>
  );
}
