import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  Edit, 
  CheckCircle, 
  FileCheck, 
  ShieldCheck, 
  User,
  Clock
} from 'lucide-react';
import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns';
import { Activity, getActivityConfig } from '@/hooks/useActivityTracker';

const iconMap = {
  TrendingUp,
  Edit,
  CheckCircle,
  FileCheck,
  ShieldCheck,
  User,
};

interface RecentActivityCardProps {
  activities: Activity[];
  maxItems?: number;
  onViewAll?: () => void;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'h:mm a')}`;
  }
  
  return format(date, 'MMM d, h:mm a');
};

const getActivityDescription = (activity: Activity): string => {
  const { type, details } = activity;
  
  switch (type) {
    case 'crs_assessed':
      return details.newValue ? `Score: ${details.newValue} points` : 'Initial assessment completed';
    case 'crs_modified':
      if (details.previousValue && details.newValue) {
        return `${details.previousValue} → ${details.newValue} points`;
      }
      return details.newValue ? `Updated to ${details.newValue} points` : 'Score recalculated';
    case 'checklist_toggled':
      return details.label || 'Checklist item updated';
    case 'document_have_it':
      return details.documentName || 'Document marked as ready';
    case 'document_verified':
      return details.documentName || 'Document scan verified';
    case 'profile_updated':
      if (details.sectionName) {
        return `${details.sectionName} section`;
      }
      return details.fieldName || 'Profile information saved';
    default:
      return '';
  }
};

export const RecentActivityCard = ({ 
  activities, 
  maxItems = 5,
  onViewAll 
}: RecentActivityCardProps) => {
  const displayActivities = activities.slice(0, maxItems);
  const hasMore = activities.length > maxItems;

  if (displayActivities.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-muted-foreground">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
            <p className="text-xs text-muted-foreground/70">Your actions will appear here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-muted-foreground">Recent Activity</CardTitle>
          {hasMore && onViewAll && (
            <Button 
              variant="link" 
              className="text-xs text-muted-foreground p-0 h-auto"
              onClick={onViewAll}
            >
              View all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {displayActivities.map((activity) => {
          const config = getActivityConfig(activity.type);
          const IconComponent = iconMap[config.icon as keyof typeof iconMap];
          const description = getActivityDescription(activity);
          
          return (
            <div 
              key={activity.id}
              className="flex items-start gap-3 py-2.5 border-b border-border/50 last:border-0"
            >
              <div className={`w-7 h-7 rounded-full ${config.color}/10 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <IconComponent className={`h-3.5 w-3.5 ${config.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {config.label}
                </p>
                {description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    {description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground/70 mt-1">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
