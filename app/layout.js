import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SuperbSite",
  description: "Sales Agent Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* Main page content */}
        <main className="flex-grow">{children}</main>

        {/* Global Footer */}
        <footer className="bg-purple-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand/Description */}
              <div>
                <h4 className="font-bold text-lg mb-4">SuperbSite</h4>
                <p className="text-purple-200 text-sm">
                  Connecting skilled sales professionals with high-value
                  development opportunities.
                </p>
              </div>

              {/* Quick Links */}
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
                </ul>
              </div>

              {/* Support */}
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

              {/* Contact Info */}
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-purple-200 text-sm">
                  support@SuperbSite.com
                  <br />
                  1-800-SuperbSite
                  <br />
                  Mon-Fri 8AM-8PM EST
                </p>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-purple-700 mt-8 pt-6 text-center text-purple-200 text-sm">
              &copy; {new Date().getFullYear()} SuperbSite. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
