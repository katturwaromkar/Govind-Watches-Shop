# Govindraj Watch & Accessories — Production E-Commerce Platform

A complete, production-ready, full-stack luxury e-commerce platform built for **Govindraj Watch & Accessories** based in Naigaon Bazaar, Nanded, Maharashtra.

This platform replaces the legacy website with a modern Indian watch retail experience (combining UX patterns from Titan and Just In Time) while preserving all authentic business data, repair services, authorized brand partnerships, and WhatsApp local commerce.

---

## 🌟 Key Features

1. **Luxury Design System & Aesthetics**:
   - Deep Charcoal (`#0B0D12`) & Rich Gold (`#C5A059` / `#D4AF37`) luxury theme.
   - Micro-animations, responsive layout across all device viewports (320px to 1920px).
   - Glassmorphic hero elements, trust strips, and category tiles.

2. **Full E-Commerce Journey**:
   - Multi-level header with dynamic Announcement Bar, live search with autocomplete, mega-menus for Men, Women, Couple Sets, Clocks, Accessories, and Gifts.
   - Product Listing Page (PLP) with multi-facet sidebar filtering (Category, Brand, Gender, Style, Price Range) and sorting.
   - Product Detail Page (PDP) with image gallery thumbnails, INR price formatting, MRP strikethrough, discount calculation, pincode express delivery checker, and specifications table.
   - Persistent Shopping Cart Drawer & Wishlist.
   - Multi-step Checkout with Cash on Delivery (COD), Razorpay Online Payment architecture, and WhatsApp Enquiry mode.
   - Live Order Tracking (`/track-order`) using Order ID (`GOV-2026-XXXX`).

3. **Watch & Accessories Repair Hub (`/repair`)**:
   - Interactive appointment booking system for battery change, glass fitting, Swiss machine servicing, strap/chain sizing, and wall clock repairs.
   - Generates Repair Request ID (`REP-2026-XXXX`) and direct WhatsApp notification link for master watchmaker Govindraj Ambatwar.

4. **3-Step Watch & Gift Finder Quiz (`/gift-finder`)**:
   - 3-click interactive wizard matching Who you're shopping for, Budget, and Style against real database products.

5. **Comprehensive Admin Portal (`/admin`)**:
   - Secured admin login (`admin@govindrajwatch.shop` / `admin123`).
   - Real-time Analytics Dashboard (Total Revenue, Orders, Repairs, Product count).
   - Product CRUD, Order Status workflow management, Repair Request status tracking.
   - Site Controls: Toggles for Online Orders ON/OFF, Razorpay Payment ON/OFF, and editable Announcement Bar / Hero CMS.
   - One-click JSON Data Backup export.

6. **SEO & Performance**:
   - Dynamic `sitemap.xml` and `robots.txt`.
   - LocalBusiness and Product JSON-LD Schema.org structured data.

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend & Database**: Next.js API Routes, Prisma ORM, SQLite (local development) / PostgreSQL (production deployment).
- **Authentication**: JWT & bcrypt password hashing with HTTP-only cookies.
- **Commerce Integrations**: Razorpay SDK architecture, WhatsApp API message builders.

---

## 🚀 Getting Started

### 1. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Default `.env` configuration:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="govindraj_secret_key_2026_default"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
WHATSAPP_NUMBER="918484080732"
NEXT_PUBLIC_WHATSAPP_NUMBER="918484080732"
RAZORPAY_KEY_ID="rzp_test_govindraj123"
```

### 2. Database Migration & Seeding
Push schema and seed initial authentic products & admin user:
```bash
npx prisma db push
npm run db:seed
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Admin Credentials

- **Admin Login Route**: `/account` or `/admin`
- **Email**: `admin@govindrajwatch.shop`
- **Password**: `admin123`

---

## 📦 Production Build & Vercel Deployment

```bash
npm run build
npm start
```

For Vercel deployment:
1. Connect GitHub repository to Vercel.
2. Set Environment Variables (`DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_SITE_URL`).
3. Vercel automatically runs `prisma generate && next build`.
