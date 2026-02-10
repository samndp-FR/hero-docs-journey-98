
import React from 'react';
import { CheckCircle, Clock, TrendingUp, FileText, AlertCircle, Scan, AlertTriangle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const DashboardCard = () => {
  const stages = [
    { label: 'Get Ready', completed: true },
    { label: 'Build Profile', current: true },
    { label: 'Wait for ITA', future: true },
    { label: 'Apply for PR', future: true },
    { label: 'Wait for IRCC', future: true },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden w-full">
      {/* Stage Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-eldo-blue/10 text-eldo-blue text-xs font-medium mb-2">
          Current Stage
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Build Profile</h3>
        <p className="text-sm text-gray-500">You're in the Express Entry pool.</p>

        <div className="mt-5 pt-4 border-t border-gray-100">
          <div className="relative">
            <div className="absolute top-2.5 left-0 right-0 h-0.5 bg-gray-200" />
            <div className="absolute top-2.5 left-0 h-0.5 bg-green-500 w-[20%]" />
            <div className="relative flex justify-between">
              {stages.map((stage) => (
                <div key={stage.label} className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    stage.completed ? 'bg-green-500' :
                    stage.current ? 'bg-eldo-blue' :
                    'bg-gray-200 border-2 border-dashed border-gray-300'
                  }`}>
                    {stage.completed && <CheckCircle className="h-3 w-3 text-white" />}
                    {stage.current && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                  <span className={`text-[10px] mt-1.5 font-medium text-center max-w-[50px] leading-tight ${
                    stage.future ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between text-xs mt-4 p-2.5 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-500">Estimated time to PR:</span>
            </div>
            <span className="font-medium text-gray-700">6-12 months</span>
          </div>
        </div>
      </div>

      {/* CRS + Checklist */}
      <div className="p-5 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-eldo-blue" />
              <span className="text-xs font-medium text-gray-700">CRS Outlook</span>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Score</p>
                <p className="text-xl font-bold text-gray-900">~465</p>
              </div>
              <div className="h-8 w-px bg-gray-200" />
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-wide">Cutoff</p>
                <p className="text-sm font-semibold text-gray-500">470-480</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-medium text-green-600">Competitive</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Checklist</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 p-2 rounded-md bg-green-50 border border-green-200">
                <div className="w-3 h-3 rounded bg-green-500 flex items-center justify-center">
                  <CheckCircle className="h-2 w-2 text-white" />
                </div>
                <span className="text-[10px] text-green-700">CRS score estimated</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md bg-gray-50 border border-gray-200">
                <div className="w-3 h-3 rounded border border-gray-300" />
                <span className="text-[10px] text-gray-700">Profile submitted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Documents for this stage</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-eldo-purple/10 rounded-full">
            <Scan className="h-3 w-3 text-eldo-purple animate-pulse" />
            <span className="text-[9px] text-eldo-purple font-medium">Auto-scanned</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs text-green-700">Language Test Results</span>
            </div>
            <span className="text-[10px] text-green-500 font-medium">Ready</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-red-50 border border-red-200">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-red-700">Educational Credentials</span>
            </div>
            <span className="text-[10px] text-red-500 font-medium">Issues detected</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-xs text-amber-700">Work Experience Letters</span>
            </div>
            <span className="text-[10px] text-amber-500 font-medium">Needed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdCreative = () => {
  const [searchParams] = useSearchParams();
  const size = searchParams.get('size') || '1200x628';
  
  const [width, height] = size.split('x').map(Number);
  const isSquare = height === width;

  return (
    <div
      className="bg-white flex items-center justify-center overflow-hidden"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className={isSquare ? "w-[580px]" : "w-[440px]"}>
        <DashboardCard />
      </div>
    </div>
  );
};

export default AdCreative;
