"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, CheckCircle2, ShieldCheck, ArrowRight, MessageSquare, CreditCard, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalAmount, totalDiscount, clearCart } = useCart();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    city: "Naigaon",
    state: "Maharashtra",
    pincode: "431709",
    paymentMethod: "COD", // COD, RAZORPAY, WHATSAPP
  });

  const [loading, setLoading] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.settings) setSiteSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  if (cart.length === 0 && !orderResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto" />
        <h2 className="text-2xl font-serif font-bold text-[#121212]">Your Cart is Empty</h2>
        <p className="text-gray-500 text-xs">Add items to cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-block bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-2.5 px-6 rounded-full transition"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (siteSettings && !siteSettings.onlineOrdersEnabled) {
      alert("Online checkout is currently paused by store manager. Please contact us via WhatsApp!");
      return;
    }

    setLoading(true);

    try {
      const orderPayload = {
        ...formData,
        items: cart.map((i) => ({ productId: i.id, quantity: i.quantity })),
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderResult(data);
        clearCart();
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (e) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {orderResult ? (
        /* Order Confirmation Screen */
        <div className="max-w-xl mx-auto bg-white border border-[#E5E2DC] rounded-3xl p-8 text-center space-y-6 shadow-sm animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-[#121212]">Order Confirmed!</h2>
            <p className="text-xs text-gray-600 mt-1">
              Thank you for shopping with Govindraj Watch & Accessories.
            </p>
          </div>

          <div className="bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl p-4 text-xs space-y-2 text-left">
            <div className="flex justify-between border-b border-[#E5E2DC] pb-2">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-mono text-[#121212] font-bold">{orderResult.order.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E2DC] pb-2">
              <span className="text-gray-500">Customer Name:</span>
              <span className="text-[#121212] font-semibold">{orderResult.order.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-[#E5E2DC] pb-2">
              <span className="text-gray-500">Total Amount:</span>
              <span className="text-[#C5A880] font-bold">₹{orderResult.order.totalAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment Method:</span>
              <span className="text-emerald-700 font-semibold">{orderResult.order.paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={orderResult.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs py-3 rounded-full flex items-center justify-center space-x-2 transition shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Order Confirmation on WhatsApp</span>
            </a>

            <Link
              href={`/track-order?orderId=${orderResult.order.orderId}`}
              className="block w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-3 rounded-full transition"
            >
              Track Order Status
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Form & Summary Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-3xl font-bold text-[#121212]">Checkout</h1>

            {siteSettings && !siteSettings.onlineOrdersEnabled && (
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-800">
                ⚠️ Online ordering is temporarily paused by admin. Please contact us via WhatsApp to complete your purchase!
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Step 1: Customer Info */}
              <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 text-xs shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#121212] border-b border-[#E5E2DC] pb-2">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Ramesh Deshmukh"
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.customerPhone}
                      onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                  />
                </div>
              </div>

              {/* Step 2: Shipping Address */}
              <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 text-xs shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#121212] border-b border-[#E5E2DC] pb-2">
                  2. Delivery Address
                </h3>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Street Address / Landmark *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House no, Building, Street, Main Road"
                    className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">State</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1 font-medium">PIN Code</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 text-xs shadow-sm">
                <h3 className="font-serif text-base font-bold text-[#121212] border-b border-[#E5E2DC] pb-2">
                  3. Payment Option
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl cursor-pointer hover:border-[#C5A880]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === "COD"}
                      onChange={() => setFormData({ ...formData, paymentMethod: "COD" })}
                      className="accent-[#C5A880]"
                    />
                    <Truck className="w-5 h-5 text-[#C5A880]" />
                    <div>
                      <span className="font-bold text-[#121212] block">Cash on Delivery (COD)</span>
                      <span className="text-[11px] text-gray-500">Pay cash upon delivery in Naigaon & Nanded</span>
                    </div>
                  </label>

                  {siteSettings?.onlinePaymentEnabled && (
                    <label className="flex items-center space-x-3 p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl cursor-pointer hover:border-[#C5A880]">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="RAZORPAY"
                        checked={formData.paymentMethod === "RAZORPAY"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "RAZORPAY" })}
                        className="accent-[#C5A880]"
                      />
                      <CreditCard className="w-5 h-5 text-[#C5A880]" />
                      <div>
                        <span className="font-bold text-[#121212] block">Razorpay Online Payment</span>
                        <span className="text-[11px] text-gray-500">UPI (GPay/PhonePe), Cards & Netbanking</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (siteSettings && !siteSettings.onlineOrdersEnabled)}
                className="w-full bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-4 rounded-full transition shadow-md disabled:opacity-50"
              >
                {loading ? "Processing Order..." : "Place Order Now"}
              </button>
            </form>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-4 text-xs sticky top-28 shadow-sm">
              <h3 className="font-serif text-base font-bold text-[#121212] border-b border-[#E5E2DC] pb-3">
                Order Summary ({cart.length} items)
              </h3>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-gray-700">
                    <div className="flex items-center space-x-3 min-w-0">
                      <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover bg-[#FAF9F6] border border-[#E5E2DC]" />
                      <div className="truncate">
                        <span className="font-semibold text-[#121212] truncate block">{item.name}</span>
                        <span className="text-[11px] text-gray-400">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#121212]">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E5E2DC] pt-3 space-y-1 text-gray-600">
                {totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Savings</span>
                    <span>-₹{totalDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-medium">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#121212] pt-2 border-t border-[#E5E2DC]">
                  <span>Grand Total</span>
                  <span className="text-[#C5A880]">₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

