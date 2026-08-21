"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Phone, MapPin } from "lucide-react";

export default function AnnouncementBar() {
  const [text, setText] = useState(
    "Naigaon Bazaar • Master Watchmaking & Authorized Store"
  );

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings?.announcementText) {
          setText(data.settings.announcementText);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-[#07111F] border-b border-[#D6B36A]/20 text-[#AAB6C4] text-[11px] py-2 px-4 tracking-wider uppercase select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A] animate-pulse inline-block" />
          <span className="text-[#F8FAFC] tracking-wide">{text}</span>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-[#AAB6C4]">
          <span className="flex items-center space-x-1.5 hover:text-[#D6B36A] transition cursor-default">
            <MapPin className="w-3 h-3 text-[#D6B36A]" />
            <span>Naigaon Bazaar • Expert Watch Service</span>
          </span>
          <span className="text-[#D6B36A]/30">•</span>
          <div className="flex items-center space-x-4 text-[#AAB6C4]">
            <a
              href="https://wa.me/918484080732"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D6B36A] transition"
            >
              WhatsApp
            </a>
            <a href="tel:+918484080732" className="hover:text-[#D6B36A] transition">
              Call Store
            </a>
            <a href="/track-order" className="hover:text-[#D6B36A] transition">
              Track Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
