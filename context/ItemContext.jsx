"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { INITIAL_ITEMS } from "./dummyData";

const ItemContext = createContext();

export function ItemProvider({ children }) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("All Campus Locations");
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL, LOST, FOUND, REUNITED
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("campustrace_items");
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        localStorage.setItem("campustrace_items", JSON.stringify(INITIAL_ITEMS));
      }
    } catch (e) {
      console.error("Failed to load local items:", e);
    }
    setIsInitialized(true);
  }, []);

  // Save to LocalStorage whenever items change
  const saveItems = (newItems) => {
    setItems(newItems);
    try {
      localStorage.setItem("campustrace_items", JSON.stringify(newItems));
    } catch (e) {
      console.error("Failed to save items to storage", e);
    }
  };

  // Add new item (Lost or Found)
  const addItem = (itemData) => {
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      status: "OPEN",
      claims: [],
      createdAt: new Date().toISOString()
    };
    const updated = [newItem, ...items];
    saveItems(updated);
    return newItem;
  };

  // Submit an ownership claim for a found item
  const submitClaim = (itemId, claimData) => {
    const newClaim = {
      id: `claim-${Date.now()}`,
      ...claimData,
      status: "PENDING",
      submittedAt: new Date().toISOString()
    };

    const updated = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          claims: [...(item.claims || []), newClaim]
        };
      }
      return item;
    });

    saveItems(updated);
    return newClaim;
  };

  // Review a claim (approve or reject)
  const updateClaimStatus = (itemId, claimId, newStatus) => {
    const updated = items.map((item) => {
      if (item.id === itemId) {
        const updatedClaims = (item.claims || []).map((claim) => {
          if (claim.id === claimId) {
            return { ...claim, status: newStatus };
          }
          return claim;
        });

        // If approved, automatically update item status to REUNITED
        return {
          ...item,
          status: newStatus === "APPROVED" ? "REUNITED" : item.status,
          claims: updatedClaims
        };
      }
      return item;
    });

    saveItems(updated);
  };

  // Mark an item as reunited / closed
  const markAsReunited = (itemId) => {
    const updated = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          status: "REUNITED"
        };
      }
      return item;
    });
    saveItems(updated);
  };

  // Delete an item
  const deleteItem = (itemId) => {
    const updated = items.filter((item) => item.id !== itemId);
    saveItems(updated);
  };

  // Reset to original dummy data
  const resetToSampleData = () => {
    saveItems(INITIAL_ITEMS);
  };

  // Helper lookup
  const getItemById = (id) => items.find((i) => i.id === id);

  // Filtered Items computation
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // 1. Status Filter
      if (statusFilter === "LOST" && item.type !== "LOST") return false;
      if (statusFilter === "FOUND" && item.type !== "FOUND") return false;
      if (statusFilter === "REUNITED" && item.status !== "REUNITED") return false;
      if (statusFilter === "OPEN" && item.status !== "OPEN") return false;

      // 2. Category Filter
      if (categoryFilter !== "All Categories" && item.category !== categoryFilter) {
        return false;
      }

      // 3. Location Filter
      if (locationFilter !== "All Campus Locations" && item.location !== locationFilter) {
        return false;
      }

      // 4. Search Query Match
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        const matchesLoc = item.location?.toLowerCase().includes(query);
        const matchesSpot = item.specificSpot?.toLowerCase().includes(query);
        const matchesRoll = item.reporterRoll?.toLowerCase().includes(query);
        const matchesCategory = item.category?.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesLoc && !matchesSpot && !matchesRoll && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [items, searchTerm, categoryFilter, locationFilter, statusFilter]);

  // Aggregate stats
  const stats = useMemo(() => {
    const total = items.length;
    const lostCount = items.filter((i) => i.type === "LOST" && i.status !== "REUNITED").length;
    const foundCount = items.filter((i) => i.type === "FOUND" && i.status !== "REUNITED").length;
    const reunitedCount = items.filter((i) => i.status === "REUNITED").length;
    const recoveryRate = total > 0 ? Math.round((reunitedCount / total) * 100) : 0;

    return {
      total,
      lostCount,
      foundCount,
      reunitedCount,
      recoveryRate
    };
  }, [items]);

  return (
    <ItemContext.Provider
      value={{
        items,
        filteredItems,
        stats,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        locationFilter,
        setLocationFilter,
        statusFilter,
        setStatusFilter,
        addItem,
        submitClaim,
        updateClaimStatus,
        markAsReunited,
        deleteItem,
        resetToSampleData,
        getItemById,
        isInitialized
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemProvider");
  }
  return context;
}
