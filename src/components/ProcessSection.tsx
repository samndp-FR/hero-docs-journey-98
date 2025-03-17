
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FileText, FileUp, Brain, FileCheck, Send, Mic, Activity, Timer, ClipboardCheck, MessageCircle, AlertTriangle, Loader, ChevronRight, ChevronLeft, BarChart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  animation?: string;
}

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const steps: Step[] = [
    {
      number: 1,
      title: "Answer a 5 min questionnaire",
      description: "Assess your initial points and predict your chances and timeline. Don't like writing? You can also talk.",
      icon: <ClipboardCheck size={28} />,
      color: "bg-sky-400",
      animation: "animate-pulse"
    },
    {
      number: 2,
      title: "Upload Your Documents",
      description: "Simply scan or upload your passport, education credentials, work experience proof, and language test results.",
      icon: <FileUp size={28} />,
      color: "bg-eldo-blue"
    },
    {
      number: 3,
      title: "AI Document Analysis",
      description: "Our system automatically analyzes your documents for compliance with IRCC requirements and extracts key information.",
      icon: <Brain size={28} />,
      color: "bg-eldo-purple"
    },
    {
      number: 4,
      title: "Form Auto-Completion",
      description: "Watch as your Express Entry profile and application forms get filled automatically with your information.",
      icon: <FileCheck size={28} />,
      color: "bg-green-500"
    },
    {
      number: 5,
      title: "Review & Submit",
      description: "Review the completed application, make any final adjustments, and submit with confidence.",
      icon: <Send size={28} />,
      color: "bg-amber-500"
    }
  ];

  const goToNextStep = () => {
    setActiveStep((prev) => (prev < steps.length ? prev + 1 : prev));
  };

  const goToPreviousStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          const interval = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length ? prev + 1 : 1));
          }, 3000);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    observerRef.current.observe(sectionRef.current);

    return () => {
      if (sectionRef.current && observerRef.current) {
        observerRef.current.unobserve(sectionRef.current);
      }
    };
  }, [steps.length]);

  return (
    <section id="process" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-eldo-soft-blue text-eldo-blue font-medium text-sm inline-block mb-4">
            PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple 5-Step Journey</h2>
          <p className="text-eldo-dark/80 max-w-2xl mx-auto">
            From assessment to final submission, Eldo guides you through a seamless Express Entry application process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps visualization */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Progress bar */}
              <div className="absolute left-[26px] top-0 bottom-0 w-[2px] bg-eldo-light-purple/40"></div>
              
              {/* Steps */}
              {steps.map((step) => (
                <div 
                  key={step.number} 
                  className={cn(
                    "flex mb-12 last:mb-0 relative transition-all duration-500",
                    activeStep === step.number ? "opacity-100" : "opacity-50"
                  )}
                  onClick={() => goToStep(step.number)}
                  style={{ cursor: 'pointer' }}
                >
                  <div 
                    className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white mr-6 z-10 transition-all duration-500",
                      activeStep === step.number 
                        ? `${step.color} shadow-lg shadow-${step.color}/20 ${step.animation || ''}` 
                        : "bg-white text-eldo-dark/60 border border-eldo-light-purple/40"
                    )}
                    style={{ background: activeStep !== step.number ? 'white' : undefined }}
                  >
                    {activeStep === step.number ? step.icon : <span className="font-bold text-xl">{step.number}</span>}
                  </div>
                  <div className={cn(
                    "pt-2 transition-all duration-500",
                    activeStep === step.number ? "transform-none" : "translate-y-2"
                  )}>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-eldo-dark/80">{step.description}</p>
                    {step.number === 1 && activeStep === 1 && (
                      <div className="flex items-center gap-2 mt-2 text-sky-500">
                        <MessageCircle size={16} className="animate-pulse" />
                        <span className="text-sm font-medium">Voice input available</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual representation with animations */}
          <div className="order-1 lg:order-2">
            <div className="relative bg-gradient-to-br from-eldo-soft-blue/50 to-eldo-light-purple/30 rounded-2xl p-6 md:p-10 aspect-square max-w-md mx-auto overflow-hidden">
              <div 
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-500",
                  isVisible ? "opacity-100" : "opacity-0"
                )}
              >
                {activeStep === 1 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-44 bg-sky-400/20 rounded mb-4 flex items-center px-2">
                      <span className="text-xs text-sky-700">Questionnaire Progress</span>
                    </div>
                    <div className="space-y-4 mb-6">
                      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <div className="h-5 w-full bg-sky-400/10 rounded-md mb-2 flex items-center px-2">
                          <span className="text-xs text-sky-700">Are you currently in Canada?</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <div className="h-8 w-16 bg-sky-400/20 rounded flex items-center justify-center">
                            <span className="text-xs text-sky-700">Yes</span>
                          </div>
                          <div className="h-8 w-16 bg-sky-400/20 rounded flex items-center justify-center">
                            <span className="text-xs text-sky-700">No</span>
                          </div>
                          <Mic size={16} className="text-sky-500 animate-pulse ml-2" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart className="text-sky-500" size={16} />
                          <div className="text-xs text-sky-700">Your points: 490</div>
                        </div>
                        <div className="h-6 w-full bg-sky-400/10 rounded-full overflow-hidden">
                          <div className="h-full w-[97%] bg-green-500 animate-pulse rounded-full"></div>
                        </div>
                        <div className="text-right text-xs text-green-600 font-medium mt-1">Top 3% of applicants</div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="text-sky-500" size={16} />
                          <div className="text-xs text-sky-700">Your chances</div>
                        </div>
                        <div className="h-6 w-full bg-sky-400/10 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-green-500 animate-pulse rounded-full"></div>
                        </div>
                        <div className="text-right text-xs text-green-600 font-medium mt-1">High</div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <div className="flex items-center gap-2 mb-2">
                          <Timer className="text-sky-500" size={16} />
                          <div className="text-xs text-sky-700">Timeline</div>
                        </div>
                        <div className="h-6 w-full bg-sky-400/10 rounded-full overflow-hidden">
                          <div className="h-full w-1/2 bg-amber-500 animate-pulse rounded-full"></div>
                        </div>
                        <div className="text-right text-xs text-amber-600 font-medium mt-1">3-6 months</div>
                      </div>
                    </div>
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="flex items-center gap-2">
                        <Mic size={16} className="text-sky-500" />
                        <span className="text-xs text-sky-700">Voice enabled</span>
                      </div>
                      <div className="h-8 w-20 bg-sky-400 rounded flex items-center justify-center text-white text-xs hover:bg-sky-500 transition-colors cursor-pointer" onClick={goToNextStep}>
                        Next
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-36 bg-eldo-blue/20 rounded mb-6 flex items-center px-2">
                      <span className="text-xs text-eldo-blue">Upload Documents</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <div className="h-24 bg-eldo-blue/10 rounded-lg border-2 border-dashed border-eldo-blue/30 flex flex-col items-center justify-center cursor-pointer hover:bg-eldo-blue/20 transition-colors">
                          <FileText className="text-eldo-blue mb-2" size={20} />
                          <span className="text-xs text-eldo-blue">Passport</span>
                          <span className="text-[10px] text-eldo-blue/70 mt-1">Completed</span>
                        </div>
                      </div>
                      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="h-24 bg-eldo-blue/10 rounded-lg border-2 border-dashed border-eldo-blue/30 flex flex-col items-center justify-center cursor-pointer hover:bg-eldo-blue/20 transition-colors">
                          <FileUp className="text-eldo-blue mb-2" size={20} />
                          <span className="text-xs text-eldo-blue">Education</span>
                          <span className="text-[10px] text-eldo-blue/70 mt-1">Click to upload</span>
                        </div>
                      </div>
                      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <div className="h-24 bg-eldo-blue/10 rounded-lg border-2 border-dashed border-eldo-blue/30 flex flex-col items-center justify-center cursor-pointer hover:bg-eldo-blue/20 transition-colors">
                          <FileUp className="text-eldo-blue mb-2" size={20} />
                          <span className="text-xs text-eldo-blue">Work Experience</span>
                          <span className="text-[10px] text-eldo-blue/70 mt-1">Click to upload</span>
                        </div>
                      </div>
                      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <div className="h-24 bg-eldo-blue/10 rounded-lg border-2 border-dashed border-eldo-blue/30 flex flex-col items-center justify-center cursor-pointer hover:bg-eldo-blue/20 transition-colors">
                          <FileUp className="text-eldo-blue mb-2" size={20} />
                          <span className="text-xs text-eldo-blue">Language Test</span>
                          <span className="text-[10px] text-eldo-blue/70 mt-1">Click to upload</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="h-8 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-700 text-xs hover:bg-gray-300 transition-colors cursor-pointer" onClick={goToPreviousStep}>
                        <ChevronLeft size={14} className="mr-1" />
                        Back
                      </div>
                      <div className="h-8 w-20 bg-eldo-blue rounded flex items-center justify-center text-white text-xs hover:bg-eldo-blue/80 transition-colors cursor-pointer" onClick={goToNextStep}>
                        Next
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 3 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-40 bg-eldo-purple/20 rounded mb-4 flex items-center px-2">
                      <span className="text-xs text-eldo-purple">AI Document Analysis</span>
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                      <div className="h-4 w-full bg-gray-200 rounded-full mb-1">
                        <div className="h-4 w-3/4 bg-eldo-purple rounded-full relative">
                          <div className="absolute top-0 right-0 h-4 w-10 bg-eldo-purple animate-pulse rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-xs text-right text-eldo-dark/60 mb-6">75% Analyzed</div>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="h-10 w-10 rounded-full bg-eldo-purple/20 flex items-center justify-center">
                          <FileText size={16} className="text-eldo-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-eldo-dark">Letter of Employment</div>
                          <div className="text-[10px] text-eldo-dark/60">Processing document data</div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <div className="h-10 w-10 rounded-full bg-eldo-purple/20 flex items-center justify-center">
                          <FileText size={16} className="text-eldo-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-eldo-dark">Common-Law Certificate</div>
                          <div className="text-[10px] text-eldo-dark/60">Validating information</div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <div className="h-10 w-10 rounded-full bg-eldo-purple/20 flex items-center justify-center">
                          <FileText size={16} className="text-eldo-purple" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-eldo-dark">Police Checker</div>
                          <div className="text-[10px] text-red-600 flex items-center">
                            <AlertTriangle size={10} className="mr-1 text-red-600 animate-pulse" />
                            Dates aren't compliant
                          </div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                          <AlertTriangle size={14} className="text-red-600" />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                        <div className="h-10 w-10 rounded-full bg-eldo-purple/20 flex items-center justify-center">
                          <FileText size={16} className="text-eldo-purple" />
                        </div>
                        <div className="flex-1">
                          <Skeleton className="h-3 w-full" />
                          <Skeleton className="h-2 w-3/5 mt-1" />
                        </div>
                        <div className="h-6 w-6 rounded-full flex items-center justify-center">
                          <Loader size={14} className="text-eldo-purple animate-spin" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: "0.6s" }}>
                      <div className="h-8 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-700 text-xs hover:bg-gray-300 transition-colors cursor-pointer" onClick={goToPreviousStep}>
                        <ChevronLeft size={14} className="mr-1" />
                        Back
                      </div>
                      <div className="h-8 w-20 bg-eldo-purple rounded flex items-center justify-center text-white text-xs hover:bg-eldo-purple/80 transition-colors cursor-pointer" onClick={goToNextStep}>
                        Next
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 4 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-44 bg-green-500/20 rounded mb-6 flex items-center px-2">
                      <span className="text-xs text-green-700">Form Auto-Completion</span>
                    </div>
                    <div className="space-y-3 mb-6">
                      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center">
                          <div className="h-4 w-28 bg-eldo-dark/10 rounded mr-2"></div>
                          <div className="h-8 flex-1 bg-green-500/10 rounded border border-green-500/30 px-2 flex items-center">
                            <span className="text-xs text-green-700 animate-pulse">Auto-filling...</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center">
                          <div className="h-4 w-28 bg-eldo-dark/10 rounded mr-2"></div>
                          <div className="h-8 flex-1 bg-green-500/10 rounded border border-green-500/30 px-2 flex items-center">
                            <span className="text-xs text-green-700 overflow-hidden whitespace-nowrap" style={{ 
                              animation: 'typing 2s steps(20, end) infinite',
                              width: '100%'
                            }}>John Smith</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <div className="flex items-center">
                          <div className="h-4 w-28 bg-eldo-dark/10 rounded mr-2"></div>
                          <div className="h-8 flex-1 bg-green-500/10 rounded border border-green-500/30 px-2 flex items-center">
                            <span className="text-xs text-green-700 overflow-hidden whitespace-nowrap" style={{ 
                              animation: 'typing 2s steps(20, end) infinite',
                              animationDelay: '0.5s',
                              width: '100%'
                            }}>123 Main St, Vancouver</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                        <div className="flex items-center">
                          <div className="h-4 w-28 bg-eldo-dark/10 rounded mr-2"></div>
                          <div className="h-8 flex-1 bg-green-500/10 rounded border border-green-500/30 px-2 flex items-center">
                            <span className="text-xs text-green-700 overflow-hidden whitespace-nowrap" style={{ 
                              animation: 'typing 2s steps(20, end) infinite',
                              animationDelay: '1s',
                              width: '100%'
                            }}>john.smith@example.com</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: "0.5s" }}>
                      <div className="h-8 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-700 text-xs hover:bg-gray-300 transition-colors cursor-pointer" onClick={goToPreviousStep}>
                        <ChevronLeft size={14} className="mr-1" />
                        Back
                      </div>
                      <div className="h-8 w-20 bg-green-500 rounded flex items-center justify-center text-white text-xs hover:bg-green-600 transition-colors cursor-pointer" onClick={goToNextStep}>
                        Next
                        <ChevronRight size={14} className="ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 5 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-36 bg-amber-500/20 rounded mb-4 flex items-center px-2">
                      <span className="text-xs text-amber-700">Ready to Submit</span>
                    </div>
                    
                    <div className="flex justify-center items-center mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                      <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center text-sm text-eldo-dark/80 mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <p className="font-medium">Application Complete!</p>
                      <p className="text-xs mt-2">All required forms have been filled and are ready for your review before submission.</p>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <div className="flex items-center gap-2 mb-4">
                        <FileCheck className="text-green-600" size={16} />
                        <div className="text-xs text-eldo-dark">Express Entry Profile</div>
                        <div className="ml-auto">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <FileCheck className="text-green-600" size={16} />
                        <div className="text-xs text-eldo-dark">Personal Information</div>
                        <div className="ml-auto">
                          <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <div className="h-8 w-20 bg-gray-200 rounded flex items-center justify-center text-gray-700 text-xs hover:bg-gray-300 transition-colors cursor-pointer" onClick={goToPreviousStep}>
                        <ChevronLeft size={14} className="mr-1" />
                        Back
                      </div>
                      <div className="h-10 w-28 bg-amber-500 rounded-lg flex items-center justify-center text-white text-sm font-medium hover:bg-amber-600 transition-colors cursor-pointer shadow-lg shadow-amber-500/30">
                        <Send className="mr-2" size={16} />
                        Submit
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
        `}
      </style>
    </section>
  );
};

export default ProcessSection;
