
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';

interface RepresentativeSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const RepresentativeSection: React.FC<RepresentativeSectionProps> = ({ data, onUpdate }) => {
  const [representativeData, setRepresentativeData] = useState({
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
      <div className="text-center text-muted-foreground">
        <p>Are you being represented by an authorized representative or attorney?</p>
      </div>

      <Card>
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
          </div>
        </CardContent>
      </Card>

      {representativeData.hasRepresentative === 'yes' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Representative Information</h3>
            
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

            <div className="mt-4">
              <Label htmlFor="rep-address">Business Address</Label>
              <Input
                id="rep-address"
                value={representativeData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="123 Legal Street, Suite 100, Law City, LC 12345"
              />
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> By providing representative information, you authorize this person to act on your behalf in matters related to this application.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RepresentativeSection;
