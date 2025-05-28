
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, Award } from 'lucide-react';

interface ScoreAssessmentQuestionnaireProps {
  onComplete: (results: any) => void;
  onCancel: () => void;
}

const ScoreAssessmentQuestionnaire: React.FC<ScoreAssessmentQuestionnaireProps> = ({ onComplete, onCancel }) => {
  // State to hold form data
  const [formData, setFormData] = useState({
    q1: '',
    q2i: '',
    q2ii: '',
    q3: '',
    q4: '',
    q4b: '',
    q4c: '',
    q5i: '',
    q5ia: '',
    q5ibSpeaking: '',
    q5ibListening: '',
    q5ibReading: '',
    q5ibWriting: '',
    q5ii: '',
    q5iiSpeaking: '',
    q5iiListening: '',
    q5iiReading: '',
    q5iiWriting: '',
    q6i: '',
    q6ii: '',
    q7: '',
    q8: '',
    q8a: '',
    q9: '',
    q10i: '',
    q10: '',
    q11: '',
    q12i: '',
    q12iiSpeaking: '',
    q12iiListening: '',
    q12iiReading: '',
    q12iiWriting: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-primary-blue" />
          <h1 className="text-3xl font-bold text-gray-900">CRS Score Calculator</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Calculate your Comprehensive Ranking System (CRS) score for Express Entry based on your personal information and qualifications.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Official Tool
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Express Entry Ready
          </Badge>
        </div>
      </div>

      {/* Legal Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>This tool is intended solely for general guidance and reference purposes.</p>
          <p>In the event of any discrepancy between the results of this questionnaire and that provided by the Express Entry electronic system, the results provided by the system shall govern, in accordance with provisions of the Immigration and Refugee Protection Act, the Immigration and Refugee Protection Regulations, and Minister's Instructions issued under IRPA s.10.3.</p>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Personal Information</h3>
              
              {/* Question 1 - Marital Status */}
              <div className="space-y-2">
                <label htmlFor="q1" className="text-sm font-medium text-gray-700">
                  1) What is your marital status?
                </label>
                <select 
                  id="q1" 
                  name="q1" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q1} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">Annulled Marriage</option>
                  <option value="B">Common-Law</option>
                  <option value="C">Divorced / Separated</option>
                  <option value="D">Legally Separated</option>
                  <option value="E">Married</option>
                  <option value="F">Never Married / Single</option>
                  <option value="G">Widowed</option>
                </select>
              </div>

              {/* Question 2i - Spouse Citizenship */}
              <div className="space-y-2">
                <label htmlFor="q2i" className="text-sm font-medium text-gray-700">
                  2) i. Is your spouse or common-law partner a citizen or permanent resident of Canada?
                </label>
                <select 
                  id="q2i" 
                  name="q2i" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q2i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
              </div>

              {/* Question 2ii - Spouse Coming to Canada */}
              <div className="space-y-2">
                <label htmlFor="q2ii" className="text-sm font-medium text-gray-700">
                  2) ii. Will your spouse or common-law partner come with you to Canada?
                </label>
                <select 
                  id="q2ii" 
                  name="q2ii" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q2ii} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
              </div>

              {/* Question 3 - Age */}
              <div className="space-y-2">
                <label htmlFor="q3" className="text-sm font-medium text-gray-700">
                  3) How old are you?
                </label>
                <div className="text-sm text-gray-600 mb-2">
                  <p>Choose the best answer:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>If you've been invited to apply, enter your age on the date you were invited.</li>
                    <li>If you plan to complete an Express Entry profile, enter your current age.</li>
                  </ul>
                </div>
                <select 
                  id="q3" 
                  name="q3" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q3} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="17">17 or under</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20-29</option>
                  <option value="30">30-35</option>
                  <option value="36">36-40</option>
                  <option value="41">41-45</option>
                  <option value="46">46 or older</option>
                </select>
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Education</h3>
              
              {/* Question 4 - Education Level */}
              <div className="space-y-2">
                <label htmlFor="q4" className="text-sm font-medium text-gray-700">
                  4) What is your level of education?
                </label>
                <div className="text-sm text-gray-600 mb-2">
                  <p>Enter the highest level of education for which you:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>earned a <strong>Canadian degree, diploma or certificate</strong> or</li>
                    <li>had an Educational Credential Assessment (ECA) if you did your study outside Canada</li>
                  </ul>
                </div>
                <select 
                  id="q4" 
                  name="q4" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q4} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">Less than secondary school</option>
                  <option value="B">Secondary diploma (high school graduation)</option>
                  <option value="C">One-year degree, diploma or certificate</option>
                  <option value="D">Two-year program</option>
                  <option value="E">Bachelor's degree</option>
                  <option value="F">Two or more certificates, diplomas, or degrees</option>
                  <option value="G">Master's degree</option>
                  <option value="H">Doctoral level university degree (PhD)</option>
                </select>
              </div>
            </div>

            {/* Language Skills Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Language Skills</h3>
              
              {/* Question 5i - Test Results */}
              <div className="space-y-2">
                <label htmlFor="q5i" className="text-sm font-medium text-gray-700">
                  5) i. Are your test results less than two years old?
                </label>
                <select 
                  id="q5i" 
                  name="q5i" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q5i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="B">No</option>
                  <option value="A">Yes</option>
                </select>
              </div>

              {/* Question 5ia - Language Test Type */}
              <div className="space-y-2">
                <label htmlFor="q5i-a" className="text-sm font-medium text-gray-700">
                  ii. Which language test did you take for your first official language?
                </label>
                <select 
                  id="q5i-a" 
                  name="q5ia" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q5ia} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">CELPIP-G</option>
                  <option value="B">IELTS</option>
                  <option value="E">PTE Core</option>
                  <option value="C">TEF Canada</option>
                  <option value="D">TCF Canada</option>
                </select>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Work Experience</h3>
              
              {/* Question 6i - Canadian Work Experience */}
              <div className="space-y-2">
                <label htmlFor="q6i" className="text-sm font-medium text-gray-700">
                  6) i. In the last 10 years, how many years of skilled work experience in Canada do you have?
                </label>
                <div className="text-sm text-gray-600 mb-2">
                  <p>It must have been paid and full-time (or an equal amount in part-time).</p>
                </div>
                <select 
                  id="q6i" 
                  name="q6i" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q6i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">None or less than a year</option>
                  <option value="B">1 year</option>
                  <option value="C">2 years</option>
                  <option value="D">3 years</option>
                  <option value="E">4 years</option>
                  <option value="F">5 years or more</option>
                </select>
              </div>

              {/* Question 6ii - Foreign Work Experience */}
              <div className="space-y-2">
                <label htmlFor="q6ii" className="text-sm font-medium text-gray-700">
                  ii. In the last 10 years, how many total years of foreign skilled work experience do you have?
                </label>
                <select 
                  id="q6ii" 
                  name="q6ii" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q6ii} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">None or less than a year</option>
                  <option value="B">1 year</option>
                  <option value="C">2 years</option>
                  <option value="D">3 years or more</option>
                </select>
              </div>
            </div>

            {/* Additional Qualifications Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">Additional Points</h3>
              
              {/* Question 9 - Provincial Nomination */}
              <div className="space-y-2">
                <label htmlFor="q9" className="text-sm font-medium text-gray-700">
                  9) Do you have a nomination certificate from a province or territory?
                </label>
                <select 
                  id="q9" 
                  name="q9" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent"
                  value={formData.q9} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button 
                type="submit" 
                className="flex-1 bg-primary-blue hover:bg-primary-blue/90 text-white font-medium py-3"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Your Score
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="px-8 py-3" 
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreAssessmentQuestionnaire;
