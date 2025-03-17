
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { FileText, FileUp, Brain, FileCheck, Send, Mic, Activity, Timer } from 'lucide-react';

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const steps: Step[] = [
    {
      number: 1,
      title: "Answer a 5 min Form",
      description: "Assess your initial points and predict your chances and timeline. Don't like writing? You can also talk.",
      icon: <FileText size={28} />,
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

  useEffect(() => {
    if (!sectionRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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
                >
                  <div 
                    className={cn(
                      "flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-white mr-6 z-10 transition-all duration-500",
                      activeStep === step.number 
                        ? `${step.color} shadow-lg shadow-${step.color}/20 ${step.animation || ''}` 
                        : "bg-white text-eldo-dark/60 border border-eldo-light-purple/40"
                    )}
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
                        <Mic size={16} className="animate-pulse" />
                        <span className="text-sm font-medium">Voice input available</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Visual representation */}
          <div className="order-1 lg:order-2">
            <div className="relative bg-gradient-to-br from-eldo-soft-blue/50 to-eldo-light-purple/30 rounded-2xl p-6 md:p-10 aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 flex items-center justify-center">
                {activeStep === 1 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-32 bg-sky-400/20 rounded mb-4"></div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Activity className="text-sky-500" size={16} />
                        <div className="h-4 w-32 bg-sky-400/20 rounded"></div>
                        <div className="h-6 w-16 bg-green-500/20 rounded text-center text-xs text-green-600 flex items-center justify-center">High</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="text-sky-500" size={16} />
                        <div className="h-4 w-32 bg-sky-400/20 rounded"></div>
                        <div className="h-6 w-24 bg-amber-500/20 rounded text-center text-xs text-amber-600 flex items-center justify-center">3-6 months</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mic className="text-sky-500 animate-pulse" size={16} />
                        <div className="h-4 w-48 bg-sky-400/10 rounded"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs text-eldo-dark/60">5 min assessment</div>
                      <div className="h-8 w-20 bg-sky-400 rounded flex items-center justify-center text-white text-xs">Next</div>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-24 bg-eldo-blue/20 rounded mb-4"></div>
                    <div className="flex gap-4 mb-4">
                      <div className="h-20 w-1/3 bg-eldo-blue/10 rounded flex items-center justify-center">
                        <FileUp className="text-eldo-blue" />
                      </div>
                      <div className="h-20 w-2/3 bg-eldo-light-purple/10 rounded flex flex-col justify-center p-2">
                        <div className="h-3 w-full bg-gray-200 rounded-full mb-2">
                          <div className="h-3 w-2/5 bg-eldo-blue rounded-full"></div>
                        </div>
                        <div className="h-3 w-3/4 bg-gray-200 rounded-full">
                          <div className="h-3 w-1/2 bg-eldo-purple rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="h-8 w-20 bg-eldo-blue rounded flex items-center justify-center text-white text-xs">Upload</div>
                    </div>
                  </div>
                )}
                
                {activeStep === 3 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-32 bg-eldo-purple/20 rounded mb-4"></div>
                    <div className="h-4 w-full bg-gray-200 rounded-full mb-2">
                      <div className="h-4 w-3/4 bg-eldo-purple rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-xs text-right text-eldo-dark/60 mb-4">75% Analyzed</div>
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-eldo-blue/10 rounded"></div>
                      <div className="h-4 w-full bg-eldo-blue/10 rounded"></div>
                      <div className="h-4 w-2/3 bg-eldo-blue/10 rounded"></div>
                    </div>
                    <div className="mt-4 flex items-center justify-center">
                      <Brain className="text-eldo-purple animate-pulse" />
                    </div>
                  </div>
                )}
                
                {activeStep === 4 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-40 bg-green-500/20 rounded mb-4"></div>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center">
                        <div className="h-4 w-24 bg-eldo-dark/10 rounded mr-2"></div>
                        <div className="h-6 flex-1 bg-green-500/10 rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-24 bg-eldo-dark/10 rounded mr-2"></div>
                        <div className="h-6 flex-1 bg-green-500/10 rounded"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-4 w-24 bg-eldo-dark/10 rounded mr-2"></div>
                        <div className="h-6 flex-1 bg-green-500/10 rounded"></div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="text-xs text-eldo-dark/60">Auto-filling...</div>
                      <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                  </div>
                )}
                
                {activeStep === 5 && (
                  <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-xs">
                    <div className="h-6 w-36 bg-amber-500/20 rounded mb-4"></div>
                    <div className="flex justify-center items-center mb-4">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-center text-sm text-eldo-dark/80 mb-4">Ready for submission</div>
                    <div className="flex justify-center">
                      <div className="h-8 w-28 bg-amber-500 rounded flex items-center justify-center text-white text-xs">Submit</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
