import { DashboardLayout } from '@/components/DashboardLayout';
import DocumentCenter from '@/components/DocumentCenter';

const DashboardDocuments = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-foreground mb-6">Document Center</h1>
        <DocumentCenter 
          remainingScans={5}
          isUnlimited={false}
          subscription="free"
        />
      </div>
    </DashboardLayout>
  );
};

export default DashboardDocuments;
