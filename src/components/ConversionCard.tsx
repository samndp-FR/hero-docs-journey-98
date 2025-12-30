import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
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

  // Calculate percentage for the subtle arc visualization
  const percentage = Math.min(100, (score / cutoff) * 100);

  return (
    <Card className="relative overflow-hidden border border-border/60 bg-card shadow-sm">
      <CardContent className="pt-8 pb-6 px-6">
        <div className="space-y-6">
          
          {/* Minimal Score Visualization */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                Your Score
              </p>
              <p className="text-4xl font-light text-foreground tracking-tight">
                {score}
              </p>
            </div>
            
            {/* Subtle arc indicator */}
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--primary-blue))"
                  strokeWidth="2"
                  strokeDasharray={`${percentage}, 100`}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-muted-foreground">{cutoff}</span>
              </div>
            </div>
          </div>

          {/* Status line - understated */}
          <div className="border-t border-border/40 pt-4">
            {isAboveCutoff ? (
              <p className="text-sm text-foreground/80">
                You're <span className="font-medium text-foreground">{pointsFromCutoff} points above</span> the latest {categoryName} cutoff.
                {daysUntilDraw !== null && daysUntilDraw <= 21 && (
                  <span className="text-muted-foreground"> Next draw in ~{daysUntilDraw} days.</span>
                )}
              </p>
            ) : (
              <p className="text-sm text-foreground/80">
                You're <span className="font-medium text-foreground">{pointsFromCutoff} points from</span> the latest {categoryName} cutoff.
                <span className="text-muted-foreground"> There's room to improve.</span>
              </p>
            )}
          </div>

          {/* Primary CTA - understated but clear */}
          <Button 
            onClick={() => navigate('/onboarding')}
            className="w-full h-11 bg-foreground text-background hover:bg-foreground/90 font-medium"
          >
            Begin Your Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          {/* Secondary CTA - very subtle */}
          <div className="text-center">
            <Link 
              to="/#features" 
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              See how we'd handle your application
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ConversionCard;
