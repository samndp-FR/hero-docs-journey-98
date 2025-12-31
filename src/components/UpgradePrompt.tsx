import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UpgradePromptProps {
  feature: string;
  description: string;
}

export function UpgradePrompt({ feature, description }: UpgradePromptProps) {
  const navigate = useNavigate();

  return (
    <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardContent className="p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Unlock {feature}
        </h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {description}
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
  );
}
