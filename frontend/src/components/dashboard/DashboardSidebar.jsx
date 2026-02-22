import React from "react";
import { NavLink } from "react-router";

export default function DashboardSidebar() {
  const NavLinkBaseStyle = "block p-2 rounded-xl transition-colors";
  const NavLinkActiveStyle = `${NavLinkBaseStyle} bg-gray-900 text-white shadow`;
  const NavLinkStyle = `${NavLinkBaseStyle} hover:bg-gray-100 text-gray-700`;
  function handleLinkStyle({ isActive }) {
    return isActive ? NavLinkActiveStyle : NavLinkStyle;
  }
  return (
    <div className="w-50 bg-white border-r min-h-screen p-4 space-y-2">
      <NavLink className={handleLinkStyle} to="/dashboard" end>
        Overview
      </NavLink>
      <NavLink className={handleLinkStyle} to="/dashboard/resume" end>
        Resume Versions
      </NavLink>
      <NavLink className={handleLinkStyle} to="/dashboard/analysis" end>
        ATS Analysis
      </NavLink>
      <NavLink className={handleLinkStyle} to="/dashboard/jobs" end>
        Job Matches
      </NavLink>
      <NavLink className={handleLinkStyle} to="/dashboard/roadmap" end>
        Career Roadmap
      </NavLink>
    </div>
  );
}
