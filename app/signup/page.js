"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [role, setRole] = useState("Agent");
  const [adminPin, setAdminPin] = useState("");
  const [leaderPin, setLeaderPin] = useState("");
  const [teamName, setTeamName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [province, setProvince] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Secret PINs (move to backend in production)
  const ADMIN_PIN = "1234"; // Example admin PIN
  const LEADER_PIN = "5678"; // Example team leader PIN

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Client-side validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (role === "Admin" && adminPin !== ADMIN_PIN) {
      setError("Invalid Admin PIN");
      setIsLoading(false);
      return;
    }

    if (role === "Team Leader") {
      if (leaderPin !== LEADER_PIN) {
        setError("Invalid Team Leader PIN");
        setIsLoading(false);
        return;
      }
      if (!teamName.trim()) {
        setError("Please enter a team name");
        setIsLoading(false);
        return;
      }
    }

    try {
      // Send signup request to API
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          username,
          role,
          mobileNumber,
          province,
          team: role === "Team Leader" ? teamName : null,
          adminPin: role === "Admin" ? adminPin : null,
          leaderPin: role === "Team Leader" ? leaderPin : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign up. Please try again.");
      }

      // Optional: Automatically log in the user after signup
      // This assumes your backend returns a session token or user data
      // If your backend doesn't handle auto-login, redirect to login page
      if (data.token) {
        // Store token in localStorage or cookies (adjust based on your auth setup)
        localStorage.setItem("token", data.token);
      }

      // Redirect to signup success page with role and firstName as query parameters
      router.push(
        `/signup-success?role=${role}&firstName=${encodeURIComponent(
          firstName
        )}`
      );
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-400 to-purple-800 text-white py-3 px-6 w-full text-center p-5 border-b border-gray-300 bg-[#995da8]">
        <a href="/">
          <img
            src="/logo.webp"
            alt="SuperbSite Logo"
            className="h-10 w-50 mx-auto"
          />
        </a>
        <h1 className="text-4xl font-bold mt-2">Sales Agent Sign-Up</h1>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto w-full p-6 space-y-6 bg-white shadow rounded-lg mt-6 text-black">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

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
            <p className="text-sm text-gray-500 mt-1">
              {role === "Agent" &&
                "Start as a sales agent and earn commissions"}
              {role === "Team Leader" &&
                "Lead a team and earn additional bonuses"}
              {role === "Admin" && "Full system access and management"}
            </p>
          </div>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gmail.com"
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password *</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">First Name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Mobile Number *</label>
            <input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Province *</label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full border rounded p-2"
              required
            >
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
            disabled={isLoading}
            className="w-full bg-purple-700 text-white py-2 rounded font-semibold hover:bg-purple-800 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>
        <div className="text-center pt-4 border-t">
          <p className="text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:text-purple-800 font-semibold underline"
            >
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
