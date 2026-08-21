import React from "react";
import Link from "next/link";
import { Truck, ChevronRight } from "lucide-react";

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Shipping Policy</span>
      </nav>

      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <div className="flex items-center space-x-2 text-[#B89768] text-xs font-semibold">
          <Truck className="w-4 h-4 text-[#C5A880]" />
          <span>Delivery Information</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Shipping & Delivery Policy</h1>
      </div>

      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-gray-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">1. Express Local & Regional Delivery</h2>
          <p>
            We offer express shipping across Naigaon, Nanded district, and all cities in Maharashtra. Standard delivery timeframe is 2-4 business days. Local Naigaon Bazaar store pickup is also available.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">2. Shipping Charges</h2>
          <p>
            Free shipping is offered on all prepaid watch orders above ₹1,000 across Maharashtra. Standard nominal shipping fees apply for lower order values or cash-on-delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
