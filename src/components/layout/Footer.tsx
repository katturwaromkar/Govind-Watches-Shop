"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Wrench, ShieldCheck, Clock, MessageSquare, Instagram, Facebook } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-[#07111F] border-t border-[#D6B36A]/20 text-[#AAB6C4] pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Statement Banner */}
        <div className="border-b border-[#D6B36A]/20 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8FAFC] tracking-wide uppercase">
              YOUR TIME. YOUR STYLE.
            </h2>
            <p className="text-xs text-[#AAB6C4] max-w-lg">
              Naigaon's premier luxury horology destination for 100% authentic watches, fine leather goods & master repair care.
            </p>
          </div>
          <a
            href="https://wa.me/918484080732"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#D6B36A] hover:bg-[#B8964E] text-[#07111F] font-bold text-xs py-3 px-6 rounded-[4px] uppercase tracking-wider transition shadow-sm w-fit"
          >
            CONNECT ON WHATSAPP →
          </a>
        </div>

        {/* 4 Column Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#D6B36A]/10">
          {/* Column 1: SHOP */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#D6B36A] uppercase tracking-widest">
              SHOP
            </h4>
            <ul className="space-y-2 text-[#AAB6C4]">
              <li><Link href="/shop/men" className="hover:text-[#F8FAFC] transition">Men's Timepieces</Link></li>
              <li><Link href="/shop/women" className="hover:text-[#F8FAFC] transition">Women's Timepieces</Link></li>
              <li><Link href="/shop/kids" className="hover:text-[#F8FAFC] transition">Kids Collection</Link></li>
              <li><Link href="/shop/smart-watches" className="hover:text-[#F8FAFC] transition">Smart Timepieces</Link></li>
              <li><Link href="/shop/clocks" className="hover:text-[#F8FAFC] transition">Designer Wall Clocks</Link></li>
              <li><Link href="/shop/belts" className="hover:text-[#F8FAFC] transition">Leather Accessories</Link></li>
            </ul>
          </div>

          {/* Column 2: SERVICES */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#D6B36A] uppercase tracking-widest">
              SERVICES
            </h4>
            <ul className="space-y-2 text-[#AAB6C4]">
              <li><Link href="/repair" className="hover:text-[#F8FAFC] text-[#D6B36A] font-semibold transition">Watch Repair Workshop</Link></li>
              <li><Link href="/repair" className="hover:text-[#F8FAFC] transition">Battery & Cell Service</Link></li>
              <li><Link href="/repair" className="hover:text-[#F8FAFC] transition">Scratchproof Glass Change</Link></li>
              <li><Link href="/repair" className="hover:text-[#F8FAFC] transition">Swiss Machine Servicing</Link></li>
              <li><Link href="/repair" className="hover:text-[#F8FAFC] transition">Leather Strap & Link Sizing</Link></li>
              <li><Link href="/repair" className="hover:text-[#F8FAFC] transition">Ajanta Clock Overhaul</Link></li>
            </ul>
          </div>

          {/* Column 3: HELP */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#D6B36A] uppercase tracking-widest">
              HELP & SUPPORT
            </h4>
            <ul className="space-y-2 text-[#AAB6C4]">
              <li><Link href="/contact" className="hover:text-[#F8FAFC] transition">Contact Store</Link></li>
              <li><Link href="/track-order" className="hover:text-[#F8FAFC] transition">Track Order Status</Link></li>
              <li><Link href="/gift-finder" className="hover:text-[#F8FAFC] transition">3-Step Watch Finder</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-[#F8FAFC] transition">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-[#F8FAFC] transition">Returns & Replacements</Link></li>
              <li><Link href="/cancellation-policy" className="hover:text-[#F8FAFC] transition">Cancellation Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold text-[#D6B36A] uppercase tracking-widest">
              COMPANY
            </h4>
            <ul className="space-y-2 text-[#AAB6C4]">
              <li><Link href="/about" className="hover:text-[#F8FAFC] transition">About Govindraj Showroom</Link></li>
              <li><Link href="/blog" className="hover:text-[#F8FAFC] transition">The Watch Journal</Link></li>
              <li><Link href="/brands" className="hover:text-[#F8FAFC] transition">Authorized Brands</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F8FAFC] transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#F8FAFC] transition">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata & Guarantee */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#AAB6C4] text-[11px] pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-[#D6B36A] to-[#997736] flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="Govindraj Watch & Gifts Logo"
                className="w-full h-full rounded-full object-cover bg-[#0D1B2A]"
              />
            </div>
            <p>© 2026 Govindraj Watch & Gifts. Naigaon Bazaar, Nanded, Maharashtra.</p>
          </div>

          <div className="flex items-center space-x-2 text-[#D6B36A] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#D6B36A]" />
            <span>100% Authorized Brand Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
