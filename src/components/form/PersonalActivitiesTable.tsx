import React, { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Trash2, Briefcase, AlertCircle } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';

interface Activity {
  id: string;
  fromYear: string;
  fromMonth: string;
  toYear: string;
  toMonth: string;
  isOngoing: boolean;
  activityType: string;
  description: string;
  organization: string;
  country: string;
  province: string;
  city: string;
}

interface Gap {
  afterIndex: number;
  fromDate: Date;
  toDate: Date;
  fromYear: string;
  fromMonth: string;
  toYear: string;
  toMonth: string;
}

interface PersonalActivitiesTableProps {
  data: any;
  onUpdate: (data: any) => void;
}

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const ACTIVITY_TYPES = [
  { value: 'employment', label: 'Employment' },
  { value: 'education', label: 'Education' },
  { value: 'unemployment', label: 'Unemployment' },
  { value: 'travel', label: 'Travel' },
  { value: 'parental_leave', label: 'Parental Leave' },
  { value: 'medical_leave', label: 'Medical Leave' },
  { value: 'military_service', label: 'Military Service' },
  { value: 'volunteer', label: 'Volunteer Work' },
  { value: 'other', label: 'Other' },
];

const generateId = () => Math.random().toString(36).substring(2, 9);

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 15 }, (_, i) => (currentYear - i).toString());

const PersonalActivitiesTable: React.FC<PersonalActivitiesTableProps> = ({ data, onUpdate }) => {
  const formRef = useRef<HTMLDivElement>(null);
  
  const [activitiesData, setActivitiesData] = useState({
    activities: data.activities || [] as Activity[],
  });

  // Form state for adding new activity
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    fromYear: '',
    fromMonth: '',
    toYear: '',
    toMonth: '',
    isOngoing: false,
    activityType: '',
    description: '',
    organization: '',
    country: '',
    province: '',
    city: '',
  });

  // Sort activities by start date (most recent first)
  const sortedActivities = useMemo(() => {
    return [...activitiesData.activities].sort((a, b) => {
      const dateA = new Date(parseInt(a.fromYear), parseInt(a.fromMonth) - 1);
      const dateB = new Date(parseInt(b.fromYear), parseInt(b.fromMonth) - 1);
      return dateB.getTime() - dateA.getTime();
    });
  }, [activitiesData.activities]);

  // Calculate gaps in the 10-year history
  const gaps = useMemo(() => {
    if (sortedActivities.length === 0) return [];
    
    const detectedGaps: Gap[] = [];
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
    
    for (let i = 0; i < sortedActivities.length - 1; i++) {
      const current = sortedActivities[i];
      const next = sortedActivities[i + 1];
      
      // End date of current activity
      const currentEndYear = current.isOngoing ? currentYear.toString() : current.toYear;
      const currentEndMonth = current.isOngoing ? (new Date().getMonth() + 1).toString().padStart(2, '0') : current.toMonth;
      
      // Start date of next activity (which is earlier in time)
      const nextEndYear = next.isOngoing ? currentYear.toString() : next.toYear;
      const nextEndMonth = next.isOngoing ? (new Date().getMonth() + 1).toString().padStart(2, '0') : next.toMonth;
      
      // Current activity starts at
      const currentStartDate = new Date(parseInt(current.fromYear), parseInt(current.fromMonth) - 1);
      // Next activity ends at
      const nextEndDate = new Date(parseInt(nextEndYear), parseInt(nextEndMonth) - 1);
      
      // Gap exists if next activity ends before current activity starts
      // We need at least 1 month gap
      const gapMonths = (currentStartDate.getFullYear() - nextEndDate.getFullYear()) * 12 
                       + (currentStartDate.getMonth() - nextEndDate.getMonth());
      
      if (gapMonths > 1) {
        // There's a gap between nextEndDate and currentStartDate
        const gapFromDate = new Date(nextEndDate);
        gapFromDate.setMonth(gapFromDate.getMonth() + 1); // Start of gap is month after next ends
        
        const gapToDate = new Date(currentStartDate);
        gapToDate.setMonth(gapToDate.getMonth() - 1); // End of gap is month before current starts
        
        if (gapFromDate <= gapToDate) {
          detectedGaps.push({
            afterIndex: i,
            fromDate: gapFromDate,
            toDate: gapToDate,
            fromYear: gapFromDate.getFullYear().toString(),
            fromMonth: (gapFromDate.getMonth() + 1).toString().padStart(2, '0'),
            toYear: gapToDate.getFullYear().toString(),
            toMonth: (gapToDate.getMonth() + 1).toString().padStart(2, '0'),
          });
        }
      }
    }
    
    return detectedGaps;
  }, [sortedActivities]);

  const handleNewActivityChange = (field: keyof Activity, value: string | boolean) => {
    setNewActivity(prev => ({ ...prev, [field]: value }));
  };

  const addActivity = () => {
    if (!newActivity.fromYear || !newActivity.fromMonth || !newActivity.activityType) {
      return; // Basic validation
    }
    
    const activity: Activity = {
      id: generateId(),
      fromYear: newActivity.fromYear || '',
      fromMonth: newActivity.fromMonth || '',
      toYear: newActivity.toYear || '',
      toMonth: newActivity.toMonth || '',
      isOngoing: newActivity.isOngoing || false,
      activityType: newActivity.activityType || '',
      description: newActivity.description || '',
      organization: newActivity.organization || '',
      country: newActivity.country || '',
      province: newActivity.province || '',
      city: newActivity.city || '',
    };
    
    const newActivities = [...activitiesData.activities, activity];
    const newData = { ...activitiesData, activities: newActivities };
    setActivitiesData(newData);
    onUpdate({ ...data, activities: newActivities });
    
    // Reset form
    setNewActivity({
      fromYear: '',
      fromMonth: '',
      toYear: '',
      toMonth: '',
      isOngoing: false,
      activityType: '',
      description: '',
      organization: '',
      country: '',
      province: '',
      city: '',
    });
  };

  const removeActivity = (id: string) => {
    const newActivities = activitiesData.activities.filter((a: Activity) => a.id !== id);
    const newData = { ...activitiesData, activities: newActivities };
    setActivitiesData(newData);
    onUpdate({ ...data, activities: newActivities });
  };

  const fillGap = (gap: Gap) => {
    // Pre-fill the form with gap dates
    setNewActivity({
      fromYear: gap.fromYear,
      fromMonth: gap.fromMonth,
      toYear: gap.toYear,
      toMonth: gap.toMonth,
      isOngoing: false,
      activityType: '',
      description: '',
      organization: '',
      country: '',
      province: '',
      city: '',
    });
    
    // Scroll to form
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const formatDate = (year: string, month: string) => {
    if (!year || !month) return '-';
    const monthLabel = MONTHS.find(m => m.value === month)?.label || month;
    return `${monthLabel.substring(0, 3)} ${year}`;
  };

  const getActivityLabel = (type: string) => {
    return ACTIVITY_TYPES.find(t => t.value === type)?.label || type;
  };

  const hasGapAfterIndex = (index: number) => {
    return gaps.find(g => g.afterIndex === index);
  };

  return (
    <Card className="overflow-hidden border-[hsl(var(--section-divider))] shadow-sm">
      <div className="bg-[hsl(var(--section-header-bg))] px-6 py-5">
        <FormSectionHeader 
          icon={Briefcase} 
          title="Personal Activities (Past 10 Years)" 
          description="List all activities without gaps - employment, education, unemployment, travel, etc."
        />
      </div>
      <CardContent className="p-6 space-y-6">
        {/* Add Activity Form */}
        <div ref={formRef} className="p-5 rounded-xl border border-[hsl(var(--section-divider))] bg-[hsl(var(--question-bg))]">
          <h4 className="font-medium text-sm text-foreground mb-4">Add New Activity</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs text-muted-foreground">Since what year? *</Label>
                <Select value={newActivity.fromYear} onValueChange={(v) => handleNewActivityChange('fromYear', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEARS.map(year => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Since what year? (Month) *</Label>
                <Select value={newActivity.fromMonth} onValueChange={(v) => handleNewActivityChange('fromMonth', v)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {MONTHS.map(month => (
                      <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="ongoing"
                  checked={newActivity.isOngoing}
                  onCheckedChange={(checked) => handleNewActivityChange('isOngoing', !!checked)}
                />
                <Label htmlFor="ongoing" className="text-xs text-muted-foreground cursor-pointer">
                  This activity is currently ongoing
                </Label>
              </div>
            </div>
          </div>

          {!newActivity.isOngoing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs text-muted-foreground">To (Year) *</Label>
                  <Select value={newActivity.toYear} onValueChange={(v) => handleNewActivityChange('toYear', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map(year => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">To (Month) *</Label>
                  <Select value={newActivity.toMonth} onValueChange={(v) => handleNewActivityChange('toMonth', v)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map(month => (
                        <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-xs text-muted-foreground">Activity Type *</Label>
              <Select value={newActivity.activityType} onValueChange={(v) => handleNewActivityChange('activityType', v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select activity" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Please describe what this person was doing during this period (required)</Label>
              <Input
                className="mt-1"
                value={newActivity.description}
                onChange={(e) => handleNewActivityChange('description', e.target.value)}
                placeholder="Job title, position, or activity details"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label className="text-xs text-muted-foreground">Please provide the name of the company, employer, school, or facility as appropriate. (required)</Label>
              <Input
                className="mt-1"
                value={newActivity.organization}
                onChange={(e) => handleNewActivityChange('organization', e.target.value)}
                placeholder="Company/School/Facility"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label className="text-xs text-muted-foreground">Country where activity took place (required)</Label>
              <Select value={newActivity.country} onValueChange={(v) => handleNewActivityChange('country', v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="India">India</SelectItem>
                  <SelectItem value="China">China</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Province/Territory</Label>
              <Select value={newActivity.province} onValueChange={(v) => handleNewActivityChange('province', v)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Please select" />
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
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">City/Town where activity took place (required)</Label>
              <Input
                className="mt-1"
                value={newActivity.city}
                onChange={(e) => handleNewActivityChange('city', e.target.value)}
                placeholder="City/Town"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={addActivity} className="bg-primary-blue hover:bg-primary-blue/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Personal Activity
            </Button>
          </div>
        </div>

        {/* Activities Table */}
        {sortedActivities.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No personal activities yet. Add one using the form above.
          </p>
        ) : (
          <div className="rounded-lg border border-[hsl(var(--section-divider))] overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--section-header-bg))]">
                  <TableHead className="font-semibold">From</TableHead>
                  <TableHead className="font-semibold">To</TableHead>
                  <TableHead className="font-semibold">Activity</TableHead>
                  <TableHead className="font-semibold">Organization</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedActivities.map((activity: Activity, index: number) => {
                  const gap = hasGapAfterIndex(index);
                  return (
                    <React.Fragment key={activity.id}>
                      <TableRow className={index % 2 === 0 ? 'bg-white' : 'bg-[hsl(var(--table-stripe))]'}>
                        <TableCell className="font-medium">
                          {formatDate(activity.fromYear, activity.fromMonth)}
                        </TableCell>
                        <TableCell>
                          {activity.isOngoing ? 'Ongoing' : formatDate(activity.toYear, activity.toMonth)}
                        </TableCell>
                        <TableCell>{getActivityLabel(activity.activityType)}</TableCell>
                        <TableCell>{activity.organization || '-'}</TableCell>
                        <TableCell>
                          {[activity.city, activity.province, activity.country].filter(Boolean).join(', ') || '-'}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeActivity(activity.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      
                      {/* Gap Indicator Row */}
                      {gap && (
                        <TableRow className="h-0 border-0">
                          <TableCell colSpan={6} className="p-0 border-0">
                            <div className="relative flex items-center justify-center py-0">
                              {/* Red gap line */}
                              <div className="absolute inset-x-0 top-1/2 h-[2px] bg-destructive" />
                              
                              {/* Left plus button */}
                              <div className="absolute left-2 z-10">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => fillGap(gap)}
                                  className="h-6 w-6 rounded-full border-destructive bg-white hover:bg-destructive/10 text-destructive hover:text-destructive"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                              
                              {/* Center gap info */}
                              <div className="z-10 px-3 py-0.5 bg-destructive/10 border border-destructive rounded-full flex items-center gap-1.5">
                                <AlertCircle className="w-3 h-3 text-destructive" />
                                <span className="text-xs font-medium text-destructive">
                                  Gap: {formatDate(gap.fromYear, gap.fromMonth)} – {formatDate(gap.toYear, gap.toMonth)}
                                </span>
                              </div>
                              
                              {/* Right plus button */}
                              <div className="absolute right-2 z-10">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => fillGap(gap)}
                                  className="h-6 w-6 rounded-full border-destructive bg-white hover:bg-destructive/10 text-destructive hover:text-destructive"
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Summary */}
        {gaps.length > 0 && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
            <p className="text-sm text-destructive">
              {gaps.length} gap{gaps.length > 1 ? 's' : ''} detected in your 10-year history. 
              Click the <Plus className="w-3 h-3 inline mx-0.5" /> buttons to add missing activities.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalActivitiesTable;
