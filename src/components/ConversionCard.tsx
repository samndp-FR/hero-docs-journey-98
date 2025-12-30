import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, ArrowRight, Clock, Sparkles, Users, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ConversionCardProps {
  score: number;
  cutoff: number;
  categoryName: string;
  daysUntilDraw: number | null;
}

const ConversionCard: React.FC<ConversionCardProps> = ({
  score,
  cutoff,
  categoryName,
  daysUntilDraw
}) => {
  const navigate = useNavigate();
  const isAboveCutoff = score >= cutoff;
  const pointsFromCutoff = Math.abs(score - cutoff);
  const isClose = !isAboveCutoff && pointsFromCutoff <= 30;

  return (
    <Card className={`relative overflow-hidden border-2 ${
      isAboveCutoff 
        ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 via-white to-teal-50' 
        : isClose 
          ? 'border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50'
          : 'border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <Sparkles className={`w-full h-full ${isAboveCutoff ? 'text-emerald-500' : 'text-amber-500'}`} />
      </div>
      
      <CardContent className="pt-6 pb-6">
        <div className="space-y-5">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            {isAboveCutoff ? (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <Badge className="bg-emerald-500 hover:bg-emerald-600">
                    You Qualify!
                  </Badge>
                  <p className="text-sm text-emerald-700 mt-1 font-medium">
                    Your score exceeds the {categoryName} cutoff by {pointsFromCutoff} points
                  </p>
                </div>
              </>
            ) : isClose ? (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <Badge className="bg-amber-500 hover:bg-amber-600">
                    Almost There
                  </Badge>
                  <p className="text-sm text-amber-700 mt-1 font-medium">
                    Just {pointsFromCutoff} points from the {categoryName} cutoff
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <Badge variant="secondary">
                    Let's Improve Your Score
                  </Badge>
                  <p className="text-sm text-blue-700 mt-1 font-medium">
                    We can help you gain the points you need
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Score Comparison Visual */}
          <div className="relative pt-2">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Score</span>
              <span className="text-muted-foreground">Cutoff: {cutoff}</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden relative">
              <div 
                className={`h-full rounded-full transition-all ${
                  isAboveCutoff ? 'bg-emerald-500' : isClose ? 'bg-amber-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, (score / cutoff) * 100)}%` }}
              />
              <div 
                className="absolute top-0 h-full w-0.5 bg-gray-800"
                style={{ left: '100%', transform: 'translateX(-2px)' }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className={`text-lg font-bold ${
                isAboveCutoff ? 'text-emerald-600' : isClose ? 'text-amber-600' : 'text-blue-600'
              }`}>
                {score}
              </span>
            </div>
          </div>

          {/* Urgency Element */}
          {daysUntilDraw !== null && daysUntilDraw <= 14 && isAboveCutoff && (
            <div className="flex items-center gap-2 p-3 bg-emerald-100 rounded-lg">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span className="text-sm font-medium text-emerald-800">
                Next draw expected in ~{daysUntilDraw} days — don't miss your window
              </span>
            </div>
          )}

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-primary-blue" />
              <span>Expert guidance</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4 text-primary-blue" />
              <span>2,500+ applicants helped</span>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={() => navigate('/onboarding')}
            className={`w-full h-12 text-base font-semibold ${
              isAboveCutoff 
                ? 'bg-emerald-600 hover:bg-emerald-700' 
                : 'bg-primary-blue hover:bg-primary-blue/90'
            }`}
          >
            Start Your Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Free to start • No credit card required
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionCard;
