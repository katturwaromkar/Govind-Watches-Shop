"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Filter, SlidersHorizontal, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

export default function CategoryShopPage() {
  const params = useParams();
  const categorySlug = params.category as string;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<number>(50000);

  const titleMap: Record<string, string> = {
    men: "Men's Collection",
    women: "Women's Collection",
    kids: "Kids Watches",
    couple: "Couple Watch Sets",
    "smart-watches": "Smart Watches",
    watches: "All Watches & Clocks",
    clocks: "Wall Clocks",
    belts: "Genuine Leather Belts",
    wallets: "Leather Wallets",
    goggles: "Sunglasses & Goggles",
    caps: "Caps & Headwear",
    keychains: "Keychains",
    bags: "Bags & Backpacks",
    "gift-frames": "Gift Frames",
    gifts: "Gifts & Hampers",
  };

  const formattedTitle = titleMap[categorySlug] || categorySlug.replace("-", " ").toUpperCase();

  useEffect(() => {
    fetchCategoryProducts();
  }, [categorySlug, sortBy, priceRange]);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    try {
      let queryUrl = `/api/products?limit=24`;

      if (categorySlug === "men" || categorySlug === "women" || categorySlug === "kids" || categorySlug === "couple") {
        queryUrl += `&gender=${categorySlug.toUpperCase()}`;
      } else if (categorySlug === "smart-watches") {
        queryUrl += `&style=SMART`;
      } else {
        queryUrl += `&category=${categorySlug}`;
      }

      queryUrl += `&sort=${sortBy}&maxPrice=${priceRange}`;

      const res = await fetch(queryUrl);
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Breadcrumb */}
      <div className="space-y-3">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link href="/shop" className="hover:text-[#C5A880]">Shop</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium capitalize">{formattedTitle}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-6">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#121212] tracking-tight">
              {formattedTitle}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Explore authentic products from Govindraj Watch & Accessories in Naigaon Bazaar.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white border border-[#E5E2DC] rounded-xl px-3 py-1.5 text-xs text-[#121212] shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="newest">New Arrivals</option>
                <option value="bestsellers">Bestsellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="bg-white border border-[#E5E2DC] rounded-2xl p-5 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E5E2DC] pb-3">
            <h3 className="font-serif text-sm font-bold text-[#121212] flex items-center space-x-2">
              <Filter className="w-4 h-4 text-[#C5A880]" />
              <span>Filter Products</span>
            </h3>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#121212] flex justify-between">
              <span>Max Price:</span>
              <span className="text-[#C5A880]">₹{priceRange.toLocaleString("en-IN")}</span>
            </label>
            <input
              type="range"
              min={500}
              max={50000}
              step={500}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#C5A880]"
            />
          </div>

          {/* Quick Sub-Category Links */}
          <div className="space-y-2 pt-2">
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
              Browse Categories
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-600">
              <li><Link href="/shop/men" className="hover:text-[#C5A880]">Men's Collection</Link></li>
              <li><Link href="/shop/women" className="hover:text-[#C5A880]">Women's Collection</Link></li>
              <li><Link href="/shop/kids" className="hover:text-[#C5A880]">Kids Watches</Link></li>
              <li><Link href="/shop/smart-watches" className="hover:text-[#C5A880]">Smart Watches</Link></li>
              <li><Link href="/shop/clocks" className="hover:text-[#C5A880]">Wall Clocks</Link></li>
              <li><Link href="/shop/belts" className="hover:text-[#C5A880]">Leather Belts</Link></li>
              <li><Link href="/shop/wallets" className="hover:text-[#C5A880]">Leather Wallets</Link></li>
              <li><Link href="/shop/gifts" className="hover:text-[#C5A880]">Gifts & Frames</Link></li>
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-16 text-xs text-gray-500">
              Loading {formattedTitle}...
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white border border-[#E5E2DC] rounded-2xl p-12 text-center space-y-3">
              <p className="text-sm font-semibold text-[#121212]">No products found in this selection.</p>
              <p className="text-xs text-gray-500">Try adjusting your price filter or browse other categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
