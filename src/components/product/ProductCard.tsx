"use client";

import React from "react";
import Link from "next/link";
import { Heart, ShoppingBag, MessageSquare, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    mrp: number;
    discount?: number | null;
    sku?: string | null;
    gender?: string | null;
    style?: string | null;
    isBestseller?: boolean | null;
    isNewArrival?: boolean | null;
    brand?: { name: string } | null;
    category?: { name: string } | null;
    images?: { url: string; isPrimary?: boolean | null }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const primaryImage =
    product.images?.find((img) => img.isPrimary)?.url ||
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";

  const discountPercent =
    product.discount ||
    (product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  const isLiked = isInWishlist(product.id);

  return (
    <div className="group bg-white border border-[#E2DACD] rounded-[8px] overflow-hidden transition-all duration-300 flex flex-col hover:border-[#D6B36A] hover:shadow-editorial-shadow">
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#F5F1E8]/60 flex items-center justify-center p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1 z-10">
          {product.isBestseller && (
            <span className="bg-[#07111F] text-[#F8FAFC] font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-[4px] border border-[#D6B36A]/30">
              BESTSELLER
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="bg-[#D6B36A] text-[#07111F] font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-[4px]">
              NEW EDIT
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-red-700 text-white font-bold text-[9px] px-2 py-0.5 rounded-[4px]">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist({
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.price,
              mrp: product.mrp,
              image: primaryImage,
              brand: product.brand?.name,
            });
          }}
          className={`absolute top-3 right-3 p-2 rounded-[4px] border transition-all z-10 ${
            isLiked
              ? "bg-red-50 border-red-200 text-red-500"
              : "bg-white/90 border-[#E2DACD] text-gray-400 hover:text-red-500"
          }`}
          title="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        </button>

        {/* Main Image Link */}
        <Link href={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={primaryImage}
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-[10px] text-[#AAB6C4] font-semibold tracking-wider uppercase mb-1">
            <span>{product.brand?.name || "Govindraj"}</span>
            {product.gender && (
              <span className="text-[#D6B36A] font-bold">
                {product.gender}
              </span>
            )}
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#07111F] group-hover:text-[#D6B36A] transition line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Rating & Pricing */}
        <div className="space-y-1">
          <div className="flex items-center space-x-1 text-[#D6B36A] text-[10px]">
            <Star className="w-3 h-3 fill-current text-[#D6B36A]" />
            <span className="font-bold text-[#07111F]">4.9</span>
            <span className="text-gray-400 text-[10px]">(Horology Guarantee)</span>
          </div>

          <div className="flex items-baseline space-x-2">
            <span className="text-base sm:text-lg font-bold text-[#07111F]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ₹{product.mrp.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1">
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                mrp: product.mrp,
                image: primaryImage,
                brand: product.brand?.name,
              })
            }
            className="bg-[#07111F] hover:bg-[#D6B36A] text-[#F8FAFC] hover:text-[#07111F] font-bold text-[10px] uppercase tracking-wider py-2 px-1 rounded-[4px] flex items-center justify-center space-x-1 transition"
          >
            <ShoppingBag className="w-3 h-3 flex-shrink-0 text-[#D6B36A] group-hover:text-[#07111F]" />
            <span className="truncate">Add to Bag</span>
          </button>

          <a
            href={getProductWhatsAppUrl(product.name, product.price, product.sku || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#F5F1E8] hover:bg-[#07111F] text-[#07111F] hover:text-[#D6B36A] border border-[#E2DACD] font-bold text-[10px] uppercase tracking-wider py-2 px-1 rounded-[4px] flex items-center justify-center space-x-1 transition"
          >
            <MessageSquare className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">Enquire</span>
          </a>
        </div>
      </div>
    </div>
  );
}

