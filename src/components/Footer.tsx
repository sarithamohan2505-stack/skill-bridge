import React from 'react';
import { GraduationCap, Code2, Database, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  openProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, openProjectModal }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: System Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-bold text-white text-base">SkillBridge AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Student Skill Gap Analysis and Course Suggestion System. An end-to-end college academic engineering project designed to assess competencies and map custom learning pathways.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Academic Demonstration System</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentTab('home')} className="hover:text-white transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('analysis')} className="hover:text-white transition">
                  Skill Gap Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('courses')} className="hover:text-white transition">
                  Verified Course Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('careers')} className="hover:text-white transition">
                  Career Role Profiles
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('dashboard')} className="hover:text-white transition">
                  Student Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Implementation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Technical Stack</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Backend: Python Flask & REST Routes</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                <span>Database: SQLite with Parameterized Queries</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">f</span>
                <span>Formula: Missing = Required − Existing</span>
              </li>
              <li>
                <button
                  onClick={openProjectModal}
                  className="mt-2 text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4 flex items-center gap-1.5"
                >
                  Download Complete Flask Package (.ZIP)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Project Info & Disclaimer */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">College Mini-Project</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Department of Computer Science & Engineering. Designed for local execution in Visual Studio Code on Windows.
            </p>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 font-mono">
              Formula: Gap % = (Missing / Total) × 100
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 Student Skill Gap Analysis & Course Suggestion System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with modern web engineering standards <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
