
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  fromDate: string;
  toDate: string;
  current: boolean;
}

interface PersonalHistorySectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const PersonalHistorySection: React.FC<PersonalHistorySectionProps> = ({ data, onUpdate }) => {
  const [historyData, setHistoryData] = useState({
    addresses: data.addresses || [{
      street: '',
      city: '',
      state: '',
      country: '',
      fromDate: '',
      toDate: '',
      current: true
    }],
    criminalHistory: data.criminalHistory || 'no',
    criminalDetails: data.criminalDetails || '',
    immigrationHistory: data.immigrationHistory || 'no',
    immigrationDetails: data.immigrationDetails || '',
    militaryService: data.militaryService || 'no',
    militaryDetails: data.militaryDetails || ''
  });

  const addAddress = () => {
    const newAddress: Address = {
      street: '',
      city: '',
      state: '',
      country: '',
      fromDate: '',
      toDate: '',
      current: false
    };
    const newAddresses = [...historyData.addresses, newAddress];
    const newData = { ...historyData, addresses: newAddresses };
    setHistoryData(newData);
    onUpdate(newData);
  };

  const removeAddress = (index: number) => {
    if (historyData.addresses.length > 1) {
      const newAddresses = historyData.addresses.filter((_, i) => i !== index);
      const newData = { ...historyData, addresses: newAddresses };
      setHistoryData(newData);
      onUpdate(newData);
    }
  };

  const updateAddress = (index: number, field: keyof Address, value: string | boolean) => {
    const newAddresses = [...historyData.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    const newData = { ...historyData, addresses: newAddresses };
    setHistoryData(newData);
    onUpdate(newData);
  };

  const handleChange = (field: string, value: string) => {
    const newData = { ...historyData, [field]: value };
    setHistoryData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Provide information about your personal history including addresses, legal, and immigration background.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Address History (Last 5 Years)</h3>
          
          {historyData.addresses.map((address, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Address {index + 1}</h4>
                {historyData.addresses.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeAddress(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor={`street-${index}`}>Street Address</Label>
                  <Input
                    id={`street-${index}`}
                    value={address.street}
                    onChange={(e) => updateAddress(index, 'street', e.target.value)}
                    placeholder="123 Main Street"
                  />
                </div>

                <div>
                  <Label htmlFor={`city-${index}`}>City</Label>
                  <Input
                    id={`city-${index}`}
                    value={address.city}
                    onChange={(e) => updateAddress(index, 'city', e.target.value)}
                    placeholder="New York"
                  />
                </div>

                <div>
                  <Label htmlFor={`state-${index}`}>State/Province</Label>
                  <Input
                    id={`state-${index}`}
                    value={address.state}
                    onChange={(e) => updateAddress(index, 'state', e.target.value)}
                    placeholder="NY"
                  />
                </div>

                <div>
                  <Label htmlFor={`country-${index}`}>Country</Label>
                  <Input
                    id={`country-${index}`}
                    value={address.country}
                    onChange={(e) => updateAddress(index, 'country', e.target.value)}
                    placeholder="United States"
                  />
                </div>

                <div>
                  <Label htmlFor={`fromDate-${index}`}>From Date</Label>
                  <Input
                    id={`fromDate-${index}`}
                    type="date"
                    value={address.fromDate}
                    onChange={(e) => updateAddress(index, 'fromDate', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor={`toDate-${index}`}>To Date</Label>
                  <Input
                    id={`toDate-${index}`}
                    type="date"
                    value={address.toDate}
                    onChange={(e) => updateAddress(index, 'toDate', e.target.value)}
                    disabled={address.current}
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      type="checkbox"
                      id={`current-${index}`}
                      checked={address.current}
                      onChange={(e) => updateAddress(index, 'current', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor={`current-${index}`} className="text-sm">
                      Current address
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            onClick={addAddress}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Address</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Legal History</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Have you ever been arrested, cited, charged, or detained by any law enforcement officer?</Label>
              <RadioGroup
                value={historyData.criminalHistory}
                onValueChange={(value) => handleChange('criminalHistory', value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-criminal" />
                  <Label htmlFor="no-criminal">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-criminal" />
                  <Label htmlFor="yes-criminal">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            {historyData.criminalHistory === 'yes' && (
              <div>
                <Label htmlFor="criminalDetails">Please provide details</Label>
                <Textarea
                  id="criminalDetails"
                  value={historyData.criminalDetails}
                  onChange={(e) => handleChange('criminalDetails', e.target.value)}
                  placeholder="Provide complete details including dates, charges, and outcomes..."
                  rows={4}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Immigration History</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Have you ever been denied entry, deported, or removed from any country?</Label>
              <RadioGroup
                value={historyData.immigrationHistory}
                onValueChange={(value) => handleChange('immigrationHistory', value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-immigration" />
                  <Label htmlFor="no-immigration">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-immigration" />
                  <Label htmlFor="yes-immigration">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            {historyData.immigrationHistory === 'yes' && (
              <div>
                <Label htmlFor="immigrationDetails">Please provide details</Label>
                <Textarea
                  id="immigrationDetails"
                  value={historyData.immigrationDetails}
                  onChange={(e) => handleChange('immigrationDetails', e.target.value)}
                  placeholder="Provide complete details including dates, countries, and reasons..."
                  rows={4}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Military Service</h3>
          
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Have you ever served in any country's military, militia, or civil defense unit?</Label>
              <RadioGroup
                value={historyData.militaryService}
                onValueChange={(value) => handleChange('militaryService', value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-military" />
                  <Label htmlFor="no-military">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes-military" />
                  <Label htmlFor="yes-military">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            {historyData.militaryService === 'yes' && (
              <div>
                <Label htmlFor="militaryDetails">Please provide details</Label>
                <Textarea
                  id="militaryDetails"
                  value={historyData.militaryDetails}
                  onChange={(e) => handleChange('militaryDetails', e.target.value)}
                  placeholder="Provide details including service dates, branch, rank, and duties..."
                  rows={4}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalHistorySection;
