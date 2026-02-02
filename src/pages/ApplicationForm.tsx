import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle2, Circle, ShieldCheck, AlertCircle, AlertTriangle } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
  const totalMissingFields = Object.values(sectionsWithMissingFields).reduce((sum, count) => sum + count, 0);

  useEffect(() => {
    localStorage.setItem('eldo_validated_sections', JSON.stringify(validatedSections));
  }, [validatedSections]);

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

  const handleCompleteValidation = () => {
    if (allValidated) {
      setShowConfirmDialog(true);
    }
  };

  const confirmValidation = () => {
    setShowConfirmDialog(false);
    onValidationComplete?.();
    navigate('/dashboard/complete');
  };

  const exitValidationMode = () => {
    navigate('/dashboard/complete');
  };

  const CurrentStepComponent = steps[currentStep].component;
  const progress = ((currentStep + 1) / steps.length) * 100;
  const validationProgress = (validatedCount / steps.length) * 100;

  // Validation mode - dark royal blue theme with gold accents
  if (isValidating) {
    return (
      <div className="min-h-screen bg-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          {/* Validation Mode Header */}
          <div className="mb-6 bg-[hsl(var(--validation-blue-dark))] border border-[hsl(var(--validation-border))] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[hsl(var(--validation-gold))]/20">
                  <ShieldCheck className="w-6 h-6 text-[hsl(var(--validation-gold))]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Validation Mode</h1>
                  <p className="text-sm text-white/60">
                    Review your profile data and mark each section as validated
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exitValidationMode}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
              >
                Exit
              </Button>
            </div>

            {/* Section Checkboxes in Header */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
              {steps.map((step, index) => {
                const isValidated = validatedSections[step.title];
                const missingCount = sectionsWithMissingFields[step.title] || 0;
                const isCurrent = index === currentStep;
                
                return (
                  <div
                    key={step.title}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-lg text-left transition-all text-xs",
                      isCurrent
                        ? "bg-[hsl(var(--validation-gold))]/20 border border-[hsl(var(--validation-gold))]/50"
                        : "bg-white/5 hover:bg-white/10 border border-transparent"
                    )}
                  >
                    <Checkbox
                      checked={isValidated}
                      onCheckedChange={() => toggleSectionValidation(step.title)}
                      className="border-white/40 data-[state=checked]:bg-[hsl(var(--validation-gold))] data-[state=checked]:border-[hsl(var(--validation-gold))] data-[state=checked]:text-[hsl(var(--validation-blue-darker))]"
                    />
                    <button
                      onClick={() => goToStep(index)}
                      className="flex-1 min-w-0 text-left"
                    >
                      <span className={cn(
                        "block truncate",
                        isValidated ? "text-[hsl(var(--validation-gold))]" : "text-white/80"
                      )}>
                        {step.title}
                      </span>
                      {missingCount > 0 && !isValidated && (
                        <span className="text-[10px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-2.5 h-2.5" />
                          {missingCount} missing
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-white/60">
                <span>Validation Progress</span>
                <span>{validatedCount} of {steps.length} sections validated</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[hsl(var(--validation-gold))] transition-all duration-500"
                  style={{ width: `${validationProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Content Card */}
          <Card className="bg-[hsl(var(--validation-blue-dark))] border-[hsl(var(--validation-border))]">
            <CardHeader className="border-b border-[hsl(var(--validation-border))]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[hsl(var(--validation-gold))]/20 text-[hsl(var(--validation-gold))] font-bold text-sm">
                    {currentStep + 1}
                  </div>
                  <CardTitle className="text-xl text-white">
                    {steps[currentStep].title}
                  </CardTitle>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={`validate-header-${currentStep}`}
                    checked={validatedSections[steps[currentStep].title] || false}
                    onCheckedChange={() => toggleSectionValidation(steps[currentStep].title)}
                    className="border-white/40 data-[state=checked]:bg-[hsl(var(--validation-gold))] data-[state=checked]:border-[hsl(var(--validation-gold))] data-[state=checked]:text-[hsl(var(--validation-blue-darker))]"
                  />
                  <label 
                    htmlFor={`validate-header-${currentStep}`}
                    className="text-sm font-medium text-white/80 cursor-pointer"
                  >
                    Mark Complete
                  </label>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {/* Current Step Content - white background for readability */}
              <div className="bg-white rounded-lg p-6 min-h-[400px]">
                <CurrentStepComponent 
                  data={formData[steps[currentStep].title] || {}}
                  onUpdate={updateFormData}
                />
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 mt-6 border-t border-[hsl(var(--validation-border))]">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    onClick={handleCompleteValidation}
                    disabled={!allValidated}
                    className={cn(
                      "flex items-center gap-2",
                      allValidated 
                        ? "bg-[hsl(var(--validation-gold))] hover:bg-[hsl(var(--validation-gold))]/90 text-[hsl(var(--validation-blue-darker))]"
                        : "bg-white/20 text-white/50"
                    )}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{allValidated ? 'Complete Validation' : `${validatedCount}/${steps.length} Validated`}</span>
                  </Button>
                ) : (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-[hsl(var(--validation-gold))] hover:bg-[hsl(var(--validation-gold))]/90 text-[hsl(var(--validation-blue-darker))]"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent className="bg-[hsl(var(--validation-blue-dark))] border-[hsl(var(--validation-border))]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--validation-gold))]" />
                Complete Validation?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/70 space-y-3">
                <p>
                  You're about to complete the validation process. 
                </p>
                {totalMissingFields > 0 && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="font-medium text-red-300">
                      ⚠️ {totalMissingFields} fields are still missing across your profile.
                    </p>
                  </div>
                )}
                <p className="text-sm">
                  You can still modify your forms directly on the IRCC website, but <strong className="text-white">missing fields may prevent the extension from working optimally</strong> when auto-filling your application.
                </p>
                <p className="text-sm text-white/50">
                  We recommend filling in all required fields for the best experience.
                </p>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white">
                Go Back
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmValidation}
                className="bg-[hsl(var(--validation-gold))] hover:bg-[hsl(var(--validation-gold))]/90 text-[hsl(var(--validation-blue-darker))]"
              >
                Complete Anyway
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <UpgradeModal 
          open={showUpgradeModal}
          onOpenChange={setShowUpgradeModal}
          feature="the full profile builder"
        />
      </div>
    );
  }

  // Normal mode (non-validation)
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
                          : hasMissing
                          ? 'bg-destructive/10 text-destructive border border-destructive/30 hover:bg-destructive/20'
                          : index < currentStep
                          ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      )}
                    >
                      {hasMissing && index !== currentStep ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : null}
                      {step.title}
                      {hasMissing && index !== currentStep && (
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
              <h2 className="text-2xl font-semibold text-center mb-6">
                {steps[currentStep].title}
              </h2>
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
                <Button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 bg-success hover:bg-success/90"
                >
                  <span>Submit Application</span>
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
      
      <UpgradeModal 
        open={showUpgradeModal}
        onOpenChange={setShowUpgradeModal}
        feature="the full profile builder"
      />
    </div>
  );
};

export default ApplicationForm;