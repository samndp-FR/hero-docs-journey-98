import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardComplete = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Complete Application</h1>
        
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">
              Available after receiving ITA
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Once you receive an Invitation to Apply (ITA), you'll be able to access this section to complete and submit your PR application.
            </p>
            <Button 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Back to Overview
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DashboardComplete;
