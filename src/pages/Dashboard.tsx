
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Calculator, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Trophy,
  Target,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-pale-blue">
      <Header />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 space-y-8">
          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to Your Express Entry Journey</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Track your progress, manage your application, and get ready for your move to Canada.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/crs-assessment')}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Calculator className="h-8 w-8 text-primary-blue" />
                  <Badge variant="secondary">New</Badge>
                </div>
                <CardTitle className="text-lg">CRS Score Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Calculate your Comprehensive Ranking System score for Express Entry
                </p>
                <Button className="w-full bg-primary-blue hover:bg-primary-blue/90">
                  Calculate Score
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/application-form')}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <FileText className="h-8 w-8 text-green-600" />
                  <Badge variant="outline">In Progress</Badge>
                </div>
                <CardTitle className="text-lg">Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete your Express Entry profile with progressive disclosure
                </p>
                <Button variant="outline" className="w-full">
                  Continue Application
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Trophy className="h-8 w-8 text-yellow-600" />
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
                <CardTitle className="text-lg">Score History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Track your CRS score improvements over time
                </p>
                <Button variant="outline" className="w-full" disabled>
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Application Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Profile Created</span>
                  </div>
                  <Badge variant="secondary">Complete</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="font-medium">Documents Upload</span>
                  </div>
                  <Badge variant="outline">In Progress</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                    <span className="font-medium">Language Tests</span>
                  </div>
                  <Badge variant="outline">Pending</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-blue-900">Profile Updated</p>
                    <p className="text-sm text-blue-700">Personal details section completed</p>
                    <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-green-900">Document Uploaded</p>
                    <p className="text-sm text-green-700">Educational credential assessment added</p>
                    <p className="text-xs text-green-600 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-purple-900">Language Test Scheduled</p>
                    <p className="text-sm text-purple-700">IELTS test booked for next month</p>
                    <p className="text-xs text-purple-600 mt-1">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Calculator className="h-5 w-5 text-primary-blue" />
                    <h4 className="font-medium">Calculate CRS Score</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Get your current CRS score to understand your competitiveness
                  </p>
                  <Button 
                    size="sm" 
                    className="bg-primary-blue hover:bg-primary-blue/90"
                    onClick={() => navigate('/crs-assessment')}
                  >
                    Start Calculator
                  </Button>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium">Complete Profile</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Fill out remaining sections of your Express Entry profile
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/application-form')}
                  >
                    Continue Form
                  </Button>
                </div>

                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium">Book Language Test</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Schedule your IELTS or CELPIP test for language proficiency
                  </p>
                  <Button size="sm" variant="outline" disabled>
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
