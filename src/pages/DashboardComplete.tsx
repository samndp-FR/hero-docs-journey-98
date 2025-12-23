import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock, FileText, Chrome, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

type StepStatus = 'locked' | 'current' | 'completed';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const DashboardComplete = () => {
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    const saved = localStorage.getItem('completeAppSteps');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completeAppSteps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const completeStep = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getStepStatus = (stepId: number): StepStatus => {
    if (completedSteps.includes(stepId)) return 'completed';
    const previousStepsCompleted = Array.from({ length: stepId - 1 }, (_, i) => i + 1)
      .every(id => completedSteps.includes(id));
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
      description: 'Review and validate your application form entries before submitting to IRCC.',
      icon: <FileText className="h-5 w-5" />,
      action: {
        label: 'Validate Form',
        onClick: () => completeStep(2),
      },
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

  const currentStepIndex = steps.findIndex(s => getStepStatus(s.id) === 'current');
  const progress = completedSteps.length === 0 ? 0 : (completedSteps.length / steps.length) * 100;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">Complete Application</h1>
          <p className="text-muted-foreground">
            Follow these steps to complete and submit your PR application after receiving your ITA.
          </p>
        </div>

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

            return (
              <Card 
                key={step.id}
                className={cn(
                  "transition-all duration-200",
                  status === 'locked' && "opacity-50",
                  status === 'current' && "ring-2 ring-primary/20 border-primary/30"
                )}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    {/* Step Number/Icon */}
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                      status === 'completed' && "bg-primary text-primary-foreground",
                      status === 'current' && "bg-primary/10 text-primary border-2 border-primary",
                      status === 'locked' && "bg-muted text-muted-foreground"
                    )}>
                      {status === 'completed' ? (
                        <Check className="h-5 w-5" />
                      ) : status === 'locked' ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <span className="font-semibold">{step.id}</span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className={cn(
                            "font-medium mb-1",
                            status === 'completed' && "text-muted-foreground line-through",
                            status === 'current' && "text-foreground",
                            status === 'locked' && "text-muted-foreground"
                          )}>
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {step.description}
                          </p>
                        </div>

                        {/* Action Button */}
                        {step.action && status === 'current' && (
                          <Button 
                            size="sm"
                            onClick={step.action.onClick}
                            className="flex-shrink-0"
                          >
                            {step.action.label}
                          </Button>
                        )}
                        {status === 'completed' && (
                          <div className="flex-shrink-0 text-sm text-primary font-medium flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            Done
                          </div>
                        )}
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
      </div>
    </DashboardLayout>
  );
};

export default DashboardComplete;
