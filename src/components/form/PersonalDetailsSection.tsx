
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IdCard, BookOpen, Globe, Users, UserX, Plus, Trash2 } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

interface PersonalDetailsSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({ data, onUpdate }) => {
  const [personalData, setPersonalData] = useState({
    nationality: data.nationality || '',
    countryOfBirth: data.countryOfBirth || '',
    cityOfBirth: data.cityOfBirth || '',
    gender: data.gender || '',
    maritalStatus: data.maritalStatus || '',
    passportNumber: data.passportNumber || '',
    passportIssueDate: data.passportIssueDate || '',
    passportExpiryDate: data.passportExpiryDate || '',
    passportIssuingCountry: data.passportIssuingCountry || '',
    socialSecurityNumber: data.socialSecurityNumber || '',
    heightFeet: data.heightFeet || '',
    heightInches: data.heightInches || '',
    eyeColor: data.eyeColor || '',
    hairColor: data.hairColor || '',
    countryOfResidence: data.countryOfResidence || '',
    immigrationStatus: data.immigrationStatus || '',
    familyMembers: data.familyMembers || [],
    unidentifiedFamily: data.unidentifiedFamily || ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...personalData, [field]: value };
    setPersonalData(newData);
    onUpdate(newData);
  };

  const addFamilyMember = () => {
    const newMembers = [...personalData.familyMembers, { name: '', relationship: '', location: '' }];
    const newData = { ...personalData, familyMembers: newMembers };
    setPersonalData(newData);
    onUpdate(newData);
  };

  const removeFamilyMember = (index: number) => {
    const newMembers = personalData.familyMembers.filter((_: any, i: number) => i !== index);
    const newData = { ...personalData, familyMembers: newMembers };
    setPersonalData(newData);
    onUpdate(newData);
  };

  const updateFamilyMember = (index: number, field: string, value: string) => {
    const newMembers = [...personalData.familyMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    const newData = { ...personalData, familyMembers: newMembers };
    setPersonalData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {/* Identification */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={IdCard} 
            title="Identification" 
            description="Basic identifying information as it appears on official documents"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nationality">Nationality *</Label>
              <Select
                value={personalData.nationality}
                onValueChange={(value) => handleChange('nationality', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canadian</SelectItem>
                  <SelectItem value="UK">British</SelectItem>
                  <SelectItem value="AU">Australian</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="countryOfBirth">Country of Birth *</Label>
              <Select
                value={personalData.countryOfBirth}
                onValueChange={(value) => handleChange('countryOfBirth', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="cityOfBirth">City of Birth *</Label>
              <Input
                id="cityOfBirth"
                value={personalData.cityOfBirth}
                onChange={(e) => handleChange('cityOfBirth', e.target.value)}
                placeholder="New York"
                required
              />
            </div>
            <div>
              <Label className="text-base font-medium">Gender *</Label>
              <RadioGroup
                value={personalData.gender}
                onValueChange={(value) => handleChange('gender', value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passports */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={BookOpen} 
            title="Passports" 
            description="Current passport information"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="passportNumber">Passport Number *</Label>
              <Input
                id="passportNumber"
                value={personalData.passportNumber}
                onChange={(e) => handleChange('passportNumber', e.target.value)}
                placeholder="123456789"
                required
              />
            </div>
            <div>
              <Label htmlFor="passportIssuingCountry">Issuing Country *</Label>
              <Select
                value={personalData.passportIssuingCountry}
                onValueChange={(value) => handleChange('passportIssuingCountry', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="passportIssueDate">Issue Date *</Label>
              <Input
                id="passportIssueDate"
                type="date"
                value={personalData.passportIssueDate}
                onChange={(e) => handleChange('passportIssueDate', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="passportExpiryDate">Expiry Date *</Label>
              <Input
                id="passportExpiryDate"
                type="date"
                value={personalData.passportExpiryDate}
                onChange={(e) => handleChange('passportExpiryDate', e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Immigration and Residency */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Globe} 
            title="Immigration and Residency" 
            description="Your current immigration and residency status"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="countryOfResidence">Country of Residence *</Label>
              <Select
                value={personalData.countryOfResidence}
                onValueChange={(value) => handleChange('countryOfResidence', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="immigrationStatus">Immigration Status</Label>
              <Select
                value={personalData.immigrationStatus}
                onValueChange={(value) => handleChange('immigrationStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="permanent-resident">Permanent Resident</SelectItem>
                  <SelectItem value="work-permit">Work Permit</SelectItem>
                  <SelectItem value="student-visa">Student Visa</SelectItem>
                  <SelectItem value="visitor">Visitor</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family and Relatives */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Users} 
            title="Family and Relatives" 
            description="Immediate family members (parents, siblings, spouse, children)"
          />
        </div>
        <CardContent className="p-6">
          {personalData.familyMembers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No family members added yet.
            </p>
          ) : (
            <div className="space-y-4 mb-4">
              {personalData.familyMembers.map((member: any, index: number) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-primary-blue">Family Member {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFamilyMember(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Select
                        value={member.relationship}
                        onValueChange={(value) => updateFamilyMember(index, 'relationship', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="parent">Parent</SelectItem>
                          <SelectItem value="sibling">Sibling</SelectItem>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="child">Child</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Location/Country</Label>
                      <Input
                        value={member.location}
                        onChange={(e) => updateFamilyMember(index, 'location', e.target.value)}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            onClick={addFamilyMember}
            className="flex items-center space-x-2 border-dashed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Family Member</span>
          </Button>
        </CardContent>
      </Card>

      {/* Immediate Family Members Not Identified */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={UserX} 
            title="Immediate Family Members Not Identified" 
            description="Family members whose whereabouts are unknown or contact has been lost"
          />
        </div>
        <CardContent className="p-6">
          <div>
            <Label htmlFor="unidentifiedFamily">Details (if applicable)</Label>
            <Input
              id="unidentifiedFamily"
              value={personalData.unidentifiedFamily}
              onChange={(e) => handleChange('unidentifiedFamily', e.target.value)}
              placeholder="Describe any family members with unknown whereabouts..."
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetailsSection;
