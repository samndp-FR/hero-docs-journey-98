import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Check, 
  ShieldCheck, 
  X, 
  ChevronDown, 
  User, 
  MapPin, 
  Briefcase, 
  FileText, 
  GraduationCap, 
  Globe, 
  Users,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Applicant {
  id: string;
  firstName: string;
  lastName: string;
  relationship: string;
  dateOfBirth: string;
}

interface SectionData {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: { label: string; value: string }[];
}

// Mock data - in real app this would come from localStorage/context
const getMockApplicants = (): Applicant[] => {
  const saved = localStorage.getItem('formApplicants');
  if (saved) return JSON.parse(saved);
  return [
    { id: '1', firstName: 'John', lastName: 'Smith', relationship: 'Primary', dateOfBirth: '1990-05-15' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', relationship: 'Spouse', dateOfBirth: '1992-08-20' },
  ];
};

const getMockSectionsForApplicant = (applicant: Applicant): SectionData[] => {
  const isPrimary = applicant.relationship === 'Primary';
  
  return [
    {
      id: 'personal',
      title: 'Personal Details',
      icon: <User className="h-4 w-4" />,
      fields: [
        { label: 'Full Name', value: `${applicant.firstName} ${applicant.lastName}` },
        { label: 'Date of Birth', value: applicant.dateOfBirth || 'Not provided' },
        { label: 'Nationality', value: 'Canadian' },
        { label: 'Gender', value: 'Male' },
        { label: 'Marital Status', value: 'Married' },
        { label: 'Passport Number', value: 'AB1234567' },
        { label: 'Passport Expiry', value: '2028-05-15' },
      ]
    },
    {
      id: 'contact',
      title: 'Contact Details',
      icon: <MapPin className="h-4 w-4" />,
      fields: [
        { label: 'Email', value: 'john.smith@email.com' },
        { label: 'Phone', value: '+1 (416) 555-0123' },
        { label: 'Address', value: '123 Main Street, Apt 4B' },
        { label: 'City', value: 'Toronto' },
        { label: 'Province', value: 'Ontario' },
        { label: 'Postal Code', value: 'M5V 2K1' },
      ]
    },
    {
      id: 'work',
      title: 'Work History',
      icon: <Briefcase className="h-4 w-4" />,
      fields: isPrimary ? [
        { label: 'Current Position', value: 'Software Engineer at Tech Corp' },
        { label: 'Employment Type', value: 'Full-time' },
        { label: 'Start Date', value: '2019-03-01' },
        { label: 'NOC Code', value: '21231 - Software engineers' },
        { label: 'Annual Salary', value: '$95,000 CAD' },
      ] : [
        { label: 'Current Position', value: 'Marketing Manager at Brand Co' },
        { label: 'Employment Type', value: 'Full-time' },
        { label: 'Start Date', value: '2020-06-15' },
      ]
    },
    {
      id: 'history',
      title: 'Personal History',
      icon: <Globe className="h-4 w-4" />,
      fields: [
        { label: 'Countries Visited (5 years)', value: 'USA, UK, France, Japan' },
        { label: 'Previous Addresses', value: '2 addresses on file' },
        { label: 'Military Service', value: 'No' },
        { label: 'Criminal Record', value: 'No' },
      ]
    },
    {
      id: 'study',
      title: 'Study & Languages',
      icon: <GraduationCap className="h-4 w-4" />,
      fields: isPrimary ? [
        { label: 'Highest Education', value: "Master's Degree - Computer Science" },
        { label: 'Institution', value: 'University of Toronto' },
        { label: 'Graduation Year', value: '2018' },
        { label: 'IELTS Score', value: 'L:8.5 R:8.0 W:7.5 S:8.0' },
        { label: 'French Level', value: 'CLB 5' },
      ] : [
        { label: 'Highest Education', value: "Bachelor's Degree - Marketing" },
        { label: 'Institution', value: 'McGill University' },
        { label: 'Graduation Year', value: '2014' },
      ]
    },
  ];
};

interface ValidationModeViewProps {
  onExit: () => void;
}

const ValidationModeView: React.FC<ValidationModeViewProps> = ({ onExit }) => {
  const navigate = useNavigate();
  const applicants = getMockApplicants();
  
  // Track validated sections per applicant: { applicantId: ['personal', 'contact', ...] }
  const [validatedSections, setValidatedSections] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('validatedSectionsByApplicant');
    return saved ? JSON.parse(saved) : {};
  });

  const [expandedApplicant, setExpandedApplicant] = useState<string>(applicants[0]?.id || '');

  useEffect(() => {
    localStorage.setItem('validatedSectionsByApplicant', JSON.stringify(validatedSections));
  }, [validatedSections]);

  const totalSections = applicants.reduce((acc, applicant) => {
    return acc + getMockSectionsForApplicant(applicant).length;
  }, 0);

  const totalValidated = Object.values(validatedSections).reduce((acc, sections) => acc + sections.length, 0);
  const validationProgress = (totalValidated / totalSections) * 100;

  const isApplicantFullyValidated = (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return false;
    const sections = getMockSectionsForApplicant(applicant);
    return (validatedSections[applicantId]?.length || 0) === sections.length;
  };

  const isSectionValidated = (applicantId: string, sectionId: string) => {
    return validatedSections[applicantId]?.includes(sectionId) || false;
  };

  const toggleSectionValidation = (applicantId: string, sectionId: string) => {
    setValidatedSections(prev => {
      const current = prev[applicantId] || [];
      if (current.includes(sectionId)) {
        return { ...prev, [applicantId]: current.filter(s => s !== sectionId) };
      } else {
        const updated = { ...prev, [applicantId]: [...current, sectionId] };
        
        // Check if all done
        const newTotalValidated = Object.values(updated).reduce((acc, sections) => acc + sections.length, 0);
        if (newTotalValidated === totalSections) {
          setTimeout(() => {
            navigate('/dashboard/complete');
          }, 800);
        }
        
        return updated;
      }
    });
  };

  const getApplicantProgress = (applicantId: string) => {
    const applicant = applicants.find(a => a.id === applicantId);
    if (!applicant) return { validated: 0, total: 0 };
    const sections = getMockSectionsForApplicant(applicant);
    return {
      validated: validatedSections[applicantId]?.length || 0,
      total: sections.length
    };
  };

  const allValidated = totalValidated === totalSections;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Validation Mode Banner */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-primary-blue to-primary-blue/90 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4D03F] flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-primary-blue" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Validation Mode Active</h2>
              <p className="text-sm text-white/80">Review each applicant's data before submitting</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            className="text-white hover:bg-white/10"
          >
            <X className="h-4 w-4 mr-1" />
            Exit
          </Button>
        </div>
        
        {/* Progress */}
        <div className="mt-4 pt-3 border-t border-white/20">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">Overall Progress</span>
            <span className="text-[#F4D03F] font-medium">{totalValidated} of {totalSections} sections</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#F4D03F] transition-all duration-500 ease-out rounded-full"
              style={{ width: `${validationProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Applicants Accordion */}
      <Accordion 
        type="single" 
        collapsible 
        value={expandedApplicant}
        onValueChange={setExpandedApplicant}
        className="space-y-3"
      >
        {applicants.map((applicant) => {
          const progress = getApplicantProgress(applicant.id);
          const isFullyValidated = isApplicantFullyValidated(applicant.id);
          const sections = getMockSectionsForApplicant(applicant);

          return (
            <AccordionItem 
              key={applicant.id} 
              value={applicant.id}
              className={cn(
                "border rounded-xl overflow-hidden transition-all",
                isFullyValidated && "border-green-500/30 bg-green-50/50 dark:bg-green-950/10"
              )}
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex items-center gap-3 w-full">
                  {/* Avatar */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white font-medium",
                    isFullyValidated ? "bg-green-500" : "bg-primary-blue"
                  )}>
                    {isFullyValidated ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      `${applicant.firstName[0]}${applicant.lastName[0]}`
                    )}
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{applicant.firstName} {applicant.lastName}</span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                        {applicant.relationship}
                      </span>
                      {isFullyValidated && (
                        <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
                          ✓ Validated
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {progress.validated}/{progress.total} sections validated
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-2 pt-2">
                  {sections.map((section) => {
                    const isValidated = isSectionValidated(applicant.id, section.id);
                    
                    return (
                      <SectionCard
                        key={section.id}
                        section={section}
                        isValidated={isValidated}
                        onValidate={() => toggleSectionValidation(applicant.id, section.id)}
                        onEdit={() => navigate('/application-form')}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* All Validated Message */}
      {allValidated && (
        <Card className="mt-6 border-green-500/20 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-5 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-green-700 dark:text-green-400 mb-1">All sections validated!</h3>
            <p className="text-sm text-muted-foreground">
              Your application is ready for submission. Returning to Apply for PR...
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Section Card Component
interface SectionCardProps {
  section: SectionData;
  isValidated: boolean;
  onValidate: () => void;
  onEdit: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, isValidated, onValidate, onEdit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={cn(
      "transition-all",
      isValidated && "border-green-500/30 bg-green-50/30 dark:bg-green-950/10"
    )}>
      <div 
        className="p-3 cursor-pointer flex items-center gap-3"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Icon */}
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center",
          isValidated ? "bg-green-500/10 text-green-600" : "bg-muted text-muted-foreground"
        )}>
          {isValidated ? <Check className="h-4 w-4" /> : section.icon}
        </div>
        
        {/* Title */}
        <div className="flex-1">
          <span className={cn(
            "font-medium text-sm",
            isValidated && "text-green-700 dark:text-green-400"
          )}>
            {section.title}
          </span>
        </div>
        
        {/* Expand Arrow */}
        <ChevronDown className={cn(
          "h-4 w-4 text-muted-foreground transition-transform",
          isExpanded && "rotate-180"
        )} />
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-border">
          {/* Data Fields */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 py-3">
            {section.fields.map((field, idx) => (
              <div key={idx} className="text-sm">
                <span className="text-muted-foreground">{field.label}:</span>
                <span className="ml-1 font-medium">{field.value}</span>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="flex-1"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Edit in Form
            </Button>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onValidate();
              }}
              className={cn(
                "flex-1",
                isValidated 
                  ? "bg-muted text-muted-foreground hover:bg-muted/80" 
                  : "bg-primary-blue hover:bg-primary-blue/90"
              )}
            >
              <Check className="h-4 w-4 mr-1" />
              {isValidated ? 'Undo Validation' : 'Mark as Validated'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ValidationModeView;
