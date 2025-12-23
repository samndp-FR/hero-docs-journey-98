import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  FolderOpen,
  ArrowRight,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type DocumentStatus = 'pending' | 'have-it' | 'scanned' | 'verified';

export interface TrackedDocument {
  id: string;
  name: string;
  status: DocumentStatus;
  relevantStages: string[];
}

interface DocumentReminderProps {
  currentStage: string;
  documents: TrackedDocument[];
  onMarkAsHaveIt: (docId: string) => void;
}

// Documents required per stage
const stageDocuments: Record<string, string[]> = {
  'get-ready': ['language-test', 'eca'],
  'build-profile': ['passport', 'educational-credentials', 'work-letters', 'language-test'],
  'wait-invitation': ['police-certificate', 'employment-letters', 'proof-of-funds'],
  'apply-pr': ['passport', 'educational-credentials', 'work-letters', 'language-test', 'police-certificate', 'proof-of-funds', 'medical-exam', 'birth-certificate'],
  'after-submission': ['medical-exam', 'biometrics-confirmation'],
};

const DocumentReminder: React.FC<DocumentReminderProps> = ({ 
  currentStage, 
  documents,
  onMarkAsHaveIt
}) => {
  const navigate = useNavigate();
  
  const relevantDocIds = stageDocuments[currentStage] || [];
  const relevantDocs = documents.filter(doc => relevantDocIds.includes(doc.id));
  
  const readyDocs = relevantDocs.filter(doc => 
    doc.status === 'have-it' || doc.status === 'scanned' || doc.status === 'verified'
  ).length;
  const totalDocs = relevantDocs.length;
  const progressPercentage = totalDocs > 0 ? (readyDocs / totalDocs) * 100 : 0;

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case 'verified':
      case 'scanned':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'have-it':
        return <FolderOpen className="w-4 h-4 text-blue-600" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: DocumentStatus) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800 text-xs">Verified</Badge>;
      case 'scanned':
        return <Badge className="bg-green-100 text-green-800 text-xs">Scanned</Badge>;
      case 'have-it':
        return <Badge className="bg-blue-100 text-blue-800 text-xs">Have It</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Needed</Badge>;
    }
  };

  if (relevantDocs.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary-blue" />
            Documents for This Stage
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('/dashboard/documents')}
            className="text-primary-blue"
          >
            Document Center
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{readyDocs} of {totalDocs} documents ready</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {relevantDocs.map((doc) => (
            <div 
              key={doc.id} 
              className={`flex items-center justify-between p-3 rounded-lg border ${
                doc.status !== 'pending' 
                  ? 'bg-muted/30 border-border' 
                  : 'bg-amber-50/50 border-amber-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(doc.status)}
                <span className="font-medium text-sm">{doc.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(doc.status)}
                {doc.status === 'pending' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkAsHaveIt(doc.id)}
                    className="text-xs h-7 px-2"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    I have it
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Mark documents as "I have it" if stored elsewhere, or scan them in the Document Center for auto-fill.
        </p>
      </CardContent>
    </Card>
  );
};

export default DocumentReminder;
