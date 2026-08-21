import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Privacy Policy</span>
      </nav>

      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <div className="flex items-center space-x-2 text-[#B89768] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Customer Data Protection</span>
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#121212]">Privacy Policy</h1>
        <p className="text-xs text-gray-500">Last updated: August 2026</p>
      </div>

      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-10 space-y-6 text-xs text-gray-700 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">1. Information We Collect</h2>
          <p>
            Govindraj Watch & Accessories collects personal information necessary to fulfill your watch orders, process repair requests, and provide customer support. This includes your name, phone number, shipping address, email, and order details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">2. How We Use Your Information</h2>
          <p>
            We use your contact and delivery details strictly for processing e-commerce orders, dispatching shipments via courier partners, providing Repair ID status updates, and communicating order details via SMS or WhatsApp.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">3. Data Security & Storage</h2>
          <p>
            Your account credentials are encrypted using industry-standard password hashing. Payment transactions processed online are managed securely by Razorpay integration without exposing card credentials to our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-base font-bold text-[#121212]">4. Contact Us</h2>
          <p>
            For privacy inquiries, please contact us at contact@govindrajwatch.shop or visit our store at Medewar Complex, Main Road, Naigaon Bazar, Nanded, Maharashtra.
          </p>
        </section>
      </div>
    </div>
  );
}
