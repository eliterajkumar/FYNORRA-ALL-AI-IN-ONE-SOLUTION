import { ClientTable } from "@/components/clients/ClientTable";
import { Button } from "@/components/ui/button";
import { clients } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Clients</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>
      <ClientTable data={clients} />
    </div>
  );
}
