import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Clock, 
  BookOpen, 
  CheckCircle,
  RotateCcw,
  Trophy,
  Calendar
} from 'lucide-react';

interface InProgressCourse {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed: Date;
  estimatedTimeLeft: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nextLesson: string;
}

interface InProgressQuiz {
  id: string;
  title: string;
  course: string;
  progress: number;
  totalQuestions: number;
  answeredQuestions: number;
  lastAccessed: Date;
  timeLimit: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ContinueLearning: React.FC = () => {
  const [inProgressCourses] = useState<InProgressCourse[]>([
    {
      id: '1',
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts',
      instructor: 'Sarah Johnson',
      progress: 65,
      totalLessons: 45,
      completedLessons: 29,
      lastAccessed: new Date('2024-01-15'),
      estimatedTimeLeft: '8 hours',
      category: 'Frontend Development',
      difficulty: 'intermediate',
      nextLesson: 'React Hooks Deep Dive'
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Learn Python programming with focus on data analysis',
      instructor: 'Dr. Michael Chen',
      progress: 40,
      totalLessons: 32,
      completedLessons: 13,
      lastAccessed: new Date('2024-01-12'),
      estimatedTimeLeft: '12 hours',
      category: 'Data Science',
      difficulty: 'beginner',
      nextLesson: 'Pandas DataFrames'
    },
    {
      id: '3',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to ML algorithms and techniques',
      instructor: 'Prof. David Kim',
      progress: 25,
      totalLessons: 28,
      completedLessons: 7,
      lastAccessed: new Date('2024-01-10'),
      estimatedTimeLeft: '15 hours',
      category: 'Machine Learning',
      difficulty: 'intermediate',
      nextLesson: 'Linear Regression'
    }
  ]);

  const [inProgressQuizzes] = useState<InProgressQuiz[]>([
    {
      id: '1',
      title: 'JavaScript Fundamentals Quiz',
      course: 'Complete JavaScript Course',
      progress: 75,
      totalQuestions: 20,
      answeredQuestions: 15,
      lastAccessed: new Date('2024-01-14'),
      timeLimit: '30 minutes',
      category: 'Programming',
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'React Components Assessment',
      course: 'Complete React Developer Course',
      progress: 50,
      totalQuestions: 25,
      answeredQuestions: 12,
      lastAccessed: new Date('2024-01-13'),
      timeLimit: '45 minutes',
      category: 'Frontend Development',
      difficulty: 'intermediate'
    }
  ]);

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

  const formatDate = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const CourseCard: React.FC<{ course: InProgressCourse }> = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="skill-card h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{course.description}</p>
              <p className="text-sm font-medium text-primary">by {course.instructor}</p>
            </div>
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>{course.completedLessons}/{course.totalLessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.estimatedTimeLeft} left</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(course.lastAccessed)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Next Lesson:</p>
            <p className="text-sm text-muted-foreground">{course.nextLesson}</p>
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
          </div>

          <Button className="w-full" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const QuizCard: React.FC<{ quiz: InProgressQuiz }> = ({ quiz }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="skill-card h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{quiz.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Part of: {quiz.course}</p>
            </div>
            <Badge className={getDifficultyColor(quiz.difficulty)}>
              {quiz.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-4 w-4" />
              <span>{quiz.answeredQuestions}/{quiz.totalQuestions} questions</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{quiz.timeLimit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(quiz.lastAccessed)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{quiz.progress}%</span>
            </div>
            <Progress value={quiz.progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <Badge variant="secondary" className="text-xs">
              {quiz.category}
            </Badge>
          </div>

          <Button className="w-full" size="sm">
            <RotateCcw className="h-4 w-4 mr-2" />
            Resume Quiz
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

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
            Continue Learning
          </h1>
          <p className="text-muted-foreground text-lg">
            Pick up where you left off and continue your learning journey
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Active courses
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Quizzes</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressQuizzes.length}</div>
              <p className="text-xs text-muted-foreground">
                Assessments to complete
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(inProgressCourses.reduce((acc, course) => acc + course.progress, 0) / inProgressCourses.length)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Across all courses
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time to Complete</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35h</div>
              <p className="text-xs text-muted-foreground">
                Estimated remaining
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">Courses ({inProgressCourses.length})</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes ({inProgressQuizzes.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {inProgressCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Courses in Progress</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a new course to begin learning
                  </p>
                  <Button>Explore Courses</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            {inProgressQuizzes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressQuizzes.map((quiz) => (
                  <QuizCard key={quiz.id} quiz={quiz} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Pending Quizzes</h3>
                  <p className="text-muted-foreground mb-4">
                    All assessments are up to date
                  </p>
                  <Button>Take New Assessment</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContinueLearning;