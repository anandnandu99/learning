import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateSkillAssessments } from '@/lib/gemini';
import { 
  Target, 
  Clock, 
  CheckCircle, 
  Play,
  Award,
  BarChart3,
  Brain,
  Code,
  Palette,
  Database
} from 'lucide-react';

interface Assessment {
  id: string;
  title: string;
  category: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  skillsEvaluated: string[];
  questionCount: number;
  type: 'multiple-choice' | 'coding' | 'project';
}

const SkillAssessment: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');

  useEffect(() => {
    loadAssessments();
  }, [userLevel]);

  const loadAssessments = async () => {
    setIsLoading(true);
    try {
      const result = await generateSkillAssessments(userLevel);
      setAssessments(result.assessments);
    } catch (error) {
      console.error('Error loading assessments:', error);
      // Fallback assessments
      setAssessments([
        {
          id: 'prog-basics',
          title: 'Programming Fundamentals',
          category: 'Programming',
          description: 'Evaluate your understanding of basic programming concepts',
          difficulty: userLevel,
          duration: '30 minutes',
          skillsEvaluated: ['Variables', 'Functions', 'Control Flow'],
          questionCount: 20,
          type: 'multiple-choice'
        },
        {
          id: 'web-dev',
          title: 'Web Development Skills',
          category: 'Web Development',
          description: 'Test your knowledge of HTML, CSS, and JavaScript',
          difficulty: userLevel,
          duration: '45 minutes',
          skillsEvaluated: ['HTML', 'CSS', 'JavaScript'],
          questionCount: 25,
          type: 'coding'
        },
        {
          id: 'data-analysis',
          title: 'Data Analysis Fundamentals',
          category: 'Data Science',
          description: 'Assess your data analysis and visualization skills',
          difficulty: userLevel,
          duration: '40 minutes',
          skillsEvaluated: ['Data Analysis', 'Statistics', 'Visualization'],
          questionCount: 22,
          type: 'multiple-choice'
        },
        {
          id: 'ui-ux',
          title: 'UI/UX Design Principles',
          category: 'Design',
          description: 'Evaluate your design thinking and user experience knowledge',
          difficulty: userLevel,
          duration: '35 minutes',
          skillsEvaluated: ['Design Principles', 'User Research', 'Prototyping'],
          questionCount: 18,
          type: 'project'
        },
        {
          id: 'database',
          title: 'Database Management',
          category: 'Backend',
          description: 'Test your database design and query optimization skills',
          difficulty: userLevel,
          duration: '50 minutes',
          skillsEvaluated: ['SQL', 'Database Design', 'Optimization'],
          questionCount: 30,
          type: 'coding'
        },
        {
          id: 'ai-ml',
          title: 'Machine Learning Basics',
          category: 'AI/ML',
          description: 'Assess your understanding of ML algorithms and concepts',
          difficulty: userLevel,
          duration: '60 minutes',
          skillsEvaluated: ['ML Algorithms', 'Data Preprocessing', 'Model Evaluation'],
          questionCount: 35,
          type: 'multiple-choice'
        }
      ]);
    } finally {
      setIsLoading(false);
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'multiple-choice':
        return 'bg-blue-100 text-blue-800';
      case 'coding':
        return 'bg-purple-100 text-purple-800';
      case 'project':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'programming':
        return Code;
      case 'design':
        return Palette;
      case 'data science':
      case 'ai/ml':
        return Brain;
      case 'backend':
        return Database;
      default:
        return Target;
    }
  };

  const assessmentsByCategory = assessments.reduce((acc, assessment) => {
    if (!acc[assessment.category]) {
      acc[assessment.category] = [];
    }
    acc[assessment.category].push(assessment);
    return acc;
  }, {} as Record<string, Assessment[]>);

  const beginnerAssessments = assessments.filter(a => a.difficulty === 'beginner');
  const intermediateAssessments = assessments.filter(a => a.difficulty === 'intermediate');
  const advancedAssessments = assessments.filter(a => a.difficulty === 'advanced');

  const AssessmentCard: React.FC<{ assessment: Assessment }> = ({ assessment }) => {
    const IconComponent = getCategoryIcon(assessment.category);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="skill-card h-full">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <IconComponent className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{assessment.title}</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground">{assessment.description}</p>
              </div>
              <Badge className={getDifficultyColor(assessment.difficulty)}>
                {assessment.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{assessment.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="h-4 w-4" />
                <span>{assessment.questionCount} questions</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs">
                {assessment.category}
              </Badge>
              <Badge className={getTypeColor(assessment.type)}>
                {assessment.type.replace('-', ' ')}
              </Badge>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Skills Evaluated:</p>
              <div className="flex flex-wrap gap-1">
                {assessment.skillsEvaluated.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="w-full" size="sm">
              <Play className="h-4 w-4 mr-2" />
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

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
            Skill Assessment
          </h1>
          <p className="text-muted-foreground text-lg">
            Evaluate your current abilities and identify areas for improvement
          </p>
        </motion.div>

        {/* Level Selector */}
        <div className="mb-8">
          <Card className="skill-card">
            <CardHeader>
              <CardTitle className="text-lg">Select Your Current Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <Button
                    key={level}
                    variant={userLevel === level ? 'default' : 'outline'}
                    onClick={() => setUserLevel(level)}
                    className="capitalize"
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Assessments</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assessments.length}</div>
              <p className="text-xs text-muted-foreground">
                For {userLevel} level
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(assessmentsByCategory).length}</div>
              <p className="text-xs text-muted-foreground">
                Skill areas covered
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42min</div>
              <p className="text-xs text-muted-foreground">
                Per assessment
              </p>
            </CardContent>
          </Card>

          <Card className="skill-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">
                Success rate
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({assessments.length})</TabsTrigger>
            <TabsTrigger value="beginner">Beginner ({beginnerAssessments.length})</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate ({intermediateAssessments.length})</TabsTrigger>
            <TabsTrigger value="advanced">Advanced ({advancedAssessments.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {Object.entries(assessmentsByCategory).map(([category, categoryAssessments]) => (
              <div key={category} className="space-y-4">
                <h3 className="text-xl font-semibold">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryAssessments.map((assessment) => (
                    <AssessmentCard key={assessment.id} assessment={assessment} />
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="beginner" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intermediate" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedAssessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SkillAssessment;