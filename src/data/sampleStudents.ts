import { StudentUser, AssessmentResult } from '../types';

export const SAMPLE_STUDENTS: StudentUser[] = [
  {
    id: 'student-alex-001',
    name: 'Alex Chen',
    email: 'alex.chen@college.edu',
    password: 'password123',
    department: 'Computer Science & Engineering',
    yearOfStudy: '3rd Year',
    targetCareer: 'Data Scientist',
    skills: [
      { name: 'Python Programming', level: 'Intermediate' },
      { name: 'SQL and Database Management', level: 'Beginner' },
      { name: 'Communication Skills', level: 'Intermediate' }
    ],
    createdAt: '2026-09-15'
  },
  {
    id: 'student-priya-002',
    name: 'Priya Sharma',
    email: 'priya.sharma@college.edu',
    password: 'password123',
    department: 'Information Technology',
    yearOfStudy: '4th Year',
    targetCareer: 'Data Analyst',
    skills: [
      { name: 'Excel', level: 'Advanced' },
      { name: 'SQL and Database Management', level: 'Intermediate' },
      { name: 'Data Visualization', level: 'Intermediate' },
      { name: 'Communication Skills', level: 'Advanced' }
    ],
    createdAt: '2026-08-20'
  },
  {
    id: 'student-rahul-003',
    name: 'Rahul Patel',
    email: 'rahul.patel@college.edu',
    password: 'password123',
    department: 'Electronics & Communication',
    yearOfStudy: '2nd Year',
    targetCareer: 'Python Developer',
    skills: [
      { name: 'Python Programming', level: 'Beginner' },
      { name: 'Communication Skills', level: 'Intermediate' }
    ],
    createdAt: '2026-10-01'
  }
];

export const SAMPLE_ASSESSMENTS: AssessmentResult[] = [
  {
    id: 'asmt-alex-101',
    studentId: 'student-alex-001',
    studentName: 'Alex Chen',
    targetCareer: 'Data Scientist',
    timestamp: '2026-10-14 14:30',
    totalRequired: 6,
    matchedSkills: ['Python Programming', 'SQL and Database Management'],
    missingSkills: ['Statistics', 'Machine Learning', 'Data Analysis', 'Data Visualization'],
    skillGapPercentage: 66.7,
    readinessPercentage: 33.3,
    skillLevels: {
      'Python Programming': 'Intermediate',
      'SQL and Database Management': 'Beginner',
      'Communication Skills': 'Intermediate'
    },
    analysisSummary: 'You have solid coding fundamentals in Python and basic SQL knowledge. To reach your Data Scientist goal, prioritize Statistics and Machine Learning theory followed by hands-on exploratory Data Analysis.'
  },
  {
    id: 'asmt-priya-102',
    studentId: 'student-priya-002',
    studentName: 'Priya Sharma',
    targetCareer: 'Data Analyst',
    timestamp: '2026-10-18 10:15',
    totalRequired: 6,
    matchedSkills: ['SQL and Database Management', 'Excel', 'Data Visualization', 'Communication Skills'],
    missingSkills: ['Data Analysis', 'Statistics'],
    skillGapPercentage: 33.3,
    readinessPercentage: 66.7,
    skillLevels: {
      'Excel': 'Advanced',
      'SQL and Database Management': 'Intermediate',
      'Data Visualization': 'Intermediate',
      'Communication Skills': 'Advanced'
    },
    analysisSummary: 'Excellent foundation! You possess 4 out of 6 required skills. Bridging the gap in foundational Statistics and formal Data Analysis methodology will make you fully job-ready for top Data Analyst roles.'
  }
];
