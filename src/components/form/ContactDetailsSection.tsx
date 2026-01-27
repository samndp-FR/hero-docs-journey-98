
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, Mail, MapPin, History, Plus, Trash2 } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

interface AddressHistory {
  address: string;
  city: string;
  country: string;
  fromDate: string;
  toDate: string;
}

interface ContactDetailsSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ContactDetailsSection: React.FC<ContactDetailsSectionProps> = ({ data, onUpdate }) => {
  const [contactData, setContactData] = useState({
    languageOfCorrespondence: data.languageOfCorrespondence || 'english',
    email: data.email || '',
    phone: data.phone || '',
    alternatePhone: data.alternatePhone || '',
    address: data.address || '',
    city: data.city || '',
    state: data.state || '',
    postalCode: data.postalCode || '',
    country: data.country || '',
    preferredContact: data.preferredContact || 'email',
    addressHistory: data.addressHistory || []
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...contactData, [field]: value };
    setContactData(newData);
    onUpdate(newData);
  };

  const addAddressHistory = () => {
    const newHistory: AddressHistory = {
      address: '',
      city: '',
      country: '',
      fromDate: '',
      toDate: ''
    };
    const newData = { ...contactData, addressHistory: [...contactData.addressHistory, newHistory] };
    setContactData(newData);
    onUpdate(newData);
  };

  const removeAddressHistory = (index: number) => {
    const newHistory = contactData.addressHistory.filter((_: any, i: number) => i !== index);
    const newData = { ...contactData, addressHistory: newHistory };
    setContactData(newData);
    onUpdate(newData);
  };

  const updateAddressHistory = (index: number, field: keyof AddressHistory, value: string) => {
    const newHistory = [...contactData.addressHistory];
    newHistory[index] = { ...newHistory[index], [field]: value };
    const newData = { ...contactData, addressHistory: newHistory };
    setContactData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      {/* Language of Correspondence */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Languages} 
            title="Language of Correspondence" 
            description="Preferred language for official communications"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="languageOfCorrespondence">Preferred Language *</Label>
              <Select
                value={contactData.languageOfCorrespondence}
                onValueChange={(value) => handleChange('languageOfCorrespondence', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email and Telephone */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={Mail} 
            title="Email and Telephone" 
            description="Your primary contact information"
          />
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={contactData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Primary Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={contactData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
              <Input
                id="alternatePhone"
                type="tel"
                value={contactData.alternatePhone}
                onChange={(e) => handleChange('alternatePhone', e.target.value)}
                placeholder="+1 (555) 987-6543"
              />
            </div>
            <div>
              <Label htmlFor="preferredContact">Preferred Contact Method</Label>
              <Select
                value={contactData.preferredContact}
                onValueChange={(value) => handleChange('preferredContact', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="mail">Mail</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mailing Address */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={MapPin} 
            title="Mailing Address" 
            description="Your current residential address for correspondence"
          />
        </div>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={contactData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="123 Main Street, Apt 4B"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={contactData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province *</Label>
                <Input
                  id="state"
                  value={contactData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  placeholder="NY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  value={contactData.postalCode}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder="10001"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Select
                value={contactData.country}
                onValueChange={(value) => handleChange('country', value)}
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
          </div>
        </CardContent>
      </Card>

      {/* Address History */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <FormSectionHeader 
            icon={History} 
            title="Address History (Last 10 Years)" 
            description="Previous residential addresses for the past 10 years"
          />
        </div>
        <CardContent className="p-6">
          {contactData.addressHistory.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No previous addresses added yet.
            </p>
          ) : (
            <div className="space-y-4 mb-4">
              {contactData.addressHistory.map((addr: AddressHistory, index: number) => (
                <div key={index} className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-primary-blue">Previous Address {index + 1}</h4>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeAddressHistory(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Street Address</Label>
                      <Input
                        value={addr.address}
                        onChange={(e) => updateAddressHistory(index, 'address', e.target.value)}
                        placeholder="Street address"
                      />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input
                        value={addr.city}
                        onChange={(e) => updateAddressHistory(index, 'city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label>Country</Label>
                      <Input
                        value={addr.country}
                        onChange={(e) => updateAddressHistory(index, 'country', e.target.value)}
                        placeholder="Country"
                      />
                    </div>
                    <div>
                      <Label>From Date</Label>
                      <Input
                        type="date"
                        value={addr.fromDate}
                        onChange={(e) => updateAddressHistory(index, 'fromDate', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>To Date</Label>
                      <Input
                        type="date"
                        value={addr.toDate}
                        onChange={(e) => updateAddressHistory(index, 'toDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            onClick={addAddressHistory}
            className="flex items-center space-x-2 border-dashed"
          >
            <Plus className="w-4 h-4" />
            <span>Add Previous Address</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactDetailsSection;
