"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle, Upload, Shield } from "lucide-react";
import { useItems } from "@/context/ItemContext";
import { useAuth } from "@/context/AuthContext";
import { CAMPUS_LOCATIONS, CATEGORIES } from "@/context/dummyData";
import { FormField, Input, Textarea, Select } from "@/components/Input";
import Button from "@/components/Button";

const PRESET_LOST_IMAGES = [
  { label: "Calculator / Tech", url: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80" },
  { label: "College ID / Cards", url: "https://images.unsplash.com/photo-1578836537282-3171d77f8632?auto=format&fit=crop&w=600&q=80" },
  { label: "Hostel Keys", url: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80" },
  { label: "Sunglasses / Glasses", url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80" },
  { label: "Notebook / Books", url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80" },
  { label: "Water Bottle", url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80" }
];

export default function ReportLostPage() {
  const router = useRouter();
  const { addItem } = useItems();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [location, setLocation] = useState("Academic Block B");
  const [specificSpot, setSpecificSpot] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState("11:30 AM");
  const [description, setDescription] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [imageUrl, setImageUrl] = useState(PRESET_LOST_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [reporterName, setReporterName] = useState(currentUser?.name || "");
  const [reporterRoll, setReporterRoll] = useState(currentUser?.rollNo || "");
  const [contactEmail, setContactEmail] = useState(currentUser?.email || "");
  const [contactPhone, setContactPhone] = useState("+91 98765 43210");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const finalImage = customImageUrl.trim() ? customImageUrl : imageUrl;

    addItem({
      type: "LOST",
      title,
      category,
      location,
      specificSpot,
      date,
      time,
      description,
      securityQuestion: securityQuestion || "Describe any internal markings or unique scratches.",
      imageUrl: finalImage,
      reporterName,
      reporterRoll,
      contactEmail,
      contactPhone
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

      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
        <div className="p-2 bg-red-100 text-red-600 rounded-xl">
          <AlertCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-red-950">Report a Lost Item</h1>
          <p className="text-xs text-red-800 mt-0.5">
            Submit details regarding your misplaced belonging. We'll broadcast it across the college
            portal and notify campus security.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6"
      >
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            1. Item Details
          </h2>

          <FormField label="Item Name / Title" required helperText="e.g. Casio fx-991EX Calculator, Navy Blue Backpack">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What did you lose?"
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

            <FormField label="Campus Building / Area" required>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                options={CAMPUS_LOCATIONS.filter((l) => l !== "All Campus Locations")}
              />
            </FormField>
          </div>

          <FormField label="Specific Classroom / Room / Spot" helperText="e.g. Room 302, 2nd row window desk, or Library Reading Hall">
            <Input
              value={specificSpot}
              onChange={(e) => setSpecificSpot(e.target.value)}
              placeholder="Where was it last seen?"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Date Lost" required>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Approximate Time" required>
              <Input
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:30 AM"
                required
              />
            </FormField>
          </div>

          <FormField
            label="Detailed Description"
            required
            helperText="Include color, model, brand, stickers, scratches, or accessories."
          >
            <Textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide identifiable details..."
              required
            />
          </FormField>
        </div>

        {/* Security Challenge Section */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>2. Ownership Verification Challenge</span>
          </h2>
          <p className="text-xs text-slate-500">
            A secret question only the rightful owner can answer. Anyone who finds your item will be
            prompted with this question before returning it.
          </p>

          <FormField
            label="Secret Verification Question"
            helperText="e.g. What is written on the back? What color is the keychain?"
          >
            <Input
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
              placeholder="e.g., What sticker is on the inside case?"
            />
          </FormField>
        </div>

        {/* Image Attachment */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            3. Photo / Reference Image
          </h2>
          <p className="text-xs text-slate-500">
            Select a representative sample photo or paste an image URL.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRESET_LOST_IMAGES.map((preset) => (
              <button
                key={preset.url}
                type="button"
                onClick={() => {
                  setImageUrl(preset.url);
                  setCustomImageUrl("");
                }}
                className={`relative rounded-xl overflow-hidden border-2 aspect-video text-[10px] flex items-center justify-center font-bold transition ${
                  imageUrl === preset.url && !customImageUrl
                    ? "border-blue-600 ring-2 ring-blue-500/20"
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

        {/* Reporter Info */}
        <div className="space-y-4 pt-2">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
            4. Your Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Your Full Name" required>
              <Input
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Student Roll Number / Staff ID" required>
              <Input
                value={reporterRoll}
                onChange={(e) => setReporterRoll(e.target.value)}
                required
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="College Email" required>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </FormField>

            <FormField label="Phone Number (Optional)">
              <Input
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </FormField>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Link href="/dashboard">
            <Button variant="ghost">Cancel</Button>
          </Link>
          <Button
            type="submit"
            variant="danger"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing Alert..." : "Publish Lost Item Notice"}
          </Button>
        </div>
      </form>
    </div>
  );
}
