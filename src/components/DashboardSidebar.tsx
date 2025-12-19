import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  FolderOpen, 
  CheckCircle2 
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

const menuItems = [
  { title: 'Overview', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Score Assessment', url: '/dashboard/score', icon: Calculator },
  { title: 'Eldo Form', url: '/dashboard/form', icon: FileText },
  { title: 'Document Center', url: '/dashboard/documents', icon: FolderOpen },
  { title: 'Complete Application', url: '/dashboard/complete', icon: CheckCircle2 },
];

export function DashboardSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return currentPath === '/dashboard';
    }
    return currentPath.startsWith(path);
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
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.url)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                      isActive(item.url) 
                        ? "bg-primary-blue text-white font-medium" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
