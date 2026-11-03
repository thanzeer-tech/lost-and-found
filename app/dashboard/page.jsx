"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  PlusCircle,
  RotateCcw,
  Compass,
  MapPin,
  Tag,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { CAMPUS_LOCATIONS, CATEGORIES } from "@/context/dummyData";
import ItemCard from "@/components/ItemCard";
import ClaimModal from "@/components/ClaimModal";
import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import { Select } from "@/components/Input";

export default function DashboardPage() {
  const {
    filteredItems,
    items,
    stats,
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    locationFilter,
    setLocationFilter,
    statusFilter,
    setStatusFilter,
    resetToSampleData
  } = useItems();

  const [selectedClaimItem, setSelectedClaimItem] = useState(null);

  const statusTabs = [
    { key: "ALL", label: "All Items", count: stats.total },
    { key: "LOST", label: "Lost Items", count: stats.lostCount },
    { key: "FOUND", label: "Found Items", count: stats.foundCount },
    { key: "REUNITED", label: "Reunited", count: stats.reunitedCount }
  ];

  const clearAllFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All Categories");
    setLocationFilter("All Campus Locations");
    setStatusFilter("ALL");
  };

  const hasActiveFilters =
    searchTerm !== "" ||
    categoryFilter !== "All Categories" ||
    locationFilter !== "All Campus Locations" ||
    statusFilter !== "ALL";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Lost &amp; Found Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search, or filter belongings reported lost or found across college premises.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/report-lost">
            <Button variant="danger" size="sm" icon={PlusCircle}>
              Post Lost
            </Button>
          </Link>
          <Link href="/report-found">
            <Button variant="success" size="sm" icon={PlusCircle}>
              Post Found
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={resetToSampleData}
            title="Reset to original sample data"
          >
            Reset Data
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item name, room, building, description, or student roll number..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600 font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
            Status:
          </span>
          {statusTabs.map((tab) => {
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? "bg-white/25 text-white" : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Filter by Category:
            </label>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={CATEGORIES}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">
              Filter by Campus Zone:
            </label>
            <Select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              options={CAMPUS_LOCATIONS}
            />
          </div>

          <div className="flex items-end">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="w-full text-blue-600 hover:text-blue-800"
              >
                Reset All Filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Listings Count Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> items
        </span>
        {hasActiveFilters && (
          <span className="text-blue-600 font-medium">Filtered results active</span>
        )}
      </div>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onOpenClaim={(itm) => setSelectedClaimItem(itm)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No items found"
          description="Try modifying your keyword search or resetting category/location filters."
          actionLabel="Reset All Filters"
          onAction={clearAllFilters}
        />
      )}

      {/* Claim Modal */}
      <ClaimModal
        item={selectedClaimItem}
        isOpen={!!selectedClaimItem}
        onClose={() => setSelectedClaimItem(null)}
      />
    </div>
  );
}
