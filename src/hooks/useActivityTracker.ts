import { useState, useCallback } from 'react';

const ACTIVITY_KEY = 'eldo-activity-log';
const MAX_ACTIVITIES = 50;
const PROFILE_THROTTLE_MS = 30 * 60 * 1000; // 30 minutes

export type ActivityType = 
  | 'crs_assessed'
  | 'crs_modified'
  | 'checklist_toggled'
  | 'document_have_it'
  | 'document_verified'
  | 'profile_updated';

export type Activity = {
  id: string;
  type: ActivityType;
  timestamp: string;
  details: {
    label?: string;
    previousValue?: string | number;
    newValue?: string | number;
    stageId?: string;
    documentName?: string;
    fieldName?: string;
    sectionName?: string;
  };
};

const activityConfig: Record<ActivityType, { label: string; color: string; icon: string }> = {
  crs_assessed: { 
    label: 'CRS Score Assessed', 
    color: 'bg-primary-blue',
    icon: 'TrendingUp'
  },
  crs_modified: { 
    label: 'CRS Score Modified', 
    color: 'bg-amber-500',
    icon: 'Edit'
  },
  checklist_toggled: { 
    label: 'Checklist Updated', 
    color: 'bg-green-500',
    icon: 'CheckCircle'
  },
  document_have_it: { 
    label: 'Document Marked Ready', 
    color: 'bg-purple-500',
    icon: 'FileCheck'
  },
  document_verified: { 
    label: 'Document Verified', 
    color: 'bg-emerald-500',
    icon: 'ShieldCheck'
  },
  profile_updated: { 
    label: 'Profile Updated', 
    color: 'bg-blue-500',
    icon: 'User'
  },
};

export const getActivityConfig = (type: ActivityType) => activityConfig[type];

export const useActivityTracker = () => {
  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(ACTIVITY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const logActivity = useCallback((type: ActivityType, details: Activity['details'] = {}) => {
    setActivities(prev => {
      // For profile updates, throttle to max one per 30 minutes
      if (type === 'profile_updated') {
        const lastProfileUpdate = prev.find(a => a.type === 'profile_updated');
        if (lastProfileUpdate) {
          const timeSince = Date.now() - new Date(lastProfileUpdate.timestamp).getTime();
          if (timeSince < PROFILE_THROTTLE_MS) {
            // Update the existing entry's details instead of creating new
            const updated = prev.map(a => 
              a.id === lastProfileUpdate.id 
                ? { ...a, timestamp: new Date().toISOString(), details: { ...a.details, ...details } }
                : a
            );
            localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
            return updated;
          }
        }
      }

      const newActivity: Activity = {
        id: `${type}-${Date.now()}`,
        type,
        timestamp: new Date().toISOString(),
        details,
      };

      const updated = [newActivity, ...prev].slice(0, MAX_ACTIVITIES);
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
    localStorage.removeItem(ACTIVITY_KEY);
  }, []);

  return { activities, logActivity, clearActivities };
};
