import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillGapAnalysis from '@/components/skills/SkillGapAnalysis';
import { Plus, TrendingUp, Target, Brain } from 'lucide-react';
import { Skill } from '@/types';

const Skills: React.FC = () => {
  const [skills] = useState<Skill[]>([
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
    },
    {
      id: '5',
      name: 'Node.js',
      level: 'intermediate',
      category: 'Backend',
      progress: 55,
      lastUpdated: new Date()
    },
    {
      id: '6',
      name: 'SQL',
      level: 'advanced',
      category: 'Database',
      progress: 85,
      lastUpdated: new Date()
    }
  ]);

  const [targetRole] = useState('Full Stack Developer');

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-yellow-100 text-yellow-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-green-100 text-green-800';
      case 'expert':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Programming': 'bg-purple-100 text-purple-800',
      'Frontend': 'bg-blue-100 text-blue-800',
      'Backend': 'bg-green-100 text-green-800',
      'AI/ML': 'bg-red-100 text-red-800',
      'Database': 'bg-orange-100 text-orange-800',
      'DevOps': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  const currentSkillNames = skills.map(skill => skill.name);

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
            Your Skills Portfolio
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your progress and identify areas for growth
          </p>
        </motion.div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="analysis">Gap Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="skill-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Skills</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{skills.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Across {Object.keys(groupedSkills).length} categories
                  </p>
                </CardContent>
              </Card>

              <Card className="skill-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Keep up the great work!
                  </p>
                </CardContent>
              </Card>

              <Card className="skill-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Advanced Skills</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {skills.filter(skill => skill.level === 'advanced' || skill.level === 'expert').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    High-level expertise
                  </p>
                </CardContent>
              </Card>

              <Card className="skill-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning</CardTitle>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {skills.filter(skill => skill.level === 'beginner').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Skills in development
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* All Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="skill-card">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{skill.name}</CardTitle>
                          <div className="flex space-x-2">
                            <Badge className={getLevelColor(skill.level)}>
                              {skill.level}
                            </Badge>
                            <Badge className={getCategoryColor(skill.category)}>
                              {skill.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        Practice
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="skill-card">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Badge className={getCategoryColor(category)}>
                        {category}
                      </Badge>
                      <span>{categorySkills.length} skills</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{skill.name}</span>
                              <Badge className={getLevelColor(skill.level)} variant="secondary">
                                {skill.level}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {skill.progress}%
                            </span>
                          </div>
                          <Progress value={skill.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <SkillGapAnalysis
              currentSkills={currentSkillNames}
              targetRole={targetRole}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Skills;