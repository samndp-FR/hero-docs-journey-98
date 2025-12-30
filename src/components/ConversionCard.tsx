import React from 'react';
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
    <div className="py-10 px-6 border-y border-border/50 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="max-w-lg mx-auto text-center space-y-6">
        
        {/* The headline - contextual, not generic */}
        <h3 className="text-2xl font-semibold text-foreground tracking-tight">
          {isAboveCutoff ? (
            <>
              With <span className="text-primary-blue">{score}</span> points, you're positioned for {categoryName}.
            </>
          ) : (
            <>
              At <span className="text-primary-blue">{score}</span> points, you're <span className="text-primary-blue">{pointsFromCutoff}</span> away from {categoryName}.
            </>
          )}
        </h3>

        {/* Subtext - what this means */}
        <p className="text-muted-foreground text-sm leading-relaxed max-w-md mx-auto">
          {isAboveCutoff ? (
            <>
              The next step is building an application that reflects your profile accurately. 
              We handle the paperwork, timelines, and strategy.
            </>
          ) : (
            <>
              Many applicants close this gap through language scores, work experience, or provincial pathways. 
              We can help you find the right approach.
            </>
          )}
        </p>

        {/* CTAs - stacked for quiet hierarchy */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <Button 
            onClick={() => navigate('/onboarding')}
            size="lg"
          >
            Start Your Application
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Link 
            to="/#features" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See how we'd handle your case →
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ConversionCard;
