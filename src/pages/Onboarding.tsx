
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, User, FileText, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const steps = [
  {
    id: 1,
    title: 'Welcome to Eldo',
    subtitle: 'Your Express Entry journey starts here',
    description: 'We\'ll guide you through the Canadian immigration process with AI-powered assistance.',
    icon: Sparkles,
  },
  {
    id: 2,
    title: 'Tell us about yourself',
    subtitle: 'Basic information to get started',
    description: 'Your profile helps us personalize your immigration pathway.',
    icon: User,
  },
  {
    id: 3,
    title: 'Document preparation',
    subtitle: 'What you\'ll need ready',
    description: 'Passport, education credentials, language test results, and work experience letters.',
    icon: FileText,
  },
  {
    id: 4,
    title: 'Choose your pathway',
    subtitle: 'Federal Skilled Worker, CEC, or PNP',
    description: 'Based on your profile, we\'ll recommend the best immigration program for you.',
    icon: Globe,
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
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

  const CurrentIcon = steps[currentStep].icon;

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
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8 bg-primary-blue/10 rounded-2xl flex items-center justify-center">
              <CurrentIcon className="w-10 h-10 text-primary-blue" />
            </div>

            {/* Step content */}
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full bg-primary-blue/20 text-primary-blue font-medium text-sm inline-block mb-4">
                Step {currentStep + 1} of {steps.length}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
                {steps[currentStep].title}
              </h1>
              <p className="text-lg text-primary-blue font-medium mb-4">
                {steps[currentStep].subtitle}
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                {steps[currentStep].description}
              </p>
            </div>

            {/* Step-specific content placeholder */}
            {currentStep === 1 && (
              <div className="bg-secondary/50 rounded-xl p-6 mb-8 text-left">
                <div className="space-y-4">
                  <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                    Enter your full name...
                  </div>
                  <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                    Enter your email...
                  </div>
                  <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                    Select your country...
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-2 gap-4">
                  {['Passport', 'Education', 'Language Test', 'Work Letters'].map((doc, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border border-border flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary-blue" />
                      </div>
                      <span className="font-medium text-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-secondary/50 rounded-xl p-6 mb-8">
                <div className="space-y-3">
                  {[
                    { name: 'Federal Skilled Worker', desc: 'For skilled professionals' },
                    { name: 'Canadian Experience Class', desc: 'For those with Canadian work experience' },
                    { name: 'Provincial Nominee Program', desc: 'Province-specific immigration' },
                  ].map((program, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 border border-border hover:border-primary-blue/50 cursor-pointer transition-all text-left">
                      <div className="font-semibold text-foreground">{program.name}</div>
                      <div className="text-sm text-muted-foreground">{program.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-4">
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
                className="px-8 py-3 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {['AI-Powered Assistance', 'Secure & Private', '90% Less Paperwork'].map((benefit, i) => (
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
