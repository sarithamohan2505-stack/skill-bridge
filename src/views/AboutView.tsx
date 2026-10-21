import React from 'react';
import {
  Info,
  GraduationCap,
  Calculator,
  ShieldAlert,
  CheckCircle2,
  Database,
  Code2,
  BookOpen
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Info className="w-3.5 h-3.5" />
          <span>Academic Background & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About the Skill Gap Analysis System
        </h1>
        <p className="text-slate-600 text-sm">
          A college mini-project designed to bridge university theory with real-world industry employability benchmarks.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
        {/* Project Objectives */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>1. Project Motivation & Objectives</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            In modern engineering education, students often complete extensive coursework without clear visibility into how their academic knowledge maps to industry hiring standards. While university syllabi emphasize foundational mathematics and theory, tech employers prioritize specific toolchains, database proficiency, and modern frameworks.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed mt-2">
            This platform empowers students to conduct self-assessments, discover exact competencies they are missing, quantify their readiness score through standardized mathematical formulas, and receive immediate, verified course suggestions to systematically close their skill gap.
          </p>
        </div>

        {/* Set Theoretic Mathematical Foundation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-purple-600" />
            <span>2. Mathematical Algorithm & Formulation</span>
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            The system employs set-theoretic difference operations to evaluate competency gaps:
          </p>
          <div className="bg-white p-4 rounded-xl border border-slate-200 font-mono text-xs text-slate-800 space-y-2">
            <div className="font-bold text-blue-700">
              Let R = Required Skills Set, E = Existing Student Skills Set
            </div>
            <div>
              <strong>Missing Skills Set (M):</strong> M = R \ E = {'{'} s ∈ R | s ∉ E {'}'}
            </div>
            <div>
              <strong>Matched Skills Set:</strong> R ∩ E
            </div>
            <div className="pt-2 border-t border-slate-100 text-rose-600 font-bold">
              Skill Gap Percentage = (|M| / |R|) × 100
            </div>
            <div className="text-emerald-700 font-bold">
              Skill Readiness Percentage = (|R ∩ E| / |R|) × 100
            </div>
          </div>
        </div>

        {/* System Benefits */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>3. Key Student & Institutional Benefits</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
              <strong className="text-emerald-900 text-sm block mb-1">Targeted Learning</strong>
              <p className="text-slate-600">
                Eliminates wasted study time by prioritizing only genuine skill deficits rather than repetitive basics.
              </p>
            </div>
            <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
              <strong className="text-blue-900 text-sm block mb-1">Authentic Resources</strong>
              <p className="text-slate-600">
                Guarantees students only study through verified, high-quality open curriculums (Harvard, freeCodeCamp, Kaggle).
              </p>
            </div>
            <div className="p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
              <strong className="text-purple-900 text-sm block mb-1">Progress Tracking</strong>
              <p className="text-slate-600">
                Persistent assessment logs let students measure how their gap decreases semester over semester.
              </p>
            </div>
          </div>
        </div>

        {/* Honest Limitations */}
        <div className="bg-rose-50/60 p-6 rounded-2xl border border-rose-200">
          <h3 className="text-base font-bold text-rose-900 mb-2 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>4. Honest System Limitations (Academic Disclosure)</span>
          </h3>
          <p className="text-xs text-rose-800 mb-3">
            In the interest of academic integrity and scientific rigor, the system highlights the following operational constraints:
          </p>
          <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
            <li>
              <strong>Self-Reported Evaluation:</strong> The current release relies on student self-declarations rather than automated coding sandboxes or proctored assessments.
            </li>
            <li>
              <strong>Generalized Industry Archetypes:</strong> Job roles like "Data Scientist" differ between startups and large enterprises. Our skill lists represent aggregate industry consensus.
            </li>
            <li>
              <strong>Curated vs. Real-Time Indexing:</strong> Course URLs are curated and verified manually to ensure 100% link reliability, rather than crawled in real time from commercial marketplaces.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
