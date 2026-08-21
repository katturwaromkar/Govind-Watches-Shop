"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, ShoppingBag, ArrowRight, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalAmount,
    totalDiscount,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full sm:w-screen max-w-md bg-[#F5F1E8] border-l border-[#E2DACD] text-[#07111F] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E2DACD] bg-[#07111F] text-[#F8FAFC] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D6B36A]" />
              <h3 className="font-serif text-lg font-bold">Shopping Bag ({totalItems})</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#AAB6C4] hover:text-white p-1 rounded-[4px] hover:bg-[#0D1B2A] transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#AAB6C4] mx-auto" />
                <p className="text-[#AAB6C4] text-sm">Your shopping bag is currently empty</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-[#07111F] text-[#D6B36A] border border-[#D6B36A]/40 font-bold text-xs py-2.5 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#D6B36A] hover:text-[#07111F] transition"
                >
                  EXPLORE WATCHES →
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex space-x-4 p-3 bg-white border border-[#E2DACD] rounded-[6px]"
                >
                  <div className="w-16 h-16 rounded-[4px] bg-[#F5F1E8] overflow-hidden flex-shrink-0 border border-[#E2DACD]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#07111F] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[#AAB6C4]">{item.brand}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-bold text-[#07111F]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </span>
                      {item.mrp > item.price && (
                        <span className="text-[10px] text-gray-400 line-through">
                          ₹{item.mrp.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 bg-[#F5F1E8] border border-[#E2DACD] rounded-[4px] px-2 py-0.5 text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-600 hover:text-[#07111F] px-1 font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold text-[#07111F]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-600 hover:text-[#07111F] px-1 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E2DACD] bg-white space-y-3">
              <div className="space-y-1 text-xs text-gray-600">
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Savings</span>
                    <span>-₹{totalDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#07111F] pt-1">
                  <span>Subtotal</span>
                  <span className="text-[#07111F]">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#D6B36A] hover:bg-[#B8964E] text-[#07111F] font-bold text-xs py-3 rounded-[4px] uppercase tracking-wider flex items-center justify-center space-x-2 transition shadow-sm"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#07111F] text-[#D6B36A] border border-[#D6B36A]/40 font-semibold text-xs py-2.5 rounded-[4px] uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-[#0D1B2A] transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Enquire via WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
