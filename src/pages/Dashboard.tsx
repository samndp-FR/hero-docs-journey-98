import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileWarning,
  Briefcase,
  Wallet,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [completedOpen, setCompletedOpen] = useState(false);

  // Mock data - in a real app this would come from state/API
  const currentStage = 'build-profile';
  const estimatedCRS = 465;
  const recentCutoff = '470-480';

  const stages = {
    'get-ready': { label: 'Get Ready', description: 'Preparing eligibility and prerequisites' },
    'build-profile': { label: 'Build Profile', description: 'You\'ve completed eligibility. Completing your profile allows you to enter the Express Entry pool.' },
    'wait-invitation': { label: 'Wait for Invitation', description: 'Profile submitted, awaiting ITA' },
    'apply-pr': { label: 'Apply for PR', description: 'ITA received, complete your PR application' },
    'after-submission': { label: 'After Submission', description: 'Application submitted, awaiting decision' },
  };

  const stageOrder = ['get-ready', 'build-profile', 'wait-invitation', 'apply-pr', 'after-submission'];
  const currentStageIndex = stageOrder.indexOf(currentStage);

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
            {stages[currentStage as keyof typeof stages].label}
          </h1>
          <p className="text-muted-foreground">
            {stages[currentStage as keyof typeof stages].description}
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

        {/* Primary Focus Card */}
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

          {/* Recent Activity (demoted) */}
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

        {/* Stage Checklist */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Build Profile Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Action needed - always visible */}
            <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="font-medium text-foreground">Profile details incomplete</span>
              </div>
              <Badge variant="outline" className="border-amber-300 text-amber-700">Action needed</Badge>
            </div>
            
            {/* Completed items - collapsed by default */}
            <Collapsible open={completedOpen} onOpenChange={setCompletedOpen}>
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2 w-full">
                  <ChevronDown className={`h-4 w-4 transition-transform ${completedOpen ? 'rotate-180' : ''}`} />
                  <span>Completed (2)</span>
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-foreground">Eligibility confirmed</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Done</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-foreground">Language test added</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Done</Badge>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>

        {/* Prepare Ahead */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Prepare Ahead</CardTitle>
            <p className="text-sm text-muted-foreground">
              You don't need these yet — starting early helps avoid last-minute delays.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sorted by risk: High → Medium → Low */}
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
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
