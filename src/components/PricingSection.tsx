
import React from 'react';
import { CheckCircle2, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const PricingSection = () => {
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
          <div className="flex justify-center">
            {/* Single Pricing Plan */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-eldo-light/50 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 max-w-md w-full">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Express Entry Copilot</h3>
                    <p className="text-eldo-dark/60 text-sm">Complete Application Solution</p>
                  </div>
                  <div className="p-3 bg-eldo-blue/10 rounded-full">
                    <Package className="w-6 h-6 text-eldo-blue" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold">CAD $179</div>
                  <div className="text-eldo-dark/60 text-sm">One-time payment</div>
                  <div className="text-sm text-eldo-purple font-medium mt-2">Or pay in 3 installments of CAD $59.67</div>
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

                <Button className="w-full py-3 px-6 bg-eldo-blue text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                  Get Started
                </Button>
                
                <div className="mt-6 p-4 bg-eldo-soft-blue rounded-xl">
                  <h4 className="text-lg font-semibold mb-2 text-eldo-blue">Unlimited Applications Add-on</h4>
                  <p className="text-sm text-eldo-dark/80 mb-3">
                    For candidates with medium chances who might need multiple applications:
                  </p>
                  <div className="flex items-baseline mb-2">
                    <span className="text-xl font-bold">CAD $9.99</span>
                    <span className="text-eldo-dark/60 text-sm ml-1">/month</span>
                  </div>
                  <p className="text-xs text-eldo-dark/70">
                    Add this subscription for unlimited personal applications, perfect for those who may need to apply multiple times.
                  </p>
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
