"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function SingleBrandPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const brandNames: Record<string, string> = {
    titan: "Titan",
    fastrack: "Fastrack",
    casio: "Casio",
    fossil: "Fossil",
    sonata: "Sonata",
    wildhorn: "Wildhorn",
  };

  const brandName = brandNames[slug] || slug.toUpperCase();

  useEffect(() => {
    fetch(`/api/products?brand=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb & Banner */}
      <div className="space-y-4 border-b border-[#E5E2DC] pb-6">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/brands" className="hover:text-[#C5A880]">Brands</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium">{brandName}</span>
        </nav>

        <div className="bg-[#FAF9F6] border border-[#E5E2DC] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-[#B89768] font-semibold">
              <Award className="w-4 h-4 text-[#C5A880]" />
              <span>Official Retail Selection</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#121212]">
              {brandName} Watches & Accessories
            </h1>
            <p className="text-xs text-gray-600 max-w-xl leading-relaxed">
              Explore 100% authentic {brandName} collections with official brand warranty, available for express local delivery or pickup at Govindraj Watch & Accessories, Naigaon Bazaar.
            </p>
          </div>
        </div>
      </div>

      {/* Product List */}
      <div>
        {loading ? (
          <div className="text-center py-16 text-xs text-gray-500">
            Loading {brandName} collection...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-12 text-center space-y-3">
            <p className="text-sm font-semibold text-[#121212]">No products found for {brandName}.</p>
            <Link href="/shop" className="inline-block bg-[#121212] text-white text-xs px-5 py-2.5 rounded-full">
              Explore All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
