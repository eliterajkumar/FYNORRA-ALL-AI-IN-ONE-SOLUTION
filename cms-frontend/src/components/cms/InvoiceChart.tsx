// components/cms/InvoiceChart.tsx

"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", total: 800 },
  { name: "Feb", total: 640 },
  { name: "Mar", total: 980 },
  { name: "Apr", total: 400 },
  { name: "May", total: 950 },
  { name: "Jun", total: 760 },
];

export default function InvoiceChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="font-semibold mb-2">Invoice Stats (Monthly)</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4ade80" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
