import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Plane, Clock, Wallet } from "lucide-react";

export default function HRDashboardPage() {
  const stats = [
    { title: "Total Staff", value: 5, icon: Users },
    { title: "On Leave Today", value: 1, icon: Plane },
    { title: "Active Shifts", value: 2, icon: Clock },
    { title: "Payroll Pending", value: "₹50,000", icon: Wallet },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="font-headline text-4xl">HR Dashboard</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Key metrics and analytics at a glance.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Card>
            <CardHeader>
                <CardTitle>Coming Soon</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">More detailed analytics and charts will be available here.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
