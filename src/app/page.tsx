import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Wrench,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Watch,
  Gift,
  Glasses,
  MapPin,
  Phone,
  Star,
  Compass,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";

export const revalidate = 60;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    include: { category: true, brand: true, images: true },
  });

  const categories = await prisma.category.findMany({ take: 6 });
  const testimonials = await prisma.testimonial.findMany({ take: 3 });
  const blogs = await prisma.blog.findMany({ take: 3, where: { isPublished: true } });
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="space-y-20 md:space-y-32 pb-24 bg-[#F5F1E8]">
      {/* SECTION 01 — FULL SCREEN CINEMATIC HERO (Midnight Navy #07111F) */}
      <section className="relative overflow-hidden bg-[#07111F] text-[#F8FAFC] border-b border-[#D6B36A]/20 pt-12 pb-20 lg:py-28">
        {/* Subtle Horology Clock Markings Graphic Backdrop */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[550px] h-[550px] rounded-full border border-[#D6B36A]/10 pointer-events-none hidden lg:flex items-center justify-center">
          <div className="w-[420px] h-[420px] rounded-full border border-[#D6B36A]/10 flex items-center justify-center">
            <div className="w-[280px] h-[280px] rounded-full border border-dashed border-[#D6B36A]/15" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-7 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#0D1B2A] border border-[#D6B36A]/30 px-3.5 py-1.5 rounded-[4px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D6B36A]">
                  GOVINDRAJ WATCH & ACCESSORIES • NAIGAON
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8FAFC] leading-[1.08] uppercase">
                {settings?.heroTitle || "TIME, ELEVATED."}
              </h1>

              <p className="text-[#AAB6C4] text-sm sm:text-base max-w-xl font-normal leading-relaxed">
                {settings?.heroSubtitle ||
                  "Curated watches, timeless accessories and expert watch care — all in one luxury destination."}
              </p>

              {/* Action Buttons (Sharp rectangular buttons with small 4px radius) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  href="/shop"
                  className="bg-[#D6B36A] hover:bg-[#B8964E] text-[#07111F] font-bold text-xs px-8 py-4 rounded-[4px] uppercase tracking-widest transition shadow-lg text-center flex items-center justify-center space-x-2"
                >
                  <span>EXPLORE WATCHES</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="bg-transparent hover:bg-[#0D1B2A] border border-[#F8FAFC]/30 text-[#F8FAFC] font-bold text-xs px-7 py-4 rounded-[4px] uppercase tracking-widest transition text-center flex items-center justify-center"
                >
                  <span>VISIT OUR STORE</span>
                </Link>

                <Link
                  href="/repair"
                  className="text-[#D6B36A] hover:underline font-semibold text-xs py-3 px-2 flex items-center justify-center space-x-1 sm:justify-start"
                >
                  <span>BOOK A REPAIR →</span>
                </Link>
              </div>
            </div>

            {/* Right Photography Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[8px] overflow-hidden border border-[#D6B36A]/30 bg-[#0D1B2A] p-3 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
                  alt="Editorial Horology Showcase"
                  className="w-full h-80 sm:h-96 object-contain rounded-[6px] group-hover:scale-105 transition duration-700"
                />

                <div className="absolute bottom-5 left-5 right-5 bg-[#07111F]/90 backdrop-blur-md border border-[#D6B36A]/30 p-4 rounded-[6px] flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-[#D6B36A] font-bold block">
                      FEATURED HOROLOGY
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#F8FAFC] truncate max-w-[200px] sm:max-w-none">
                      Titan Chronograph Automatic
                    </h4>
                  </div>
                  <Link
                    href="/product/titan-neo-workwear-blue-dial-chronograph"
                    className="bg-[#D6B36A] text-[#07111F] font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-[4px] hover:bg-[#B8964E] transition"
                  >
                    EXPLORE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — TRUST STRIP (Thin Champagne Borders) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-8 bg-white border border-[#E2DACD] rounded-[8px] shadow-editorial-shadow">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#07111F] border border-[#D6B36A]/30 text-[#D6B36A] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#07111F] uppercase tracking-wider">100% Authentic</h4>
              <p className="text-[11px] text-[#AAB6C4]">Authorized Dealer Guarantee</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#07111F] border border-[#D6B36A]/30 text-[#D6B36A] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#07111F] uppercase tracking-wider">Master Craftsmanship</h4>
              <p className="text-[11px] text-[#AAB6C4]">20+ Years Store Heritage</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#07111F] border border-[#D6B36A]/30 text-[#D6B36A] flex items-center justify-center flex-shrink-0">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#07111F] uppercase tracking-wider">Precision Service</h4>
              <p className="text-[11px] text-[#AAB6C4]">Battery, Glass & Movement</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-[4px] bg-[#07111F] border border-[#D6B36A]/30 text-[#D6B36A] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#07111F] uppercase tracking-wider">Concierge Support</h4>
              <p className="text-[11px] text-[#AAB6C4]">Direct Store Assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — EDITORIAL CATEGORY PRESENTATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex items-end justify-between border-b border-[#E2DACD] pb-4">
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              CURATED SELECTIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111F] uppercase tracking-tight">
              EXPLORE COLLECTIONS
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#07111F] hover:text-[#D6B36A] flex items-center space-x-1 uppercase tracking-wider transition"
          >
            <span>VIEW ALL CATALOGUE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Editorial Photographic Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Large Category Card */}
          <div className="md:col-span-7 relative rounded-[8px] overflow-hidden bg-[#07111F] border border-[#E2DACD] min-h-[360px] flex flex-col justify-end p-8 group">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800"
              alt="Men's Luxury Watches"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700"
            />
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#D6B36A]">COLLECTION 01</span>
              <h3 className="font-serif text-3xl font-bold text-[#F8FAFC]">MEN'S TIMEPIECES</h3>
              <p className="text-xs text-[#AAB6C4] max-w-md">Precision chronographs, automatics, and casual everyday wristwatches.</p>
              <Link
                href="/shop/men"
                className="inline-block mt-3 bg-[#D6B36A] text-[#07111F] font-bold text-xs px-5 py-2.5 rounded-[4px] uppercase tracking-wider hover:bg-[#B8964E] transition"
              >
                DISCOVER MEN'S →
              </Link>
            </div>
          </div>

          {/* Right 2 Stacked Category Cards */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6">
            <div className="relative rounded-[8px] overflow-hidden bg-[#07111F] border border-[#E2DACD] min-h-[170px] flex flex-col justify-end p-6 group">
              <img
                src="https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600"
                alt="Women's Watches"
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition duration-700"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#D6B36A]">COLLECTION 02</span>
                <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">WOMEN'S ELEGANCE</h3>
                <Link href="/shop/women" className="inline-block text-xs font-bold text-[#D6B36A] hover:underline uppercase tracking-wider">
                  EXPLORE WOMEN'S →
                </Link>
              </div>
            </div>

            <div className="relative rounded-[8px] overflow-hidden bg-[#07111F] border border-[#E2DACD] min-h-[170px] flex flex-col justify-end p-6 group">
              <img
                src="https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=600"
                alt="Leather Belts & Accessories"
                className="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:scale-105 transition duration-700"
              />
              <div className="relative z-10 space-y-1">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#D6B36A]">COLLECTION 03</span>
                <h3 className="font-serif text-xl font-bold text-[#F8FAFC]">LEATHER BELTS & WALLETS</h3>
                <Link href="/shop/belts" className="inline-block text-xs font-bold text-[#D6B36A] hover:underline uppercase tracking-wider">
                  EXPLORE ACCESSORIES →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — "THE EDIT" FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#E2DACD] pb-4 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              HANDPICKED SELECTION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111F] uppercase tracking-tight">
              THE EDIT
            </h2>
            <p className="text-xs text-[#AAB6C4] mt-1">A considered selection for every occasion.</p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-bold text-[#07111F] hover:text-[#D6B36A] uppercase tracking-wider transition"
          >
            SEE ALL PRODUCTS →
          </Link>
        </div>

        {/* Editorial Layout: Large Featured Left + 3 Vertical Products Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            {products[0] && <ProductCard product={products[0]} />}
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.slice(1, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 05 — BRANDS WE TRUST (Midnight Navy #07111F) */}
      <section className="bg-[#07111F] border-y border-[#D6B36A]/20 py-20 text-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-2">
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              AUTHORIZED DEALERSHIP
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-wide">
              BRANDS WE TRUST
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-center">
            {["TITAN", "FASTRACK", "CASIO", "FOSSIL", "SONATA", "WILDHORN"].map((b) => (
              <Link
                key={b}
                href={`/shop?brand=${b.toLowerCase()}`}
                className="p-6 bg-[#0D1B2A] border border-[#D6B36A]/20 rounded-[6px] hover:border-[#D6B36A] text-[#AAB6C4] hover:text-[#D6B36A] transition duration-300 font-serif font-bold tracking-widest text-base text-center"
              >
                {b}
              </Link>
            ))}
          </div>

          <div className="pt-4">
            <Link
              href="/brands"
              className="inline-block bg-[#0D1B2A] border border-[#D6B36A]/40 text-[#D6B36A] font-bold text-xs py-3 px-8 rounded-[4px] uppercase tracking-widest hover:bg-[#D6B36A] hover:text-[#07111F] transition"
            >
              EXPLORE ALL AUTHORIZED BRANDS →
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 06 — FIND YOUR TIMEPIECE (Interactive Watch Finder) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07111F] border border-[#D6B36A]/30 rounded-[8px] p-8 sm:p-14 text-[#F8FAFC] space-y-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              INTERACTIVE RECOMMENDATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight">
              FIND YOUR TIMEPIECE
            </h2>
            <p className="text-xs sm:text-sm text-[#AAB6C4] leading-relaxed">
              Tell us your style preference and occasion. We'll match you with verified stock inventory.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["CLASSIC", "SPORT", "FORMAL", "SMART", "AUTOMATIC", "EVERYDAY"].map((styleOption) => (
              <Link
                key={styleOption}
                href={`/shop?style=${styleOption.toLowerCase()}`}
                className="bg-[#0D1B2A] border border-[#D6B36A]/20 hover:border-[#D6B36A] rounded-[6px] p-5 text-center transition group"
              >
                <span className="font-serif text-sm font-bold text-[#F8FAFC] group-hover:text-[#D6B36A] block">
                  {styleOption}
                </span>
                <span className="text-[9px] text-[#AAB6C4] uppercase tracking-wider block mt-1">Explore →</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 flex justify-start">
            <Link
              href="/gift-finder"
              className="bg-[#D6B36A] text-[#07111F] font-bold text-xs py-3.5 px-8 rounded-[4px] uppercase tracking-widest hover:bg-[#B8964E] transition"
            >
              START 3-STEP WATCH QUIZ
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 07 — MARK THE MOMENT (Gifting Section Warm Ivory #F5F1E8) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="border-b border-[#E2DACD] pb-4 flex items-end justify-between">
          <div>
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              CELEBRATE MEMORIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111F] uppercase tracking-tight">
              MARK THE MOMENT
            </h2>
          </div>
          <Link href="/shop/gifts" className="text-xs font-bold text-[#07111F] hover:text-[#D6B36A] uppercase tracking-wider">
            EXPLORE GIFTS →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { title: "BIRTHDAYS", img: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=500" },
            { title: "ANNIVERSARY", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=500" },
            { title: "COUPLE GIFTS", img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=500" },
            { title: "CUSTOM FRAMES", img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=500" },
          ].map((gift, i) => (
            <Link
              key={i}
              href="/shop/gifts"
              className="group bg-white border border-[#E2DACD] rounded-[8px] overflow-hidden p-3 transition hover:border-[#D6B36A]"
            >
              <div className="aspect-square rounded-[6px] overflow-hidden mb-3 bg-[#F5F1E8]">
                <img src={gift.img} alt={gift.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-[#07111F] group-hover:text-[#D6B36A] uppercase tracking-wider text-center">
                {gift.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 08 — WATCH CARE, DONE RIGHT (Repair Workshop Midnight Navy) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#07111F] border border-[#D6B36A]/30 rounded-[8px] p-8 sm:p-14 text-[#F8FAFC] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative rounded-[6px] overflow-hidden border border-[#D6B36A]/20 min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800"
              alt="Master Watchmaker Workshop"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
              MASTER WORKSHOP
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-tight">
              KEEP YOUR TIMEPIECE AT ITS BEST.
            </h2>
            <p className="text-xs sm:text-sm text-[#AAB6C4] leading-relaxed">
              20+ Years of master watchmaking expertise in Naigaon Bazaar. Original battery replacement, Swiss oiling, scratch-proof glass change & wall clock overhauls.
            </p>

            <div className="grid grid-cols-2 gap-3 text-xs text-[#AAB6C4] font-medium pt-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span>Original Sony / Maxell Cells</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span>Swiss Moebius Movement Oiling</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span>Scratch-Resistant Glass Fitting</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D6B36A]" />
                <span>Ajanta Wall Clock Overhauls</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/repair"
                className="bg-[#D6B36A] text-[#07111F] font-bold text-xs py-3.5 px-7 rounded-[4px] uppercase tracking-widest hover:bg-[#B8964E] transition"
              >
                BOOK A REPAIR
              </Link>
              <Link
                href="/track-order"
                className="bg-transparent border border-[#F8FAFC]/30 text-[#F8FAFC] font-bold text-xs py-3.5 px-6 rounded-[4px] uppercase tracking-widest hover:bg-[#0D1B2A] transition"
              >
                CHECK REPAIR STATUS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 09 — COME SEE US (Store Experience Split Screen) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch border border-[#E2DACD] rounded-[8px] overflow-hidden bg-white shadow-editorial-shadow">
          <div className="lg:col-span-6 bg-[#07111F] text-[#F8FAFC] p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
                NAIGAON SHOWROOM
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                COME SEE US.
              </h2>
              <p className="text-xs text-[#AAB6C4] leading-relaxed">
                Govindraj Watch & Accessories • Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazar, Nanded, Maharashtra - 431709.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#AAB6C4]">
              <p><strong className="text-[#F8FAFC]">Store Timings:</strong> Monday – Sunday (9:00 AM – 9:00 PM)</p>
              <p><strong className="text-[#F8FAFC]">Phone:</strong> +91 8484080732</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://maps.google.com/?q=Naigaon+Bazar+Nanded+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D6B36A] text-[#07111F] font-bold text-xs py-3 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#B8964E] transition"
              >
                GET DIRECTIONS
              </a>
              <a
                href="tel:+918484080732"
                className="bg-[#0D1B2A] border border-[#D6B36A]/40 text-[#F8FAFC] font-bold text-xs py-3 px-6 rounded-[4px] uppercase tracking-wider hover:bg-[#142438] transition"
              >
                CALL STORE
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[320px] relative bg-gray-100">
            <iframe
              title="Govindraj Store Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.8!2d77.5321!3d18.8475!2m3!1f0!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDUwJzUxLjAiTiA3N8KwMzEnNTUuNaJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* SECTION 10 — SINGLE EDITORIAL TESTIMONIAL (Section 20) */}
      {testimonials.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
            VERIFIED REVIEWS
          </span>
          <div className="flex justify-center text-[#D6B36A]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote className="font-serif text-xl sm:text-3xl font-normal text-[#07111F] italic leading-relaxed">
            "{testimonials[0].reviewText}"
          </blockquote>
          <div>
            <h4 className="font-serif text-sm font-bold text-[#07111F] uppercase tracking-wider">
              {testimonials[0].customerName}
            </h4>
            <span className="text-[11px] text-[#AAB6C4]">{testimonials[0].location}</span>
          </div>
        </section>
      )}

      {/* SECTION 11 — THE WATCH JOURNAL (Blog Section 21) */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="border-b border-[#E2DACD] pb-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] text-[#D6B36A] uppercase font-bold tracking-[0.25em]">
                EDITORIAL JOURNAL
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#07111F] uppercase tracking-tight">
                THE WATCH JOURNAL
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-[#07111F] hover:text-[#D6B36A] uppercase tracking-wider">
              READ JOURNAL →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((b) => (
              <div key={b.id} className="bg-white border border-[#E2DACD] rounded-[8px] p-6 space-y-3 shadow-editorial-shadow">
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#D6B36A] bg-[#07111F] px-2.5 py-1 rounded-[4px]">
                  {b.category}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#07111F] hover:text-[#D6B36A] transition">
                  <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                </h3>
                <p className="text-xs text-[#AAB6C4] line-clamp-2">{b.excerpt}</p>
                <Link href={`/blog/${b.slug}`} className="inline-block text-xs font-bold text-[#07111F] hover:text-[#D6B36A] uppercase tracking-wider">
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
