
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, Award, TrendingUp, Zap, BadgePlus, AlertTriangle, Stethoscope, Cpu, Hammer, Wheat, GraduationCap, UserCheck, Search, ChevronDown, ChevronUp, CircleSlash, CheckCircle2, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ScoreAssessmentQuestionnaireProps {
  onComplete: (results: any) => void;
  onCancel: () => void;
}

// Occupation categories with NOC codes
const OCCUPATION_CATEGORIES = {
  healthcare: {
    id: 'healthcare',
    label: 'Healthcare and Social Services',
    icon: Stethoscope,
    color: 'text-rose-600 bg-rose-50 border-rose-200',
    occupations: [
      { name: 'Specialists in clinical and laboratory medicine', noc: '31100', teer: 1 },
      { name: 'Specialists in surgery', noc: '31101', teer: 1 },
      { name: 'General practitioners and family physicians', noc: '31102', teer: 1 },
      { name: 'Veterinarians', noc: '31103', teer: 1 },
      { name: 'Dentists', noc: '31110', teer: 1 },
      { name: 'Optometrists', noc: '31111', teer: 1 },
      { name: 'Audiologists and speech language pathologists', noc: '31112', teer: 1 },
      { name: 'Pharmacists', noc: '31120', teer: 1 },
      { name: 'Dieticians and nutritionists', noc: '31121', teer: 1 },
      { name: 'Psychologists', noc: '31200', teer: 1 },
      { name: 'Chiropractors', noc: '31201', teer: 1 },
      { name: 'Physiotherapists', noc: '31202', teer: 1 },
      { name: 'Occupational therapists', noc: '31203', teer: 1 },
      { name: 'Other professional occupations in health diagnosing and treating', noc: '31209', teer: 1 },
      { name: 'Nursing co-ordinators and supervisors', noc: '31300', teer: 1 },
      { name: 'Registered nurses and registered psychiatric nurses', noc: '31301', teer: 1 },
      { name: 'Nurse practitioners', noc: '31302', teer: 1 },
      { name: 'Physician assistants, midwives and allied health professionals', noc: '31303', teer: 1 },
      { name: 'Licensed practical nurses', noc: '32101', teer: 2 },
      { name: 'Paramedical occupations', noc: '32102', teer: 2 },
      { name: 'Respiratory therapists, clinical perfusionists and cardiopulmonary technologists', noc: '32103', teer: 2 },
      { name: 'Animal health technologists and veterinary technicians', noc: '32104', teer: 2 },
      { name: 'Other technical occupations in therapy and assessment', noc: '32109', teer: 2 },
      { name: 'Dental hygienists and dental therapists', noc: '32111', teer: 2 },
      { name: 'Medical laboratory technologists', noc: '32120', teer: 2 },
      { name: 'Medical radiation technologists', noc: '32121', teer: 2 },
      { name: 'Medical sonographers', noc: '32122', teer: 2 },
      { name: 'Cardiology technologists and electrophysiological diagnostic technologists', noc: '32123', teer: 2 },
      { name: 'Pharmacy technicians', noc: '32124', teer: 2 },
      { name: 'Other medical technologists and technicians', noc: '32129', teer: 2 },
      { name: 'Massage therapists', noc: '32201', teer: 2 },
      { name: 'Medical laboratory assistants and related technical occupations', noc: '33101', teer: 3 },
      { name: 'Nurse aides, orderlies and patient service associates', noc: '33102', teer: 3 },
      { name: 'Pharmacy technical assistants and pharmacy assistants', noc: '33103', teer: 3 },
      { name: 'Social workers', noc: '41300', teer: 1 },
      { name: 'Therapists in counselling and related specialized therapies', noc: '41301', teer: 1 },
      { name: 'Social and community service workers', noc: '42201', teer: 2 },
    ]
  },
  stem: {
    id: 'stem',
    label: 'Science, Technology, Engineering and Math (STEM)',
    icon: Cpu,
    color: 'text-blue-600 bg-blue-50 border-blue-200',
    occupations: [
      { name: 'Architecture and science managers', noc: '20011', teer: 0 },
      { name: 'Cybersecurity specialists', noc: '21220', teer: 1 },
      { name: 'Civil Engineers', noc: '21300', teer: 1 },
      { name: 'Mechanical Engineers', noc: '21301', teer: 1 },
      { name: 'Electrical and electronics engineers', noc: '21310', teer: 1 },
      { name: 'Industrial and manufacturing engineers', noc: '21321', teer: 1 },
      { name: 'Geological Engineers', noc: '21331', teer: 1 },
      { name: 'Civil engineering technologists and technicians', noc: '22300', teer: 2 },
      { name: 'Mechanical Engineering Technologists and Technicians', noc: '22301', teer: 2 },
      { name: 'Electrical and electronics engineering technologists and technicians', noc: '22310', teer: 2 },
      { name: 'Insurance agents and brokers', noc: '63100', teer: 3 },
    ]
  },
  trade: {
    id: 'trade',
    label: 'Trade Occupations',
    icon: Hammer,
    color: 'text-amber-600 bg-amber-50 border-amber-200',
    occupations: [
      { name: 'Construction estimators', noc: '22303', teer: 2 },
      { name: 'Cooks', noc: '63200', teer: 3 },
      { name: 'Construction managers', noc: '70010', teer: 0 },
      { name: 'Home building and renovation managers', noc: '70011', teer: 0 },
      { name: 'Machinists and machining and tooling inspectors', noc: '72100', teer: 2 },
      { name: 'Sheet metal workers', noc: '72102', teer: 2 },
      { name: 'Welders and related machine operators', noc: '72106', teer: 2 },
      { name: 'Electricians (except industrial and power system)', noc: '72200', teer: 2 },
      { name: 'Industrial electricians', noc: '72201', teer: 2 },
      { name: 'Plumbers', noc: '72300', teer: 2 },
      { name: 'Gas fitters', noc: '72302', teer: 2 },
      { name: 'Carpenters', noc: '72310', teer: 2 },
      { name: 'Cabinetmakers', noc: '72311', teer: 2 },
      { name: 'Bricklayers', noc: '72320', teer: 2 },
      { name: 'Construction millwrights and industrial mechanics', noc: '72400', teer: 2 },
      { name: 'Heavy-duty equipment mechanics', noc: '72401', teer: 2 },
      { name: 'Heating, refrigeration and air conditioning mechanics', noc: '72402', teer: 2 },
      { name: 'Electrical mechanics', noc: '72422', teer: 2 },
      { name: 'Water well drillers', noc: '72501', teer: 2 },
      { name: 'Other technical trades and related occupations', noc: '72999', teer: 2 },
      { name: 'Concrete finishers', noc: '73100', teer: 3 },
      { name: 'Roofers and shinglers', noc: '73110', teer: 3 },
      { name: 'Painters and decorators (except interior decorators)', noc: '73112', teer: 3 },
      { name: 'Floor covering installers', noc: '73113', teer: 3 },
      { name: 'Contractors and supervisors, oil and gas drilling and services', noc: '82021', teer: 2 },
    ]
  },
  agriculture: {
    id: 'agriculture',
    label: 'Agriculture and Agri-Food',
    icon: Wheat,
    color: 'text-green-600 bg-green-50 border-green-200',
    occupations: [
      { name: 'Butchers - retail and wholesale', noc: '63201', teer: 3 },
    ]
  },
  education: {
    id: 'education',
    label: 'Education Occupations',
    icon: GraduationCap,
    color: 'text-purple-600 bg-purple-50 border-purple-200',
    occupations: [
      { name: 'Secondary school teachers', noc: '41220', teer: 1 },
      { name: 'Elementary school and kindergarten teachers', noc: '41221', teer: 1 },
      { name: 'Early childhood educators and assistants', noc: '42202', teer: 2 },
      { name: 'Instructors of persons with disabilities', noc: '42203', teer: 2 },
      { name: 'Elementary and secondary school teacher assistants', noc: '43100', teer: 3 },
    ]
  },
  physicians: {
    id: 'physicians',
    label: 'Physicians with Canadian Work Experience',
    icon: UserCheck,
    color: 'text-teal-600 bg-teal-50 border-teal-200',
    description: 'Requires valid job offer or Canadian work experience in one of these occupations',
    occupations: [
      { name: 'Specialists in clinical and laboratory medicine', noc: '31100', teer: 1 },
      { name: 'Specialists in surgery', noc: '31101', teer: 1 },
      { name: 'General practitioners and family physicians', noc: '31102', teer: 1 },
    ]
  }
};

// CRS Points reference data
const CRS_POINTS = {
  age: {
    label: 'Age',
    maxPoints: 110,
    options: {
      '17': { points: 0, label: '17 or under' },
      '18': { points: 99, label: '18' },
      '19': { points: 105, label: '19' },
      '20': { points: 110, label: '20-29' },
      '30': { points: 105, label: '30-35' },
      '36': { points: 77, label: '36-40' },
      '41': { points: 44, label: '41-45' },
      '46': { points: 0, label: '46 or older' },
    }
  },
  education: {
    label: 'Education',
    maxPoints: 150,
    options: {
      'A': { points: 0, label: 'Less than secondary' },
      'B': { points: 30, label: 'Secondary diploma' },
      'C': { points: 90, label: 'One-year program' },
      'D': { points: 98, label: 'Two-year program' },
      'E': { points: 120, label: "Bachelor's degree" },
      'F': { points: 128, label: 'Two+ credentials' },
      'G': { points: 135, label: "Master's degree" },
      'H': { points: 150, label: 'Doctoral degree' },
    }
  },
  canadianExp: {
    label: 'Canadian Experience',
    maxPoints: 80,
    options: {
      'A': { points: 0, label: 'None/less than 1 year' },
      'B': { points: 40, label: '1 year' },
      'C': { points: 53, label: '2 years' },
      'D': { points: 64, label: '3 years' },
      'E': { points: 72, label: '4 years' },
      'F': { points: 80, label: '5+ years' },
    }
  },
  foreignExp: {
    label: 'Foreign Experience',
    maxPoints: 50,
    options: {
      'A': { points: 0, label: 'None/less than 1 year' },
      'B': { points: 13, label: '1 year' },
      'C': { points: 25, label: '2 years' },
      'D': { points: 50, label: '3+ years' },
    }
  },
  provincialNom: {
    label: 'Provincial Nomination',
    maxPoints: 600,
    options: {
      'A': { points: 0, label: 'No' },
      'B': { points: 600, label: 'Yes' },
    }
  },
  spouse: {
    label: 'Spouse',
    maxPoints: 40,
    options: {
      'none': { points: 0, label: 'No spouse/Not accompanying' },
      'low': { points: 10, label: 'Spouse with basic qualifications' },
      'medium': { points: 25, label: 'Spouse with strong qualifications' },
      'high': { points: 40, label: 'Spouse with excellent qualifications' },
    }
  }
};

// Skill Transferability - bonus points that unlock under certain conditions
const SKILL_TRANSFERABILITY = {
  education: {
    label: 'Education Transferability',
    maxPoints: 50, // Combined cap
    factors: {
      languageProficiency: {
        label: 'Language + Education',
        maxPoints: 50,
        // Points based on education level and CLB
        getPoints: (educationLevel: string, hasLanguage: boolean) => {
          if (!hasLanguage || !educationLevel || educationLevel === 'A' || educationLevel === 'B') return 0;
          const eduPointMap: Record<string, number> = {
            'C': 13, 'D': 19, 'E': 25, 'F': 25, 'G': 25, 'H': 25
          };
          return eduPointMap[educationLevel] || 0;
        }
      },
      canadianExperience: {
        label: 'Canadian Experience + Education',
        maxPoints: 50,
        getPoints: (educationLevel: string, canadianExp: string) => {
          if (!canadianExp || canadianExp === 'A' || !educationLevel || educationLevel === 'A' || educationLevel === 'B') return 0;
          const eduPointMap: Record<string, number> = {
            'C': 13, 'D': 19, 'E': 25, 'F': 25, 'G': 25, 'H': 25
          };
          return eduPointMap[educationLevel] || 0;
        }
      }
    }
  },
  foreignExp: {
    label: 'Foreign Experience Transferability',
    maxPoints: 50, // Combined cap
    factors: {
      languageProficiency: {
        label: 'Language + Foreign Experience',
        maxPoints: 50,
        getPoints: (foreignExp: string, hasLanguage: boolean) => {
          if (!hasLanguage || !foreignExp || foreignExp === 'A') return 0;
          const expPointMap: Record<string, number> = {
            'B': 13, 'C': 19, 'D': 25
          };
          return expPointMap[foreignExp] || 0;
        }
      },
      canadianExperience: {
        label: 'Canadian + Foreign Experience',
        maxPoints: 50,
        getPoints: (foreignExp: string, canadianExp: string) => {
          if (!canadianExp || canadianExp === 'A' || !foreignExp || foreignExp === 'A') return 0;
          const expPointMap: Record<string, number> = {
            'B': 13, 'C': 19, 'D': 25
          };
          return expPointMap[foreignExp] || 0;
        }
      }
    }
  }
};

interface ScoreIndicatorProps {
  current: number;
  max: number;
  label: string;
  isAnswered: boolean;
  bonusFactors?: {
    languageBonus: number;
    canadianExpBonus: number;
    maxBonus: number;
    cappedBonus: number;
  };
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({ current, max, label, isAnswered, bonusFactors }) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  
  const getPerformanceColor = () => {
    if (!isAnswered) return 'bg-muted';
    if (percentage >= 80) return 'bg-emerald-500';
    if (percentage >= 50) return 'bg-amber-500';
    return 'bg-rose-400';
  };

  const getPerformanceLabel = () => {
    if (!isAnswered) return 'Not answered';
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 50) return 'Good';
    if (percentage > 0) return 'Room to improve';
    return 'No points';
  };

  const hasBonusPoints = bonusFactors && (bonusFactors.languageBonus > 0 || bonusFactors.canadianExpBonus > 0);
  const isCapped = bonusFactors && (bonusFactors.languageBonus + bonusFactors.canadianExpBonus) > bonusFactors.maxBonus;

  return (
    <div className="mt-3 p-3 rounded-lg bg-muted/30 border border-border/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Zap className={`h-4 w-4 ${isAnswered ? 'text-primary' : 'text-muted-foreground'}`} />
          <span className="text-xs font-medium text-muted-foreground">Point Contribution</span>
        </div>
        <Badge 
          variant={isAnswered ? "secondary" : "outline"} 
          className={`text-xs ${isAnswered && percentage >= 80 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : ''} ${isAnswered && percentage < 80 && percentage >= 50 ? 'bg-amber-100 text-amber-700 border-amber-200' : ''} ${isAnswered && percentage < 50 && percentage > 0 ? 'bg-rose-100 text-rose-700 border-rose-200' : ''}`}
        >
          {getPerformanceLabel()}
        </Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out rounded-full ${getPerformanceColor()}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="text-right min-w-[80px]">
          <span className={`text-lg font-bold ${isAnswered ? 'text-foreground' : 'text-muted-foreground'}`}>
            {isAnswered ? current : '—'}
          </span>
          <span className="text-muted-foreground text-sm"> / {max}</span>
        </div>
      </div>
      
      {isAnswered && percentage < 100 && (
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="h-3 w-3" />
          <span>+{max - current} points potential</span>
        </div>
      )}

      {/* Skill Transferability Bonus Section */}
      {bonusFactors && isAnswered && (
        <div className="mt-4 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <BadgePlus className="h-4 w-4 text-violet-500" />
            <span className="text-xs font-semibold text-violet-700">Skill Transferability Bonus</span>
            <Badge variant="outline" className="text-xs bg-violet-50 text-violet-600 border-violet-200">
              Max +{bonusFactors.maxBonus}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {/* Language Proficiency Bonus */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Language Proficiency</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${bonusFactors.languageBonus > 0 ? 'text-violet-600' : 'text-muted-foreground'}`}>
                  +{bonusFactors.languageBonus}
                </span>
                {bonusFactors.languageBonus > 0 && (
                  <Badge variant="outline" className="text-[10px] bg-violet-100 text-violet-700 border-violet-200 px-1.5 py-0">
                    Unlocked
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Canadian Experience Bonus */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Canadian Experience</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${bonusFactors.canadianExpBonus > 0 ? 'text-violet-600' : 'text-muted-foreground'}`}>
                  +{bonusFactors.canadianExpBonus}
                </span>
                {bonusFactors.canadianExpBonus > 0 && (
                  <Badge variant="outline" className="text-[10px] bg-violet-100 text-violet-700 border-violet-200 px-1.5 py-0">
                    Unlocked
                  </Badge>
                )}
              </div>
            </div>

            {/* Capped Total */}
            {hasBonusPoints && (
              <div className="mt-2 pt-2 border-t border-dashed border-violet-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-violet-700">Total Bonus</span>
                    {isCapped && (
                      <div className="flex items-center gap-1 text-amber-600">
                        <AlertTriangle className="h-3 w-3" />
                        <span className="text-[10px]">Capped</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {isCapped && (
                      <span className="text-xs text-muted-foreground line-through">
                        +{bonusFactors.languageBonus + bonusFactors.canadianExpBonus}
                      </span>
                    )}
                    <span className="text-sm font-bold text-violet-700">
                      +{bonusFactors.cappedBonus}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {!hasBonusPoints && (
              <div className="mt-2 p-2 bg-muted/50 rounded text-[10px] text-muted-foreground">
                Complete language tests and/or gain Canadian experience to unlock transferability bonuses
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ScoreAssessmentQuestionnaire: React.FC<ScoreAssessmentQuestionnaireProps> = ({ onComplete, onCancel }) => {
  const [formData, setFormData] = useState({
    q1: '',
    q2i: '',
    q2ii: '',
    q3: '',
    q4: '',
    q4b: '',
    q4c: '',
    q5i: '',
    q5ia: '',
    q5ibSpeaking: '',
    q5ibListening: '',
    q5ibReading: '',
    q5ibWriting: '',
    q5ii: '',
    q5iiSpeaking: '',
    q5iiListening: '',
    q5iiReading: '',
    q5iiWriting: '',
    q6i: '',
    q6ii: '',
    q7: '',
    q8: '',
    q8a: '',
    q9: '',
    q10i: '',
    q10: '',
    q11: '',
    q12i: '',
    q12iiSpeaking: '',
    q12iiListening: '',
    q12iiReading: '',
    q12iiWriting: '',
    occupationCategory: '',
    selectedOccupation: '',
  });

  // Category-based assessment state
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [occupationSearch, setOccupationSearch] = useState('');

  // Calculate spouse score based on answers
  const calculateSpouseScore = useMemo(() => {
    // If no spouse or spouse not coming, return 0
    if (!formData.q1 || formData.q1 === 'F' || formData.q2i === 'B' || formData.q2ii === 'A') {
      return 0;
    }
    // Calculate based on spouse-related questions (simplified scoring)
    let score = 0;
    if (formData.q2ii === 'B') score += 10; // Spouse coming to Canada
    if (formData.q12i) score += 15; // Spouse has education
    if (formData.q12iiSpeaking || formData.q12iiListening || formData.q12iiReading || formData.q12iiWriting) score += 15;
    return Math.min(score, 40);
  }, [formData]);

  // Calculate running score based on current answers
  const currentScores = useMemo(() => {
    return {
      age: formData.q3 ? (CRS_POINTS.age.options[formData.q3 as keyof typeof CRS_POINTS.age.options]?.points || 0) : 0,
      education: formData.q4 ? (CRS_POINTS.education.options[formData.q4 as keyof typeof CRS_POINTS.education.options]?.points || 0) : 0,
      canadianExp: formData.q6i ? (CRS_POINTS.canadianExp.options[formData.q6i as keyof typeof CRS_POINTS.canadianExp.options]?.points || 0) : 0,
      foreignExp: formData.q6ii ? (CRS_POINTS.foreignExp.options[formData.q6ii as keyof typeof CRS_POINTS.foreignExp.options]?.points || 0) : 0,
      provincialNom: formData.q9 ? (CRS_POINTS.provincialNom.options[formData.q9 as keyof typeof CRS_POINTS.provincialNom.options]?.points || 0) : 0,
      spouse: calculateSpouseScore,
    };
  }, [formData, calculateSpouseScore]);

  // Calculate skill transferability bonuses
  const skillTransferability = useMemo(() => {
    // Determine if user has language proficiency (answered language test questions)
    const hasLanguageProficiency = !!(formData.q5ia);
    const canadianExp = formData.q6i;
    const foreignExp = formData.q6ii;
    const educationLevel = formData.q4;

    // Education transferability (max 50 combined)
    const eduLanguageBonus = SKILL_TRANSFERABILITY.education.factors.languageProficiency.getPoints(educationLevel, hasLanguageProficiency);
    const eduCanadianExpBonus = SKILL_TRANSFERABILITY.education.factors.canadianExperience.getPoints(educationLevel, canadianExp);
    const eduTotalRaw = eduLanguageBonus + eduCanadianExpBonus;
    const eduCappedBonus = Math.min(eduTotalRaw, SKILL_TRANSFERABILITY.education.maxPoints);

    // Foreign experience transferability (max 50 combined)
    const foreignLanguageBonus = SKILL_TRANSFERABILITY.foreignExp.factors.languageProficiency.getPoints(foreignExp, hasLanguageProficiency);
    const foreignCanadianExpBonus = SKILL_TRANSFERABILITY.foreignExp.factors.canadianExperience.getPoints(foreignExp, canadianExp);
    const foreignTotalRaw = foreignLanguageBonus + foreignCanadianExpBonus;
    const foreignCappedBonus = Math.min(foreignTotalRaw, SKILL_TRANSFERABILITY.foreignExp.maxPoints);

    return {
      education: {
        languageBonus: eduLanguageBonus,
        canadianExpBonus: eduCanadianExpBonus,
        maxBonus: SKILL_TRANSFERABILITY.education.maxPoints,
        cappedBonus: eduCappedBonus,
      },
      foreignExp: {
        languageBonus: foreignLanguageBonus,
        canadianExpBonus: foreignCanadianExpBonus,
        maxBonus: SKILL_TRANSFERABILITY.foreignExp.maxPoints,
        cappedBonus: foreignCappedBonus,
      },
      totalCappedBonus: eduCappedBonus + foreignCappedBonus,
    };
  }, [formData]);

  const totalCurrentScore = useMemo(() => {
    const baseScore = Object.values(currentScores).reduce((sum, score) => sum + score, 0);
    return baseScore + skillTransferability.totalCappedBonus;
  }, [currentScores, skillTransferability]);

  const totalMaxScore = useMemo(() => {
    return CRS_POINTS.age.maxPoints + CRS_POINTS.education.maxPoints + CRS_POINTS.canadianExp.maxPoints + CRS_POINTS.foreignExp.maxPoints + CRS_POINTS.provincialNom.maxPoints + CRS_POINTS.spouse.maxPoints + 100; // +100 for skill transferability max
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ 
      ...formData, 
      calculatedScores: currentScores, 
      totalScore: totalCurrentScore,
      skillTransferability 
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Calculator className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-foreground">CRS Score Calculator</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Calculate your Comprehensive Ranking System (CRS) score for Express Entry based on your personal information and qualifications.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Official Tool
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Express Entry Ready
          </Badge>
        </div>
      </div>

      {/* Live Score Tracker */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 sticky top-20 z-10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Running Score</h3>
                <p className="text-xs text-muted-foreground">Based on your current answers</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{totalCurrentScore}</div>
              <div className="text-sm text-muted-foreground">of {totalMaxScore} possible</div>
            </div>
          </div>
          <Progress value={(totalCurrentScore / totalMaxScore) * 100} className="h-3" />
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(currentScores).map(([key, score]) => (
              <Badge 
                key={key} 
                variant="outline" 
                className={`text-xs ${score > 0 ? 'bg-primary/10 border-primary/30' : ''}`}
              >
                {CRS_POINTS[key as keyof typeof CRS_POINTS]?.label}: {score}
              </Badge>
            ))}
            {skillTransferability.totalCappedBonus > 0 && (
              <Badge 
                variant="outline" 
                className="text-xs bg-violet-100 border-violet-300 text-violet-700"
              >
                <BadgePlus className="h-3 w-3 mr-1" />
                Skill Transferability: +{skillTransferability.totalCappedBonus}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Legal Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="text-amber-700 space-y-2">
          <p>This tool is intended solely for general guidance and reference purposes.</p>
          <p>In the event of any discrepancy between the results of this questionnaire and that provided by the Express Entry electronic system, the results provided by the system shall govern.</p>
        </CardContent>
      </Card>

      {/* Main Form */}
      <Card>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Personal Information</h3>
              
              {/* Question 1 - Marital Status */}
              <div className="space-y-2">
                <label htmlFor="q1" className="text-sm font-medium text-foreground">
                  1) What is your marital status?
                </label>
                <select 
                  id="q1" 
                  name="q1" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q1} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">Annulled Marriage</option>
                  <option value="B">Common-Law</option>
                  <option value="C">Divorced / Separated</option>
                  <option value="D">Legally Separated</option>
                  <option value="E">Married</option>
                  <option value="F">Never Married / Single</option>
                  <option value="G">Widowed</option>
                </select>
              </div>

              {/* Question 2i - Spouse Citizenship */}
              <div className="space-y-2">
                <label htmlFor="q2i" className="text-sm font-medium text-foreground">
                  2) i. Is your spouse or common-law partner a citizen or permanent resident of Canada?
                </label>
                <select 
                  id="q2i" 
                  name="q2i" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q2i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
              </div>

              {/* Question 2ii - Spouse Coming to Canada */}
              <div className="space-y-2">
                <label htmlFor="q2ii" className="text-sm font-medium text-foreground">
                  2) ii. Will your spouse or common-law partner come with you to Canada?
                </label>
                <select 
                  id="q2ii" 
                  name="q2ii" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q2ii} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
              </div>

              {/* Question 3 - Age */}
              <div className="space-y-2">
                <label htmlFor="q3" className="text-sm font-medium text-foreground">
                  3) How old are you?
                </label>
                <div className="text-sm text-muted-foreground mb-2">
                  <p>Choose the best answer:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>If you've been invited to apply, enter your age on the date you were invited.</li>
                    <li>If you plan to complete an Express Entry profile, enter your current age.</li>
                  </ul>
                </div>
                <select 
                  id="q3" 
                  name="q3" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q3} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="17">17 or under</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20-29</option>
                  <option value="30">30-35</option>
                  <option value="36">36-40</option>
                  <option value="41">41-45</option>
                  <option value="46">46 or older</option>
                </select>
                <ScoreIndicator 
                  current={currentScores.age} 
                  max={CRS_POINTS.age.maxPoints} 
                  label="Age Points"
                  isAnswered={!!formData.q3}
                />
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Education</h3>
              
              {/* Question 4 - Education Level */}
              <div className="space-y-2">
                <label htmlFor="q4" className="text-sm font-medium text-foreground">
                  4) What is your level of education?
                </label>
                <div className="text-sm text-muted-foreground mb-2">
                  <p>Enter the highest level of education for which you:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>earned a <strong>Canadian degree, diploma or certificate</strong> or</li>
                    <li>had an Educational Credential Assessment (ECA) if you did your study outside Canada</li>
                  </ul>
                </div>
                <select 
                  id="q4" 
                  name="q4" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q4} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">Less than secondary school</option>
                  <option value="B">Secondary diploma (high school graduation)</option>
                  <option value="C">One-year degree, diploma or certificate</option>
                  <option value="D">Two-year program</option>
                  <option value="E">Bachelor's degree</option>
                  <option value="F">Two or more certificates, diplomas, or degrees</option>
                  <option value="G">Master's degree</option>
                  <option value="H">Doctoral level university degree (PhD)</option>
                </select>
                <ScoreIndicator 
                  current={currentScores.education} 
                  max={CRS_POINTS.education.maxPoints} 
                  label="Education Points"
                  isAnswered={!!formData.q4}
                  bonusFactors={skillTransferability.education}
                />
              </div>
            </div>

            {/* Language Skills Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Language Skills</h3>
              
              {/* Question 5i - Test Results */}
              <div className="space-y-2">
                <label htmlFor="q5i" className="text-sm font-medium text-foreground">
                  5) i. Are your test results less than two years old?
                </label>
                <select 
                  id="q5i" 
                  name="q5i" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q5i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="B">No</option>
                  <option value="A">Yes</option>
                </select>
              </div>

              {/* Question 5ia - Language Test Type */}
              <div className="space-y-2">
                <label htmlFor="q5i-a" className="text-sm font-medium text-foreground">
                  ii. Which language test did you take for your first official language?
                </label>
                <select 
                  id="q5i-a" 
                  name="q5ia" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q5ia} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">CELPIP-G</option>
                  <option value="B">IELTS</option>
                  <option value="E">PTE Core</option>
                  <option value="C">TEF Canada</option>
                  <option value="D">TCF Canada</option>
                </select>
              </div>
            </div>

            {/* Work Experience Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Work Experience</h3>
              
              {/* Question 6i - Canadian Work Experience */}
              <div className="space-y-2">
                <label htmlFor="q6i" className="text-sm font-medium text-foreground">
                  6) i. In the last 10 years, how many years of skilled work experience in Canada do you have?
                </label>
                <div className="text-sm text-muted-foreground mb-2">
                  <p>It must have been paid and full-time (or an equal amount in part-time).</p>
                </div>
                <select 
                  id="q6i" 
                  name="q6i" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q6i} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">None or less than a year</option>
                  <option value="B">1 year</option>
                  <option value="C">2 years</option>
                  <option value="D">3 years</option>
                  <option value="E">4 years</option>
                  <option value="F">5 years or more</option>
                </select>
                <ScoreIndicator 
                  current={currentScores.canadianExp} 
                  max={CRS_POINTS.canadianExp.maxPoints} 
                  label="Canadian Experience Points"
                  isAnswered={!!formData.q6i}
                />
              </div>

              {/* Question 6ii - Foreign Work Experience */}
              <div className="space-y-2">
                <label htmlFor="q6ii" className="text-sm font-medium text-foreground">
                  ii. In the last 10 years, how many total years of foreign skilled work experience do you have?
                </label>
                <select 
                  id="q6ii" 
                  name="q6ii" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q6ii} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">None or less than a year</option>
                  <option value="B">1 year</option>
                  <option value="C">2 years</option>
                  <option value="D">3 years or more</option>
                </select>
                <ScoreIndicator 
                  current={currentScores.foreignExp} 
                  max={CRS_POINTS.foreignExp.maxPoints} 
                  label="Foreign Experience Points"
                  isAnswered={!!formData.q6ii}
                  bonusFactors={skillTransferability.foreignExp}
                />
              </div>
            </div>

            {/* Additional Qualifications Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">Additional Points</h3>
              
              {/* Question 9 - Provincial Nomination */}
              <div className="space-y-2">
                <label htmlFor="q9" className="text-sm font-medium text-foreground">
                  9) Do you have a nomination certificate from a province or territory?
                </label>
                <select 
                  id="q9" 
                  name="q9" 
                  className="w-full px-3 py-2 border border-input bg-background rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  value={formData.q9} 
                  onChange={handleInputChange}
                >
                  <option value="">Select...</option>
                  <option value="A">No</option>
                  <option value="B">Yes</option>
                </select>
                <ScoreIndicator 
                  current={currentScores.provincialNom} 
                  max={CRS_POINTS.provincialNom.maxPoints} 
                  label="Provincial Nomination Points"
                  isAnswered={!!formData.q9}
                />
              </div>
            </div>

            {/* Category-Based Assessment Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground border-b border-border pb-2">
                Category-Based Assessment
              </h3>
              <p className="text-sm text-muted-foreground">
                Select your occupation category to see if you qualify for category-based Express Entry draws. 
                These draws target specific occupations that are in high demand in Canada.
              </p>
              
              {/* Collapsible Conditions Section */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <Info className="h-4 w-4" />
                  <span>Conditions</span>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                    <p className="font-medium mb-2">To be eligible, you must:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-700">
                      <li>Have accumulated, within the past 3 years, at least 6 months of full-time, continuous work experience (or an equal amount of part-time experience)</li>
                      <li>In a single occupation listed in the table below (no matter your primary occupation)</li>
                      <li>In Canada or abroad</li>
                      <li>Meet all of the requirements in the instructions for that round</li>
                    </ul>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Category Selection */}
              <div className="space-y-4">
                {Object.values(OCCUPATION_CATEGORIES).map((category) => {
                  const CategoryIcon = category.icon;
                  const isExpanded = expandedCategory === category.id;
                  const isSelected = formData.occupationCategory === category.id;
                  
                  // Filter occupations based on search
                  const filteredOccupations = category.occupations.filter(occ => 
                    occ.name.toLowerCase().includes(occupationSearch.toLowerCase()) ||
                    occ.noc.includes(occupationSearch)
                  );

                  return (
                    <Card 
                      key={category.id} 
                      className={`border-2 transition-all ${isSelected ? category.color : 'border-border hover:border-primary/30'}`}
                    >
                      <Collapsible open={isExpanded} onOpenChange={() => {
                        setExpandedCategory(isExpanded ? null : category.id);
                        setOccupationSearch('');
                      }}>
                        <CollapsibleTrigger asChild>
                          <CardHeader className={`cursor-pointer ${isSelected ? category.color : ''}`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${category.color}`}>
                                  <CategoryIcon className="h-5 w-5" />
                                </div>
                                <div>
                                  <CardTitle className="text-base font-semibold">{category.label}</CardTitle>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {category.occupations.length} eligible occupation{category.occupations.length !== 1 ? 's' : ''}
                                  </p>
                                  {(category as any).description && (
                                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                                      <Info className="h-3 w-3" />
                                      {(category as any).description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {isSelected && formData.selectedOccupation && (
                                  <Badge variant="secondary" className="text-xs">
                                    Selected
                                  </Badge>
                                )}
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                )}
                              </div>
                            </div>
                          </CardHeader>
                        </CollapsibleTrigger>
                        
                        <CollapsibleContent>
                          <CardContent className="pt-0">
                            {/* Search Input */}
                            <div className="relative mb-4">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search by occupation or NOC code..."
                                value={occupationSearch}
                                onChange={(e) => setOccupationSearch(e.target.value)}
                                className="pl-10"
                              />
                            </div>

                            {/* Occupations Table */}
                            <ScrollArea className="h-[300px] rounded-md border">
                              <div className="p-4">
                                <table className="w-full">
                                  <thead>
                                    <tr className="border-b border-border">
                                      <th className="text-left py-2 px-3 text-sm font-semibold text-muted-foreground">Occupation</th>
                                      <th className="text-left py-2 px-3 text-sm font-semibold text-muted-foreground w-24">NOC Code</th>
                                      <th className="text-left py-2 px-3 text-sm font-semibold text-muted-foreground w-20">TEER</th>
                                      <th className="w-20"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredOccupations.length === 0 ? (
                                      <tr>
                                        <td colSpan={4} className="text-center py-8 text-muted-foreground">
                                          No occupations found matching your search.
                                        </td>
                                      </tr>
                                    ) : (
                                      filteredOccupations.map((occupation, idx) => {
                                        const isOccupationSelected = formData.selectedOccupation === occupation.noc + '-' + occupation.name;
                                        return (
                                          <tr 
                                            key={idx} 
                                            className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${isOccupationSelected ? 'bg-primary/10' : ''}`}
                                          >
                                            <td className="py-3 px-3 text-sm">{occupation.name}</td>
                                            <td className="py-3 px-3 text-sm font-mono">{occupation.noc}</td>
                                            <td className="py-3 px-3">
                                              <Badge variant="outline" className="text-xs">
                                                {occupation.teer}
                                              </Badge>
                                            </td>
                                            <td className="py-3 px-3">
                                              <Button
                                                type="button"
                                                size="sm"
                                                variant={isOccupationSelected ? "default" : "outline"}
                                                onClick={() => {
                                                  setFormData(prev => ({
                                                    ...prev,
                                                    occupationCategory: category.id,
                                                    selectedOccupation: isOccupationSelected ? '' : occupation.noc + '-' + occupation.name
                                                  }));
                                                }}
                                              >
                                                {isOccupationSelected ? 'Selected' : 'Select'}
                                              </Button>
                                            </td>
                                          </tr>
                                        );
                                      })
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </ScrollArea>

                            {/* Selected Occupation Display */}
                            {isSelected && formData.selectedOccupation && (
                              <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                                <div className="flex items-center gap-2">
                                  <Badge className="bg-primary text-primary-foreground">Selected Occupation</Badge>
                                </div>
                                <p className="mt-2 text-sm font-medium">
                                  {formData.selectedOccupation.split('-').slice(1).join('-')}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  NOC: {formData.selectedOccupation.split('-')[0]}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </CollapsibleContent>
                      </Collapsible>
                    </Card>
                  );
                })}
              </div>

              {/* None of the Above Option */}
              <Card 
                className={`border-2 transition-all cursor-pointer ${
                  formData.occupationCategory === 'none' 
                    ? 'border-slate-400 bg-slate-50' 
                    : 'border-border hover:border-primary/30'
                }`}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    occupationCategory: prev.occupationCategory === 'none' ? '' : 'none',
                    selectedOccupation: ''
                  }));
                  setExpandedCategory(null);
                }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${formData.occupationCategory === 'none' ? 'bg-slate-200' : 'bg-muted'}`}>
                        <CircleSlash className={`h-5 w-5 ${formData.occupationCategory === 'none' ? 'text-slate-600' : 'text-muted-foreground'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base font-semibold">None of the above</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          My occupation doesn't fit these categories
                        </p>
                      </div>
                    </div>
                    {formData.occupationCategory === 'none' && (
                      <CheckCircle2 className="h-5 w-5 text-slate-600" />
                    )}
                  </div>
                </CardHeader>
              </Card>

              {/* Category Assessment Note */}
              {formData.selectedOccupation && (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Award className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-emerald-800">Category-Based Draw Eligible</h4>
                      <p className="text-sm text-emerald-700 mt-1">
                        Your selected occupation may qualify you for category-based Express Entry draws, which often have lower CRS cutoff scores than general draws.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reassuring note for "None of the above" */}
              {formData.occupationCategory === 'none' && (
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-800">You can still be invited!</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Don't worry — even if your occupation isn't in one of these targeted categories, you can still receive an Invitation to Apply (ITA) through general Express Entry draws based on your CRS score.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-border">
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate Your Score
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="px-8 py-3" 
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreAssessmentQuestionnaire;
