import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LearningPath } from '@/types';
import { Clock, Target, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningPathCardProps {
  learningPath: LearningPath;
  onContinue: (pathId: string) => void;
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({
  learningPath,
  onContinue
}) => {
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
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="learning-path-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold">
                {learningPath.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {learningPath.description}
              </p>
            </div>
            <Badge className={getDifficultyColor(learningPath.difficulty)}>
              {learningPath.difficulty}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{learningPath.totalDuration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4" />
              <span>{learningPath.milestones.length} milestones</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span>{learningPath.progress}%</span>
            </div>
            <Progress value={learningPath.progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Skills you'll gain:</p>
            <div className="flex flex-wrap gap-1">
              {learningPath.skillsToGain.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {learningPath.skillsToGain.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{learningPath.skillsToGain.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          <Button
            onClick={() => onContinue(learningPath.id)}
            className="w-full"
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            {learningPath.progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LearningPathCard;