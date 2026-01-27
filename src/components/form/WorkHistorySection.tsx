
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Briefcase, Award, Target, Search, History } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

interface WorkExperience {
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentJob: boolean;
  duties: string;
  salary: string;
  employmentType: string;
}

interface WorkHistorySectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const WorkHistorySection: React.FC<WorkHistorySectionProps> = ({ data, onUpdate }) => {
  const [workData, setWorkData] = useState({
    primaryOccupation: data.primaryOccupation || '',
    nocCode: data.nocCode || '',
    certificateOfQualification: data.certificateOfQualification || '',
    intendedWorkProvince: data.intendedWorkProvince || '',
    intendedWorkCity: data.intendedWorkCity || '',
    intendedOccupation: data.intendedOccupation || '',
    jobResearchDetails: data.jobResearchDetails || '',
    workHistory: data.workHistory || [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      duties: '',
      salary: '',
      employmentType: 'full-time'
    }]
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...workData, [field]: value };
    setWorkData(newData);
    onUpdate(newData);
  };

  const addWorkExperience = () => {
    const newExperience: WorkExperience = {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      duties: '',
      salary: '',
      employmentType: 'full-time'
    };
    const newWorkHistory = [...workData.workHistory, newExperience];
    const newData = { ...workData, workHistory: newWorkHistory };
    setWorkData(newData);
    onUpdate(newData);
  };

  const removeWorkExperience = (index: number) => {
    const newWorkHistory = workData.workHistory.filter((_: any, i: number) => i !== index);
    const newData = { ...workData, workHistory: newWorkHistory };
    setWorkData(newData);
    onUpdate(newData);
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const newWorkHistory = [...workData.workHistory];
    newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
    const newData = { ...workData, workHistory: newWorkHistory };
    setWorkData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {/* Primary Occupation */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Briefcase} 
            title="Primary Occupation" 
            description="Your main occupation and NOC classification"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primaryOccupation">Primary Occupation *</Label>
              <Input
                id="primaryOccupation"
                value={workData.primaryOccupation}
                onChange={(e) => handleChange('primaryOccupation', e.target.value)}
                placeholder="e.g., Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="nocCode">NOC Code</Label>
              <Input
                id="nocCode"
                value={workData.nocCode}
                onChange={(e) => handleChange('nocCode', e.target.value)}
                placeholder="e.g., 21231"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificate of Qualification */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Award} 
            title="Certificate of Qualification" 
            description="Trade certifications or professional qualifications"
          />
        </div>
        <CardContent className="p-6">
          <div>
            <Label htmlFor="certificateOfQualification">Certificate Details</Label>
            <Textarea
              id="certificateOfQualification"
              value={workData.certificateOfQualification}
              onChange={(e) => handleChange('certificateOfQualification', e.target.value)}
              placeholder="Describe any trade certifications or professional qualifications you hold..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Intended Work in Canada */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Target} 
            title="Intended Work in Canada" 
            description="Where and what you plan to work in Canada"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intendedWorkProvince">Intended Province/Territory</Label>
              <Select
                value={workData.intendedWorkProvince}
                onValueChange={(value) => handleChange('intendedWorkProvince', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ON">Ontario</SelectItem>
                  <SelectItem value="BC">British Columbia</SelectItem>
                  <SelectItem value="AB">Alberta</SelectItem>
                  <SelectItem value="QC">Quebec</SelectItem>
                  <SelectItem value="MB">Manitoba</SelectItem>
                  <SelectItem value="SK">Saskatchewan</SelectItem>
                  <SelectItem value="NS">Nova Scotia</SelectItem>
                  <SelectItem value="NB">New Brunswick</SelectItem>
                  <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                  <SelectItem value="PE">Prince Edward Island</SelectItem>
                  <SelectItem value="NT">Northwest Territories</SelectItem>
                  <SelectItem value="YT">Yukon</SelectItem>
                  <SelectItem value="NU">Nunavut</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="intendedWorkCity">Intended City/Town</Label>
              <Input
                id="intendedWorkCity"
                value={workData.intendedWorkCity}
                onChange={(e) => handleChange('intendedWorkCity', e.target.value)}
                placeholder="e.g., Toronto"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="intendedOccupation">Intended Occupation</Label>
              <Input
                id="intendedOccupation"
                value={workData.intendedOccupation}
                onChange={(e) => handleChange('intendedOccupation', e.target.value)}
                placeholder="e.g., Senior Software Developer"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Job Research */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Search} 
            title="Job Research" 
            description="Research you've done about employment opportunities in Canada"
          />
        </div>
        <CardContent className="p-6">
          <div>
            <Label htmlFor="jobResearchDetails">Job Research Details</Label>
            <Textarea
              id="jobResearchDetails"
              value={workData.jobResearchDetails}
              onChange={(e) => handleChange('jobResearchDetails', e.target.value)}
              placeholder="Describe any job research, contacts with employers, job offers, or employment prospects in Canada..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Work History */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={History} 
            title="Work History" 
            description="Your employment history starting with the most recent"
          />
        </div>
        <CardContent className="p-6">
          {workData.workHistory.map((experience: WorkExperience, index: number) => (
            <div key={index} className="mb-6 p-4 border rounded-lg bg-muted/30">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium text-primary-blue">
                  Work Experience {index + 1}
                </h4>
                {workData.workHistory.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeWorkExperience(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor={`jobTitle-${index}`}>Job Title</Label>
                  <Input
                    id={`jobTitle-${index}`}
                    value={experience.jobTitle}
                    onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${index}`}>Company Name</Label>
                  <Input
                    id={`company-${index}`}
                    value={experience.company}
                    onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                    placeholder="Tech Corp Inc."
                  />
                </div>
                <div>
                  <Label htmlFor={`employmentType-${index}`}>Employment Type</Label>
                  <Select
                    value={experience.employmentType}
                    onValueChange={(value) => updateWorkExperience(index, 'employmentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`salary-${index}`}>Salary (Annual)</Label>
                  <Input
                    id={`salary-${index}`}
                    value={experience.salary}
                    onChange={(e) => updateWorkExperience(index, 'salary', e.target.value)}
                    placeholder="$75,000"
                  />
                </div>
                <div>
                  <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                  <Input
                    id={`startDate-${index}`}
                    type="date"
                    value={experience.startDate}
                    onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`endDate-${index}`}>End Date</Label>
                  <Input
                    id={`endDate-${index}`}
                    type="date"
                    value={experience.endDate}
                    onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                    disabled={experience.currentJob}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id={`currentJob-${index}`}
                      checked={experience.currentJob}
                      onChange={(e) => updateWorkExperience(index, 'currentJob', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`currentJob-${index}`} className="text-sm">
                      This is my current job
                    </Label>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor={`duties-${index}`}>Job Duties & Responsibilities</Label>
                <Textarea
                  id={`duties-${index}`}
                  value={experience.duties}
                  onChange={(e) => updateWorkExperience(index, 'duties', e.target.value)}
                  placeholder="Describe your main responsibilities and achievements..."
                  rows={4}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addWorkExperience}
            className="flex items-center space-x-2 border-dashed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Work Experience</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkHistorySection;
