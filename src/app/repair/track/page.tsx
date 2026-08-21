"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, Clock, CheckCircle2, AlertCircle, Wrench, ShieldCheck } from "lucide-react";

export default function RepairTrackerPage() {
  const [repairId, setRepairId] = useState("");
  const [phone, setPhone] = useState("");
  const [repair, setRepair] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repairId.trim()) return;
    setLoading(true);
    setError("");
    setRepair(null);

    try {
      const res = await fetch(`/api/repairs?repairId=${encodeURIComponent(repairId)}`);
      const data = await res.json();
      if (res.ok && data.repair) {
        setRepair(data.repair);
      } else {
        setError(data.error || "No repair record found matching this ID.");
      }
    } catch (e) {
      setError("Failed to fetch repair status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { key: "PENDING", label: "Request Received" },
    { key: "CONFIRMED", label: "Inspection & Estimate" },
    { key: "IN_PROGRESS", label: "Master Repairing" },
    { key: "READY", label: "Quality Check & Ready" },
    { key: "COMPLETED", label: "Delivered / Handed Over" },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case "PENDING": return 0;
      case "CONFIRMED": return 1;
      case "IN_PROGRESS": return 2;
      case "READY": return 3;
      case "COMPLETED": return 4;
      default: return 0;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/repair" className="hover:text-[#C5A880]">Repair Hub</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Track Repair Status</span>
      </nav>

      <div className="space-y-2 border-b border-[#E5E2DC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#121212]">
          Track Repair Status
        </h1>
        <p className="text-xs text-gray-600">
          Enter your Repair Request ID (e.g. REP-2026-XXXX) to check current workshop status and estimated cost.
        </p>
      </div>

      <form onSubmit={handleTrack} className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <label className="font-semibold text-[#121212]">Repair Request ID *</label>
            <input
              type="text"
              required
              placeholder="e.g. REP-2026-000123"
              value={repairId}
              onChange={(e) => setRepairId(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] font-mono focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-[#121212]">Registered Phone (Optional)</label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 rounded-full flex items-center justify-center space-x-2 transition"
        >
          <Search className="w-4 h-4" />
          <span>{loading ? "Searching Workshop Log..." : "Search Repair Ticket"}</span>
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {repair && (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-4">
            <div>
              <span className="text-[11px] text-gray-500">Repair Ticket</span>
              <h2 className="font-serif text-xl font-bold text-[#121212] font-mono">
                {repair.repairId}
              </h2>
            </div>
            <div className="bg-[#FAF9F6] border border-[#E5E2DC] px-4 py-2 rounded-xl text-xs">
              <span className="text-gray-500 font-medium">Service: </span>
              <span className="font-bold text-[#121212]">{repair.serviceType}</span>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <p className="text-gray-500">Customer Name</p>
              <p className="font-semibold text-[#121212]">{repair.customerName}</p>
            </div>
            <div>
              <p className="text-gray-500">Brand / Model</p>
              <p className="font-semibold text-[#121212]">{repair.brand || "Standard Watch"}</p>
            </div>
            <div>
              <p className="text-gray-500">Estimated Cost</p>
              <p className="font-bold text-[#C5A880]">
                {repair.estimatedCost ? `₹${repair.estimatedCost}` : "Pending Inspection"}
              </p>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-4 pt-4 border-t border-[#E5E2DC]">
            <h3 className="font-serif text-sm font-bold text-[#121212]">Workshop Progress</h3>
            <div className="relative pl-6 border-l-2 border-[#E5E2DC] space-y-6">
              {steps.map((step, idx) => {
                const currentIdx = getStepIndex(repair.status);
                const isCompleted = idx <= currentIdx;
                return (
                  <div key={step.key} className="relative">
                    <div
                      className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 ${
                        isCompleted
                          ? "bg-[#C5A880] border-[#C5A880]"
                          : "bg-white border-gray-300"
                      }`}
                    />
                    <div>
                      <p className={`text-xs font-semibold ${isCompleted ? "text-[#121212]" : "text-gray-400"}`}>
                        {step.label}
                      </p>
                      {step.key === repair.status && (
                        <p className="text-[11px] text-[#B89768] mt-0.5">Current Active Phase</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
