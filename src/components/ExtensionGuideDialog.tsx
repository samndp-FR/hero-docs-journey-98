import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Chrome, Download, ExternalLink, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExtensionGuideDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

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

export function ExtensionGuideDialog({ open, onOpenChange, onComplete }: ExtensionGuideDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // All steps complete
      onComplete?.();
      onOpenChange(false);
      // Reset for next time
      setTimeout(() => {
        setCurrentStep(0);
        setCompletedSteps([]);
      }, 300);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Chrome className="h-5 w-5 text-primary" />
            Extension Setup Guide
          </DialogTitle>
        </DialogHeader>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 py-2">
          {steps.map((s, index) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentStep
                  ? "w-6 bg-primary"
                  : completedSteps.includes(index)
                  ? "bg-primary/60"
                  : "bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="py-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
              completedSteps.includes(currentStep)
                ? "bg-emerald-100 text-emerald-600"
                : "bg-primary/10 text-primary"
            )}>
              {completedSteps.includes(currentStep) ? (
                <Check className="w-6 h-6" />
              ) : (
                <StepIcon className="w-6 h-6" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Step {step.id} of {steps.length}
              </p>
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </div>

          {/* Optional action button */}
          {step.action && (
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => window.open(step.action.href, '_blank')}
            >
              <step.action.icon className="w-4 h-4" />
              {step.action.label}
            </Button>
          )}

          {/* Optional tip */}
          {step.tip && (
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                💡 <span className="font-medium text-foreground">Tip:</span> {step.tip}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="gap-2">
            {isLastStep ? (
              <>
                <Check className="w-4 h-4" />
                Done
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
