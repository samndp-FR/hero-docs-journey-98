
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle2, FolderOpen, FileEdit, ShieldCheck, Calculator, AlertTriangle, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const steps = [
  { id: 1, title: 'Get Started', content: 'welcome' },
  { id: 2, title: 'Create Account', content: 'register' },
  { id: 3, title: 'Eligibility', content: 'crs' },
  { id: 4, title: 'Terms & Conditions', content: 'terms' },
];

const termsContent = `1. Acceptance of Terms
By accessing and utilizing the services offered by askeldo.com ("Eldo"), you acknowledge and consent to be bound by these Terms of Service ("Terms"). Should you disagree with these Terms, you must cease using the services provided by Eldo. Your ongoing use of Eldo indicates your acceptance of any amendments to these Terms.

2. Description of Services
Eldo provides an AI-powered platform specifically designed to streamline Express Entry individual and self-led applications for Canada. Our technology enables intelligent scanning and form-filling, saving applicants time and reducing manual data entry errors. It is important to note that Eldo does not generate documents or provide immigration guidance. Forms available on Eldo are provided by the IRCC, publicly, on the IRCC website. Eldo does not submit documents on users' behalf, nor does it provide legal immigration counsel.

3. Payment Terms
Fees: Charges for our Express Entry form automation services are payable when engaging the service. The detailed fee structure will be disclosed at the time of service engagement.
Non-Refundable: All payments made to Eldo are non-refundable as our service is deemed complete once you are granted access to the automated form-filling tool.
Service Completion: Service completion is defined as the moment when the user obtains access to the automated form-filling system that scans files and populates immigration forms.

4. User Responsibilities
The Eldo platform is designed for individual use. Users bear responsibility for their decisions and actions based on information provided by Eldo. We advise users to consult professional legal experts for specific immigration-related inquiries and prior to making significant immigration decisions.

Limitation of Liability
Review and Submission: Users are accountable for thoroughly examining all documents and confirming their accuracy before submission. Users must independently file their documents with the appropriate authorities.
Accuracy of Information: Users must supply precise and comprehensive information. Eldo is not liable for errors stemming from inaccurate or incomplete information furnished by users.

5. Intellectual Property Rights
All content and software available on the Eldo platform are owned by Eldo or its licensors and are safeguarded under Canadian and international intellectual property legislation.

6. Privacy Policy
Our handling and usage of personal information are regulated by Eldo's Privacy Policy and constitutes an essential component of these Terms.

7. Limitation of Liability
Eldo shall not be responsible for any direct, indirect, incidental, special, or consequential damages arising from the use or inability to use our services, including but not limited to dependence on information acquired through Eldo.

8. Disclaimer of Warranties
Eldo offers its services "as is" and "as available" without any warranties, expressed or implied, including but not limited to implied warranties of merchantability or suitability for a specific purpose.

9. Indemnification
You agree to indemnify, defend, and protect Eldo and its affiliates, officers, agents, and employees from any claim or demand made by any third party due to or arising from your use of Eldo.

10. Modification of Terms
Eldo reserves the right to revise these Terms at any time. Your continued use of the service following any such revision signifies your acceptance of the modified Terms.

11. Termination
Eldo may terminate or suspend your access to the service for breach of these Terms without prior notification or liability.

12. Governing Law
These Terms are governed by and interpreted in accordance with the laws of Canada and the Province of Quebec.

13. Dispute Resolution
Any conflicts arising under these Terms will be resolved through arbitration in accordance with the regulations of the Province of Quebec.

14. Contact Information
Questions regarding the Terms of Service should be directed to contact@askeldo.com.

By utilizing the Services, you indicate your acceptance of these Terms. Eldo reserves the right to amend these Terms at any time without notice.

Last Updated: March 14, 2025`;

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasConfirmedCRS, setHasConfirmedCRS] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [showTermsConfirmDialog, setShowTermsConfirmDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/upgrade');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTakeCRSAssessment = () => {
    navigate('/crs-assessment');
  };

  const handleTermsCheckboxClick = () => {
    if (!hasAcceptedTerms) {
      setShowTermsConfirmDialog(true);
    } else {
      setHasAcceptedTerms(false);
    }
  };

  const handleConfirmTerms = () => {
    setHasAcceptedTerms(true);
    setShowTermsConfirmDialog(false);
  };

  const canProceed = () => {
    if (currentStep === 1) return email && password && (isLogin || name);
    if (currentStep === 2) return hasConfirmedCRS;
    if (currentStep === 3) return hasAcceptedTerms;
    return true;
  };

  return (
    <div className="min-h-screen bg-pale-blue relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex justify-center items-center mb-12">
          <span className="eldo-text text-3xl">Eldo</span>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    index <= currentStep 
                      ? 'bg-primary-blue text-white' 
                      : 'bg-white border-2 border-border text-muted-foreground'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-all duration-300 ${
                    index < currentStep ? 'bg-primary-blue' : 'bg-border'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 md:p-12">
            {/* Step 1: Welcome */}
            {currentStep === 0 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Welcome to Eldo
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Let's get your Express Entry application started. Here's what Eldo helps you with:
                  </p>
                </div>
                
                <div className="grid gap-4">
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Apply with peace of mind</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay organized and confident throughout your application process
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Keep everything in one place</h3>
                      <p className="text-sm text-muted-foreground">
                        All your forms and application details organized together
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-5 border border-border flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileEdit className="w-6 h-6 text-primary-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Automate form filling</h3>
                      <p className="text-sm text-muted-foreground">
                        Save time with automated data entry across your application forms
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Register/Login */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </h1>
                  <p className="text-muted-foreground">
                    {isLogin ? 'Sign in to continue your application' : 'Get started with Eldo'}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 py-3 rounded-xl"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 py-3 rounded-xl"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder={isLogin ? 'Enter your password' : 'Create a password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 py-3 rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-primary-blue hover:underline text-sm font-medium"
                  >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: CRS Check */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Check your eligibility
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Express Entry is a points-based system. Make sure you have a competitive CRS score.
                  </p>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Important</h4>
                      <p className="text-sm text-amber-700">
                        Eldo helps you with the application process, but does not help you improve your CRS score or qualify for Express Entry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleTakeCRSAssessment}
                    variant="outline"
                    className="w-full py-6 rounded-xl border-2 border-primary-blue/30 hover:border-primary-blue hover:bg-primary-blue/5"
                  >
                    <Calculator className="w-5 h-5 mr-3 text-primary-blue" />
                    <span className="text-foreground">Take the CRS Assessment</span>
                  </Button>
                  
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-muted-foreground">or</span>
                    </div>
                  </div>
                  
                  <label 
                    className={`block bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                      hasConfirmedCRS 
                        ? 'border-primary-blue bg-primary-blue/5' 
                        : 'border-border hover:border-primary-blue/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={hasConfirmedCRS}
                        onChange={(e) => setHasConfirmedCRS(e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-border text-primary-blue focus:ring-primary-blue"
                      />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          I already know my CRS score
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          I confirm that I have a competitive CRS score and understand that Eldo does not help improve my eligibility or points.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Terms & Conditions */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                    Terms & Conditions
                  </h1>
                  <p className="text-muted-foreground">
                    Please read and accept our terms before continuing.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl border border-border p-6 max-h-80 overflow-y-auto">
                  <div className="prose prose-sm max-w-none">
                    {termsContent.split('\n\n').map((paragraph, index) => {
                      const isHeading = /^\d+\./.test(paragraph);
                      if (isHeading) {
                        const [title, ...rest] = paragraph.split('\n');
                        return (
                          <div key={index} className="mb-4">
                            <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                            {rest.length > 0 && (
                              <p className="text-sm text-muted-foreground">{rest.join('\n')}</p>
                            )}
                          </div>
                        );
                      }
                      return (
                        <p key={index} className="text-sm text-muted-foreground mb-4">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div 
                  onClick={handleTermsCheckboxClick}
                  className={`block bg-white rounded-xl p-5 border-2 cursor-pointer transition-all ${
                    hasAcceptedTerms 
                      ? 'border-primary-blue bg-primary-blue/5' 
                      : 'border-border hover:border-primary-blue/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={hasAcceptedTerms}
                      readOnly
                      className="mt-1 w-5 h-5 rounded border-border text-primary-blue focus:ring-primary-blue pointer-events-none"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        I accept the Terms & Conditions
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        I have read and agree to the Terms of Service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="px-6 py-3 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-8 py-3 bg-primary-blue text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {currentStep === steps.length - 1 ? 'Continue' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Terms Confirmation Dialog */}
      <Dialog open={showTermsConfirmDialog} onOpenChange={setShowTermsConfirmDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>By accepting, you understand that:</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Eldo does <strong>not</strong> generate documents or provide immigration guidance
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Eldo does <strong>not</strong> submit documents on your behalf
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                Eldo does <strong>not</strong> provide legal immigration counsel
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                You are responsible for reviewing all documents and confirming their accuracy before submission
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-muted-foreground">
                All payments are <strong>non-refundable</strong>
              </p>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowTermsConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmTerms} className="bg-primary-blue text-white">
              I Understand & Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Onboarding;
