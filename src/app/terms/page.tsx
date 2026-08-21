import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Terms & Conditions</span>
      </nav>

      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Terms & Conditions</h1>
        <p className="text-xs text-gray-500">Terms of service for Govindraj Watch & Accessories</p>
      </div>

      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-gray-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">1. Product Authenticity & Warranty</h2>
          <p>
            All watches sold at Govindraj Watch & Accessories (Titan, Fastrack, Casio, Fossil, Sonata, Seiko) are 100% authentic original products accompanied by official manufacturer warranty cards and authorized dealer stamps.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">2. Store Operations & Orders</h2>
          <p>
            Orders placed online or via WhatsApp inquiry are processed promptly. Prices displayed are inclusive of GST. In the event of stock unavailability, our team will notify you immediately.
          </p>
        </section>
      </div>
    </div>
  );
}
