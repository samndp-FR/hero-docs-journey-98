import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

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

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-5">
          
          {/* Score comparison - simple horizontal bar */}
          <div className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Your score vs. cutoff</span>
              <span className={`text-sm font-medium ${isAboveCutoff ? 'text-green-600' : 'text-amber-600'}`}>
                {isAboveCutoff ? `+${pointsFromCutoff}` : `-${pointsFromCutoff}`} points
              </span>
            </div>
            
            {/* Two-bar comparison */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12">You</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-blue rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (score / Math.max(score, cutoff)) * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12 text-right">{score}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-12">Cutoff</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-muted-foreground/30 rounded-full"
                    style={{ width: `${Math.min(100, (cutoff / Math.max(score, cutoff)) * 100)}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{cutoff}</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border" />

          {/* Status message */}
          <p className="text-sm text-foreground/80 leading-relaxed">
            {isAboveCutoff ? (
              <>
                Your profile meets the latest <span className="font-medium">{categoryName}</span> requirements.
                {daysUntilDraw !== null && daysUntilDraw <= 21 && (
                  <> Next draw expected in approximately {daysUntilDraw} days.</>
                )}
              </>
            ) : (
              <>
                You're close to the <span className="font-medium">{categoryName}</span> threshold. 
                Small improvements could make the difference.
              </>
            )}
          </p>

          {/* Primary CTA */}
          <Button 
            onClick={() => navigate('/onboarding')}
            className="w-full"
          >
            Begin Your Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Secondary link */}
          <div className="text-center pt-1">
            <Link 
              to="/#features" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              See how we'd handle your application
            </Link>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionCard;
