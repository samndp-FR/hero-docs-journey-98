import { DashboardLayout } from '@/components/DashboardLayout';
import DocumentCenter from '@/components/DocumentCenter';
import { usePremium } from '@/contexts/PremiumContext';
import { UpgradePrompt } from '@/components/UpgradePrompt';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Upload, Scan } from 'lucide-react';

const DashboardDocuments = () => {
  const { isPremium } = usePremium();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Document Center</h1>
        
        {isPremium ? (
          <DocumentCenter 
            remainingScans={5}
            isUnlimited={false}
            subscription="free"
          />
        ) : (
          <div className="space-y-6">
            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 opacity-60 pointer-events-none select-none">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Document Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track all required documents for your Express Entry application in one place.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Scan className="h-4 w-4" />
                    Smart Scanning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Scan documents with AI to automatically extract and validate information.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Secure Storage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Upload and store your documents securely with encryption.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Validation Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get automatic checks to ensure your documents meet IRCC requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Upgrade Prompt */}
            <UpgradePrompt 
              feature="Document Center"
              description="Manage, scan, and validate all your immigration documents with AI-powered assistance. Keep everything organized and IRCC-ready."
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocuments;