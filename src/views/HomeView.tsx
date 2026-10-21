import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CAREER_ROLES } from '../data/careersData';
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  Compass,
  BookOpen,
  Award,
  CheckCircle2,
  Cpu,
  Layers,
  GraduationCap,
  Download,
  Users
} from 'lucide-react';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'register') => void;
  openProjectModal: () => void;
  onSelectCareerForAnalysis: (careerId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  openAuthModal,
  openProjectModal,
  onSelectCareerForAnalysis
}) => {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-inner">
        {/* Decorative background glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-amber-300">
            <GraduationCap className="w-4 h-4" />
            <span>College Engineering Final / Mini-Project System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Discover Your Skills.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-200">
              Bridge Your Gaps.
            </span>{' '}
            Build Your Future.
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            An intelligent, data-driven skill assessment platform designed to help students evaluate their current competencies against real-world tech industry benchmarks and unlock tailored course recommendations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('analysis')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-blue-500/30 flex items-center gap-2 transform hover:-translate-y-0.5 transition cursor-pointer"
            >
              <BarChart3 className="w-5 h-5" />
              <span>Analyze My Skills</span>
            </button>

            <button
              onClick={() => setCurrentTab('courses')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-sm sm:text-base rounded-2xl backdrop-blur-md flex items-center gap-2 transform hover:-translate-y-0.5 transition cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-sky-400" />
              <span>Explore Courses</span>
            </button>

            {!currentUser && (
              <button
                onClick={() => openAuthModal('register')}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm sm:text-base rounded-2xl shadow-md flex items-center gap-2 transform hover:-translate-y-0.5 transition cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Stats Banner */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">6+</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Career Pathways</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">100%</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Verified Free Courses</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">Formula</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Set-Theoretic Gap Math</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">SQLite</div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">Student Persistence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            System Features
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mt-3">
            Core Modules of the Skill Gap Platform
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Engineered to bridge the divide between theoretical university coursework and competitive industry hiring requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Skill Gap Analysis */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Automated Skill Gap Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Input your existing competencies and chosen role. The system instantly applies mathematical difference logic:
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px] text-slate-700 space-y-1 mb-4">
                <div>Missing = Required − Existing</div>
                <div>Gap % = (Missing / Total) × 100</div>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('analysis')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 pt-2"
            >
              <span>Launch Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 2: Career Guidance */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Targeted Career Guidance</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Explore in-depth specifications for Data Analyst, Data Scientist, Machine Learning Engineer, Business Analyst, and Python Developer roles with salary insights and roadmaps.
              </p>
              <ul className="text-xs text-slate-600 space-y-1.5 mb-4">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Salary benchmarks & industry demand</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Standardized core skill requirements</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>5-step progressive learning roadmap</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setCurrentTab('careers')}
              className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 pt-2"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Feature 3: Verified Course Suggestions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Verified Course Recommendations</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Receive directly mapped learning paths only for your missing skills. Every single course links to legitimate, verified platforms like freeCodeCamp, Harvard CS50, and Kaggle.
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Harvard CS50</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">freeCodeCamp</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Kaggle Learn</span>
                <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">Khan Academy</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentTab('courses')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 pt-2"
            >
              <span>Browse Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Workflow
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              How It Works: 3 Simple Steps
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From academic assessment to actionable career upskilling in under 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Select Career & Input Skills</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose your dream career path from our catalog and check off the skills you've acquired through college coursework, labs, or personal projects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-purple-600 text-white font-black text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Mathematical Gap Analysis</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The system isolates missing skills, calculates the percentage gap, and generates an interactive doughnut chart showing your job readiness level.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Targeted Course Roadmaps</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instantly access verified courses mapped directly to your deficit skills, save the assessment to your student dashboard, or export the report.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Pathways Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Popular Tracks
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              Featured Tech Career Pathways
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Select any role below to immediately test your skill alignment.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('careers')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All 6 Roles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAREER_ROLES.slice(0, 3).map((role) => (
            <div
              key={role.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {role.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600">{role.growthOutlook.split('(')[0]}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{role.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {role.shortDescription}
                </p>

                <div className="mb-4">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Required Core Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {role.requiredSkills.slice(0, 4).map((s) => (
                      <span key={s} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                    {role.requiredSkills.length > 4 && (
                      <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                        +{role.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectCareerForAnalysis(role.title)}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>Analyze Gap for {role.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Project Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5" />
              <span>Full Source Code ZIP Available</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Need to Run this Locally in VS Code for College?
            </h3>
            <p className="text-amber-100 text-sm max-w-xl">
              Download the complete standalone Python Flask project with SQLite database schema, CSV dataset, templates, and Windows terminal execution instructions.
            </p>
          </div>

          <button
            onClick={openProjectModal}
            className="px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm rounded-2xl shadow-md shrink-0 flex items-center gap-2 transform hover:scale-105 transition"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Download Python Flask Code (.ZIP)</span>
          </button>
        </div>
      </section>
    </div>
  );
};
