import React, { useState, useEffect, useRef } from 'react';
import { Timer, FileEdit, Clock, Lock, CreditCard, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PricingSection = () => {
  const navigate = useNavigate();
  const [daysCount, setDaysCount] = useState(8);
  const [isFlipping, setIsFlipping] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countdownRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Timer, title: '16h+ hours saved' },
    { icon: FileEdit, title: 'Automated form filling' },
    { icon: Clock, title: 'Timeline tracking' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Animate countdown from 8 to 7
          setTimeout(() => {
            setIsFlipping(true);
            setTimeout(() => {
              setDaysCount(7);
              setIsFlipping(false);
            }, 300);
          }, 500);
        }
      },
      { threshold: 0.5 }
    );

    if (countdownRef.current) {
      observer.observe(countdownRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="pricing" className="py-24 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-primary-blue font-semibold text-sm uppercase tracking-wider">
            PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
            One complete toolkit for your Express Entry application
          </h2>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            {/* Single Pricing Plan */}
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg relative overflow-hidden">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">Express Entry</h3>
                <p className="text-muted-foreground mt-1">Complete application toolkit</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-foreground">$279</span>
                  <span className="text-muted-foreground text-lg">CAD</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">One-time payment</p>
              </div>

              {/* Installment Option */}
              <div className="mb-6 p-4 rounded-xl bg-primary-blue/5 border border-primary-blue/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-primary-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Or 4 payments of <span className="text-primary-blue font-bold">$70 CAD</span>
                    </p>
                    <p className="text-xs text-muted-foreground">Interest-free installments available</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-blue/10 flex items-center justify-center">
                      <feature.icon className="w-4 h-4 text-primary-blue" />
                    </div>
                    <span className="text-foreground">{feature.title}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-primary-blue to-primary-blue/80 hover:from-primary-blue/90 hover:to-primary-blue/70 text-white py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary-blue/20 hover:scale-[1.02] transition-transform"
                  onClick={() => navigate('/waitlist')}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Join the Waitlist!
                  </span>
                </Button>
                
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-center">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
                    🎉 Waitlist members get <span className="font-bold">25% off</span> at launch!
                  </p>
                </div>

                <div ref={countdownRef} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <span>Launching in</span>
                  <div className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 rounded-md px-2 py-0.5 overflow-hidden">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span 
                      className={`font-bold text-orange-500 transition-all duration-300 ${isFlipping ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}
                    >
                      {daysCount} days
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
