"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  return (
    <a
      href={getGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 transition transform flex items-center justify-center space-x-2 group border-2 border-white/20"
      title="Chat with Govindraj Watch Shop on WhatsApp"
    >
      <MessageSquare className="w-6 h-6 animate-pulse" />
      <span className="hidden md:inline font-bold text-xs pr-1">
        WhatsApp Enquiry
      </span>
    </a>
  );
}
