"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  User,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Building2,
  Trash2,
  Check
} from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import ClaimModal from "@/components/ClaimModal";

export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getItemById, markAsReunited, deleteItem, updateClaimStatus } = useItems();
  const { currentUser, isAdmin } = useAuth();
  const [claimModalOpen, setClaimModalOpen] = useState(false);

  const item = getItemById(id);

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Item Not Found</h2>
        <p className="text-sm text-slate-500">
          The listing you are looking for may have been removed or marked closed.
        </p>
        <Link href="/dashboard">
          <Button variant="primary">Return to Directory</Button>
        </Link>
      </div>
    );
  }

  const isLost = item.type === "LOST";
  const isReunited = item.status === "REUNITED";
  const isReporter = currentUser?.rollNo === item.reporterRoll;
  const canManage = isReporter || isAdmin;

  const handleMarkReunited = () => {
    markAsReunited(item.id);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to remove this listing?")) {
      deleteItem(item.id);
      router.push("/dashboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </Link>

      {/* Main Item Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Media Header */}
          <div className="relative h-64 md:h-full min-h-[280px] bg-slate-100">
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                <MapPin className="w-16 h-16" />
              </div>
            )}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {isReunited ? (
                <Badge variant="blue" size="md">✓ Reunited With Owner</Badge>
              ) : isLost ? (
                <Badge variant="red" size="md">● Lost Report</Badge>
              ) : (
                <Badge variant="green" size="md">● Found &amp; Cataloged</Badge>
              )}
              <Badge variant="slate" size="md">{item.category}</Badge>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 mb-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{item.location}</span>
                {item.specificSpot && (
                  <span className="text-slate-400 font-normal">({item.specificSpot})</span>
                )}
              </div>

              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                {item.title}
              </h1>

              <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                {item.description}
              </p>

              {/* Custody Information */}
              {item.custodyLocation && (
                <div className="mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>Safe Custody Handover Desk:</span>
                  </div>
                  <p className="text-xs text-blue-800 font-medium pl-6">
                    {item.custodyLocation}
                  </p>
                </div>
              )}

              {/* Meta information */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Reported: {item.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Time: {item.time || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>By: {item.reporterRoll || "Student"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{item.contactEmail}</span>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
              {!isReunited && !isLost && (
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => setClaimModalOpen(true)}
                >
                  Claim This Item
                </Button>
              )}

              {canManage && !isReunited && (
                <Button
                  variant="success"
                  size="sm"
                  icon={CheckCircle2}
                  onClick={handleMarkReunited}
                >
                  Mark Reunited
                </Button>
              )}

              {canManage && (
                <Button
                  variant="outline"
                  size="sm"
                  icon={Trash2}
                  onClick={handleDelete}
                  className="text-red-600 hover:bg-red-50 hover:border-red-200"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Challenge Section */}
      {item.securityQuestion && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Ownership Verification Challenge</span>
          </div>
          <p className="text-sm text-amber-900 font-medium">
            "{item.securityQuestion}"
          </p>
          <p className="text-xs text-amber-700">
            Claimants are required to provide this verification proof before collection.
          </p>
        </div>
      )}

      {/* Submitted Claims Section (Reviewable by Reporter & Campus Security Admin) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Submitted Claims ({item.claims?.length || 0})
            </h2>
            <p className="text-xs text-slate-500">
              Students who submitted proof of ownership for this item.
            </p>
          </div>
        </div>

        {item.claims && item.claims.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {item.claims.map((claim) => (
              <div key={claim.id} className="py-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-bold text-slate-800">
                    <User className="w-3.5 h-3.5 text-blue-600" />
                    <span>{claim.claimantName}</span>
                    <span className="text-slate-400 font-normal">({claim.claimantRoll})</span>
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

                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 space-y-1">
                  <span className="font-semibold text-slate-900">Claimant's Proof Details:</span>
                  <p className="italic">"{claim.proofDetails}"</p>
                  <p className="text-[11px] text-slate-400 pt-1">
                    Contact: {claim.claimantEmail} &bull; Submitted:{" "}
                    {new Date(claim.submittedAt).toLocaleString()}
                  </p>
                </div>

                {canManage && claim.status === "PENDING" && (
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="success"
                      size="sm"
                      icon={Check}
                      onClick={() => updateClaimStatus(item.id, claim.id, "APPROVED")}
                    >
                      Approve &amp; Mark Reunited
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateClaimStatus(item.id, claim.id, "REJECTED")}
                    >
                      Reject Claim
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs italic">
            No claims have been submitted for this item yet.
          </div>
        )}
      </div>

      <ClaimModal
        item={item}
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
      />
    </div>
  );
}
