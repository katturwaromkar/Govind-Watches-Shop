"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Award, ChevronRight, ArrowRight } from "lucide-react";

export default function BrandsDirectoryPage() {
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Collect brands from products or seed
        const mockBrands = [
          {
            name: "Titan",
            slug: "titan",
            description: "India's leading watch brand known for precision craftsmanship, Edge, Raga, and Workwear collections.",
            image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
          },
          {
            name: "Fastrack",
            slug: "fastrack",
            description: "Youthful and vibrant watch & accessories brand for trendsetters.",
            image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=800",
          },
          {
            name: "Casio",
            slug: "casio",
            description: "World-renowned for G-Shock durability, Edifice chronographs, and Vintage digital watches.",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800",
          },
          {
            name: "Fossil",
            slug: "fossil",
            description: "American vintage-inspired luxury watches and genuine leather goods.",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
          },
          {
            name: "Sonata",
            slug: "sonata",
            description: "Reliable, stylish, and affordable timepieces for everyday elegance and wedding gifts.",
            image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800",
          },
          {
            name: "Wildhorn",
            slug: "wildhorn",
            description: "Handcrafted 100% genuine leather belts and RFID-blocking wallets.",
            image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800",
          },
        ];
        setBrands(mockBrands);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-[#E5E2DC] pb-6">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium">Brands</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
          Authorized Brand Directory
        </h1>
        <p className="text-xs text-gray-600 max-w-2xl">
          Discover authentic timepieces, genuine leather accessories, and optical eyewear from India's most trusted horology brands available at Govindraj Watch & Accessories, Naigaon Bazaar.
        </p>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {brands.map((brand) => (
          <div
            key={brand.slug}
            className="group bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#C5A880]/50 transition-all flex flex-col justify-between p-6"
          >
            <div className="space-y-4">
              <div className="h-44 rounded-2xl overflow-hidden bg-[#FAF9F6] flex items-center justify-center p-4">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition duration-500"
                />
              </div>

              <div>
                <div className="flex items-center space-x-1.5 text-xs text-[#B89768] font-semibold mb-1">
                  <Award className="w-4 h-4 text-[#C5A880]" />
                  <span>Authorized Retail Partner</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#121212] group-hover:text-[#C5A880] transition">
                  {brand.name}
                </h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E5E2DC]/80 mt-6">
              <Link
                href={`/brands/${brand.slug}`}
                className="w-full bg-[#121212] hover:bg-[#C5A880] text-[#FAF9F6] font-medium text-xs py-3 rounded-xl flex items-center justify-center space-x-2 transition"
              >
                <span>Explore {brand.name} Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
