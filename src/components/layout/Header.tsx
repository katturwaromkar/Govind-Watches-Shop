"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Wrench,
  Menu,
  X,
  ChevronDown,
  Compass,
  Tag,
  Clock,
  Sparkles,
  Home,
  Grid,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import QuickRepairModal from "@/components/repair/QuickRepairModal";

export default function Header() {
  const router = useRouter();
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const { user, isAdmin, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [repairModalOpen, setRepairModalOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  // Live search autocomplete handler
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data.products?.slice(0, 5) || []);
          setIsSearchOpen(true);
        })
        .catch(() => {});
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#07111F]/98 backdrop-blur-md border-b border-[#D6B36A]/20 transition-all text-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header Bar */}
          <div className="flex items-center justify-between h-20 gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group min-w-0 flex-shrink-0">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#D6B36A] via-[#F5E6BA] to-[#997736] shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src="/logo.jpg"
                  alt="Govindraj Watch & Gifts Logo"
                  className="w-full h-full rounded-full object-cover bg-[#0D1B2A]"
                />
              </div>
              <div className="flex flex-col min-w-0 justify-center">
                <span className="font-serif text-base xs:text-lg sm:text-xl font-extrabold tracking-wider text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-hover:text-[#F5E6BA] transition truncate leading-tight">
                  GOVINDRAJ
                </span>
                <span className="text-[8.5px] xs:text-[9.5px] sm:text-[10.5px] tracking-[0.2em] sm:tracking-[0.25em] text-[#F3E5AB] uppercase font-bold truncate drop-shadow-[0_1px_1px_rgba(0,0,0,0.9)]">
                  WATCH & GIFTS • NAIGAON
                </span>
              </div>
            </Link>

            {/* Desktop Center Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-widest text-[#AAB6C4] uppercase">
              <div
                className="relative py-7"
                onMouseEnter={() => setActiveMegaMenu("shop")}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href="/shop"
                  className="flex items-center space-x-1 hover:text-[#D6B36A] transition py-1 text-[#F8FAFC]"
                >
                  <span>SHOP CATALOGUE</span>
                  <ChevronDown className="w-3 h-3 text-[#D6B36A]" />
                </Link>

                {/* Editorial 2-Column Mega Menu */}
                {activeMegaMenu === "shop" && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-[#0D1B2A] border border-[#D6B36A]/30 rounded-[8px] shadow-2xl p-6 grid grid-cols-12 gap-8 z-50 text-left">
                    {/* Left Column: Category Navigation */}
                    <div className="col-span-7 grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-[#D6B36A] font-serif font-bold uppercase tracking-wider text-[11px] mb-3 border-b border-[#D6B36A]/20 pb-1.5">
                          Watches
                        </h4>
                        <ul className="space-y-2 text-[#AAB6C4] text-xs font-medium tracking-normal capitalize">
                          <li><Link href="/shop/men" className="hover:text-[#F8FAFC] transition">Men's Watches</Link></li>
                          <li><Link href="/shop/women" className="hover:text-[#F8FAFC] transition">Women's Watches</Link></li>
                          <li><Link href="/shop/kids" className="hover:text-[#F8FAFC] transition">Kids Collection</Link></li>
                          <li><Link href="/shop/couple" className="hover:text-[#F8FAFC] transition">Couple Sets</Link></li>
                          <li><Link href="/shop/smart-watches" className="hover:text-[#F8FAFC] transition">Smart Timepieces</Link></li>
                          <li><Link href="/shop/clocks" className="hover:text-[#F8FAFC] transition">Designer Wall Clocks</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-[#D6B36A] font-serif font-bold uppercase tracking-wider text-[11px] mb-3 border-b border-[#D6B36A]/20 pb-1.5">
                          Accessories
                        </h4>
                        <ul className="space-y-2 text-[#AAB6C4] text-xs font-medium tracking-normal capitalize">
                          <li><Link href="/shop/belts" className="hover:text-[#F8FAFC] transition">Leather Belts</Link></li>
                          <li><Link href="/shop/wallets" className="hover:text-[#F8FAFC] transition">Leather Wallets</Link></li>
                          <li><Link href="/shop/goggles" className="hover:text-[#F8FAFC] transition">Sunglasses & Eyewear</Link></li>
                          <li><Link href="/shop/gifts" className="hover:text-[#F8FAFC] transition">Custom Gift Frames</Link></li>
                          <li><Link href="/repair" className="hover:text-[#D6B36A] text-[#D6B36A] transition">Master Watch Repair</Link></li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Column: Editorial Showcase */}
                    <div className="col-span-5 relative rounded-[6px] overflow-hidden bg-[#07111F] border border-[#D6B36A]/20 p-4 flex flex-col justify-end">
                      <img
                        src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600"
                        alt="Editorial Watch Collection"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 hover:opacity-50 transition duration-700"
                      />
                      <div className="relative z-10 space-y-2">
                        <span className="text-[9px] tracking-widest text-[#D6B36A] uppercase font-bold bg-[#07111F]/80 px-2 py-0.5 rounded-[4px] border border-[#D6B36A]/30">
                          Horology Edit
                        </span>
                        <h5 className="font-serif text-sm font-bold text-[#F8FAFC]">
                          Precision Craftsmanship
                        </h5>
                        <Link
                          href="/shop"
                          onClick={() => setActiveMegaMenu(null)}
                          className="inline-block bg-[#D6B36A] text-[#07111F] font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded-[4px] hover:bg-[#B8964E] transition"
                        >
                          Explore Horology →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/shop/men" className="hover:text-[#D6B36A] transition py-7">MEN</Link>
              <Link href="/shop/women" className="hover:text-[#D6B36A] transition py-7">WOMEN</Link>
              <Link href="/brands" className="hover:text-[#D6B36A] transition py-7">BRANDS</Link>
              <Link href="/shop/belts" className="hover:text-[#D6B36A] transition py-7">ACCESSORIES</Link>
              <Link href="/repair" className="text-[#D6B36A] hover:underline transition py-7 flex items-center space-x-1">
                <Wrench className="w-3.5 h-3.5" />
                <span>REPAIR</span>
              </Link>
            </nav>

            {/* Header Right Action Deck */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Quick Search Trigger Input (Desktop) */}
              <div className="hidden md:block relative w-48 xl:w-64" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search watches, brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#0D1B2A] border border-[#D6B36A]/30 text-[#F8FAFC] placeholder-[#AAB6C4] text-xs rounded-[4px] py-2 pl-9 pr-3 focus:outline-none focus:border-[#D6B36A]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#D6B36A] absolute left-3 top-2.5" />
                </form>

                {/* Search Autocomplete */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-11 bg-[#0D1B2A] border border-[#D6B36A]/30 rounded-[6px] shadow-2xl overflow-hidden z-50">
                    <div className="p-2 text-[10px] text-[#D6B36A] font-bold uppercase tracking-wider border-b border-[#D6B36A]/20">
                      Product Matches
                    </div>
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/product/${item.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center space-x-3 p-2.5 hover:bg-[#142438] transition border-b border-[#D6B36A]/10 last:border-0"
                      >
                        <div className="w-8 h-8 rounded-[4px] overflow-hidden bg-[#07111F] flex-shrink-0">
                          {item.images?.[0] ? (
                            <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <Clock className="w-4 h-4 text-[#D6B36A] m-auto mt-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs font-medium text-[#F8FAFC] truncate">{item.name}</p>
                          <span className="text-[10px] text-[#D6B36A] font-bold">₹{item.price.toLocaleString("en-IN")}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Repair Button */}
              <button
                onClick={() => setRepairModalOpen(true)}
                className="hidden xl:inline-flex items-center space-x-1.5 bg-[#D6B36A] text-[#07111F] font-bold text-xs py-2 px-4 rounded-[4px] hover:bg-[#B8964E] transition"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>BOOK REPAIR</span>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="p-2 text-[#AAB6C4] hover:text-[#D6B36A] transition relative"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D6B36A] text-[#07111F] font-bold text-[9px] rounded-full flex items-center justify-center">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#AAB6C4] hover:text-[#D6B36A] transition relative"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#D6B36A] text-[#07111F] font-bold text-[9px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Account */}
              {user ? (
                <div className="relative group">
                  <Link
                    href={isAdmin ? "/admin" : "/account"}
                    className="flex items-center space-x-1 p-2 text-[#AAB6C4] hover:text-[#D6B36A] transition"
                  >
                    <User className="w-5 h-5 text-[#D6B36A]" />
                  </Link>
                  <div className="absolute right-0 top-full hidden group-hover:block w-48 bg-[#0D1B2A] border border-[#D6B36A]/30 rounded-[6px] shadow-2xl p-2 text-xs z-50">
                    {isAdmin && (
                      <Link href="/admin" className="block px-3 py-2 text-[#D6B36A] font-bold hover:bg-[#142438] rounded-[4px]">
                        Admin Dashboard
                      </Link>
                    )}
                    <Link href="/account" className="block px-3 py-2 text-[#F8FAFC] hover:bg-[#142438] rounded-[4px]">
                      My Account & Orders
                    </Link>
                    <button onClick={logout} className="w-full text-left px-3 py-2 text-red-400 hover:bg-[#142438] rounded-[4px] mt-1">
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/account" className="p-2 text-[#AAB6C4] hover:text-[#D6B36A] transition" title="Account Login">
                  <User className="w-5 h-5" />
                </Link>
              )}

              {/* Mobile Hamburger Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[#AAB6C4] hover:text-[#F8FAFC]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Sheet */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-[#0D1B2A] border-t border-[#D6B36A]/20 p-5 space-y-5 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto pb-16">
              <form onSubmit={(e) => { handleSearchSubmit(e); setMobileMenuOpen(false); }} className="relative">
                <input
                  type="text"
                  placeholder="Search watches, belts, repair..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#07111F] border border-[#D6B36A]/30 text-[#F8FAFC] placeholder-[#AAB6C4] text-xs rounded-[4px] py-2.5 pl-9 pr-3 focus:outline-none"
                />
                <Search className="w-4 h-4 text-[#D6B36A] absolute left-3 top-3" />
              </form>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => { setMobileMenuOpen(false); setRepairModalOpen(true); }}
                  className="bg-[#D6B36A] text-[#07111F] font-bold text-xs py-3 px-3 rounded-[4px] flex items-center justify-center space-x-1.5"
                >
                  <Wrench className="w-4 h-4" />
                  <span>BOOK REPAIR</span>
                </button>
                <Link
                  href="/gift-finder"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#07111F] border border-[#D6B36A]/30 text-[#F8FAFC] font-semibold text-xs py-3 px-3 rounded-[4px] flex items-center justify-center space-x-1.5"
                >
                  <Compass className="w-4 h-4 text-[#D6B36A]" />
                  <span>WATCH FINDER</span>
                </Link>
              </div>

              <div className="space-y-4 pt-2 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-[#D6B36A] uppercase tracking-widest mb-2 border-b border-[#D6B36A]/20 pb-1">
                    Watch Collections
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[#AAB6C4]">
                    <Link href="/shop/men" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Men's Watches</Link>
                    <Link href="/shop/women" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Women's Watches</Link>
                    <Link href="/shop/kids" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Kids Watches</Link>
                    <Link href="/shop/couple" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Couple Sets</Link>
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-[#D6B36A] uppercase tracking-widest mb-2 border-b border-[#D6B36A]/20 pb-1">
                    Accessories & Repair
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[#AAB6C4]">
                    <Link href="/shop/belts" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Leather Belts</Link>
                    <Link href="/shop/wallets" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Leather Wallets</Link>
                    <Link href="/shop/goggles" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] hover:text-[#F8FAFC]">Sunglasses</Link>
                    <Link href="/repair" onClick={() => setMobileMenuOpen(false)} className="bg-[#07111F] p-2.5 rounded-[4px] text-[#D6B36A] font-bold">Watch Repair</Link>
                  </div>
                </div>

                <div className="border-t border-[#D6B36A]/20 pt-3 flex flex-col space-y-3 text-sm text-[#F8FAFC] font-medium">
                  <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop All Products</Link>
                  <Link href="/brands" onClick={() => setMobileMenuOpen(false)}>Shop By Brand</Link>
                  <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>Track My Order</Link>
                  <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About Showroom</Link>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact & Directions</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Sticky Mobile Bottom Navigation Bar (Section 27) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F] border-t border-[#D6B36A]/20 px-3 py-2 flex items-center justify-around text-[10px] uppercase font-semibold text-[#AAB6C4] shadow-2xl">
        <Link href="/" className="flex flex-col items-center space-y-1 hover:text-[#D6B36A]">
          <Home className="w-4 h-4 text-[#D6B36A]" />
          <span>HOME</span>
        </Link>
        <Link href="/shop" className="flex flex-col items-center space-y-1 hover:text-[#D6B36A]">
          <Grid className="w-4 h-4 text-[#D6B36A]" />
          <span>SHOP</span>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex flex-col items-center space-y-1 hover:text-[#D6B36A]">
          <Search className="w-4 h-4 text-[#D6B36A]" />
          <span>SEARCH</span>
        </button>
        <Link href="/wishlist" className="flex flex-col items-center space-y-1 hover:text-[#D6B36A] relative">
          <Heart className="w-4 h-4 text-[#D6B36A]" />
          <span>WISHLIST</span>
        </Link>
        <Link href={user ? (isAdmin ? "/admin" : "/account") : "/account"} className="flex flex-col items-center space-y-1 hover:text-[#D6B36A]">
          <User className="w-4 h-4 text-[#D6B36A]" />
          <span>ACCOUNT</span>
        </Link>
      </div>

      {/* Quick Repair Booking Modal */}
      <QuickRepairModal isOpen={repairModalOpen} onClose={() => setRepairModalOpen(false)} />
    </>
  );
}

