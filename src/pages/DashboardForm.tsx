import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardForm = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Eldo Form</h1>
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
