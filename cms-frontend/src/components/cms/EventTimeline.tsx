// components/cms/EventTimeline.tsx

"use client";

const events = [
  { time: "11:32", type: "New Client", user: "Raj Kumar", message: "Onboarded A-Tech Pvt Ltd" },
  { time: "11:20", type: "Invoice Sent", user: "System", message: "Invoice #1245 sent to NayaCo" },
  { time: "11:10", type: "Payment Received", user: "Accounts", message: "₹25,000 received from BrightTech" },
  { time: "10:50", type: "Reminder Sent", user: "System", message: "Payment reminder sent to XYZ Group" },
];

export default function EventTimeline() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-semibold mb-3">Latest Events</h2>
      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full mt-1" />
            <div>
              <div className="text-xs text-gray-400">{event.time} — {event.user}</div>
              <div className="text-sm text-gray-700">{event.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
