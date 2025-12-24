
import React, { useState } from 'react';
import { CheckCircle2, ArrowLeft, Package } from 'lucide-react';
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
    'Pre-filled forms you review and control',
    'Document checks against IRCC requirements',
    'Clear timeline and next-step tracking',
  ];

  return (
    <div className="min-h-screen bg-pale-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
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

        {/* Centered card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50">
            {/* Header with icon */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Express Entry — Complete application toolkit
                </h2>
                <p className="text-muted-foreground text-sm mt-1">
                  One plan, everything you need
                </p>
              </div>
              <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 ml-4">
                <Package className="w-6 h-6 text-primary-blue" />
              </div>
            </div>

            {/* Price */}
            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">$279 CAD</span>
                <span className="text-lg text-muted-foreground">·</span>
                <span className="text-lg text-foreground">One-time payment</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Access the full Eldo toolkit immediately
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Checkout button */}
            <Button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-4 bg-primary-blue text-white rounded-xl font-semibold transition-all text-base"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                'Get full access — $279 CAD'
              )}
            </Button>

            {/* Reassurance text */}
            <p className="text-center text-sm text-muted-foreground mt-4">
              Review and edit everything before submission.
            </p>
          </div>

          {/* Skip option */}
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={handleSkipForNow}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip for now
            </Button>
            <p className="text-xs text-muted-foreground mt-1">
              You can upgrade anytime from your dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
