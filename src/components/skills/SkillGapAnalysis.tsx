import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { SkillGapAnalysis as SkillGapAnalysisType } from '@/types';
import { analyzeSkillGaps } from '@/lib/gemini';
import { Target, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillGapAnalysisProps {
  currentSkills: string[];
  targetRole: string;
}

const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  currentSkills,
  targetRole
}) => {
  const [analysis, setAnalysis] = useState<SkillGapAnalysisType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const performAnalysis = async () => {
    setIsLoading(true);
    try {
      const result = await analyzeSkillGaps(currentSkills, targetRole);
      setAnalysis(result);
    } catch (error) {
      console.error('Error performing skill gap analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentSkills.length > 0 && targetRole) {
      performAnalysis();
    }
  }, [currentSkills, targetRole]);

  if (isLoading) {
    return (
      <Card className="skill-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Analyzing Skill Gaps...</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="skill-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Skill Gap Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Add your skills and target role to get personalized analysis
            </p>
            <Button onClick={performAnalysis} disabled={!currentSkills.length || !targetRole}>
              Analyze Skills
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const readinessPercentage = parseInt(analysis.overallReadiness.replace('%', ''));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="skill-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Skill Gap Analysis for {targetRole}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Overall Readiness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Overall Readiness</span>
              <span className="text-lg font-bold">{analysis.overallReadiness}</span>
            </div>
            <Progress value={readinessPercentage} className="h-3" />
          </div>

          {/* Relevant Skills */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="font-medium">Skills You Have</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.relevantSkills.map((skill) => (
                <Badge key={skill} className="bg-green-100 text-green-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Critical Gaps */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="font-medium">Critical Skills Missing</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.criticalGaps.map((skill) => (
                <Badge key={skill} className="bg-red-100 text-red-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Nice to Have */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Nice to Have</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysis.niceToHave.map((skill) => (
                <Badge key={skill} className="bg-blue-100 text-blue-800">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Learning Priority */}
          <div className="space-y-3">
            <span className="font-medium">Recommended Learning Priority</span>
            <div className="space-y-2">
              {analysis.learningPriority.map((skill, index) => (
                <div key={skill} className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={performAnalysis} variant="outline" className="w-full">
            Refresh Analysis
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillGapAnalysis;