"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Compass,
  Search,
  PlusCircle,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock
} from "lucide-react";
import { useItems } from "@/context/ItemContext";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ItemCard from "@/components/ItemCard";
import ClaimModal from "@/components/ClaimModal";
import { CATEGORIES } from "@/context/dummyData";

export default function HomePage() {
  const router = useRouter();
  const { items, stats, setSearchTerm, setCategoryFilter } = useItems();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedClaimItem, setSelectedClaimItem] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchTerm(localSearch);
      router.push("/dashboard");
    }
  };

  const handleCategoryClick = (cat) => {
    setCategoryFilter(cat);
    router.push("/dashboard");
  };

  // Recent 4 active items
  const recentItems = items.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-slate-50 border-b border-slate-200 pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Official University Lost &amp; Found Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Lost Something on Campus? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              We Help You Recover It.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 leading-relaxed">
            CampusTrace connects students, faculty, and campus security. Report lost items in seconds,
            browse cataloged recoveries across all academic blocks, and verify ownership safely.
          </p>

          {/* Quick Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="max-w-2xl mx-auto flex items-center bg-white p-2 rounded-2xl shadow-lg border border-slate-200"
          >
            <div className="pl-3 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search calculator, AirPods, keys, ID card, or location..."
              className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
            />
            <Button type="submit" variant="primary" size="md">
              Search
            </Button>
          </form>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/report-lost">
              <Button variant="danger" size="lg" icon={PlusCircle}>
                I Lost An Item
              </Button>
            </Link>
            <Link href="/report-found">
              <Button variant="success" size="lg" icon={PlusCircle}>
                I Found An Item
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" icon={Compass}>
                Browse All Listings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Metrics Counter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">{stats.total}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Total Reported
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-red-500">{stats.lostCount}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Active Lost Reports
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600">{stats.foundCount}</p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Found In Custody
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">
              {stats.recoveryRate}%
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Recovery Rate ({stats.reunitedCount} Reunited)
            </p>
          </div>
        </div>
      </section>

      {/* Categories Quick Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">Explore by Category</h2>
          <Link
            href="/dashboard"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="p-3 text-center rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-700 transition text-xs font-semibold text-slate-700 truncate"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Campus Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Recent Campus Listings</h2>
            <p className="text-xs text-slate-500">Latest items reported across campus buildings</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              Open Full Feed
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onOpenClaim={(itm) => setSelectedClaimItem(itm)}
            />
          ))}
        </div>
      </section>

      {/* How it Works on Campus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How CampusTrace Works
            </h2>
            <p className="text-blue-200 text-sm mt-2">
              A verified 3-step recovery lifecycle designed for college campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-bold text-lg text-white">Report in 60 Seconds</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Misplaced an item or found something unattended? Post a quick notice specifying the
                campus block, room number, and distinctive identifiers.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-bold text-lg text-white">Security Verification</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Found items are handed over to Campus Security or reception desks. Owners submit a
                verification challenge answer to prove rightful ownership.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-bold text-lg text-white">Reunited &amp; Closed</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Present your Student ID Card at the custody desk to claim your belongings. The item is
                marked Reunited, closing the inquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Modal */}
      <ClaimModal
        item={selectedClaimItem}
        isOpen={!!selectedClaimItem}
        onClose={() => setSelectedClaimItem(null)}
      />
    </div>
  );
}
