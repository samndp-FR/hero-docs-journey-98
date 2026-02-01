import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Trash2, MapPin, Plane, Scale, Flag, Shield, ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import TravelHistoryTable from './TravelHistoryTable';
import PersonalActivitiesTable from './PersonalActivitiesTable';
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

// Section header component for consistent styling
const SectionHeader: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description?: string;
}> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 pb-4 mb-6 border-b border-[hsl(var(--section-divider))]">
    <div className="p-2 rounded-lg bg-primary-blue/10 text-primary-blue shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="text-lg font-semibold text-primary-blue">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  </div>
);

// Question group component for better visual organization
const QuestionGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`p-4 rounded-lg bg-[hsl(var(--question-bg))] border border-[hsl(var(--section-divider))] ${className}`}>
    {children}
  </div>
);

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
    travelHistory: data.travelHistory || [],
    criminalHistory: data.criminalHistory || '',
    criminalDetails: data.criminalDetails || '',
    immigrationHistory: data.immigrationHistory || '',
    immigrationDetails: data.immigrationDetails || '',
    militaryService: data.militaryService || '',
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

  const handleTravelHistoryUpdate = (travelData: any) => {
    const newData = { ...historyData, ...travelData };
    setHistoryData(newData);
    onUpdate(newData);
  };

  // Compact radio question component
  const renderRadioQuestion = (
    field: string, 
    question: string, 
    detailsField?: string,
    detailsPlaceholder?: string,
    isRequired: boolean = true
  ) => {
    const isUnanswered = isRequired && !historyData[field];
    
    return (
      <QuestionGroup className={cn(
        "space-y-3 transition-colors",
        isUnanswered && "border-destructive/50 bg-destructive/5"
      )}>
        <div className="flex items-start justify-between gap-4">
          <Label className={cn(
            "text-sm font-medium leading-relaxed flex-1 pt-1",
            isUnanswered && "text-destructive"
          )}>
            {question}
            {isRequired && <span className="text-destructive ml-1">*</span>}
          </Label>
          <div className="flex items-center gap-3 shrink-0">
            {isUnanswered && (
              <AlertCircle className="w-4 h-4 text-destructive" />
            )}
            <RadioGroup
              value={historyData[field]}
              onValueChange={(value) => handleChange(field, value)}
              className="flex items-center gap-4"
            >
              <Label 
                htmlFor={`${field}-no`} 
                className="flex items-center gap-2 cursor-pointer text-sm font-normal"
              >
                <RadioGroupItem value="no" id={`${field}-no`} />
                <span>No</span>
              </Label>
              <Label 
                htmlFor={`${field}-yes`} 
                className="flex items-center gap-2 cursor-pointer text-sm font-normal"
              >
                <RadioGroupItem value="yes" id={`${field}-yes`} />
                <span>Yes</span>
              </Label>
            </RadioGroup>
          </div>
        </div>
        
        {detailsField && historyData[field] === 'yes' && (
          <div className="pt-2 border-t border-[hsl(var(--section-divider))]">
            <Label htmlFor={detailsField} className="text-sm text-muted-foreground">
              Please provide details
            </Label>
            <Textarea
              id={detailsField}
              value={historyData[detailsField] || ''}
              onChange={(e) => handleChange(detailsField, e.target.value)}
              placeholder={detailsPlaceholder}
              rows={3}
              className="mt-2"
            />
          </div>
        )}
      </QuestionGroup>
    );
  };

  const handlePersonalActivitiesUpdate = (activitiesData: any) => {
    const newData = { ...historyData, ...activitiesData };
    setHistoryData(newData);
    onUpdate(newData);
  };

  return (
    <div className="space-y-8">
      {/* Intro Text */}
      <div className="text-center text-muted-foreground px-4">
        <p>Provide information about your personal history including addresses, travel, legal, and immigration background.</p>
      </div>

      {/* Personal Activities Section (10 Year History) */}
      <PersonalActivitiesTable
        data={historyData}
        onUpdate={handlePersonalActivitiesUpdate}
      />
      {/* Address History Section */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm bg-[hsl(var(--section-address-bg))]">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <SectionHeader 
            icon={<MapPin className="w-5 h-5" />}
            title="Address History"
            description="List all addresses where you've lived in the last 5 years"
          />
        </div>
        <CardContent className="px-6 pb-6 pt-2">
          <div className="space-y-4">
            {historyData.addresses.map((address, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl border border-[hsl(var(--section-divider))] bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                    <h4 className="font-medium text-sm">
                      {address.current ? 'Current Address' : `Previous Address`}
                    </h4>
                  </div>
                  {historyData.addresses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAddress(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 px-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                  <div className="md:col-span-2">
                    <Label htmlFor={`street-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                      Street Address
                    </Label>
                    <Input
                      id={`street-${index}`}
                      value={address.street}
                      onChange={(e) => updateAddress(index, 'street', e.target.value)}
                      placeholder="123 Main Street"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`city-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                      City
                    </Label>
                    <Input
                      id={`city-${index}`}
                      value={address.city}
                      onChange={(e) => updateAddress(index, 'city', e.target.value)}
                      placeholder="New York"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`state-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                      State/Province
                    </Label>
                    <Input
                      id={`state-${index}`}
                      value={address.state}
                      onChange={(e) => updateAddress(index, 'state', e.target.value)}
                      placeholder="NY"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`country-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                      Country
                    </Label>
                    <Input
                      id={`country-${index}`}
                      value={address.country}
                      onChange={(e) => updateAddress(index, 'country', e.target.value)}
                      placeholder="United States"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label htmlFor={`fromDate-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                        From
                      </Label>
                      <Input
                        id={`fromDate-${index}`}
                        type="date"
                        value={address.fromDate}
                        onChange={(e) => updateAddress(index, 'fromDate', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`toDate-${index}`} className="text-xs text-muted-foreground uppercase tracking-wide">
                        To
                      </Label>
                      <Input
                        id={`toDate-${index}`}
                        type="date"
                        value={address.toDate}
                        onChange={(e) => updateAddress(index, 'toDate', e.target.value)}
                        disabled={address.current}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4 pt-3 border-t border-[hsl(var(--section-divider))]">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={address.current}
                    onChange={(e) => updateAddress(index, 'current', e.target.checked)}
                    className="rounded border-muted-foreground/30"
                  />
                  <Label htmlFor={`current-${index}`} className="text-sm text-muted-foreground cursor-pointer">
                    This is my current address
                  </Label>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addAddress}
              className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Address</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Travel History Section */}
      <div className="space-y-0">
        <TravelHistoryTable 
          data={historyData}
          onUpdate={handleTravelHistoryUpdate}
        />
      </div>

      {/* Background Questions Section */}
      <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm bg-[hsl(var(--section-background-bg))]">
        <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
          <SectionHeader 
            icon={<Shield className="w-5 h-5" />}
            title="Background Questions"
            description="Please answer the following questions honestly"
          />
        </div>
        <CardContent className="px-6 pb-6 pt-2">
          <div className="space-y-4">
            {/* Legal History */}
            <Collapsible defaultOpen className="rounded-xl bg-white/80 border border-[hsl(var(--section-divider))] overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-white/90 transition-colors group">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                  <Scale className="w-4 h-4" />
                  <span>Legal History</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 animate-accordion-down data-[state=closed]:animate-accordion-up">
                {renderRadioQuestion(
                  'criminalHistory',
                  'Have you ever been arrested, cited, charged, or detained by any law enforcement officer?',
                  'criminalDetails',
                  'Provide complete details including dates, charges, and outcomes...'
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Immigration History */}
            <Collapsible defaultOpen className="rounded-xl bg-white/80 border border-[hsl(var(--section-divider))] overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-white/90 transition-colors group">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                  <Flag className="w-4 h-4" />
                  <span>Immigration History</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 animate-accordion-down data-[state=closed]:animate-accordion-up">
                {renderRadioQuestion(
                  'immigrationHistory',
                  'Have you ever been denied entry, deported, or removed from any country?',
                  'immigrationDetails',
                  'Provide complete details including dates, countries, and reasons...'
                )}
              </CollapsibleContent>
            </Collapsible>

            {/* Military Service */}
            <Collapsible defaultOpen className="rounded-xl bg-white/80 border border-[hsl(var(--section-divider))] overflow-hidden">
              <CollapsibleTrigger className="flex items-center justify-between w-full p-5 hover:bg-white/90 transition-colors group">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-wide">
                  <Shield className="w-4 h-4" />
                  <span>Military Service</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="px-5 pb-5 animate-accordion-down data-[state=closed]:animate-accordion-up">
                {renderRadioQuestion(
                  'militaryService',
                  "Have you ever served in any country's military, militia, or civil defense unit?",
                  'militaryDetails',
                  'Provide details including service dates, branch, rank, and duties...'
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalHistorySection;
