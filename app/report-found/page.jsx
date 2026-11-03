"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShieldCheck, MapPin, Building2 } from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import { CAMPUS_LOCATIONS, CATEGORIES } from "@/context/dummyData";
import { FormField, Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";

const PRESET_FOUND_IMAGES = [
  { label: "AirPods / Earphones", url: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80" },
  { label: "Laptop Charger / Adapter", url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80" },
  { label: "Water Bottle", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" },
  { label: "Notebook / Papers", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
  { label: "Keys", url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80" },
  { label: "College ID Card", url: "https://images.unsplash.com/photo-1578836537282-3171d77f8632?auto=format&fit=crop&w=600&q=80" }
];

export default function ReportFoundPage() {
  const router = useRouter();
  const { addItem } = useItems();
  const { currentUser, isAdmin } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [location, setLocation] = useState("Campus Cafeteria");
  const [specificSpot, setSpecificSpot] = useState("");
  const [custodyLocation, setCustodyLocation] = useState("Main Security Desk (Gate 1)");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("01:15 PM");
  const [description, setDescription] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState(PRESET_FOUND_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [reporterName, setReporterName] = useState(currentUser?.name || "");
  const [reporterRoll, setReporterRoll] = useState(currentUser?.rollNo || "");
  const [contactEmail, setContactEmail] = useState(currentUser?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalImage = customImageUrl.trim() ? customImageUrl : imageUrl;

    addItem({
      type: "FOUND",
      title,
      category,
      location,
      specificSpot,
      custodyLocation: custodyLocation || "Main Security Desk (Gate 1)",
      date,
      time,
      description,
      securityQuestion: securityQuestion || "Describe distinguishing details or stickers.",
      imageUrl: finalImage,
      reporterName,
      reporterRoll,
      contactEmail
    });

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </Link>

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-emerald-950">Report a Found Item</h1>
          <p className="text-xs text-emerald-800 mt-0.5">
            Thank you for being a responsible campus citizen! Log where you found the item and where
            you handed it over for safekeeping so the owner can claim it.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Found Item Information
          </h2>

          <FormField label="Item Name / Title" required helperText="e.g. Apple AirPods Pro case, Dell USB-C Charger">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What item was found?"
              required
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Category" required>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={CATEGORIES.filter((c) => c !== "All Categories")}
              />
            </FormField>

            <FormField label="Campus Zone Where Found" required>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={CAMPUS_LOCATIONS.filter((l) => l !== "All Campus Locations")}
              />
            </FormField>
          </div>

          <FormField label="Exact Spot Found" helperText="e.g. Cafeteria corner table, Library reading desk #12">
            <Input
              value={specificSpot}
              onChange={(e) => setSpecificSpot(e.target.value)}
              placeholder="Where specifically was it discovered?"
            />
          </FormField>

          <FormField
            label="Current Custody / Safe Handover Location"
            required
            helperText="Where can the rightful owner physically collect this item after verification?"
          >
            <Input
              value={custodyLocation}
              onChange={(e) => setCustodyLocation(e.target.value)}
              placeholder="e.g. Main Security Desk Gate 1, Central Library Desk, or With Me"
              required
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Date Found" required>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Time Found" required>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 01:15 PM"
                required
              />
            </FormField>
          </div>

          <FormField
            label="Item Description (Keep distinguishing secrets private!)"
            required
            helperText="Provide enough details for the owner to recognize it, but withhold secret scratches/names for verification."
          >
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what the item looks like..."
              required
            />
          </FormField>
        </div>

        {/* Verification Challenge */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>2. Owner Verification Challenge</span>
          </h2>
          <p className="text-xs text-slate-500">
            Specify a question claimants must answer to prove ownership (e.g. case color, stickers,
            lock screen image, engraved text).
          </p>

          <FormField label="Security Challenge Question for Claimants">
            <Input
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              placeholder="e.g. What color is the silicone sleeve or keychain?"
            />
          </FormField>
        </div>

        {/* Image Attachment */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. Photo / Reference Image
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRESET_FOUND_IMAGES.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  setImageUrl(preset.url);
                  setCustomImageUrl("");
                }}
                className={`relative rounded-xl overflow-hidden border-2 aspect-video text-[10px] flex items-center justify-center font-bold transition ${
                  imageUrl === preset.url && !customImageUrl
                    ? "border-emerald-600 ring-2 ring-emerald-500/20"
                    : "border-slate-200 opacity-70 hover:opacity-100"
                }`}
              >
                <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <FormField label="Or Paste Custom Image URL (Optional)">
            <Input
              value={customImageUrl}
              onChange={(e) => setCustomImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </FormField>
        </div>

        {/* Finder Info */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            4. Finder / Custodian Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Your Name" required>
              <Input
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Roll No / Staff ID" required>
              <Input
                value={reporterRoll}
                onChange={(e) => setReporterRoll(e.target.value)}
                required
              />
            </FormField>
          </div>

          <FormField label="Campus Contact Email" required>
            <Input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </FormField>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link href="/dashboard">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button
            type="submit"
            variant="success"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Log..." : "Log Found Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}
