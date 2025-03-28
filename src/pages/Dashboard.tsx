
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, FileTextIcon, SearchIcon, ChartBarIcon, FileSearchIcon, ArrowRightIcon, AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('score');

  // Mock data
  const userScore = 490;
  const percentile = 97; // Top 3%
  const estimatedTimeline = '6-8 months';
  const currentStep = 2; // 1: Profile Created, 2: Documents Submitted, 3: ITA Received, 4: Application Submitted, 5: PR Approved
  const applicationProgress = (currentStep / 5) * 100;
  
  const handlePremiumFeatureClick = () => {
    toast.error("This feature requires a premium subscription");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm py-4 px-6 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-smokum text-3xl text-primary-blue mr-8">Eldo</span>
            <h1 className="text-2xl font-bold text-gray-800">Express Entry Dashboard</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="border-eldo-blue text-eldo-blue hover:bg-eldo-blue/10"
          >
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {/* Overall Progress */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">Your Express Entry Journey</h2>
            <span className="text-sm text-eldo-dark/60">Step {currentStep} of 5</span>
          </div>
          <Progress value={applicationProgress} className="h-2 mb-4" />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>Profile Creation</span>
            <span>Document Submission</span>
            <span>ITA Received</span>
            <span>Application Submitted</span>
            <span>PR Approved</span>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="score" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="score" className="data-[state=active]:bg-eldo-blue data-[state=active]:text-white">
              <ChartBarIcon className="w-4 h-4 mr-2" />
              Score Assessment
            </TabsTrigger>
            <TabsTrigger value="scanning" className="data-[state=active]:bg-eldo-blue data-[state=active]:text-white">
              <FileSearchIcon className="w-4 h-4 mr-2" />
              Intelligent Scanning
            </TabsTrigger>
            <TabsTrigger value="form1" className="data-[state=active]:bg-eldo-blue data-[state=active]:text-white">
              <FileTextIcon className="w-4 h-4 mr-2" />
              Application Form #1
            </TabsTrigger>
            <TabsTrigger value="form2" className="data-[state=active]:bg-eldo-blue data-[state=active]:text-white relative">
              <LockIcon className="w-4 h-4 mr-2" />
              Application Form #2
              <span className="absolute -top-1 -right-1 bg-eldo-purple text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                🔒
              </span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="data-[state=active]:bg-eldo-blue data-[state=active]:text-white">
              <SearchIcon className="w-4 h-4 mr-2" />
              Application Tracker
            </TabsTrigger>
          </TabsList>

          {/* Score Assessment Content */}
          <TabsContent value="score" className="mt-0">
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
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                            <line x1="12" y1="19" x2="12" y2="22"></line>
                          </svg>
                        </div>
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

          {/* Intelligent Scanning Content */}
          <TabsContent value="scanning" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Intelligent Document Scanning</CardTitle>
                  <CardDescription>
                    Upload your documents for verification and automatic form filling
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                          <span className="text-sm text-amber-500">Pending</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <AlertCircleIcon className="w-5 h-5 text-amber-500 mr-3" />
                            <span>Work Experience Letters</span>
                          </div>
                          <span className="text-sm text-amber-500">Pending</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scanning Features</CardTitle>
                  <CardDescription>Premium features to simplify your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Auto-fill Application Forms</h4>
                        <p className="text-sm text-gray-500">Your document data is automatically extracted and filled into forms</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Document Verification</h4>
                        <p className="text-sm text-gray-500">We validate your documents against IRCC requirements</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 opacity-60">
                      <LockIcon className="w-5 h-5 text-eldo-purple flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Translation Services</h4>
                        <p className="text-sm text-gray-500">Automatic translation for non-English documents</p>
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

          {/* Application Form #1 Content */}
          <TabsContent value="form1" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Express Entry Profile Form</CardTitle>
                  <CardDescription>
                    Complete your Express Entry profile to enter the pool of candidates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Note:</strong> This is a simulation of the actual IRCC form for practice purposes. Your information will be saved and can be used to auto-fill the official form later.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Form Sections</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                            <span>Personal Information</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-eldo-blue">Edit</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                            <span>Contact Details</span>
                          </div>
                          <Button size="sm" variant="ghost" className="text-eldo-blue">Edit</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-eldo-blue/5 rounded-lg border border-eldo-blue">
                          <div className="flex items-center">
                            <AlertCircleIcon className="w-5 h-5 text-eldo-blue mr-3" />
                            <span>Education History</span>
                          </div>
                          <Button size="sm" className="bg-eldo-blue hover:bg-eldo-blue/90">Continue</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
                          <div className="flex items-center">
                            <AlertCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <span>Work Experience</span>
                          </div>
                          <Button size="sm" variant="ghost" disabled>Start</Button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg opacity-60">
                          <div className="flex items-center">
                            <AlertCircleIcon className="w-5 h-5 text-gray-400 mr-3" />
                            <span>Language Proficiency</span>
                          </div>
                          <Button size="sm" variant="ghost" disabled>Start</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-eldo-blue hover:bg-eldo-blue/90">Continue to Education History</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Form Completion</CardTitle>
                  <CardDescription>Track your progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto">
                      <svg className="w-full h-full" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="#e6e6e6" strokeWidth="2"></circle>
                        <circle
                          cx="18" cy="18" r="16"
                          fill="none" stroke="#1EAEDB"
                          strokeWidth="2"
                          strokeDasharray="100"
                          strokeDashoffset="60"
                          strokeLinecap="round"
                          style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">40%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Form Completion</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Estimated Time Remaining:</h4>
                    <p className="text-lg font-bold">20 minutes</p>
                  </div>

                  <div>
                    <Button className="w-full" variant="outline" onClick={() => toast("Your form progress was autosaved")}>
                      Save and Continue Later
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Application Form #2 Content (Premium/Locked) */}
          <TabsContent value="form2" className="mt-0">
            <div className="bg-white rounded-lg shadow-md p-10 text-center">
              <div className="w-16 h-16 bg-eldo-purple/10 rounded-full mx-auto flex items-center justify-center mb-4">
                <LockIcon className="w-8 h-8 text-eldo-purple" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                Application Form #2 is available after receiving your Invitation to Apply (ITA) or with a Premium subscription.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" className="border-eldo-purple text-eldo-purple hover:bg-eldo-purple/10"
                  onClick={handlePremiumFeatureClick}>
                  Upgrade to Premium
                </Button>
                <Button className="bg-eldo-blue hover:bg-eldo-blue/90"
                  onClick={() => setActiveTab('tracker')}>
                  Track Your Application
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Application Tracker Content */}
          <TabsContent value="tracker" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Application Tracker</CardTitle>
                  <CardDescription>
                    Track your Express Entry application progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pb-12">
                    {/* Timeline steps */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="relative pl-20 pb-8">
                      <div className="absolute left-0 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold">Profile Created</h3>
                      <p className="text-gray-500 mb-2">Aug 12, 2023</p>
                      <p className="text-sm">Your Express Entry profile has been successfully created and submitted to the candidate pool.</p>
                    </div>
                    
                    <div className="relative pl-20 pb-8">
                      <div className="absolute left-0 w-16 h-16 bg-eldo-blue/20 rounded-full flex items-center justify-center">
                        <CheckCircleIcon className="w-6 h-6 text-eldo-blue" />
                      </div>
                      <h3 className="text-lg font-semibold">Documents Submitted</h3>
                      <p className="text-gray-500 mb-2">Aug 25, 2023</p>
                      <p className="text-sm">Your documents have been uploaded, verified and are ready for review when you receive an ITA.</p>
                    </div>
                    
                    <div className="relative pl-20 pb-8">
                      <div className="absolute left-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-400">Waiting for ITA</h3>
                      <p className="text-gray-500 mb-2">Estimated: Oct 15, 2023</p>
                      <p className="text-sm text-gray-400">Based on your CRS score of 490, you're likely to receive an Invitation to Apply in the next draw.</p>
                    </div>
                    
                    <div className="relative pl-20 opacity-50">
                      <div className="absolute left-0 w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-400">Application Submission</h3>
                      <p className="text-gray-500 mb-2">After ITA</p>
                      <p className="text-sm text-gray-400">Once you receive an ITA, you'll have 60 days to submit your complete application.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Details</CardTitle>
                  <CardDescription>Summary and important dates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Express Entry Profile</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Profile ID:</span>
                        <span className="font-medium">E-12345678</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Submission Date:</span>
                        <span className="font-medium">Aug 12, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CRS Score:</span>
                        <span className="font-medium">490 points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Next Steps</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        Monitor upcoming Express Entry draws. With your current score, you have an excellent chance of receiving an ITA in the next draw.
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Latest Express Entry Draw</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">Sept 27, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Minimum Score:</span>
                        <span className="font-medium">488 points</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">ITAs Issued:</span>
                        <span className="font-medium">3,500</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-eldo-blue hover:bg-eldo-blue/90"
                    onClick={() => window.open('#', '_blank')}>
                    View Express Entry Draws
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
