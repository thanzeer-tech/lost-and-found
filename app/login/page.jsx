"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, Shield, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth, DEMO_USERS } from "@/context/AuthContext";
import { FormField, Input } from "@/components/Input";
import Button from "@/components/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState("student.24cs109@college.edu");
  const [password, setPassword] = useState("password123");
  const [role, setRole] = useState("student");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "admin") {
      switchRole("admin");
    } else {
      switchRole("student");
    }
    router.push("/dashboard");
  };

  const handleQuickLogin = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "admin") {
      setEmail(DEMO_USERS.admin.email);
      switchRole("admin");
    } else {
      setEmail(DEMO_USERS.student.email);
      switchRole("student");
    }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md shadow-blue-500/20">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Campus Portal Sign In</h1>
          <p className="text-xs text-slate-500">
            Sign in with your University Roll Number or College Email
          </p>
        </div>

        {/* Demo Fast-Login Pills */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
          <p className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
            ⚡ Instant Demo Accounts:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin("student")}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-blue-200 hover:border-blue-400 text-xs font-semibold text-blue-700 text-left transition"
            >
              🎓 Student Account
              <span className="block text-[10px] text-slate-500 font-normal">Roll #24CS109</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin("admin")}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-indigo-200 hover:border-indigo-400 text-xs font-semibold text-indigo-700 text-left transition"
            >
              🛡️ Security Officer
              <span className="block text-[10px] text-slate-500 font-normal">Gate 1 Desk</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="College Email / Roll No" required>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. roll@college.edu"
              required
            />
          </FormField>

          <FormField label="Password" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormField>

          <Button type="submit" variant="primary" size="lg" className="w-full">
            Sign In to CampusTrace
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have an account? </span>
          <Link href="/register" className="font-bold text-blue-600 hover:underline">
            Register Student ID
          </Link>
        </div>
      </div>
    </div>
  );
}
