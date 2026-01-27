import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

const FormSectionHeader: React.FC<FormSectionHeaderProps> = ({ icon: Icon, title, description }) => (
  <div className="flex items-start gap-3 pb-4 mb-6 border-b border-[hsl(var(--section-divider))]">
    <div className="p-2 rounded-lg bg-primary-blue/10 text-foreground shrink-0">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  </div>
);

export default FormSectionHeader;
