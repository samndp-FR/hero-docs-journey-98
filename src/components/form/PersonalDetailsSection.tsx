
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

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
    hairColor: data.hairColor || ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...personalData, [field]: value };
    setPersonalData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Provide your personal information as it appears on official documents.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Basic Information</h3>
          
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
              <Label htmlFor="maritalStatus">Marital Status *</Label>
              <Select
                value={personalData.maritalStatus}
                onValueChange={(value) => handleChange('maritalStatus', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                  <SelectItem value="separated">Separated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
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
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Passport Information</h3>
          
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

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Physical Description</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="heightFeet">Height (Feet)</Label>
              <Select
                value={personalData.heightFeet}
                onValueChange={(value) => handleChange('heightFeet', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Feet" />
                </SelectTrigger>
                <SelectContent>
                  {[4, 5, 6, 7].map(num => (
                    <SelectItem key={num} value={num.toString()}>{num} ft</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="heightInches">Height (Inches)</Label>
              <Select
                value={personalData.heightInches}
                onValueChange={(value) => handleChange('heightInches', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Inches" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({length: 12}, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>{i} in</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="eyeColor">Eye Color</Label>
              <Select
                value={personalData.eyeColor}
                onValueChange={(value) => handleChange('eyeColor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="hazel">Hazel</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="hairColor">Hair Color</Label>
              <Select
                value={personalData.hairColor}
                onValueChange={(value) => handleChange('hairColor', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="black">Black</SelectItem>
                  <SelectItem value="brown">Brown</SelectItem>
                  <SelectItem value="blonde">Blonde</SelectItem>
                  <SelectItem value="red">Red</SelectItem>
                  <SelectItem value="gray">Gray</SelectItem>
                  <SelectItem value="white">White</SelectItem>
                  <SelectItem value="bald">Bald</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalDetailsSection;
