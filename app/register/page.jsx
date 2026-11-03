"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Compass, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { FormField, Input, Select } from "@/components/Input";
import Button from "@/components/Button";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      id: `user-${Date.now()}`,
      name,
      rollNo,
      department,
      email,
      role: "student",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name || "User"}`
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/20">
            <Compass className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Student Registration</h1>
          <p className="text-xs text-slate-500">
            Join the campus recovery network with your university credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Full Name" required>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Mohammad Thanzeer"
              required
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Student Roll No" required>
              <Input
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="24CS109"
                required
              />
            </FormField>

            <FormField label="Department" required>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={[
                  "Computer Science",
                  "Electronics & Comm",
                  "Mechanical Eng",
                  "Electrical Eng",
                  "Civil Eng",
                  "Business Admin",
                  "Basic Sciences"
                ]}
              />
            </FormField>
          </div>

          <FormField label="College Email Address" required>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@college.edu"
              required
            />
          </FormField>

          <FormField label="Password" required>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </FormField>

          <Button type="submit" variant="secondary" size="lg" className="w-full">
            Complete Registration
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Already registered? </span>
          <Link href="/login" className="font-bold text-blue-600 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
