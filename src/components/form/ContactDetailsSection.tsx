
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactDetailsSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const ContactDetailsSection: React.FC<ContactDetailsSectionProps> = ({ data, onUpdate }) => {
  const [contactData, setContactData] = useState({
    email: data.email || '',
    phone: data.phone || '',
    alternatePhone: data.alternatePhone || '',
    address: data.address || '',
    city: data.city || '',
    state: data.state || '',
    postalCode: data.postalCode || '',
    country: data.country || '',
    preferredContact: data.preferredContact || 'email'
  });

  const handleChange = (field: string, value: string) => {
    const newData = { ...contactData, [field]: value };
    setContactData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center text-muted-foreground">
        <p>Provide your current contact information for correspondence.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Mailing Address</h3>
        
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
    </div>
  );
};

export default ContactDetailsSection;
