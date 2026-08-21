import React from "react";
import Link from "next/link";
import { RotateCcw, ChevronRight } from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Return Policy</span>
      </nav>

      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <div className="flex items-center space-x-2 text-[#B89768] text-xs font-semibold">
          <RotateCcw className="w-4 h-4 text-[#C5A880]" />
          <span>7-Day Return Guarantee</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Return & Replacement Policy</h1>
      </div>

      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-gray-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">1. 7-Day Easy Replacement</h2>
          <p>
            If you receive a defective, damaged, or incorrect product, you may request an easy replacement within 7 days of delivery by contacting our WhatsApp support at +91 8484080732 or visiting our store in Naigaon Bazaar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">2. Conditions for Return</h2>
          <p>
            Products must be unused, in original condition with all tags, box, warranty card, and receipt intact.
          </p>
        </section>
      </div>
    </div>
  );
}
