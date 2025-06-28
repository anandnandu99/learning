import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  BookOpen,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  enrolledStudents: number;
  skills: string[];
  category: string;
  price: number;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
}

const ExploreCourses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete React Developer Course 2024',
      description: 'Master React from basics to advanced concepts including hooks, context, and testing',
      instructor: 'Sarah Johnson',
      duration: '40 hours',
      difficulty: 'intermediate',
      rating: 4.8,
      enrolledStudents: 15420,
      skills: ['React', 'JavaScript', 'JSX', 'Hooks', 'Context API'],
      category: 'Frontend Development',
      price: 89.99,
      isTrending: true
    },
    {
      id: '2',
      title: 'Python for Data Science Masterclass',
      description: 'Learn Python programming with focus on data analysis and machine learning',
      instructor: 'Dr. Michael Chen',
      duration: '35 hours',
      difficulty: 'beginner',
      rating: 4.9,
      enrolledStudents: 23150,
      skills: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Data Analysis'],
      category: 'Data Science',
      price: 79.99,
      isNew: true
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
      category: 'Programming',
      price: 69.99
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
      category: 'Backend Development',
      price: 94.99,
      isFeatured: true
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
      category: 'Machine Learning',
      price: 109.99,
      isTrending: true
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
      category: 'Design',
      price: 74.99,
      isNew: true
    },
    {
      id: '7',
      title: 'DevOps and Cloud Computing',
      description: 'Master Docker, Kubernetes, AWS, and CI/CD pipelines',
      instructor: 'Mark Thompson',
      duration: '55 hours',
      difficulty: 'advanced',
      rating: 4.7,
      enrolledStudents: 7650,
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure'],
      category: 'DevOps',
      price: 119.99,
      isFeatured: true
    },
    {
      id: '8',
      title: 'Mobile App Development with React Native',
      description: 'Build cross-platform mobile apps using React Native',
      instructor: 'Jennifer Lee',
      duration: '42 hours',
      difficulty: 'intermediate',
      rating: 4.6,
      enrolledStudents: 11200,
      skills: ['React Native', 'Mobile Development', 'iOS', 'Android', 'Redux'],
      category: 'Mobile Development',
      price: 89.99
    }
  ]);

  const categories = [
    'all',
    'Frontend Development',
    'Backend Development',
    'Data Science',
    'Machine Learning',
    'Mobile Development',
    'Design',
    'DevOps',
    'Programming'
  ];

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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const newCourses = courses.filter(course => course.isNew);
  const trendingCourses = courses.filter(course => course.isTrending);
  const featuredCourses = courses.filter(course => course.isFeatured);

  const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="skill-card h-full relative overflow-hidden">
        {/* Course badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 z-10">
          {course.isNew && (
            <Badge className="bg-blue-500 text-white">
              <Zap className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
          {course.isTrending && (
            <Badge className="bg-orange-500 text-white">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
          {course.isFeatured && (
            <Badge className="bg-purple-500 text-white">
              <Award className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>

        <CardHeader>
          <div className="space-y-2">
            <CardTitle className="text-lg line-clamp-2 pr-20">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {course.description}
            </p>
            <p className="text-sm font-medium text-primary">
              by {course.instructor}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={getDifficultyColor(course.difficulty)}>
              {course.difficulty}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {course.category}
            </Badge>
          </div>

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

          <div className="flex items-center justify-between pt-2">
            <div className="text-2xl font-bold text-primary">
              ${course.price}
            </div>
            <Button size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Enroll Now
            </Button>
          </div>
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
            Explore Courses
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover new learning opportunities and expand your skills
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses, skills, or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
            <TabsTrigger value="new">New ({newCourses.length})</TabsTrigger>
            <TabsTrigger value="trending">Trending ({trendingCourses.length})</TabsTrigger>
            <TabsTrigger value="featured">Featured ({featuredCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredCourses.length === 0 && (
          <Card className="skill-card">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Courses Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or browse all courses
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedDifficulty('all');
              }}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExploreCourses;