import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Lock, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ApplicantsSection from '@/components/form/ApplicantsSection';
import ContactDetailsSection from '@/components/form/ContactDetailsSection';
import WorkHistorySection from '@/components/form/WorkHistorySection';
import RepresentativeSection from '@/components/form/RepresentativeSection';
import PersonalDetailsSection from '@/components/form/PersonalDetailsSection';
import PersonalHistorySection from '@/components/form/PersonalHistorySection';
import StudyLanguagesSection from '@/components/form/StudyLanguagesSection';
import { usePremium } from '@/contexts/PremiumContext';

const ApplicationForm = () => {
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const steps = [
    { title: 'Applicants', component: ApplicantsSection, freeAccess: true },
    { title: 'Contact Details', component: ContactDetailsSection, freeAccess: false },
    { title: 'Work History', component: WorkHistorySection, freeAccess: false },
    { title: 'Representative', component: RepresentativeSection, freeAccess: false },
    { title: 'Personal Details', component: PersonalDetailsSection, freeAccess: false },
    { title: 'Personal History', component: PersonalHistorySection, freeAccess: false },
    { title: 'Study & Languages', component: StudyLanguagesSection, freeAccess: false },
  ];

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, [steps[currentStep].title]: stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Check if next step requires premium
      if (!isPremium && !steps[currentStep + 1].freeAccess) {
        navigate('/upgrade');
        return;
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (index: number) => {
    // Check if step requires premium
    if (!isPremium && !steps[index].freeAccess) {
      navigate('/upgrade');
      return;
    }
    setCurrentStep(index);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-pale-blue py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary-blue">
              Application Form
            </CardTitle>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step {currentStep + 1} of {steps.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step Navigation */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 overflow-x-auto">
                {steps.map((step, index) => {
                  const isLocked = !isPremium && !step.freeAccess;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={`px-3 py-1 rounded-full text-xs whitespace-nowrap flex items-center gap-1 transition-colors ${
                        index === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : index < currentStep
                          ? 'bg-green-100 text-green-700'
                          : isLocked
                          ? 'bg-gray-100 text-gray-400 cursor-pointer'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {step.title}
                      {isLocked && <Lock className="h-3 w-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Step Content */}
            <div className="min-h-[400px]">
              <h2 className="text-2xl font-semibold mb-6 text-center">
                {steps[currentStep].title}
              </h2>
              <CurrentStepComponent 
                data={formData[steps[currentStep].title] || {}}
                onUpdate={updateFormData}
              />
            </div>

            {/* Premium Upgrade Banner for free users on first step */}
            {!isPremium && currentStep === 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Complete your full profile</p>
                    <p className="text-xs text-muted-foreground">Upgrade to access all form sections</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  onClick={() => navigate('/upgrade')}
                  className="gap-1"
                >
                  Upgrade
                </Button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                >
                  <span>Submit Application</span>
                </Button>
              ) : !isPremium && !steps[currentStep + 1].freeAccess ? (
                <Button
                  onClick={() => navigate('/upgrade')}
                  className="flex items-center space-x-2 gap-1"
                >
                  <Lock className="w-4 h-4" />
                  <span>Unlock Next</span>
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;