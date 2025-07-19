import { Input } from "@/components/ui/input";
import { Search, Users, CreditCard, UserCheck, Clock, FileWarning, Info } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

const metrics = [
  { title: "Total Clients", value: "120", icon: Users, variant: "blue" },
  { title: "Total Amount", value: "₹2,50,000", icon: CreditCard, variant: "green" },
  { title: "Active Clients", value: "105", icon: UserCheck, variant: "teal" },
  { title: "Pending Amount", value: "₹45,000", icon: Clock, variant: "yellow" },
  { title: "Invoices Due", value: "12", icon: FileWarning, variant: "red" },
  { title: "Billing Info", value: "View Plans", icon: Info, variant: "indigo" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder="Search everything..." className="w-full max-w-sm rounded-full pl-10" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            variant={metric.variant as any}
          />
        ))}
      </div>
    </div>
  );
}
