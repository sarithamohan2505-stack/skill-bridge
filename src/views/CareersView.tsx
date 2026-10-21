import React from 'react';
import { CAREER_ROLES } from '../data/careersData';
import {
  Compass,
  ArrowRight,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  ListOrdered,
  Briefcase
} from 'lucide-react';

interface CareersViewProps {
  onSelectRoleForAnalysis: (roleTitle: string) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({ onSelectRoleForAnalysis }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Compass className="w-3.5 h-3.5" />
          <span>Industry Roles & Competencies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Career Pathways
        </h1>
        <p className="text-slate-600 text-sm">
          Detailed technical specifications, salary benchmarks, required core competencies, and career roadmaps for top tech roles.
        </p>
      </div>

      {/* Role Cards List */}
      <div className="space-y-8">
        {CAREER_ROLES.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition p-6 sm:p-8 space-y-6"
          >
            {/* Top Bar: Title & Benchmarks */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase tracking-wider">
                    {role.category}
                  </span>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{role.growthOutlook}</span>
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">{role.title}</h2>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {role.fullDescription}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                <div className="text-left md:text-right">
                  <div className="text-[11px] text-slate-400 uppercase font-semibold">Average Compensation</div>
                  <div className="text-sm font-bold text-slate-900">{role.averageSalary}</div>
                </div>

                <button
                  onClick={() => onSelectRoleForAnalysis(role.title)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
                >
                  <span>Analyze Gap for {role.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Core Competencies vs Preferred */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required Core Skills */}
              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                  <span>Mandatory Core Skills ({role.requiredSkills.length})</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {role.requiredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-white text-slate-800 border border-blue-200/80 px-2.5 py-1 rounded-xl font-medium shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferred Skills */}
              <div className="bg-purple-50/50 rounded-2xl p-4 border border-purple-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-600" />
                  <span>Preferred Industry Tools & Practices</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {role.preferredSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-white text-slate-800 border border-purple-200/80 px-2.5 py-1 rounded-xl font-medium shadow-2xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Suggested Learning Roadmap Steps */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-slate-500" />
                <span>Suggested 5-Step Academic Preparation Roadmap</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                {role.suggestedRoadmap.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1"
                  >
                    <div className="text-[10px] font-bold text-blue-600 uppercase">
                      Milestone {idx + 1}
                    </div>
                    <div className="text-slate-800 font-medium leading-snug">
                      {step.replace(/^Step \d+:\s*/, '')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
