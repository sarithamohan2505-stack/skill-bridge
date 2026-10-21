import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CAREER_ROLES } from '../data/careersData';
import { COURSES_CATALOG } from '../data/coursesData';
import { SkillGapChart } from '../components/SkillGapChart';
import {
  GraduationCap,
  LayoutDashboard,
  BarChart3,
  Calendar,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
  RefreshCw,
  FolderTree
} from 'lucide-react';

interface DashboardViewProps {
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
  onPerformNewAnalysis: (careerTitle?: string) => void;
  openProjectModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  setCurrentTab,
  openAuthModal,
  onPerformNewAnalysis,
  openProjectModal
}) => {
  const { currentUser, getUserAssessments } = useAuth();
  const userAssessments = getUserAssessments();
  const latestAssessment = userAssessments[0] || null;

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-3xl flex items-center justify-center mx-auto">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">Student Dashboard</h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          Sign in or register to access your personalized student records, track past skill gap assessments, and view custom course recommendations.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl shadow hover:bg-blue-700 transition"
          >
            Log In to Portal
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  // Active target role details
  const targetCareerTitle = latestAssessment?.targetCareer || currentUser.targetCareer || CAREER_ROLES[0].title;
  const targetRole = CAREER_ROLES.find(r => r.title === targetCareerTitle) || CAREER_ROLES[0];

  // Missing skills from latest assessment or default required skills
  const studentSkillNames = currentUser.skills.map(s => s.name);
  const missingSkills = latestAssessment
    ? latestAssessment.missingSkills
    : targetRole.requiredSkills.filter(s => !studentSkillNames.includes(s));
  const matchedSkills = latestAssessment
    ? latestAssessment.matchedSkills
    : targetRole.requiredSkills.filter(s => studentSkillNames.includes(s));

  const totalRequired = targetRole.requiredSkills.length;
  const currentGap = totalRequired > 0 ? Number(((missingSkills.length / totalRequired) * 100).toFixed(1)) : 0;
  const currentReadiness = totalRequired > 0 ? Number(((matchedSkills.length / totalRequired) * 100).toFixed(1)) : 100;

  // Filter recommended courses for missing skills
  const recommendedCourses = COURSES_CATALOG.filter(c => missingSkills.includes(c.skillCovered)).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Profile Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400 text-slate-900 font-mono">
                {currentUser.yearOfStudy}
              </span>
              <span className="text-xs text-blue-200">
                Department of {currentUser.department}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser.name}!
            </h1>
            <p className="text-xs text-blue-100 max-w-xl">
              Target Career Track:{' '}
              <span className="font-bold text-amber-300 underline underline-offset-4">
                {targetCareerTitle}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onPerformNewAnalysis(targetCareerTitle)}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Perform New Analysis</span>
            </button>
            <button
              onClick={openProjectModal}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              <FolderTree className="w-4 h-4 text-amber-300" />
              <span>Flask Project ZIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics & Skill Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric 1: Readiness Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Career Readiness Index
            </h3>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              {targetCareerTitle}
            </span>
          </div>

          <SkillGapChart
            matchedCount={matchedSkills.length}
            missingCount={missingSkills.length}
            gapPercentage={currentGap}
            readinessPercentage={currentReadiness}
          />
        </div>

        {/* Metric 2: Existing Competencies */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Existing Verified Skills</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                {matchedSkills.length} Acquired
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Core abilities you have already cleared for this career benchmark:
            </p>

            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">
                No matching skills recorded yet. Run a skill analysis to map your coursework!
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-right">
            <button
              onClick={() => onPerformNewAnalysis(targetCareerTitle)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              <span>Update skills</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Actionable Missing Skills */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Identified Skill Gaps</span>
              </h3>
              <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                {missingSkills.length} Deficit
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Missing competencies blocking full job candidacy for {targetCareerTitle}:
            </p>

            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missingSkills.map(skill => (
                  <span
                    key={skill}
                    className="text-xs bg-rose-50 text-rose-800 border border-rose-200 px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-semibold flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Zero gap! You meet 100% of the core requirements.</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 text-right">
            <button
              onClick={() => setCurrentTab('courses')}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1"
            >
              <span>View closing courses</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Courses Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Personalized Course Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              Curated verified courses addressing your specific missing skills for {targetCareerTitle}.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('courses')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All 15+ Courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recommendedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-slate-50/70 rounded-2xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-xs transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold mb-2">
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-800 rounded-md">
                      {c.skillCovered}
                    </span>
                    <span className="text-slate-500">{c.difficulty}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs mb-1.5 leading-snug">
                    {c.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {c.description}
                  </p>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 bg-white border border-slate-300 hover:bg-blue-600 hover:text-white hover:border-blue-600 rounded-xl text-[11px] font-semibold text-slate-700 flex items-center justify-center gap-1 transition"
                >
                  <span>Start on {c.platform}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic py-4 text-center">
            No active skill gaps detected for this career profile. Great job!
          </p>
        )}
      </div>

      {/* Assessment History Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Assessment History Log</h3>
            <p className="text-xs text-slate-500">
              Audit trail of previous assessments recorded in your student profile.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            {userAssessments.length} Past Records
          </span>
        </div>

        {userAssessments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Career Goal</th>
                  <th className="py-3 px-4">Matched</th>
                  <th className="py-3 px-4">Missing</th>
                  <th className="py-3 px-4">Gap %</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userAssessments.map((asmt) => (
                  <tr key={asmt.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{asmt.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{asmt.targetCareer}</td>
                    <td className="py-3 px-4 text-emerald-700 font-semibold">{asmt.matchedSkills.length}</td>
                    <td className="py-3 px-4 text-rose-700 font-semibold">{asmt.missingSkills.length}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full font-bold text-[11px] bg-rose-50 text-rose-700 border border-rose-200">
                        {asmt.skillGapPercentage}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onPerformNewAnalysis(asmt.targetCareer)}
                        className="px-2.5 py-1 text-blue-600 hover:text-blue-800 font-bold hover:bg-blue-50 rounded-lg transition"
                      >
                        Re-Assess
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-xs text-slate-500 mb-2">You haven't run any assessments yet.</p>
            <button
              onClick={() => onPerformNewAnalysis()}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Take First Assessment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
