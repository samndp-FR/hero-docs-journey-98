
import React, { useState } from 'react';
import Header from '@/components/Header';
import ScoreAssessmentQuestionnaire from '@/components/ScoreAssessmentQuestionnaire';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trophy, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CRSAssessment = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  const handleComplete = (formData: any) => {
    // Mock calculation - in real app this would be more sophisticated
    const mockScore = Math.floor(Math.random() * (500 - 300) + 300);
    setResults({
      totalScore: mockScore,
      breakdown: {
        coreHumanCapital: Math.floor(mockScore * 0.6),
        spouseFactors: Math.floor(mockScore * 0.2),
        skillTransferability: Math.floor(mockScore * 0.15),
        additionalPoints: Math.floor(mockScore * 0.05)
      },
      formData
    });
    setShowResults(true);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleStartOver = () => {
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <div className="min-h-screen bg-pale-blue">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={handleStartOver}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Calculator
            </Button>

            {/* Results Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h1 className="text-3xl font-bold text-gray-900">Your CRS Score</h1>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-6xl font-bold text-primary-blue">{results.totalScore}</div>
                <div className="ml-4 text-left">
                  <div className="text-sm text-gray-600">out of 1,200</div>
                  <Badge variant={results.totalScore >= 470 ? "default" : "secondary"} className="mt-1">
                    {results.totalScore >= 470 ? "Competitive Score" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="font-medium">Core Human Capital</span>
                    <span className="text-xl font-bold text-primary-blue">{results.breakdown.coreHumanCapital}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                    <span className="font-medium">Spouse/Partner Factors</span>
                    <span className="text-xl font-bold text-green-600">{results.breakdown.spouseFactors}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                    <span className="font-medium">Skill Transferability</span>
                    <span className="text-xl font-bold text-purple-600">{results.breakdown.skillTransferability}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Additional Points</span>
                    <span className="text-xl font-bold text-yellow-600">{results.breakdown.additionalPoints}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Recommendations to Improve Your Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Improve Language Scores</h4>
                      <p className="text-sm text-blue-700">Retake language tests to achieve higher CLB levels</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-900">Gain Canadian Work Experience</h4>
                      <p className="text-sm text-green-700">Consider obtaining a work permit to gain Canadian experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-900">Provincial Nomination</h4>
                      <p className="text-sm text-purple-700">Apply for a Provincial Nominee Program (PNP) for 600 additional points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={handleStartOver}
                variant="outline" 
                className="flex-1"
              >
                Calculate Again
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="flex-1 bg-primary-blue hover:bg-primary-blue/90"
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pale-blue">
      <Header />
      <div className="pt-20 pb-12">
        <ScoreAssessmentQuestionnaire 
          onComplete={handleComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default CRSAssessment;
