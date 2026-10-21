import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CAREER_ROLES, ALL_SKILLS_CATALOG } from '../data/careersData';
import { COURSES_CATALOG } from '../data/coursesData';
import { SkillGapChart } from '../components/SkillGapChart';
import { ProficiencyLevel, Course, AssessmentResult } from '../types';
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Award,
  ExternalLink,
  Printer,
  Save,
  Check,
  UserCheck,
  GraduationCap
} from 'lucide-react';

interface AnalysisViewProps {
  initialCareerTitle?: string;
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  initialCareerTitle,
  setCurrentTab,
  openAuthModal
}) => {
  const { currentUser, saveAssessment } = useAuth();

  // State
  const [selectedCareerTitle, setSelectedCareerTitle] = useState<string>(
    initialCareerTitle || (currentUser?.targetCareer) || CAREER_ROLES[0].title
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillProficiencies, setSkillProficiencies] = useState<Record<string, ProficiencyLevel>>({});
  const [studentNameInput, setStudentNameInput] = useState<string>(currentUser?.name || '');

  // Assessment Calculation Result State
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Sync when initialCareerTitle or currentUser changes
  useEffect(() => {
    if (initialCareerTitle) {
      setSelectedCareerTitle(initialCareerTitle);
    }
  }, [initialCareerTitle]);

  useEffect(() => {
    if (currentUser) {
      setStudentNameInput(currentUser.name);
      if (currentUser.skills && currentUser.skills.length > 0) {
        setSelectedSkills(currentUser.skills.map(s => s.name));
        const levels: Record<string, ProficiencyLevel> = {};
        currentUser.skills.forEach(s => {
          levels[s.name] = s.level;
        });
        setSkillProficiencies(levels);
      }
    }
  }, [currentUser]);

  const currentRole = CAREER_ROLES.find(r => r.title === selectedCareerTitle) || CAREER_ROLES[0];

  const handleToggleSkill = (skillName: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skillName)) {
        return prev.filter(s => s !== skillName);
      } else {
        // Default proficiency to Intermediate when selected
        if (!skillProficiencies[skillName]) {
          setSkillProficiencies(p => ({ ...p, [skillName]: 'Intermediate' }));
        }
        return [...prev, skillName];
      }
    });
  };

  const handleLevelChange = (skillName: string, level: ProficiencyLevel) => {
    setSkillProficiencies(prev => ({
      ...prev,
      [skillName]: level
    }));
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    const required = currentRole.requiredSkills;

    // Calculation:
    // Missing Skills = Required Skills − Existing Skills
    const missing = required.filter(s => !selectedSkills.includes(s));
    const matched = required.filter(s => selectedSkills.includes(s));

    // Skill Gap Percentage = (Number of Missing Skills / Total Required Skills) × 100
    const totalRequired = required.length;
    const gapPct = totalRequired > 0 ? Number(((missing.length / totalRequired) * 100).toFixed(1)) : 0;
    const readinessPct = totalRequired > 0 ? Number(((matched.length / totalRequired) * 100).toFixed(1)) : 100;

    let summary = '';
    if (gapPct === 0) {
      summary = `Exceptional! You have matched all ${totalRequired} core required skills for ${currentRole.title}. You are exceptionally well-prepared for entry-level and junior roles in this specialization!`;
    } else if (gapPct <= 35) {
      summary = `Strong Foundation! You possess ${matched.length} out of ${totalRequired} required skills, leaving a minor ${gapPct}% skill gap. Bridging the ${missing.length} missing competency area(s) will place you in the top candidate tier.`;
    } else if (gapPct <= 65) {
      summary = `Moderate Alignment. You matched ${matched.length} of ${totalRequired} core skills with a ${gapPct}% skill gap. We recommend allocating study hours to the prioritized courses below.`;
    } else {
      summary = `Early Stage Preparation. You currently have a ${gapPct}% skill gap against the ${currentRole.title} requirements. Don't be discouraged! Starting with fundamental coursework in ${missing.slice(0, 2).join(' and ')} will build rapid momentum.`;
    }

    const calculatedResult: AssessmentResult = {
      id: `asmt-${Date.now()}`,
      studentId: currentUser ? currentUser.id : 'guest-student',
      studentName: studentNameInput.trim() || 'Student Candidate',
      targetCareer: currentRole.title,
      timestamp: new Date().toLocaleString(),
      totalRequired,
      matchedSkills: matched,
      missingSkills: missing,
      skillGapPercentage: gapPct,
      readinessPercentage: readinessPct,
      skillLevels: skillProficiencies,
      analysisSummary: summary
    };

    setResult(calculatedResult);
    setIsSaved(false);

    // If user is logged in, automatically save into the persistent storage
    if (currentUser) {
      saveAssessment(
        currentRole.title,
        selectedSkills,
        skillProficiencies,
        currentRole.requiredSkills
      );
      setIsSaved(true);
    }

    // Scroll smoothly to results
    setTimeout(() => {
      document.getElementById('assessment-results-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleManualSave = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (result) {
      saveAssessment(
        currentRole.title,
        selectedSkills,
        skillProficiencies,
        currentRole.requiredSkills
      );
      setIsSaved(true);
    }
  };

  const handleReset = () => {
    setSelectedSkills([]);
    setResult(null);
    setIsSaved(false);
  };

  // Filter recommended courses specifically for the missing skills
  const recommendedCourses: Course[] = result
    ? COURSES_CATALOG.filter(c => result.missingSkills.includes(c.skillCovered))
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Title & Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Interactive Skill Assessment Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Student Skill Gap Analysis
        </h1>
        <p className="text-slate-600 text-sm">
          Select your target career, check your existing capabilities with proficiency levels, and let our set-theoretic algorithm quantify your exact skill deficit.
        </p>
      </div>

      {/* Main Analysis Form */}
      <form onSubmit={handleAnalyze} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
        {/* Section 1: Candidate & Career Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Student Name / Profile
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                required
                value={studentNameInput}
                onChange={(e) => setStudentNameInput(e.target.value)}
                placeholder="Enter student name (e.g., Alex Chen)"
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition"
              />
              {currentUser && (
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-2 rounded-xl flex items-center gap-1 shrink-0 font-medium">
                  <UserCheck className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
            </div>
            {!currentUser && (
              <p className="text-[11px] text-slate-500 mt-1.5">
                Tip: <button type="button" onClick={() => openAuthModal('login')} className="text-blue-600 font-semibold hover:underline">Log in</button> to automatically save this assessment to your permanent college profile.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Target Career or Job Role
            </label>
            <select
              value={selectedCareerTitle}
              onChange={(e) => setSelectedCareerTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none transition bg-white"
            >
              {CAREER_ROLES.map((role) => (
                <option key={role.id} value={role.title}>
                  {role.title} ({role.category})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-1">
              {currentRole.shortDescription}
            </p>
          </div>
        </div>

        {/* Section 2: Industry Core Requirements for Chosen Role */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Industry Core Skills Required for {currentRole.title} ({currentRole.requiredSkills.length} Total):
              </h4>
            </div>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
              Standard Benchmark
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentRole.requiredSkills.map((reqSkill) => {
              const isSelected = selectedSkills.includes(reqSkill);
              return (
                <span
                  key={reqSkill}
                  className={`text-xs px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300'
                  }`}
                >
                  {isSelected ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  )}
                  <span>{reqSkill}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Section 3: Student's Current Skills Multi-Select & Proficiency Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Select Skills You Currently Possess:
              </label>
              <p className="text-xs text-slate-500">
                Check all that apply and adjust your self-evaluated proficiency level.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600">
              {selectedSkills.length} selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {ALL_SKILLS_CATALOG.map((skillItem) => {
              const isChecked = selectedSkills.includes(skillItem.name);
              const currentProficiency = skillProficiencies[skillItem.name] || 'Intermediate';

              return (
                <div
                  key={skillItem.name}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isChecked
                      ? 'bg-blue-50/60 border-blue-300 shadow-xs ring-1 ring-blue-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleSkill(skillItem.name)}
                      className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 leading-tight">
                        {skillItem.name}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {skillItem.category}
                      </div>
                    </div>
                  </label>

                  {/* Proficiency Level Selectors when checked */}
                  {isChecked && (
                    <div className="mt-3 pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Level:</span>
                      <div className="flex gap-1">
                        {(['Beginner', 'Intermediate', 'Advanced'] as ProficiencyLevel[]).map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() => handleLevelChange(skillItem.name, lvl)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition ${
                              currentProficiency === lvl
                                ? 'bg-blue-600 text-white shadow-xs'
                                : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300'
                            }`}
                          >
                            {lvl.charAt(0)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Selections</span>
          </button>

          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 transform hover:-translate-y-0.5 transition cursor-pointer"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Analyze Skills</span>
          </button>
        </div>
      </form>

      {/* Assessment Results Section */}
      {result && (
        <div id="assessment-results-section" className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    Assessment Report
                  </span>
                  <span className="text-xs text-slate-500">{result.timestamp}</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Skill Gap Results for {result.studentName}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Target Career Goal:{' '}
                  <span className="font-bold text-blue-700">{result.targetCareer}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  title="Print or Save PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>

                {!currentUser ? (
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Login to Save</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleManualSave}
                    disabled={isSaved}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                      isSaved
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Saved to Profile</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-3.5 h-3.5" />
                        <span>Save to Dashboard</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Calculations & Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 items-center">
              {/* Visual Doughnut Chart */}
              <div className="lg:col-span-1">
                <SkillGapChart
                  matchedCount={result.matchedSkills.length}
                  missingCount={result.missingSkills.length}
                  gapPercentage={result.skillGapPercentage}
                  readinessPercentage={result.readinessPercentage}
                />
              </div>

              {/* Formula & Quantitative Metrics Breakdown */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Mathematical Formula Applied:
                  </div>
                  <div className="font-mono text-xs text-slate-800 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <div>
                      <span className="text-blue-700 font-bold">Missing Skills</span> = Required ({result.totalRequired}) − Existing ({result.matchedSkills.length}) = <span className="text-rose-600 font-bold">{result.missingSkills.length}</span>
                    </div>
                    <div>
                      <span className="text-rose-600 font-bold">Skill Gap %</span> = (Missing [{result.missingSkills.length}] / Total Required [{result.totalRequired}]) × 100 = <strong className="text-rose-700 text-sm">{result.skillGapPercentage}%</strong>
                    </div>
                  </div>
                </div>

                {/* Qualitative Analysis Summary */}
                <div className="p-4 bg-blue-50/80 border border-blue-200/80 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Evaluation Insight:</span>
                  </div>
                  <p className="text-xs text-blue-950 leading-relaxed">
                    {result.analysisSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Side-by-side Skills Comparison: Matched vs Missing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 mt-8 border-t border-slate-100">
              {/* Matched Skills */}
              <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Skills You Already Have ({result.matchedSkills.length})</span>
                  </h4>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    Matched
                  </span>
                </div>

                {result.matchedSkills.length > 0 ? (
                  <div className="space-y-2">
                    {result.matchedSkills.map(skill => (
                      <div
                        key={skill}
                        className="bg-white p-2.5 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-medium text-slate-800 shadow-2xs"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          {skill}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                          {result.skillLevels[skill] || 'Intermediate'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic p-3 text-center">
                    No matching skills identified for this role yet. Follow the recommended courses below to get started!
                  </p>
                )}
              </div>

              {/* Missing Skills */}
              <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Skills You Need to Learn ({result.missingSkills.length})</span>
                  </h4>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    Action Required
                  </span>
                </div>

                {result.missingSkills.length > 0 ? (
                  <div className="space-y-2">
                    {result.missingSkills.map(skill => (
                      <div
                        key={skill}
                        className="bg-white p-2.5 rounded-xl border border-rose-100 flex items-center justify-between text-xs font-medium text-slate-800 shadow-2xs"
                      >
                        <span className="flex items-center gap-2 text-rose-900">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          {skill}
                        </span>
                        <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-semibold">
                          Deficit
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-100/70 border border-emerald-300 rounded-xl text-center text-emerald-900 text-xs font-semibold">
                    🎉 Incredible! You have 0 missing skills for this track. You are ready for job applications!
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section: Tailored Course Recommendations */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Tailored Learning Pathway
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  Recommended Courses to Close Your {result.skillGapPercentage}% Gap
                </h3>
                <p className="text-xs text-slate-600">
                  Showing 100% verified, real educational links filtered strictly by your missing competencies.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentTab('courses')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>View Full Course Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {recommendedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                          Bridges: {course.skillCovered}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {course.platform}
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm mb-2 leading-snug">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                        {course.description}
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 py-2 border-y border-slate-100 mb-4">
                        <div>
                          <span className="text-slate-400">Level:</span> <strong className="text-slate-700">{course.difficulty}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400">Time:</span> <strong className="text-slate-700">{course.duration}</strong>
                        </div>
                      </div>
                    </div>

                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>Start Learning on {course.platform}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                <Award className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Zero Skill Deficit Found!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  You have satisfied all core requirements for {result.targetCareer}. Explore other career tracks or advanced certifications.
                </p>
                <button
                  type="button"
                  onClick={() => setCurrentTab('careers')}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Explore Other Roles
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
