import React from "react";
import Link from "next/link";
import { Award, ShieldCheck, Wrench, ChevronRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">About Store</span>
      </nav>

      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs text-[#B89768] font-semibold uppercase tracking-wider">
          Our Heritage & Story
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#121212]">
          About Govindraj Watch & Accessories
        </h1>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          For over 20+ years, Govindraj Watch Shop in Naigaon Bazaar has stood as Nanded's premier independent retailer for 100% authentic branded watches, genuine leather goods, custom gift frames, and master watch repair services.
        </p>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-3 shadow-sm">
          <Award className="w-10 h-10 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-bold text-[#121212]">Authorized Brand Selection</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Official retailer for Titan, Sonata, Fastrack, Casio G-Shock & Fossil. Every watch includes valid brand warranty cards.
          </p>
        </div>

        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-3 shadow-sm">
          <Wrench className="w-10 h-10 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-bold text-[#121212]">Master Repair Workshop</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Led by founder Govindraj Ambatwar, offering express battery replacement, Swiss machine oiling, glass fitting, and wall clock overhauls.
          </p>
        </div>

        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-3 shadow-sm">
          <ShieldCheck className="w-10 h-10 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-bold text-[#121212]">Leather & Custom Gifts</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Curated top-grain leather belts, RFID wallets, UV polarized sunglasses, and customized royal photo frames for weddings.
          </p>
        </div>
      </div>
    </div>
  );
}

