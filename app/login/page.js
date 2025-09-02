"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      alert("Login successful! Redirecting to dashboard...");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Partner Login</h1>
        <p className="text-gray-600">Access your partner dashboard</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-3 rounded mb-4 max-w-md w-full">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email or Username *
          </label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter your email or username"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            You can use either your email address or username
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center text-sm text-gray-600">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#" className="text-sm text-purple-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="border-t border-gray-200 pt-4 mb-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-700 text-white py-3 rounded-md font-semibold hover:bg-purple-800 transition disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In to Dashboard"}
          </button>
        </div>

        <p className="text-center text-gray-600 text-sm">
          New partner?{" "}
          <a
            href="/signup"
            className="text-purple-600 hover:underline font-semibold"
          >
            Apply here
          </a>
        </p>
      </form>
    </div>
  );
}
