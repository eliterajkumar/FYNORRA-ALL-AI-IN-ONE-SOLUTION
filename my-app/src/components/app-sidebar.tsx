
"use client";

import { usePathname } from "next/navigation";
import { 
    ChefHat, 
    LayoutGrid, 
    ClipboardList, 
    Sparkles, 
    Users, 
    Utensils,
    History,
    FileText,
    CalendarCheck,
    LineChart,
    UserCheck,
    LogOut,
    Calendar,
    Plane,
    HandCoins,
    Table as TableIcon,
    Clock,
    Wallet,
    CalendarPlus
} from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";


const allNavItems = {
    'Cashier': [
        { href: "/pos", label: "POS Billing", icon: LayoutGrid },
        { href: "/order-history", label: "Order History", icon: History },
    ],
    'Chef': [
        { href: "/kds", label: "Kitchen Orders", icon: ChefHat },
    ],
    'HR': [
        { href: "/hrms/dashboard", label: "HR Dashboard", icon: LineChart },
        { href: "/hrms/staff-list", label: "Staff List", icon: Users },
        { href: "/hrms/attendance", label: "Attendance", icon: CalendarCheck },
        { href: "/hrms/leave-requests", label: "Leave Requests", icon: Plane },
        { href: "/hrms/shift-assignment", label: "Shift Assignment", icon: CalendarPlus },
        { href: "/hrms/payslips", label: "Payroll", icon: Wallet },
        { href: "/hrms/clock-in-out", label: "Clock-In/Out", icon: Clock },
    ],
    'Manager': [
        { href: "/manager", label: "Dashboard", icon: LineChart },
        { href: "/menu", label: "Menu Config", icon: ClipboardList },
        { href: "/tables", label: "Table Layout", icon: TableIcon },
        { href: "/manager/shifts", label: "Staff Shift Overview", icon: UserCheck },
        { href: "/ai-optimizer", label: "AI Optimizer", icon: Sparkles },
    ],
    'Staff': [
        { href: "/staff/attendance", label: "My Attendance", icon: Calendar },
        { href: "/staff/leave", label: "Leave Requests", icon: Plane },
        { href: "/staff/payroll", label: "Payroll Info", icon: HandCoins },
    ],
    'default': [
        { href: "/pos", label: "POS", icon: LayoutGrid },
    ]
};

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = user ? allNavItems[user.role as keyof typeof allNavItems] || allNavItems.default : [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <div className="flex items-center gap-2">
             <Utensils className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
              RestoFlow
            </h1>
          </div>
        </SidebarHeader>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/')}
                tooltip={{ children: item.label, side: "right", align: "center" }}
              >
                <a href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip={{ children: "Logout", side: "right", align: "center" }}>
                    <LogOut />
                    <span>Logout</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        <div className="flex flex-col gap-2 p-2 text-center text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <p>&copy; {new Date().getFullYear()} RestoFlow Inc.</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
