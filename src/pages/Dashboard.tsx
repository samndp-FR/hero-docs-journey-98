
import React, { useState } from 'react';
import { ChartBarIcon, FileTextIcon, SearchIcon, FileSearchIcon, ArrowRightIcon, AlertCircleIcon, CheckCircleIcon, LockIcon } from 'lucide-react';
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
  SidebarInset
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm py-4 px-6 fixed top-0 left-0 right-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-smokum text-3xl text-primary-blue mr-8">Eldo</span>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Express Entry Journey</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium hidden md:block">John Smith</span>
            <div className="h-9 w-9 rounded-full bg-eldo-blue text-white flex items-center justify-center">
              JS
            </div>
          </div>
        </div>
      </header>

      <SidebarProvider defaultOpen={true}>
        <div className="flex w-full pt-16">
          <Sidebar side="left" variant="sidebar">
            <SidebarHeader className="flex items-center justify-between p-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Express Entry</span>
                <span className="text-xs text-gray-500">Dashboard</span>
              </div>
              <SidebarTrigger />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.value}>
                    <SidebarMenuButton 
                      isActive={activeTab === item.value} 
                      onClick={() => setActiveTab(item.value)}
                      className="relative"
                    >
                      <item.icon className="mr-2" />
                      <span>{item.name}</span>
                      {item.isFree === false && (
                        <span className="absolute right-2 text-xs bg-eldo-purple text-white rounded-full px-2 py-0.5">
                          Premium
                        </span>
                      )}
                      {item.isFree === 'limited' && (
                        <span className="absolute right-2 text-xs bg-amber-500 text-white rounded-full px-2 py-0.5">
                          Limited
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            
            <SidebarFooter className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium">Free Plan</p>
                  <p className="text-xs text-gray-500">Upgrade for premium features</p>
                </div>
                <Button variant="outline" size="sm" className="text-xs border-eldo-purple text-eldo-purple" onClick={handlePremiumFeatureClick}>
                  Upgrade
                </Button>
              </div>
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="flex-1 p-6">
              {/* Journey Progress */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-4">Your Express Entry Journey</h2>
                  <Progress value={((currentStep + 1) / journeySteps.length) * 100} className="h-2 mb-4" />
                </div>
                
                {/* Journey Steps */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {journeySteps.map((step, index) => (
                    <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${index === currentStep ? 'bg-blue-50 border border-blue-200' : ''}`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed ? 'bg-green-100 text-green-600' : 
                        index === currentStep ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircleIcon className="w-4 h-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="font-medium text-sm">{step.name}</p>
                          {!step.isFree && (
                            <LockIcon className="w-3 h-3 text-eldo-purple" />
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            step.platform.includes('Eldo') ? 'bg-eldo-blue/20 text-eldo-blue' : 
                            step.platform.includes('Chrome') ? 'bg-eldo-purple/20 text-eldo-purple' : 
                            'bg-gray-200 text-gray-700'
                          }`}>
                            {step.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Dashboard Content - Tab panels */}
              <TabsContent value="score" className={activeTab === "score" ? "block" : "hidden"}>
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

              <TabsContent value="scanning" className={activeTab === "scanning" ? "block" : "hidden"}>
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

              <TabsContent value="form1" className={activeTab === "form1" ? "block" : "hidden"}>
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

              <TabsContent value="form2" className={activeTab === "form2" ? "block" : "hidden"}>
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

              <TabsContent value="tracker" className={activeTab === "tracker" ? "block" : "hidden"}>
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
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
