
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight,
  Briefcase,
  GraduationCap,
  Globe,
  CheckCircle,
  AlertCircle,
  Scan,
  Upload,
  Eye,
  AlertTriangle,
  Zap,
  MousePointer,
  ArrowRight,
  TrendingUp
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
      }, 6000);
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
          }, 6000);
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
              {/* Step 1: Assess - CRS Score Calculator (closer to actual) */}
              {activeStep === 1 && (
                <div className="animate-fade-in glass-card rounded-xl p-6 w-full max-w-md shadow-xl">
                  {/* Running Score Header - like the actual sticky tracker */}
                  <div className="bg-gradient-to-br from-primary-blue/10 to-primary-blue/5 rounded-lg p-4 mb-5 border border-primary-blue/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary-blue" />
                        <span className="text-xs font-medium text-gray-600">Running Score</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-primary-blue">467</span>
                        <span className="text-xs text-gray-500"> / 1,200</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[39%] bg-primary-blue rounded-full transition-all duration-1000"></div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2 py-0.5 bg-primary-blue/10 rounded text-[10px] text-primary-blue font-medium">Age: 110</span>
                      <span className="px-2 py-0.5 bg-primary-blue/10 rounded text-[10px] text-primary-blue font-medium">Education: 120</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] text-gray-500">Experience: 0</span>
                    </div>
                  </div>
                  
                  {/* Question section */}
                  <div className="space-y-4">
                    <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Personal Information</div>
                      <div className="text-sm font-medium text-gray-800 mb-2">3) How old are you?</div>
                      <div className="relative">
                        <div className="h-10 w-full bg-white border border-gray-300 rounded-md px-3 flex items-center justify-between cursor-pointer hover:border-primary-blue transition-colors">
                          <span className="text-sm text-gray-800">20-29</span>
                          <ChevronRight size={16} className="text-gray-400 rotate-90" />
                        </div>
                      </div>
                      {/* Score Indicator like the actual */}
                      <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Zap size={14} className="text-primary-blue" />
                            <span className="text-[10px] text-gray-500">Point Contribution</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Excellent</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-full bg-green-500 rounded-full"></div>
                          </div>
                          <span className="text-sm font-bold text-gray-800">110<span className="text-gray-400 font-normal"> / 110</span></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                      <div className="text-sm font-medium text-gray-800 mb-2">4) What is your level of education?</div>
                      <div className="relative">
                        <div className="h-10 w-full bg-primary-blue/5 border-2 border-primary-blue rounded-md px-3 flex items-center justify-between">
                          <span className="text-sm text-primary-blue font-medium">Bachelor's degree</span>
                          <CheckCircle size={16} className="text-primary-blue" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                    <div className="h-9 px-5 bg-primary-blue rounded-lg flex items-center justify-center text-white text-sm font-medium hover:bg-primary-blue/90 transition-colors cursor-pointer shadow-md">
                      Continue
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
              
              {/* Step 5: Apply - Chrome Extension with IRCC-style form */}
              {activeStep === 5 && (
                <div className="animate-fade-in glass-card rounded-xl p-5 w-full max-w-md shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    {/* Chrome-colored badge */}
                    <div className="h-7 px-3 bg-gradient-to-r from-[#EA4335]/10 via-[#FBBC05]/10 to-[#34A853]/10 rounded-full flex items-center border border-[#4285F4]/30">
                      <div className="w-4 h-4 mr-2 rounded-full bg-gradient-to-br from-[#EA4335] via-[#FBBC05] to-[#34A853] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4285F4] ring-1 ring-white"></div>
                      </div>
                      <span className="text-xs font-medium bg-gradient-to-r from-[#EA4335] via-[#34A853] to-[#4285F4] bg-clip-text text-transparent">Chrome Extension</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-[#34A853]/10 rounded-full border border-[#34A853]/30">
                      <div className="h-2 w-2 rounded-full bg-[#34A853] animate-pulse"></div>
                      <span className="text-[10px] text-[#34A853] font-medium">Active</span>
                    </div>
                  </div>
                  
                  {/* IRCC-style Express Entry form */}
                  <div className="bg-white rounded-lg border border-gray-300 shadow-sm overflow-hidden mb-4">
                    {/* Browser chrome bar */}
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 border-b border-gray-200 flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#EA4335]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#FBBC05]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#34A853]"></div>
                      </div>
                      <div className="flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-gray-500 truncate border border-gray-200">
                        ircc.canada.ca/english/immigrate/skilled/profile
                      </div>
                    </div>
                    
                    {/* IRCC Form content */}
                    <div className="p-3">
                      {/* Blue header bar like IRCC */}
                      <div className="bg-[#26374a] text-white px-3 py-2 rounded-t text-[11px] font-medium">
                        John Smith: Candidate Express Entry
                      </div>
                      
                      {/* Form table header */}
                      <div className="grid grid-cols-[1fr,auto,auto] bg-[#f8f8f8] border-x border-b border-gray-300 text-[9px] font-medium text-gray-700">
                        <div className="px-2 py-1.5 border-r border-gray-300">Form name</div>
                        <div className="px-2 py-1.5 border-r border-gray-300 w-20 text-center">Status</div>
                        <div className="px-2 py-1.5 w-16 text-center">Options</div>
                      </div>
                      
                      {/* Form rows with auto-fill animation */}
                      <div className="animate-fade-in grid grid-cols-[1fr,auto,auto] border-x border-b border-gray-300 text-[10px]" style={{ animationDelay: "0.1s" }}>
                        <div className="px-2 py-1.5 border-r border-gray-300 text-gray-800">Personal details</div>
                        <div className="px-2 py-1.5 border-r border-gray-300 w-20 flex items-center justify-center gap-1">
                          <CheckCircle size={10} className="text-[#34A853]" />
                          <span className="text-[#34A853] text-[9px]">Complete</span>
                        </div>
                        <div className="px-2 py-1.5 w-16 flex justify-center">
                          <Zap size={10} className="text-[#34A853]" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in grid grid-cols-[1fr,auto,auto] border-x border-b border-gray-300 text-[10px]" style={{ animationDelay: "0.2s" }}>
                        <div className="px-2 py-1.5 border-r border-gray-300 text-gray-800">Contact details</div>
                        <div className="px-2 py-1.5 border-r border-gray-300 w-20 flex items-center justify-center gap-1">
                          <CheckCircle size={10} className="text-[#34A853]" />
                          <span className="text-[#34A853] text-[9px]">Complete</span>
                        </div>
                        <div className="px-2 py-1.5 w-16 flex justify-center">
                          <Zap size={10} className="text-[#34A853]" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in grid grid-cols-[1fr,auto,auto] border-x border-b border-gray-300 text-[10px] bg-[#4285F4]/5" style={{ animationDelay: "0.3s" }}>
                        <div className="px-2 py-1.5 border-r border-gray-300 text-gray-800">Study and languages</div>
                        <div className="px-2 py-1.5 border-r border-gray-300 w-20 flex items-center justify-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse"></div>
                          <span className="text-[#4285F4] text-[9px] typewriter-text">Filling...</span>
                        </div>
                        <div className="px-2 py-1.5 w-16 flex justify-center">
                          <MousePointer size={10} className="text-[#4285F4] animate-bounce" />
                        </div>
                      </div>
                      
                      <div className="animate-fade-in grid grid-cols-[1fr,auto,auto] border-x border-b border-gray-300 text-[10px]" style={{ animationDelay: "0.4s" }}>
                        <div className="px-2 py-1.5 border-r border-gray-300 text-gray-800">Work history</div>
                        <div className="px-2 py-1.5 border-r border-gray-300 w-20 flex items-center justify-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#9f1d21]"></div>
                          <span className="text-[#9f1d21] text-[9px]">Not started</span>
                        </div>
                        <div className="px-2 py-1.5 w-16 flex justify-center">
                          <span className="text-[8px] bg-[#26374a] text-white px-1.5 py-0.5 rounded">Start</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="animate-fade-in space-y-2" style={{ animationDelay: "0.5s" }}>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={14} className="text-[#34A853]" />
                      <span>Auto-fills all 6 IRCC sections</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle size={14} className="text-[#34A853]" />
                      <span>You review before submitting</span>
                    </div>
                  </div>
                  
                  {/* Chrome-colored CTA button */}
                  <div className="animate-fade-in mt-4 flex items-center justify-center" style={{ animationDelay: "0.6s" }}>
                    <div className="px-4 py-2.5 bg-gradient-to-r from-[#EA4335] via-[#FBBC05] via-[#34A853] to-[#4285F4] rounded-lg flex items-center gap-2 text-white text-sm font-medium shadow-lg cursor-pointer hover:shadow-xl transition-all hover:scale-105">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
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
