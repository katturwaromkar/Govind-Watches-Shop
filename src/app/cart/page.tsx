"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalAmount, totalItems } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Shopping Cart</span>
      </nav>

      <div className="space-y-2 border-b border-[#E5E2DC] pb-6">
        <h1 className="font-serif text-3xl font-bold text-[#121212]">
          Shopping Cart ({totalItems} items)
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-[#E5E2DC] rounded-3xl p-12 text-center space-y-4 shadow-sm">
          <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
          <h2 className="font-serif text-xl font-bold text-[#121212]">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Discover authentic Titan, Fastrack, Casio watches and genuine leather goods.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 px-8 rounded-full transition"
          >
            Explore Shop Collection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E5E2DC] rounded-2xl p-4 sm:p-5 flex items-center space-x-4 shadow-sm"
              >
                <div className="w-20 h-20 bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl overflow-hidden flex-shrink-0 p-2 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] text-[#B89768] font-semibold uppercase">{item.brand || "Govindraj"}</span>
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="text-xs sm:text-sm font-semibold text-[#121212] hover:text-[#C5A880] truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-bold text-[#121212]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-2 bg-[#FAF9F6] border border-[#E5E2DC] rounded-xl px-2.5 py-1 text-xs">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-gray-500 hover:text-[#121212] font-bold px-1"
                  >
                    -
                  </button>
                  <span className="font-bold text-[#121212]">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-gray-500 hover:text-[#121212] font-bold px-1"
                  >
                    +
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <button
                onClick={clearCart}
                className="text-xs text-gray-500 hover:text-red-600 font-medium"
              >
                Clear Cart
              </button>
              <Link href="/shop" className="text-xs text-[#C5A880] hover:underline font-semibold">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-6 shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#121212] border-b border-[#E5E2DC] pb-3">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-semibold text-[#121212]">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span className="text-emerald-700 font-semibold">FREE (Maharashtra)</span>
              </div>
              <div className="border-t border-[#E5E2DC] pt-3 flex justify-between text-sm font-bold text-[#121212]">
                <span>Total Amount</span>
                <span className="text-[#C5A880]">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 transition shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center space-x-2 text-[11px] text-gray-500 pt-2 border-t border-[#E5E2DC]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% Genuine Authorized Dealer Guarantee</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
