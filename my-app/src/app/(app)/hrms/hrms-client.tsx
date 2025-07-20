"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Clock, Calendar, Plane, FileText, HandCoins, CalendarPlus, LineChart } from "lucide-react";

const hrModules = [
  { title: "HR Dashboard", href: "/hrms/dashboard", icon: LineChart, description: "Analytics and key metrics." },
  { title: "Staff List", href: "/hrms/staff-list", icon: Users, description: "View and manage all employees." },
  { title: "Clock-In/Out", href: "/hrms/clock-in-out", icon: Clock, description: "Track employee punch times." },
  { title: "Attendance", href: "/hrms/attendance", icon: Calendar, description: "Monthly attendance records." },
  { title: "Leave Requests", href: "/hrms/leave-requests", icon: Plane, description: "Manage leave applications." },
  { title: "Payslips", href: "/hrms/payslips", icon: FileText, description: "Generate and view payslips." },
  { title: "Advance/Loan", href: "/hrms/advance-loan", icon: HandCoins, description: "Track salary advances." },
  { title: "Shift Assignment", href: "/hrms/shift-assignment", icon: CalendarPlus, description: "Assign shifts to staff." },
];

export default function HRMSClient() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">Human Resource Management</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Manage your staff, attendance, payroll, and more from one place.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {hrModules.map((module) => (
          <Link href={module.href} key={module.title}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium font-headline">{module.title}</CardTitle>
                <module.icon className="h-6 w-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
