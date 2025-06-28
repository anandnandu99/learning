import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LearningPathGenerator from '@/components/learning/LearningPathGenerator';
import LearningPathCard from '@/components/dashboard/LearningPathCard';
import { LearningPath } from '@/types';
import { Plus, Target, Clock, BookOpen } from 'lucide-react';

const LearningPaths: React.FC = () => {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      title: 'Full Stack Developer Path',
      description: 'Master both frontend and backend development with modern technologies',
      milestones: [
        {
          id: 'm1',
          title: 'Frontend Fundamentals',
          description: 'Learn HTML, CSS, and JavaScript basics',
          duration: '3 weeks',
          skills: ['HTML', 'CSS', 'JavaScript'],
          resources: [],
          difficulty: 'beginner',
          isCompleted: true,
          completedAt: new Date()
        },
        {
          id: 'm2',
          title: 'React Development',
          description: 'Build interactive UIs with React',
          duration: '4 weeks',
          skills: ['React', 'JSX', 'State Management'],
          resources: [],
          difficulty: 'intermediate',
          isCompleted: true,
          completedAt: new Date()
        },
        {
          id: 'm3',
          title: 'Backend with Node.js',
          description: 'Create server-side applications',
          duration: '3 weeks',
          skills: ['Node.js', 'Express', 'APIs'],
          resources: [],
          difficulty: 'intermediate',
          isCompleted: false
        },
        {
          id: 'm4',
          title: 'Database Integration',
          description: 'Work with databases and data persistence',
          duration: '2 weeks',
          skills: ['MongoDB', 'SQL', 'Database Design'],
          resources: [],
          difficulty: 'intermediate',
          isCompleted: false
        }
      ],
      totalDuration: '12 weeks',
      difficulty: 'intermediate',
      progress: 50,
      skillsToGain: ['React', 'Node.js', 'MongoDB', 'API Development'],
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'AI/ML Fundamentals',
      description: 'Learn the basics of artificial intelligence and machine learning',
      milestones: [
        {
          id: 'm5',
          title: 'Python for Data Science',
          description: 'Master Python programming for data analysis',
          duration: '2 weeks',
          skills: ['Python', 'NumPy', 'Pandas'],
          resources: [],
          difficulty: 'beginner',
          isCompleted: false
        },
        {
          id: 'm6',
          title: 'Statistics & Probability',
          description: 'Understand statistical concepts for ML',
          duration: '2 weeks',
          skills: ['Statistics', 'Probability', 'Data Analysis'],
          resources: [],
          difficulty: 'intermediate',
          isCompleted: false
        },
        {
          id: 'm7',
          title: 'Machine Learning Algorithms',
          description: 'Learn core ML algorithms and techniques',
          duration: '3 weeks',
          skills: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation'],
          resources: [],
          difficulty: 'intermediate',
          isCompleted: false
        },
        {
          id: 'm8',
          title: 'Deep Learning Basics',
          description: 'Introduction to neural networks',
          duration: '3 weeks',
          skills: ['Neural Networks', 'TensorFlow', 'Deep Learning'],
          resources: [],
          difficulty: 'advanced',
          isCompleted: false
        }
      ],
      totalDuration: '10 weeks',
      difficulty: 'intermediate',
      progress: 0,
      skillsToGain: ['Python', 'Machine Learning', 'TensorFlow', 'Data Science'],
      isActive: false,
      createdAt: new Date()
    }
  ]);

  const handlePathGenerated = (newPath: LearningPath) => {
    setLearningPaths(prev => [...prev, newPath]);
  };

  const handleContinueLearning = (pathId: string) => {
    console.log('Continue learning path:', pathId);
  };

  const activePaths = learningPaths.filter(path => path.isActive);
  const completedPaths = learningPaths.filter(path => path.progress === 100);
  const availablePaths = learningPaths.filter(path => !path.isActive && path.progress < 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            Learning Paths
          </h1>
          <p className="text-muted-foreground text-lg">
            Structured journeys to achieve your learning goals
          </p>
        </motion.div>

        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="active">Active ({activePaths.length})</TabsTrigger>
            <TabsTrigger value="available">Available ({availablePaths.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedPaths.length})</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activePaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activePaths.map((path) => (
                  <LearningPathCard
                    key={path.id}
                    learningPath={path}
                    onContinue={handleContinueLearning}
                  />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Active Learning Paths</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a new learning path to begin your journey
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Learning Path
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Detailed view for active paths */}
            {activePaths.map((path) => (
              <motion.div
                key={`detail-${path.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="skill-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{path.totalDuration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4" />
                        <span>{path.milestones.length} milestones</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{path.skillsToGain.length} skills to gain</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Overall Progress</span>
                        <span>{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} className="h-3" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Milestones</h4>
                      <div className="space-y-3">
                        {path.milestones.map((milestone, index) => (
                          <div
                            key={milestone.id}
                            className={`flex items-center space-x-3 p-3 rounded-lg border ${
                              milestone.isCompleted
                                ? 'bg-green-50 border-green-200'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium ${
                                milestone.isCompleted
                                  ? 'bg-green-600 text-white'
                                  : 'bg-gray-300 text-gray-600'
                              }`}
                            >
                              {milestone.isCompleted ? '✓' : index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{milestone.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {milestone.description}
                              </p>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {milestone.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="font-medium text-sm">Skills you'll gain:</p>
                      <div className="flex flex-wrap gap-1">
                        {path.skillsToGain.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availablePaths.map((path) => (
                <LearningPathCard
                  key={path.id}
                  learningPath={path}
                  onContinue={handleContinueLearning}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedPaths.map((path) => (
                  <LearningPathCard
                    key={path.id}
                    learningPath={path}
                    onContinue={handleContinueLearning}
                  />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Paths Yet</h3>
                  <p className="text-muted-foreground">
                    Complete your first learning path to see it here
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <LearningPathGenerator
              skills={['JavaScript', 'React', 'Python']}
              currentLevel="intermediate"
              goals={['Full Stack Development', 'Machine Learning']}
              onPathGenerated={handlePathGenerated}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningPaths;