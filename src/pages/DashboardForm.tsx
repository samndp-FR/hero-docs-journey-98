import { DashboardLayout } from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Check, AlertCircle, ArrowRight, ShieldCheck, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface Section {
  id: string;
  title: string;
  description: string;
  fields: string[];
}

const sections: Section[] = [
  { 
    id: 'applicants', 
    title: 'Applicants', 
    description: 'Principal applicant and dependants',
    fields: ['Principal applicant info', 'Spouse/partner details', 'Dependent children']
  },
  { 
    id: 'contact', 
    title: 'Contact Details', 
    description: 'Address and communication preferences',
    fields: ['Current address', 'Mailing address', 'Phone numbers', 'Email']
  },
  { 
    id: 'work', 
    title: 'Work History', 
    description: 'Employment and professional experience',
    fields: ['Current employment', 'Past positions', 'NOC codes', 'Duties']
  },
  { 
    id: 'representative', 
    title: 'Representative', 
    description: 'Immigration consultant or lawyer',
    fields: ['Representative type', 'Contact info', 'Authorization']
  },
  { 
    id: 'personal', 
    title: 'Personal Details', 
    description: 'Identity and family information',
    fields: ['Passport details', 'Birth info', 'Marital status', 'Family members']
  },
  { 
    id: 'history', 
    title: 'Personal History', 
    description: 'Background and travel information',
    fields: ['Addresses (10 years)', 'Travel history', 'Military service', 'Criminal record']
  },
  { 
    id: 'study-languages', 
    title: 'Study & Languages', 
    description: 'Education and language proficiency',
    fields: ['Education history', 'Language test results', 'ECA credentials']
  },
];

const DashboardForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isValidationMode = searchParams.get('validate') === 'true';
  
  const [validatedSections, setValidatedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('validatedSections');
    return saved ? JSON.parse(saved) : [];
  });

  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('validatedSections', JSON.stringify(validatedSections));
  }, [validatedSections]);

  const validateSection = (sectionId: string) => {
    if (!validatedSections.includes(sectionId)) {
      const newValidated = [...validatedSections, sectionId];
      setValidatedSections(newValidated);
      setExpandedSection(null);
      
      // If all sections validated, navigate back to Apply for PR
      if (newValidated.length === sections.length) {
        setTimeout(() => {
          navigate('/dashboard/complete');
        }, 500);
      }
    }
  };

  const unvalidateSection = (sectionId: string) => {
    setValidatedSections(validatedSections.filter(id => id !== sectionId));
  };

  const exitValidationMode = () => {
    navigate('/dashboard/complete');
  };

  const validationProgress = (validatedSections.length / sections.length) * 100;

  if (isValidationMode) {
    return (
      <DashboardLayout>
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
                  <p className="text-sm text-white/80">Review each section before submitting to IRCC</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={exitValidationMode}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4 mr-1" />
                Exit
              </Button>
            </div>
            
            {/* Progress */}
            <div className="mt-4 pt-3 border-t border-white/20">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/80">Validation Progress</span>
                <span className="text-[#F4D03F] font-medium">{validatedSections.length} of {sections.length} sections</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#F4D03F] transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${validationProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Section Cards */}
          <div className="space-y-3">
            {sections.map((section) => {
              const isValidated = validatedSections.includes(section.id);
              const isExpanded = expandedSection === section.id;

              return (
                <Card 
                  key={section.id}
                  className={cn(
                    "transition-all duration-200 cursor-pointer",
                    isValidated && "border-green-500/30 bg-green-50/50 dark:bg-green-950/10",
                    isExpanded && "ring-2 ring-primary-blue/20 border-primary-blue/30"
                  )}
                  onClick={() => !isValidated && setExpandedSection(isExpanded ? null : section.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Status Icon */}
                      <div className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                        isValidated 
                          ? "bg-green-500 text-white" 
                          : "bg-muted text-muted-foreground"
                      )}>
                        {isValidated ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          <AlertCircle className="h-5 w-5" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={cn(
                            "font-medium",
                            isValidated ? "text-green-700 dark:text-green-400" : "text-foreground"
                          )}>
                            {section.title}
                          </h3>
                          {isValidated && (
                            <span className="text-xs bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-medium">
                              Validated
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                      </div>

                      {/* Action */}
                      <div className="flex-shrink-0">
                        {isValidated ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              unvalidateSection(section.id);
                            }}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            Undo
                          </Button>
                        ) : (
                          <ChevronRight className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform",
                            isExpanded && "rotate-90"
                          )} />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && !isValidated && (
                      <div className="mt-4 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-3">
                            Review these fields before validating:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {section.fields.map((field) => (
                              <div key={field} className="flex items-center gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
                                {field}
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/application-form')}
                            className="flex-1"
                          >
                            Review in Form
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => validateSection(section.id)}
                            className="flex-1 bg-primary-blue hover:bg-primary-blue/90"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Mark as Validated
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* All Validated Message */}
          {validatedSections.length === sections.length && (
            <Card className="mt-6 border-green-500/20 bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-5 text-center">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium text-green-700 dark:text-green-400 mb-1">All sections validated!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your form is ready for submission. Returning to Apply for PR...
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    );
  }

  // Normal Build Profile view
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Build Profile</h1>
        <p className="text-muted-foreground mb-6">
          Complete your Express Entry profile with intelligent form-filling.
        </p>
        <Button 
          className="bg-primary-blue hover:bg-primary-blue/90"
          onClick={() => navigate('/application-form')}
        >
          Continue Application
        </Button>
      </div>
    </DashboardLayout>
  );
};

export default DashboardForm;