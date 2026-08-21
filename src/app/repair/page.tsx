"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Wrench, BatteryCharging, Shield, Clock, CheckCircle2, Search, ArrowRight } from "lucide-react";
import QuickRepairModal from "@/components/repair/QuickRepairModal";

export default function RepairPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleOpenBooking = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white border border-[#E5E2DC] px-4 py-1.5 rounded-full text-[#B89768] text-xs font-semibold shadow-sm">
          <Wrench className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Naigaon's Master Watchmaker Workshop</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#121212]">
          Watch & Accessories Repair Services
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          20+ Years of master repair excellence in Naigaon Bazaar. Original battery replacement, Swiss oiling, scratch-proof glass change, metal chain sizing & wall clock overhauls.
        </p>

        <div className="flex items-center justify-center space-x-4 pt-2">
          <Link
            href="/repair/book"
            className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3.5 px-8 rounded-full shadow-md transition"
          >
            Book Repair Online
          </Link>
          <Link
            href="/repair/track"
            className="bg-white hover:bg-[#FAF9F6] text-[#121212] border border-[#E5E2DC] font-medium text-xs py-3.5 px-6 rounded-full shadow-sm flex items-center space-x-1.5 transition"
          >
            <Search className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Track Repair Status</span>
          </Link>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Battery & Cell Change",
            desc: "Original Maxell & Sony silver oxide batteries installed with 1-year battery warranty and leak protection.",
            icon: BatteryCharging,
          },
          {
            title: "Glass Fitting & Replacement",
            desc: "Scratch-resistant mineral crystal glass, sapphire coating, and dome glass customized for any watch model.",
            icon: Shield,
          },
          {
            title: "Swiss Machine Servicing",
            desc: "Complete movement dismantling, ultrasonic component cleaning, Swiss Moebius oiling & timing calibration.",
            icon: Wrench,
          },
          {
            title: "Strap & Chain Fitting",
            desc: "100% genuine top-grain leather straps, stainless steel link sizing, replacement pins, and safety clasps.",
            icon: Clock,
          },
          {
            title: "Wall Clock Machine Repair",
            desc: "Ajanta & Titan wall clock silent movement replacement, pendulum timing repair, and hand restoration.",
            icon: CheckCircle2,
          },
          {
            title: "Bag Zipper & Leather Restoration",
            desc: "College backpack zipper replacement, leather belt punch sizing, wallet stitching & bag repair.",
            icon: CheckCircle2,
          },
        ].map((service, i) => (
          <div
            key={i}
            className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 hover:border-[#C5A880]/50 transition shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#E5E2DC] flex items-center justify-center text-[#C5A880]">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#121212]">
                {service.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{service.desc}</p>
            </div>

            <button
              onClick={() => handleOpenBooking(service.title)}
              className="w-full mt-4 bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-2.5 rounded-full transition shadow-sm"
            >
              Book {service.title} Slot
            </button>
          </div>
        ))}
      </div>

      {/* Repair Modal */}
      <QuickRepairModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedService={selectedService}
      />
    </div>
  );
}

