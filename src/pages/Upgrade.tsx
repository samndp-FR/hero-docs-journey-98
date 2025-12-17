
import React, { useState } from 'react';
import { CheckCircle2, CreditCard, Shield, Zap, ArrowLeft, Lock, FolderOpen, FileEdit, Clock, HeadphonesIcon } from 'lucide-react';
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
      icon: FolderOpen,
      title: 'Centralized Document Management',
      description: 'Keep all your application documents organized in one secure place',
    },
    {
      icon: FileEdit,
      title: 'Automated Form Filling',
      description: 'Save hours with intelligent form auto-completion across your application',
    },
    {
      icon: Clock,
      title: 'Application Timeline Tracking',
      description: 'Stay on top of deadlines and know exactly where you are in the process',
    },
    {
      icon: HeadphonesIcon,
      title: 'Priority Support',
      description: 'Get help when you need it with dedicated email support',
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
          <div className="flex items-center gap-2">
            <span className="eldo-text text-3xl">Eldo</span>
            <span className="agent-text text-xl">Copilot</span>
          </div>
          <div className="w-20"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <span className="px-4 py-1.5 rounded-full bg-primary-blue/20 text-primary-blue font-medium text-sm inline-block mb-4">
            ELDO COPILOT
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Get started with Eldo
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            One simple plan to help you through your Express Entry application.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Plan card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-primary-blue shadow-xl">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">Express Entry Copilot</h3>
              <p className="text-muted-foreground">Everything you need to manage your application</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-foreground">$279</span>
                <span className="text-xl text-muted-foreground">CAD</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">One-time payment</p>
            </div>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
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
                  Get Started - $279 CAD
                </span>
              )}
            </Button>

            {/* Trust badges */}
            <div className="mt-6 flex justify-center gap-6">
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

          {/* Payment form placeholder */}
          <div className="glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-foreground">Payment Details</h3>
            
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

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-muted-foreground">or</span>
              </div>
            </div>

            {/* Skip option */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Not ready to commit? Explore the dashboard with limited features.
              </p>
              <Button
                variant="outline"
                onClick={handleSkipForNow}
                className="w-full py-3 rounded-xl"
              >
                Continue with Free Version
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                You can upgrade anytime from your dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
