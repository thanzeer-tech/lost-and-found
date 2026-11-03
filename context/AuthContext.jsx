"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const DEMO_USERS = {
  student: {
    id: "user-student-1",
    name: "Mohammad Thanzeer",
    rollNo: "24CS109",
    email: "student.24cs109@college.edu",
    department: "Computer Science & Engineering",
    year: "3rd Year",
    role: "student",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Thanzeer"
  },
  admin: {
    id: "user-admin-1",
    name: "Officer Ramesh Kumar",
    rollNo: "STAFF-SEC-04",
    email: "security.gate1@college.edu",
    department: "Campus Security & Custody Desk",
    year: "Chief Inspector",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SecurityRamesh"
  }
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(DEMO_USERS.student);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("campustrace_user");
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
    setIsLoaded(true);
  }, []);

  const switchRole = (role) => {
    const user = role === "admin" ? DEMO_USERS.admin : DEMO_USERS.student;
    setCurrentUser(user);
    try {
      localStorage.setItem("campustrace_user", JSON.stringify(user));
    } catch (e) {}
  };

  const login = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem("campustrace_user", JSON.stringify(userData));
    } catch (e) {}
  };

  const logout = () => {
    setCurrentUser(DEMO_USERS.student);
    try {
      localStorage.removeItem("campustrace_user");
    } catch (e) {}
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin: currentUser?.role === "admin",
        switchRole,
        login,
        logout,
        isLoaded
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
