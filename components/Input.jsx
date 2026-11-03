import React from "react";

export function FormField({ label, error, required = false, children, helperText }) {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
}

export function Input({
  type = "text",
  className = "",
  error,
  icon: Icon,
  ...props
}) {
  return (
    <div className="relative w-full">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        type={type}
        className={`w-full rounded-lg border text-sm text-slate-900 bg-white placeholder-slate-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          Icon ? "pl-9" : "px-3.5"
        } py-2.5 ${
          error
            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
            : "border-slate-300"
        } ${className}`}
        {...props}
      />
    </div>
  );
}

export function Textarea({ className = "", error, rows = 3, ...props }) {
  return (
    <textarea
      rows={rows}
      className={`w-full rounded-lg border text-sm text-slate-900 bg-white placeholder-slate-400 px-3.5 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-slate-300"
      } ${className}`}
      {...props}
    />
  );
}

export function Select({ options = [], className = "", error, ...props }) {
  return (
    <select
      className={`w-full rounded-lg border text-sm text-slate-900 bg-white px-3.5 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error
          ? "border-red-300 focus:ring-red-500 focus:border-red-500"
          : "border-slate-300"
      } ${className}`}
      {...props}
    >
      {options.map((opt) => {
        const val = typeof opt === "string" ? opt : opt.value;
        const label = typeof opt === "string" ? opt : opt.label;
        return (
          <option key={val} value={val}>
            {label}
          </option>
        );
      })}
    </select>
  );
}
