import React from 'react';
import { Timer, FileEdit, Clock, ArrowRight, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PricingSectionV2 = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Timer, title: '16h+ hours saved' },
    { icon: FileEdit, title: 'Automated form filling' },
    { icon: Clock, title: 'Timeline tracking' },
  ];

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
            <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">Express Entry</h3>
                <p className="text-muted-foreground mt-1">Complete application toolkit</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-foreground">$279</span>
                  <span className="text-muted-foreground text-lg">CAD</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">One-time payment</p>
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
                  onClick={() => navigate('/upgrade')}
                >
                  <span className="flex items-center gap-2">
                    Get Started Now
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </Button>

                {/* Free Exploration Alternative */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">or</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full group flex items-center justify-center gap-2 py-4 px-6 rounded-xl border border-border bg-muted/30 hover:bg-muted/50 hover:border-primary-blue/30 transition-all duration-200"
                >
                  <Compass className="w-5 h-5 text-muted-foreground group-hover:text-primary-blue transition-colors" />
                  <span className="text-muted-foreground group-hover:text-foreground font-medium transition-colors">
                    Explore the platform first
                  </span>
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  No account needed. See exactly what you're getting before you commit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSectionV2;
