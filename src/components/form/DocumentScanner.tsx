
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Scan, Upload, Camera } from 'lucide-react';

interface DocumentScannerProps {
  documentType: string;
  onDocumentScanned: (documentData: any) => void;
}

const DocumentScanner: React.FC<DocumentScannerProps> = ({ documentType, onDocumentScanned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      const mockScannedData = {
        documentType,
        entryDate: '2024-01-15',
        exitDate: '2024-03-20',
        portOfEntry: 'John F. Kennedy International Airport',
        admissionNumber: 'I94-123456789',
        status: 'B-2 Tourist',
        scannedAt: new Date().toISOString()
      };
      
      onDocumentScanned(mockScannedData);
      setIsScanning(false);
      setIsOpen(false);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate file processing
      const mockScannedData = {
        documentType,
        fileName: file.name,
        fileSize: file.size,
        scannedAt: new Date().toISOString()
      };
      
      onDocumentScanned(mockScannedData);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Scan className="w-4 h-4" />
          <span>Scan {documentType}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan {documentType} Document</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Scan className="w-8 h-8 text-blue-600" />
                </div>
                
                <div>
                  <h3 className="font-medium">Document Scanner</h3>
                  <p className="text-sm text-muted-foreground">
                    Scan your {documentType} to automatically extract travel information
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    onClick={handleScan} 
                    disabled={isScanning}
                    className="w-full flex items-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>{isScanning ? 'Scanning...' : 'Start Camera Scan'}</span>
                  </Button>
                  
                  <div className="relative">
                    <Button variant="outline" className="w-full flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload Document</span>
                    </Button>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                
                {isScanning && (
                  <div className="mt-4">
                    <div className="animate-pulse flex space-x-4">
                      <div className="rounded-full bg-slate-200 h-4 w-4"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="space-y-1">
                          <div className="h-2 bg-slate-200 rounded w-3/4"></div>
                          <div className="h-2 bg-slate-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentScanner;
