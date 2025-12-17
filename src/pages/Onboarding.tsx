
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, FolderOpen, FileEdit, ShieldCheck, Calculator, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: 'Welcome to Eldo',
    content: 'welcome',
  },
  {
    id: 2,
    title: 'Check your eligibility',
    content: 'crs',
  },
  {
    id: 3,
    title: 'Terms & Conditions',
    content: 'terms',
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasConfirmedCRS, setHasConfirmedCRS] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
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

  const handleTakeCRSAssessment = () => {
    navigate('/crs-assessment');
  };

  const canProceed = () => {
    if (currentStep === 1) return hasConfirmedCRS;
    if (currentStep === 2) return hasAcceptedTerms;
    return true;
  };

  return (
    <div className="min-h-screen bg-pale-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-center items-center mb-8">
          <span className="eldo-text text-3xl">Eldo</span>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-primary-blue text-white' 
                      : 'bg-white border-2 border-border text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all duration-300 ${
                    index < currentStep ? 'bg-primary-blue' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border">
            {/* Step 1: Welcome */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-foreground text-center">
                  Get Started with Eldo
                </h1>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-primary-blue/5 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <span className="text-sm text-foreground">Apply with peace of mind</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary-blue/5 rounded-lg">
                    <FolderOpen className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <span className="text-sm text-foreground">Keep everything in one place</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary-blue/5 rounded-lg">
                    <FileEdit className="w-5 h-5 text-primary-blue flex-shrink-0" />
                    <span className="text-sm text-foreground">Automate form filling</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: CRS Check */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-foreground text-center">
                  Check your eligibility
                </h1>
                
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">
                      Eldo helps with the application process, but does not help you improve your CRS score or qualify for Express Entry.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handleTakeCRSAssessment}
                    variant="outline"
                    className="w-full py-5 rounded-lg border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/5"
                  >
                    <Calculator className="w-5 h-5 mr-2 text-primary-blue" />
                    <span>Take the CRS Assessment</span>
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <label 
                    className={`block rounded-lg p-4 border-2 cursor-pointer transition-all ${
                      hasConfirmedCRS 
                        ? 'border-primary-blue bg-primary-blue/5' 
                        : 'border-border hover:border-primary-blue/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={hasConfirmedCRS}
                        onChange={(e) => setHasConfirmedCRS(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-border text-primary-blue focus:ring-primary-blue"
                      />
                      <div>
                        <span className="font-medium text-foreground text-sm">
                          I already know my CRS score
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          I confirm I have a competitive score and understand Eldo does not improve eligibility.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Terms & Conditions */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <h1 className="text-2xl font-bold text-foreground text-center">
                  Terms & Conditions
                </h1>
                
                <div className="bg-muted/50 rounded-lg p-4 max-h-64 overflow-y-auto text-sm text-muted-foreground">
                  <p className="mb-3">
                    By using Eldo, you agree to the following terms:
                  </p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Eldo is a tool to organize and streamline your Express Entry application.</li>
                    <li>Eldo does not improve your CRS score or eligibility for Express Entry.</li>
                    <li>Eldo does not guarantee approval of your immigration application.</li>
                    <li>Eldo does not provide immigration legal advice.</li>
                    <li>Eldo is not a replacement for an immigration consultant or lawyer.</li>
                    <li>You are responsible for the accuracy of all information submitted.</li>
                  </ul>
                  <p className="mt-3 text-xs">
                    {/* Placeholder for full legal document */}
                    Full terms and conditions document will be available here.
                  </p>
                </div>

                <label 
                  className={`block rounded-lg p-4 border-2 cursor-pointer transition-all ${
                    hasAcceptedTerms 
                      ? 'border-primary-blue bg-primary-blue/5' 
                      : 'border-border hover:border-primary-blue/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={hasAcceptedTerms}
                      onChange={(e) => setHasAcceptedTerms(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-border text-primary-blue focus:ring-primary-blue"
                    />
                    <span className="text-sm text-foreground">
                      I have read and accept the Terms & Conditions
                    </span>
                  </div>
                </label>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-4 mt-6">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-4"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 bg-primary-blue text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {currentStep === steps.length - 1 ? 'Continue' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
