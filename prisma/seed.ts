import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seeding for Govindraj Watch & Accessories...");

  // 1. Create Default Site Settings
  await prisma.siteSettings.upsert({
    where: { id: "1" },
    update: {},
    create: {
      id: "1",
      onlineOrdersEnabled: true,
      onlinePaymentEnabled: true,
      announcementText: "✨ Premium Watches • Genuine Leather Belts & Wallets • Custom Gifts • Express Repair | Naigaon Bazaar",
      whatsappNumber: "918484080732",
      storeAddress: "Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazar, Nanded, Maharashtra - 431709",
      phone: "+918484080732",
      email: "contact@govindrajwatch.shop",
      heroTitle: "TIMELESS STYLE. EVERY DAY.",
      heroSubtitle: "Naigaon Bazaar's Authorized Retailer for Titan, Fastrack, Casio, Fossil, Genuine Leather Accessories & Custom Gift Frames.",
    },
  });

  // 2. Create Default Admin User
  const adminPasswordHash = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@govindrajwatch.shop" },
    update: {},
    create: {
      name: "Govindraj Ambatwar",
      email: "admin@govindrajwatch.shop",
      phone: "+918484080732",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
    },
  });

  // 3. Create Brands
  const titan = await prisma.brand.upsert({
    where: { slug: "titan" },
    update: {},
    create: {
      name: "Titan",
      slug: "titan",
      description: "India's leading watch brand known for precision craftsmanship, Edge, Raga, and Workwear collections.",
      isFeatured: true,
    },
  });

  const fastrack = await prisma.brand.upsert({
    where: { slug: "fastrack" },
    update: {},
    create: {
      name: "Fastrack",
      slug: "fastrack",
      description: "Youthful and vibrant watch & accessories brand for trendsetters.",
      isFeatured: true,
    },
  });

  const casio = await prisma.brand.upsert({
    where: { slug: "casio" },
    update: {},
    create: {
      name: "Casio",
      slug: "casio",
      description: "World-renowned for G-Shock durability, Edifice chronographs, and Vintage digital watches.",
      isFeatured: true,
    },
  });

  const fossil = await prisma.brand.upsert({
    where: { slug: "fossil" },
    update: {},
    create: {
      name: "Fossil",
      slug: "fossil",
      description: "American vintage-inspired luxury watches and leather goods.",
      isFeatured: true,
    },
  });

  const sonata = await prisma.brand.upsert({
    where: { slug: "sonata" },
    update: {},
    create: {
      name: "Sonata",
      slug: "sonata",
      description: "Reliable, stylish, and affordable timepieces for everyday elegance and weddings.",
      isFeatured: true,
    },
  });

  const wildhorn = await prisma.brand.upsert({
    where: { slug: "wildhorn" },
    update: {},
    create: {
      name: "Wildhorn",
      slug: "wildhorn",
      description: "Handcrafted 100% genuine leather belts and RFID-blocking wallets.",
      isFeatured: true,
    },
  });

  // 4. Create Categories
  const catWatches = await prisma.category.upsert({
    where: { slug: "watches" },
    update: {},
    create: {
      name: "Watches",
      slug: "watches",
      description: "Analog, Automatic, Chronograph, Smart, Formal and Luxury watches for Men, Women and Couples.",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      isFeatured: true,
    },
  });

  const catClocks = await prisma.category.upsert({
    where: { slug: "wall-clocks" },
    update: {},
    create: {
      name: "Wall Clocks",
      slug: "wall-clocks",
      description: "Designer silent sweep wall clocks, wooden antique clocks, and Ajanta pendulum clocks.",
      image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800",
      isFeatured: true,
    },
  });

  const catBelts = await prisma.category.upsert({
    where: { slug: "belts" },
    update: {},
    create: {
      name: "Belts",
      slug: "belts",
      description: "100% genuine top-grain leather belts with auto-lock and classic pin buckles.",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800",
      isFeatured: true,
    },
  });

  const catWallets = await prisma.category.upsert({
    where: { slug: "wallets" },
    update: {},
    create: {
      name: "Wallets",
      slug: "wallets",
      description: "Slim RFID-protected bi-fold and tri-fold leather wallets.",
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
      isFeatured: true,
    },
  });

  const catGoggles = await prisma.category.upsert({
    where: { slug: "goggles" },
    update: {},
    create: {
      name: "Goggles & Sunglasses",
      slug: "goggles",
      description: "UV400 polarized aviators, wayfarers, and stylish outdoor eyewear.",
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800",
      isFeatured: true,
    },
  });

  const catGifts = await prisma.category.upsert({
    where: { slug: "gifts" },
    update: {},
    create: {
      name: "Gifts & Gift Frames",
      slug: "gifts",
      description: "Custom photo frames, couple gift hampers, anniversary mementos, and royal gift sets.",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800",
      isFeatured: true,
    },
  });

  const catBags = await prisma.category.upsert({
    where: { slug: "bags" },
    update: {},
    create: {
      name: "Bags & Backpacks",
      slug: "bags",
      description: "Ergonomic school bags, college laptop backpacks, and premium leather travel bags.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800",
      isFeatured: true,
    },
  });

  // 5. Create Products
  const productsData = [
    {
      name: "Titan Neo Workwear Blue Dial Chronograph Watch",
      slug: "titan-neo-workwear-blue-dial-chronograph",
      sku: "TT-1805NM01",
      description: "Crafted for modern professionals, this Titan Neo Workwear watch features a striking navy blue dial with sub-dials for chronograph precision, encased in a durable gunmetal stainless steel case and matching mesh bracelet.",
      shortDescription: "Titan luxury blue dial chronograph with stainless steel mesh strap.",
      price: 4995,
      mrp: 6495,
      discount: 23,
      gender: "MEN",
      style: "FORMAL",
      movement: "QUARTZ",
      dialColor: "Blue",
      strapMaterial: "Stainless Steel",
      strapColor: "Gunmetal",
      waterResistance: "50m",
      isBestseller: true,
      isNewArrival: true,
      isFeatured: true,
      categoryId: catWatches.id,
      brandId: titan.id,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800",
      ],
      specs: [
        { key: "Brand", value: "Titan" },
        { key: "Collection", value: "Neo Workwear" },
        { key: "Dial Color", value: "Navy Blue" },
        { key: "Movement", value: "Quartz Chronograph" },
        { key: "Water Resistance", value: "5 ATM" },
        { key: "Warranty", value: "2 Years International Warranty" },
      ],
    },
    {
      name: "Casio G-Shock GA-2100 Octagon 'CasiOak' Black",
      slug: "casio-g-shock-ga-2100-black-out",
      sku: "CAS-GA2100-1A1",
      description: "The viral CasiOak GA-2100 features a slim octagonal carbon core guard structure with shock resistance, 200m water resistance, world time, and LED illumination.",
      shortDescription: "Ultra-tough carbon core octagonal G-Shock in matte black.",
      price: 8995,
      mrp: 9995,
      discount: 10,
      gender: "MEN",
      style: "CASUAL",
      movement: "DIGITAL",
      dialColor: "Black",
      strapMaterial: "Resin",
      strapColor: "Matte Black",
      waterResistance: "200m",
      isBestseller: true,
      isNewArrival: false,
      isFeatured: true,
      categoryId: catWatches.id,
      brandId: casio.id,
      images: [
        "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800",
      ],
      specs: [
        { key: "Brand", value: "Casio G-Shock" },
        { key: "Case Material", value: "Carbon / Resin" },
        { key: "Water Resistance", value: "20 bar (200m)" },
        { key: "Features", value: "World Time, 5 Alarms, Stopwatch" },
      ],
    },
    {
      name: "Fastrack Revoltt FS1 Smartwatch with BT Calling",
      slug: "fastrack-revoltt-fs1-smartwatch",
      sku: "FT-38079PP01",
      description: "High-definition 1.83'' display smartwatch featuring Single-chip BT calling, 110+ sports modes, 200+ watch faces, and stress monitor.",
      shortDescription: "1.83-inch HD BT calling smartwatch with health tracking.",
      price: 1995,
      mrp: 3995,
      discount: 50,
      gender: "UNISEX",
      style: "SMART",
      movement: "SMART",
      dialColor: "Black",
      strapMaterial: "Silicone",
      strapColor: "Olive Green",
      waterResistance: "IP68",
      isBestseller: true,
      isNewArrival: true,
      isFeatured: true,
      categoryId: catWatches.id,
      brandId: fastrack.id,
      images: [
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800",
      ],
      specs: [
        { key: "Display Size", value: "1.83 Inch HD" },
        { key: "Battery Life", value: "Up to 7 Days" },
        { key: "Calling", value: "Single-Chip Bluetooth Calling" },
      ],
    },
    {
      name: "Sonata Pair Wedding Collection Gold Dial Watch Set",
      slug: "sonata-pair-wedding-collection-gold",
      sku: "SN-PAIR-77082",
      description: "Designed for couples, this Sonata Wedding Collection set includes matching Gold Dial watches for Him and Her with gold-plated stainless steel straps and champagne dials.",
      shortDescription: "Elegant couple watch gift set in rich champagne gold finish.",
      price: 3495,
      mrp: 4495,
      discount: 22,
      gender: "COUPLE",
      style: "LUXURY",
      movement: "QUARTZ",
      dialColor: "Champagne Gold",
      strapMaterial: "Gold Plated Stainless Steel",
      strapColor: "Gold",
      waterResistance: "30m",
      isBestseller: true,
      isNewArrival: false,
      isFeatured: true,
      categoryId: catWatches.id,
      brandId: sonata.id,
      images: [
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      ],
      specs: [
        { key: "Set Contains", value: "1 Gents Watch + 1 Ladies Watch" },
        { key: "Finish", value: "22k Gold Electroplated" },
        { key: "Ideal For", value: "Wedding Gift & Anniversary" },
      ],
    },
    {
      name: "Wildhorn 100% Genuine Leather Men's Belt & Wallet Gift Box",
      slug: "wildhorn-genuine-leather-belt-wallet-combo",
      sku: "WH-COMBO-01",
      description: "Premium handcrafted gift box containing a 100% top-grain black leather belt with auto-lock metal buckle and a slim bi-fold RFID-protected leather wallet.",
      shortDescription: "Authentic leather belt & wallet gift hamper for men.",
      price: 1299,
      mrp: 2499,
      discount: 48,
      gender: "MEN",
      style: "FORMAL",
      categoryId: catBelts.id,
      brandId: wildhorn.id,
      images: [
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800",
      ],
      specs: [
        { key: "Material", value: "100% Genuine Top Grain Leather" },
        { key: "Wallet Feature", value: "RFID Blocking Technology" },
        { key: "Belt Buckle", value: "Zinc Alloy Auto-lock" },
      ],
    },
    {
      name: "Ajanta Royal Silent Sweep Quartz Wall Clock 32cm",
      slug: "ajanta-royal-silent-sweep-wall-clock",
      sku: "AJ-CLOCK-320",
      description: "Non-ticking silent sweep quartz wall clock with large 3D bold numbers and elegant champagne gold frame. Perfect for living rooms, offices, and bedrooms.",
      shortDescription: "32cm silent sweep wall clock with clear bold numerals.",
      price: 850,
      mrp: 1200,
      discount: 29,
      gender: "UNISEX",
      style: "CLASSIC",
      categoryId: catClocks.id,
      brandId: titan.id,
      images: [
        "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800",
      ],
      specs: [
        { key: "Movement", value: "Silent Sweep Japanese Quartz" },
        { key: "Diameter", value: "32 cm / 12.5 Inches" },
        { key: "Battery", value: "1 AA Battery Included" },
      ],
    },
    {
      name: "Custom Personalized Royal Gold Photo Frame 12x18",
      slug: "custom-royal-gold-photo-gift-frame",
      sku: "GV-FRAME-1218",
      description: "High-grade teakwood finish photo frame with UV-resistant glass coating. Customized with high-definition printing for weddings, birthdays, and anniversaries.",
      shortDescription: "Customized royal gold photo frame for special occasions.",
      price: 1499,
      mrp: 2199,
      discount: 31,
      gender: "UNISEX",
      style: "LUXURY",
      categoryId: catGifts.id,
      brandId: sonata.id,
      images: [
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=800",
      ],
      specs: [
        { key: "Frame Size", value: "12 x 18 Inches" },
        { key: "Customization", value: "Photo Printing Included" },
        { key: "Mounting", value: "Wall Hanging & Table Top" },
      ],
    },
    {
      name: "Fastrack Polarized Wayfarer Sunglasses UV400",
      slug: "fastrack-polarized-wayfarer-sunglasses",
      sku: "FT-SUN-P182",
      description: "Lightweight polycarbonate wayfarer sunglasses with TAC polarized lenses, 100% UV400 protection against UVA/UVB rays.",
      shortDescription: "Polarized UV400 wayfarer sunglasses in matte tortoise frame.",
      price: 1595,
      mrp: 2295,
      discount: 30,
      gender: "UNISEX",
      style: "CASUAL",
      categoryId: catGoggles.id,
      brandId: fastrack.id,
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800",
      ],
      specs: [
        { key: "Lens Tech", value: "TAC Polarized UV400" },
        { key: "Frame Shape", value: "Wayfarer" },
        { key: "Weight", value: "28 grams" },
      ],
    },
  ];

  for (const item of productsData) {
    const { images, specs, ...prodData } = item;
    const createdProduct = await prisma.product.upsert({
      where: { slug: prodData.slug },
      update: {},
      create: prodData,
    });

    // Add Images
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: images[i],
          isPrimary: i === 0,
          altText: createdProduct.name,
        },
      });
    }

    // Add Specs
    for (const spec of specs) {
      await prisma.productSpecification.create({
        data: {
          productId: createdProduct.id,
          key: spec.key,
          value: spec.value,
        },
      });
    }
  }

  // 6. Testimonials
  const testimonials = [
    {
      customerName: "Rajesh Patil",
      rating: 5,
      reviewText: "Bought a Titan Chronograph watch for my wedding from Govindraj Watch Shop Naigaon. Authentic warranty card and excellent service by Govindraj sir!",
      location: "Naigaon Bazaar, Nanded",
    },
    {
      customerName: "Sunita Deshmukh",
      rating: 5,
      reviewText: "Got my vintage wall clock repaired in 20 minutes! Best watch repair technician in Naigaon. Highly recommended.",
      location: "Nanded",
    },
    {
      customerName: "Aniket Shinde",
      rating: 5,
      reviewText: "Ordered a Wildhorn genuine leather wallet and belt combo via WhatsApp. Fast local delivery and 100% original quality.",
      location: "Loha, Maharashtra",
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // 7. Seed Blogs
  const blogs = [
    {
      title: "How to Choose the Perfect Watch for Everyday & Formal Wear",
      slug: "how-to-choose-the-perfect-watch",
      excerpt: "A comprehensive guide on selecting movement types, case diameters, and strap materials for every occasion.",
      content: `Choosing the right watch is an art of blending personal aesthetics with functional utility. Whether you are stepping into an executive meeting in Nanded or celebrating a family wedding in Naigaon Bazaar, your wristwatch communicates sophistication and attention to detail.

1. Quartz vs Automatic Movements
Quartz movements are battery-powered, offering unbeatable precision (+/- 15 seconds per month) with low maintenance. Automatic mechanical watches harness energy from your wrist movement, representing centuries of horological heritage.

2. Case Size & Proportions
For wrist sizes between 6.5 to 7.5 inches, a 38mm to 42mm case diameter provides optimal proportion. Titan Neo and Casio Edifice series offer ideal sizing across all wrist profiles.

3. Leather vs Stainless Steel Straps
Leather straps (brown/black) pair exquisitely with suits and formal shirts, while stainless steel and mesh bracelets deliver versatile everyday resilience.`,
      coverImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800",
      author: "Govindraj Ambatwar",
      category: "Buying Guides",
      readTime: "5 min read",
    },
    {
      title: "Watch Battery Replacement & Water Sealing: What You Must Know",
      slug: "watch-battery-replacement-and-maintenance",
      excerpt: "Learn why professional battery replacement with genuine silver-oxide cells protects your watch movement.",
      content: `Many watch owners wait until a battery leaks or dead cells damage electronic circuits before seeking service. At Govindraj Watch Repair Station in Naigaon Bazaar, we use precision horology tools and genuine Sony/Seiko silver-oxide batteries.

Key Maintenance Tips:
- Change batteries every 18-24 months to avoid acid leakage.
- Inspect rubber gaskets whenever opening the case back to maintain water resistance.
- Avoid exposing quartz watches to high magnetic fields (speakers, induction cooktops).`,
      coverImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800",
      author: "Govindraj Repair Tech",
      category: "Watch Repair & Care",
      readTime: "4 min read",
    },
  ];

  for (const b of blogs) {
    await prisma.blog.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
