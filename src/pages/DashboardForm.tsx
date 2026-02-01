import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

const DashboardForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isValidationMode = searchParams.get('validate') === 'true';

  // Redirect to application form in validation mode using useEffect
  useEffect(() => {
    if (isValidationMode) {
      navigate('/application-form?validate=true', { replace: true });
    }
  }, [isValidationMode, navigate]);

  // Show nothing while redirecting
  if (isValidationMode) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Build Profile</h1>
        <p className="text-muted-foreground mb-6">
          Complete your Express Entry profile with intelligent form-filling.
        </p>
        <Button 
          className="bg-primary-blue hover:bg-primary-blue/90"
          onClick={() => navigate('/application-form')}
        >
          Continue Application
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardForm;