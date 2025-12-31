import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, Chrome, Lock, Undo2, ArrowRight, AlertCircle, ClipboardCheck, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { usePremium } from '@/contexts/PremiumContext';
import { UpgradePrompt } from '@/components/UpgradePrompt';

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
  const { isPremium } = usePremium();
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem('completeAppSteps');
    return saved ? JSON.parse(saved) : [];
  });

  // Get form progress percentage
  const [formProgress, setFormProgress] = useState(() => {
    const saved = localStorage.getItem('formProgress');
    return saved ? JSON.parse(saved) : 0;
  });

  // Check if form is ready for review (100% complete)
  const formReadyForReview = formProgress >= 100;

  useEffect(() => {
    localStorage.setItem('completeAppSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Listen for form progress changes
  useEffect(() => {
    const checkFormProgress = () => {
      const saved = localStorage.getItem('formProgress');
      setFormProgress(saved ? JSON.parse(saved) : 0);
    };
    
    window.addEventListener('storage', checkFormProgress);
    return () => window.removeEventListener('storage', checkFormProgress);
  }, []);

  const completeStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const undoStep = (stepId: number) => {
    // Remove this step and all steps after it
    setCompletedSteps(completedSteps.filter(id => id < stepId));
  };

  const getStepStatus = (stepId: number): StepStatus => {
    if (completedSteps.includes(stepId)) return 'completed';
    const previousStepsCompleted = Array.from({ length: stepId - 1 }, (_, i) => i + 1)
      .every(id => completedSteps.includes(id));
    
    // Special case for step 2: check if form is ready
    if (stepId === 2 && previousStepsCompleted && formReadyForReview) {
      return 'ready-for-review';
    }
    
    if (stepId === 1 || previousStepsCompleted) return 'current';
    return 'locked';
  };

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
      description: formReadyForReview 
        ? 'Your form is complete and ready for review. Validate your entries before submitting.'
        : 'Complete your profile form first, then validate your entries before submitting to IRCC.',
      icon: <FileText className="h-5 w-5" />,
      action: formReadyForReview 
        ? {
            label: 'Mark as Validated',
            onClick: () => completeStep(2),
          }
        : undefined,
      secondaryAction: formReadyForReview 
        ? {
            label: 'Go to Form',
            onClick: () => {},
          }
        : undefined,
    },
    {
      id: 3,
      title: 'Use Chrome Extension',
      description: 'Use our Chrome extension to auto-fill the official IRCC forms with your validated data.',
      icon: <Chrome className="h-5 w-5" />,
      action: {
        label: 'Open Extension Guide',
        onClick: () => completeStep(3),
      },
    },
  ];

  const progress = completedSteps.length === 0 ? 0 : (completedSteps.length / steps.length) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Apply for PR</h1>
          <p className="text-muted-foreground">
            Follow these steps to complete and submit your PR application after receiving your ITA.
          </p>
        </div>

        {isPremium ? (
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
              {steps.map((step, index) => {
                const status = getStepStatus(step.id);
                const isLast = index === steps.length - 1;
                const canUndo = status === 'completed';

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
                        {/* Step Number/Icon */}
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

                        {/* Content */}
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
                              
                              {/* Build Profile Progress Bar for Step 2 when not ready */}
                              {step.id === 2 && status === 'current' && !formReadyForReview && (
                                <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                  <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600" />
                                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                                      Complete Build Profile first
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Progress value={formProgress} className="flex-1 h-2" />
                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 whitespace-nowrap">
                                      {Math.round(formProgress)}% complete
                                    </span>
                                  </div>
                                  <div className="flex gap-2 mt-2">
                                    <Button 
                                      variant="outline"
                                      size="sm"
                                      onClick={() => navigate('/dashboard/form')}
                                      className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/30"
                                    >
                                      Continue Build Profile
                                      <ArrowRight className="h-3 w-3 ml-1" />
                                    </Button>
                                    <Button 
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {}}
                                      className="text-muted-foreground hover:text-foreground"
                                    >
                                      Open Form Anyway
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex-shrink-0 flex items-center gap-2">
                              {/* Completed state with undo */}
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

                              {/* Current or ready-for-review state */}
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
                                      variant={status === 'ready-for-review' ? 'default' : 'default'}
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

            {/* Completion State */}
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
        ) : (
          <div className="space-y-6">
            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60 pointer-events-none select-none">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    ITA Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track your Invitation to Apply status and get reminders for deadlines.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ClipboardCheck className="h-4 w-4" />
                    Form Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Validate your application form against IRCC requirements before submission.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Chrome className="h-4 w-4" />
                    Chrome Extension
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Auto-fill official IRCC forms with your validated data using our extension.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Submission Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step guidance through the final submission process.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Upgrade Prompt */}
            <UpgradePrompt 
              feature="Apply for PR"
              description="Get guided assistance through the final steps of your PR application, including form validation and our Chrome extension for auto-filling IRCC forms."
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardComplete;