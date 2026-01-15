import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Chrome, Download, ExternalLink, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    id: 1,
    title: 'Install the Extension',
    description: 'Add the Eldo Chrome extension to your browser from the Chrome Web Store.',
    icon: Download,
    action: {
      label: 'Open Chrome Web Store',
      icon: ExternalLink,
      href: '#', // Would be real Chrome Web Store link
    },
  },
  {
    id: 2,
    title: 'Sign In',
    description: 'Click the Eldo extension icon and sign in with your account to sync your form data.',
    icon: Chrome,
    tip: 'Use the same email you used to create your Eldo account.',
  },
  {
    id: 3,
    title: 'Navigate to IRCC',
    description: 'Go to the official IRCC portal and open your application form.',
    icon: ExternalLink,
    action: {
      label: 'Open IRCC Portal',
      icon: ExternalLink,
      href: 'https://www.canada.ca/en/immigration-refugees-citizenship.html',
    },
  },
  {
    id: 4,
    title: 'Auto-Fill Your Form',
    description: 'Click the extension icon and press "Fill Form" — we\'ll handle the rest!',
    icon: Sparkles,
    tip: 'You stay in control. We only fill fields and never submit without your review.',
  },
];

export function ExtensionGuideInline() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];
  const StepIcon = step.icon;
  const isLastStep = currentStep === steps.length - 1;
  const allComplete = completedSteps.length === steps.length;

  return (
    <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <Chrome className="h-4 w-4 text-primary" />
        <span className="font-medium text-sm">Extension Setup Guide</span>
        {/* Progress dots */}
        <div className="flex items-center gap-1.5 ml-auto">
          {steps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentStep
                  ? "w-4 bg-primary"
                  : completedSteps.includes(index)
                  ? "bg-primary/60"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            completedSteps.includes(currentStep)
              ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
              : "bg-primary/10 text-primary"
          )}>
            {completedSteps.includes(currentStep) ? (
              <Check className="w-5 h-5" />
            ) : (
              <StepIcon className="w-5 h-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground">
              Step {step.id} of {steps.length}
            </p>
            <h4 className="font-medium">{step.title}</h4>
            <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
          </div>
        </div>

        {/* Optional action button */}
        {step.action && (
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
            onClick={() => window.open(step.action.href, '_blank')}
          >
            <step.action.icon className="w-4 h-4" />
            {step.action.label}
          </Button>
        )}

        {/* Optional tip */}
        {step.tip && (
          <div className="p-2.5 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium text-foreground">Tip:</span> {step.tip}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            Back
          </Button>
          <Button 
            size="sm" 
            onClick={handleNext} 
            disabled={isLastStep && allComplete}
            className="gap-1"
          >
            {isLastStep ? (
              allComplete ? (
                <>
                  <Check className="w-3 h-3" />
                  Complete
                </>
              ) : (
                <>
                  <Check className="w-3 h-3" />
                  Done
                </>
              )
            ) : (
              <>
                Next
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
