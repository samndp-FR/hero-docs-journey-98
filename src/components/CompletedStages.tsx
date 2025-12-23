import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface CompletedStage {
  id: string;
  label: string;
  completedAt: Date;
}

interface CompletedStagesProps {
  stages: CompletedStage[];
  onViewStage: (stageId: string) => void;
}

const CompletedStages: React.FC<CompletedStagesProps> = ({ stages, onViewStage }) => {
  if (stages.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Completed Stages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div 
              key={stage.id}
              className="flex items-center justify-between p-3 rounded-lg bg-green-50/50 border border-green-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-sm text-foreground">{stage.label}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(stage.completedAt, 'MMM d, yyyy')}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewStage(stage.id)}
                className="text-muted-foreground hover:text-foreground"
              >
                View
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompletedStages;
