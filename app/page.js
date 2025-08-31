"use client";
import { useState } from "react";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-purple-800 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">SuperbSite</h1>
        <nav className="space-x-6 flex items-center">
          <a
            href="#features"
            className="hover:text-purple-200 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="hover:text-purple-200 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#success-stories"
            className="hover:text-purple-200 transition-colors"
          >
            Success Stories
          </a>
          <button
            onClick={() => setShowLogin(true)}
            className="text-purple-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <a
            href="/signup"
            className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-lg hover:bg-yellow-300 font-semibold transition-colors shadow-md"
          >
            Join Now
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 py-20 bg-gradient-to-br from-purple-50 to-purple-100 flex-1">
        <div className="max-w-lg">
          <h2 className="text-5xl font-bold text-purple-800 mb-6 leading-tight">
            Earn 20% Commission Selling Web Development Services
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            Partner with us to sell professional web development, e-commerce,
            and digital solutions. Get comprehensive training, ongoing support,
            and earn substantial commissions on every sale.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/signup"
              className="bg-purple-700 text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-colors font-semibold text-center shadow-lg"
            >
              Start Earning Today
            </a>
            <button
              onClick={() => setShowLogin(true)}
              className="border-2 border-purple-700 text-purple-700 px-8 py-4 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
            >
              Existing Partner Login
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            * Average partners earn $2,000-$8,000 monthly after 3 months
          </p>
        </div>
        <div className="mt-10 md:mt-0">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h3 className="text-xl font-bold text-purple-800 mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Partners:</span>
                <span className="font-bold text-purple-700">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Monthly Earnings:</span>
                <span className="font-bold text-green-600">$4,200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Projects Completed:</span>
                <span className="font-bold text-purple-700">15,000+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-10 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">1</span>
              </div>
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                Sign Up
              </h4>
              <p className="text-gray-600">
                Complete our quick application and background check
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">2</span>
              </div>
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                Get Trained
              </h4>
              <p className="text-gray-600">
                2-week comprehensive training on our services and sales process
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">3</span>
              </div>
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                Start Selling
              </h4>
              <p className="text-gray-600">
                Connect with prospects using our proven sales materials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-700">4</span>
              </div>
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                Earn Commission
              </h4>
              <p className="text-gray-600">
                Receive 20% commission within 48 hours of project completion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-10 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            Why Partner With Us?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💰</div>
              <h4 className="font-semibold text-xl text-purple-700 mb-4">
                High-Value Commissions
              </h4>
              <p className="text-gray-600">
                Earn 20% on projects ranging from $5,000 to $50,000. Average
                commission per sale: $2,400
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🎓</div>
              <h4 className="font-semibold text-xl text-purple-700 mb-4">
                Professional Training
              </h4>
              <p className="text-gray-600">
                Comprehensive 2-week program covering technical basics, sales
                techniques, and ongoing mentorship
              </p>
            </div>
            <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h4 className="font-semibold text-xl text-purple-700 mb-4">
                Proven Success System
              </h4>
              <p className="text-gray-600">
                Our top partners average 8-12 sales per month using our tested
                marketing materials and processes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="px-10 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 bg-purple-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-700">MK</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-purple-700">Maria K.</h4>
                  <p className="text-sm text-gray-600">Partner since 2023</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I started with zero sales experience. After the training, I
                made my first sale within 10 days. Last month I earned $12,400
                in commissions!"
              </p>
              <div className="text-sm text-purple-600 font-semibold">
                Monthly avg: $8,200 | Total earned: $98,400
              </div>
            </div>
            <div className="p-8 bg-purple-50 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-700">DJ</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-purple-700">David J.</h4>
                  <p className="text-sm text-gray-600">Partner since 2022</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The support system is incredible. I have a dedicated mentor and
                the sales materials make closing deals so much easier. This
                changed my financial future."
              </p>
              <div className="text-sm text-purple-600 font-semibold">
                Monthly avg: $11,800 | Total earned: $189,600
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-10 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold text-purple-800 mb-12 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                Do I need technical experience?
              </h4>
              <p className="text-gray-600">
                No technical experience required. Our training covers everything
                you need to know about our services and how to present them to
                clients effectively.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                How quickly can I start earning?
              </h4>
              <p className="text-gray-600">
                Most partners make their first sale within 30 days of completing
                training. Top performers often close their first deal within 1-2
                weeks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg text-purple-700 mb-2">
                What support do you provide?
              </h4>
              <p className="text-gray-600">
                You get a dedicated mentor, weekly group calls, proven sales
                scripts, marketing materials, and 24/7 access to our partner
                portal with resources and training videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-10 py-16 bg-gradient-to-r from-purple-700 to-purple-800 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Start Your Success Story?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Join 2,847+ partners who are building their financial freedom with
            us
          </p>
          <a
            href="/signup"
            className="bg-yellow-400 text-purple-900 px-12 py-4 rounded-lg hover:bg-yellow-300 font-bold text-xl transition-colors shadow-lg inline-block"
          >
            Apply Now - It's Free
          </a>
          <p className="text-sm mt-4 opacity-75">
            No upfront costs • 2-week training included • Start earning
            immediately
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">DevPartner</h4>
              <p className="text-purple-200 text-sm">
                Connecting skilled sales professionals with high-value
                development opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Partner Agreement
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Training Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-purple-200 hover:text-white">
                    Partner Portal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-purple-200 text-sm">
                support@devpartner.com
                <br />
                1-800-DEV-PARTNER
                <br />
                Mon-Fri 8AM-8PM EST
              </p>
            </div>
          </div>
          <div className="border-t border-purple-700 mt-8 pt-6 text-center text-purple-200 text-sm">
            &copy; {new Date().getFullYear()} DevPartner. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Improved Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop with blur effect */}
          <div
            onClick={() => setShowLogin(false)}
            className="fixed inset-0 bg-white/20 backdrop-blur-sm"
          ></div>

          {/* Modal content */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10 mx-4 border border-purple-100"
          >
            {/* Close button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light"
            >
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-purple-700 mb-2">
                Partner Login
              </h2>
              <p className="text-gray-600">Access your partner dashboard</p>
            </div>

            {/* Login Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 p-4 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  // Handle login logic here
                  alert("Login functionality would be implemented here");
                }}
                className="w-full bg-purple-700 text-white py-4 rounded-lg hover:bg-purple-800 font-semibold transition-colors"
              >
                Sign In to Dashboard
              </button>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                New partner?{" "}
                <a
                  href="/signup"
                  className="text-purple-600 hover:text-purple-500 font-medium"
                >
                  Apply here
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
