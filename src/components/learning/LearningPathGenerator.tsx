import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateLearningPath } from '@/lib/gemini';
import { LearningPath, Milestone } from '@/types';
import { Sparkles, Clock, Target, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningPathGeneratorProps {
  skills: string[];
  currentLevel: string;
  goals: string[];
  onPathGenerated: (path: LearningPath) => void;
}

const LearningPathGenerator: React.FC<LearningPathGeneratorProps> = ({
  skills,
  currentLevel,
  goals,
  onPathGenerated
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPath, setGeneratedPath] = useState<any>(null);

  const handleGeneratePath = async () => {
    setIsGenerating(true);
    try {
      const pathData = await generateLearningPath(skills, currentLevel, goals);
      setGeneratedPath(pathData);
      
      // Convert to our LearningPath type
      const learningPath: LearningPath = {
        id: `path-${Date.now()}`,
        title: `Personalized Learning Path`,
        description: `Custom path based on your ${currentLevel} level skills`,
        milestones: pathData.learningPath.map((milestone: any, index: number): Milestone => ({
          id: `milestone-${index}`,
          title: milestone.title,
          description: milestone.description,
          duration: milestone.duration,
          skills: milestone.skills,
          resources: milestone.resources.map((resource: string, resIndex: number) => ({
            id: `resource-${index}-${resIndex}`,
            title: resource,
            type: 'course' as const,
            difficulty: milestone.difficulty,
            isCompleted: false
          })),
          difficulty: milestone.difficulty,
          isCompleted: false
        })),
        totalDuration: pathData.totalDuration,
        difficulty: currentLevel as 'beginner' | 'intermediate' | 'advanced',
        progress: 0,
        skillsToGain: pathData.skillsToGain,
        isActive: true,
        createdAt: new Date()
      };
      
      onPathGenerated(learningPath);
    } catch (error) {
      console.error('Error generating learning path:', error);
    } finally {
      setIsGenerating(false);
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

  return (
    <Card className="skill-card">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5" />
          <span>AI Learning Path Generator</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!generatedPath ? (
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>Generate a personalized learning path based on:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                <li>Your current skills: {skills.join(', ')}</li>
                <li>Your level: {currentLevel}</li>
                <li>Your goals: {goals.join(', ')}</li>
              </ul>
            </div>
            
            <Button
              onClick={handleGeneratePath}
              disabled={isGenerating || skills.length === 0}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Path...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Learning Path
                </>
              )}
            </Button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Generated Learning Path</h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{generatedPath.totalDuration}</span>
              </div>
            </div>

            <div className="space-y-3">
              {generatedPath.learningPath.map((milestone: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {milestone.description}
                      </p>
                    </div>
                    <Badge className={getDifficultyColor(milestone.difficulty)}>
                      {milestone.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{milestone.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{milestone.skills.length} skills</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{milestone.resources.length} resources</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium">Skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {milestone.skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Skills you'll gain:</p>
              <div className="flex flex-wrap gap-1">
                {generatedPath.skillsToGain.map((skill: string) => (
                  <Badge key={skill} className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleGeneratePath} variant="outline" size="sm">
                Generate New Path
              </Button>
              <Button size="sm" className="flex-1">
                Start This Path
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default LearningPathGenerator;