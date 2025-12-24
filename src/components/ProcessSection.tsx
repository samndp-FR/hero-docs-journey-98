
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Activity, 
  Timer, 
  Mic, 
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Globe,
  FileText,
  CheckCircle,
  AlertCircle,
  Scan,
  Upload,
  Eye,
  AlertTriangle,
  Chrome,
  Zap,
  MousePointer,
  ArrowRight
} from 'lucide-react';

interface Step {
  number: number;
  action: string;
  subject: string;
}

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps: Step[] = [
    { number: 1, action: "Assess", subject: "Your CRS score" },
    { number: 2, action: "Build", subject: "Your profile" },
    { number: 3, action: "Organize", subject: "Your documents" },
    { number: 4, action: "Verify", subject: "Every detail" },
    { number: 5, action: "Apply", subject: "With the Chrome extension" }
  ];

  const goToStep = (stepNumber: number) => {
    setActiveStep(stepNumber);
    // Reset auto-rotation when user manually clicks
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length ? prev + 1 : 1));
      }, 4000);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          intervalRef.current = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length ? prev + 1 : 1));
          }, 4000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [steps.length]);

  return (
    <section id="process" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-eldo-dark">See how Eldo works</h2>
          <p className="text-eldo-dark/70 max-w-2xl mx-auto">
            Eldo doesn't submit anything for you. It helps you prepare everything carefully — and you review every detail.
          </p>
        </div>

        {/* Animation Container */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-eldo-soft-blue/60 to-eldo-light-purple/30 rounded-3xl p-8 md:p-12 min-h-[420px] overflow-hidden">
            <div 
              className={cn(
                "flex items-center justify-center transition-opacity duration-500 h-full",
                isVisible ? "opacity-100" : "opacity-0"
              )}
            >
              {/* Step 1: Assess - CRS Score Questionnaire */}
              {activeStep === 1 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-sm shadow-xl">
                  <div className="h-7 w-44 bg-primary-blue/10 rounded-full mb-5 flex items-center px-3 border border-primary-blue/20">
                    <span className="text-xs text-primary-blue font-medium">Questionnaire Progress</span>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                      <div className="h-6 w-full bg-gray-100 rounded-md mb-2 flex items-center px-3">
                        <span className="text-xs text-gray-600">Are you currently in Canada?</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="h-8 w-16 bg-gray-100 border border-gray-200 rounded flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                          <span className="text-xs text-gray-700">Yes</span>
                        </div>
                        <div className="h-8 w-16 bg-primary-blue/10 border border-primary-blue/30 rounded flex items-center justify-center">
                          <span className="text-xs text-primary-blue font-medium">No</span>
                        </div>
                        <Mic size={18} className="text-primary-blue animate-pulse ml-2" />
                      </div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart className="text-gray-500" size={14} />
                        <div className="text-xs text-gray-600">Your points: 490</div>
                      </div>
                      <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[82%] bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"></div>
                      </div>
                      <div className="text-right text-xs text-green-600 font-medium mt-1">Top 3% of applicants</div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="text-gray-500" size={14} />
                        <div className="text-xs text-gray-600">Your chances</div>
                      </div>
                      <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-1000"></div>
                      </div>
                      <div className="text-right text-xs text-green-600 font-medium mt-1">High</div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Timer className="text-gray-500" size={14} />
                        <div className="text-xs text-gray-600">Timeline</div>
                      </div>
                      <div className="h-5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"></div>
                      </div>
                      <div className="text-right text-xs text-amber-600 font-medium mt-1">3-6 months</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center gap-2">
                      <Mic size={16} className="text-primary-blue" />
                      <span className="text-xs text-gray-600">Voice enabled</span>
                    </div>
                    <div className="h-9 px-5 bg-primary-blue rounded-lg flex items-center justify-center text-white text-sm font-medium hover:bg-primary-blue/90 transition-colors cursor-pointer shadow-md">
                      Next
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 2: Build - Profile Building */}
              {activeStep === 2 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-sm shadow-xl">
                  <div className="h-7 w-36 bg-eldo-blue/10 rounded-full mb-5 flex items-center px-3 border border-eldo-blue/20">
                    <span className="text-xs text-eldo-blue font-medium">Build Your Profile</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-500">Step 3 of 7</span>
                      <span className="text-xs text-eldo-blue font-medium">43% Complete</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-4">
                      <div className="h-full w-[43%] bg-eldo-blue rounded-full transition-all duration-1000"></div>
                    </div>
                    
                    {/* Form sections */}
                    <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200" style={{ animationDelay: "0.1s" }}>
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-green-800">Personal Details</span>
                      </div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    
                    <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200" style={{ animationDelay: "0.2s" }}>
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle size={16} className="text-green-600" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-green-800">Contact Information</span>
                      </div>
                      <CheckCircle size={16} className="text-green-500" />
                    </div>
                    
                    <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-eldo-blue/5 border-2 border-eldo-blue" style={{ animationDelay: "0.3s" }}>
                      <div className="h-8 w-8 rounded-full bg-eldo-blue/20 flex items-center justify-center">
                        <Briefcase size={16} className="text-eldo-blue" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-eldo-blue">Work Experience</span>
                        <div className="text-[10px] text-eldo-blue/70">Currently editing</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-eldo-blue animate-pulse"></div>
                    </div>
                    
                    <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200" style={{ animationDelay: "0.4s" }}>
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <GraduationCap size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Education History</span>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200" style={{ animationDelay: "0.5s" }}>
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Globe size={16} className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm text-gray-500">Language Skills</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 3: Organize - Document Center */}
              {activeStep === 3 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-sm shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-7 px-3 bg-green-500/10 rounded-full flex items-center border border-green-500/20">
                      <Scan size={14} className="text-green-600 mr-2" />
                      <span className="text-xs text-green-700 font-medium">Auto-scanned</span>
                    </div>
                    <span className="text-xs text-gray-500">3 of 5 ready</span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="animate-fade-in flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200" style={{ animationDelay: "0.1s" }}>
                      <div className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="text-sm text-green-800">Passport</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                    
                    <div className="animate-fade-in flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200" style={{ animationDelay: "0.2s" }}>
                      <div className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="text-sm text-green-800">Language Test</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                    
                    <div className="animate-fade-in flex items-center justify-between p-3 rounded-lg bg-red-50 border border-red-200" style={{ animationDelay: "0.3s" }}>
                      <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-red-500" />
                        <span className="text-sm text-red-800">Educational Credentials</span>
                      </div>
                      <span className="text-xs text-red-600 font-medium">Issues detected</span>
                    </div>
                    
                    <div className="animate-fade-in flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200" style={{ animationDelay: "0.4s" }}>
                      <div className="flex items-center gap-3">
                        <AlertCircle size={18} className="text-amber-500" />
                        <span className="text-sm text-amber-800">Work Experience Letters</span>
                      </div>
                      <span className="text-xs text-amber-600 font-medium">Needed</span>
                    </div>
                    
                    <div className="animate-fade-in flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200" style={{ animationDelay: "0.5s" }}>
                      <div className="flex items-center gap-3">
                        <CheckCircle size={18} className="text-green-500" />
                        <span className="text-sm text-green-800">Police Certificate</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Ready</span>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-blue transition-colors cursor-pointer" style={{ animationDelay: "0.6s" }}>
                    <Upload size={20} className="text-gray-400 mx-auto mb-2" />
                    <span className="text-xs text-gray-500">Drop files to scan automatically</span>
                  </div>
                </div>
              )}
              
              {/* Step 4: Verify - Form Verification */}
              {activeStep === 4 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-sm shadow-xl">
                  <div className="h-7 w-40 bg-purple-500/10 rounded-full mb-5 flex items-center px-3 border border-purple-500/20">
                    <Eye size={14} className="text-purple-600 mr-2" />
                    <span className="text-xs text-purple-700 font-medium">Final Verification</span>
                  </div>
                  
                  <div className="text-center mb-4">
                    <p className="text-xs text-gray-600">Review every field before submission</p>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {/* Simulated IRCC-style form fields */}
                    <div className="animate-fade-in bg-gray-50 rounded-lg p-3 border border-gray-200" style={{ animationDelay: "0.1s" }}>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Family Name</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">SMITH</span>
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                    </div>
                    
                    <div className="animate-fade-in bg-gray-50 rounded-lg p-3 border border-gray-200" style={{ animationDelay: "0.2s" }}>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Given Name(s)</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">JOHN WILLIAM</span>
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                    </div>
                    
                    <div className="animate-fade-in bg-amber-50 rounded-lg p-3 border border-amber-300" style={{ animationDelay: "0.3s" }}>
                      <div className="text-[10px] text-amber-600 uppercase tracking-wider mb-1">Date of Birth</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-amber-800">1990-05-15</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-amber-600">Confirm match</span>
                          <AlertTriangle size={14} className="text-amber-500 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in bg-gray-50 rounded-lg p-3 border border-gray-200" style={{ animationDelay: "0.4s" }}>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Country of Birth</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">INDIA</span>
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                    </div>
                    
                    <div className="animate-fade-in bg-gray-50 rounded-lg p-3 border border-gray-200" style={{ animationDelay: "0.5s" }}>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Passport Number</div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800">M1234567</span>
                        <CheckCircle size={14} className="text-green-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in flex items-center justify-center gap-2 text-xs text-purple-600" style={{ animationDelay: "0.6s" }}>
                    <Eye size={14} />
                    <span>27 fields verified • 1 needs attention</span>
                  </div>
                </div>
              )}
              
              {/* Step 5: Apply - Chrome Extension */}
              {activeStep === 5 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-sm shadow-xl">
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-7 px-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-full flex items-center border border-blue-500/20">
                      <Chrome size={14} className="text-blue-600 mr-2" />
                      <span className="text-xs text-blue-700 font-medium">Chrome Extension</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] text-green-700 font-medium">Active</span>
                    </div>
                  </div>
                  
                  {/* Simulated IRCC website with auto-fill */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-4">
                    {/* Browser chrome */}
                    <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-2 py-1 text-[10px] text-gray-500 truncate">
                        ircc.canada.ca/english/immigrate/skilled/profile...
                      </div>
                    </div>
                    
                    {/* Form being auto-filled */}
                    <div className="p-3 space-y-2">
                      <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        <div className="text-[10px] text-gray-500 mb-1">Full Name</div>
                        <div className="h-7 bg-green-50 border border-green-300 rounded px-2 flex items-center relative overflow-hidden">
                          <span className="text-xs text-gray-800 typewriter-text">John William Smith</span>
                          <Zap size={12} className="absolute right-2 text-green-500" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <div className="text-[10px] text-gray-500 mb-1">Email Address</div>
                        <div className="h-7 bg-green-50 border border-green-300 rounded px-2 flex items-center relative overflow-hidden">
                          <span className="text-xs text-gray-800 typewriter-text-2">john.smith@email.com</span>
                          <Zap size={12} className="absolute right-2 text-green-500" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                        <div className="text-[10px] text-gray-500 mb-1">Passport Number</div>
                        <div className="h-7 bg-blue-50 border border-blue-300 rounded px-2 flex items-center animate-pulse">
                          <span className="text-xs text-blue-600">Auto-filling...</span>
                          <MousePointer size={12} className="absolute right-2 text-blue-500 animate-bounce" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in space-y-3" style={{ animationDelay: "0.6s" }}>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>24 fields auto-filled</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={14} className="text-green-500" />
                      <span>You review before submitting</span>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in mt-4 flex items-center justify-center" style={{ animationDelay: "0.7s" }}>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center gap-2 text-white text-sm font-medium shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
                      <Chrome size={16} />
                      <span>Get the Extension</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step Pills at Bottom */}
        <div className="flex flex-wrap justify-center gap-3">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => goToStep(step.number)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full border-2 transition-all duration-300 cursor-pointer",
                activeStep === step.number
                  ? "bg-primary-blue/10 border-primary-blue text-primary-blue shadow-md"
                  : "bg-sky-50 border-sky-200 text-sky-700 hover:border-sky-300 hover:bg-sky-100"
              )}
            >
              <span className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold",
                activeStep === step.number
                  ? "bg-primary-blue text-white"
                  : "bg-sky-200 text-sky-700"
              )}>
                {step.number}
              </span>
              <span className="text-sm font-medium">
                {step.action} <span className="hidden sm:inline">— {step.subject}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      
      <style>
        {`
          .typewriter-text {
            overflow: hidden;
            white-space: nowrap;
            animation: typewriter 1.5s steps(20, end) forwards;
          }
          .typewriter-text-2 {
            overflow: hidden;
            white-space: nowrap;
            animation: typewriter 1.5s steps(20, end) 0.3s forwards;
            opacity: 0;
            animation-fill-mode: forwards;
          }
          @keyframes typewriter {
            0% { width: 0; opacity: 1; }
            100% { width: 100%; opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default ProcessSection;
