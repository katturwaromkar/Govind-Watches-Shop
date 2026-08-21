import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import CartDrawer from "@/components/layout/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  minimumScale: 1.0,
  userScalable: false,
  themeColor: "#07111F",
};

export const metadata: Metadata = {
  title: "Govindraj Watch & Gifts | Best Watch & Accessories Shop in Naigaon Bazaar",
  description:
    "Official website for Govindraj Watch & Gifts Shop in Naigaon Bazaar, Maharashtra. Authorized dealer for Titan, Sonata, Fastrack, Casio G-Shock & Fossil watches, genuine leather belts, wallets, sunglasses & master watch repair hub.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  keywords: [
    "Govindraj Watch Shop",
    "Govindraj Watch Naigaon",
    "Best watch shop in India",
    "Titan Watches Naigaon",
    "Casio G-Shock Nanded",
    "Fastrack Watches",
    "Watch Repairing Naigaon",
    "Leather Belts Wallets",
    "Gift Frames Naigaon",
  ],
  authors: [{ name: "Govindraj Ambatwar" }],
  openGraph: {
    title: "Govindraj Watch & Accessories | Premium Watch & Repair Shop",
    description: "Naigaon Bazaar's premier luxury showroom for branded watches, genuine leather accessories, custom gifts, and watch repairs.",
    url: "https://www.govindrajwatch.shop/",
    siteName: "Govindraj Watch Shop",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
        width: 1200,
        height: 630,
        alt: "Govindraj Watch & Accessories",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Store", "LocalBusiness", "WatchStore"],
              name: "Govindraj Watch & Accessories",
              image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
              telephone: "+918484080732",
              email: "contact@govindrajwatch.shop",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Medewar Complex, Below Bank of Buldhana, Main Road",
                addressLocality: "Naigaon Bazar",
                addressRegion: "Maharashtra",
                postalCode: "431709",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 18.8475,
                longitude: 77.5321,
              },
              url: "https://www.govindrajwatch.shop/",
              priceRange: "₹",
            }),
          }}
        />
      </head>
      <body className="bg-[#FAF9F6] text-[#121212] min-h-screen font-sans flex flex-col antialiased selection:bg-[#C5A880] selection:text-white">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingWhatsApp />
              <CartDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
