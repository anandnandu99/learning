import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Course } from '@/types';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  Award,
  Search,
  Filter
} from 'lucide-react';

const Courses: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts including hooks, context, and testing',
      instructor: 'Sarah Johnson',
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.8,
      enrolledStudents: 15420,
      skills: ['React', 'JavaScript', 'JSX', 'Hooks', 'Context API'],
      progress: 65,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Python for Data Science',
      description: 'Learn Python programming with focus on data analysis and machine learning',
      instructor: 'Dr. Michael Chen',
      duration: '35 hours',
      difficulty: 'beginner',
      rating: 4.9,
      enrolledStudents: 23150,
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis'],
      progress: 0,
      isCompleted: false
    },
    {
      id: '3',
      title: 'Advanced JavaScript Concepts',
      description: 'Deep dive into closures, prototypes, async programming, and modern ES6+ features',
      instructor: 'Alex Rodriguez',
      duration: '25 hours',
      difficulty: 'advanced',
      rating: 4.7,
      enrolledStudents: 8930,
      skills: ['JavaScript', 'ES6+', 'Async/Await', 'Closures', 'Prototypes'],
      progress: 100,
      isCompleted: true,
      completedAt: new Date('2024-01-15')
    },
    {
      id: '4',
      title: 'Node.js Backend Development',
      description: 'Build scalable backend applications with Node.js, Express, and MongoDB',
      instructor: 'Emma Wilson',
      duration: '45 hours',
      difficulty: 'intermediate',
      rating: 4.6,
      enrolledStudents: 12340,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication'],
      progress: 30,
      isCompleted: false
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to ML algorithms, supervised and unsupervised learning',
      instructor: 'Prof. David Kim',
      duration: '50 hours',
      difficulty: 'intermediate',
      rating: 4.8,
      enrolledStudents: 18750,
      skills: ['Machine Learning', 'Python', 'Scikit-learn', 'TensorFlow', 'Statistics'],
      progress: 0,
      isCompleted: false
    },
    {
      id: '6',
      title: 'UI/UX Design Principles',
      description: 'Learn design thinking, user research, and create beautiful user interfaces',
      instructor: 'Lisa Park',
      duration: '30 hours',
      difficulty: 'beginner',
      rating: 4.9,
      enrolledStudents: 9870,
      skills: ['UI Design', 'UX Research', 'Figma', 'Design Systems', 'Prototyping'],
      progress: 85,
      isCompleted: false
    }
  ]);

  const enrolledCourses = courses.filter(course => course.progress > 0);
  const completedCourses = courses.filter(course => course.isCompleted);
  const availableCourses = courses.filter(course => course.progress === 0 && !course.isCompleted);

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

  const CourseCard: React.FC<{ course: Course; showProgress?: boolean }> = ({ 
    course, 
    showProgress = false 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="skill-card h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {course.description}
              </p>
              <p className="text-sm font-medium text-primary">
                by {course.instructor}
              </p>
            </div>
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrolledStudents.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>

          {showProgress && course.progress > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">Skills you'll learn:</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {course.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{course.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Button className="w-full" size="sm">
            {course.progress > 0 ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Continue Learning
              </>
            ) : course.isCompleted ? (
              <>
                <Award className="h-4 w-4 mr-2" />
                View Certificate
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Enroll Now
              </>
            )}
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
            Course Library
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and learn from expert-led courses
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Active courses
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCourses.length}</div>
              <p className="text-xs text-muted-foreground">
                Certificates earned
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                Total learning time
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">
                Course quality
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="enrolled" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="enrolled">My Courses ({enrolledCourses.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
            <TabsTrigger value="browse">Browse ({availableCourses.length})</TabsTrigger>
            <TabsTrigger value="recommendations">Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="enrolled" className="space-y-6">
            {enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course) => (
                  <CourseCard key={course.id} course={course} showProgress={true} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Enrolled Courses</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse our course library to start learning
                  </p>
                  <Button>Browse Courses</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Completed Courses Yet</h3>
                  <p className="text-muted-foreground">
                    Complete your first course to earn a certificate
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="skill-card">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Based on your skills and learning goals
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;