import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, ShieldCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import ApplicantsSection from '@/components/form/ApplicantsSection';
import ContactDetailsSection from '@/components/form/ContactDetailsSection';
import WorkHistorySection from '@/components/form/WorkHistorySection';
import RepresentativeSection from '@/components/form/RepresentativeSection';
import PersonalDetailsSection from '@/components/form/PersonalDetailsSection';
import PersonalHistorySection from '@/components/form/PersonalHistorySection';
import StudyLanguagesSection from '@/components/form/StudyLanguagesSection';
import { usePremium } from '@/contexts/PremiumContext';
import { UpgradeModal } from '@/components/UpgradeModal';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ApplicationFormProps {
  validationMode?: boolean;
  onValidationComplete?: () => void;
}

const ApplicationForm = ({ validationMode = false, onValidationComplete }: ApplicationFormProps) => {
  const { isPremium } = usePremium();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isValidationFromUrl = searchParams.get('validate') === 'true';
  const isValidating = validationMode || isValidationFromUrl;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [validatedSections, setValidatedSections] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('eldo_validated_sections');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const steps = [
    { title: 'Applicants', component: ApplicantsSection, freeAccess: true },
    { title: 'Personal Details', component: PersonalDetailsSection, freeAccess: false },
    { title: 'Contact Details', component: ContactDetailsSection, freeAccess: false },
    { title: 'Study & Languages', component: StudyLanguagesSection, freeAccess: false },
    { title: 'Application Details', component: RepresentativeSection, freeAccess: false },
    { title: 'Work History', component: WorkHistorySection, freeAccess: false },
    { title: 'Personal History', component: PersonalHistorySection, freeAccess: false },
  ];

  // Mock: sections with missing required fields (replace with real validation logic)
  const [sectionsWithMissingFields] = useState<Record<string, number>>({
    'Personal Details': 3,
    'Contact Details': 1,
    'Work History': 2,
  });

  const validatedCount = Object.values(validatedSections).filter(Boolean).length;
  const allValidated = validatedCount === steps.length;

  useEffect(() => {
    localStorage.setItem('eldo_validated_sections', JSON.stringify(validatedSections));
  }, [validatedSections]);

  useEffect(() => {
    if (isValidating && allValidated) {
      onValidationComplete?.();
      navigate('/dashboard/complete');
    }
  }, [allValidated, isValidating, onValidationComplete, navigate]);

  const toggleSectionValidation = (sectionTitle: string) => {
    setValidatedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle]
    }));
  };

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, [steps[currentStep].title]: stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      if (!isPremium && !steps[currentStep + 1].freeAccess) {
        setShowUpgradeModal(true);
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
    if (!isPremium && !steps[index].freeAccess) {
      setShowUpgradeModal(true);
      return;
    }
    setCurrentStep(index);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const exitValidationMode = () => {
    navigate('/dashboard/complete');
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-pale-blue py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Validation Mode Banner */}
        {isValidating && (
          <div className="mb-4 bg-primary-blue text-white rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-accent-gold" />
              <div>
                <p className="font-semibold">Validation Mode</p>
                <p className="text-sm text-white/80">
                  Review each section and mark as validated ({validatedCount}/{steps.length} complete)
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={exitValidationMode}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Exit
            </Button>
          </div>
        )}

        <Card className="glass-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary-blue">
              {isValidating ? 'Validate Your Profile' : 'Application Form'}
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
            {/* Step Navigation with Validation Checkboxes */}
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 overflow-x-auto">
                {steps.map((step, index) => {
                  const missingCount = sectionsWithMissingFields[step.title] || 0;
                  const hasMissing = missingCount > 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => goToStep(index)}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 relative",
                        index === currentStep
                          ? 'bg-primary text-primary-foreground'
                          : validatedSections[step.title]
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : hasMissing
                          ? 'bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20'
                          : index < currentStep
                          ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {isValidating ? (
                        validatedSections[step.title] 
                          ? <CheckCircle2 className="w-3 h-3" />
                          : <Circle className="w-3 h-3" />
                      ) : hasMissing && !validatedSections[step.title] ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : null}
                      {step.title}
                      {hasMissing && !validatedSections[step.title] && index !== currentStep && (
                        <span className="ml-1 bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                          {missingCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Step Content */}
            <div className="min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-center flex-1">
                  {steps[currentStep].title}
                </h2>
                {isValidating && (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={`validate-${currentStep}`}
                      checked={validatedSections[steps[currentStep].title] || false}
                      onCheckedChange={() => toggleSectionValidation(steps[currentStep].title)}
                    />
                    <label 
                      htmlFor={`validate-${currentStep}`}
                      className="text-sm font-medium text-muted-foreground cursor-pointer"
                    >
                      Mark as validated
                    </label>
                  </div>
                )}
              </div>
              <CurrentStepComponent 
                data={formData[steps[currentStep].title] || {}}
                onUpdate={updateFormData}
              />
            </div>

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
                isValidating ? (
                  <Button
                    onClick={exitValidationMode}
                    disabled={!allValidated}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{allValidated ? 'Complete Validation' : `${validatedCount}/${steps.length} Validated`}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
                  >
                    <span>Submit Application</span>
                  </Button>
                )
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
      
      <UpgradeModal 
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature="the full profile builder"
      />
    </div>
  );
};

export default ApplicationForm;