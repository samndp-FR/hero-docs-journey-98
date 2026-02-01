import React, { useState, useRef, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, Trash2, Briefcase, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react';
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
  // Boundary dates for display (actual row end/start dates)
  boundaryFromYear: string;
  boundaryFromMonth: string;
  boundaryToYear: string;
  boundaryToMonth: string;
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
        
        // Add the gap - store both the fill dates and boundary dates for display
        const gapFromYear = gapFromDate.getFullYear().toString();
        const gapFromMonth = (gapFromDate.getMonth() + 1).toString().padStart(2, '0');
        const gapToYear = gapToDate.getFullYear().toString();
        const gapToMonth = (gapToDate.getMonth() + 1).toString().padStart(2, '0');
        
        if (gapFromDate <= gapToDate) {
          detectedGaps.push({
            afterIndex: i,
            fromDate: gapFromDate,
            toDate: gapToDate,
            fromYear: gapFromYear,
            fromMonth: gapFromMonth,
            toYear: gapToYear,
            toMonth: gapToMonth,
            // Store boundary dates (the actual end/start of surrounding rows)
            boundaryFromYear: nextEndYear,
            boundaryFromMonth: nextEndMonth,
            boundaryToYear: current.fromYear,
            boundaryToMonth: current.fromMonth,
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

  const formatGapRange = (gap: Gap) => {
    // Use boundary dates (the actual end of previous row and start of next row)
    return `${formatDate(gap.boundaryFromYear, gap.boundaryFromMonth)} – ${formatDate(gap.boundaryToYear, gap.boundaryToMonth)}`;
  };

  const hasGapAfterIndex = (index: number) => {
    return gaps.find(g => g.afterIndex === index);
  };

  // Track which rows are expanded
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpanded = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Check if an activity has missing required detail fields
  const hasMissingDetails = (activity: Activity) => {
    return !activity.description || !activity.organization || !activity.country || !activity.city;
  };

  // Get list of missing fields for tooltip/display
  const getMissingFields = (activity: Activity) => {
    const missing: string[] = [];
    if (!activity.description) missing.push('Description');
    if (!activity.organization) missing.push('Organization');
    if (!activity.country) missing.push('Country');
    if (!activity.city) missing.push('City');
    return missing;
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
          <div className="px-4 md:px-8">
            <div className="relative rounded-lg border border-[hsl(var(--section-divider))] overflow-visible">
            <Table>
              <TableHeader>
                <TableRow className="bg-[hsl(var(--section-header-bg))]">
                  <TableHead className="font-semibold w-[100px]">From</TableHead>
                  <TableHead className="font-semibold w-[100px]">To</TableHead>
                  <TableHead className="font-semibold">Activity</TableHead>
                  <TableHead className="font-semibold w-[140px]">Details</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedActivities.map((activity: Activity, index: number) => {
                  const gap = hasGapAfterIndex(index);
                  const isExpanded = expandedRows.has(activity.id);
                  const missingDetails = hasMissingDetails(activity);
                  const missingFields = getMissingFields(activity);
                  
                  return (
                    <React.Fragment key={activity.id}>
                      {/* Main Row */}
                      <TableRow className={index % 2 === 0 ? 'bg-white' : 'bg-[hsl(var(--table-stripe))]'}>
                        <TableCell className="font-medium py-3">
                          {formatDate(activity.fromYear, activity.fromMonth)}
                        </TableCell>
                        <TableCell className="py-3">
                          {activity.isOngoing ? 'Ongoing' : formatDate(activity.toYear, activity.toMonth)}
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex flex-col">
                            <span className="font-medium">{getActivityLabel(activity.activityType)}</span>
                            {activity.organization && (
                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                {activity.organization}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpanded(activity.id)}
                            className={`h-7 px-2 text-xs gap-1 ${
                              missingDetails 
                                ? 'text-destructive hover:text-destructive hover:bg-destructive/10' 
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-3 h-3" />
                            ) : (
                              <ChevronRight className="w-3 h-3" />
                            )}
                            {missingDetails ? (
                              <span className="flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {missingFields.length} missing
                              </span>
                            ) : (
                              'More'
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="py-3">
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
                      
                      {/* Expanded Details Row */}
                      {isExpanded && (
                        <TableRow className={index % 2 === 0 ? 'bg-white' : 'bg-[hsl(var(--table-stripe))]'}>
                          <TableCell colSpan={5} className="pt-0 pb-4 border-t-0">
                            <div className="ml-0 pl-4 border-l-2 border-primary/20">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                                <div>
                                  <Label className={`text-xs ${!activity.description ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    Description {!activity.description && '*'}
                                  </Label>
                                  <p className={`text-sm mt-0.5 ${!activity.description ? 'text-destructive italic' : ''}`}>
                                    {activity.description || 'Missing'}
                                  </p>
                                </div>
                                <div>
                                  <Label className={`text-xs ${!activity.organization ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    Organization {!activity.organization && '*'}
                                  </Label>
                                  <p className={`text-sm mt-0.5 ${!activity.organization ? 'text-destructive italic' : ''}`}>
                                    {activity.organization || 'Missing'}
                                  </p>
                                </div>
                                <div>
                                  <Label className={`text-xs ${!activity.country ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    Country {!activity.country && '*'}
                                  </Label>
                                  <p className={`text-sm mt-0.5 ${!activity.country ? 'text-destructive italic' : ''}`}>
                                    {activity.country || 'Missing'}
                                  </p>
                                </div>
                                <div>
                                  <Label className={`text-xs ${!activity.city ? 'text-destructive' : 'text-muted-foreground'}`}>
                                    City {!activity.city && '*'}
                                  </Label>
                                  <p className={`text-sm mt-0.5 ${!activity.city ? 'text-destructive italic' : ''}`}>
                                    {activity.city || 'Missing'}
                                  </p>
                                </div>
                                {activity.province && (
                                  <div>
                                    <Label className="text-xs text-muted-foreground">Province/State</Label>
                                    <p className="text-sm mt-0.5">{activity.province}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                      
                      {/* Gap Indicator Row - just the line */}
                      {gap && (
                        <TableRow className="border-0 hover:bg-transparent" data-gap-index={index}>
                          <TableCell colSpan={5} className="p-0 border-0 h-px bg-destructive" />
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
            
            {/* Gap plus buttons rendered outside the table for proper overflow */}
            {gaps.map((gap, gapIdx) => {
              // Calculate row heights including expanded rows
              let topOffset = 45; // header height
              for (let i = 0; i <= gap.afterIndex; i++) {
                topOffset += 53; // base row height
                if (expandedRows.has(sortedActivities[i]?.id)) {
                  topOffset += 100; // expanded content height (approximate)
                }
                // Add gap line heights for gaps before this one
                if (gaps.some(g => g.afterIndex === i - 1)) {
                  topOffset += 1;
                }
              }
              
              return (
                <React.Fragment key={`gap-buttons-${gap.afterIndex}`}>
                  {/* Left plus button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fillGap(gap)}
                    className="absolute -left-3 h-6 w-6 rounded-full border-destructive bg-white hover:bg-destructive/10 text-destructive hover:text-destructive z-20"
                    style={{ top: `${topOffset}px` }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  
                  {/* Right plus button */}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => fillGap(gap)}
                    className="absolute -right-3 h-6 w-6 rounded-full border-destructive bg-white hover:bg-destructive/10 text-destructive hover:text-destructive z-20"
                    style={{ top: `${topOffset}px` }}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </React.Fragment>
              );
            })}
            </div>
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
