import React, { useState } from 'react';
import { 
  ChartBarIcon, 
  FileTextIcon, 
  SearchIcon, 
  FileSearchIcon, 
  ArrowRightIcon, 
  AlertCircleIcon, 
  CheckCircleIcon, 
  LockIcon,
  HomeIcon,
  BookOpenIcon,
  GraduationCapIcon,
  FileIcon,
  CalendarIcon,
  ComputerIcon,
  PlaneIcon
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from '@/components/ui/sidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('score');

  // Mock data
  const userScore = 490;
  const percentile = 97; // Top 3%
  const estimatedTimeline = '6-8 months';
  
  const handlePremiumFeatureClick = () => {
    toast.error("This feature requires a premium subscription");
  };

  // Journey Steps data
  const journeySteps = [
    { name: 'Complete your profile', platform: 'Eldo', completed: true, isFree: true },
    { name: 'Assess your eligibility', platform: 'Eldo', completed: true, isFree: true },
    { name: 'Scan your documents', platform: 'Eldo', completed: false, isFree: 'limited' },
    { name: 'Create an Express Entry profile', platform: 'Chrome Extension (IRCC)', completed: false, isFree: false },
    { name: 'ITA Received', platform: 'IRCC Website', completed: false, isFree: true },
    { name: 'Complete application form', platform: 'Chrome Extension (IRCC)', completed: false, isFree: false },
    { name: 'Application Submitted', platform: 'IRCC Website', completed: false, isFree: true },
    { name: 'IRCC Decision', platform: 'IRCC Website', completed: false, isFree: true },
    { name: 'Submit biometrics', platform: 'IRCC Website', completed: false, isFree: true },
    { name: 'Confirmation of Permanent Residence (CoPR)', platform: 'IRCC Website', completed: false, isFree: true },
    { name: 'Permanent Residence Card Activation', platform: 'IRCC Website', completed: false, isFree: true }
  ];
  
  const currentStep = 2; // 0-indexed

  // Navigation items
  const navItems = [
    { name: 'Score Assessment', icon: ChartBarIcon, value: 'score', isFree: true },
    { name: 'Document Center', icon: FileSearchIcon, value: 'scanning', isFree: 'limited' },
    { name: 'Express Entry Profile', icon: FileTextIcon, value: 'form1', isFree: false },
    { name: 'Complete Application', icon: FileTextIcon, value: 'form2', isFree: false },
    { name: 'Application Tracker', icon: SearchIcon, value: 'tracker', isFree: false },
  ];

  const getNavIcon = (itemValue) => {
    switch (itemValue) {
      case 'score':
        return <ChartBarIcon className="h-5 w-5" />;
      case 'scanning':
        return <FileSearchIcon className="h-5 w-5" />;
      case 'form1':
        return <FileIcon className="h-5 w-5" />;
      case 'form2':
        return <FileTextIcon className="h-5 w-5" />;
      case 'tracker':
        return <SearchIcon className="h-5 w-5" />;
      default:
        return <ChartBarIcon className="h-5 w-5" />;
    }
  };

  const getPlatformBadge = (platform) => {
    if (platform.includes('Eldo')) {
      return 'bg-eldo-blue/20 text-eldo-blue';
    } else if (platform.includes('Chrome')) {
      return 'bg-eldo-purple/20 text-eldo-purple';
    } else {
      return 'bg-gray-200 text-gray-700';
    }
  };

  const getPlatformIcon = (platform) => {
    if (platform.includes('Eldo')) {
      return <HomeIcon className="h-3 w-3 mr-1" />;
    } else if (platform.includes('Chrome')) {
      return <ComputerIcon className="h-3 w-3 mr-1" />;
    } else {
      return <GraduationCapIcon className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full pt-16">
          <Sidebar side="left" variant="sidebar">
            <SidebarHeader className="flex items-center justify-between p-4 bg-white border-b">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">Express Entry</span>
                <span className="text-xs text-gray-500">Immigration Dashboard</span>
              </div>
              <SidebarTrigger />
            </SidebarHeader>
            
            <SidebarContent className="py-4">
              <div className="px-4 mb-4">
                <div className="text-xs uppercase font-semibold text-gray-500 mb-2 tracking-wider">Journey Progress</div>
                <Progress value={((currentStep + 1) / journeySteps.length) * 100} className="h-1.5 mb-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Step {currentStep + 1}/{journeySteps.length}</span>
                  <span>{Math.round((currentStep + 1) / journeySteps.length * 100)}% Complete</span>
                </div>
              </div>
              
              <div className="mb-6 px-4">
                <div className="text-xs uppercase font-semibold text-gray-500 mb-3 tracking-wider">Navigation</div>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.value}>
                      <SidebarMenuButton 
                        isActive={activeTab === item.value} 
                        onClick={() => setActiveTab(item.value)}
                        className="relative"
                      >
                        {getNavIcon(item.value)}
                        <span>{item.name}</span>
                        {item.isFree === false && (
                          <span className="absolute right-2 text-[10px] bg-eldo-purple text-white rounded-full px-1.5 py-0.5 flex items-center">
                            Premium
                          </span>
                        )}
                        {item.isFree === 'limited' && (
                          <span className="absolute right-2 text-[10px] bg-amber-500 text-white rounded-full px-1.5 py-0.5 flex items-center">
                            Limited
                          </span>
                        )}
                        {item.isFree === true && (
                          <span className="absolute right-2 text-[10px] bg-green-500 text-white rounded-full px-1.5 py-0.5 flex items-center">
                            Free
                          </span>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </div>
              
              <div className="px-4">
                <div className="text-xs uppercase font-semibold text-gray-500 mb-3 tracking-wider">Journey Steps</div>
                <div className="space-y-1 mb-2">
                  {journeySteps.map((step, index) => (
                    <div key={index} 
                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                        index === currentStep ? 'bg-blue-50 border border-blue-100' : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed ? 'bg-green-100 text-green-600' : 
                        index === currentStep ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircleIcon className="w-3 h-3" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-xs truncate">{step.name}</p>
                          {!step.isFree && (
                            <LockIcon className="w-3 h-3 text-eldo-purple flex-shrink-0" />
                          )}
                        </div>
                        <div className={`text-[10px] mt-0.5 px-1.5 py-0.5 rounded-sm inline-flex items-center ${getPlatformBadge(step.platform)}`}>
                          {getPlatformIcon(step.platform)}
                          <span>{step.platform}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t bg-white mt-auto">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Free Plan</p>
                  <p className="text-xs text-gray-500">3 of 11 steps free</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs border-eldo-purple text-eldo-purple hover:bg-eldo-purple/10" onClick={handlePremiumFeatureClick}>
                  Upgrade
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="flex-1 p-6 overflow-auto">
              {/* Main Dashboard Content - Tab panels */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="score">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>CRS Score Assessment</CardTitle>
                        <CardDescription>
                          Complete the questionnaire to calculate your Comprehensive Ranking System (CRS) points
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="bg-gray-100 rounded-lg p-6">
                            <h3 className="font-medium mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Age</p>
                                <p className="font-medium">32 years</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Education</p>
                                <p className="font-medium">Master's Degree</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">First Language</p>
                                <p className="font-medium">English (CLB 9)</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-500">Work Experience</p>
                                <p className="font-medium">5+ years</p>
                              </div>
                            </div>
                            <Button className="mt-4 bg-eldo-blue hover:bg-eldo-blue/90">
                              Update Information
                            </Button>
                          </div>

                          <div>
                            <h3 className="font-medium mb-3">Are you currently in Canada?</h3>
                            <div className="flex items-center space-x-4">
                              <Button variant="outline" className="border-eldo-blue text-eldo-blue hover:bg-eldo-blue/10">Yes</Button>
                              <Button variant="outline" className="border-eldo-blue text-eldo-blue hover:bg-eldo-blue/10">No</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <p className="text-sm text-gray-500">
                          Based on your answers, we've calculated your CRS score. <a href="#" className="text-eldo-blue underline">Learn how scores are calculated</a>
                        </p>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Your Results</CardTitle>
                        <CardDescription>
                          Based on your profile information
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-eldo-blue mb-2">Your points: {userScore}</div>
                          <div className="text-sm text-gray-500 mb-4">
                            You're in the top {percentile}% of applicants
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                            <div className="bg-eldo-blue h-2.5 rounded-full" style={{ width: `${percentile}%` }}></div>
                          </div>
                          <p className="text-sm font-medium text-gray-600">
                            Latest draw: 488 points
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Your chances:</h4>
                            <span className="text-green-600 font-medium">Excellent</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Estimated timeline:</h4>
                            <span className="font-medium">{estimatedTimeline}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-eldo-blue hover:bg-eldo-blue/90" onClick={() => setActiveTab('scanning')}>
                          Next Steps <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="scanning">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle>Document Center</CardTitle>
                        <CardDescription>
                          Upload your documents for verification and automatic form filling
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                          <p className="text-sm text-amber-700 flex items-start gap-2">
                            <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                            <span>Free plan includes scanning of 1 document. Upgrade to Premium for unlimited document scanning.</span>
                          </p>
                        </div>
                        
                        <div className="space-y-6">
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <div className="mx-auto w-12 h-12 rounded-full bg-eldo-blue/10 flex items-center justify-center mb-4">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eldo-blue">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                              </svg>
                            </div>
                            <h3 className="text-lg font-medium mb-2">Drag and drop your documents</h3>
                            <p className="text-gray-500 mb-4">or click to browse files (PDF, JPG, PNG)</p>
                            <Button className="bg-eldo-blue hover:bg-eldo-blue/90">Upload Documents</Button>
                          </div>

                          <div>
                            <h3 className="font-medium mb-4">Required Documents</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                                  <span>Passport</span>
                                </div>
                                <span className="text-sm text-green-500">Verified</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-3" />
                                  <span>Educational Certificates</span>
                                </div>
                                <span className="text-sm text-amber-500">Pending</span>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-3" />
                                  <span>Language Test Results</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-amber-500 mr-2">Pending</span>
                                  <LockIcon className="w-4 h-4 text-eldo-purple" />
                                </div>
                              </div>
                              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center">
                                  <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-3" />
                                  <span>Work Experience Letters</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-sm text-amber-500 mr-2">Pending</span>
                                  <LockIcon className="w-4 h-4 text-eldo-purple" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Document Features</CardTitle>
                        <CardDescription>Services to simplify your application</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Basic Document Scan</h4>
                              <p className="text-sm text-gray-500">One free document scan included</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 opacity-60">
                            <LockIcon className="w-5 h-5 text-eldo-purple flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Unlimited Scanning</h4>
                              <p className="text-sm text-gray-500">Scan all your documents</p>
                              <span className="text-xs text-eldo-purple font-medium">Premium Feature</span>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3 opacity-60">
                            <LockIcon className="w-5 h-5 text-eldo-purple flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium">Auto-fill Forms</h4>
                              <p className="text-sm text-gray-500">Your document data is automatically extracted</p>
                              <span className="text-xs text-eldo-purple font-medium">Premium Feature</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" variant="outline" onClick={handlePremiumFeatureClick}>
                          Upgrade to Premium
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="form1">
                  <div className="bg-white rounded-lg shadow-md p-10 text-center">
                    <div className="w-16 h-16 bg-eldo-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                      <LockIcon className="w-8 h-8 text-eldo-purple" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Create your Express Entry profile with our Chrome Extension that automatically fills IRCC forms with your data.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" className="border-eldo-purple text-eldo-purple hover:bg-eldo-purple/10"
                        onClick={handlePremiumFeatureClick}>
                        Upgrade to Premium
                      </Button>
                      <Button className="bg-eldo-blue hover:bg-eldo-blue/90"
                        onClick={() => setActiveTab('score')}>
                        Back to Score Assessment
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="form2">
                  <div className="bg-white rounded-lg shadow-md p-10 text-center">
                    <div className="w-16 h-16 bg-eldo-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                      <LockIcon className="w-8 h-8 text-eldo-purple" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Complete your application forms after receiving your ITA with our Chrome Extension to automate form filling on the IRCC website.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" className="border-eldo-purple text-eldo-purple hover:bg-eldo-purple/10"
                        onClick={handlePremiumFeatureClick}>
                        Upgrade to Premium
                      </Button>
                      <Button className="bg-eldo-blue hover:bg-eldo-blue/90"
                        onClick={() => setActiveTab('score')}>
                        Back to Score Assessment
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tracker">
                  <div className="bg-white rounded-lg shadow-md p-10 text-center">
                    <div className="w-16 h-16 bg-eldo-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                      <LockIcon className="w-8 h-8 text-eldo-purple" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                      Track your application progress with detailed timeline and receive notifications about your application status.
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button variant="outline" className="border-eldo-purple text-eldo-purple hover:bg-eldo-purple/10"
                        onClick={handlePremiumFeatureClick}>
                        Upgrade to Premium
                      </Button>
                      <Button className="bg-eldo-blue hover:bg-eldo-blue/90"
                        onClick={() => setActiveTab('score')}>
                        Back to Score Assessment
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
