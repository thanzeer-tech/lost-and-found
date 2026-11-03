"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  Check,
  X,
  Trash2,
  Search,
  Filter,
  FileCheck
} from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import Table from "@/components/Table";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import EmptyState from "@/components/EmptyState";

export default function AdminDeskPage() {
  const { items, stats, markAsReunited, deleteItem, updateClaimStatus, resetToSampleData } = useItems();
  const { currentUser, isAdmin, switchRole } = useAuth();

  const [activeReviewItem, setActiveReviewItem] = useState(null);
  const [filterType, setFilterType] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredAdminItems = items.filter((item) => {
    if (filterType === "LOST" && item.type !== "LOST") return false;
    if (filterType === "FOUND" && item.type !== "FOUND") return false;
    if (filterType === "REUNITED" && item.status !== "REUNITED") return false;
    if (filterType === "CLAIMS" && (!item.claims || item.claims.length === 0)) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchLoc = item.location?.toLowerCase().includes(q);
      const matchRoll = item.reporterRoll?.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchRoll) return false;
    }
    return true;
  });

  const totalPendingClaims = items.reduce((acc, curr) => {
    const pending = (curr.claims || []).filter((c) => c.status === "PENDING").length;
    return acc + pending;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-blue-500/20 text-blue-300 rounded-lg">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Campus Security &amp; Helpdesk Portal
            </h1>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Official administration console for managing item custody, reviewing claimant
            verification challenges, and marking recovered belongings as reunited.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {!isAdmin && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => switchRole("admin")}
              title="Switch role to Admin"
            >
              Switch to Security View
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={resetToSampleData}
            className="text-slate-200 border-white/20 bg-white/10 hover:bg-white/20 hover:text-white"
          >
            Reset Sample Data
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Items In Directory</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Awaiting Handover</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.foundCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Pending Claims</p>
          <p className="text-2xl font-bold text-amber-500 mt-1">{totalPendingClaims}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-400 uppercase">Successfully Reunited</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.reunitedCount}</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {[
            { key: "ALL", label: "All Items" },
            { key: "FOUND", label: "Found Only" },
            { key: "LOST", label: "Lost Only" },
            { key: "CLAIMS", label: "With Claims" },
            { key: "REUNITED", label: "Reunited" }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterType(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                filterType === tab.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items, roll..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Admin Management Table */}
      <Table
        headers={[
          "Item & Details",
          "Type / Category",
          "Location / Custody",
          "Reported By",
          "Claims",
          "Status",
          "Action"
        ]}
      >
        {filteredAdminItems.length > 0 ? (
          filteredAdminItems.map((item) => {
            const isReunited = item.status === "REUNITED";
            const claimsCount = item.claims?.length || 0;

            return (
              <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div>
                      <Link
                        href={`/item/${item.id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 transition"
                      >
                        {item.title}
                      </Link>
                      <p className="text-[11px] text-slate-400">Date: {item.date}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1 items-start">
                    <Badge variant={item.type === "LOST" ? "red" : "green"}>
                      {item.type}
                    </Badge>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.category}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4 text-xs">
                  <p className="font-semibold text-slate-800">{item.location}</p>
                  <p className="text-[11px] text-slate-500">
                    {item.custodyLocation || item.specificSpot || "—"}
                  </p>
                </td>

                <td className="px-5 py-4 text-xs">
                  <p className="font-semibold text-slate-800">{item.reporterRoll || "N/A"}</p>
                  <p className="text-[11px] text-slate-500 truncate max-w-[120px]">
                    {item.contactEmail}
                  </p>
                </td>

                <td className="px-5 py-4 text-xs">
                  {claimsCount > 0 ? (
                    <button
                      onClick={() => setActiveReviewItem(item)}
                      className="inline-flex items-center gap-1 font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 hover:bg-amber-100"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{claimsCount} {claimsCount === 1 ? "Claim" : "Claims"}</span>
                    </button>
                  ) : (
                    <span className="text-slate-400 text-xs">None</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <Badge variant={isReunited ? "blue" : "slate"}>
                    {isReunited ? "Reunited" : "Open"}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    {!isReunited && (
                      <button
                        onClick={() => markAsReunited(item.id)}
                        title="Mark Reunited"
                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <Link
                      href={`/item/${item.id}`}
                      title="View Details"
                      className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm("Delete this listing?")) deleteItem(item.id);
                      }}
                      title="Delete Listing"
                      className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
              No matching items found for the selected filter.
            </td>
          </tr>
        )}
      </Table>

      {/* Claim Review Modal */}
      {activeReviewItem && (
        <Modal
          isOpen={!!activeReviewItem}
          onClose={() => setActiveReviewItem(null)}
          title={`Review Claims: ${activeReviewItem.title}`}
          description="Verify claimant statements against the security challenge before handing over custody."
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            {activeReviewItem.securityQuestion && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-amber-900">Security Verification Question:</span>
                <p className="italic text-amber-800">"{activeReviewItem.securityQuestion}"</p>
              </div>
            )}

            <div className="space-y-3">
              {(activeReviewItem.claims || []).map((claim) => (
                <div
                  key={claim.id}
                  className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50/50"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{claim.claimantName}</span>
                      <span className="text-slate-500 ml-1.5">(Roll: {claim.claimantRoll})</span>
                      <p className="text-[11px] text-slate-400">{claim.claimantEmail}</p>
                    </div>
                    <Badge
                      variant={
                        claim.status === "APPROVED"
                          ? "green"
                          : claim.status === "REJECTED"
                          ? "red"
                          : "amber"
                      }
                    >
                      {claim.status}
                    </Badge>
                  </div>

                  <div className="text-xs bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-700 block mb-0.5">
                      Claimant's Proof Statement:
                    </span>
                    <p className="text-slate-800 italic">"{claim.proofDetails}"</p>
                  </div>

                  {claim.status === "PENDING" && (
                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          updateClaimStatus(activeReviewItem.id, claim.id, "REJECTED");
                          setActiveReviewItem(null);
                        }}
                      >
                        Reject Claim
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        icon={Check}
                        onClick={() => {
                          updateClaimStatus(activeReviewItem.id, claim.id, "APPROVED");
                          setActiveReviewItem(null);
                        }}
                      >
                        Approve &amp; Mark Handed Over
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <Button variant="ghost" onClick={() => setActiveReviewItem(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
