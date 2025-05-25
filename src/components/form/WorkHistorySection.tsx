
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

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
  const [workHistory, setWorkHistory] = useState<WorkExperience[]>(
    data.workHistory || [{
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      currentJob: false,
      duties: '',
      salary: '',
      employmentType: 'full-time'
    }]
  );

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
    const newWorkHistory = [...workHistory, newExperience];
    setWorkHistory(newWorkHistory);
    onUpdate({ workHistory: newWorkHistory });
  };

  const removeWorkExperience = (index: number) => {
    const newWorkHistory = workHistory.filter((_, i) => i !== index);
    setWorkHistory(newWorkHistory);
    onUpdate({ workHistory: newWorkHistory });
  };

  const updateWorkExperience = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
    setWorkHistory(newWorkHistory);
    onUpdate({ workHistory: newWorkHistory });
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Provide details about your work experience, starting with your most recent position.</p>
      </div>

      {workHistory.map((experience, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Work Experience {index + 1}
              </h3>
              {workHistory.length > 1 && (
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
          </CardContent>
        </Card>
      ))}

      <div className="text-center">
        <Button
          variant="outline"
          onClick={addWorkExperience}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Experience</span>
        </Button>
      </div>
    </div>
  );
};

export default WorkHistorySection;
