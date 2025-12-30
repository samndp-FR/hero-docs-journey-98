import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import ScoreAssessmentQuestionnaire from '@/components/ScoreAssessmentQuestionnaire';
import ConversionCard from '@/components/ConversionCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, Trophy, Target, TrendingUp, ChevronDown, Calendar, Clock, MapPin, Stethoscope, Languages, Briefcase, GraduationCap, AlertCircle, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Draw categories with recent cutoff data
const DRAW_CATEGORIES = [
  {
    id: 'pnp',
    name: 'Provincial Nominee Program',
    icon: MapPin,
    description: 'Candidates with provincial/territorial nomination',
    recentCutoff: 764,
    lastDrawDate: '2024-12-18',
    avgDrawFrequency: 14,
    color: 'blue'
  },
  {
    id: 'healthcare',
    name: 'Healthcare Occupations',
    icon: Stethoscope,
    description: 'Healthcare and social services workers',
    recentCutoff: 431,
    lastDrawDate: '2024-12-11',
    avgDrawFrequency: 21,
    color: 'green'
  },
  {
    id: 'french',
    name: 'French Language Proficiency',
    icon: Languages,
    description: 'Candidates with strong French skills',
    recentCutoff: 379,
    lastDrawDate: '2024-12-04',
    avgDrawFrequency: 14,
    color: 'purple'
  },
  {
    id: 'cec',
    name: 'Canadian Experience Class',
    icon: Briefcase,
    description: 'Candidates with Canadian work experience',
    recentCutoff: 522,
    lastDrawDate: '2024-11-27',
    avgDrawFrequency: 28,
    color: 'amber'
  },
  {
    id: 'education',
    name: 'Education Occupations',
    icon: GraduationCap,
    description: 'Teachers and education professionals',
    recentCutoff: 447,
    lastDrawDate: '2024-11-20',
    avgDrawFrequency: 28,
    color: 'rose'
  }
];

const POINT_POTENTIAL = {
  age: { current: 0, max: 110, label: 'Age' },
  education: { current: 0, max: 150, label: 'Education' },
  language: { current: 0, max: 160, label: 'Language (First)' },
  secondLanguage: { current: 0, max: 24, label: 'Language (Second)' },
  canadianExp: { current: 0, max: 80, label: 'Canadian Experience' },
  foreignExp: { current: 0, max: 50, label: 'Foreign Experience' },
  skillTransferability: { current: 0, max: 100, label: 'Skill Transferability' },
  provincialNom: { current: 0, max: 600, label: 'Provincial Nomination' },
  spouse: { current: 0, max: 40, label: 'Spouse Factors' }
};

const CRSCalculator = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    coreHumanCapital: false,
    spouseFactors: false,
    skillTransferability: false,
    additionalPoints: false
  });
  const navigate = useNavigate();

  const handleComplete = (formData: any) => {
    const calculatedScores = formData.calculatedScores || {};
    const totalScore = formData.totalScore || 0;
    
    setResults({
      totalScore,
      breakdown: {
        coreHumanCapital: {
          total: (calculatedScores.age || 0) + (calculatedScores.education || 0),
          details: {
            age: calculatedScores.age || 0,
            education: calculatedScores.education || 0,
            language: 0,
          }
        },
        spouseFactors: {
          total: calculatedScores.spouse || 0,
          details: {
            education: 0,
            language: 0,
            experience: 0
          }
        },
        skillTransferability: {
          total: formData.skillTransferability?.totalCappedBonus || 0,
          details: {
            educationLanguage: formData.skillTransferability?.education?.languageBonus || 0,
            educationExperience: formData.skillTransferability?.education?.canadianExpBonus || 0,
            foreignLanguage: formData.skillTransferability?.foreignExp?.languageBonus || 0,
            foreignExperience: formData.skillTransferability?.foreignExp?.canadianExpBonus || 0
          }
        },
        additionalPoints: {
          total: calculatedScores.provincialNom || 0,
          details: {
            provincialNomination: calculatedScores.provincialNom || 0,
            jobOffer: 0,
            canadianEducation: 0
          }
        }
      },
      pointPotential: {
        age: { current: calculatedScores.age || 0, max: 110 },
        education: { current: calculatedScores.education || 0, max: 150 },
        canadianExp: { current: calculatedScores.canadianExp || 0, max: 80 },
        foreignExp: { current: calculatedScores.foreignExp || 0, max: 50 },
        provincialNom: { current: calculatedScores.provincialNom || 0, max: 600 },
        spouse: { current: calculatedScores.spouse || 0, max: 40 }
      },
      formData
    });
    setShowResults(true);
  };

  const handleStartOver = () => {
    setShowResults(false);
    setResults(null);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const bestCategory = useMemo(() => {
    if (!results) return null;
    
    const score = results.totalScore;
    const hasPNP = results.pointPotential?.provincialNom?.current > 0;
    
    if (hasPNP) {
      return DRAW_CATEGORIES.find(c => c.id === 'pnp');
    }
    
    const eligibleCategories = DRAW_CATEGORIES.filter(c => c.id !== 'pnp');
    const sorted = eligibleCategories.sort((a, b) => {
      const aMargin = score - a.recentCutoff;
      const bMargin = score - b.recentCutoff;
      if (aMargin >= 0 && bMargin < 0) return -1;
      if (bMargin >= 0 && aMargin < 0) return 1;
      return Math.abs(aMargin) - Math.abs(bMargin);
    });
    
    return sorted[0];
  }, [results]);

  const daysUntilNextDraw = useMemo(() => {
    if (!bestCategory) return null;
    const lastDraw = new Date(bestCategory.lastDrawDate);
    const expectedNext = new Date(lastDraw.getTime() + bestCategory.avgDrawFrequency * 24 * 60 * 60 * 1000);
    const today = new Date();
    const diff = Math.ceil((expectedNext.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  }, [bestCategory]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      rose: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
    };
    return colors[color] || colors.blue;
  };

  if (showResults && results) {
    const breakdownSections = [
      {
        key: 'coreHumanCapital',
        title: 'Core Human Capital',
        total: results.breakdown.coreHumanCapital.total,
        color: 'blue',
        details: [
          { label: 'Age', value: results.breakdown.coreHumanCapital.details.age },
          { label: 'Education', value: results.breakdown.coreHumanCapital.details.education },
          { label: 'Language', value: results.breakdown.coreHumanCapital.details.language }
        ]
      },
      {
        key: 'spouseFactors',
        title: 'Spouse/Partner Factors',
        total: results.breakdown.spouseFactors.total,
        color: 'green',
        details: [
          { label: 'Education', value: results.breakdown.spouseFactors.details.education },
          { label: 'Language', value: results.breakdown.spouseFactors.details.language },
          { label: 'Experience', value: results.breakdown.spouseFactors.details.experience }
        ]
      },
      {
        key: 'skillTransferability',
        title: 'Skill Transferability',
        total: results.breakdown.skillTransferability.total,
        color: 'purple',
        details: [
          { label: 'Education + Language', value: results.breakdown.skillTransferability.details.educationLanguage },
          { label: 'Education + Can. Experience', value: results.breakdown.skillTransferability.details.educationExperience },
          { label: 'Foreign Exp. + Language', value: results.breakdown.skillTransferability.details.foreignLanguage },
          { label: 'Foreign + Can. Experience', value: results.breakdown.skillTransferability.details.foreignExperience }
        ]
      },
      {
        key: 'additionalPoints',
        title: 'Additional Points',
        total: results.breakdown.additionalPoints.total,
        color: 'amber',
        details: [
          { label: 'Provincial Nomination', value: results.breakdown.additionalPoints.details.provincialNomination },
          { label: 'Job Offer', value: results.breakdown.additionalPoints.details.jobOffer },
          { label: 'Canadian Education', value: results.breakdown.additionalPoints.details.canadianEducation }
        ]
      }
    ];

    return (
      <div className="min-h-screen bg-pale-blue">
        <Header />
        <div className="pt-20 pb-12">
          <div className="max-w-4xl mx-auto p-6 space-y-8">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={handleStartOver}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Calculate Again
            </Button>

            {/* Results Header */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h1 className="text-3xl font-bold text-gray-900">Your CRS Score</h1>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-6xl font-bold text-primary-blue">{results.totalScore}</div>
                <div className="ml-4 text-left">
                  <div className="text-sm text-gray-600">out of 1,200</div>
                  <Badge variant={results.totalScore >= 470 ? "default" : "secondary"} className="mt-1">
                    {results.totalScore >= 470 ? "Competitive Score" : "Needs Improvement"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Best Category Match */}
            {bestCategory && (
              <Card className={`border-2 ${getColorClasses(bestCategory.color).border}`}>
                <CardHeader className={getColorClasses(bestCategory.color).bg}>
                  <CardTitle className={`flex items-center gap-2 ${getColorClasses(bestCategory.color).text}`}>
                    <Ticket className="h-5 w-5" />
                    Best Draw Category Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{bestCategory.name}</h3>
                      <p className="text-sm text-muted-foreground">{bestCategory.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className={`p-4 rounded-lg ${getColorClasses(bestCategory.color).bg}`}>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Target className="h-4 w-4" />
                          Recent Cutoff
                        </div>
                        <div className={`text-2xl font-bold ${getColorClasses(bestCategory.color).text}`}>
                          {bestCategory.recentCutoff}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {results.totalScore >= bestCategory.recentCutoff ? (
                            <span className="text-green-600 font-medium">You meet this cutoff</span>
                          ) : (
                            <span className="text-amber-600 font-medium">
                              {bestCategory.recentCutoff - results.totalScore} points below
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${getColorClasses(bestCategory.color).bg}`}>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4" />
                          Last Draw
                        </div>
                        <div className={`text-lg font-semibold ${getColorClasses(bestCategory.color).text}`}>
                          {formatDate(bestCategory.lastDrawDate)}
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${getColorClasses(bestCategory.color).bg}`}>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                          <Clock className="h-4 w-4" />
                          Expected Next Draw
                        </div>
                        <div className={`text-lg font-semibold ${getColorClasses(bestCategory.color).text}`}>
                          ~{daysUntilNextDraw} days
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Based on {bestCategory.avgDrawFrequency}-day avg frequency
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>
                        Draw dates and cutoffs are based on historical data and may vary. 
                        Check IRCC for official announcements.
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Conversion Card - The key difference for lead gen */}
            {bestCategory && (
              <ConversionCard
                score={results.totalScore}
                cutoff={bestCategory.recentCutoff}
                categoryName={bestCategory.name}
                daysUntilDraw={daysUntilNextDraw}
              />
            )}

            {/* Score Breakdown - Expandable */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {breakdownSections.map((section) => {
                  const colors = getColorClasses(section.color);
                  return (
                    <Collapsible
                      key={section.key}
                      open={expandedSections[section.key]}
                      onOpenChange={() => toggleSection(section.key)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className={`flex justify-between items-center p-4 ${colors.bg} rounded-lg hover:opacity-90 transition-opacity`}>
                          <div className="flex items-center gap-2">
                            <ChevronDown 
                              className={`h-4 w-4 ${colors.text} transition-transform ${expandedSections[section.key] ? 'rotate-180' : ''}`} 
                            />
                            <span className="font-medium">{section.title}</span>
                          </div>
                          <span className={`text-xl font-bold ${colors.text}`}>{section.total}</span>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 py-2 space-y-2 border-l-2 ml-6 mt-2 mb-2" style={{ borderColor: `var(--${section.color}-200, #e5e7eb)` }}>
                          {section.details.map((detail, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{detail.label}</span>
                              <span className="font-medium">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  );
                })}
              </CardContent>
            </Card>

            {/* Point Potential Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Point Potential Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(results.pointPotential).map(([key, data]: [string, any]) => {
                    const available = data.max - data.current;
                    const percentage = (data.current / data.max) * 100;
                    const label = POINT_POTENTIAL[key as keyof typeof POINT_POTENTIAL]?.label || key;
                    
                    return (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{label}</span>
                          <span className="text-muted-foreground">
                            {data.current} / {data.max}
                            {available > 0 && (
                              <span className="ml-2 text-amber-600 font-medium">
                                ({available} available)
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${percentage >= 80 ? 'bg-emerald-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-400'}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>
                      This summary shows where you have room to earn additional points. 
                      For guidance on improving your score, consult with a licensed immigration representative.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Button - Lead gen focused */}
            <div className="flex gap-4">
              <Button 
                onClick={handleStartOver}
                variant="outline" 
                className="flex-1"
              >
                Calculate Again
              </Button>
              <Button 
                onClick={() => navigate('/onboarding')}
                className="flex-1 bg-primary-blue hover:bg-primary-blue/90"
              >
                Start Your Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pale-blue">
      <Header />
      <div className="pt-20 pb-12">
        <ScoreAssessmentQuestionnaire 
          onComplete={handleComplete}
          onCancel={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default CRSCalculator;
