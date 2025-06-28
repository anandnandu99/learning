import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import StatsCard from '@/components/dashboard/StatsCard';
import SkillProgress from '@/components/dashboard/SkillProgress';
import LearningPathCard from '@/components/dashboard/LearningPathCard';
import { 
  BookOpen, 
  Target, 
  TrendingUp, 
  Award,
  Brain,
  Clock,
  Play,
  Search
} from 'lucide-react';
import { Skill, LearningPath } from '@/types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from an API
  const mockSkills: Skill[] = [
    {
      id: '1',
      name: 'JavaScript',
      level: 'intermediate',
      category: 'Programming',
      progress: 75,
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: 'React',
      level: 'intermediate',
      category: 'Frontend',
      progress: 65,
      lastUpdated: new Date()
    },
    {
      id: '3',
      name: 'Python',
      level: 'beginner',
      category: 'Programming',
      progress: 40,
      lastUpdated: new Date()
    },
    {
      id: '4',
      name: 'Machine Learning',
      level: 'beginner',
      category: 'AI/ML',
      progress: 25,
      lastUpdated: new Date()
    }
  ];

  const mockLearningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full Stack Developer Path',
      description: 'Master both frontend and backend development',
      milestones: [],
      totalDuration: '12 weeks',
      difficulty: 'intermediate',
      progress: 45,
      skillsToGain: ['Node.js', 'Database Design', 'API Development', 'DevOps'],
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'AI/ML Fundamentals',
      description: 'Learn the basics of artificial intelligence and machine learning',
      milestones: [],
      totalDuration: '8 weeks',
      difficulty: 'beginner',
      progress: 20,
      skillsToGain: ['Data Science', 'TensorFlow', 'Statistics', 'Deep Learning'],
      isActive: true,
      createdAt: new Date()
    }
  ];

  const handleContinueLearning = (pathId: string) => {
    navigate('/continue-learning');
  };

  const handleExploreCourses = () => {
    navigate('/explore-courses');
  };

  const handleSkillAssessment = () => {
    navigate('/skill-assessment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gradient mb-2">
            Welcome back, Deekshith 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Continue your learning journey and track your progress
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Skills"
            value={mockSkills.length}
            description="Skills you're currently developing"
            icon={Brain}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Learning Paths"
            value={mockLearningPaths.length}
            description="Personalized learning journeys"
            icon={Target}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Hours This Week"
            value="12.5"
            description="Time spent learning"
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Achievements"
            value="8"
            description="Milestones completed"
            icon={Award}
            trend={{ value: 25, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Progress */}
          <div className="lg:col-span-1">
            <SkillProgress skills={mockSkills} />
          </div>

          {/* Learning Paths */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-semibold">Active Learning Paths</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockLearningPaths.map((path) => (
                  <LearningPathCard
                    key={path.id}
                    learningPath={path}
                    onContinue={handleContinueLearning}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/continue-learning')}
              className="flex items-center space-x-3 p-4 rounded-lg bg-green-100 hover:bg-green-200 transition-colors group"
            >
              <Play className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium">Continue Learning</p>
                <p className="text-sm text-muted-foreground">Resume your courses</p>
              </div>
            </button>
            
            <button 
              onClick={handleExploreCourses}
              className="flex items-center space-x-3 p-4 rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors group"
            >
              <Search className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium">Explore Courses</p>
                <p className="text-sm text-muted-foreground">Find new learning opportunities</p>
              </div>
            </button>
            
            <button 
              onClick={handleSkillAssessment}
              className="flex items-center space-x-3 p-4 rounded-lg bg-purple-100 hover:bg-purple-200 transition-colors group"
            >
              <Target className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium">Skill Assessment</p>
                <p className="text-sm text-muted-foreground">Evaluate your current abilities</p>
              </div>
            </button>
            
            <button 
              onClick={() => navigate('/skills')}
              className="flex items-center space-x-3 p-4 rounded-lg bg-orange-100 hover:bg-orange-200 transition-colors group"
            >
              <TrendingUp className="h-6 w-6 text-orange-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-muted-foreground">Track your learning progress</p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;