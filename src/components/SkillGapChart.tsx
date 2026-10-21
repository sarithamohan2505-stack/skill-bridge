import React from 'react';

interface SkillGapChartProps {
  matchedCount: number;
  missingCount: number;
  gapPercentage: number;
  readinessPercentage: number;
}

export const SkillGapChart: React.FC<SkillGapChartProps> = ({
  matchedCount,
  missingCount,
  gapPercentage,
  readinessPercentage
}) => {
  const total = matchedCount + missingCount;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  // Arc lengths
  const readinessOffset = circumference - (readinessPercentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
      <div className="relative flex items-center justify-center">
        <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth="14"
            fill="transparent"
          />
          {/* Matched Readiness Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#2563eb"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={readinessOffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {readinessPercentage}%
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Readiness
          </span>
        </div>
      </div>

      {/* Legend & Breakdown */}
      <div className="grid grid-cols-2 gap-4 mt-6 w-full max-w-xs text-sm">
        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1.5 text-blue-700 font-semibold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
            Matched Skills
          </div>
          <div className="text-xl font-bold text-blue-900">{matchedCount} / {total}</div>
        </div>

        <div className="p-3 bg-rose-50/70 border border-rose-100 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1.5 text-rose-700 font-semibold mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
            Skill Gap
          </div>
          <div className="text-xl font-bold text-rose-900">{gapPercentage}%</div>
        </div>
      </div>
    </div>
  );
};
