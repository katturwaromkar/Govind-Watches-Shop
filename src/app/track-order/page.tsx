"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Radar, Search, CheckCircle2, Truck, Package, MessageSquare, ChevronRight } from "lucide-react";
import { getOrderWhatsAppUrl } from "@/lib/whatsapp";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState(searchParams.get("orderId") || "");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const q = searchParams.get("orderId");
    if (q) {
      handleTrackOrder(q);
    }
  }, [searchParams]);

  const handleTrackOrder = async (id: string) => {
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const res = await fetch(`/api/orders?orderId=${encodeURIComponent(id)}`);
      const data = await res.json();
      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setError("No order found with ID: " + id);
      }
    } catch (e) {
      setError("Failed to fetch order status");
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepName: string) => {
    const statuses = ["PROCESSING", "SHIPPED", "DELIVERED"];
    if (!order) return false;
    const currentIndex = statuses.indexOf(order.orderStatus);
    const stepIndex = statuses.indexOf(stepName);
    return currentIndex >= stepIndex;
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Track Order</span>
      </nav>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white border border-[#E5E2DC] px-4 py-1.5 rounded-full text-[#B89768] text-xs font-semibold shadow-sm">
          <Radar className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Live Order Tracking</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Track Your Order</h1>
        <p className="text-xs text-gray-600">
          Enter your Order ID (e.g. GOV-2026-9921) to check live dispatch and delivery status.
        </p>
      </div>

      {/* Search Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (orderIdInput.trim()) handleTrackOrder(orderIdInput.trim());
        }}
        className="flex gap-2 max-w-md mx-auto"
      >
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="e.g. GOV-2026-9921"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="w-full bg-white border border-[#E5E2DC] text-[#121212] font-mono text-xs rounded-full py-3 pl-10 pr-4 focus:border-[#C5A880] focus:outline-none shadow-sm"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs px-6 py-3 rounded-full transition shadow-sm"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {error && (
        <div className="text-center p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Order Status Display Card */}
      {order && (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E5E2DC] pb-4 gap-2">
            <div>
              <span className="text-[11px] text-gray-400 font-mono">Order Reference</span>
              <h3 className="font-mono text-xl font-bold text-[#121212]">{order.orderId}</h3>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-400">Total Amount</span>
              <p className="font-serif text-lg font-bold text-[#C5A880]">₹{order.totalAmount.toLocaleString("en-IN")}</p>
            </div>
          </div>

          {/* Timeline Visual */}
          <div className="grid grid-cols-3 gap-2 relative">
            <div className="text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border ${
                  getStepStatus("PROCESSING")
                    ? "bg-[#121212] border-[#121212] text-white"
                    : "bg-[#FAF9F6] border-gray-300 text-gray-400"
                }`}
              >
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#121212] block">Processing</span>
              <span className="text-[10px] text-gray-500">Order Confirmed</span>
            </div>

            <div className="text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border ${
                  getStepStatus("SHIPPED")
                    ? "bg-[#C5A880] border-[#C5A880] text-white"
                    : "bg-[#FAF9F6] border-gray-300 text-gray-400"
                }`}
              >
                <Truck className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#121212] block">Shipped</span>
              <span className="text-[10px] text-gray-500">In Transit</span>
            </div>

            <div className="text-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border ${
                  getStepStatus("DELIVERED")
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-[#FAF9F6] border-gray-300 text-gray-400"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#121212] block">Delivered</span>
              <span className="text-[10px] text-gray-500">Fulfilled</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <a
              href={getOrderWhatsAppUrl(order.orderId, order.totalAmount)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold text-xs py-2.5 px-6 rounded-full flex items-center space-x-2 hover:bg-emerald-100 transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ask Customer Support on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto px-4 py-16 text-center text-xs text-gray-500">Loading Track Order...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
