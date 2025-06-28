import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Target, 
  Star,
  Clock,
  Users,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface SearchResult {
  courses: Array<{
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    skills: string[];
    relevanceScore: number;
  }>;
  learningPaths: Array<{
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    relevanceScore: number;
  }>;
  recommendedSkills: string[];
  suggestedLevel: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { query, results } = location.state as { query: string; results: SearchResult } || { 
    query: '', 
    results: {
      courses: [],
      learningPaths: [],
      recommendedSkills: [],
      suggestedLevel: 'beginner'
    }
  };

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

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const CourseResultCard: React.FC<{ course: any }> = ({ course }) => (
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
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={getDifficultyColor(course.difficulty)}>
                {course.difficulty}
              </Badge>
              <div className={`text-sm font-medium ${getRelevanceColor(course.relevanceScore)}`}>
                {course.relevanceScore}% match
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>4.{Math.floor(Math.random() * 3) + 6}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 20000) + 5000}</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Skills you'll learn:</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.map((skill: string) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Button className="w-full" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            View Course
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  const LearningPathResultCard: React.FC<{ path: any }> = ({ path }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="learning-path-card h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="text-lg">{path.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{path.description}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Badge className={getDifficultyColor(path.difficulty)}>
                {path.difficulty}
              </Badge>
              <div className={`text-sm font-medium ${getRelevanceColor(path.relevanceScore)}`}>
                {path.relevanceScore}% match
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{path.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 8) + 3} milestones</span>
            </div>
          </div>

          <Button className="w-full" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Start Learning Path
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
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-bold text-gradient">
              AI Search Results
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Results for: <span className="font-semibold text-foreground">"{query}"</span>
          </p>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>AI Recommendations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium">Suggested Learning Level</h4>
                  <Badge className={getDifficultyColor(results.suggestedLevel)} size="lg">
                    {results.suggestedLevel}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Skills to Focus On</h4>
                  <div className="flex flex-wrap gap-1">
                    {results.recommendedSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="courses">
              Courses ({results.courses.length})
            </TabsTrigger>
            <TabsTrigger value="paths">
              Learning Paths ({results.learningPaths.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {results.courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.courses.map((course, index) => (
                  <CourseResultCard key={index} course={course} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Courses Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try refining your search query or explore our course catalog
                  </p>
                  <Button>Explore All Courses</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="paths" className="space-y-6">
            {results.learningPaths.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.learningPaths.map((path, index) => (
                  <LearningPathResultCard key={index} path={path} />
                ))}
              </div>
            ) : (
              <Card className="skill-card">
                <CardContent className="text-center py-12">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Learning Paths Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try creating a custom learning path based on your goals
                  </p>
                  <Button>Create Learning Path</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Search Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12"
        >
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Search Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Try these search examples:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• "Beginner Python course"</li>
                    <li>• "Advanced React with TypeScript"</li>
                    <li>• "Data science for beginners"</li>
                    <li>• "Machine learning fundamentals"</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Search by:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Skill level (beginner, intermediate, advanced)</li>
                    <li>• Technology or framework name</li>
                    <li>• Career goals or job roles</li>
                    <li>• Specific topics or concepts</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SearchResults;