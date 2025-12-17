
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, FolderOpen, FileEdit, ShieldCheck, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: 'Welcome to Eldo',
    subtitle: 'Apply with peace of mind',
    content: 'welcome',
  },
  {
    id: 2,
    title: 'Check your eligibility',
    subtitle: 'CRS Score Verification',
    content: 'crs',
  },
  {
    id: 3,
    title: 'Important to understand',
    subtitle: 'What Eldo does and does not do',
    content: 'disclaimer',
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasConfirmedCRS, setHasConfirmedCRS] = useState(false);
  const [hasConfirmedUnderstanding, setHasConfirmedUnderstanding] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/upgrade');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  const handleTakeCRSAssessment = () => {
    navigate('/crs-assessment');
  };

  const canProceed = () => {
    if (currentStep === 1) return hasConfirmedCRS;
    if (currentStep === 2) return hasConfirmedUnderstanding;
    return true;
  };

  return (
    <div className="min-h-screen bg-pale-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <span className="eldo-text text-3xl">Eldo</span>
            <span className="agent-text text-xl">Copilot</span>
          </div>
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
        </div>

        {/* Progress bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-primary-blue text-white' 
                      : 'bg-white border-2 border-border text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 rounded-full transition-all duration-300 ${
                    index < currentStep ? 'bg-primary-blue' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            {/* Step content */}
            <div className="text-center mb-8">
              <span className="px-4 py-1.5 rounded-full bg-primary-blue/20 text-primary-blue font-medium text-sm inline-block mb-4">
                Step {currentStep + 1} of {steps.length}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {steps[currentStep].title}
              </h1>
              <p className="text-lg text-primary-blue font-medium">
                {steps[currentStep].subtitle}
              </p>
            </div>

            {/* Step 1: Welcome */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground mb-8">
                  Eldo helps you navigate your Express Entry application with confidence.
                </p>
                
                {/* What Eldo does - badges */}
                <div className="grid gap-4">
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Apply with peace of mind</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay organized and confident throughout your application process
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Keep everything in one place</h3>
                      <p className="text-sm text-muted-foreground">
                        All your documents, forms, and application details organized together
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileEdit className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Automate form filling</h3>
                      <p className="text-sm text-muted-foreground">
                        Save time with automated data entry across your application forms
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: CRS Check */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <p className="text-center text-muted-foreground mb-6">
                  Express Entry is a points-based system. To be eligible, you need a competitive CRS score.
                </p>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Important</h4>
                      <p className="text-sm text-amber-700">
                        Eldo helps you with the application process, but does not help you improve your CRS score or qualify for Express Entry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleTakeCRSAssessment}
                    variant="outline"
                    className="w-full py-6 rounded-xl border-2 border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/5"
                  >
                    <Calculator className="w-5 h-5 mr-3 text-primary-blue" />
                    <span className="text-foreground">Take the CRS Assessment</span>
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <label 
                    className={`block bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                      hasConfirmedCRS 
                        ? 'border-primary-blue bg-primary-blue/5' 
                        : 'border-border hover:border-primary-blue/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={hasConfirmedCRS}
                        onChange={(e) => setHasConfirmedCRS(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-border text-primary-blue focus:ring-primary-blue"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          I already know my CRS score
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          I confirm that I have a competitive CRS score and understand that Eldo does not help improve my eligibility or points.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Disclaimer */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-white rounded-xl p-5 border border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-blue" />
                      What Eldo helps with
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        Organizing your documents and application materials
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        Auto-filling forms to save you time
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        Keeping track of deadlines and requirements
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-blue mt-1">•</span>
                        Providing a clear checklist for your application
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      What Eldo does NOT do
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        Improve your CRS score or eligibility
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        Guarantee approval of your application
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        Provide immigration legal advice
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>
                        Act as a replacement for an immigration consultant
                      </li>
                    </ul>
                  </div>
                </div>

                <label 
                  className={`block bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                    hasConfirmedUnderstanding 
                      ? 'border-primary-blue bg-primary-blue/5' 
                      : 'border-border hover:border-primary-blue/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={hasConfirmedUnderstanding}
                      onChange={(e) => setHasConfirmedUnderstanding(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-border text-primary-blue focus:ring-primary-blue"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        I understand
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        I acknowledge that Eldo is a tool to help organize and streamline my application, not a service that can improve my eligibility or guarantee results.
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {currentStep === steps.length - 1 ? 'Continue to Plans' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {['Peace of Mind', 'Secure & Private', 'Save Time'].map((benefit, i) => (
              <div key={i} className="flex items-center text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
