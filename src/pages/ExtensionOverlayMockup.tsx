import { useState, useEffect } from 'react';
import { 
  Check, Loader2, Sparkles, Pause, Play, X, ChevronDown, ChevronUp,
  AlertCircle, ArrowRight, Minimize2, Maximize2, Eye, ShieldCheck,
  FileText, CheckCircle2, Clock, AlertTriangle, Edit3, SkipForward
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type OverlayState = 'idle' | 'filling' | 'paused' | 'attention' | 'success';
type FormStatus = 'pending' | 'ready' | 'filling' | 'complete' | 'attention';

interface FormItem {
  id: string;
  name: string;
  status: FormStatus;
  fields: number;
  filled: number;
}

const ExtensionOverlayMockup = () => {
  const [overlayState, setOverlayState] = useState<OverlayState>('idle');
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentFormIndex, setCurrentFormIndex] = useState(0);
  const [currentField, setCurrentField] = useState('First name(s)');
  const [fieldProgress, setFieldProgress] = useState(0);
  const [showFormList, setShowFormList] = useState(true);
  const [attentionField, setAttentionField] = useState('Other name used');
  
  const [forms, setForms] = useState<FormItem[]>([
    { id: '1', name: 'Personal details', status: 'ready', fields: 12, filled: 0 },
    { id: '2', name: 'Contact details', status: 'pending', fields: 8, filled: 0 },
    { id: '3', name: 'Study and languages', status: 'pending', fields: 15, filled: 11 }, // Partially filled
    { id: '4', name: 'Application details', status: 'pending', fields: 10, filled: 0 },
    { id: '5', name: 'Representative', status: 'complete', fields: 6, filled: 6 },
    { id: '6', name: 'Work history', status: 'complete', fields: 20, filled: 20 },
    { id: '7', name: 'Personal history', status: 'pending', fields: 18, filled: 14 }, // Partially filled
  ]);

  const fieldNames = [
    'Last name(s)', 'First name(s)', 'Date of birth', 'Country of birth',
    'Citizenship', 'Marital status', 'Email address', 'Phone number',
    'Current address', 'Passport number', 'Issue date', 'Expiry date'
  ];

  const handleStartFilling = () => {
    setOverlayState('filling');
    setShowFormList(false);
    setFieldProgress(0);
    
    // Update first form to filling
    setForms(prev => prev.map((f, i) => 
      i === 0 ? { ...f, status: 'filling' } : f
    ));
  };

  const handlePause = () => {
    setOverlayState('paused');
  };

  const handleResume = () => {
    setOverlayState('filling');
  };

  const handleStop = () => {
    setOverlayState('idle');
    setShowFormList(true);
    setFieldProgress(0);
  };

  const handleTriggerAttention = () => {
    setOverlayState('attention');
    setShowFormList(false); // Switch to form view to show the attention dialog
  };

  const handleSkipField = () => {
    setOverlayState('filling');
  };

  const handleManualInput = () => {
    setOverlayState('filling');
  };

  const handleComplete = () => {
    setOverlayState('success');
    setForms(prev => prev.map(f => ({ ...f, status: 'complete', filled: f.fields })));
  };

  // Simulate filling progress
  useEffect(() => {
    if (overlayState === 'filling') {
      const interval = setInterval(() => {
        setFieldProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 12) {
            return 12;
          }
          setCurrentField(fieldNames[newProgress] || 'Processing...');
          
          // Update form filled count
          setForms(prevForms => prevForms.map((f, i) => 
            i === currentFormIndex ? { ...f, filled: newProgress } : f
          ));
          
          return newProgress;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [overlayState, currentFormIndex]);

  const completedForms = forms.filter(f => f.status === 'complete').length;
  const totalForms = forms.length;
  const currentForm = forms[currentFormIndex];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <div className="bg-slate-900 text-white py-4 px-6">
        <h1 className="text-xl font-outfit font-semibold">Extension Overlay Design Mockup</h1>
        <p className="text-slate-400 text-sm mt-1">In-page overlays for trust-inducing form filling experience</p>
      </div>

      {/* Control Panel */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-slate-600">Demo Controls:</span>
          <Button size="sm" variant="outline" onClick={() => setShowFormList(true)}>
            Show Form List
          </Button>
          <Button size="sm" variant="outline" onClick={handleStartFilling}>
            Start Filling
          </Button>
          <Button size="sm" variant="outline" onClick={handleTriggerAttention}>
            Trigger Attention
          </Button>
          <Button size="sm" variant="outline" onClick={handleComplete}>
            Complete All
          </Button>
          <Button size="sm" variant="outline" onClick={handleStop}>
            Reset
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Main Content - Simulated IRCC Page */}
        <div className="flex-1 p-8">
          
          {/* Form List View */}
          {showFormList && (
            <div className="max-w-4xl mx-auto">
              {/* IRCC Header Mock */}
              <div className="bg-white rounded-t-lg border-t-4 border-[#26374a] px-6 py-4">
                <div className="flex gap-4 text-sm text-slate-600">
                  <button className="flex items-center gap-1 hover:text-slate-900">↻ Start Again</button>
                  <button className="flex items-center gap-1 hover:text-slate-900">✎ Modify Family Information</button>
                  <button className="flex items-center gap-1 hover:text-slate-900">🖨 Print</button>
                </div>
              </div>
              
              <div className="bg-white px-6 py-6 border-b">
                <h2 className="text-2xl font-semibold text-slate-800">Permanent Residence application</h2>
                <p className="text-slate-600 mt-2">Complete your online application by choosing a section below.</p>
              </div>

              {/* Form Table - Original IRCC layout (no column modification) */}
              <div className="bg-white rounded-b-lg shadow-lg overflow-hidden relative">
                <div className="bg-[#335075] text-white px-6 py-3">
                  <h3 className="font-semibold">David Balan: Candidate Permanent Residency</h3>
                </div>
                
                <table className="w-full">
                  <thead className="bg-slate-50 border-b">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Form name</th>
                      <th className="text-left px-6 py-3 font-semibold text-slate-700">Status</th>
                      <th className="text-right px-6 py-3 font-semibold text-slate-700">Options</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {forms.map((form, index) => (
                      <tr key={form.id} className="hover:bg-slate-50 transition-colors group relative">
                        <td className="px-6 py-4 font-medium text-slate-800">{form.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {form.status === 'complete' ? (
                              <>
                                <Check className="w-4 h-4 text-emerald-600" />
                                <span className="text-emerald-600 font-medium">Complete</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4 text-amber-500" />
                                <span className="text-amber-600 font-medium">In progress</span>
                              </>
                            )}
                            {/* FLOATING OVERLAY BADGE - injected next to status */}
                            <FormIndicatorBadge form={form} />
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button 
                            size="sm" 
                            className="bg-[#26374a] hover:bg-[#1c2a38]"
                          >
                            {form.status === 'complete' ? 'Update form' : 'Continue form'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Overall Progress Overlay */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{completedForms} of {totalForms} forms ready</p>
                      <p className="text-sm text-muted-foreground">{totalForms - completedForms} forms can be auto-filled</p>
                    </div>
                  </div>
                  <Button 
                    onClick={handleStartFilling}
                    className="bg-primary hover:bg-primary/90 gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start Auto-Fill
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Individual Form View */}
          {!showFormList && (
            <div className="max-w-3xl mx-auto">
              {/* IRCC Form Header Mock */}
              <div className="bg-white rounded-t-lg border-t-4 border-[#26374a] px-6 py-4">
                <h2 className="text-2xl font-semibold text-slate-800">Application/profile details</h2>
              </div>

              <div className="bg-white px-6 py-4 border-b flex gap-3">
                <Button variant="outline" size="sm" className="bg-[#26374a] text-white hover:bg-[#1c2a38] border-0">
                  Save and exit
                </Button>
                <Button variant="outline" size="sm" className="bg-[#26374a] text-white hover:bg-[#1c2a38] border-0">
                  Check for completeness
                </Button>
              </div>

              {/* Form Sections */}
              <div className="bg-white rounded-b-lg shadow-lg">
                {/* Names Section - Currently filling */}
                <div className="border-l-4 border-[#335075]">
                  <div className="bg-[#335075] text-white px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="w-4 h-4" />
                      <span className="font-medium">Names</span>
                    </div>
                    {fieldProgress >= 2 && <Check className="w-5 h-5" />}
                  </div>
                  
                  <div className="p-6 space-y-4 relative">
                    {/* Currently filling indicator */}
                    {overlayState === 'filling' && fieldProgress < 3 && (
                      <div className="absolute inset-0 bg-primary/5 pointer-events-none animate-pulse" />
                    )}
                    
                    <p className="text-slate-600 text-sm">
                      Tell us David Balan's name(s) exactly as shown in David Balan's passport, travel document or national identity document.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Last name(s) <span className="text-slate-400">ⓘ</span>
                        </label>
                        <input 
                          type="text" 
                          value="Balan"
                          readOnly
                          className={cn(
                            "w-full max-w-md px-3 py-2 border rounded-md bg-slate-50 transition-all",
                            overlayState === 'filling' && fieldProgress === 0 && "ring-2 ring-primary ring-offset-2 bg-primary/5"
                          )}
                        />
                        {overlayState === 'filling' && fieldProgress === 0 && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            <span>Filling now...</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          First name(s) <span className="text-slate-400">ⓘ</span>
                        </label>
                        <input 
                          type="text" 
                          value="David"
                          readOnly
                          className={cn(
                            "w-full max-w-md px-3 py-2 border rounded-md bg-slate-50 transition-all",
                            overlayState === 'filling' && fieldProgress === 1 && "ring-2 ring-primary ring-offset-2 bg-primary/5"
                          )}
                        />
                      </div>
                      
                      <div className="relative">
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          <span className="text-red-500">*</span> Has this person ever used any other name? <span className="text-red-500 text-xs">(required)</span>
                        </label>
                        <select 
                          className={cn(
                            "w-full max-w-md px-3 py-2 border rounded-md bg-slate-50 transition-all",
                            overlayState === 'attention' && "ring-2 ring-amber-500 ring-offset-2 bg-amber-50"
                          )}
                          defaultValue=""
                        >
                          <option value="" disabled>Select...</option>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                        
                        {/* ATTENTION DIALOG */}
                        {overlayState === 'attention' && (
                          <AttentionDialog 
                            fieldName={attentionField}
                            onSkip={handleSkipField}
                            onManualInput={handleManualInput}
                            onResume={handleResume}
                          />
                        )}
                      </div>
                    </div>
                    
                    <Button className="bg-[#26374a] hover:bg-[#1c2a38] gap-2 mt-4">
                      Next <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Other collapsed sections */}
                {['Personal description', 'Marital status', 'ID documents - summary', 'Immigration history and citizenships', 'Family'].map((section, i) => (
                  <div key={section} className="border-t">
                    <div className="bg-slate-100 px-6 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-700">{section}</span>
                      </div>
                      {i === 0 || i === 3 || i === 4 ? (
                        <Check className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Design Explanation Sidebar */}
        <div className="w-80 bg-slate-900 text-white p-6 space-y-6 min-h-[calc(100vh-120px)]">
          <div>
            <h3 className="font-outfit font-semibold text-lg mb-2">Design Concepts</h3>
            <p className="text-sm text-slate-400">Three overlay components for trust-inducing UX</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-white/5">
              <h4 className="font-medium text-primary mb-2">1. Floating Control Panel</h4>
              <p className="text-xs text-slate-400">
                Always visible in bottom-right. Shows progress, current field, and Pause/Stop controls. 
                User always feels in control.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h4 className="font-medium text-emerald-400 mb-2">2. Floating Overlay Badges</h4>
              <p className="text-xs text-slate-400">
                Injected next to existing status text — no column modification needed. 
                Positioned absolutely via DOM injection.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-white/5">
              <h4 className="font-medium text-amber-400 mb-2">3. Attention Dialog</h4>
              <p className="text-xs text-slate-400">
                Non-blocking floating card when a field needs input. User can add missing info 
                to their Eldo profile for future use, or skip.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <h4 className="font-medium mb-2">Trust Signals</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>✓ Pause always visible</li>
              <li>✓ Live field name shown</li>
              <li>✓ "We never submit" copy</li>
              <li>✓ Skip option for blockers</li>
              <li>✓ Visual field highlight</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FLOATING CONTROL PANEL */}
      {(overlayState !== 'idle' || !showFormList) && overlayState !== 'success' && (
        <FloatingControlPanel
          isMinimized={isMinimized}
          setIsMinimized={setIsMinimized}
          state={overlayState}
          currentForm={currentForm?.name || 'Personal details'}
          currentField={currentField}
          formProgress={{ current: currentFormIndex + 1, total: totalForms }}
          fieldProgress={{ current: fieldProgress, total: currentForm?.fields || 12 }}
          onPause={handlePause}
          onResume={handleResume}
          onStop={handleStop}
          onSkip={() => {}}
        />
      )}

      {/* Success Overlay */}
      {overlayState === 'success' && (
        <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">All forms filled!</h3>
                <p className="text-xs text-white/80">7 of 7 complete</p>
              </div>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <Eye className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Review before submitting</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Please check all fields are correct before you submit to IRCC.
                </p>
              </div>
            </div>
            <Button 
              onClick={handleStop}
              variant="outline"
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Form Indicator Badge Component - Realistic states
const FormIndicatorBadge = ({ form }: { form: FormItem }) => {
  // Complete: show filled count
  if (form.status === 'complete') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-xs font-medium text-emerald-700">
          {form.fields}/{form.fields} filled by Eldo
        </span>
      </div>
    );
  }
  
  // Currently filling
  if (form.status === 'filling') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 animate-pulse">
        <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
        <span className="text-xs font-medium text-primary">Filling...</span>
      </div>
    );
  }
  
  // Partially filled (has some progress)
  if (form.filled > 0 && form.filled < form.fields) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-medium text-amber-700">
          {form.filled}/{form.fields} filled
        </span>
      </div>
    );
  }
  
  // Needs attention
  if (form.status === 'attention') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-medium text-amber-700">Needs attention</span>
      </div>
    );
  }
  
  // Default: Ready (not yet visited/filled)
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10">
      <Sparkles className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-medium text-primary">Ready</span>
    </div>
  );
};

// Floating Control Panel Component
const FloatingControlPanel = ({
  isMinimized,
  setIsMinimized,
  state,
  currentForm,
  currentField,
  formProgress,
  fieldProgress,
  onPause,
  onResume,
  onStop,
  onSkip,
}: {
  isMinimized: boolean;
  setIsMinimized: (v: boolean) => void;
  state: OverlayState;
  currentForm: string;
  currentField: string;
  formProgress: { current: number; total: number };
  fieldProgress: { current: number; total: number };
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onSkip: () => void;
}) => {
  const progressPercent = (fieldProgress.current / fieldProgress.total) * 100;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30 flex items-center justify-center text-white hover:scale-105 transition-transform"
      >
        <Sparkles className="w-6 h-6" />
        {state === 'filling' && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
            <Loader2 className="w-3 h-3 text-primary animate-spin" />
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-smokum text-lg text-white">Eldo</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsMinimized(true)}
            className="w-7 h-7 rounded-md hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button 
            onClick={onStop}
            className="w-7 h-7 rounded-md hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Form Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Form {formProgress.current} of {formProgress.total}</span>
          <span className="font-medium text-foreground">{currentForm}</span>
        </div>

        {/* Field Progress Bar */}
        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-300",
                state === 'paused' ? "bg-amber-500" : state === 'attention' ? "bg-amber-500" : "bg-primary"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              {state === 'filling' && <Loader2 className="w-3 h-3 animate-spin text-primary" />}
              {state === 'paused' && <Pause className="w-3 h-3 text-amber-500" />}
              {state === 'attention' && <AlertCircle className="w-3 h-3 text-amber-500" />}
              <span className={cn(
                state === 'filling' && "text-primary",
                state === 'paused' && "text-amber-600",
                state === 'attention' && "text-amber-600",
              )}>
                {state === 'filling' && `Filling "${currentField}"...`}
                {state === 'paused' && 'Paused'}
                {state === 'attention' && 'Needs your input'}
              </span>
            </div>
            <span className="text-muted-foreground">{fieldProgress.current}/{fieldProgress.total}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          {state === 'filling' ? (
            <Button 
              onClick={onPause}
              variant="outline"
              className="flex-1 gap-2"
            >
              <Pause className="w-4 h-4" />
              Pause
            </Button>
          ) : state === 'paused' ? (
            <Button 
              onClick={onResume}
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            >
              <Play className="w-4 h-4" />
              Resume
            </Button>
          ) : (
            <Button 
              onClick={onResume}
              className="flex-1 gap-2 bg-primary hover:bg-primary/90"
            >
              <Play className="w-4 h-4" />
              Continue
            </Button>
          )}
          <Button 
            onClick={onSkip}
            variant="outline"
            className="gap-2"
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </Button>
          <Button 
            onClick={onStop}
            variant="outline"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Trust Footer */}
        <div className="flex items-center gap-2 pt-2 border-t">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <p className="text-[11px] text-muted-foreground">
            You can pause anytime. We never click submit.
          </p>
        </div>
      </div>
    </div>
  );
};

// Attention Dialog Component - Points to field, user fills manually
const AttentionDialog = ({
  fieldName,
  onSkip,
  onManualInput,
  onResume,
}: {
  fieldName: string;
  onSkip: () => void;
  onManualInput: () => void;
  onResume: () => void;
}) => {
  return (
    <div className="absolute left-0 right-0 top-full mt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Arrow pointing to the field */}
      <div className="absolute -top-2 left-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white drop-shadow-sm" />
      
      <div className="bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden max-w-sm">
        <div className="bg-amber-50 px-4 py-3 border-b border-amber-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              <span className="font-medium text-amber-800">Your turn</span>
            </div>
            <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
              2 left in section
            </span>
          </div>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <p className="text-sm text-slate-600 mb-2">
              Please fill in this field:
            </p>
            <div className="px-3 py-2.5 bg-slate-100 rounded-lg font-medium text-slate-800 flex items-center gap-2 border-l-4 border-amber-400">
              <FileText className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <span>"{fieldName}"</span>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <ArrowRight className="w-3 h-3" />
            Fill the highlighted field above, then continue
          </p>

          <div className="flex gap-2">
            <Button 
              onClick={onManualInput}
              className="flex-1 bg-primary hover:bg-primary/90 gap-2"
            >
              <Check className="w-4 h-4" />
              I filled it, continue
            </Button>
            <Button 
              onClick={onSkip}
              variant="outline"
              className="gap-1.5 text-slate-600"
            >
              <SkipForward className="w-4 h-4" />
              Skip
            </Button>
          </div>

          <div className="pt-3 border-t flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            You can pause or stop anytime
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionOverlayMockup;
