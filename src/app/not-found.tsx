import React from "react";
import Link from "next/link";
import { Clock, Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] bg-[#07111F] text-[#F8FAFC] flex items-center justify-center px-4 py-20 border-b border-[#D6B36A]/20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#D6B36A] via-[#F5E6BA] to-[#997736] shadow-xl">
            <div className="w-full h-full rounded-full bg-[#0D1B2A] flex items-center justify-center">
              <Clock className="w-10 h-10 text-[#D6B36A]" />
            </div>
          </div>
          <span className="absolute -bottom-2 bg-[#D6B36A] text-[#07111F] font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full">
            404 ERROR
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#F8FAFC] uppercase">
            TIME OUT OF BOUNDS
          </h1>
          <p className="text-xs sm:text-sm text-[#AAB6C4] leading-relaxed">
            The timepiece, category, or page you are looking for has been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto bg-[#D6B36A] hover:bg-[#B8964E] text-[#07111F] font-bold text-xs py-3 px-6 rounded-[4px] uppercase tracking-wider transition flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>

          <Link
            href="/shop"
            className="w-full sm:w-auto bg-[#0D1B2A] border border-[#D6B36A]/30 text-[#F8FAFC] hover:text-[#D6B36A] font-semibold text-xs py-3 px-6 rounded-[4px] uppercase tracking-wider transition flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4 text-[#D6B36A]" />
            <span>BROWSE CATALOGUE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
