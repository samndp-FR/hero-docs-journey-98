
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface Applicant {
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
}

interface ApplicantsSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ApplicantsSection: React.FC<ApplicantsSectionProps> = ({ data, onUpdate }) => {
  const [applicants, setApplicants] = useState<Applicant[]>(
    data.applicants || [{ firstName: '', lastName: '', relationship: 'Primary', dateOfBirth: '' }]
  );

  const addApplicant = () => {
    const newApplicant: Applicant = {
      firstName: '',
      lastName: '',
      relationship: 'Spouse',
      dateOfBirth: ''
    };
    const newApplicants = [...applicants, newApplicant];
    setApplicants(newApplicants);
    onUpdate({ applicants: newApplicants });
  };

  const removeApplicant = (index: number) => {
    if (applicants.length > 1) {
      const newApplicants = applicants.filter((_, i) => i !== index);
      setApplicants(newApplicants);
      onUpdate({ applicants: newApplicants });
    }
  };

  const updateApplicant = (index: number, field: keyof Applicant, value: string) => {
    const newApplicants = [...applicants];
    newApplicants[index][field] = value;
    setApplicants(newApplicants);
    onUpdate({ applicants: newApplicants });
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Add all applicants who will be included in this application.</p>
      </div>

      {applicants.map((applicant, index) => (
        <Card key={index} className="relative">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                Applicant {index + 1} {index === 0 && '(Primary)'}
              </h3>
              {applicants.length > 1 && index > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeApplicant(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={applicant.firstName}
                  onChange={(e) => updateApplicant(index, 'firstName', e.target.value)}
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={applicant.lastName}
                  onChange={(e) => updateApplicant(index, 'lastName', e.target.value)}
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <Label htmlFor={`relationship-${index}`}>Relationship</Label>
                <Select
                  value={applicant.relationship}
                  onValueChange={(value) => updateApplicant(index, 'relationship', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary Applicant</SelectItem>
                    <SelectItem value="Spouse">Spouse</SelectItem>
                    <SelectItem value="Child">Child</SelectItem>
                    <SelectItem value="Parent">Parent</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor={`dateOfBirth-${index}`}>Date of Birth</Label>
                <Input
                  id={`dateOfBirth-${index}`}
                  type="date"
                  value={applicant.dateOfBirth}
                  onChange={(e) => updateApplicant(index, 'dateOfBirth', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center">
        <Button
          variant="outline"
          onClick={addApplicant}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Applicant</span>
        </Button>
      </div>
    </div>
  );
};

export default ApplicantsSection;
