"use client";
import { useState } from 'react';

export default function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId && password) {
      alert(`Logging in with Employee ID: ${employeeId}`);
      // Add your login logic here
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Wavy Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100"
        style={{
          background: 'linear-gradient(135deg, #87CEEB 0%, #E0F6FF 100%)',
          clipPath: 'ellipse(80% 60% at 50% 40%)',
        }}
      />
      {/* Login Container */}
      <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-full shadow-lg w-80 h-80 flex items-center justify-center flex-col text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-600">Fynorra CMS</h2>
        <form onSubmit={handleLogin} className="space-y-4 w-3/4">
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            className="w-full p-2 border border-gray-300 rounded text-center"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded text-center"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            LOGIN
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4">© 2025 Fynorra</p>
      </div>
    </div>
  );
}