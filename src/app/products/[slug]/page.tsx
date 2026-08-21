"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  MessageSquare,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeMessage, setPincodeMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"specs" | "desc" | "warranty">("specs");

  useEffect(() => {
    if (slug) fetchProductDetails();
  }, [slug]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      if (res.ok && data.product) {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
        const primaryImg =
          data.product.images?.find((i: any) => i.isPrimary)?.url ||
          data.product.images?.[0]?.url ||
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800";
        setSelectedImage(primaryImg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeMessage("⚡ Express delivery available to " + pincode + " (2-4 business days)");
    } else {
      setPincodeMessage("Please enter a valid 6-digit PIN code");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500 text-sm">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-[#121212]">Product Not Found</h2>
        <p className="text-gray-500 text-sm">The product you requested could not be found.</p>
        <Link
          href="/shop"
          className="inline-block bg-[#121212] text-[#FAF9F6] font-medium text-xs py-2.5 px-6 rounded-full hover:bg-[#C5A880] transition"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const discountPercent =
    product.discount ||
    (product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0);

  const isLiked = isInWishlist(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <Link href="/shop" className="hover:text-[#C5A880]">Shop</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF9F6] border border-[#E5E2DC] p-6 flex items-center justify-center shadow-sm">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {product.images.map((img: any) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`w-20 h-20 rounded-2xl bg-white border overflow-hidden flex-shrink-0 p-1 transition ${
                    selectedImage === img.url
                      ? "border-[#C5A880] ring-2 ring-[#C5A880]/20"
                      : "border-[#E5E2DC] hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#B89768] font-semibold mb-2">
              <span>{product.brand?.name || "Govindraj Collection"}</span>
              <span className="text-gray-400 font-mono">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#121212] leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center space-x-2 text-xs text-[#C5A880] mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#121212]">4.9 / 5.0</span>
              <span className="text-gray-500">(Verified Customer Ratings)</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4 flex items-baseline justify-between shadow-sm">
            <div>
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#121212]">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{product.mrp.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                Inclusive of all taxes. Free express shipping in Maharashtra.
              </p>
            </div>

            <button
              onClick={() =>
                toggleWishlist({
                  id: product.id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  mrp: product.mrp,
                  image: selectedImage,
                  brand: product.brand?.name,
                })
              }
              className={`p-3 rounded-full border transition ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-500"
                  : "bg-[#FAF9F6] border-[#E5E2DC] text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-600 font-medium">Quantity:</span>
              <div className="flex items-center space-x-3 bg-white border border-[#E5E2DC] rounded-xl px-3 py-1.5 text-xs text-[#121212]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[#121212] px-2 text-sm font-bold"
                >
                  -
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[#121212] px-2 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToCart(
                    {
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      mrp: product.mrp,
                      image: selectedImage,
                      brand: product.brand?.name,
                    },
                    quantity
                  );
                }}
                className="bg-[#121212] hover:bg-[#C5A880] text-[#FAF9F6] font-medium text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 transition shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  addToCart(
                    {
                      id: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      mrp: product.mrp,
                      image: selectedImage,
                      brand: product.brand?.name,
                    },
                    quantity
                  );
                  router.push("/checkout");
                }}
                className="bg-[#C5A880] hover:bg-[#B89768] text-white font-medium text-xs py-3.5 rounded-full flex items-center justify-center space-x-2 transition shadow-md"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={getProductWhatsAppUrl(product.name, product.price, product.sku)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs py-3 rounded-full flex items-center justify-center space-x-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Enquire & Order via WhatsApp</span>
            </a>
          </div>

          {/* Delivery Checker */}
          <div className="bg-white border border-[#E5E2DC] rounded-2xl p-4 text-xs space-y-3 shadow-sm">
            <div className="flex items-center space-x-2 text-[#121212] font-semibold">
              <Truck className="w-4 h-4 text-[#C5A880]" />
              <span>Delivery Availability</span>
            </div>
            <form onSubmit={handlePincodeCheck} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-xl py-2 px-3 focus:border-[#C5A880] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#121212] hover:bg-[#C5A880] text-white font-medium px-4 rounded-xl transition"
              >
                Check
              </button>
            </form>
            {pincodeMessage && (
              <p className="text-[11px] text-emerald-700 font-medium">{pincodeMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description & Warranty */}
      <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
        <div className="flex border-b border-[#E5E2DC] space-x-8 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 transition ${
              activeTab === "specs"
                ? "text-[#C5A880] border-b-2 border-[#C5A880]"
                : "text-gray-400 hover:text-[#121212]"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 transition ${
              activeTab === "desc"
                ? "text-[#C5A880] border-b-2 border-[#C5A880]"
                : "text-gray-400 hover:text-[#121212]"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("warranty")}
            className={`pb-3 transition ${
              activeTab === "warranty"
                ? "text-[#C5A880] border-b-2 border-[#C5A880]"
                : "text-gray-400 hover:text-[#121212]"
            }`}
          >
            Warranty & Care
          </button>
        </div>

        {activeTab === "specs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {product.specifications?.map((spec: any) => (
              <div
                key={spec.id}
                className="flex justify-between py-2 border-b border-[#E5E2DC]/80 text-gray-700"
              >
                <span className="font-medium text-gray-500">{spec.key}</span>
                <span className="font-semibold text-[#121212]">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "desc" && (
          <div className="text-xs text-gray-700 leading-relaxed space-y-3">
            <p>{product.description}</p>
          </div>
        )}

        {activeTab === "warranty" && (
          <div className="text-xs text-gray-700 space-y-3">
            <p>
              <span className="font-bold text-[#121212]">Brand Warranty:</span> {product.warranty || "1 Year Brand Warranty"}
            </p>
            <p>
              <span className="font-bold text-[#121212]">Authorized Dealer Guarantee:</span> Every watch includes an official authorized dealer warranty card and stamp from Govindraj Watch & Accessories, Naigaon Bazaar.
            </p>
          </div>
        )}
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#121212]">Similar Recommendations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

