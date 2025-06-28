export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  currentRole: string;
  targetRole?: string;
  skills: Skill[];
  learningPaths: LearningPath[];
  completedCourses: Course[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
  progress: number;
  lastUpdated: Date;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  milestones: Milestone[];
  totalDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  skillsToGain: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  resources: Resource[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
  completedAt?: Date;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'course' | 'book' | 'project';
  url?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolledStudents: number;
  skills: string[];
  progress: number;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface SkillGapAnalysis {
  relevantSkills: string[];
  criticalGaps: string[];
  niceToHave: string[];
  learningPriority: string[];
  overallReadiness: string;
}

export interface LearningRecommendation {
  type: 'course' | 'skill' | 'path';
  title: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}