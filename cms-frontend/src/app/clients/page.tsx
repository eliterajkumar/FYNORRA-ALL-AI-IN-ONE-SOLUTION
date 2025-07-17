// app/clients/page.tsx
import ClientTable from "@/components/clients/ClientTable";

export default function ClientsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Management</h1>
      <ClientTable />
    </div>
  );
}
