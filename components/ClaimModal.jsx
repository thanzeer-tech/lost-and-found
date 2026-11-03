"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";
import { FormField, Input, Textarea } from "./Input";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ClaimModal({ item, isOpen, onClose }) {
  const { submitClaim } = useItems();
  const { currentUser } = useAuth();

  const [claimantName, setClaimantName] = useState(currentUser?.name || "");
  const [claimantRoll, setClaimantRoll] = useState(currentUser?.rollNo || "");
  const [claimantEmail, setClaimantEmail] = useState(currentUser?.email || "");
  const [proofDetails, setProofDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proofDetails.trim()) {
      setError("Please provide verification proof or describe specific markings.");
      return;
    }

    submitClaim(item.id, {
      claimantName,
      claimantRoll,
      claimantEmail,
      proofDetails
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setProofDetails("");
      onClose();
    }, 2000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Claim Ownership: ${item.title}`}
      description="Submit your ownership proof. The custodian or campus security will verify your claim before handing over the item."
    >
      {isSuccess ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-bold text-slate-800">Claim Submitted Successfully!</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Your verification proof has been logged with Campus Security. You can present your Student ID Card at{" "}
            <strong>{item.custodyLocation || "Campus Security Desk"}</strong> to collect your item.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Current Custody Location:</span>
            </div>
            <p className="text-blue-800">
              {item.custodyLocation || "Reported with finder (contact below after verification)"}
            </p>
          </div>

          {item.securityQuestion && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
              <span className="font-bold text-amber-900">Security Verification Challenge:</span>
              <p className="text-amber-800 italic">"{item.securityQuestion}"</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField label="Your Full Name" required>
              <Input
                value={claimantName}
                onChange={(e) => setClaimantName(e.target.value)}
                required
              />
            </FormField>
            <FormField label="Student Roll Number" required>
              <Input
                value={claimantRoll}
                onChange={(e) => setClaimantRoll(e.target.value)}
                placeholder="e.g., 24CS109"
                required
              />
            </FormField>
          </div>

          <FormField label="College Email" required>
            <Input
              type="email"
              value={claimantEmail}
              onChange={(e) => setClaimantEmail(e.target.value)}
              placeholder="roll@college.edu"
              required
            />
          </FormField>

          <FormField
            label="Verification Proof & Identifying Details"
            required
            helperText="Describe unique marks, wallpapers, stickers, scratches, or contents inside that only the real owner would know."
            error={error}
          >
            <Textarea
              rows={3}
              value={proofDetails}
              onChange={(e) => {
                setProofDetails(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Has a small blue ink mark on the top right corner; serial number starts with XYZ..."
              required
            />
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Ownership Claim
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
