"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Compass, User, Heart, Sparkles, Clock, RefreshCw } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function GiftFinderPage() {
  const [step, setStep] = useState(1);
  const [audience, setAudience] = useState("");
  const [budget, setBudget] = useState("");
  const [style, setStyle] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleStep1 = (selectedAudience: string) => {
    setAudience(selectedAudience);
    setStep(2);
  };

  const handleStep2 = (selectedBudget: string) => {
    setBudget(selectedBudget);
    setStep(3);
  };

  const handleStep3 = async (selectedStyle: string) => {
    setStyle(selectedStyle);
    setStep(4);
    fetchRecommendations(selectedStyle);
  };

  const fetchRecommendations = async (selectedStyle: string) => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (audience) query.append("gender", audience.toUpperCase());
      if (selectedStyle) query.append("style", selectedStyle.toUpperCase());

      if (budget === "under-1500") query.append("maxPrice", "1500");
      if (budget === "1500-4000") {
        query.append("minPrice", "1500");
        query.append("maxPrice", "4000");
      }
      if (budget === "luxury") query.append("minPrice", "4000");

      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();
      setResults(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setAudience("");
    setBudget("");
    setStyle("");
    setResults([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-white border border-[#E5E2DC] px-4 py-1.5 rounded-full text-[#B89768] text-xs font-semibold shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Interactive Recommendation Engine</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
          4-Step Watch & Gift Finder
        </h1>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Answer quick questions to discover personalized watch and gift recommendations tailored to your exact budget and taste.
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center space-x-3">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-2 rounded-full transition-all ${
              step >= s ? "bg-[#C5A880]" : "bg-[#E5E2DC]"
            }`}
          />
        ))}
      </div>

      {/* Step 1: Audience */}
      {step === 1 && (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 text-center shadow-sm animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#121212]">
            Step 1: Who are you shopping for?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleStep1("men")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <User className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">For Men (Gents)</span>
            </button>
            <button
              onClick={() => handleStep1("women")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <Heart className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">For Women (Ladies)</span>
            </button>
            <button
              onClick={() => handleStep1("couple")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <Sparkles className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">Couples / Wedding</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Budget */}
      {step === 2 && (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 text-center shadow-sm animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#121212]">
            Step 2: What is your Budget range?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleStep2("under-1500")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <span className="font-serif font-bold text-lg text-[#C5A880]">Under ₹1,500</span>
              <span className="text-xs text-gray-500">Budget Friendly & Belts</span>
            </button>
            <button
              onClick={() => handleStep2("1500-4000")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <span className="font-serif font-bold text-lg text-[#C5A880]">₹1,500 - ₹4,000</span>
              <span className="text-xs text-gray-500">Fastrack & Sonata Sets</span>
            </button>
            <button
              onClick={() => handleStep2("luxury")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <span className="font-serif font-bold text-lg text-[#C5A880]">₹4,000+ Luxury</span>
              <span className="text-xs text-gray-500">Titan & G-Shock Premium</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Style */}
      {step === 3 && (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-8 space-y-6 text-center shadow-sm animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#121212]">
            Step 3: Select Preferred Style
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => handleStep3("formal")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <Clock className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">Classic Formal Workwear</span>
            </button>
            <button
              onClick={() => handleStep3("smart")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <Sparkles className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">Smartwatch / Digital</span>
            </button>
            <button
              onClick={() => handleStep3("luxury")}
              className="p-6 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C5A880] rounded-2xl flex flex-col items-center space-y-3 group transition"
            >
              <Heart className="w-8 h-8 text-[#C5A880] group-hover:scale-110 transition" />
              <span className="font-bold text-sm text-[#121212]">Jewellery & Gift Frames</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-xl font-bold text-[#121212]">
              Recommended Timepieces & Gifts
            </h3>
            <button
              onClick={resetQuiz}
              className="text-[#C5A880] hover:underline text-xs flex items-center space-x-1 font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start Quiz Over</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500 text-xs">
              Matching database inventory...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 bg-white border border-[#E5E2DC] rounded-3xl p-6 text-gray-500 text-xs">
              No matching products found. Try adjusting your preferences!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

