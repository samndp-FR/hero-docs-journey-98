
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import DocumentCenter from '@/components/DocumentCenter';

interface DocumentCenterTabProps {
  remainingScans?: number;
  isUnlimited?: boolean;
  subscription?: string;
}

const DocumentCenterTab: React.FC<DocumentCenterTabProps> = ({ 
  remainingScans, 
  isUnlimited, 
  subscription 
}) => {
  return (
    <TabsContent value="scanning">
      <div className="max-w-6xl mx-auto">
        <DocumentCenter 
          remainingScans={remainingScans}
          isUnlimited={isUnlimited}
          subscription={subscription}
        />
      </div>
    </TabsContent>
  );
};

export default DocumentCenterTab;
