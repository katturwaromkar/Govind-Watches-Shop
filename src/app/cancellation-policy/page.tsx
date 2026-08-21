import React from "react";
import Link from "next/link";
import { XCircle, ChevronRight } from "lucide-react";

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Cancellation Policy</span>
      </nav>

      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <div className="flex items-center space-x-2 text-[#B89768] text-xs font-semibold">
          <XCircle className="w-4 h-4 text-[#C5A880]" />
          <span>Order Cancellations</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Cancellation Policy</h1>
      </div>

      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-gray-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">1. Order Cancellation</h2>
          <p>
            You may cancel your order at any time before it has been dispatched from our Naigaon store. Once dispatched, cancellation will follow our standard return procedure.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">2. Refund Process</h2>
          <p>
            For cancelled prepaid orders, full refunds are credited back to your original payment account within 3-5 business days.
          </p>
        </section>
      </div>
    </div>
  );
}
