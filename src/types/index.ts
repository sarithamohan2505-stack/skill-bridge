export type ProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentSkill {
  name: string;
  level: ProficiencyLevel;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  department: string;
  yearOfStudy: string; // e.g. "1st Year", "2nd Year", "3rd Year", "4th Year", "Post-Graduate"
  targetCareer?: string;
  skills: StudentSkill[];
  createdAt: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  averageSalary: string;
  growthOutlook: string;
  requiredSkills: string[];
  preferredSkills: string[];
  keyResponsibilities: string[];
  suggestedRoadmap: string[];
}

export interface Course {
  id: string;
  title: string;
  skillCovered: string;
  platform: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  url: string; // Verified real URL
  isFree: boolean;
  rating: number;
}

export interface AssessmentResult {
  id: string;
  studentId: string;
  studentName: string;
  targetCareer: string;
  timestamp: string;
  totalRequired: number;
  matchedSkills: string[];
  missingSkills: string[];
  skillGapPercentage: number;
  readinessPercentage: number;
  skillLevels: Record<string, ProficiencyLevel>;
  analysisSummary: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  department: string;
  subject: string;
  message: string;
  timestamp: string;
}
