import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Plane, 
  FileText, 
  Download, 
  Upload, 
  ArrowRight, 
  Check, 
  Sparkles,
  ExternalLink,
  Info,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface I94ScanPromptProps {
  onDocumentScanned: (documentData: any) => void;
  hasUSTravel?: boolean;
  className?: string;
}

const I94ScanPrompt: React.FC<I94ScanPromptProps> = ({ 
  onDocumentScanned, 
  hasUSTravel = false,
  className 
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsScanning(true);
      // Simulate file processing
      setTimeout(() => {
        const mockScannedData = {
          documentType: 'I-94',
          entryDate: '2024-01-15',
          exitDate: '2024-03-20',
          country: 'United States',
          purpose: 'Tourist/Business (B-2)',
          portOfEntry: 'John F. Kennedy International Airport',
          admissionNumber: 'I94-123456789',
          scannedAt: new Date().toISOString()
        };
        
        onDocumentScanned(mockScannedData);
        setIsScanning(false);
        setIsDialogOpen(false);
        setCurrentStep(1);
      }, 2000);
    }
  };

  if (isDismissed) return null;

  const steps = [
    {
      number: 1,
      title: "Get your I-94",
      description: "Download your travel record from CBP"
    },
    {
      number: 2,
      title: "Upload the PDF",
      description: "We'll extract all your US entries"
    },
    {
      number: 3,
      title: "Review & confirm",
      description: "All trips auto-filled for you"
    }
  ];

  return (
    <>
      {/* Prominent Feature Card */}
      <div className={cn(
        "relative overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/5",
        className
      )}>
        {/* Dismiss button */}
        <button 
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted/80 transition-colors z-10"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        <div className="p-5">
          {/* Header with icon */}
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/20">
              <Plane className="w-6 h-6 text-primary-foreground" />
              <span className="absolute -top-1 -right-1 text-base">🇺🇸</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">Traveled to the USA? 🇺🇸</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  Auto-fill
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Skip manual entry — scan your I-94 and we'll add all your US trips automatically.
              </p>
            </div>
          </div>

          {/* What is I-94 explainer */}
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">What's an I-94?</span> It's your official US arrival/departure record. 
                Download it free from the{' '}
                <a 
                  href="https://i94.cbp.dhs.gov/I94/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  CBP website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={() => setIsDialogOpen(true)}
            className="w-full mt-4 gap-2"
            size="lg"
          >
            <FileText className="w-4 h-4" />
            Scan my I-94
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Scan Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Scan your I-94
            </DialogTitle>
          </DialogHeader>

          {/* Step Progress */}
          <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-lg">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    currentStep > step.number 
                      ? "bg-primary text-primary-foreground" 
                      : currentStep === step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  )}>
                    {currentStep > step.number ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className={cn(
                    "text-sm hidden sm:block",
                    currentStep === step.number ? "font-medium text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2 rounded-full",
                    currentStep > step.number ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Content */}
          <div className="py-4">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="text-center p-6 rounded-lg border-2 border-dashed border-border bg-muted/20">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Step 1: Download your I-94</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Visit the official CBP website to get your travel record. You'll need your passport details.
                  </p>
                  <a 
                    href="https://i94.cbp.dhs.gov/I94/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Open CBP I-94 Website
                    </Button>
                  </a>
                </div>
                
                <Button 
                  onClick={() => setCurrentStep(2)} 
                  className="w-full gap-2"
                >
                  I have my I-94 PDF
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div 
                  className={cn(
                    "relative text-center p-8 rounded-lg border-2 border-dashed transition-colors",
                    isScanning 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-primary/50 bg-muted/20"
                  )}
                >
                  {isScanning ? (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      </div>
                      <h3 className="font-semibold mb-2">Scanning your document...</h3>
                      <p className="text-sm text-muted-foreground">
                        Extracting travel entries from your I-94
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">Upload your I-94 PDF</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Drop your file here or click to browse
                      </p>
                      <Button className="gap-2">
                        <Upload className="w-4 h-4" />
                        Choose file
                      </Button>
                      <input
                        type="file"
                        accept=".pdf,image/*"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </>
                  )}
                </div>

                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(1)} 
                  className="w-full"
                >
                  ← Back to step 1
                </Button>
              </div>
            )}
          </div>

          {/* Help text */}
          <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Your I-94 contains your US entry and exit dates. We'll extract each trip automatically 
              so you don't have to enter them manually.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default I94ScanPrompt;
