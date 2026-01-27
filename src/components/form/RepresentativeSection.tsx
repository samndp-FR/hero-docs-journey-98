
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Award, UserCheck } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

interface RepresentativeSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({ data, onUpdate }) => {
  const [representativeData, setRepresentativeData] = useState({
    intendedProvince: data.intendedProvince || '',
    intendedCity: data.intendedCity || '',
    nominationCertificate: data.nominationCertificate || 'no',
    nominationProvince: data.nominationProvince || '',
    nominationNumber: data.nominationNumber || '',
    hasRepresentative: data.hasRepresentative || 'no',
    name: data.name || '',
    organization: data.organization || '',
    email: data.email || '',
    phone: data.phone || '',
    address: data.address || '',
    licenseNumber: data.licenseNumber || ''
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...representativeData, [field]: value };
    setRepresentativeData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {/* Intended Residence */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={MapPin} 
            title="Intended Residence" 
            description="Where you plan to live in Canada"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="intendedProvince">Province/Territory *</Label>
              <Select
                value={representativeData.intendedProvince}
                onValueChange={(value) => handleChange('intendedProvince', value)}
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
              <Label htmlFor="intendedCity">City/Town *</Label>
              <Input
                id="intendedCity"
                value={representativeData.intendedCity}
                onChange={(e) => handleChange('intendedCity', e.target.value)}
                placeholder="e.g., Toronto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nomination Certificate */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Award} 
            title="Nomination Certificate" 
            description="Provincial Nominee Program (PNP) nomination details"
          />
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Do you have a provincial nomination?</Label>
              <RadioGroup
                value={representativeData.nominationCertificate}
                onValueChange={(value) => handleChange('nominationCertificate', value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-nomination" />
                  <Label htmlFor="no-nomination">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-nomination" />
                  <Label htmlFor="yes-nomination">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            {representativeData.nominationCertificate === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="nominationProvince">Nominating Province</Label>
                  <Select
                    value={representativeData.nominationProvince}
                    onValueChange={(value) => handleChange('nominationProvince', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ON">Ontario</SelectItem>
                      <SelectItem value="BC">British Columbia</SelectItem>
                      <SelectItem value="AB">Alberta</SelectItem>
                      <SelectItem value="MB">Manitoba</SelectItem>
                      <SelectItem value="SK">Saskatchewan</SelectItem>
                      <SelectItem value="NS">Nova Scotia</SelectItem>
                      <SelectItem value="NB">New Brunswick</SelectItem>
                      <SelectItem value="NL">Newfoundland and Labrador</SelectItem>
                      <SelectItem value="PE">Prince Edward Island</SelectItem>
                      <SelectItem value="NT">Northwest Territories</SelectItem>
                      <SelectItem value="YT">Yukon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nominationNumber">Nomination Certificate Number</Label>
                  <Input
                    id="nominationNumber"
                    value={representativeData.nominationNumber}
                    onChange={(e) => handleChange('nominationNumber', e.target.value)}
                    placeholder="Certificate number"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Representative / Designated Individual */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={UserCheck} 
            title="Representative / Designated Individual" 
            description="Authorized representative or attorney handling your application"
          />
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label className="text-base font-medium">Do you have a representative?</Label>
            <RadioGroup
              value={representativeData.hasRepresentative}
              onValueChange={(value) => handleChange('hasRepresentative', value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no-rep" />
                <Label htmlFor="no-rep">No, I will represent myself</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes-rep" />
                <Label htmlFor="yes-rep">Yes, I have a representative</Label>
              </div>
            </RadioGroup>

            {representativeData.hasRepresentative === 'yes' && (
              <div className="pt-4 border-t space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rep-name">Full Name *</Label>
                    <Input
                      id="rep-name"
                      value={representativeData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep-organization">Organization/Law Firm</Label>
                    <Input
                      id="rep-organization"
                      value={representativeData.organization}
                      onChange={(e) => handleChange('organization', e.target.value)}
                      placeholder="Immigration Law Associates"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep-email">Email Address *</Label>
                    <Input
                      id="rep-email"
                      type="email"
                      value={representativeData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="attorney@lawfirm.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep-phone">Phone Number *</Label>
                    <Input
                      id="rep-phone"
                      type="tel"
                      value={representativeData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rep-license">License/Bar Number</Label>
                    <Input
                      id="rep-license"
                      value={representativeData.licenseNumber}
                      onChange={(e) => handleChange('licenseNumber', e.target.value)}
                      placeholder="BAR123456"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="rep-address">Business Address</Label>
                  <Input
                    id="rep-address"
                    value={representativeData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="123 Legal Street, Suite 100, Law City, LC 12345"
                  />
                </div>
                <div className="p-4 bg-primary-blue/5 rounded-lg border border-primary-blue/20">
                  <p className="text-sm text-primary-blue">
                    <strong>Note:</strong> By providing representative information, you authorize this person to act on your behalf in matters related to this application.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepresentativeSection;
