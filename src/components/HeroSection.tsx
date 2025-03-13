
import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <section className="relative pt-28 pb-20 overflow-hidden bg-pale-blue" ref={elementsRef}>
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-pale-blue/70 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Hero content */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-block mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
              <span className="px-4 py-1.5 rounded-full bg-primary-blue/20 text-primary-blue font-medium text-sm">
                Express Entry Simplified
              </span>
            </div>
            
            <div className="mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
              <h1 className="text-4xl md:text-6xl font-bold">
                Fast-track your <span className="text-primary-blue">Canadian</span> journey
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mb-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              Eldo Copilot automates and simplifies your Express Entry application process with AI-powered document scanning and form filling.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <Button className="px-8 py-6 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center group">
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="px-8 py-6 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300">
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              {['90% Less Paperwork', 'Compliance Guaranteed', 'Timeline Predictions'].map((item, i) => (
                <div key={i} className="flex items-center text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-primary-blue mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* App preview */}
          <div className="relative w-full max-w-4xl mx-auto animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-500">
            <div className="aspect-video bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <div className="w-full h-full bg-gradient-to-br from-primary-blue/10 to-white flex items-center justify-center">
                <div className="p-12 w-full">
                  <div className="text-xl font-medium mb-6 text-gray-800">Application Dashboard</div>
                  <div className="glass-card rounded-xl p-8 max-w-lg mx-auto bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl">
                    <div className="flex flex-col space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="h-6 w-28 bg-gray-200 rounded-md"></div>
                        <div className="h-6 w-16 bg-primary-blue/20 text-primary-blue text-xs flex items-center justify-center rounded-full">Step 2 of 4</div>
                      </div>
                      <div className="h-10 w-full bg-gray-100 rounded-md"></div>
                      <div className="flex gap-4">
                        <div className="h-24 w-1/3 bg-gray-100 rounded-md flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <div className="h-24 w-1/3 bg-gray-100 rounded-md flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                          </svg>
                        </div>
                        <div className="h-24 w-1/3 bg-gray-100 rounded-md flex items-center justify-center">
                          <svg className="w-8 h-8 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                          </svg>
                        </div>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-primary-blue rounded-full"></div>
                      </div>
                    </div>
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
                <div className="text-xs text-gray-500">73% Complete</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
