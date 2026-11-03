import "./globals.css";
import { ItemProvider } from "@/context/ItemContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "CampusTrace | College Lost & Found Hub",
  description:
    "The official centralized campus lost-and-found management platform for college students, faculty, and campus security staff.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <AuthProvider>
          <ItemProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
                <p className="font-semibold text-slate-700">
                  CampusTrace &bull; University Lost and Found Network
                </p>
                <p>
                  Inspired by Boomerang (YC S22 &amp; Product Hunt). Built for Milestone-1 Course Project.
                </p>
                <p className="text-slate-400">
                  Developed by Student 1 &amp; Student 2 &bull; Next.js + React Context + Tailwind CSS
                </p>
              </div>
            </footer>
          </ItemProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
