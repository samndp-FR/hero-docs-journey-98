import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, ArrowRight } from 'lucide-react';
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
      {/* Actual content with elegant overlay */}
      <div className="pointer-events-none select-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background z-10 rounded-lg backdrop-blur-[1px]" />
        {children}
      </div>
      
      {/* Floating upgrade CTA */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <Card className="border border-amber-200/50 shadow-2xl shadow-amber-900/5 bg-card/98 backdrop-blur-sm max-w-sm mx-4">
          <CardContent className="p-6 text-center">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mx-auto mb-4 ring-1 ring-amber-200/50">
              <Crown className="h-5 w-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1.5">
              Unlock {feature}
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Upgrade to Premium to access this feature.
            </p>
            <Button 
              onClick={() => navigate('/upgrade')}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 shadow-lg shadow-amber-500/20"
            >
              Upgrade to Premium
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}