"use client";

import React, { useState } from "react";
import { X, Wrench, Calendar, Clock, CheckCircle2, MessageSquare } from "lucide-react";

interface QuickRepairModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export default function QuickRepairModal({
  isOpen,
  onClose,
  preselectedService = "",
}: QuickRepairModalProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    whatsapp: "",
    serviceType: preselectedService || "Battery / Cell Replacement",
    brand: "Titan",
    model: "",
    problemDescription: "",
    preferredDate: "",
    preferredTime: "11:00 AM",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        alert(data.error || "Failed to submit repair request");
      }
    } catch (e) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-charcoal-900 border border-charcoal-700 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl relative text-white">
        <button
          onClick={() => {
            setResult(null);
            onClose();
          }}
          className="absolute top-5 right-5 text-charcoal-400 hover:text-white p-1 rounded-full hover:bg-charcoal-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {result ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-gold-500/20 text-gold-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white">
              Repair Request Booked!
            </h3>
            <p className="text-sm text-charcoal-300">
              Booking ID: <span className="font-mono text-gold-400 font-bold">{result.repair.repairId}</span>
            </p>
            <p className="text-xs text-charcoal-400 max-w-xs mx-auto">
              Master repair technician Govindraj Ambatwar will review your watch request shortly.
            </p>

            <div className="pt-4 flex flex-col space-y-3">
              <a
                href={result.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm py-3 rounded-full flex items-center justify-center space-x-2 transition shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notify Master Technician on WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setResult(null);
                  onClose();
                }}
                className="w-full bg-charcoal-800 hover:bg-charcoal-700 text-charcoal-300 text-xs py-2.5 rounded-full"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gold-500/10 border border-gold-500/30 rounded-xl flex items-center justify-center text-gold-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Quick Watch & Accessories Repair
                </h3>
                <p className="text-xs text-charcoal-400">
                  Naigaon Bazaar's trusted watchmaking hub since 20+ years
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-charcoal-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="e.g. Govind Ambatwar"
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white placeholder-charcoal-500 focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-300 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile"
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white placeholder-charcoal-500 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-charcoal-300 mb-1">Service Type *</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="Battery / Cell Replacement">Battery / Cell Replacement</option>
                    <option value="Glass Change (Scratch Proof)">Glass Change</option>
                    <option value="Machine Servicing & Oiling">Machine Servicing & Oiling</option>
                    <option value="Strap Fitting & Metal Chain Sizing">Strap / Chain Sizing</option>
                    <option value="Wall Clock Repair">Wall Clock Repair</option>
                    <option value="Bag Stitching & Zipper Repair">Bag Stitching Repair</option>
                  </select>
                </div>
                <div>
                  <label className="block text-charcoal-300 mb-1">Watch / Item Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Titan, Casio, Seiko"
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white placeholder-charcoal-500 focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-charcoal-300 mb-1">Describe Problem / Issue *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  placeholder="e.g. Watch stopped running, glass broken, battery empty"
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white placeholder-charcoal-500 focus:border-gold-500 focus:outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-charcoal-300 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white focus:border-gold-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-charcoal-300 mb-1">Preferred Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl py-2 px-3 text-white focus:border-gold-500 focus:outline-none"
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-gold-500 to-gold-400 text-charcoal-900 font-bold text-sm py-3 rounded-full hover:shadow-gold-glow transition transform active:scale-95 disabled:opacity-50 mt-2"
              >
                {loading ? "Submitting Request..." : "Book Repair Appointment Slot"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
