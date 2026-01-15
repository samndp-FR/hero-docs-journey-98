import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Chrome, Download, ExternalLink, Sparkles, ArrowRight, ArrowLeft, User, MousePointer, ShieldCheck } from 'lucide-react';
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
    // Chrome Web Store visual
    return (
      <div className={cn(baseClasses, "relative")}>
        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-border overflow-hidden">
          {/* Browser bar */}
          <div className="h-6 bg-slate-200 dark:bg-slate-700 flex items-center px-2 gap-1.5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-2 h-3 rounded bg-white dark:bg-slate-600 flex items-center px-2">
              <span className="text-[6px] text-muted-foreground">chrome.google.com/webstore</span>
            </div>
          </div>
          {/* Content */}
          <div className="p-3 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">Eldo Form Assistant</p>
              <p className="text-[10px] text-muted-foreground">Auto-fill immigration forms</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-2 h-2 text-yellow-400">★</div>
                ))}
              </div>
            </div>
            <div className={cn(
              "inline-flex items-center justify-center h-7 px-3 rounded-md text-xs font-medium bg-primary text-primary-foreground pointer-events-none select-none",
              isActive && "animate-pulse"
            )}>
              Add to Chrome
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 2) {
    // Extension popup - sign in state
    return (
      <div className={cn(baseClasses, "flex justify-center")}>
        <div className="w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-border overflow-hidden">
          {/* Extension header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="font-smokum text-sm text-white">Eldo</span>
            </div>
          </div>
          {/* Sign in content */}
          <div className="p-3 text-center space-y-2">
            <div className="w-10 h-10 mx-auto rounded-full bg-muted flex items-center justify-center">
              <User className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-[10px] text-muted-foreground">Sign in to continue</p>
            <div className={cn(
              "inline-flex items-center justify-center w-full h-6 px-2 rounded-md text-[10px] font-medium bg-primary text-primary-foreground pointer-events-none select-none",
              isActive && "animate-pulse"
            )}>
              Sign in to Eldo
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stepId === 3) {
    // IRCC Portal visual
    return (
      <div className={cn(baseClasses, "relative")}>
        <div className="w-full h-32 rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-border overflow-hidden">
          {/* Browser bar */}
          <div className="h-6 bg-slate-200 dark:bg-slate-700 flex items-center px-2 gap-1.5">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              <div className="w-2 h-2 rounded-full bg-yellow-400" />
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-2 h-3 rounded bg-white dark:bg-slate-600 flex items-center px-2">
              <span className="text-[6px] text-muted-foreground">secure.cic.gc.ca/form/imm5257</span>
            </div>
            {/* Extension icon in toolbar */}
            <div className={cn(
              "w-4 h-4 rounded bg-primary flex items-center justify-center",
              isActive && "ring-2 ring-primary ring-offset-1"
            )}>
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
          {/* IRCC content mockup */}
          <div className="p-3 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center">
                <span className="text-white text-[8px] font-bold">🍁</span>
              </div>
              <div>
                <p className="text-[8px] font-medium text-foreground">Government of Canada</p>
                <p className="text-[6px] text-muted-foreground">Immigration, Refugees and Citizenship</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-2 bg-muted rounded w-3/4" />
              <div className="h-2 bg-muted rounded w-1/2" />
            </div>
          </div>
          {/* Pointer animation */}
          {isActive && (
            <div className="absolute top-5 right-3 animate-bounce">
              <MousePointer className="w-4 h-4 text-primary -rotate-12" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (stepId === 4) {
    // Extension popup - ready to fill state
    return (
      <div className={cn(baseClasses, "flex justify-center")}>
        <div className="w-48 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-border overflow-hidden">
          {/* Extension header */}
          <div className="bg-gradient-to-r from-primary to-primary/80 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
                <span className="font-smokum text-sm text-white">Eldo</span>
              </div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20">
                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] text-emerald-200">Ready</span>
              </div>
            </div>
          </div>
          {/* Ready content */}
          <div className="p-3 space-y-2">
            <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-[10px] font-medium text-foreground">IMM 5257 Detected</p>
                  <p className="text-[8px] text-muted-foreground">42 fields found</p>
                </div>
              </div>
            </div>
            <div className={cn(
              "inline-flex items-center justify-center gap-1 w-full h-7 px-2 rounded-md text-[10px] font-medium bg-primary text-primary-foreground pointer-events-none select-none",
              isActive && "animate-pulse"
            )}>
              <Sparkles className="w-3 h-3" />
              Fill Form
            </div>
            <div className="flex items-center gap-1 p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/30">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <p className="text-[7px] text-emerald-700 dark:text-emerald-400">You stay in control</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

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
    <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden shadow-lg">
      {/* Header - matching extension mockup style */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <Chrome className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-sm text-white">Extension Setup Guide</h3>
              <p className="text-[10px] text-white/70">Step {step.id} of {steps.length}</p>
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
      <div className="p-4 space-y-4">
        {/* Visual mockup */}
        <StepVisual stepId={step.id} isActive={!completedSteps.includes(currentStep)} />

        {/* Step info */}
        <div className="flex items-start gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
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
            <h4 className="font-semibold text-foreground">{step.title}</h4>
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
          <div className="flex items-start gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-700 dark:text-emerald-300">{step.tip}</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
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
            className="gap-1 bg-primary hover:bg-primary/90"
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
