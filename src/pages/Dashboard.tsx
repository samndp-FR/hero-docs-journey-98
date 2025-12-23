import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowRight,
  Clock,
  CheckCircle,
  TrendingUp,
  FileWarning,
  Briefcase,
  Wallet,
  Info,
  Flag
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { toast } from 'sonner';
import DocumentReminder, { TrackedDocument } from '@/components/DocumentReminder';
import CompletedStages from '@/components/CompletedStages';

const STORAGE_KEY = 'eldo-journey-stage';
const CHECKLIST_KEY = 'eldo-checklist-state';
const STAGE_HISTORY_KEY = 'eldo-stage-history';
const DOCUMENTS_KEY = 'eldo-documents-state';

type ChecklistItem = {
  id: string;
  label: string;
  type: 'auto' | 'declared';
  completed: boolean;
  info?: string;
};

type StageConfig = {
  label: string;
  goal: string;
  checklist: ChecklistItem[];
  exitAction?: { label: string; nextStage: string };
};

type StageHistoryEntry = {
  stageId: string;
  completedAt: string;
};

const defaultDocuments: TrackedDocument[] = [
  { id: 'passport', name: 'Passport', status: 'pending', relevantStages: ['build-profile', 'apply-pr'] },
  { id: 'educational-credentials', name: 'Educational Credentials', status: 'pending', relevantStages: ['build-profile', 'apply-pr'] },
  { id: 'work-letters', name: 'Work Experience Letters', status: 'pending', relevantStages: ['build-profile', 'apply-pr'] },
  { id: 'language-test', name: 'Language Test Results', status: 'pending', relevantStages: ['get-ready', 'build-profile', 'apply-pr'] },
  { id: 'eca', name: 'Educational Credential Assessment', status: 'pending', relevantStages: ['get-ready'] },
  { id: 'police-certificate', name: 'Police Certificate', status: 'pending', relevantStages: ['wait-invitation', 'apply-pr'] },
  { id: 'employment-letters', name: 'Employment Reference Letters', status: 'pending', relevantStages: ['wait-invitation'] },
  { id: 'proof-of-funds', name: 'Proof of Funds', status: 'pending', relevantStages: ['wait-invitation', 'apply-pr'] },
  { id: 'medical-exam', name: 'Medical Exam', status: 'pending', relevantStages: ['apply-pr', 'after-submission'] },
  { id: 'birth-certificate', name: 'Birth Certificate', status: 'pending', relevantStages: ['apply-pr'] },
  { id: 'biometrics-confirmation', name: 'Biometrics Confirmation', status: 'pending', relevantStages: ['after-submission'] },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [currentStage, setCurrentStage] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'get-ready';
  });

  const [checklistState, setChecklistState] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(CHECKLIST_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  const [stageHistory, setStageHistory] = useState<StageHistoryEntry[]>(() => {
    const saved = localStorage.getItem(STAGE_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [documents, setDocuments] = useState<TrackedDocument[]>(() => {
    const saved = localStorage.getItem(DOCUMENTS_KEY);
    return saved ? JSON.parse(saved) : defaultDocuments;
  });

  const estimatedCRS = 465;
  const recentCutoff = '470-480';

  // Auto-completed items based on app state (would come from actual app state)
  const autoCompletedItems = {
    'crs-estimated': true,
    'eligibility-confirmed': true,
  };

  const stageConfigs: Record<string, StageConfig> = {
    'get-ready': {
      label: 'Get Ready',
      goal: "You're eligible and allowed to create a profile.",
      checklist: [
        { id: 'crs-estimated', label: 'CRS score estimated', type: 'auto', completed: autoCompletedItems['crs-estimated'], info: 'From CRS calculator' },
        { id: 'eligibility-confirmed', label: 'Eligibility confirmed', type: 'auto', completed: autoCompletedItems['eligibility-confirmed'], info: 'From CRS calculator' },
        { id: 'language-test', label: 'Language test completed', type: 'declared', completed: checklistState['language-test'] || false },
        { id: 'eca', label: 'Educational Credential Assessment (if required)', type: 'declared', completed: checklistState['eca'] || false },
      ],
      exitAction: { label: 'I have my language test & ECA ready', nextStage: 'build-profile' },
    },
    'build-profile': {
      label: 'Build Profile',
      goal: "You're in the Express Entry pool.",
      checklist: [
        { id: 'profile-submitted', label: 'Profile submitted to IRCC', type: 'declared', completed: checklistState['profile-submitted'] || false },
      ],
      exitAction: { label: 'I submitted my profile to IRCC', nextStage: 'wait-invitation' },
    },
    'wait-invitation': {
      label: 'Wait for Invitation',
      goal: 'Stay eligible while waiting.',
      checklist: [
        { id: 'profile-active', label: 'Profile active in IRCC pool', type: 'declared', completed: checklistState['profile-active'] || false },
        { id: 'delay-docs', label: 'Prepare delay-prone documents (police certs, ECA, diplomas, translations)', type: 'declared', completed: checklistState['delay-docs'] || false },
        { id: 'ita-received', label: 'Invitation to Apply (ITA) received', type: 'declared', completed: checklistState['ita-received'] || false },
      ],
      exitAction: { label: 'I received my ITA', nextStage: 'apply-pr' },
    },
    'apply-pr': {
      label: 'Apply for PR',
      goal: 'Submit a complete PR application.',
      checklist: [
        { id: 'forms-completed', label: 'Application forms completed', type: 'declared', completed: checklistState['forms-completed'] || false },
        { id: 'docs-ready', label: 'Supporting documents ready', type: 'declared', completed: checklistState['docs-ready'] || false, info: 'View Document Center' },
        { id: 'pr-submitted', label: 'Application submitted to IRCC', type: 'declared', completed: checklistState['pr-submitted'] || false },
      ],
      exitAction: { label: 'I submitted my PR application', nextStage: 'after-submission' },
    },
    'after-submission': {
      label: 'After Submission',
      goal: 'Stay compliant until decision.',
      checklist: [
        { id: 'medical-exam', label: 'Medical exam completed', type: 'declared', completed: checklistState['medical-exam'] || false },
        { id: 'biometrics', label: 'Biometrics completed', type: 'declared', completed: checklistState['biometrics'] || false },
        { id: 'final-decision', label: 'Final decision received', type: 'declared', completed: checklistState['final-decision'] || false },
      ],
    },
  };

  const stageOrder = ['get-ready', 'build-profile', 'wait-invitation', 'apply-pr', 'after-submission'];
  const currentStageIndex = stageOrder.indexOf(currentStage);
  const currentConfig = stageConfigs[currentStage];

  const toggleChecklistItem = (itemId: string) => {
    const newState = { ...checklistState, [itemId]: !checklistState[itemId] };
    setChecklistState(newState);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(newState));
  };

  const advanceToStage = (newStage: string) => {
    // Save current stage to history with completion date
    const newHistory = [...stageHistory, { stageId: currentStage, completedAt: new Date().toISOString() }];
    setStageHistory(newHistory);
    localStorage.setItem(STAGE_HISTORY_KEY, JSON.stringify(newHistory));
    
    setCurrentStage(newStage);
    localStorage.setItem(STORAGE_KEY, newStage);
    toast.success(`Stage updated to: ${stageConfigs[newStage].label}`);
  };

  const handleMarkDocumentAsHaveIt = (docId: string) => {
    const updatedDocs = documents.map(doc => 
      doc.id === docId ? { ...doc, status: 'have-it' as const } : doc
    );
    setDocuments(updatedDocs);
    localStorage.setItem(DOCUMENTS_KEY, JSON.stringify(updatedDocs));
    toast.success('Document marked as available');
  };

  const handleViewCompletedStage = (stageId: string) => {
    // Navigate to a stage review - for now just show a toast
    const stageLabel = stageConfigs[stageId]?.label || stageId;
    toast.info(`Viewing completed stage: ${stageLabel}`);
    // Could navigate to a detailed view or open a modal
  };

  // Get completed stages for display
  const completedStages = stageHistory.map(entry => ({
    id: entry.stageId,
    label: stageConfigs[entry.stageId]?.label || entry.stageId,
    completedAt: new Date(entry.completedAt),
  }));

  // Check if exit conditions are met
  const canAdvance = () => {
    const checklist = currentConfig.checklist;
    const declaredItems = checklist.filter(item => item.type === 'declared');
    return declaredItems.every(item => checklistState[item.id]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Stage-based Journey Header */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-primary-blue/10 text-primary-blue">
              Current Stage
            </Badge>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {currentConfig.label}
          </h1>
          <p className="text-muted-foreground">
            {currentConfig.goal}
          </p>
          
          {/* Stage progress indicators */}
          <div className="flex items-center gap-2 mt-6">
            {stageOrder.map((stage, index) => (
              <div key={stage} className="flex items-center">
                <div 
                  className={`h-2 w-12 rounded-full transition-colors ${
                    index < currentStageIndex 
                      ? 'bg-green-500' 
                      : index === currentStageIndex 
                        ? 'bg-primary-blue' 
                        : 'bg-muted'
                  }`}
                />
                {index < stageOrder.length - 1 && <div className="w-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Primary Focus Card - only show in build-profile stage */}
        {currentStage === 'build-profile' && (
          <Card className="border-2 border-primary-blue/20 bg-gradient-to-br from-primary-blue/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <Badge className="bg-primary-blue text-white">Your Current Priority</Badge>
                  <h2 className="text-xl font-semibold text-foreground">Complete profile details</h2>
                  <p className="text-muted-foreground max-w-lg">
                    Required to enter the Express Entry pool. Cannot receive ITA until completed.
                  </p>
                  <p className="text-sm text-muted-foreground/80">
                    Most applicants complete this step in one session.
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      ~30-45 minutes
                    </span>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary-blue hover:bg-primary-blue/90"
                  onClick={() => navigate('/dashboard/form')}
                >
                  Continue Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CRS Outlook */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary-blue" />
                CRS Outlook
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Score</p>
                  <p className="text-3xl font-bold text-foreground">~{estimatedCRS}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Recent Cutoffs</p>
                  <p className="text-xl font-medium text-muted-foreground">{recentCutoff}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground border-t border-border pt-4">
                Many applicants at this stage improve their score through language results or additional experience.
              </p>
              <Button 
                variant="outline" 
                className="mt-2"
                onClick={() => navigate('/dashboard/score')}
              >
                Improve my score
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-muted-foreground">Recent Activity</CardTitle>
                <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                  View all
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary-blue rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Profile Updated</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Document Uploaded</p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2" />
                <div>
                  <p className="font-medium text-foreground">Language Test Added</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Stages - show previous steps */}
        {completedStages.length > 0 && (
          <CompletedStages 
            stages={completedStages}
            onViewStage={handleViewCompletedStage}
          />
        )}

        {/* Document Reminder for current stage */}
        <DocumentReminder
          currentStage={currentStage}
          documents={documents}
          onMarkAsHaveIt={handleMarkDocumentAsHaveIt}
        />

        {/* Dynamic Stage Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{currentConfig.label} Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentConfig.checklist.map((item) => (
              <div 
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-muted/30 border-border'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.type === 'auto' ? (
                    <div className="flex items-center justify-center w-5 h-5">
                      {item.completed ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <Info className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  ) : (
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                      className="h-5 w-5"
                    />
                  )}
                  <div>
                    <span className={`font-medium ${item.completed ? 'text-foreground' : 'text-foreground'}`}>
                      {item.label}
                    </span>
                    {item.info && (
                      <p className="text-xs text-muted-foreground">{item.info}</p>
                    )}
                  </div>
                </div>
                {item.completed && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Done</Badge>
                )}
              </div>
            ))}

            {/* Exit action / milestone button */}
            {currentConfig.exitAction && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    <span>Ready to move on?</span>
                  </div>
                  <Button 
                    variant={canAdvance() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => advanceToStage(currentConfig.exitAction!.nextStage)}
                    className={canAdvance() ? 'bg-primary-blue hover:bg-primary-blue/90' : ''}
                  >
                    {currentConfig.exitAction.label}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prepare Ahead - only show in earlier stages */}
        {['get-ready', 'build-profile', 'wait-invitation'].includes(currentStage) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Prepare Ahead</CardTitle>
              <p className="text-sm text-muted-foreground">
                You don't need these yet — starting early helps avoid last-minute delays.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-amber-200 bg-amber-50/30 rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <FileWarning className="h-5 w-5 text-amber-600" />
                    <h4 className="font-medium text-foreground">Police Certificates</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Can take 2-8 weeks depending on country. Required after ITA.
                  </p>
                  <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">High delay risk</Badge>
                </div>
                
                <div className="p-4 border border-border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary-blue" />
                    <h4 className="font-medium text-foreground">Employment Letters</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Reference letters from all past employers. Start requesting now.
                  </p>
                  <Badge variant="outline" className="text-xs">Medium delay risk</Badge>
                </div>
                
                <div className="p-4 border border-border rounded-lg space-y-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-foreground">Proof of Funds</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Bank statements showing settlement funds. Required at submission.
                  </p>
                  <Badge variant="outline" className="text-xs">Low delay risk</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
