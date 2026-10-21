import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentUser, AssessmentResult, ProficiencyLevel } from '../types';
import { SAMPLE_STUDENTS, SAMPLE_ASSESSMENTS } from '../data/sampleStudents';

interface AuthContextType {
  currentUser: StudentUser | null;
  allUsers: StudentUser[];
  assessments: AssessmentResult[];
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (data: Omit<StudentUser, 'id' | 'createdAt' | 'skills'>) => { success: boolean; message: string };
  logout: () => void;
  quickDemoLogin: (email: string) => void;
  saveAssessment: (
    targetCareer: string,
    existingSkills: string[],
    skillLevels: Record<string, ProficiencyLevel>,
    requiredSkills: string[]
  ) => AssessmentResult;
  getUserAssessments: () => AssessmentResult[];
  updateTargetCareer: (careerTitle: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'skillbridge_students_v1';
const ASSESSMENTS_STORAGE_KEY = 'skillbridge_assessments_v1';
const CURRENT_USER_ID_KEY = 'skillbridge_current_user_id';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allUsers, setAllUsers] = useState<StudentUser[]>(() => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored users', e);
      }
    }
    return SAMPLE_STUDENTS;
  });

  const [assessments, setAssessments] = useState<AssessmentResult[]>(() => {
    const saved = localStorage.getItem(ASSESSMENTS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing stored assessments', e);
      }
    }
    return SAMPLE_ASSESSMENTS;
  });

  const [currentUser, setCurrentUser] = useState<StudentUser | null>(() => {
    const currentId = localStorage.getItem(CURRENT_USER_ID_KEY);
    if (currentId) {
      const match = allUsers.find(u => u.id === currentId);
      if (match) return match;
    }
    // Default to Priya Sharma as pre-logged-in student for instant demonstrability, or Alex
    return allUsers[1] || allUsers[0] || null;
  });

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem(ASSESSMENTS_STORAGE_KEY, JSON.stringify(assessments));
  }, [assessments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_ID_KEY, currentUser.id);
    } else {
      localStorage.removeItem(CURRENT_USER_ID_KEY);
    }
  }, [currentUser]);

  const login = (email: string, password: string) => {
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, message: 'No student account found with this email address.' };
    }
    if (user.password && user.password !== password) {
      return { success: false, message: 'Invalid password. Please verify and try again.' };
    }
    setCurrentUser(user);
    return { success: true, message: `Welcome back, ${user.name}!` };
  };

  const quickDemoLogin = (email: string) => {
    const user = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
    }
  };

  const register = (data: Omit<StudentUser, 'id' | 'createdAt' | 'skills'>) => {
    const exists = allUsers.some(u => u.email.toLowerCase() === data.email.toLowerCase());
    if (exists) {
      return { success: false, message: 'A student account is already registered with this email address.' };
    }

    const newUser: StudentUser = {
      ...data,
      id: `student-${Date.now()}`,
      skills: [],
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [...allUsers, newUser];
    setAllUsers(updated);
    setCurrentUser(newUser);
    return { success: true, message: `Account created successfully! Welcome, ${newUser.name}.` };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateTargetCareer = (careerTitle: string) => {
    if (!currentUser) return;
    const updated = { ...currentUser, targetCareer: careerTitle };
    setCurrentUser(updated);
    setAllUsers(prev => prev.map(u => (u.id === currentUser.id ? updated : u)));
  };

  const saveAssessment = (
    targetCareer: string,
    existingSkills: string[],
    skillLevels: Record<string, ProficiencyLevel>,
    requiredSkills: string[]
  ): AssessmentResult => {
    // Standard Formula:
    // Missing Skills = Required Skills - Existing Skills
    const missingSkills = requiredSkills.filter(req => !existingSkills.includes(req));
    const matchedSkills = requiredSkills.filter(req => existingSkills.includes(req));

    // Skill Gap % = (Missing Skills / Total Required Skills) * 100
    const totalRequired = requiredSkills.length;
    const skillGapPercentage = totalRequired > 0 
      ? Number(((missingSkills.length / totalRequired) * 100).toFixed(1))
      : 0;

    const readinessPercentage = totalRequired > 0
      ? Number(((matchedSkills.length / totalRequired) * 100).toFixed(1))
      : 100;

    let analysisSummary = '';
    if (skillGapPercentage === 0) {
      analysisSummary = `Incredible achievement! You have satisfied 100% of the core competencies for the ${targetCareer} track. Focus on advanced specialization, portfolio projects, and technical mock interviews.`;
    } else if (skillGapPercentage <= 35) {
      analysisSummary = `Great progress! You are close to market readiness with a small ${skillGapPercentage}% gap. Closing the ${missingSkills.length} missing skill(s) through our recommended courses will position you strongly for hiring.`;
    } else if (skillGapPercentage <= 65) {
      analysisSummary = `Solid starting foundation. You currently have a ${skillGapPercentage}% skill gap for ${targetCareer}. Follow the structured learning path below to acquire the ${missingSkills.length} missing core skills.`;
    } else {
      analysisSummary = `Early stage career readiness. With a ${skillGapPercentage}% skill gap for ${targetCareer}, we recommend starting with fundamental courses in ${missingSkills.slice(0, 2).join(' and ')} before moving into advanced domains.`;
    }

    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newAssessment: AssessmentResult = {
      id: `asmt-${Date.now()}`,
      studentId: currentUser ? currentUser.id : 'guest-student',
      studentName: currentUser ? currentUser.name : 'Guest Student',
      targetCareer,
      timestamp: formattedDate,
      totalRequired,
      matchedSkills,
      missingSkills,
      skillGapPercentage,
      readinessPercentage,
      skillLevels,
      analysisSummary
    };

    setAssessments(prev => [newAssessment, ...prev]);

    // Update user profile skills if logged in
    if (currentUser) {
      const studentSkills = existingSkills.map(name => ({
        name,
        level: skillLevels[name] || 'Intermediate'
      }));
      const updatedUser: StudentUser = {
        ...currentUser,
        targetCareer,
        skills: studentSkills
      };
      setCurrentUser(updatedUser);
      setAllUsers(prev => prev.map(u => (u.id === currentUser.id ? updatedUser : u)));
    }

    return newAssessment;
  };

  const getUserAssessments = () => {
    if (!currentUser) return [];
    return assessments.filter(a => a.studentId === currentUser.id);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        allUsers,
        assessments,
        login,
        register,
        logout,
        quickDemoLogin,
        saveAssessment,
        getUserAssessments,
        updateTargetCareer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
