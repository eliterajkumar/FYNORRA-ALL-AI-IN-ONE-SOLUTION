
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, ClipboardList, UserCheck, Sparkles, Table as TableIcon } from "lucide-react";

const managerModules = [
  { title: "Daily Report", icon: LineChart, description: "View sales and performance metrics.", href: "/manager/reports" },
  { title: "Menu Config", icon: ClipboardList, description: "Manage menu items and categories.", href: "/menu" },
  { title: "Staff Shift Overview", icon: UserCheck, description: "Monitor and assign staff shifts.", href: "/manager/shifts" },
  { title: "AI Optimizer", icon: Sparkles, description: "Get AI-powered suggestions.", href: "/ai-optimizer" },
  { title: "Table Layout", icon: TableIcon, description: "View and manage table statuses.", href: "/tables" },
];

export default function ManagerPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">Manager Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Oversee all restaurant operations from a single view.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {managerModules.map((module) => (
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
