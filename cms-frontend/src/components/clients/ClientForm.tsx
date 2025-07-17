// components/clients/ClientForm.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/lib/api/client";

export default function ClientForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    company_name: "",
    gst_number: "",
    phone: "",
    email: "",
    address: "",
    contact_persons: [],
    services: [],
  });

  const handleSubmit = async () => {
    try {
      await createClient({
        ...form,
        name: form.company_name,
      });
      setOpen(false);
      setForm({
        company_name: "",
        gst_number: "",
        phone: "",
        email: "",
        address: "",
        contact_persons: [],
        services: [],
      });
      onSuccess(); // reload client table
    } catch (err) {
      alert("Failed to create client");
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-1 rounded"
        onClick={() => setOpen(true)}
      >
        + Add Client
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xl">
            <h2 className="text-lg font-semibold mb-4">Add Client</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Company Name"
                value={form.company_name}
                onChange={(e) =>
                  setForm({ ...form, company_name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="GST Number"
                value={form.gst_number}
                onChange={(e) =>
                  setForm({ ...form, gst_number: e.target.value })
                }
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border px-3 py-2 rounded"
              ></textarea>
            </div>

            <div className="flex justify-end mt-5 space-x-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-1 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
