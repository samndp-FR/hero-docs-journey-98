
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, User, Heart, Calendar, Users } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

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
  const [maritalStatus, setMaritalStatus] = useState(data.maritalStatus || '');
  const [marriageDate, setMarriageDate] = useState(data.marriageDate || '');

  const addApplicant = () => {
    const newApplicant: Applicant = {
      firstName: '',
      lastName: '',
      relationship: 'Spouse',
      dateOfBirth: ''
    };
    const newApplicants = [...applicants, newApplicant];
    setApplicants(newApplicants);
    onUpdate({ applicants: newApplicants, maritalStatus, marriageDate });
  };

  const removeApplicant = (index: number) => {
    if (applicants.length > 1) {
      const newApplicants = applicants.filter((_, i) => i !== index);
      setApplicants(newApplicants);
      onUpdate({ applicants: newApplicants, maritalStatus, marriageDate });
    }
  };

  const updateApplicant = (index: number, field: keyof Applicant, value: string) => {
    const newApplicants = [...applicants];
    newApplicants[index][field] = value;
    setApplicants(newApplicants);
    onUpdate({ applicants: newApplicants, maritalStatus, marriageDate });
  };

  const handleMaritalStatusChange = (value: string) => {
    setMaritalStatus(value);
    onUpdate({ applicants, maritalStatus: value, marriageDate });
  };

  const handleMarriageDateChange = (value: string) => {
    setMarriageDate(value);
    onUpdate({ applicants, maritalStatus, marriageDate: value });
  };

  const primaryApplicant = applicants[0];
  const additionalApplicants = applicants.slice(1);

  return (
    <div className="space-y-6">
      {/* Main Applicant Name */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={User} 
            title="Main Applicant Name" 
            description="Your full legal name as it appears on official documents"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName-0">First Name *</Label>
              <Input
                id="firstName-0"
                value={primaryApplicant?.firstName || ''}
                onChange={(e) => updateApplicant(0, 'firstName', e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div>
              <Label htmlFor="lastName-0">Last Name *</Label>
              <Input
                id="lastName-0"
                value={primaryApplicant?.lastName || ''}
                onChange={(e) => updateApplicant(0, 'lastName', e.target.value)}
                placeholder="Enter last name"
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth-0">Date of Birth *</Label>
              <Input
                id="dateOfBirth-0"
                type="date"
                value={primaryApplicant?.dateOfBirth || ''}
                onChange={(e) => updateApplicant(0, 'dateOfBirth', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marital Status */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Heart} 
            title="Marital Status" 
            description="Your current marital or relationship status"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maritalStatus">Status *</Label>
              <Select value={maritalStatus} onValueChange={handleMaritalStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select marital status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="common-law">Common-Law Partner</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marriage/Common-Law Start Date */}
      {(maritalStatus === 'married' || maritalStatus === 'common-law') && (
        <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
          <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
            <FormSectionHeader 
              icon={Calendar} 
              title="Marriage / Common-Law Start Date" 
              description="When your marriage or common-law relationship began"
            />
          </div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="marriageDate">
                  {maritalStatus === 'married' ? 'Date of Marriage *' : 'Common-Law Start Date *'}
                </Label>
                <Input
                  id="marriageDate"
                  type="date"
                  value={marriageDate}
                  onChange={(e) => handleMarriageDateChange(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Applicants */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Users} 
            title="Additional Applicants" 
            description="Add spouse, children, or other dependents included in this application"
          />
        </div>
        <CardContent className="p-6">
          {additionalApplicants.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No additional applicants added yet.
            </p>
          ) : (
            <div className="space-y-4">
              {additionalApplicants.map((applicant, idx) => {
                const index = idx + 1; // Offset by 1 since primary is at index 0
                return (
                  <div key={index} className="p-4 border rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-primary-blue">
                        {applicant.relationship === 'Spouse' ? 'Spouse' : 
                         applicant.relationship === 'Child' ? `Child ${idx + 1}` : 
                         `Dependent ${idx + 1}`}
                      </h4>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeApplicant(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={addApplicant}
              className="flex items-center space-x-2 border-dashed"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Applicant</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicantsSection;
