"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, CheckCircle2, ChevronRight, MessageSquare, Upload } from "lucide-react";
import { getRepairWhatsAppUrl } from "@/lib/whatsapp";

export default function BookRepairPage() {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    email: "",
    productType: "Watch",
    brand: "",
    serviceType: "Battery Change",
    problemDescription: "",
    preferredDate: "",
    preferredTime: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [repairId, setRepairId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.repair) {
        setRepairId(data.repair.repairId);
        setSubmitted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/repair" className="hover:text-[#C5A880]">Watch Repair</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Book Repair Slot</span>
      </nav>

      <div className="space-y-2 border-b border-[#E5E2DC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#121212]">
          Book Repair Slot Online
        </h1>
        <p className="text-xs text-gray-600">
          Schedule a priority inspection slot with Govindraj Master Watchmaker in Naigaon Bazaar. Receive instant Repair ID tracking.
        </p>
      </div>

      {submitted ? (
        <div className="bg-white border border-emerald-200 rounded-3xl p-8 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center m-auto text-emerald-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#121212]">
              Repair Booking Confirmed!
            </h2>
            <p className="text-xs text-gray-600">
              Your repair request has been registered in our workshop database.
            </p>
            <div className="inline-block bg-[#FAF9F6] border border-[#E5E2DC] px-5 py-2.5 rounded-2xl font-mono text-sm font-bold text-[#121212]">
              Repair Request ID: {repairId}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={getRepairWhatsAppUrl(repairId, formData.serviceType, formData.brand || "Watch")}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 px-6 rounded-full flex items-center space-x-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Confirm & Send Details via WhatsApp</span>
            </a>

            <Link
              href="/repair/track"
              className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 px-6 rounded-full transition"
            >
              Track Repair Status
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Customer Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Deshmukh"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Mobile Number *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value, whatsapp: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Product Category</label>
              <select
                value={formData.productType}
                onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="Watch">Wristwatch</option>
                <option value="Wall Clock">Wall Clock</option>
                <option value="Leather Belt">Leather Belt / Wallet</option>
                <option value="Bag">School / Travel Bag</option>
                <option value="Eyewear">Sunglasses / Goggles</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Brand Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Titan, Casio, Fastrack"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Service Required *</label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              >
                <option value="Battery Change">Original Battery Change</option>
                <option value="Glass Fitting">Glass Replacement</option>
                <option value="Machine Servicing">Swiss Movement Servicing</option>
                <option value="Strap Fitting">Strap / Chain Replacement</option>
                <option value="Wall Clock Repair">Wall Clock Repair</option>
                <option value="Leather Repair">Leather Belt / Bag Restoration</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-[#121212]">Preferred Visit Date</label>
              <input
                type="date"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-[#121212]">Problem Description / Special Instructions *</label>
            <textarea
              required
              rows={4}
              placeholder="Please describe what issue you are facing with your watch or clock..."
              value={formData.problemDescription}
              onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
              className="w-full bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl p-3 text-[#121212] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3.5 rounded-full transition shadow-md"
          >
            {loading ? "Registering Booking..." : "Submit Repair Booking Request"}
          </button>
        </form>
      )}
    </div>
  );
}
