"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, ShieldCheck, Tag, ArrowRight, User } from "lucide-react";
import Badge from "./Badge";
import Button from "./Button";

export default function ItemCard({ item, onOpenClaim }) {
  const isLost = item.type === "LOST";
  const isReunited = item.status === "REUNITED";

  const getStatusBadge = () => {
    if (isReunited) {
      return <Badge variant="blue">✓ Reunited</Badge>;
    }
    if (isLost) {
      return <Badge variant="red">● Lost</Badge>;
    }
    return <Badge variant="green">● Found</Badge>;
  };

  return (
    <div className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 group">
      {/* Card Header Media */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-400">
            <Tag className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {getStatusBadge()}
          <Badge variant="slate">{item.category}</Badge>
        </div>

        {item.claims && item.claims.length > 0 && !isReunited && (
          <div className="absolute top-3 right-3">
            <Badge variant="amber">
              <ShieldCheck className="w-3 h-3" />
              {item.claims.length} {item.claims.length === 1 ? "Claim" : "Claims"}
            </Badge>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="font-semibold text-slate-700 truncate">{item.location}</span>
            {item.specificSpot && (
              <span className="truncate text-slate-400">({item.specificSpot})</span>
            )}
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-2">
            <Link href={`/item/${item.id}`}>{item.title}</Link>
          </h3>

          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {item.description}
          </p>
        </div>

        {/* Footer Meta & Actions */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" />
              <span>Roll: {item.reporterRoll || "Campus Member"}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Link href={`/item/${item.id}`} className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Details
              </Button>
            </Link>

            {!isReunited && !isLost && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => onOpenClaim && onOpenClaim(item)}
                className="flex-1"
              >
                Claim Item
              </Button>
            )}

            {!isReunited && isLost && (
              <Link href={`/item/${item.id}`} className="flex-1">
                <Button variant="danger" size="sm" className="w-full">
                  I Found This!
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
