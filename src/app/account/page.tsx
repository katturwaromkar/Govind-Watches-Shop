"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User, Lock, Mail, Phone, ShoppingBag, Wrench, LogOut, ShieldCheck, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, login, register, logout, isAdmin } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (isRegisterMode) {
      const res = await register(formData);
      if (!res.success) setErrorMsg(res.error || "Registration failed");
    } else {
      const res = await login({ email: formData.email, password: formData.password });
      if (!res.success) setErrorMsg(res.error || "Invalid credentials");
    }
    setLoading(false);
  };

  if (user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium">My Account</span>
        </nav>

        {/* User Profile Header */}
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#C5A880] font-serif font-bold text-2xl flex items-center justify-center">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="font-serif text-2xl font-bold text-[#121212]">{user.name}</h2>
                {isAdmin && (
                  <span className="bg-[#121212] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-2.5 px-5 rounded-full transition shadow-sm"
              >
                Go to Admin Portal
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-[#FAF9F6] border border-[#E5E2DC] text-red-600 font-medium text-xs py-2.5 px-4 rounded-full flex items-center space-x-1.5 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/track-order"
            className="bg-white border border-[#E5E2DC] hover:border-[#C5A880] rounded-3xl p-6 flex flex-col space-y-3 group transition shadow-sm"
          >
            <ShoppingBag className="w-8 h-8 text-[#C5A880] group-hover:scale-105 transition" />
            <h3 className="font-serif font-bold text-base text-[#121212]">Order History</h3>
            <p className="text-xs text-gray-500">Track current orders & status</p>
          </Link>

          <Link
            href="/repair/track"
            className="bg-white border border-[#E5E2DC] hover:border-[#C5A880] rounded-3xl p-6 flex flex-col space-y-3 group transition shadow-sm"
          >
            <Wrench className="w-8 h-8 text-[#C5A880] group-hover:scale-105 transition" />
            <h3 className="font-serif font-bold text-base text-[#121212]">Repair Tracking</h3>
            <p className="text-xs text-gray-500">Check watch service status</p>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white border border-[#E5E2DC] hover:border-[#C5A880] rounded-3xl p-6 flex flex-col space-y-3 group transition shadow-sm"
          >
            <ShieldCheck className="w-8 h-8 text-[#C5A880] group-hover:scale-105 transition" />
            <h3 className="font-serif font-bold text-base text-[#121212]">Saved Wishlist</h3>
            <p className="text-xs text-gray-500">View saved products & accessories</p>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl flex items-center justify-center text-[#C5A880] mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#121212]">
            {isRegisterMode ? "Create Customer Account" : "Sign In to Account"}
          </h2>
          <p className="text-xs text-gray-500">
            Govindraj Watch & Accessories Customer Portal
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-xs text-red-600 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegisterMode && (
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Govind Ambatwar"
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="customer@example.com"
              className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {isRegisterMode && (
            <div>
              <label className="block text-gray-700 mb-1 font-medium">Mobile Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="10-digit phone"
                className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2.5 px-3 focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3.5 rounded-full transition shadow-md mt-2 disabled:opacity-50"
          >
            {loading
              ? "Authenticating..."
              : isRegisterMode
              ? "Create Account"
              : "Sign In"}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-[#E5E2DC] text-xs">
          <button
            onClick={() => {
              setIsRegisterMode(!isRegisterMode);
              setErrorMsg("");
            }}
            className="text-[#C5A880] hover:underline font-semibold"
          >
            {isRegisterMode
              ? "Already have an account? Sign In"
              : "Don't have an account? Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

