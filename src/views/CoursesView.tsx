import React, { useState, useMemo } from 'react';
import { COURSES_CATALOG } from '../data/coursesData';
import { ALL_SKILLS_CATALOG } from '../data/careersData';
import {
  BookOpen,
  Search,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  BarChart,
  Star,
  Sparkles,
  Award
} from 'lucide-react';

export const CoursesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [freeOnly, setFreeOnly] = useState<boolean>(false);

  const filteredCourses = useMemo(() => {
    return COURSES_CATALOG.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skillCovered.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.platform.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSkill = selectedSkill === 'All' || course.skillCovered === selectedSkill;
      const matchesDifficulty = selectedDifficulty === 'All' || course.difficulty === selectedDifficulty;
      const matchesFree = !freeOnly || course.isFree;

      return matchesSearch && matchesSkill && matchesDifficulty && matchesFree;
    });
  }, [searchQuery, selectedSkill, selectedDifficulty, freeOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Curated Learning Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Recommended Courses
        </h1>
        <p className="text-slate-600 text-sm">
          Browse top-tier educational materials specifically cataloged to close college student skill gaps. Every course link is 100% verified and free or open-access where indicated.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Keyword Search */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skill, platform (e.g., Python, Harvard, SQL, Kaggle)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
            />
          </div>

          {/* Skill Filter */}
          <div>
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              <option value="All">All Skills Covered</option>
              {ALL_SKILLS_CATALOG.map((skill) => (
                <option key={skill.name} value={skill.name}>
                  {skill.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Free Only Toggle & Quick Skill Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-semibold mr-1">Quick Filter:</span>
            {['All', 'Python Programming', 'SQL and Database Management', 'Machine Learning'].map(
              (pill) => (
                <button
                  key={pill}
                  onClick={() => setSelectedSkill(pill)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                    selectedSkill === pill
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {pill}
                </button>
              )
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 font-medium">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(e) => setFreeOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
            />
            <span>Free / Open Access Only</span>
          </label>
        </div>
      </div>

      {/* Course Grid */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Showing {filteredCourses.length} verified courses</span>
        <span>{freeOnly ? 'Filtered to 100% Free' : 'All formats'}</span>
      </div>

      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {course.skillCovered}
                  </span>
                  {course.isFree ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Free Access
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Specialization
                    </span>
                  )}
                </div>

                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {course.platform}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-[11px] text-slate-600 mb-4 text-center">
                  <div>
                    <div className="text-slate-400 text-[10px]">Difficulty</div>
                    <div className="font-bold text-slate-800">{course.difficulty}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Duration</div>
                    <div className="font-bold text-slate-800">{course.duration}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Rating</div>
                    <div className="font-bold text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={course.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Launch Verified Course</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No matching courses found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords, clear filters, or view all available skills.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSkill('All');
              setSelectedDifficulty('All');
              setFreeOnly(false);
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
