
"use client";

import SummaryCard from "@/components/ui/SummaryCard";
import InvoiceChart from "@/components/cms/InvoiceChart";
import EventTimeline from "@/components/cms/EventTimeline";
import { Users, FileText, DollarSign, Settings, Send, CreditCard, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// CircleCard component for the 5 circle metrics
function CircleCard({ title, value, color, icon }: { title: string; value: string | number; color: string; icon: React.ReactNode }) {
  return (
    <div className={`flex flex-col items-center justify-center bg-white rounded-full shadow-lg w-32 h-32 m-2 ${color}`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 text-white text-2xl bg-opacity-30`}>{icon}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="text-xs text-gray-500 text-center mt-1">{title}</div>
    </div>
  );
}

export default function CMSDashboard() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "Raj Kumar", email: "raj@example.com", status: "Active" },
    { id: 2, name: "Alberta Colon", email: "alberta@example.com", status: "Inactive" },
    { id: 3, name: "May Padilla", email: "may@example.com", status: "Active" },
  ]);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", status: "Active" });
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCustomer.name && newCustomer.email) {
      setCustomers([...customers, { id: Date.now(), ...newCustomer }]);
      setNewCustomer({ name: "", email: "", status: "Active" });
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleRemove = (id: number) => {
    if (confirm("Are you sure you want to remove this customer?")) {
      setCustomers(customers.filter((c) => c.id !== id));
    }
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 p-6 text-white">
      {/* Header with Navigation */}
      <div className="max-w-7xl mx-auto flex flex-col items-center mb-8">
        <div className="flex gap-6 items-center mb-4">
          <span className="font-bold text-lg text-gray-200 hover:text-white cursor-pointer">Clients</span>
          <span className="font-bold text-lg text-gray-200 hover:text-white cursor-pointer">Billing</span>
          <span className="font-bold text-lg text-gray-200 hover:text-white cursor-pointer">Invoices</span>
          <span className="font-bold text-lg text-gray-200 hover:text-white cursor-pointer">Reports</span>
        </div>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search clients, billing..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
        </div>
      </div>

      {/* Main Section: Left (cards), Right (AI) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: 5 Colorful Cards */}
        <div className="col-span-1 flex flex-col items-center lg:items-start">
          <div className="grid grid-cols-1 gap-6 w-full">
            <div className="flex gap-6">
              <CircleCard title="Total Clients" value="43" color="bg-gradient-to-br from-green-400 to-green-600" icon={<Users />} />
              <CircleCard title="Total Amount" value="₹1,20,000" color="bg-gradient-to-br from-blue-400 to-blue-600" icon={<DollarSign />} />
              <CircleCard title="Billing Sent (Monthly)" value="₹87,000" color="bg-gradient-to-br from-orange-400 to-orange-600" icon={<Send />} />
            </div>
            <div className="flex gap-6">
              <CircleCard title="Total Invoice" value="127" color="bg-gradient-to-br from-purple-400 to-purple-600" icon={<FileText />} />
              <CircleCard title="Pending Amount" value="₹15,000" color="bg-gradient-to-br from-red-400 to-red-600" icon={<CreditCard />} />
            </div>
          </div>
        </div>
        {/* Right: AI Assistant Chat Panel */}
        <div className="col-span-2 flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-2xl shadow-lg flex flex-col items-center justify-center min-h-[350px] p-8 w-full max-w-xl mx-auto">
            <span className="text-4xl mb-4 text-indigo-500"><MessageCircle /></span>
            <span className="font-semibold text-lg text-gray-200 mb-2">AI Assistant</span>
            <span className="text-gray-400 text-center mb-6">Chat with your AI assistant here. (Coming Soon)</span>
            <button
              onClick={() => router.push("/cms/ai")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition"
            >
              Open AI Chat
            </button>
          </div>
        </div>
      </div>

      {/* Customer Management Section */}
      <div className="max-w-7xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-200">Customer Management</h2>
          <button
            onClick={() => document.getElementById("addCustomerModal")?.showModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition"
          >
            + Add Customer
          </button>
        </div>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 text-left text-gray-200">Name</th>
              <th className="p-2 text-left text-gray-200">Email</th>
              <th className="p-2 text-left text-gray-200">Status</th>
              <th className="p-2 text-left text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c.id} className="border-t border-gray-600">
                  <td className="p-2 text-gray-200">{c.name}</td>
                  <td className="p-2 text-gray-200">{c.email}</td>
                  <td className="p-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleRemove(c.id)} className="text-red-400 hover:text-red-600">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-400">No customers found.</td>
            </tr>
            )}
          </tbody>
        </table>

        {/* Add Customer Modal */}
        <dialog id="addCustomerModal" className="modal">
          <div className="modal-box bg-gray-800 text-white">
            <h3 className="font-bold text-lg">Add New Customer</h3>
            <form onSubmit={handleAddCustomer} className="space-y-4 mt-4">
              <input
                type="text"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                placeholder="Name"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
              />
              <input
                type="email"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                placeholder="Email"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
              />
              <select
                value={newCustomer.status}
                onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="modal-action">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  onClick={() => document.getElementById("addCustomerModal")?.close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}