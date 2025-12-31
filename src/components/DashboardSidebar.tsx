import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  FolderOpen, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { usePremium } from '@/contexts/PremiumContext';

type AccessLevel = 'full' | 'partial' | 'locked';

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  accessLevel: AccessLevel;
};

const menuItems: MenuItem[] = [
  { title: 'Overview', url: '/dashboard', icon: LayoutDashboard, accessLevel: 'partial' },
  { title: 'Improve Score', url: '/dashboard/score', icon: Calculator, accessLevel: 'full' },
  { title: 'Build Profile', url: '/dashboard/form', icon: FileText, accessLevel: 'partial' },
  { title: 'Document Center', url: '/dashboard/documents', icon: FolderOpen, accessLevel: 'locked' },
  { title: 'Apply for PR', url: '/dashboard/complete', icon: CheckCircle2, accessLevel: 'locked' },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isPremium } = usePremium();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
  };

  const getAccessIndicator = (accessLevel: AccessLevel, isItemActive: boolean) => {
    if (isPremium) return null;
    
    if (accessLevel === 'locked') {
      return <Lock className={cn("h-3.5 w-3.5", isItemActive ? "text-white" : "text-muted-foreground/60")} />;
    }
    return null;
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <span className="font-smokum text-3xl text-primary-blue">Eldo</span>
        <span className="text-sm text-muted-foreground mt-1">Express Entry Journey</span>
      </SidebarHeader>
      
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const active = isActive(item.url);
                const indicator = getAccessIndicator(item.accessLevel, active);
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.url)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                        active 
                          ? "bg-primary-blue text-white font-medium" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="flex-1">{item.title}</span>
                      {indicator}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}