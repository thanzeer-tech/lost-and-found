import React from "react";
import { SearchX } from "lucide-react";
import Button from "./Button";

export default function EmptyState({
  icon: Icon = SearchX,
  title = "No items found",
  description = "We couldn't find any items matching your current filters or search terms.",
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white rounded-2xl border border-dashed border-slate-300 max-w-md mx-auto my-8">
      <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
