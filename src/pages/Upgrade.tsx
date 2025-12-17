
import React, { useState } from 'react';
import { CreditCard, Zap, ArrowLeft, Lock, FileEdit, Clock, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Upgrade = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsProcessing(true);
    // Stripe checkout placeholder - would integrate with Stripe here
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  const handleSkipForNow = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Timer,
      title: '16h+ hours saved',
    },
    {
      icon: FileEdit,
      title: 'Automated form filling',
    },
    {
      icon: Clock,
      title: 'Timeline tracking',
    },
  ];

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
          <span className="eldo-text text-3xl">Eldo</span>
          <div className="w-20"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Get started with Eldo
          </h1>
          <p className="text-muted-foreground text-sm">
            One simple plan for your Express Entry application.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Plan card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-primary-blue shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground">Express Entry</h3>
              <p className="text-muted-foreground text-sm mt-1">Complete application toolkit</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-foreground">$279</span>
                <span className="text-xl text-muted-foreground">CAD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">One-time payment</p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary-blue" />
                  </div>
                  <span className="text-foreground font-medium">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* Checkout button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all text-lg"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Get Started - $279 CAD
                </span>
              )}
            </Button>

            {/* Trust badge */}
            <div className="mt-4 flex justify-center text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Payment form placeholder */}
          <div className="bg-white/80 rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold mb-6 text-foreground">Payment Details</h3>
            
            {/* Payment form placeholder */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Card Number</label>
                <div className="h-12 bg-white rounded-xl border border-border flex items-center px-4 text-muted-foreground">
                  <CreditCard className="w-5 h-5 mr-3" />
                  <span>•••• •••• •••• ••••</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Expiry</label>
                  <div className="h-12 bg-white rounded-xl border border-border flex items-center px-4 text-muted-foreground">
                    MM/YY
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">CVC</label>
                  <div className="h-12 bg-white rounded-xl border border-border flex items-center px-4 text-muted-foreground">
                    •••
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe badge placeholder */}
            <div className="flex items-center justify-center gap-2 mt-6 text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Secured by</span>
              <span className="font-bold text-foreground">Stripe</span>
            </div>
          </div>
        </div>

        {/* Skip option - outside cards */}
        <div className="max-w-3xl mx-auto mt-6 text-center">
          <Button
            variant="ghost"
            onClick={handleSkipForNow}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now - Continue with Free Version
          </Button>
          <p className="text-xs text-muted-foreground mt-1">
            You can upgrade anytime from your dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
