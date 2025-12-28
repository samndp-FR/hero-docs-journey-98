import { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowRight,
  Clock,
  CheckCircle,
  TrendingUp,
  FileWarning,
  Briefcase,
  Wallet,
  Info,
  Flag,
  ClipboardCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { toast } from 'sonner';
import DocumentReminder, { TrackedDocument } from '@/components/DocumentReminder';

const STORAGE_KEY = 'eldo-journey-stage';
const CHECKLIST_KEY = 'eldo-checklist-state';
const CHECKLIST_DATES_KEY = 'eldo-checklist-dates';
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

  const [checklistDates, setChecklistDates] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(CHECKLIST_DATES_KEY);
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

  // State for viewing a past stage
  const [viewingStage, setViewingStage] = useState<string | null>(null);

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
      label: 'Wait for IRCC Response',
      goal: 'Track your application status and respond to requests.',
      checklist: [
        { id: 'more-info-required', label: 'More information required', type: 'declared', completed: checklistState['more-info-required'] || false },
        { id: 'medical-exam-required', label: 'Medical Exam required', type: 'declared', completed: checklistState['medical-exam-required'] || false },
        { id: 'biometrics-required', label: 'Biometrics Required', type: 'declared', completed: checklistState['biometrics-required'] || false },
        { id: 'medical-exam-completed', label: 'Medical Exam Completed', type: 'declared', completed: checklistState['medical-exam-completed'] || false },
        { id: 'biometrics-completed', label: 'Biometrics Completed', type: 'declared', completed: checklistState['biometrics-completed'] || false },
        { id: 'final-decision', label: 'Final decision received', type: 'declared', completed: checklistState['final-decision'] || false },
      ],
    },
  };

  const stageOrder = ['get-ready', 'build-profile', 'wait-invitation', 'apply-pr', 'after-submission'];
  const currentStageIndex = stageOrder.indexOf(currentStage);
  
  // Use viewingStage if set, otherwise currentStage
  const displayedStage = viewingStage || currentStage;
  const displayedConfig = stageConfigs[displayedStage];
  const isViewingPast = viewingStage !== null && viewingStage !== currentStage;

  const toggleChecklistItem = (itemId: string) => {
    const wasCompleted = checklistState[itemId];
    const newState = { ...checklistState, [itemId]: !wasCompleted };
    setChecklistState(newState);
    localStorage.setItem(CHECKLIST_KEY, JSON.stringify(newState));
    
    // Track completion date
    if (!wasCompleted) {
      const newDates = { ...checklistDates, [itemId]: new Date().toISOString() };
      setChecklistDates(newDates);
      localStorage.setItem(CHECKLIST_DATES_KEY, JSON.stringify(newDates));
    }
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

  const handleBackToCurrentStage = () => {
    setViewingStage(null);
  };

  // Get completion date for a stage
  const getStageCompletionDate = (stageId: string) => {
    const entry = stageHistory.find(h => h.stageId === stageId);
    return entry ? new Date(entry.completedAt) : null;
  };

  // Check if exit conditions are met
  const canAdvance = () => {
    const checklist = displayedConfig.checklist;
    const declaredItems = checklist.filter(item => item.type === 'declared');
    return declaredItems.every(item => checklistState[item.id]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Stage-based Journey Header with Integrated Timeline */}
        <div className="bg-card rounded-xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className={isViewingPast ? "bg-green-100 text-green-700" : "bg-primary-blue/10 text-primary-blue"}>
              {isViewingPast ? 'Viewing Past Stage' : 'Current Stage'}
            </Badge>
            {isViewingPast && (
              <Button variant="ghost" size="sm" onClick={handleBackToCurrentStage} className="text-primary-blue">
                ← Back to current
              </Button>
            )}
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            {displayedConfig.label}
          </h1>
          <p className="text-muted-foreground">
            {displayedConfig.goal}
          </p>
          {isViewingPast && getStageCompletionDate(displayedStage) && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Completed on {format(getStageCompletionDate(displayedStage)!, 'MMMM d, yyyy')}
            </p>
          )}
          
          {/* Visual Progress Bar with Dots */}
          <div className="mt-6 pt-4 border-t border-border">
            {/* Progress bar with connected dots */}
            <div className="relative mb-4">
              {/* Background line */}
              <div className="absolute top-3 left-0 right-0 h-0.5 bg-muted" />
              {/* Progress line */}
              <div 
                className="absolute top-3 left-0 h-0.5 bg-green-500 transition-all"
                style={{ width: `${(currentStageIndex / (stageOrder.length - 1)) * 100}%` }}
              />
              
              {/* Dots */}
              <div className="relative flex justify-between">
              {stageOrder.map((stage, index) => {
                  const historyEntry = stageHistory.find(h => h.stageId === stage);
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  const isFuture = index > currentStageIndex;
                  
                  // Find the latest checklist item completion date for this stage
                  const stageChecklist = stageConfigs[stage]?.checklist || [];
                  const stageChecklistDates = stageChecklist
                    .map(item => checklistDates[item.id])
                    .filter(Boolean)
                    .map(d => new Date(d))
                    .sort((a, b) => b.getTime() - a.getTime());
                  const lastChecklistDate = stageChecklistDates[0];
                  
                  return (
                    <button
                      key={stage}
                      onClick={() => {
                        if (isCompleted) setViewingStage(stage);
                        else if (isCurrent) setViewingStage(null);
                      }}
                      disabled={isFuture}
                      className={`flex flex-col items-center ${!isFuture ? 'cursor-pointer' : 'cursor-default'} ${
                        isFuture ? 'opacity-30' : ''
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        viewingStage === stage
                          ? 'ring-4 ring-green-200'
                          : ''
                      } ${
                        isCompleted 
                          ? 'bg-green-500 hover:bg-green-600' 
                          : isCurrent 
                            ? 'bg-primary-blue hover:bg-primary-blue/80' 
                            : 'bg-muted/50 border-2 border-dashed border-muted-foreground/20'
                      }`}>
                        {isCompleted && <CheckCircle className="h-4 w-4 text-white" />}
                        {isCurrent && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <span className={`text-xs mt-2 font-medium text-center max-w-[80px] ${
                        isFuture ? 'text-muted-foreground/30' : 'text-foreground'
                      }`}>
                        {stageConfigs[stage].label}
                      </span>
                      <span className={`text-xs font-medium ${
                        isCompleted ? 'text-green-600' : isCurrent ? 'text-primary-blue' : 'text-muted-foreground/30'
                      }`}>
                        {lastChecklistDate 
                          ? format(lastChecklistDate, 'MMM yyyy')
                          : isCurrent 
                            ? 'In Progress' 
                            : ''
                        }
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Estimated time remaining - hide for final stage */}
            {currentStageIndex < 4 && (
              <div className="flex items-center justify-between text-sm mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Estimated time to PR:</span>
                </div>
                <span className="font-medium text-foreground">
                  {currentStageIndex === 0 ? '8-14 months' : 
                   currentStageIndex === 1 ? '6-12 months' : 
                   currentStageIndex === 2 ? '4-10 months' : 
                   currentStageIndex === 3 ? '2-6 months' : ''}
                </span>
              </div>
            )}
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

        {/* Pre-Application Card - only show in apply-pr stage */}
        {currentStage === 'apply-pr' && (
          <Card className="border-2 border-primary-blue/20 bg-gradient-to-br from-primary-blue/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-primary-blue" />
                    <h2 className="text-xl font-semibold text-foreground">Complete & Verify Pre-Application</h2>
                  </div>
                  <p className="text-muted-foreground">
                    Review and verify all your profile information before submitting your PR application.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Profile completion</span>
                      <span className="font-medium text-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-primary-blue hover:bg-primary-blue/90 shrink-0"
                  onClick={() => navigate('/dashboard/form')}
                >
                  Review Profile
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CRS Score reminder - small inline badge for apply-pr and after - outside grid */}
        {['apply-pr', 'after-submission'].includes(displayedStage) && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-blue/10 rounded-md border border-primary-blue/20 text-sm">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-muted-foreground">CRS:</span>
            <span className="font-medium text-foreground">~{estimatedCRS}</span>
          </div>
        )}

        <div className={`grid gap-6 ${['get-ready', 'build-profile', 'wait-invitation'].includes(displayedStage) ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {/* CRS Outlook - full card until wait-invitation */}
          {['get-ready', 'build-profile', 'wait-invitation'].includes(displayedStage) && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-primary-blue" />
                  CRS Outlook
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Score</p>
                    <p className="text-4xl font-bold text-foreground">~{estimatedCRS}</p>
                  </div>
                  <div className="h-16 w-px bg-border" />
                  <div>
                    <p className="text-sm text-muted-foreground">Recent Cutoff</p>
                    <p className="text-2xl font-semibold text-muted-foreground">{recentCutoff}</p>
                  </div>
                  <div className="h-16 w-px bg-border" />
                  <div>
                    <p className="text-sm text-muted-foreground">Competitiveness</p>
                    <div className="flex items-center gap-2 mt-1">
                      {estimatedCRS >= parseInt(recentCutoff.replace(/[^\d]/g, '').slice(0, 3)) ? (
                        <>
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <span className="text-lg font-medium text-green-600">Competitive</span>
                        </>
                      ) : estimatedCRS >= parseInt(recentCutoff.replace(/[^\d]/g, '').slice(0, 3)) - 20 ? (
                        <>
                          <div className="w-3 h-3 rounded-full bg-yellow-500" />
                          <span className="text-lg font-medium text-yellow-600">Close</span>
                        </>
                      ) : (
                        <>
                          <div className="w-3 h-3 rounded-full bg-red-500" />
                          <span className="text-lg font-medium text-red-600">Needs Improvement</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard/score')}
                  >
                    See details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

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

        {/* Document Reminder for current stage - hide for after-submission */}
        {displayedStage !== 'after-submission' && (
          <DocumentReminder
            currentStage={displayedStage}
            documents={documents}
            onMarkAsHaveIt={handleMarkDocumentAsHaveIt}
          />
        )}

        {/* Dynamic Stage Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{displayedConfig.label} Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {displayedConfig.checklist.map((item) => (
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
                    {item.completed && checklistDates[item.id] && (
                      <p className="text-xs text-green-600">
                        Completed {format(new Date(checklistDates[item.id]), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                </div>
                {item.completed && (
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Done</Badge>
                )}
              </div>
            ))}

            {/* Exit action / milestone button - only show on current stage */}
            {!isViewingPast && displayedConfig.exitAction && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flag className="h-4 w-4" />
                    <span>Ready to move on?</span>
                  </div>
                  <Button 
                    variant={canAdvance() ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => advanceToStage(displayedConfig.exitAction!.nextStage)}
                    className={canAdvance() ? 'bg-primary-blue hover:bg-primary-blue/90' : ''}
                  >
                    {displayedConfig.exitAction.label}
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
