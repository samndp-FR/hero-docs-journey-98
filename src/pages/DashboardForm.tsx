import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '@/contexts/PremiumContext';
import { FileText, Users, Briefcase, User, History, GraduationCap, Lock, Sparkles, ArrowRight } from 'lucide-react';

const formSections = [
  { title: 'Applicants', icon: Users, freeAccess: true, description: 'Add applicants to your application' },
  { title: 'Contact Details', icon: FileText, freeAccess: false, description: 'Your contact information' },
  { title: 'Work History', icon: Briefcase, freeAccess: false, description: 'Employment history and experience' },
  { title: 'Personal Details', icon: User, freeAccess: false, description: 'Personal information and background' },
  { title: 'Personal History', icon: History, freeAccess: false, description: 'Travel and address history' },
  { title: 'Study & Languages', icon: GraduationCap, freeAccess: false, description: 'Education and language proficiency' },
];

const DashboardForm = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Build Profile</h1>
        <p className="text-muted-foreground mb-6">
          Complete your Express Entry profile with intelligent form-filling.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {formSections.map((section) => {
            const isLocked = !isPremium && !section.freeAccess;
            const Icon = section.icon;
            
            return (
              <Card 
                key={section.title}
                className={`transition-all ${isLocked ? 'opacity-60' : 'hover:border-primary/30'}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary-blue" />
                      {section.title}
                    </span>
                    {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{section.description}</p>
                  {!isLocked ? (
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/application-form')}
                      className="w-full"
                    >
                      Edit Section
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/upgrade')}
                      className="w-full text-muted-foreground"
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      Unlock with Premium
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!isPremium && (
          <Card className="border-dashed border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Unlock full profile builder</p>
                  <p className="text-sm text-muted-foreground">Access all form sections and smart autofill</p>
                </div>
              </div>
              <Button onClick={() => navigate('/upgrade')} className="gap-2">
                Upgrade to Premium
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {isPremium && (
          <Button 
            className="bg-primary-blue hover:bg-primary-blue/90"
            onClick={() => navigate('/application-form')}
          >
            Continue Application
          </Button>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardForm;