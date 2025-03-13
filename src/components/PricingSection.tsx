
import React, { useState } from 'react';
import { CheckCircle2, Package, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-eldo-soft-blue/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-eldo-light-purple/50 text-eldo-purple font-medium text-sm inline-block mb-4">
            PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-eldo-dark/80 max-w-2xl mx-auto">
            Choose the plan that fits your immigration needs with no hidden fees or surprises.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Standard Plan */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-eldo-light/50 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Standard</h3>
                    <p className="text-eldo-dark/60 text-sm">Single Application</p>
                  </div>
                  <div className="p-3 bg-eldo-blue/10 rounded-full">
                    <Package className="w-6 h-6 text-eldo-blue" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold">CAD $179</div>
                  <div className="text-eldo-dark/60 text-sm">One-time payment</div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Complete Express Entry application",
                    "Document scanning & verification",
                    "Automated form filling (90%)",
                    "Timeline predictions",
                    "Application submission guidance"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-eldo-blue mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-eldo-dark/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 px-6 bg-eldo-blue text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started
                </button>
                
                <div className="mt-4 text-center text-sm text-eldo-dark/60">
                  Or pay in 3 installments of CAD $59.67
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-eldo-dark to-eldo-dark/90 rounded-2xl shadow-xl overflow-hidden border border-eldo-purple/20 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 relative">
              <div className="absolute top-5 right-5">
                <span className="px-3 py-1 bg-eldo-purple text-white text-xs font-semibold rounded-full shadow-md">
                  POPULAR
                </span>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 text-white">Premium</h3>
                    <p className="text-white/60 text-sm">Unlimited Applications</p>
                  </div>
                  <div className="p-3 bg-eldo-purple/20 rounded-full">
                    <BadgeCheck className="w-6 h-6 text-eldo-purple" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <div className="text-4xl font-bold text-white">CAD $9.99</div>
                    <div className="text-white/60 text-sm ml-2">/month</div>
                  </div>
                  <div className="text-white/60 text-sm">+ Standard plan (CAD $179)</div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    "Everything in Standard plan",
                    "Unlimited personal applications",
                    "Priority document processing",
                    "Advanced timeline predictions",
                    "Email notifications & updates",
                    "Dedicated support"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-eldo-purple mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 px-6 bg-eldo-purple text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 btn-shine">
                  Get Premium
                </button>
                
                <div className="mt-4 text-center text-sm text-white/60">
                  Cancel anytime, no long-term commitment
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-xl p-6 shadow-lg border border-eldo-light/50 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Money-Back Guarantee</h3>
            <p className="text-center text-eldo-dark/80">
              If you're not satisfied with Eldo Copilot within 14 days of purchase, we offer a full refund. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
