"use client";

import { useEffect, useState } from "react";
import { getAllClients, searchClients, deleteClient } from "@/lib/api/client";
import ClientSearchBar from "./ClientSearchBar";
import ClientForm from "./ClientForm";

type Client = {
  id: string;
  company_name: string;
  phone: string;
  gst_number: string;
  services?: string[]; // Replace 'string' with a more specific type if needed
};

export default function ClientTable() {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = searchTerm
          ? await searchClients(searchTerm)
          : await getAllClients();
        setClients(data);
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetch();
  }, [searchTerm, reload]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      setReload(!reload);
    }
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <ClientSearchBar setSearchTerm={setSearchTerm} />
        <ClientForm onSuccess={() => setReload(!reload)} />
      </div>

      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Company</th>
            <th className="p-2">Phone</th>
            <th className="p-2">GST</th>
            <th className="p-2">Services</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-2">{client.company_name}</td>
                <td className="p-2">{client.phone}</td>
                <td className="p-2">{client.gst_number}</td>
                <td className="p-2">{client.services?.length || 0}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2">Edit</button>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelete(client.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4">
                No clients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
