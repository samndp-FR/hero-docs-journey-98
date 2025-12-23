import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, Clock } from 'lucide-react';

type Milestone = {
  id: string;
  label: string;
  description?: string;
  date?: Date;
  status: 'completed' | 'current' | 'upcoming';
};

type JourneyTimelineProps = {
  milestones: Milestone[];
  onMilestoneClick?: (id: string) => void;
};

const JourneyTimeline = ({ milestones, onMilestoneClick }: JourneyTimelineProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary-blue" />
          Journey Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={milestone.id}
                className={`relative flex items-start gap-4 pl-8 ${
                  milestone.status !== 'upcoming' && onMilestoneClick 
                    ? 'cursor-pointer hover:bg-muted/50 -ml-2 pl-10 py-2 rounded-lg transition-colors' 
                    : ''
                }`}
                onClick={() => milestone.status !== 'upcoming' && onMilestoneClick?.(milestone.id)}
              >
                {/* Icon */}
                <div className={`absolute left-0 flex items-center justify-center w-6 h-6 rounded-full ${
                  milestone.status === 'completed' 
                    ? 'bg-green-100' 
                    : milestone.status === 'current'
                      ? 'bg-primary-blue/10'
                      : 'bg-muted'
                }`}>
                  {milestone.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : milestone.status === 'current' ? (
                    <Circle className="h-4 w-4 text-primary-blue fill-primary-blue" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${
                      milestone.status === 'completed' 
                        ? 'text-foreground' 
                        : milestone.status === 'current'
                          ? 'text-primary-blue'
                          : 'text-muted-foreground'
                    }`}>
                      {milestone.label}
                    </h4>
                    {milestone.status === 'current' && (
                      <span className="text-xs bg-primary-blue/10 text-primary-blue px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  {milestone.description && (
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {milestone.description}
                    </p>
                  )}
                  {milestone.date && (
                    <p className="text-xs text-green-600 mt-1">
                      {format(milestone.date, 'MMMM d, yyyy')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JourneyTimeline;
