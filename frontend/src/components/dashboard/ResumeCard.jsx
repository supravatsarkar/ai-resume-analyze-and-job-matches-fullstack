import { FileText, Download, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import Dialog from "./Dialog";
import PremiumAiOverview from "./PremiumAiOverview";
import axios from "axios";

function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString();
  } catch {
    return date;
  }
}

export default function ResumeCard({ resume, onExport, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <div className="flex gap-4 min-w-0">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
            <FileText size={22} />
          </div>

          <div className="min-w-0">
            {/* File name */}
            <h3 className="font-semibold text-gray-900 truncate">
              {resume?.name?.slice(0, 30) || "Untitled"}
            </h3>

            {/* Date */}
            <p className="text-xs text-gray-500 mt-1">
              Created: {formatDate(resume.createdAt)}
            </p>

            {/* Short content */}
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {resume.sortContentText}
            </p>
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
          >
            <Eye size={16} />
            Report
          </button>
          {onExport && (
            <button
              onClick={() => onExport(resume)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition"
            >
              <Download size={16} />
              Original
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete?.(resume._id)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition"
            >
              <Trash2 size={16} />
              Delete
            </button>
          )}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="AI Resume Analysis"
        size="xl"
      >
        <PremiumAiOverview data={resume?.aiResponse} />
      </Dialog>
    </div>
  );
}
