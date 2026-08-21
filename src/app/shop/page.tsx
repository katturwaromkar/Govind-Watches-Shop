"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, RefreshCw } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [brand, setBrand] = useState(searchParams.get("brand") || "");
  const [gender, setGender] = useState(searchParams.get("gender") || "");
  const [style, setStyle] = useState(searchParams.get("style") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState("newest");
  const [maxPrice, setMaxPrice] = useState<number>(50000);

  useEffect(() => {
    setCategory(searchParams.get("category") || "");
    setBrand(searchParams.get("brand") || "");
    setGender(searchParams.get("gender") || "");
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [category, brand, gender, style, sort, maxPrice, search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams();
      if (category) query.append("category", category);
      if (brand) query.append("brand", brand);
      if (gender) query.append("gender", gender);
      if (style) query.append("style", style);
      if (search) query.append("search", search);
      if (maxPrice < 50000) query.append("maxPrice", maxPrice.toString());
      if (sort) query.append("sort", sort);

      const res = await fetch(`/api/products?${query.toString()}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setCategory("");
    setBrand("");
    setGender("");
    setStyle("");
    setSearch("");
    setMaxPrice(50000);
    setSort("newest");
  };

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div>
      {/* Dark Navy Page Header Banner (Section 31) */}
      <div className="bg-[#07111F] text-[#F8FAFC] border-b border-[#D6B36A]/20 py-12 px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
          OFFICIAL CATALOGUE
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight">
          {search ? `SEARCH: "${search}"` : "TIMEPIECES & ACCESSORIES"}
        </h1>
        <p className="text-xs sm:text-sm text-[#AAB6C4] max-w-xl mx-auto font-normal">
          Discover watches and luxury leather goods selected for every style and occasion.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Sort selector & Mobile filter trigger */}
        <div className="flex items-center justify-between border-b border-[#E2DACD] pb-4 text-xs">
          <p className="text-xs text-[#07111F] font-medium">
            Showing <span className="text-[#D6B36A] font-bold">{products.length}</span> verified products
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center space-x-1.5 bg-[#07111F] text-[#D6B36A] font-bold text-xs py-2 px-3 rounded-[4px] border border-[#D6B36A]/40"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D6B36A]" />
              <span>{isMobileFilterOpen ? "Hide Filters" : "Filter Catalogue"}</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="text-[#07111F] hidden sm:inline font-semibold">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-white border border-[#E2DACD] text-[#07111F] font-medium rounded-[4px] py-2 px-3 focus:border-[#D6B36A] focus:outline-none shadow-sm cursor-pointer"
              >
                <option value="newest">Newest Arrivals</option>
                <option value="bestseller">Bestsellers</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`bg-white border border-[#E2DACD] rounded-[8px] p-6 h-fit space-y-6 text-xs shadow-editorial-shadow ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between border-b border-[#E2DACD] pb-3">
              <span className="font-serif font-bold text-[#07111F] uppercase tracking-wider text-xs flex items-center space-x-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#D6B36A]" />
                <span>FILTER CATALOGUE</span>
              </span>
              <button
                onClick={resetFilters}
                className="text-[#D6B36A] hover:underline flex items-center space-x-1 text-[11px] font-bold"
              >
                <RefreshCw className="w-3 h-3" />
                <span>RESET</span>
              </button>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#07111F] uppercase tracking-wider text-[11px]">
                Gender / Audience
              </h4>
              <div className="space-y-1.5 text-gray-700 font-medium">
                {["MEN", "WOMEN", "COUPLE", "UNISEX"].map((g) => (
                  <label key={g} className="flex items-center space-x-2 cursor-pointer hover:text-[#07111F]">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === g}
                      onChange={() => setGender(gender === g ? "" : g)}
                      className="accent-[#D6B36A]"
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#07111F] uppercase tracking-wider text-[11px]">
                Brands
              </h4>
              <div className="space-y-1.5 text-gray-700 font-medium">
                {["titan", "fastrack", "casio", "fossil", "sonata", "wildhorn"].map((b) => (
                  <label key={b} className="flex items-center space-x-2 cursor-pointer hover:text-[#07111F] capitalize">
                    <input
                      type="checkbox"
                      checked={brand === b}
                      onChange={() => setBrand(brand === b ? "" : b)}
                      className="accent-[#D6B36A] rounded-[2px]"
                    />
                    <span>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-2">
              <h4 className="font-bold text-[#07111F] uppercase tracking-wider text-[11px]">
                Category
              </h4>
              <div className="space-y-1.5 text-gray-700 font-medium">
                {[
                  { slug: "watches", name: "Watches" },
                  { slug: "wall-clocks", name: "Wall Clocks" },
                  { slug: "belts", name: "Belts" },
                  { slug: "wallets", name: "Wallets" },
                  { slug: "goggles", name: "Sunglasses" },
                  { slug: "gifts", name: "Gift Frames" },
                ].map((c) => (
                  <label key={c.slug} className="flex items-center space-x-2 cursor-pointer hover:text-[#07111F]">
                    <input
                      type="radio"
                      name="category"
                      checked={category === c.slug}
                      onChange={() => setCategory(category === c.slug ? "" : c.slug)}
                      className="accent-[#D6B36A]"
                    />
                    <span>{c.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max Price Filter */}
            <div className="space-y-2">
              <div className="flex justify-between font-semibold text-[#07111F] text-[11px]">
                <span>Max Price</span>
                <span className="text-[#D6B36A] font-bold">₹{maxPrice.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#D6B36A] cursor-pointer"
              />
            </div>
          </div>

          {/* Product Grid Container */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 bg-white border border-[#E2DACD] rounded-[8px] animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 bg-white border border-[#E2DACD] rounded-[8px] p-8 space-y-4 shadow-sm">
                <p className="text-gray-500 text-sm">No products found matching your filters.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#07111F] text-[#D6B36A] border border-[#D6B36A]/40 font-bold text-xs py-2.5 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#D6B36A] hover:text-[#07111F] transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-gray-500">Loading Shop Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
