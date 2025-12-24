
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { LayoutDashboard, CheckCircle, Bell, FileText, TrendingUp } from 'lucide-react';

const DashboardFramingSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-eldo-soft-blue/30" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className={cn(
            "transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          )}>
            <span className="px-4 py-1.5 rounded-full bg-eldo-soft-blue text-eldo-blue font-medium text-sm inline-block mb-4">
              YOUR COMMAND CENTER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-eldo-dark">
              Your application, in one place
            </h2>
            <p className="text-lg text-eldo-dark/80 mb-4 leading-relaxed">
              Eldo gives you a clear overview of your status, next steps, and what needs attention — at all times.
            </p>
            <p className="text-sm text-eldo-dark/60 italic">
              Your dashboard stays with you throughout the entire process.
            </p>
          </div>

          {/* Dashboard Preview Animation */}
          <div className={cn(
            "transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          )}>
            <div className="relative bg-gradient-to-br from-eldo-soft-blue/50 to-eldo-light-purple/30 rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Dashboard mockup */}
              <div className="glass-card rounded-xl p-5 animate-fade-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-eldo-blue/20 flex items-center justify-center">
                      <LayoutDashboard size={20} className="text-eldo-blue" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-eldo-dark">Application Overview</div>
                      <div className="text-xs text-eldo-dark/60">Express Entry</div>
                    </div>
                  </div>
                  <div className="relative">
                    <Bell size={18} className="text-eldo-dark/60" />
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Status cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className={cn(
                    "bg-green-50 rounded-lg p-3 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )} style={{ transitionDelay: "400ms" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={14} className="text-green-600" />
                      <span className="text-xs font-medium text-green-700">Completed</span>
                    </div>
                    <div className="text-xl font-bold text-green-800">3/5</div>
                    <div className="text-[10px] text-green-600">stages done</div>
                  </div>
                  
                  <div className={cn(
                    "bg-amber-50 rounded-lg p-3 transition-all duration-500",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  )} style={{ transitionDelay: "500ms" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <FileText size={14} className="text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">Pending</span>
                    </div>
                    <div className="text-xl font-bold text-amber-800">2</div>
                    <div className="text-[10px] text-amber-600">documents needed</div>
                  </div>
                </div>

                {/* Progress section */}
                <div className={cn(
                  "bg-eldo-soft-blue/50 rounded-lg p-3 mb-4 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: "600ms" }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-eldo-dark">Overall Progress</span>
                    <span className="text-xs font-bold text-eldo-blue">67%</span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div 
                      className={cn(
                        "h-full bg-gradient-to-r from-eldo-blue to-eldo-purple rounded-full transition-all duration-1000",
                        isVisible ? "w-[67%]" : "w-0"
                      )}
                      style={{ transitionDelay: "800ms" }}
                    ></div>
                  </div>
                </div>

                {/* Next step indicator */}
                <div className={cn(
                  "flex items-center gap-3 p-3 bg-eldo-blue/10 rounded-lg border border-eldo-blue/20 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )} style={{ transitionDelay: "700ms" }}>
                  <div className="h-8 w-8 rounded-full bg-eldo-blue flex items-center justify-center">
                    <TrendingUp size={14} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-eldo-dark">Next: Upload Language Test</div>
                    <div className="text-[10px] text-eldo-dark/60">Required for profile submission</div>
                  </div>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className={cn(
                "absolute -top-4 -right-4 h-24 w-24 bg-eldo-blue/10 rounded-full blur-xl transition-all duration-1000",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}></div>
              <div className={cn(
                "absolute -bottom-6 -left-6 h-32 w-32 bg-eldo-purple/10 rounded-full blur-xl transition-all duration-1000 delay-200",
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
              )}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardFramingSection;
