
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Scan,
  FileCheck
} from 'lucide-react';
import DocumentScanner from '@/components/form/DocumentScanner';

interface Document {
  id: string;
  name: string;
  type: 'form-filling' | 'compliance';
  status: 'pending' | 'uploaded' | 'verified';
  description: string;
  required: boolean;
}

interface DocumentCenterProps {
  remainingScans?: number;
  isUnlimited?: boolean;
  subscription?: string;
}

const DocumentCenter: React.FC<DocumentCenterProps> = ({ 
  remainingScans = 5, 
  isUnlimited = false, 
  subscription = 'free' 
}) => {
  const [documents, setDocuments] = useState<Document[]>([
    // Form-filling documents
    {
      id: '1',
      name: 'Passport',
      type: 'form-filling',
      status: 'pending',
      description: 'Personal details, birth date, nationality',
      required: true
    },
    {
      id: '2',
      name: 'Educational Credentials',
      type: 'form-filling',
      status: 'pending',
      description: 'Degree information, institution details',
      required: true
    },
    {
      id: '3',
      name: 'Work Experience Letters',
      type: 'form-filling',
      status: 'pending',
      description: 'Employment history, job duties, salary',
      required: true
    },
    {
      id: '4',
      name: 'Language Test Results',
      type: 'form-filling',
      status: 'pending',
      description: 'IELTS/CELPIP scores for all four skills',
      required: true
    },
    {
      id: '5',
      name: 'I-94 Travel Record',
      type: 'form-filling',
      status: 'pending',
      description: 'Entry/exit dates, travel history',
      required: false
    },
    // Compliance documents
    {
      id: '6',
      name: 'Police Certificate',
      type: 'compliance',
      status: 'pending',
      description: 'Background check from each country lived in',
      required: true
    },
    {
      id: '7',
      name: 'Medical Exam',
      type: 'compliance',
      status: 'pending',
      description: 'Completed by panel physician',
      required: true
    },
    {
      id: '8',
      name: 'Proof of Funds',
      type: 'compliance',
      status: 'pending',
      description: 'Bank statements, investment documents',
      required: true
    },
    {
      id: '9',
      name: 'Birth Certificate',
      type: 'compliance',
      status: 'pending',
      description: 'Official birth certificate',
      required: false
    }
  ]);

  const formFillingDocs = documents.filter(doc => doc.type === 'form-filling');
  const complianceDocs = documents.filter(doc => doc.type === 'compliance');
  
  const completedFormDocs = formFillingDocs.filter(doc => doc.status === 'verified').length;
  const totalFormDocs = formFillingDocs.length;
  const progressPercentage = (completedFormDocs / totalFormDocs) * 100;

  const handleDocumentUpload = (docId: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId 
          ? { ...doc, status: 'uploaded' as const }
          : doc
      )
    );
  };

  const handleDocumentScanned = (docId: string, data: any) => {
    console.log('Document scanned:', data);
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === docId 
          ? { ...doc, status: 'verified' as const }
          : doc
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'uploaded':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'uploaded':
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Limit warning */}
      {!isUnlimited && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-700 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>Free plan includes scanning of {remainingScans} document(s). Upgrade to Premium for unlimited document scanning.</span>
          </p>
        </div>
      )}

      {/* Form-filling Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary-blue" />
                Form-Filling Documents
              </CardTitle>
              <CardDescription>
                These documents will automatically fill your application forms
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary-blue">
                {completedFormDocs}/{totalFormDocs}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Form Completion Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formFillingDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  {doc.status === 'pending' && (
                    <div className="flex gap-2">
                      <DocumentScanner
                        documentType={doc.name}
                        onDocumentScanned={(data) => handleDocumentScanned(doc.id, data)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDocumentUpload(doc.id)}
                        className="flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-green-600" />
            Compliance Documents
          </CardTitle>
          <CardDescription>
            These documents are required for your application but won't auto-fill forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  {getStatusIcon(doc.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{doc.name}</h4>
                      {doc.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(doc.status)}
                  {doc.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDocumentUpload(doc.id)}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card>
        <CardContent className="pt-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-blue transition-colors">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag and drop your documents</h3>
            <p className="text-gray-600 mb-4">or click to browse files (PDF, JPG, PNG)</p>
            <Button className="bg-primary-blue hover:bg-primary-blue/90">
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentCenter;
