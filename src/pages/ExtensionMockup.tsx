import { useState } from 'react';
import { Check, Power, Loader2, Shield, ExternalLink, User, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ExtensionState = 'logged-out' | 'inactive' | 'ready' | 'filling' | 'success';

const ExtensionMockup = () => {
  const [state, setState] = useState<ExtensionState>('ready');

  const handleFill = () => {
    setState('filling');
    setTimeout(() => setState('success'), 2000);
    setTimeout(() => setState('ready'), 4000);
  };

  const toggleLogin = () => {
    setState(state === 'logged-out' ? 'ready' : 'logged-out');
  };

  const cycleState = () => {
    const states: ExtensionState[] = ['logged-out', 'inactive', 'ready', 'filling', 'success'];
    const currentIndex = states.indexOf(state);
    setState(states[(currentIndex + 1) % states.length]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-outfit font-semibold text-white">
            Chrome Extension UI Mockup
          </h1>
          <p className="text-slate-400">
            Preview of the Eldo form-filler extension popup (360px width)
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Extension Popup Mockup */}
          <div className="relative">
            {/* Browser chrome decoration */}
            <div className="absolute -top-3 right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/95" />
            
            {/* Extension popup container - typical width is 300-400px */}
            <div 
              className="w-[360px] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/20"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-blue to-primary-blue/80 px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h2 className="font-smokum text-xl text-white tracking-wide">Eldo</h2>
                      <p className="text-[10px] text-white/70 font-outfit -mt-0.5">Form Assistant</p>
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className={cn(
                    "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                    state === 'logged-out' && "bg-white/20 text-white/70",
                    state === 'inactive' && "bg-amber-500/20 text-amber-200",
                    state === 'ready' && "bg-emerald-500/20 text-emerald-200",
                    state === 'filling' && "bg-primary-blue/30 text-white",
                    state === 'success' && "bg-emerald-500/30 text-emerald-200",
                  )}>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      state === 'logged-out' && "bg-white/50",
                      state === 'inactive' && "bg-amber-400",
                      state === 'ready' && "bg-emerald-400 animate-pulse",
                      state === 'filling' && "bg-white animate-pulse",
                      state === 'success' && "bg-emerald-400",
                    )} />
                    {state === 'logged-out' && 'Signed out'}
                    {state === 'inactive' && 'Wrong page'}
                    {state === 'ready' && 'Ready'}
                    {state === 'filling' && 'Filling...'}
                    {state === 'success' && 'Done!'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Logged out state */}
                {state === 'logged-out' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-muted flex items-center justify-center">
                      <User className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Sign in required</p>
                      <p className="text-sm text-muted-foreground">
                        Connect your Eldo account to use the form assistant
                      </p>
                    </div>
                    <Button 
                      onClick={toggleLogin}
                      className="w-full bg-primary-blue hover:bg-primary-blue/90"
                    >
                      Sign in to Eldo
                    </Button>
                  </div>
                )}

                {/* Inactive state (wrong URL) */}
                {state === 'inactive' && (
                  <div className="text-center py-6 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center">
                      <Shield className="w-8 h-8 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Not available here</p>
                      <p className="text-sm text-muted-foreground">
                        Navigate to the IRCC portal to use the form assistant
                      </p>
                    </div>
                    <Button 
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => setState('ready')}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open IRCC Portal
                    </Button>
                  </div>
                )}

                {/* Ready / Filling / Success states */}
                {(state === 'ready' || state === 'filling' || state === 'success') && (
                  <>
                    {/* Target URL indicator */}
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground">Active on</p>
                        <p className="text-sm font-medium text-foreground truncate">
                          secure.cic.gc.ca/form/*
                        </p>
                      </div>
                    </div>

                    {/* Form detection */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary-blue/5 to-primary-blue/10 border border-primary-blue/20">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-blue/10 flex items-center justify-center flex-shrink-0">
                          <Sparkles className="w-5 h-5 text-primary-blue" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground">IMM 5257 Detected</p>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            Visitor visa application form
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                              42 fields found
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-primary-blue/10 text-primary-blue">
                              Auto-fill ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fill Button */}
                    <Button 
                      onClick={handleFill}
                      disabled={state === 'filling'}
                      className={cn(
                        "w-full h-12 text-base font-medium transition-all relative overflow-hidden",
                        state === 'success' 
                          ? "bg-emerald-500 hover:bg-emerald-600" 
                          : "bg-primary-blue hover:bg-primary-blue/90"
                      )}
                    >
                      {state === 'filling' && (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Filling form...
                        </>
                      )}
                      {state === 'success' && (
                        <>
                          <Check className="w-5 h-5 mr-2" />
                          Form filled successfully!
                        </>
                      )}
                      {state === 'ready' && (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Fill Form
                        </>
                      )}
                      
                      {/* Shine effect on button */}
                      <div className="absolute inset-0 btn-shine" />
                    </Button>

                    {/* User info footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary-blue/10 flex items-center justify-center">
                          <User className="w-3 h-3 text-primary-blue" />
                        </div>
                        <span className="text-xs text-muted-foreground">john@example.com</span>
                      </div>
                      <button 
                        onClick={toggleLogin}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 space-y-4 min-w-[280px]">
            <h3 className="font-outfit font-medium text-white">Preview States</h3>
            <div className="space-y-2">
              {[
                { value: 'logged-out', label: 'Logged Out', desc: 'User needs to sign in' },
                { value: 'inactive', label: 'Inactive', desc: 'Wrong URL / page' },
                { value: 'ready', label: 'Ready', desc: 'Form detected, ready to fill' },
                { value: 'filling', label: 'Filling', desc: 'Currently filling form' },
                { value: 'success', label: 'Success', desc: 'Form filled successfully' },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => setState(item.value as ExtensionState)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-all",
                    state === item.value 
                      ? "bg-primary-blue text-white" 
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  )}
                >
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className={cn(
                    "text-xs mt-0.5",
                    state === item.value ? "text-white/70" : "text-white/40"
                  )}>
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/50 leading-relaxed">
                This is a UI mockup only. The actual extension would be built separately 
                using Chrome Extension APIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtensionMockup;
