
import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Shield, Zap, Crown, ArrowLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    period: 'one-time',
    description: 'Perfect for getting started',
    features: [
      'CRS Score Calculator',
      'Document Checklist',
      'Email Support',
      'Basic Timeline Predictions',
    ],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Express Entry Copilot',
    price: 179,
    period: 'one-time',
    description: 'Complete application solution',
    features: [
      'Everything in Basic',
      'AI Document Scanning',
      'Automated Form Filling (90%)',
      'Priority Support',
      'Application Submission Guidance',
      'Timeline Predictions',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    period: 'one-time',
    description: 'Full concierge service',
    features: [
      'Everything in Pro',
      'Dedicated Case Manager',
      'Document Review by Experts',
      'Interview Preparation',
      'Post-Landing Support',
      'Unlimited Revisions',
    ],
    popular: false,
  },
];

const Upgrade = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Stripe checkout placeholder - would integrate with Stripe here
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to success or dashboard
      navigate('/dashboard');
    }, 2000);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-pale-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <span className="eldo-text text-3xl">Eldo</span>
            <span className="agent-text text-xl">Copilot</span>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 rounded-full bg-primary-blue/20 text-primary-blue font-medium text-sm inline-block mb-4">
            UPGRADE YOUR PLAN
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Choose the right plan for you
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Unlock powerful features to streamline your Express Entry application process.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handleSelectPlan(plan.id)}
              className={`relative bg-white rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-primary-blue shadow-xl transform scale-[1.02]'
                  : 'border border-border hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary-blue text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">CAD ${plan.price}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.period}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`w-6 h-6 rounded-full border-2 mx-auto transition-all ${
                selectedPlan === plan.id
                  ? 'bg-primary-blue border-primary-blue'
                  : 'border-border'
              }`}>
                {selectedPlan === plan.id && (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Checkout section */}
        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-foreground">Complete your purchase</h3>
            
            {/* Order summary */}
            <div className="bg-secondary/50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-foreground font-medium">{selectedPlanData?.name}</span>
                <span className="font-bold text-foreground">CAD ${selectedPlanData?.price}</span>
              </div>
              <div className="text-sm text-muted-foreground">{selectedPlanData?.description}</div>
            </div>

            {/* Payment form placeholder */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>•••• •••• •••• ••••</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
                  <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                    MM/YY
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
                  <div className="h-12 bg-white rounded-lg border border-border flex items-center px-4 text-muted-foreground">
                    •••
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe badge placeholder */}
            <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground text-sm">
              <Lock className="w-4 h-4" />
              <span>Secured by</span>
              <span className="font-bold text-foreground">Stripe</span>
            </div>

            {/* Checkout button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 text-lg"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Pay CAD ${selectedPlanData?.price}
                </span>
              )}
            </Button>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {[
                { icon: Shield, text: '14-Day Money Back' },
                { icon: Lock, text: 'Secure Payment' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                  <badge.icon className="w-4 h-4 text-primary-blue" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
