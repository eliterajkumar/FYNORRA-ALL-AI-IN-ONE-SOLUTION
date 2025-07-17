export default function EventTimeline() {
  const events = [
    { time: "11:20", type: "Invoice Sent", user: "System", message: "Invoice sent to ABC Ltd." },
    { time: "12:05", type: "Payment Received", user: "John Doe", message: "Payment received from ABC Ltd." },
    { time: "13:15", type: "Invoice Approved", user: "Jane Smith", message: "Invoice approved by manager." }
  ];

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
