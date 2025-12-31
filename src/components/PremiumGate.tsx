import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '@/contexts/PremiumContext';
import { ReactNode } from 'react';

interface PremiumGateProps {
  children: ReactNode;
  feature: string;
}

export function PremiumGate({ children, feature }: PremiumGateProps) {
  const navigate = useNavigate();
  const { isPremium } = usePremium();

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Actual content with overlay */}
      <div className="pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background/95 z-10 rounded-lg" />
        {children}
      </div>
      
      {/* Floating upgrade CTA */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <Card className="border-primary/20 shadow-xl bg-card/95 backdrop-blur-sm max-w-md mx-4">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Unlock {feature}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to Premium to access this feature and continue your journey.
            </p>
            <Button 
              onClick={() => navigate('/upgrade')}
              className="gap-2"
            >
              Upgrade to Premium
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
