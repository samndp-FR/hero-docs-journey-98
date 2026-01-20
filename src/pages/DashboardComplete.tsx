import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, Chrome, Lock, Undo2, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { PremiumGate } from '@/components/PremiumGate';
import { ExtensionGuideDialog } from '@/components/ExtensionGuideDialog';
import { ExtensionGuideInline } from '@/components/ExtensionGuideInline';

type StepStatus = 'locked' | 'current' | 'completed' | 'ready-for-review';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const DashboardComplete = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem('completeAppSteps');
    return saved ? JSON.parse(saved) : [];
  });
  const [extensionGuideOpen, setExtensionGuideOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('completeAppSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const completeStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const undoStep = (stepId: number) => {
    setCompletedSteps(completedSteps.filter(id => id < stepId));
  };

  const getStepStatus = (stepId: number): StepStatus => {
    if (completedSteps.includes(stepId)) return 'completed';
    const previousStepsCompleted = Array.from({ length: stepId - 1 }, (_, i) => i + 1)
      .every(id => completedSteps.includes(id));
    
    if (stepId === 2 && previousStepsCompleted && validationComplete) {
      return 'ready-for-review';
    }
    
    if (stepId === 1 || previousStepsCompleted) return 'current';
    return 'locked';
  };

  // Check validation progress
  const [validatedSections, setValidatedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('validatedSections');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const checkValidation = () => {
      const saved = localStorage.getItem('validatedSections');
      setValidatedSections(saved ? JSON.parse(saved) : []);
    };
    
    window.addEventListener('storage', checkValidation);
    checkValidation();
    return () => window.removeEventListener('storage', checkValidation);
  }, []);

  const totalSections = 7;
  const validationComplete = validatedSections.length >= totalSections;
  const validationStarted = validatedSections.length > 0;
  const validationProgress = (validatedSections.length / totalSections) * 100;

  const steps: Step[] = [
    {
      id: 1,
      title: 'Confirm ITA Received',
      description: 'Mark that you\'ve received your Invitation to Apply from IRCC. This unlocks the next steps.',
      icon: <Clock className="h-5 w-5" />,
      action: {
        label: 'I received my ITA',
        onClick: () => completeStep(1),
      },
    },
    {
      id: 2,
      title: 'Validate Your Form',
      description: validationComplete 
        ? 'All sections validated! Your form is ready for submission.'
        : validationStarted
        ? `Validation in progress. ${validatedSections.length} of ${totalSections} sections reviewed.`
        : 'Enter validation mode to review each section of your profile before submitting.',
      icon: <FileText className="h-5 w-5" />,
      action: validationComplete 
        ? {
            label: 'Mark as Complete',
            onClick: () => completeStep(2),
          }
        : {
            label: validationStarted ? 'Continue Validation' : 'Enter Validation Mode',
            onClick: () => navigate('/dashboard/form?validate=true'),
          },
    },
    {
      id: 3,
      title: 'Use Chrome Extension',
      description: 'Use our Chrome extension to auto-fill the official IRCC forms with your validated data.',
      icon: <Chrome className="h-5 w-5" />,
      action: {
        label: 'Open Extension Guide',
        onClick: () => setExtensionGuideOpen(true),
      },
    },
  ];

  const progress = completedSteps.length === 0 ? 0 : (completedSteps.length / steps.length) * 100;

  const stepsContent = (
    <>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium text-foreground">{completedSteps.length} of {steps.length} steps</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {steps.map((step) => {
          const status = getStepStatus(step.id);

          return (
            <Card 
              key={step.id}
              className={cn(
                "transition-all duration-200",
                status === 'locked' && "opacity-50",
                status === 'current' && "ring-2 ring-primary/20 border-primary/30",
                status === 'ready-for-review' && "ring-2 ring-green-500/20 border-green-500/30"
              )}
            >
              <CardContent className="p-5">
                <div className="flex gap-4">
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                    status === 'completed' && "bg-primary text-primary-foreground",
                    status === 'current' && "bg-primary/10 text-primary border-2 border-primary",
                    status === 'ready-for-review' && "bg-green-500/10 text-green-600 border-2 border-green-500",
                    status === 'locked' && "bg-muted text-muted-foreground"
                  )}>
                    {status === 'completed' ? (
                      <Check className="h-5 w-5" />
                    ) : status === 'locked' ? (
                      <Lock className="h-4 w-4" />
                    ) : status === 'ready-for-review' ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="font-semibold">{step.id}</span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            "font-medium",
                            status === 'completed' && "text-muted-foreground line-through",
                            status === 'current' && "text-foreground",
                            status === 'ready-for-review' && "text-green-600",
                            status === 'locked' && "text-muted-foreground"
                          )}>
                            {step.title}
                          </h3>
                          {status === 'ready-for-review' && (
                            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
                              Ready for review
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                        
                        {/* Validation progress for step 2 */}
                        {step.id === 2 && status === 'current' && validationStarted && !validationComplete && (
                          <div className="mt-3 p-3 bg-primary-blue/5 border border-primary-blue/20 rounded-lg">
                            <div className="flex items-center gap-3">
                              <Progress value={validationProgress} className="flex-1 h-2" />
                              <span className="text-xs font-medium text-primary-blue whitespace-nowrap">
                                {validatedSections.length}/{totalSections} sections
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Inline guide for step 3 when completed */}
                        {step.id === 3 && status === 'completed' && (
                          <ExtensionGuideInline />
                        )}
                      </div>

                      <div className="flex-shrink-0 flex items-center gap-2">
                        {status === 'completed' && (
                          <>
                            <div className="text-sm text-primary font-medium flex items-center gap-1">
                              <Check className="h-4 w-4" />
                              Done
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => undoStep(step.id)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <Undo2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        {(status === 'current' || status === 'ready-for-review') && (
                          <div className="flex items-center gap-2">
                            {step.secondaryAction && (
                              <Button 
                                variant="outline"
                                size="sm"
                                onClick={step.secondaryAction.onClick}
                                className="flex-shrink-0"
                              >
                                {step.secondaryAction.label}
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            )}
                            {step.action && (
                              <Button 
                                size="sm"
                                onClick={step.action.onClick}
                                className="flex-shrink-0"
                              >
                                {step.action.label}
                              </Button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {completedSteps.length === steps.length && (
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">All steps complete!</h3>
            <p className="text-sm text-muted-foreground">
              You're ready to submit your PR application on the IRCC website.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Apply for PR</h1>
          <p className="text-muted-foreground">
            Follow these steps to complete and submit your PR application after receiving your ITA.
          </p>
        </div>

        <PremiumGate feature="Apply for PR">
          {stepsContent}
        </PremiumGate>
      </div>

      <ExtensionGuideDialog 
        open={extensionGuideOpen} 
        onOpenChange={setExtensionGuideOpen}
        onComplete={() => completeStep(3)}
      />
    </DashboardLayout>
  );
};

export default DashboardComplete;