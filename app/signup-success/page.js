"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SignupSuccess() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "Agent";
  const firstName = searchParams.get("firstName") || "";

  // Personalized messages based on role
  const roleMessages = {
    Agent: {
      title: "Welcome to the Sales Team! 🎉",
      subtitle: `Congratulations${
        firstName ? " " + firstName : ""
      }! You're now a SuperbSite Sales Agent`,
      description:
        "Get ready to unlock unlimited earning potential with our 20% commission structure on development fees.",
      icon: "🚀",
    },
    "Team Leader": {
      title: "Welcome Team Leader! 👑",
      subtitle: `Congratulations${
        firstName ? " " + firstName : ""
      }! You're now a SuperbSite Team Leader`,
      description:
        "Lead your team to success and earn additional leadership bonuses on top of your commissions.",
      icon: "👑",
    },
    Admin: {
      title: "Welcome Administrator! ⚙️",
      subtitle: `Congratulations${
        firstName ? " " + firstName : ""
      }! You're now a SuperbSite Administrator`,
      description:
        "Manage the platform, monitor performance, and support your sales team's success.",
      icon: "⚙️",
    },
  };

  const roleInfo = roleMessages[role] || roleMessages.Agent;

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Role-specific Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl text-white">{roleInfo.icon}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {roleInfo.title}
        </h1>

        <p className="text-lg text-purple-600 font-semibold mb-4">
          {roleInfo.subtitle}
        </p>

        <p className="text-gray-600 mb-8">{roleInfo.description}</p>

        {/* Single Dashboard Button */}
        <Link
          href="/dashboard"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-900 transition-all duration-200 transform hover:scale-105 block shadow-md text-lg"
        >
          Access Your Dashboard
        </Link>

        {/* Role Display - Replaced the email message */}
        <p className="text-sm text-gray-500 mt-6">
          Role: <span className="font-semibold text-purple-600">{role}</span>
        </p>
      </div>
    </main>
  );
}
