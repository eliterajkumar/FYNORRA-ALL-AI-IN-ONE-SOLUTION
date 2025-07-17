"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";

const dummyMessages = [
  { from: "ai", text: "Hello! How can I help you today?" },
  { from: "user", text: "Show me all pending invoices." },
  { from: "ai", text: "You have 3 pending invoices for this month." },
];

export default function AIChatPage() {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "user", text: input }]);
      setInput("");
      // Simulate AI reply
      setTimeout(() => {
        setMessages(msgs => [...msgs, { from: "ai", text: "(AI reply coming soon...)" }]);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg flex flex-col h-[80vh]">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <span className="text-indigo-600 text-2xl"><MessageCircle /></span>
          <span className="font-semibold text-lg text-gray-700">AI Assistant</span>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm ${msg.from === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2 bg-white">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          />
          <button onClick={handleSend} className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition flex items-center justify-center">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
} 