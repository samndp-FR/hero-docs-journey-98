
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

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Plan card */}
          <div className="bg-white rounded-xl p-6 border border-primary-blue shadow-lg">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground">Express Entry</h3>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-foreground">$279</span>
                <span className="text-lg text-muted-foreground">CAD</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">One-time payment</p>
            </div>

            <div className="space-y-3 mb-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-primary-blue/10 rounded-md flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary-blue" />
                  </div>
                  <span className="text-sm text-foreground">{feature.title}</span>
                </div>
              ))}
            </div>

            {/* Checkout button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3 bg-primary-blue text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4" />
                  Get Started - $279 CAD
                </span>
              )}
            </Button>

            {/* Trust badge */}
            <div className="mt-4 flex justify-center text-muted-foreground text-xs">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Payment form placeholder */}
          <div className="bg-white/80 rounded-xl p-6 border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">Payment Details</h3>
            
            {/* Payment form placeholder */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Card Number</label>
                <div className="h-10 bg-white rounded-lg border border-border flex items-center px-3 text-muted-foreground text-sm">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>•••• •••• •••• ••••</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Expiry</label>
                  <div className="h-10 bg-white rounded-lg border border-border flex items-center px-3 text-muted-foreground text-sm">
                    MM/YY
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">CVC</label>
                  <div className="h-10 bg-white rounded-lg border border-border flex items-center px-3 text-muted-foreground text-sm">
                    •••
                  </div>
                </div>
              </div>
            </div>

            {/* Stripe badge placeholder */}
            <div className="flex items-center justify-center gap-1 mt-4 text-muted-foreground text-xs">
              <Lock className="w-3 h-3" />
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
