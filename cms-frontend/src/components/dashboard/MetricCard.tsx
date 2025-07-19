import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type MetricCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
  variant?: 'blue' | 'green' | 'teal' | 'yellow' | 'red' | 'indigo';
};

const variantClasses = {
  blue: "bg-metric-blue text-metric-blue-foreground",
  green: "bg-metric-green text-metric-green-foreground",
  teal: "bg-metric-teal text-metric-teal-foreground",
  yellow: "bg-metric-yellow text-metric-yellow-foreground",
  red: "bg-metric-red text-metric-red-foreground",
  indigo: "bg-metric-indigo text-metric-indigo-foreground",
};

export function MetricCard({ title, value, icon: Icon, variant = 'blue' }: MetricCardProps) {
  const cardContent = (
    <Card className="rounded-2xl shadow-md transition-all hover:scale-105 hover:shadow-lg h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-lg", variantClasses[variant])}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold font-headline">{value}</div>
      </CardContent>
    </Card>
  );

  if (title === 'Billing Info') {
    return <Link href="/billing">{cardContent}</Link>;
  }

  return cardContent;
}
