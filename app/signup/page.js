"use client";

import { useState } from "react";

export default function SignUp() {
  const [role, setRole] = useState("Agent");
  const [adminPin, setAdminPin] = useState("");
  const [leaderPin, setLeaderPin] = useState("");
  const [teamName, setTeamName] = useState("");

  // Secret PINs (in a real app, these would be securely stored and validated server-side)
  const ADMIN_PIN = "1234"; // Example admin PIN
  const LEADER_PIN = "5678"; // Example team leader PIN

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate PINs if needed
    if (role === "Admin" && adminPin !== ADMIN_PIN) {
      alert("Invalid Admin PIN");
      return;
    }

    if (role === "Team Leader") {
      if (leaderPin !== LEADER_PIN) {
        alert("Invalid Team Leader PIN");
        return;
      }
      if (!teamName.trim()) {
        alert("Please enter a team name");
        return;
      }
    }

    // Form submission logic would go here
    alert("Registration successful!");
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-purple-800 text-white py-3 px-6 w-full text-center p-5 border-b border-gray-300 bg-[#995da8]">
        <a href="/">
          <img src="/logo.webp" alt="SuperbSite Logo" className="h-10 w-50 b" />
        </a>

        <h1 className="text-4xl font-bold">Sales Agent Sign-Up</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full p-6 space-y-6 bg-white shadow rounded-lg mt-6 text-black">
        <p>
          Become a member of our sales team and unlock a world of unlimited
          earning potential! With our competitive commission structure (20% on
          development fees), you'll be rewarded as you grow. Follow the steps
          below to get started.
        </p>

        <ol className="list-decimal list-inside space-y-1 font-semibold">
          <li>Sign up to be a SuperbSite Sales Agent</li>
          <li>Verify your email address</li>
          <li>Complete the short training course</li>
          <li>Start Selling!</li>
        </ol>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Role *</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="Agent">Agent</option>
              <option value="Team Leader">Team Leader</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Admin PIN Field (only shown for Admin role) */}
          {role === "Admin" && (
            <div>
              <label className="block mb-1 font-medium">Admin PIN *</label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Enter admin PIN"
                className="w-full border rounded p-2"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Contact system administrator to obtain the admin PIN
              </p>
            </div>
          )}

          {/* Team Leader PIN and Team Name Fields (only shown for Team Leader role) */}
          {role === "Team Leader" && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Team Leader PIN *
                </label>
                <input
                  type="password"
                  value={leaderPin}
                  onChange={(e) => setLeaderPin(e.target.value)}
                  placeholder="Enter team leader PIN"
                  className="w-full border rounded p-2"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Contact your administrator to obtain the team leader PIN
                </p>
              </div>

              <div>
                <label className="block mb-1 font-medium">Team Name *</label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name"
                  className="w-full border rounded p-2"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter the name of the team you will be leading
                </p>
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 font-medium">Email Address *</label>
            <input
              type="email"
              placeholder="user@gmail.com"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input type="text" className="w-full border rounded p-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input
              type="password"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password *</label>
            <input
              type="password"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">First Name *</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name *</label>
              <input
                type="text"
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number *</label>
            <input type="text" className="w-full border rounded p-2" required />
          </div>

          <div>
            <label className="block mb-1 font-medium">Province *</label>
            <select className="w-full border rounded p-2" required>
              <option value="">Select Province</option>
              <option>Eastern Cape</option>
              <option>Western Cape</option>
              <option>Gauteng</option>
              <option>KwaZulu-Natal</option>
              <option>Limpopo</option>
              <option>Free State</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I have read and accept the Terms and Conditions
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
