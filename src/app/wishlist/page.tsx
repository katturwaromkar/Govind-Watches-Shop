"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Trash2, ChevronRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">My Wishlist</span>
      </nav>

      <div className="space-y-2 border-b border-[#E5E2DC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#121212]">
          My Saved Wishlist ({wishlist.length} items)
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <Heart className="w-12 h-12 text-gray-300 mx-auto" />
          <h2 className="font-serif text-xl font-bold text-[#121212]">Your Wishlist is Empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Save your favorite Titan, Casio, or Fastrack watches to keep track of offers.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 px-8 rounded-full transition"
          >
            Explore Store Catalogue
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E5E2DC] rounded-2xl p-4 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="aspect-square bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl overflow-hidden p-3 flex items-center justify-center relative">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 hover:bg-red-50 border border-[#E5E2DC]"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-[#B89768] font-semibold uppercase">{item.brand || "Govindraj"}</span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-xs font-semibold text-[#121212] hover:text-[#C5A880] truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-[#121212] mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    id: item.id,
                    name: item.name,
                    slug: item.slug,
                    price: item.price,
                    mrp: item.mrp || item.price,
                    image: item.image,
                    brand: item.brand,
                  })
                }
                className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-2.5 rounded-xl flex items-center justify-center space-x-1.5 transition"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
