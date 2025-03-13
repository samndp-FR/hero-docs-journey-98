
import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementsRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = elementsRef.current.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => observerRef.current?.unobserve(el));
      }
    };
  }, []);

  return (
    <section className="relative pt-28 pb-20 overflow-hidden bg-gradient-to-b from-white to-eldo-soft-blue" ref={elementsRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-eldo-light-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-eldo-soft-blue/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero content */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <span className="px-4 py-1.5 rounded-full bg-eldo-light-purple/30 text-eldo-purple font-medium text-sm">
                Express Entry Simplified
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              Fast-track your <span className="gradient-text">Canadian immigration</span> journey
            </h1>
            
            <p className="text-lg md:text-xl text-eldo-dark/80 max-w-2xl mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              Eldo Copilot automates and simplifies your Express Entry application process with AI-powered document scanning and form filling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <button className="px-8 py-4 bg-eldo-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group">
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white border border-eldo-dark/10 text-eldo-dark rounded-xl font-semibold hover:bg-eldo-dark/5 transition-all duration-300">
                Learn More
              </button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              {['90% Less Paperwork', 'Compliance Guaranteed', 'Timeline Predictions'].map((item, i) => (
                <div key={i} className="flex items-center text-eldo-dark/80">
                  <CheckCircle2 className="w-5 h-5 text-eldo-blue mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* App preview */}
          <div className="relative w-full max-w-4xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            <div className="aspect-video bg-eldo-dark/5 rounded-2xl overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-gradient-to-br from-eldo-dark to-eldo-purple/70 flex items-center justify-center">
                <div className="text-white text-center p-12">
                  <div className="text-xl font-medium mb-6">Application Dashboard Preview</div>
                  <div className="glass-morphism rounded-xl p-8 max-w-lg mx-auto">
                    <div className="h-6 w-28 bg-white/20 rounded-md mb-4"></div>
                    <div className="h-10 w-full bg-white/10 rounded-md mb-6"></div>
                    <div className="flex gap-4 mb-6">
                      <div className="h-24 w-1/3 bg-white/10 rounded-md"></div>
                      <div className="h-24 w-1/3 bg-white/10 rounded-md"></div>
                      <div className="h-24 w-1/3 bg-white/10 rounded-md"></div>
                    </div>
                    <div className="h-40 w-full bg-white/10 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg py-3 px-6 flex items-center gap-4 animate-float">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Application Progress</div>
                <div className="text-xs text-eldo-dark/70">73% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
