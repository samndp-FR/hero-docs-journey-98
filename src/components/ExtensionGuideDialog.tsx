import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Chrome, Download, ExternalLink, Sparkles, ArrowRight, ArrowLeft, User, MousePointer, ShieldCheck } from 'lucide-react';
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
      href: '#',
    },
  },
  {
    id: 2,
    title: 'Sign In to Eldo',
    description: 'Click the extension icon in your browser toolbar and sign in with your Eldo account.',
    icon: User,
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
    description: 'Click the extension icon and press "Fill Form" to auto-fill with your validated data.',
    icon: Sparkles,
    tip: 'You stay in control. We only fill fields and never submit without your review.',
  },
];

// Visual mockups for each step
const StepVisual = ({ stepId, isActive }: { stepId: number; isActive: boolean }) => {
  const baseClasses = "transition-all duration-300";
  
  if (stepId === 1) {
    return (
      <div className={cn(baseClasses, "relative")}>
        <div className="w-full h-36 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-border overflow-hidden">
          <div className="h-7 bg-slate-200 dark:bg-slate-700 flex items-center px-2 gap-1.5">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-2 h-4 rounded bg-white dark:bg-slate-600 flex items-center px-2">
              <span className="text-[8px] text-muted-foreground">chrome.google.com/webstore</span>
            </div>
          </div>
          <div className="p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Eldo Form Assistant</p>
              <p className="text-xs text-muted-foreground">Auto-fill immigration forms</p>
              <div className="flex items-center gap-0.5 mt-1">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
                <span className="text-[10px] text-muted-foreground ml-1">(2.4k)</span>
              </div>
            </div>
            <Button size="sm" className={cn(
              "bg-primary hover:bg-primary/90",
              isActive && "animate-pulse"
            )}>
              Add to Chrome
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 2) {
    return (
      <div className={cn(baseClasses, "flex justify-center")}>
        <div className="w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-smokum text-lg text-white">Eldo</span>
            </div>
          </div>
          <div className="p-4 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Sign in required</p>
              <p className="text-xs text-muted-foreground">Connect your Eldo account</p>
            </div>
            <Button size="sm" className={cn(
              "w-full bg-primary hover:bg-primary/90",
              isActive && "animate-pulse"
            )}>
              Sign in to Eldo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 3) {
    return (
      <div className={cn(baseClasses, "relative")}>
        <div className="w-full h-36 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-border overflow-hidden">
          <div className="h-7 bg-slate-200 dark:bg-slate-700 flex items-center px-2 gap-1.5">
            <div className="flex gap-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-2 h-4 rounded bg-white dark:bg-slate-600 flex items-center px-2">
              <span className="text-[8px] text-muted-foreground">secure.cic.gc.ca/form/imm5257</span>
            </div>
            <div className={cn(
              "w-5 h-5 rounded bg-primary flex items-center justify-center",
              isActive && "ring-2 ring-primary ring-offset-2"
            )}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center">
                <span className="text-white text-sm">🍁</span>
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Government of Canada</p>
                <p className="text-[10px] text-muted-foreground">Immigration, Refugees and Citizenship</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2.5 bg-muted rounded w-3/4" />
              <div className="h-2.5 bg-muted rounded w-1/2" />
              <div className="h-2.5 bg-muted rounded w-2/3" />
            </div>
          </div>
          {isActive && (
            <div className="absolute top-6 right-4 animate-bounce">
              <MousePointer className="w-5 h-5 text-primary -rotate-12" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (stepId === 4) {
    return (
      <div className={cn(baseClasses, "flex justify-center")}>
        <div className="w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-smokum text-lg text-white">Eldo</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-200">Ready</span>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs font-medium text-foreground">IMM 5257 Detected</p>
                  <p className="text-[10px] text-muted-foreground">42 fields found</p>
                </div>
              </div>
            </div>
            <Button size="sm" className={cn(
              "w-full bg-primary hover:bg-primary/90 gap-1",
              isActive && "animate-pulse"
            )}>
              <Sparkles className="w-4 h-4" />
              Fill Form
            </Button>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400">You stay in control</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

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
      onComplete?.();
      onOpenChange(false);
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
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        {/* Header - matching extension mockup style */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                <Chrome className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Extension Setup Guide</h3>
                <p className="text-xs text-white/70">Step {step.id} of {steps.length}</p>
              </div>
            </div>
            {/* Progress dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    index === currentStep
                      ? "w-5 bg-white"
                      : completedSteps.includes(index)
                      ? "bg-white/60"
                      : "bg-white/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5">
          {/* Visual mockup */}
          <StepVisual stepId={step.id} isActive={!completedSteps.includes(currentStep)} />

          {/* Step info */}
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
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
              <h4 className="font-semibold text-lg text-foreground">{step.title}</h4>
              <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
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
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300">{step.tip}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border bg-muted/30">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="gap-2 bg-primary hover:bg-primary/90">
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
