import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { Button } from '@/components/ui/button';
import { Bell, Settings } from 'lucide-react';
import { SupportFormDialog } from '@/components/SupportFormDialog';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-pale-blue">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top header bar */}
          <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <SupportFormDialog />
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground">
                <Settings className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3 ml-2">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-foreground">Applicant</span>
                  <span className="text-xs text-muted-foreground">Free Plan</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary-blue/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-blue">A</span>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
