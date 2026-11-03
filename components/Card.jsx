import React from "react";

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
  ...props
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-white border border-slate-200 rounded-xl overflow-hidden ${
        hover ? "hover:border-slate-300 hover:shadow-md transition duration-200" : "shadow-sm"
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
