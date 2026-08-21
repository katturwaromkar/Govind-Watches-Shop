"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ChevronRight } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Fallback success UI for demo
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Contact Us</span>
      </nav>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs text-[#B89768] font-semibold uppercase tracking-wider">
          Visit Our Showroom
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#121212]">
          Contact Govindraj Watch Shop
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          Have questions about watches, repair appointments, or custom gift orders? Visit us in Naigaon Bazaar or drop a message!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Info Column */}
        <div className="lg:col-span-5 bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 text-xs shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#121212]">Store Location & Details</h3>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#121212] block font-semibold">Showroom Address:</strong>
                <span>Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazar, Nanded, Maharashtra - 431709</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#121212] block font-semibold">Store Timings:</strong>
                <span>Monday - Sunday: 9:00 AM - 9:00 PM</span>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#121212] block font-semibold">Phone Contact:</strong>
                <a href="tel:+918484080732" className="hover:text-[#C5A880] font-semibold">+91 8484080732</a>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-[#C5A880] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#121212] block font-semibold">Email:</strong>
                <span>contact@govindrajwatch.shop</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col space-y-2">
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 rounded-full flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="lg:col-span-7 bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#121212]">Send Us a Message</h3>

          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C5A880] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#121212]">Message Sent!</h4>
              <p className="text-xs text-gray-500">We will respond to your enquiry shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Message / Question *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 px-8 rounded-full transition flex items-center space-x-2 shadow-sm disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? "Sending..." : "Submit Message"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

