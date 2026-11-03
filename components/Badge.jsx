import React from "react";

export default function Badge({
  children,
  variant = "slate", // red, green, blue, amber, purple, slate
  size = "sm",
  className = ""
}) {
  const sizeStyles = {
    xs: "px-2 py-0.5 text-[11px]",
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  const variantStyles = {
    red: "bg-red-100 text-red-800 border border-red-200",
    green: "bg-emerald-100 text-emerald-800 border border-emerald-200",
    blue: "bg-blue-100 text-blue-800 border border-blue-200",
    amber: "bg-amber-100 text-amber-800 border border-amber-200",
    purple: "bg-purple-100 text-purple-800 border border-purple-200",
    slate: "bg-slate-100 text-slate-700 border border-slate-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold rounded-full ${sizeStyles[size]} ${variantStyles[variant] || variantStyles.slate} ${className}`}
    >
      {children}
    </span>
  );
}
