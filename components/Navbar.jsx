"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Compass,
  PlusCircle,
  Shield,
  User,
  Menu,
  X,
  Search,
  Sparkles,
  ArrowRightLeft
} from "lucide-react";
import Button from "./Button";
import Badge from "./Badge";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, isAdmin, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: Compass },
    { label: "Report Lost", href: "/report-lost", icon: PlusCircle, badge: "Lost" },
    { label: "Report Found", href: "/report-found", icon: PlusCircle, badge: "Found" },
    { label: "My Items", href: "/my-items", icon: User },
    { label: "Security Desk", href: "/admin", icon: Shield, badge: "Admin" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  Campus<span className="text-blue-600">Trace</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  College Hub
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium -mt-0.5">
                Centralized Lost & Found Portal
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition ${
                    active
                      ? "bg-blue-50 text-blue-700 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                        link.badge === "Lost"
                          ? "bg-red-100 text-red-700"
                          : link.badge === "Found"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Demo Role Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => switchRole(isAdmin ? "student" : "admin")}
              title="Click to toggle between Student view and Campus Security Desk"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-blue-600" />
              <span>Role: <strong className={isAdmin ? "text-indigo-600" : "text-emerald-600"}>{isAdmin ? "Campus Security" : "Student"}</strong></span>
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <img
                src={currentUser?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Thanzeer"}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full border border-slate-300 bg-slate-100"
              />
              <div className="text-left text-xs">
                <p className="font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                  {currentUser?.name}
                </p>
                <p className="text-[10px] text-slate-400">{currentUser?.rollNo}</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={() => switchRole(isAdmin ? "student" : "admin")}
              className="p-1.5 rounded-lg text-xs bg-slate-100 text-slate-700"
              title="Toggle role"
            >
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold ${
                  active ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-8 h-8 rounded-full border border-slate-300"
              />
              <div className="text-xs">
                <p className="font-bold text-slate-800">{currentUser?.name}</p>
                <p className="text-[10px] text-slate-400">
                  {currentUser?.rollNo} ({isAdmin ? "Security Admin" : "Student"})
                </p>
              </div>
            </div>
            <button
              onClick={() => switchRole(isAdmin ? "student" : "admin")}
              className="text-xs px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-semibold"
            >
              Switch Role
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
