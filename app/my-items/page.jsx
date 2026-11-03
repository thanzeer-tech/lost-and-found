"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, PlusCircle, CheckCircle2, Clock, AlertCircle, ShieldCheck } from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import ItemCard from "@/components/ItemCard";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import EmptyState from "@/components/EmptyState";
import ClaimModal from "@/components/ClaimModal";

export default function MyItemsPage() {
  const { items } = useItems();
  const { currentUser, isAdmin } = useAuth();
  const [selectedClaimItem, setSelectedClaimItem] = useState(null);
  const [tab, setTab] = useState("reported"); // reported or claims

  const myReportedItems = items.filter(
    (item) => item.reporterRoll === currentUser?.rollNo
  );

  const myClaims = [];
  items.forEach((item) => {
    (item.claims || []).forEach((c) => {
      if (c.claimantRoll === currentUser?.rollNo) {
        myClaims.push({
          item,
          claim: c
        });
      }
    });
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-16 h-16 rounded-full border-2 border-blue-500 bg-slate-100 p-0.5"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">{currentUser?.name}</h1>
              <Badge variant={isAdmin ? "purple" : "blue"}>
                {isAdmin ? "Campus Security Desk" : "Student Member"}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Roll No: <strong className="text-slate-700">{currentUser?.rollNo}</strong> &bull;{" "}
              {currentUser?.email}
            </p>
            <p className="text-[11px] text-slate-400">{currentUser?.department}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/report-lost" className="flex-1 sm:flex-none">
            <Button variant="danger" size="sm" icon={PlusCircle} className="w-full">
              Post Lost
            </Button>
          </Link>
          <Link href="/report-found" className="flex-1 sm:flex-none">
            <Button variant="success" size="sm" icon={PlusCircle} className="w-full">
              Post Found
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setTab("reported")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
            tab === "reported"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>Items I Reported</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              tab === "reported" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {myReportedItems.length}
          </span>
        </button>

        <button
          onClick={() => setTab("claims")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
            tab === "claims"
              ? "bg-blue-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>My Submitted Claims</span>
          <span
            className={`px-2 py-0.5 text-xs rounded-full ${
              tab === "claims" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {myClaims.length}
          </span>
        </button>
      </div>

      {/* Tab Content */}
      {tab === "reported" && (
        <div>
          {myReportedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {myReportedItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onOpenClaim={(itm) => setSelectedClaimItem(itm)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No reports filed yet"
              description="You haven't reported any lost or found items under this account."
              actionLabel="Report a Lost Item"
              onAction={() => (window.location.href = "/report-lost")}
            />
          )}
        </div>
      )}

      {tab === "claims" && (
        <div className="space-y-4">
          {myClaims.length > 0 ? (
            <div className="divide-y divide-slate-200 bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 shadow-sm">
              {myClaims.map(({ item, claim }) => (
                <div key={claim.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/item/${item.id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 text-base"
                      >
                        {item.title}
                      </Link>
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

                    <p className="text-xs text-slate-500">
                      Found at: <strong>{item.location}</strong> &bull; Held at:{" "}
                      <strong>{item.custodyLocation || "Security Desk"}</strong>
                    </p>

                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1 mt-2">
                      <span className="font-semibold text-slate-800">Your Verification Statement:</span>
                      <p className="italic">"{claim.proofDetails}"</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-2 text-right">
                    <span className="text-[11px] text-slate-400">
                      Submitted on: {new Date(claim.submittedAt).toLocaleDateString()}
                    </span>
                    <Link href={`/item/${item.id}`}>
                      <Button variant="outline" size="sm">
                        View Item Listing
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No claims submitted"
              description="When you spot an item in the directory that belongs to you, submit a claim to track it here."
              actionLabel="Browse Directory"
              onAction={() => (window.location.href = "/dashboard")}
            />
          )}
        </div>
      )}

      <ClaimModal
        item={selectedClaimItem}
        isOpen={!!selectedClaimItem}
        onClose={() => setSelectedClaimItem(null)}
      />
    </div>
  );
}
