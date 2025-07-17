"use client";

import SummaryCard from "@/components/ui/SummaryCard";
import { useEffect, useState } from "react";
import { getAllClients } from "@/lib/api/client";

type Client = {
  id: string;
  company_name: string;
  phone: string;
  gst_number: string;
  services?: string[];
};

export default function DashboardCards() {
  const [clientCount, setClientCount] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    (async () => {
      const clients: Client[] = await getAllClients(); // 🔧 type hint here
      setClientCount(clients.length);
      let total = 0;
      clients.forEach((c) => {
        total += c.services?.length || 0;
      });
      setTotalServices(total);
    })();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard title="Total Clients" value={clientCount} color="bg-blue-100 text-blue-900" />
      <SummaryCard title="Total Services" value={totalServices} color="bg-green-100 text-green-900" />
      <SummaryCard title="Active Clients" value="Coming Soon" color="bg-yellow-100 text-yellow-900" />
      <SummaryCard title="Invoices Due" value="Coming Soon" color="bg-red-100 text-red-900" />
    </div>
  );
}
