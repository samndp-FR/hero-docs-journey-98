import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardScore = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Score Assessment</h1>
        <p className="text-muted-foreground mb-6">
          Calculate and analyze your CRS score to understand your competitiveness.
        </p>
        <Button 
          className="bg-primary-blue hover:bg-primary-blue/90"
          onClick={() => navigate('/crs-assessment')}
        >
          Open CRS Calculator
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardScore;
