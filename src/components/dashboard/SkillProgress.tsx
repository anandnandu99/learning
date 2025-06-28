import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skill } from '@/types';
import { motion } from 'framer-motion';

interface SkillProgressProps {
  skills: Skill[];
}

const SkillProgress: React.FC<SkillProgressProps> = ({ skills }) => {
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

  return (
    <Card className="skill-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Skill Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{skill.name}</span>
                <Badge className={getLevelColor(skill.level)}>
                  {skill.level}
                </Badge>
              </div>
              <span className="text-sm text-muted-foreground">
                {skill.progress}%
              </span>
            </div>
            <Progress value={skill.progress} className="h-2" />
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillProgress;