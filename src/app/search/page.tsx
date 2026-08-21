"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";

function SearchContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || searchParams.get("search") || "";

  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryParam) {
      setQuery(queryParam);
      performSearch(queryParam);
    }
  }, [queryParam]);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?search=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      if (res.ok) {
        setResults(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Search Header */}
      <div className="space-y-4 border-b border-[#E5E2DC] pb-6">
        <nav className="flex items-center space-x-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-[#C5A880]">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-[#121212] font-medium">Search Results</span>
        </nav>

        <h1 className="font-serif text-3xl font-bold text-[#121212]">
          Search Products
        </h1>

        <form onSubmit={handleSearchSubmit} className="max-w-xl flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Titan, Fastrack, G-Shock, Belts, Wallets..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-[#E5E2DC] text-[#121212] text-sm rounded-full py-3 pl-11 pr-4 focus:outline-none focus:border-[#C5A880] shadow-sm"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          </div>
          <button
            type="submit"
            className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs px-6 rounded-full transition shadow-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div>
        {loading ? (
          <div className="text-center py-16 text-xs text-gray-500">
            Searching products for "{query}"...
          </div>
        ) : queryParam && results.length === 0 ? (
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-12 text-center space-y-3 shadow-sm">
            <p className="text-sm font-semibold text-[#121212]">
              No products found matching "{queryParam}".
            </p>
            <p className="text-xs text-gray-500">
              Try searching for brands like "Titan", "Casio", "Fastrack" or category items like "Belts", "Wallets", "Clocks".
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {queryParam && (
              <p className="text-xs text-gray-600">
                Found <span className="font-bold text-[#121212]">{results.length}</span> results for "{queryParam}"
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16 text-center text-xs text-gray-500">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
