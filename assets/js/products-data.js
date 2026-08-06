/* ==========================================================================
   GOVINDRAJ WATCH & MEN ACCESSORIES SHOP - PRODUCTS DATABASE (products-data.js)
   225+ Products across 13 Categories with INR Pricing & SVG Visual Generators
   ========================================================================== */

// Helper to generate dynamic luxury SVG Data URIs for product images
function generateProductSVG(title, category, primaryHex = '#d4af37') {
  const categoryVisuals = {
    'watches': `
      <!-- Watch Dial Visual -->
      <circle cx="300" cy="250" r="140" fill="#0b0f19" stroke="${primaryHex}" stroke-width="6"/>
      <circle cx="300" cy="250" r="128" fill="none" stroke="rgba(212,175,55,0.3)" stroke-width="2" stroke-dasharray="4 6"/>
      <!-- Hour Ticks -->
      <line x1="300" y1="120" x2="300" y2="135" stroke="${primaryHex}" stroke-width="4"/>
      <line x1="430" y1="250" x2="415" y2="250" stroke="${primaryHex}" stroke-width="4"/>
      <line x1="300" y1="380" x2="300" y2="365" stroke="${primaryHex}" stroke-width="4"/>
      <line x1="170" y1="250" x2="185" y2="250" stroke="${primaryHex}" stroke-width="4"/>
      <!-- Hands -->
      <line x1="300" y1="250" x2="360" y2="200" stroke="${primaryHex}" stroke-width="4" stroke-linecap="round"/>
      <line x1="300" y1="250" x2="250" y2="170" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <circle cx="300" cy="250" r="8" fill="${primaryHex}"/>
      <!-- Sapphire shine -->
      <path d="M 200,170 A 130,130 0 0,1 400,170 Z" fill="rgba(255,255,255,0.06)"/>
    `,
    'wall-clocks': `
      <!-- Wall Clock Visual -->
      <rect x="160" y="110" width="280" height="280" rx="30" fill="#121826" stroke="${primaryHex}" stroke-width="5"/>
      <circle cx="300" cy="250" r="110" fill="#0a0d14" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
      <text x="300" y="170" font-family="Times New Roman, serif" font-size="24" fill="${primaryHex}" text-anchor="middle">XII</text>
      <text x="380" y="258" font-family="Times New Roman, serif" font-size="24" fill="${primaryHex}" text-anchor="middle">III</text>
      <text x="300" y="340" font-family="Times New Roman, serif" font-size="24" fill="${primaryHex}" text-anchor="middle">VI</text>
      <text x="220" y="258" font-family="Times New Roman, serif" font-size="24" fill="${primaryHex}" text-anchor="middle">IX</text>
      <line x1="300" y1="250" x2="340" y2="210" stroke="${primaryHex}" stroke-width="4" stroke-linecap="round"/>
      <line x1="300" y1="250" x2="300" y2="180" stroke="#ffffff" stroke-width="2"/>
      <circle cx="300" cy="250" r="6" fill="${primaryHex}"/>
    `,
    'belts': `
      <!-- Leather Belt Visual -->
      <rect x="100" y="210" width="400" height="60" rx="12" fill="#5c2e0b" stroke="#8b4513" stroke-width="3"/>
      <path d="M 120,240 L 480,240" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="6 6"/>
      <!-- Metallic Buckle -->
      <rect x="420" y="190" width="80" height="100" rx="14" fill="none" stroke="${primaryHex}" stroke-width="8"/>
      <line x1="460" y1="190" x2="460" y2="290" stroke="${primaryHex}" stroke-width="6"/>
      <circle cx="200" cy="240" r="5" fill="#121826"/>
      <circle cx="240" cy="240" r="5" fill="#121826"/>
      <circle cx="280" cy="240" r="5" fill="#121826"/>
    `,
    'wallets': `
      <!-- Leather Wallet Visual -->
      <rect x="140" y="140" width="320" height="220" rx="20" fill="#4a2408" stroke="${primaryHex}" stroke-width="4"/>
      <path d="M 140,250 C 250,270 350,270 460,250" fill="none" stroke="rgba(255,255,255,0.15)" stroke-dasharray="5 5"/>
      <rect x="370" y="210" width="80" height="60" rx="10" fill="#2d1504" stroke="${primaryHex}" stroke-width="2"/>
      <circle cx="410" cy="240" r="8" fill="${primaryHex}"/>
      <text x="300" y="200" font-family="Outfit, sans-serif" font-weight="bold" font-size="16" fill="rgba(255,255,255,0.4)" text-anchor="middle">GENUINE LEATHER</text>
    `,
    'goggles': `
      <!-- Sunglasses Visual -->
      <path d="M 160,230 Q 230,170 300,230 Q 370,170 440,230 C 420,300 320,300 300,230 C 280,300 180,300 160,230 Z" fill="#111827" stroke="${primaryHex}" stroke-width="6"/>
      <!-- Lenses gradient -->
      <ellipse cx="230" cy="240" rx="60" ry="40" fill="url(#lensGrad)"/>
      <ellipse cx="370" cy="240" rx="60" ry="40" fill="url(#lensGrad)"/>
      <line x1="290" y1="220" x2="310" y2="220" stroke="${primaryHex}" stroke-width="6"/>
    `,
    'caps': `
      <!-- Cap Visual -->
      <path d="M 160,280 C 160,160 440,160 440,280 Z" fill="#1f2937" stroke="${primaryHex}" stroke-width="4"/>
      <path d="M 140,280 Q 300,320 460,280 L 510,310 Q 300,360 140,280 Z" fill="#111827" stroke="${primaryHex}" stroke-width="3"/>
      <circle cx="300" cy="180" r="10" fill="${primaryHex}"/>
      <text x="300" y="250" font-family="Outfit, sans-serif" font-weight="900" font-size="32" fill="${primaryHex}" text-anchor="middle">G</text>
    `,
    'keychains': `
      <!-- Keychain Visual -->
      <circle cx="300" cy="160" r="45" fill="none" stroke="${primaryHex}" stroke-width="8"/>
      <rect x="290" y="200" width="20" height="40" fill="${primaryHex}"/>
      <rect x="240" y="240" width="120" height="150" rx="16" fill="#1e293b" stroke="${primaryHex}" stroke-width="4"/>
      <circle cx="300" cy="315" r="30" fill="none" stroke="${primaryHex}" stroke-width="3"/>
      <text x="300" y="322" font-family="Outfit, sans-serif" font-weight="bold" font-size="20" fill="#ffffff" text-anchor="middle">G</text>
    `,
    'gift-frames': `
      <!-- Gift Frame Visual -->
      <rect x="150" y="110" width="300" height="300" rx="16" fill="#1e1b4b" stroke="${primaryHex}" stroke-width="8"/>
      <rect x="180" y="140" width="240" height="240" fill="#0f172a" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <path d="M 240,280 C 240,210 360,210 360,280 Z" fill="none" stroke="${primaryHex}" stroke-width="3"/>
      <circle cx="300" cy="220" r="25" fill="none" stroke="${primaryHex}" stroke-width="3"/>
      <text x="300" y="340" font-family="Georgia, serif" font-size="16" fill="#f8fafc" text-anchor="middle">Happy Wedding</text>
    `,
    'school-bags': `
      <!-- Backpack Visual -->
      <rect x="180" y="140" width="240" height="280" rx="40" fill="#1e293b" stroke="${primaryHex}" stroke-width="5"/>
      <path d="M 230,140 C 230,90 370,90 370,140" fill="none" stroke="${primaryHex}" stroke-width="6"/>
      <rect x="210" y="260" width="180" height="130" rx="16" fill="#0f172a" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
      <line x1="230" y1="290" x2="370" y2="290" stroke="${primaryHex}" stroke-width="3"/>
    `,
    'college-bags': `
      <!-- College Backpack Visual -->
      <rect x="180" y="130" width="240" height="290" rx="30" fill="#0f172a" stroke="${primaryHex}" stroke-width="5"/>
      <rect x="200" y="240" width="200" height="150" rx="14" fill="#1e293b" stroke="${primaryHex}" stroke-width="2"/>
      <circle cx="300" cy="180" r="20" fill="rgba(var(--primary-rgb), 0.2)" stroke="${primaryHex}" stroke-width="2"/>
      <line x1="200" y1="220" x2="400" y2="220" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    `,
    'laptop-bags': `
      <!-- Executive Laptop Briefcase Visual -->
      <rect x="140" y="160" width="320" height="230" rx="16" fill="#18181b" stroke="${primaryHex}" stroke-width="5"/>
      <path d="M 240,160 L 240,120 Q 300,100 360,120 L 360,160" fill="none" stroke="${primaryHex}" stroke-width="6"/>
      <rect x="140" y="260" width="320" height="12" fill="${primaryHex}"/>
      <circle cx="300" cy="210" r="16" fill="none" stroke="${primaryHex}" stroke-width="2"/>
    `,
    'tour-bags': `
      <!-- Travel Duffel / Trolley Visual -->
      <rect x="140" y="150" width="320" height="220" rx="30" fill="#0c4a6e" stroke="${primaryHex}" stroke-width="5"/>
      <line x1="140" y1="200" x2="460" y2="200" stroke="${primaryHex}" stroke-width="3"/>
      <line x1="140" y1="320" x2="460" y2="320" stroke="${primaryHex}" stroke-width="3"/>
      <circle cx="180" cy="385" r="14" fill="#334155" stroke="${primaryHex}" stroke-width="3"/>
      <circle cx="420" cy="385" r="14" fill="#334155" stroke="${primaryHex}" stroke-width="3"/>
    `,
    'gifts': `
      <!-- Royal Gift Box Visual -->
      <rect x="170" y="180" width="260" height="200" rx="16" fill="#881337" stroke="${primaryHex}" stroke-width="5"/>
      <!-- Ribbon vertical & horizontal -->
      <rect x="280" y="180" width="40" height="200" fill="${primaryHex}"/>
      <rect x="170" y="260" width="260" height="40" fill="${primaryHex}"/>
      <!-- Bow -->
      <circle cx="260" cy="165" r="22" fill="none" stroke="${primaryHex}" stroke-width="5"/>
      <circle cx="340" cy="165" r="22" fill="none" stroke="${primaryHex}" stroke-width="5"/>
      <circle cx="300" cy="170" r="12" fill="#fff"/>
    `
  };

  const visualHTML = categoryVisuals[category] || categoryVisuals['watches'];

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
    <defs>
      <radialGradient id="grad" cx="50%" cy="40%" r="75%">
        <stop offset="0%" stop-color="#1e2638"/>
        <stop offset="100%" stop-color="#080c14"/>
      </radialGradient>
      <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#0369a1" stop-opacity="0.9"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <rect width="600" height="600" fill="url(#grad)"/>
    <!-- Subtle Background Rings -->
    <circle cx="300" cy="250" r="210" fill="none" stroke="${primaryHex}" stroke-width="1.5" opacity="0.15" stroke-dasharray="6 6"/>
    <circle cx="300" cy="250" r="180" fill="none" stroke="${primaryHex}" stroke-width="1" opacity="0.25"/>
    
    <!-- Category Visual Illustration -->
    <g filter="url(#glow)">
      ${visualHTML}
    </g>

    <!-- Bottom Info Card Overlay -->
    <rect x="40" y="470" width="520" height="90" rx="18" fill="rgba(15, 23, 42, 0.85)" stroke="rgba(212, 175, 55, 0.3)" stroke-width="1.5"/>
    <text x="300" y="512" font-family="Outfit, Arial, sans-serif" font-weight="bold" font-size="21" fill="#ffffff" text-anchor="middle">${title.substring(0, 34)}</text>
    <text x="300" y="540" font-family="Inter, sans-serif" font-weight="600" font-size="13" fill="${primaryHex}" text-anchor="middle" letter-spacing="3">GOVINDRAJ EXCLUSIVE COLLECTION</text>
  </svg>`;

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
}

const RAW_PRODUCTS = [
  // ---------------- WATCHES (Titan, Fastrack, Casio, Fossil, Seiko, Sonata, boAt) ----------------
  { id: 'w1', name: 'Titan Edge Slim Ceramic Black Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 4999, oldPrice: 8999, brand: 'Titan', collection: 'Titan Edge', movement: 'Quartz Ultra-Slim', strap: 'Ceramic & Steel', waterResistance: '30M Splash Resistant', warranty: '2 Years Brand Warranty', desc: 'World’s slimmest ceramic watch with sapphire crystal glass and midnight black dial.' },
  { id: 'w2', name: 'Titan Nebula 18K Gold Craftsmanship Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 12999, oldPrice: 19999, brand: 'Titan', collection: 'Nebula Gold', movement: 'Swiss Quartz', strap: 'Genuine Leather', waterResistance: '30M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Royal 18K solid gold plated bezel luxury watch crafted for executive grandeur.' },
  { id: 'w3', name: 'Titan Raga Viva Rose Gold Designer Watch', category: 'watches', subCategory: 'women', gender: 'women', price: 3499, oldPrice: 5999, brand: 'Titan', collection: 'Titan Raga', movement: 'Quartz', strap: 'Rose Gold Mesh', waterResistance: '30M Splash Resistant', warranty: '2 Years Brand Warranty', desc: 'Jewelry inspired mother-of-pearl dial watch adorned with Swarovski crystal elements.' },
  { id: 'w4', name: 'Titan Octane Silver Chronograph Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 2899, oldPrice: 4999, brand: 'Titan', collection: 'Octane', movement: 'Chronograph Quartz', strap: 'Stainless Steel', waterResistance: '50M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Motorsport inspired multi-dial chronograph watch with tachymeter bezel.' },
  { id: 'w5', name: 'Titan Grandmaster Chess Series Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 3999, oldPrice: 6999, brand: 'Titan', collection: 'Grandmaster', movement: 'Quartz', strap: 'Genuine Leather', waterResistance: '50M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Limited edition strategic design with checkered dial motif and sapphire glass.' },
  { id: 'w6', name: 'Titan Smart Talk AMOLED Smartwatch', category: 'watches', subCategory: 'boys', gender: 'unisex', price: 2999, oldPrice: 5499, brand: 'Titan', collection: 'Titan Smart', movement: 'Smart BT Calling', strap: 'Silicone', waterResistance: 'IP68 Waterproof', warranty: '1 Year Brand Warranty', desc: '1.78" AMOLED screen with Bluetooth HD calling, 100+ sports modes, and SpO2 tracking.' },
  { id: 'w7', name: 'Fastrack Revoltt FS1 Pro Smartwatch', category: 'watches', subCategory: 'boys', gender: 'unisex', price: 1999, oldPrice: 3999, brand: 'Fastrack', collection: 'Fastrack Smart', movement: 'Smart BT Calling', strap: 'Soft Silicone', waterResistance: 'IP68 Waterproof', warranty: '1 Year Brand Warranty', desc: 'Super AMOLED curved display with SingleSync BT calling & fast charging.' },
  { id: 'w8', name: 'Fastrack Trendies Sporty Chrono Watch', category: 'watches', subCategory: 'boys', gender: 'men', price: 1299, oldPrice: 2299, brand: 'Fastrack', collection: 'Trendies', movement: 'Quartz', strap: 'Polyurethane Rubber', waterResistance: '50M Water Resistant', warranty: '1 Year Brand Warranty', desc: 'Edgy neon accents on matte black dial built for active urban youth.' },
  { id: 'w9', name: 'Casio G-Shock Oak GA-2100 Black', category: 'watches', subCategory: 'men', gender: 'men', price: 6499, oldPrice: 9999, brand: 'Casio', collection: 'G-Shock', movement: 'Ana-Digi Quartz', strap: 'Resin Band', waterResistance: '200M Professional', warranty: '2 Years Brand Warranty', desc: 'Carbon Core Guard octagonal bezel ultra-durable shock resistant watch.' },
  { id: 'w10', name: 'Casio Edifice Solar Chronograph Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 7999, oldPrice: 12999, brand: 'Casio', collection: 'Edifice', movement: 'Tough Solar Quartz', strap: 'Solid Stainless Steel', waterResistance: '100M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Solar powered high-speed intelligence chronograph with blue ion plated bezel.' },
  { id: 'w11', name: 'Casio Vintage Gold Digital Watch A168', category: 'watches', subCategory: 'men', gender: 'unisex', price: 1599, oldPrice: 2499, brand: 'Casio', collection: 'Vintage', movement: 'Digital Quartz', strap: 'Gold Stainless Steel', waterResistance: 'Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Retro iconic gold digital watch with ElectroLuminescence backlight.' },
  { id: 'w12', name: 'Fossil Grant Chronograph Leather Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 5499, oldPrice: 9999, brand: 'Fossil', collection: 'Grant', movement: 'Quartz Chronograph', strap: 'Full Grain Leather', waterResistance: '50M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Classic Roman numeral cream dial with rich dark brown leather strap.' },
  { id: 'w13', name: 'Seiko 5 Sports Automatic Steel Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 18999, oldPrice: 24999, brand: 'Seiko', collection: 'Seiko 5', movement: 'Automatic Mechanical', strap: 'Stainless Steel', waterResistance: '100M Water Resistant', warranty: '2 Years International', desc: 'Japanese 4R36 automatic movement with exhibition case back & rotating bezel.' },
  { id: 'w14', name: 'Sonata Wedding Pair Gold Watch Set', category: 'watches', subCategory: 'women', gender: 'unisex', price: 2199, oldPrice: 3999, brand: 'Sonata', collection: 'Pair Watches', movement: 'Quartz', strap: 'Gold Plated Stainless Steel', waterResistance: '30M Splash Resistant', warranty: '1 Year Brand Warranty', desc: 'Matching couple watch gift set with golden champagne dials.' },
  { id: 'w15', name: 'Rolex Style President Day-Date Gold Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 2499, oldPrice: 4999, brand: 'Govindraj Luxury', collection: 'Executive', movement: 'Automatic Self-Wind', strap: 'President Gold Bracelet', waterResistance: '30M Water Resistant', warranty: '1 Year Shop Warranty', desc: 'Presidential fluted gold bezel with diamond hour indices.' },
  { id: 'w16', name: 'boAt Wave Call Bluetooth Calling Smartwatch', category: 'watches', subCategory: 'boys', gender: 'unisex', price: 1799, oldPrice: 4990, brand: 'boAt', collection: 'Wave Series', movement: 'Smart BT Calling', strap: 'Silicone Strap', waterResistance: 'IP68 Waterproof', warranty: '1 Year Brand Warranty', desc: 'HD Curved display with advanced fitness tracking and Bluetooth calling.' },
  { id: 'w17', name: 'boAt Xtend Smartwatch with Alexa Built-In', category: 'watches', subCategory: 'boys', gender: 'unisex', price: 1999, oldPrice: 5990, brand: 'boAt', collection: 'Xtend Series', movement: 'Smart Watch OS', strap: 'Silicone Strap', waterResistance: '5 ATM Water Resistance', warranty: '1 Year Brand Warranty', desc: '1.69" LCD Display with stress monitor and custom watch faces.' },
  { id: 'w18', name: 'boAt Lunar Peak AMOLED Metallic Smartwatch', category: 'watches', subCategory: 'men', gender: 'men', price: 2499, oldPrice: 6990, brand: 'boAt', collection: 'Lunar Series', movement: 'AMOLED Smart OS', strap: 'Metal Chain Strap', waterResistance: 'IP68 Waterproof', warranty: '1 Year Brand Warranty', desc: 'Premium metallic body with Always-On AMOLED screen and heart rate monitor.' },
  { id: 'w12', name: 'Fossil Grant Roman Chronograph Leather', category: 'watches', subCategory: 'men', gender: 'men', price: 3499, oldPrice: 5999, brand: 'Fossil', collection: 'Grant', movement: 'Quartz Chronograph', strap: 'Genuine Leather', waterResistance: '50M Water Resistant', warranty: '2 Years Brand Warranty', desc: 'Vintage American heritage brown leather strap watch with cream dial and Roman numerals.' },
  { id: 'w13', name: 'Seiko 5 Sports Automatic Steel Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 8999, oldPrice: 14999, brand: 'Seiko', collection: 'Seiko 5', movement: 'Automatic Self-Winding', strap: 'Stainless Steel', waterResistance: '100M Water Resistant', warranty: '2 Years Brand Warranty', desc: '24-jewel automatic mechanical movement watch with transparent case back.' },
  { id: 'w14', name: 'Sonata Wedding Collection Couple Set', category: 'watches', subCategory: 'women', gender: 'unisex', price: 3999, oldPrice: 6500, brand: 'Sonata', collection: 'Wedding', movement: 'Quartz', strap: 'Gold Stainless Steel', waterResistance: '30M Splash Resistant', warranty: '1 Year Brand Warranty', desc: 'Matching pair of gold plated luxury watches presented in velvet gift box.' },
  { id: 'w15', name: 'Rolex Style President Day-Date Gold Watch', category: 'watches', subCategory: 'men', gender: 'men', price: 4999, oldPrice: 9999, brand: 'Govindraj Luxury', collection: 'Presidential', movement: 'Automatic', strap: 'Gold Stainless Steel', waterResistance: '50M Water Resistant', warranty: '1 Year Shop Guarantee', desc: 'Fluted bezel day-date window executive watch with magnified crystal lens.' },

  // ---------------- WALL CLOCKS (15 Items) ----------------
  { id: 'wc1', name: 'Ajanta Royal Antique Pendulum Wall Clock', category: 'wall-clocks', subCategory: 'classic', price: 1499, oldPrice: 2499, brand: 'Ajanta', desc: 'Classic wooden finish wall clock with hourly chime and pendulum.' },
  { id: 'wc2', name: 'Modern Minimalist Silent Sweep Wall Clock', category: 'wall-clocks', subCategory: 'modern', price: 899, oldPrice: 1599, brand: 'Govindraj Home', desc: 'Non-ticking silent sweep quartz movement clock for bedrooms & offices.' },
  { id: 'wc3', name: 'Luxury Sunburst Crystal Gold Wall Clock', category: 'wall-clocks', subCategory: 'luxury', price: 2999, oldPrice: 4999, brand: 'Govindraj Home', desc: '3D metallic gold sunburst clock studded with sparkling crystals.' },
  { id: 'wc4', name: 'Designer Peacock Art Wall Clock 3D', category: 'wall-clocks', subCategory: 'designer', price: 3499, oldPrice: 5999, brand: 'Govindraj Home', desc: 'Handcrafted royal peacock metal art clock for living room decor.' },
  { id: 'wc5', name: 'Ajanta Square Digital Calendar Wall Clock', category: 'wall-clocks', subCategory: 'modern', price: 1199, oldPrice: 1899, brand: 'Ajanta', desc: 'Large LED display showing time, date, day, and room temperature.' },
  { id: 'wc6', name: 'Vintage Wooden Railway Dial Wall Clock', category: 'wall-clocks', subCategory: 'classic', price: 1299, oldPrice: 2199, brand: 'Ajanta', desc: 'Double-sided vintage station clock with wrought iron bracket.' },
  { id: 'wc7', name: 'Nordic Geometric Abstract Art Wall Clock', category: 'wall-clocks', subCategory: 'modern', price: 1799, oldPrice: 2999, brand: 'Govindraj Home', desc: 'Modern Scandinavian art wall clock with marble texture dial.' },
  { id: 'wc8', name: 'Royal Maharani Carved Wooden Clock', category: 'wall-clocks', subCategory: 'classic', price: 2199, oldPrice: 3899, brand: 'Govindraj Home', desc: 'Hand-carved teak wood frame wall clock with brass numerals.' },
  { id: 'wc9', name: 'Glow in Dark Silent Night Wall Clock', category: 'wall-clocks', subCategory: 'modern', price: 999, oldPrice: 1699, brand: 'Ajanta', desc: 'Luminous numbers dial that glows softly in dark bedrooms.' },
  { id: 'wc10', name: 'Luxury Oversized Metallic Gear Wall Clock', category: 'wall-clocks', subCategory: 'luxury', price: 3999, oldPrice: 6999, brand: 'Govindraj Home', desc: 'Industrial steampunk moving gear clock crafted from pure steel.' },
  { id: 'wc11', name: 'Modern Round Glass Wall Clock 12-Inch', category: 'wall-clocks', subCategory: 'modern', price: 699, oldPrice: 1199, brand: 'Ajanta', desc: 'Tempered glass wall clock with metallic numbers.' },
  { id: 'wc12', name: 'Classic Wooden Cuckoo Wall Clock', category: 'wall-clocks', subCategory: 'classic', price: 2499, oldPrice: 4299, brand: 'Govindraj Home', desc: 'Traditional Swiss chalet style cuckoo clock with pinecone weights.' },
  { id: 'wc13', name: '3D DIY Frameless Mirror Wall Clock', category: 'wall-clocks', subCategory: 'designer', price: 599, oldPrice: 999, brand: 'Govindraj Home', desc: 'Self-adhesive acrylic mirror number wall sticker clock.' },
  { id: 'wc14', name: 'Executive Wooden Desk & Wall Combo Clock', category: 'wall-clocks', subCategory: 'designer', price: 1399, oldPrice: 2299, brand: 'Ajanta', desc: 'Dual purpose solid rosewood clock suitable for walls or study desks.' },
  { id: 'wc15', name: 'Floral Designer Acrylic Wall Clock', category: 'wall-clocks', subCategory: 'designer', price: 1099, oldPrice: 1799, brand: 'Govindraj Home', desc: 'Artistic flower petal pattern laser cut acrylic wall clock.' },

  // ---------------- BELTS (15 Items) ----------------
  { id: 'b1', name: 'Wildhorn Genuine Leather Reversible Belt', category: 'belts', subCategory: 'leather', gender: 'men', price: 799, oldPrice: 1599, brand: 'Wildhorn', desc: '100% full grain genuine leather belt with dual-sided Black & Brown swivel buckle.' },
  { id: 'b2', name: 'Govindraj Executive Formal Pin Buckle Belt', category: 'belts', subCategory: 'formal', gender: 'men', price: 599, oldPrice: 1199, brand: 'Govindraj Accessories', desc: 'Sleek black leather formal belt with polished silver alloy buckle.' },
  { id: 'b3', name: 'Automatic Ratchet Click Leather Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 899, oldPrice: 1799, brand: 'Govindraj Accessories', desc: 'Custom micro-adjustable ratchet sliding buckle belt without holes.' },
  { id: 'b4', name: 'Tommy Hilfiger Style Casual Canvas Web Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 399, oldPrice: 799, brand: 'Govindraj Accessories', desc: 'High density woven fabric canvas belt with double D-ring buckle.' },
  { id: 'b5', name: 'Boys Adjustable Elastic Casual Belt', category: 'belts', subCategory: 'boys', gender: 'kids', price: 299, oldPrice: 499, brand: 'Govindraj Kids', desc: 'Stretchable elastic woven belt for school and casual outings.' },
  { id: 'b6', name: 'Levi’s Style Heavy Duty Denim Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 699, oldPrice: 1299, brand: 'Govindraj Accessories', desc: 'Vintage distressed tan leather belt designed for jeans.' },
  { id: 'b7', name: 'Premium Croco Textured Leather Belt', category: 'belts', subCategory: 'leather', gender: 'men', price: 999, oldPrice: 1999, brand: 'Wildhorn', desc: 'Luxury crocodile skin embossed leather belt with matte black buckle.' },
  { id: 'b8', name: 'Formal Matte Black Automatic Buckle Belt', category: 'belts', subCategory: 'formal', gender: 'men', price: 849, oldPrice: 1599, brand: 'Govindraj Accessories', desc: 'Elegant matte finish automatic lock belt for tuxedos and business suits.' },
  { id: 'b9', name: 'Boys Formal Black School Uniform Belt', category: 'belts', subCategory: 'boys', gender: 'kids', price: 249, oldPrice: 399, brand: 'Govindraj Kids', desc: 'Durable synthetic leather belt with strong chrome buckle.' },
  { id: 'b10', name: 'Braided Woven Genuine Leather Stretch Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 749, oldPrice: 1399, brand: 'Wildhorn', desc: 'Hand-woven braided leather strap for golf & casual wear.' },
  { id: 'b11', name: 'Govindraj Signature Gold Buckle Leather Belt', category: 'belts', subCategory: 'leather', gender: 'men', price: 1199, oldPrice: 2299, brand: 'Govindraj Accessories', desc: 'Luxury thick bridle leather belt with solid brass gold buckle.' },
  { id: 'b12', name: 'Tactical Military Nylon Webbing Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 449, oldPrice: 899, brand: 'Govindraj Accessories', desc: 'Quick release metal cobra buckle heavy-duty tactical belt.' },
  { id: 'b13', name: 'Slim Fit Designer Italian Leather Belt', category: 'belts', subCategory: 'formal', gender: 'men', price: 1099, oldPrice: 2199, brand: 'Wildhorn', desc: '30mm slim dress belt crafted from smooth Italian calf leather.' },
  { id: 'b14', name: 'Tan Brown Vintage Casual Leather Belt', category: 'belts', subCategory: 'casual', gender: 'men', price: 649, oldPrice: 1199, brand: 'Govindraj Accessories', desc: 'Classic antique tan leather belt with contrast edge stitching.' },
  { id: 'b15', name: 'Govindraj Gift Box Belt & Wallet Combo Set', category: 'belts', subCategory: 'leather', gender: 'men', price: 1499, oldPrice: 2999, brand: 'Govindraj Accessories', desc: 'Matching genuine leather belt and bi-fold wallet packaged in gift box.' },

  // ---------------- WALLETS (15 Items) ----------------
  { id: 'wl1', name: 'Wildhorn Genuine Leather RFID Blocking Wallet', category: 'wallets', subCategory: 'leather', gender: 'men', price: 699, oldPrice: 1499, brand: 'Wildhorn', desc: 'Handcrafted bi-fold leather wallet with RFID scanning protection.' },
  { id: 'wl2', name: 'Govindraj Slim Pop-up Aluminium Card Holder Wallet', category: 'wallets', subCategory: 'men', gender: 'men', price: 599, oldPrice: 1199, brand: 'Govindraj Accessories', desc: 'Automatic card ejector mechanism wallet with leather outer cash pocket.' },
  { id: 'wl3', name: 'Wildhorn Hunter Tan Distressed Leather Wallet', category: 'wallets', subCategory: 'leather', gender: 'men', price: 799, oldPrice: 1699, brand: 'Wildhorn', desc: 'Rugged vintage hunter leather wallet that gains character over time.' },
  { id: 'wl4', name: 'Women Leather Zip-Around Clutch Wallet', category: 'wallets', subCategory: 'women', gender: 'women', price: 899, oldPrice: 1799, brand: 'Govindraj Accessories', desc: 'Spacious zip clutch wallet with multi card slots and smartphone pocket.' },
  { id: 'wl5', name: 'Executive Long Checkbook Leather Passport Wallet', category: 'wallets', subCategory: 'unisex', gender: 'unisex', price: 1099, oldPrice: 2199, brand: 'Wildhorn', desc: 'Travel document organizer wallet with passport sleeve and pen holder.' },
  { id: 'wl6', name: 'Govindraj Tri-Fold Heavy Duty Leather Wallet', category: 'wallets', subCategory: 'leather', gender: 'men', price: 749, oldPrice: 1399, brand: 'Govindraj Accessories', desc: 'Extra capacity tri-fold wallet with transparent ID window & coin pouch.' },
  { id: 'wl7', name: 'Minimalist Front Pocket Money Clip Wallet', category: 'wallets', subCategory: 'men', gender: 'men', price: 499, oldPrice: 999, brand: 'Govindraj Accessories', desc: 'Slim magnetic money clip wallet with 6 card slots.' },
  { id: 'wl8', name: 'Croco Embossed Patent Leather Women Wallet', category: 'wallets', subCategory: 'women', gender: 'women', price: 999, oldPrice: 1899, brand: 'Govindraj Accessories', desc: 'Glossy crocodile pattern designer wallet with gold snap button.' },
  { id: 'wl9', name: 'Carbon Fiber Texture RFID Bifold Wallet', category: 'wallets', subCategory: 'men', gender: 'men', price: 649, oldPrice: 1299, brand: 'Govindraj Accessories', desc: 'Modern sport style carbon fiber leather wallet with red stitching.' },
  { id: 'wl10', name: 'Govindraj Classic Black Coin Pocket Leather Wallet', category: 'wallets', subCategory: 'leather', gender: 'men', price: 549, oldPrice: 999, brand: 'Govindraj Accessories', desc: 'Traditional Nappa leather wallet with press button coin compartment.' },
  { id: 'wl11', name: 'Unisex Canvas Travel Neck Pouch Wallet', category: 'wallets', subCategory: 'unisex', gender: 'unisex', price: 399, oldPrice: 799, brand: 'Govindraj Accessories', desc: 'Waterproof neck pouch wallet for keeping cash & passport safe during tours.' },
  { id: 'wl12', name: 'Wildhorn Premium Wooden Gift Box Wallet', category: 'wallets', subCategory: 'leather', gender: 'men', price: 899, oldPrice: 1799, brand: 'Wildhorn', desc: 'Luxury soft grain leather wallet packaged inside an engraved wooden box.' },
  { id: 'wl13', name: 'Slim RFID Card Sleeve Case', category: 'wallets', subCategory: 'unisex', gender: 'unisex', price: 299, oldPrice: 599, brand: 'Govindraj Accessories', desc: 'Ultra-thin sleeve case holding up to 8 credit cards & IDs.' },
  { id: 'wl14', name: 'Ladies Floral Printed Zip Purse Wallet', category: 'wallets', subCategory: 'women', gender: 'women', price: 599, oldPrice: 1099, brand: 'Govindraj Accessories', desc: 'Chic floral print clutch purse with detachable wristlet strap.' },
  { id: 'wl15', name: 'Govindraj Dual Zip Double Compartment Wallet', category: 'wallets', subCategory: 'men', gender: 'men', price: 949, oldPrice: 1799, brand: 'Govindraj Accessories', desc: 'Heavy duty organizer wallet with double zippers for cash & documents.' },

  // ---------------- GOGGLES / SUNGLASSES (15 Items) ----------------
  { id: 'g1', name: 'Ray-Ban Style Polarized Aviator Sunglasses', category: 'goggles', subCategory: 'sunglasses', gender: 'unisex', price: 1199, oldPrice: 2499, brand: 'Ray-Ban Style', desc: 'Classic teardrop metal frame green G-15 polarized UV400 lenses.' },
  { id: 'g2', name: 'Wayfarer Matte Black UV Protection Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'men', price: 699, oldPrice: 1399, brand: 'Govindraj Eyewear', desc: 'Timeless square wayfarer frame with anti-glare dark lenses.' },
  { id: 'g3', name: 'Steampunk Metal Round Shield Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'unisex', price: 899, oldPrice: 1799, brand: 'Govindraj Eyewear', desc: 'Retro gothic round sunglasses with mesh side shields.' },
  { id: 'g4', name: 'Cat Eye Crystal Frame Women Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'women', price: 799, oldPrice: 1599, brand: 'Govindraj Eyewear', desc: 'Glamorous oversized cat-eye sunglasses with gradient tint.' },
  { id: 'g5', name: 'Fastrack Sport Shield Wrap-Around Goggles', category: 'goggles', subCategory: 'sunglasses', gender: 'men', price: 999, oldPrice: 1899, brand: 'Fastrack', desc: 'Windproof aerodynamic wrap sports sunglasses for biking and driving.' },
  { id: 'g6', name: 'Rimless Rectangular Gold Frame Sunglasses', category: 'goggles', subCategory: 'eyewear', gender: 'men', price: 1299, oldPrice: 2599, brand: 'Govindraj Eyewear', desc: 'Luxury rimless sunglasses with gradient brown lenses & gold temples.' },
  { id: 'g7', name: 'Over-sized Square Gradient Driving Glasses', category: 'goggles', subCategory: 'sunglasses', gender: 'women', price: 849, oldPrice: 1699, brand: 'Govindraj Eyewear', desc: 'High definition UV400 polarized driving glasses.' },
  { id: 'g8', name: 'Night Vision Yellow Driving Goggles', category: 'goggles', subCategory: 'eyewear', gender: 'unisex', price: 499, oldPrice: 999, brand: 'Govindraj Eyewear', desc: 'Anti-glare yellow lens goggles for safe night driving & fog vision.' },
  { id: 'g9', name: 'Hexagonal Flat Lens Metal Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'unisex', price: 749, oldPrice: 1499, brand: 'Govindraj Eyewear', desc: 'Trendy geometric hexagon frame with silver mirror coating.' },
  { id: 'g10', name: 'Vintage Clubmaster Half Frame Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'men', price: 899, oldPrice: 1699, brand: 'Govindraj Eyewear', desc: 'Browline semi-rimless sunglasses with gold accents.' },
  { id: 'g11', name: 'Kids Polarized Flexible Rubber Sunglasses', category: 'goggles', subCategory: 'fashion', gender: 'kids', price: 399, oldPrice: 799, brand: 'Govindraj Kids', desc: 'Unbreakable bendable TPEE frame sunglasses for kids UV protection.' },
  { id: 'g12', name: 'Futuristic Cyber Shield Mirror Goggles', category: 'goggles', subCategory: 'fashion', gender: 'unisex', price: 1099, oldPrice: 2199, brand: 'Govindraj Eyewear', desc: 'Monoblock visor shield sunglasses for party & festival fashion.' },
  { id: 'g13', name: 'Wooden Temple Wayfarer Sunglasses', category: 'goggles', subCategory: 'eyewear', gender: 'men', price: 949, oldPrice: 1899, brand: 'Govindraj Eyewear', desc: 'Eco-friendly genuine bamboo wood temples with polarized lenses.' },
  { id: 'g14', name: 'Foldable Pocket Aviator Sunglasses with Case', category: 'goggles', subCategory: 'sunglasses', gender: 'unisex', price: 1199, oldPrice: 2399, brand: 'Govindraj Eyewear', desc: 'Compact folding aviator sunglasses that fit inside pocket leather case.' },
  { id: 'g15', name: 'Blue Light Blocking Computer Spectacles', category: 'goggles', subCategory: 'eyewear', gender: 'unisex', price: 599, oldPrice: 1199, brand: 'Govindraj Eyewear', desc: 'Zero power transparent glass spectacles for eye protection against screen glare.' },

  // ---------------- CAPS (15 Items) ----------------
  { id: 'c1', name: 'Puma Style Embroidered Cotton Baseball Cap', category: 'caps', subCategory: 'sports', gender: 'unisex', price: 399, oldPrice: 799, brand: 'Puma Style', desc: '100% breathable cotton twill curved visor baseball cap.' },
  { id: 'c2', name: 'NY Yankees Metal Logo Hip-Hop Snapback Cap', category: 'caps', subCategory: 'fashion', gender: 'men', price: 499, oldPrice: 999, brand: 'Govindraj Caps', desc: 'Flat brim adjustable snapback cap with metallic front emblem.' },
  { id: 'c3', name: 'Breathable Mesh Summer Trucker Cap', category: 'caps', subCategory: 'casual', gender: 'unisex', price: 349, oldPrice: 699, brand: 'Govindraj Caps', desc: 'Cooling rear mesh panel cap for outdoors & sports.' },
  { id: 'c4', name: 'Adidas Style Dry-Fit Running Sports Cap', category: 'caps', subCategory: 'sports', gender: 'unisex', price: 449, oldPrice: 899, brand: 'Adidas Style', desc: 'Ultra-lightweight sweat wicking micro-fabric athletic cap.' },
  { id: 'c5', name: 'Vintage Wash Denim Cotton Baseball Cap', category: 'caps', subCategory: 'casual', gender: 'men', price: 399, oldPrice: 799, brand: 'Govindraj Caps', desc: 'Distressed vintage washed denim cap with adjustable brass buckle.' },
  { id: 'c6', name: 'Outdoor Camouflage Military Tactical Cap', category: 'caps', subCategory: 'sports', gender: 'men', price: 379, oldPrice: 749, brand: 'Govindraj Caps', desc: 'Army print woodland camo cap with loop patch area.' },
  { id: 'c7', name: 'Reversible Bucket Sun Hat', category: 'caps', subCategory: 'casual', gender: 'unisex', price: 299, oldPrice: 599, brand: 'Govindraj Caps', desc: 'Dual sided wearable wide brim bucket hat for beach & travel.' },
  { id: 'c8', name: 'Winter Warm Fleece Beanie Cap Set', category: 'caps', subCategory: 'casual', gender: 'unisex', price: 349, oldPrice: 699, brand: 'Govindraj Caps', desc: 'Soft knit woolen beanie hat with plush neck warmer scarf.' },
  { id: 'c9', name: 'Golf Sun Visor Open-Top Cap', category: 'caps', subCategory: 'sports', gender: 'women', price: 299, oldPrice: 599, brand: 'Govindraj Caps', desc: 'Open top sun visor cap for sports, tennis, and outdoor activities.' },
  { id: 'c10', name: 'Kids Cartoon Printed Snapback Cap', category: 'caps', subCategory: 'casual', gender: 'kids', price: 249, oldPrice: 499, brand: 'Govindraj Kids', desc: 'Cute adjustable cartoon print cap for children.' },
  { id: 'c11', name: 'Flat Ivy Newsboy Peaky Blinders Cap', category: 'caps', subCategory: 'fashion', gender: 'men', price: 599, oldPrice: 1199, brand: 'Govindraj Caps', desc: 'Classic vintage British wool blend driver flat cap.' },
  { id: 'c12', name: 'Govindraj Signature Gold Thread Embroidered Cap', category: 'caps', subCategory: 'fashion', gender: 'men', price: 549, oldPrice: 1099, brand: 'Govindraj Caps', desc: 'Luxury heavy embroidered crest cap with gold trim.' },
  { id: 'c13', name: 'Luminous Reflective Night Running Cap', category: 'caps', subCategory: 'sports', gender: 'unisex', price: 429, oldPrice: 849, brand: 'Govindraj Caps', desc: 'High visibility reflective strip sports cap for night jog.' },
  { id: 'c14', name: 'Wide Brim Straw Beach Fedora Sun Hat', category: 'caps', subCategory: 'fashion', gender: 'women', price: 699, oldPrice: 1399, brand: 'Govindraj Caps', desc: 'Hand-woven breathable straw fedora hat with black ribbon ribbon.' },
  { id: 'c15', name: 'Hip-Hop Graffiti Printed Snapback Cap', category: 'caps', subCategory: 'fashion', gender: 'unisex', price: 449, oldPrice: 899, brand: 'Govindraj Caps', desc: 'Streetwear graffiti art print flat visor snapback cap.' },

  // ---------------- KEYCHAINS (₹10 to ₹1000 Range) ----------------
  { id: 'k1', name: 'Simple Stainless Steel Key Ring', category: 'keychains', subCategory: 'under-50', price: 10, oldPrice: 25, brand: 'Govindraj Accessories', desc: 'Heavy gauge rustproof steel split key ring.' },
  { id: 'k2', name: 'Cute Silicone Cartoon Character Keychain', category: 'keychains', subCategory: 'under-50', price: 20, oldPrice: 50, brand: 'Govindraj Kids', desc: 'Soft silicone cartoon figure keychain for kids & school bags.' },
  { id: 'k3', name: 'Fancy Metallic Bell & Ribbon Key Ring', category: 'keychains', subCategory: 'under-50', price: 49, oldPrice: 99, brand: 'Govindraj Accessories', desc: 'Jingle bell metal key ring with colorful fabric strap.' },
  { id: 'k4', name: 'Custom Car & Bike Brand Metal Keychain', category: 'keychains', subCategory: '50-200', price: 99, oldPrice: 199, brand: 'Govindraj Accessories', desc: 'Heavy chrome polished automotive logo keychain.' },
  { id: 'k5', name: 'Braided Genuine Leather Loop Keychain', category: 'keychains', subCategory: '50-200', price: 199, oldPrice: 399, brand: 'Wildhorn', desc: 'Handcrafted leather loop with dual zinc alloy rings.' },
  { id: 'k6', name: '360 Carabiner Quick-Release Belt Clip Keychain', category: 'keychains', subCategory: '200-500', price: 249, oldPrice: 499, brand: 'Govindraj Accessories', desc: 'Heavy duty tactical belt clip carabiner key holder.' },
  { id: 'k7', name: 'Multi-Tool 5-in-1 Pocket Opener Keychain', category: 'keychains', subCategory: '200-500', price: 299, oldPrice: 599, brand: 'Govindraj Accessories', desc: 'Stainless steel bottle opener, hex wrench & screwdriver key tool.' },
  { id: 'k8', name: 'Personalized Laser Engraved Photo Heart Key Ring', category: 'keychains', subCategory: '200-500', price: 349, oldPrice: 699, brand: 'Govindraj Gift', desc: 'Custom photo frame metal keychain engraved with your image.' },
  { id: 'k9', name: 'Fluffy Plush Teddy Bear Handbag Charm Keychain', category: 'keychains', subCategory: '200-500', price: 399, oldPrice: 799, brand: 'Govindraj Gift', desc: 'Plush velvet teddy bear keychain charm for ladies handbags.' },
  { id: 'k10', name: 'Luxury Crystal Rhinestone Crown Keychain', category: 'keychains', subCategory: '200-500', price: 499, oldPrice: 899, brand: 'Govindraj Gift', desc: 'Sparkling diamond-cut crystal crown keychain.' },
  { id: 'k11', name: 'Natural Teak Wood Carved Initial Name Keychain', category: 'keychains', subCategory: '500-1000', price: 599, oldPrice: 999, brand: 'Govindraj Gift', desc: 'Hand carved hardwood alphabet letter keychain.' },
  { id: 'k12', name: 'Interlocking Magnetic Couple Heart Keychain Set', category: 'keychains', subCategory: '500-1000', price: 699, oldPrice: 1199, brand: 'Govindraj Gift', desc: 'Pair of magnetic matching keychains for romantic couples.' },
  { id: 'k13', name: '3D Moveable Bike Helmet Metal Keychain', category: 'keychains', subCategory: '500-1000', price: 749, oldPrice: 1299, brand: 'Govindraj Accessories', desc: 'Miniature die-cast motorcycle helmet keychain with flipping visor.' },
  { id: 'k14', name: 'Titanium Aircraft Grade EDC Key Clip', category: 'keychains', subCategory: '500-1000', price: 849, oldPrice: 1499, brand: 'Govindraj Accessories', desc: 'Ultra-light rustproof titanium EDC carabiner key clip.' },
  { id: 'k15', name: 'VIP Executive Wooden Box Leather Keychain & Pen Set', category: 'keychains', subCategory: '500-1000', price: 999, oldPrice: 1999, brand: 'Govindraj Gift', desc: 'Luxury gift package featuring leather key fob and metallic rollerball pen.' },

  // ---------------- STATIONERY (15 Items) ----------------
  { id: 'st1', name: 'Govindraj Signature Rollerball Metal Pen', category: 'stationery', subCategory: 'premium', price: 299, oldPrice: 599, brand: 'Govindraj Stationery', desc: 'Premium weighted metal pen with matte finish for smooth writing.' },
  { id: 'st2', name: 'Hardbound Executive Leather Diary A5', category: 'stationery', subCategory: 'office', price: 449, oldPrice: 899, brand: 'Govindraj Stationery', desc: 'Professional PU leather notebook with ribbon bookmark and elastic band.' },
  { id: 'st3', name: 'Color-Coded Sticky Note & Memo Set', category: 'stationery', subCategory: 'desk', price: 199, oldPrice: 399, brand: 'Govindraj Stationery', desc: 'Comprehensive set of neon adhesive notes for office organization.' },
  { id: 'st4', name: 'Mechanical Metal Drafting Pencil 0.5mm', category: 'stationery', subCategory: 'design', price: 349, oldPrice: 699, brand: 'Govindraj Stationery', desc: 'Precision metallic drafting pencil for artists and architects.' },
  { id: 'st5', name: '3D Embossed Designer School Pencil Case', category: 'stationery', subCategory: 'kids', price: 149, oldPrice: 299, brand: 'Govindraj Kids', desc: 'SpaciousEVA hardtop pencil box with cartoon character 3D relief.' },
  { id: 'st6', name: 'Bamboo Wood Desktop Pen & Phone Holder', category: 'stationery', subCategory: 'desk', price: 399, oldPrice: 799, brand: 'Govindraj Stationery', desc: 'Eco-friendly polished bamboo organizer for desk clutter.' },
  { id: 'st7', name: 'Calligraphy Fountain Pen Gift Set', category: 'stationery', subCategory: 'premium', price: 899, oldPrice: 1799, brand: 'Govindraj Stationery', desc: 'Professional calligraphy fountain pen with extra nibs & ink.' },
  { id: 'st8', name: 'Magnetic Weekly Planner Whiteboard', category: 'stationery', subCategory: 'office', price: 549, oldPrice: 1099, brand: 'Govindraj Stationery', desc: 'Flexible magnetic fridge whiteboard planner for weekly tasks.' },
  { id: 'st9', name: 'Pastel Highlighters & Gel Pen Bundle', category: 'stationery', subCategory: 'kids', price: 249, oldPrice: 499, brand: 'Govindraj Kids', desc: 'Set of 6 aesthetic pastel colored markers for note taking.' },
  { id: 'st10', name: 'Luxury Wooden Box Pen & Notebook Hamper', category: 'stationery', subCategory: 'premium', price: 1299, oldPrice: 2599, brand: 'Govindraj Stationery', desc: 'Corporate gift set with personalized pen and hardcover dairy.' },
  { id: 'st11', name: 'Gold-Plated Signature Bookmark Set', category: 'stationery', subCategory: 'desk', price: 299, oldPrice: 599, brand: 'Govindraj Stationery', desc: 'Elegant metal etched golden bookmarks for literature lovers.' },
  { id: 'st12', name: 'Geometric Pattern Printed File Folder', category: 'stationery', subCategory: 'office', price: 159, oldPrice: 319, brand: 'Govindraj Stationery', desc: 'Stylish waterproof expandible document bag for college files.' },
  { id: 'st13', name: 'Portable Mini Stapler & Punch Tool Kit', category: 'stationery', subCategory: 'desk', price: 199, oldPrice: 399, brand: 'Govindraj Stationery', desc: 'Compact essential desktop kit for travelers and students.' },
  { id: 'st14', name: 'Unicorn Sequined Aesthetic Diary', category: 'stationery', subCategory: 'kids', price: 349, oldPrice: 699, brand: 'Govindraj Kids', desc: 'Sparkling reversible sequin diary for creative writing.' },
  { id: 'st15', name: 'Executive Black & Gold Writing Desk Set', category: 'stationery', subCategory: 'premium', price: 1599, oldPrice: 3199, brand: 'Govindraj Stationery', desc: 'Complete executive desk setup: pen stand, diary, and letter opener.' },

  // ---------------- MARRIAGE GIFT FRAMES (15 Items) ----------------
  { id: 'gf1', name: 'Royal 3D Golden Marriage Blessing Frame', category: 'gift-frames', subCategory: 'Wedding Frames', price: 1499, oldPrice: 2999, brand: 'Govindraj Frames', desc: 'Custom laser cut golden acrylic wedding invitation & photo frame.' },
  { id: 'gf2', name: 'LED Glowing Personalized Couple Photo Frame', category: 'gift-frames', subCategory: 'Couple Gifts', price: 1299, oldPrice: 2499, brand: 'Govindraj Frames', desc: 'Warm LED back-lit glass photo frame with couple names engraved.' },
  { id: 'gf3', name: 'Grand Wooden Carved Wedding Anniversary Frame', category: 'gift-frames', subCategory: 'Wedding Frames', price: 1899, oldPrice: 3499, brand: 'Govindraj Frames', desc: 'Heavy synthetic teak wood carved double photo collage frame.' },
  { id: 'gf4', name: 'Infinity Symbol Name & Date Acrylic Frame', category: 'gift-frames', subCategory: 'Couple Gifts', price: 999, oldPrice: 1999, brand: 'Govindraj Frames', desc: 'Modern mirror finish infinity loop couple name wall clock frame.' },
  { id: 'gf5', name: '3D Embossed Gold Foil Radha Krishna Frame', category: 'gift-frames', subCategory: 'Decorative Frames', price: 1199, oldPrice: 2299, brand: 'Govindraj Frames', desc: 'Auspicious gold foil embossed divine Radha Krishna frame for gifts.' },
  { id: 'gf6', name: 'Customized Family Tree Photo Collage Frame', category: 'gift-frames', subCategory: 'Photo Frames', price: 1599, oldPrice: 2999, brand: 'Govindraj Frames', desc: 'Multi-picture wall hanging collage frame accommodating 7 family photos.' },
  { id: 'gf7', name: 'Rotatable 360 Cube Photo Frame with Clock', category: 'gift-frames', subCategory: 'Photo Frames', price: 899, oldPrice: 1699, brand: 'Govindraj Frames', desc: 'Desktop revolving photo cube displaying 5 pictures and digital clock.' },
  { id: 'gf8', name: 'Crystal Glass Diamond Edge Tabletop Frame', category: 'gift-frames', subCategory: 'Photo Frames', price: 799, oldPrice: 1499, brand: 'Govindraj Frames', desc: 'Heavy bevel-cut crystal glass frame for wedding portraits.' },
  { id: 'gf9', name: 'Traditional Floral Brass Inlay Wooden Frame', category: 'gift-frames', subCategory: 'Decorative Frames', price: 1399, oldPrice: 2699, brand: 'Govindraj Frames', desc: 'Antique brass art inlaid solid wooden frame for living room.' },
  { id: 'gf10', name: 'Shadow Box Memory Keepsake Marriage Frame', category: 'gift-frames', subCategory: 'Wedding Frames', price: 1699, oldPrice: 3199, brand: 'Govindraj Frames', desc: 'Deep 3D shadow box frame to preserve wedding garland & invitation.' },
  { id: 'gf11', name: 'Heart Shape Neon Light Wall Frame', category: 'gift-frames', subCategory: 'Couple Gifts', price: 1099, oldPrice: 2199, brand: 'Govindraj Frames', desc: 'Vibrant LED neon light heart frame for bedroom wall decor.' },
  { id: 'gf12', name: 'Custom Calendar Milestone Date Memory Frame', category: 'gift-frames', subCategory: 'Couple Gifts', price: 849, oldPrice: 1599, brand: 'Govindraj Frames', desc: 'Highlights special date (First Meet, Engagement, Wedding) on calendar.' },
  { id: 'gf13', name: 'Silver Plated Divine Ganesha Wedding Gift Frame', category: 'gift-frames', subCategory: 'Decorative Frames', price: 1299, oldPrice: 2499, brand: 'Govindraj Frames', desc: '999 pure silver plated Lord Ganesha frame inside velvet gift box.' },
  { id: 'gf14', name: 'Vintage Baroque Gold Ornate Wall Mirror Frame', category: 'gift-frames', subCategory: 'Decorative Frames', price: 2199, oldPrice: 4299, brand: 'Govindraj Frames', desc: 'Luxury royal palace vintage style heavy carved gold frame.' },
  { id: 'gf15', name: 'Couple Hand Casting Memory Display Frame', category: 'gift-frames', subCategory: 'Wedding Frames', price: 1999, oldPrice: 3899, brand: 'Govindraj Frames', desc: 'Glass shadow box with LED lights designed to hold 3D hand mold.' },

  // ---------------- SCHOOL BAGS (15 Items) ----------------
  { id: 'sb1', name: 'Wildcraft Ergonomic 30L School Backpack', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1199, oldPrice: 2199, brand: 'Wildcraft', desc: 'Triple compartment waterproof nylon school backpack with rain cover.' },
  { id: 'sb2', name: 'Kids Cartoon 3D Hard Shell Hardside Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 899, oldPrice: 1699, brand: 'Govindraj Bags', desc: 'Cute waterproofEVA 3D relief cartoon character school bag.' },
  { id: 'sb3', name: 'Skybags Heavy-Duty Orthopedic School Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1399, oldPrice: 2599, brand: 'Skybags', desc: 'Spine support padded mesh shoulder straps with bottle pocket.' },
  { id: 'sb4', name: 'Primary School Trolley Bag with Wheels', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1799, oldPrice: 3299, brand: 'Govindraj Bags', desc: 'Detachable 6-wheel trolley school bag that climbs stairs easily.' },
  { id: 'sb5', name: 'Unicorn Plush Cute Pre-School Nursery Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 449, oldPrice: 899, brand: 'Govindraj Bags', desc: 'Soft velvet preschool bag for toddlers.' },
  { id: 'sb6', name: 'Marvel Avengers Hard Shell School Backpack', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 999, oldPrice: 1899, brand: 'Marvel', desc: 'Official Avengers action print 3 compartment school bag.' },
  { id: 'sb7', name: 'Lightweight Reflective Safety School Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 799, oldPrice: 1499, brand: 'Govindraj Bags', desc: '360 degree night reflective safety strip backpack.' },
  { id: 'sb8', name: 'Barbie Pink Princess School Bag with Pencil Pouch', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 849, oldPrice: 1599, brand: 'Barbie', desc: 'Pretty pink water-resistant backpack with matching lunch bag.' },
  { id: 'sb9', name: 'High Capacity Secondary School Student Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1099, oldPrice: 1999, brand: 'Skybags', desc: '35 Litre capacity 4 zip school bag with organzier sections.' },
  { id: 'sb10', name: 'Kids Anti-Lost Backpack with Safety Leash', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 499, oldPrice: 999, brand: 'Govindraj Bags', desc: 'Safety strap backpack for toddler outdoor walks.' },
  { id: 'sb11', name: 'Space Rocket 3D Hard Shell Nursery Backpack', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 699, oldPrice: 1299, brand: 'Govindraj Bags', desc: 'Futuristic rocket design hardshell mini bag.' },
  { id: 'sb12', name: 'Denim Finish Casual Student School Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 749, oldPrice: 1399, brand: 'Govindraj Bags', desc: 'Stylish washed denim cloth backpack for middle school students.' },
  { id: 'sb13', name: 'Wildcraft Printed Girls School Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1249, oldPrice: 2299, brand: 'Wildcraft', desc: 'Floral print water repellent durable backpack.' },
  { id: 'sb14', name: 'Baggit Style Cute Mini School Daypack', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 649, oldPrice: 1199, brand: 'Govindraj Bags', desc: 'Compact casual bag for school activities & tuition classes.' },
  { id: 'sb15', name: 'Expandable Multi-Compartment Study Bag', category: 'school-bags', subCategory: 'school-bags', gender: 'kids', price: 1199, oldPrice: 2199, brand: 'Skybags', desc: 'Zipper expandable 40L school bag fitting thick textbooks.' },

  // ---------------- COLLEGE BAGS (15 Items) ----------------
  { id: 'cb1', name: 'Skybags Trendy Printed College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 1299, oldPrice: 2499, brand: 'Skybags', desc: 'Vibrant geometric print 32L college backpack with rain cover.' },
  { id: 'cb2', name: 'Wildcraft Casual Unisex Daypack', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 999, oldPrice: 1899, brand: 'Wildcraft', desc: 'Lightweight polyester college daypack with quick access pocket.' },
  { id: 'cb3', name: 'Puma Style Sporty College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'men', price: 1399, oldPrice: 2699, brand: 'Puma Style', desc: 'Athletic dual compartment college bag with padded back panel.' },
  { id: 'cb4', name: 'Women Korean Canvas Vintage College Rucksack', category: 'college-bags', subCategory: 'college-bags', gender: 'women', price: 899, oldPrice: 1799, brand: 'Govindraj Bags', desc: 'Aesthetic multi-pocket pastel canvas rucksack with pastel pins.' },
  { id: 'cb5', name: 'American Tourister Unisex College Bag', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 1499, oldPrice: 2899, brand: 'American Tourister', desc: 'Durable tear-resistant fabric backpack with secret stash pocket.' },
  { id: 'cb6', name: 'USB Charging Port Anti-Theft College Bag', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 1199, oldPrice: 2299, brand: 'Govindraj Bags', desc: 'External USB charging port & combination lock anti-theft bag.' },
  { id: 'cb7', name: 'Leatherette Vintage College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'men', price: 1599, oldPrice: 3199, brand: 'Govindraj Bags', desc: 'Classy tan brown faux leather flap backpack with buckle straps.' },
  { id: 'cb8', name: 'Nike Style Sport Duffel Backpack Combo', category: 'college-bags', subCategory: 'college-bags', gender: 'men', price: 1249, oldPrice: 2399, brand: 'Govindraj Bags', desc: 'Versatile gym & college combo bag with shoe compartment.' },
  { id: 'cb9', name: 'Pastel Corduroy Aesthetic College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'women', price: 799, oldPrice: 1499, brand: 'Govindraj Bags', desc: 'Soft rib corduroy cloth casual bag with ribbon keychains.' },
  { id: 'cb10', name: 'Waterproof Laptop Sleeve College Daypack', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 1099, oldPrice: 2099, brand: 'Skybags', desc: 'Waterproof tarpaulin bottom college bag with 15.6 inch padded sleeve.' },
  { id: 'cb11', name: 'Roll-Top Modular College Rucksack', category: 'college-bags', subCategory: 'college-bags', gender: 'men', price: 1449, oldPrice: 2799, brand: 'Govindraj Bags', desc: 'Expandable roll-top closure tactical college backpack.' },
  { id: 'cb12', name: 'Wildcraft Multi-Utility College Bag', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 1199, oldPrice: 2199, brand: 'Wildcraft', desc: 'Lightweight weather-proof fabric bag with earphone port.' },
  { id: 'cb13', name: 'Minimalist Slim City College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 899, oldPrice: 1699, brand: 'Govindraj Bags', desc: 'Sleek geometric minimalist backpack for college students.' },
  { id: 'cb14', name: 'Denim Blue Distressed Unisex College Bag', category: 'college-bags', subCategory: 'college-bags', gender: 'unisex', price: 949, oldPrice: 1799, brand: 'Govindraj Bags', desc: 'Washed indigo denim fabric casual backpack with bronze zips.' },
  { id: 'cb15', name: 'Fastrack Sporty Camo College Backpack', category: 'college-bags', subCategory: 'college-bags', gender: 'men', price: 1349, oldPrice: 2599, brand: 'Fastrack', desc: 'Urban camouflage print heavy duty college bag.' },

  // ---------------- LAPTOP BAGS (15 Items) ----------------
  { id: 'lb1', name: 'Executive Leatherette 15.6 Inch Laptop Backpack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 1799, oldPrice: 3499, brand: 'Govindraj Bags', desc: 'Water-resistant premium faux leather business laptop bag with USB port.' },
  { id: 'lb2', name: 'American Tourister 17 Inch Gaming Laptop Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 2199, oldPrice: 4299, brand: 'American Tourister', desc: 'Heavy shock-absorbing padded compartment for large gaming laptops.' },
  { id: 'lb3', name: 'Swiss Gear Style Hard Shell Laptop Backpack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 2499, oldPrice: 4999, brand: 'Swiss Style', desc: 'Front EVA hardshell armor laptop bag with TSA lock.' },
  { id: 'lb4', name: 'Wildcraft Business Laptop Messenger Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 1599, oldPrice: 2999, brand: 'Wildcraft', desc: 'Convertible briefcase & shoulder messenger bag for office professionals.' },
  { id: 'lb5', name: 'Slim Waterproof Nylon Laptop Sleeve Briefcase', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 899, oldPrice: 1699, brand: 'Govindraj Bags', desc: 'Shockproof bubble cushioned inner velvet sleeve with trolley strap.' },
  { id: 'lb6', name: 'Govindraj Genuine Leather Office Executive Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 3499, oldPrice: 6999, brand: 'Govindraj Bags', desc: '100% full grain oil pulled leather classic lawyer & executive briefcase.' },
  { id: 'lb7', name: 'Expandable Office Travel Laptop Backpack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 1999, oldPrice: 3899, brand: 'Govindraj Bags', desc: 'Zipper expands capacity from 22L to 35L for overnight business trips.' },
  { id: 'lb8', name: 'Skybags Office Laptop Backpack with Rain Cover', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 1699, oldPrice: 3199, brand: 'Skybags', desc: 'Includes bright yellow rain cover tucked inside bottom zip pocket.' },
  { id: 'lb9', name: 'Women Leatherette Office Tote Laptop Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'women', price: 1499, oldPrice: 2899, brand: 'Govindraj Bags', desc: 'Chic handbag tote with padded 14-inch laptop compartment.' },
  { id: 'lb10', name: 'TSA Friendly Airport Check-in Laptop Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 2299, oldPrice: 4499, brand: 'American Tourister', desc: '180-degree lay-flat opening for fast airport security screening.' },
  { id: 'lb11', name: 'Ultra Light Slimline 14-inch Laptop Sleeve', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 699, oldPrice: 1299, brand: 'Govindraj Bags', desc: 'Neoprene splash-proof laptop envelope sleeve case.' },
  { id: 'lb12', name: 'Anti-Theft Hidden Zipper Business Backpack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'unisex', price: 1849, oldPrice: 3599, brand: 'Govindraj Bags', desc: 'Fully hidden back panel zipper prevents pickpocketing in crowded buses.' },
  { id: 'lb13', name: 'Wildcraft Tech Organizer Laptop Daypack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 1799, oldPrice: 3299, brand: 'Wildcraft', desc: 'Dedicated cable, powerbank, mouse & tablet organizer sections.' },
  { id: 'lb14', name: 'Vintage Canvas & Leather Laptop Messenger Bag', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 1649, oldPrice: 3199, brand: 'Govindraj Bags', desc: 'Waxed heavy canvas Satchel bag with magnetic leather buckles.' },
  { id: 'lb15', name: 'Govindraj Signature Gold Emblem Laptop Backpack', category: 'laptop-bags', subCategory: 'laptop-bags', gender: 'men', price: 2799, oldPrice: 5499, brand: 'Govindraj Bags', desc: 'Luxury quilted black leather laptop bag with gold metal hardware.' },

  // ---------------- TOUR & TRAVEL BAGS (15 Items) ----------------
  { id: 'tb1', name: 'American Tourister 55cm Cabin Trolley Bag', category: 'tour-bags', subCategory: 'Trolley Bags', price: 3499, oldPrice: 6999, brand: 'American Tourister', desc: 'Unbreakable polypropylene hardside 8-wheel spinner luggage.' },
  { id: 'tb2', name: 'Wildcraft 65L Hiking Trekking Rucksack', category: 'tour-bags', subCategory: 'Backpacks', price: 2899, oldPrice: 5499, brand: 'Wildcraft', desc: 'Heavy duty internal frame climbing rucksack with waist harness & rain cover.' },
  { id: 'tb3', name: 'Leatherette Executive Travel Duffel Weekender Bag', category: 'tour-bags', subCategory: 'Duffel Bags', price: 1699, oldPrice: 3299, brand: 'Govindraj Bags', desc: 'Spacious vintage brown faux leather duffel with shoe pocket.' },
  { id: 'tb4', name: 'Skybags 75cm Check-in Medium Trolley Suitcase', category: 'tour-bags', subCategory: 'Trolley Bags', price: 4299, oldPrice: 8499, brand: 'Skybags', desc: 'Lightweight scratch resistant polycarbonate spinner luggage.' },
  { id: 'tb5', name: 'Foldable Waterproof Gym & Travel Duffel Bag', category: 'tour-bags', subCategory: 'Duffel Bags', price: 699, oldPrice: 1399, brand: 'Govindraj Bags', desc: 'Ultra-light nylon bag that folds into a tiny pouch.' },
  { id: 'tb6', name: 'Wildcraft 45L Overnight Travel Backpack', category: 'tour-bags', subCategory: 'Backpacks', price: 1999, oldPrice: 3899, brand: 'Wildcraft', desc: 'Flight carry-on size backpack opening like a suitcase.' },
  { id: 'tb7', name: 'Wheeled Duffle Bag with Telescopic Handle', category: 'tour-bags', subCategory: 'Duffel Bags', price: 1899, oldPrice: 3699, brand: 'Skybags', desc: 'Combine convenience of duffel bag with smooth rolling wheels.' },
  { id: 'tb8', name: '3-Piece Hard Shell Trolley Luggage Set (S, M, L)', category: 'tour-bags', subCategory: 'Trolley Bags', price: 8999, oldPrice: 17999, brand: 'American Tourister', desc: 'Complete nestable 3 piece travel luggage set with TSA lock.' },
  { id: 'tb9', name: 'Tactical Army Camo Outdoor Travel Rucksack 50L', category: 'tour-bags', subCategory: 'Backpacks', price: 1799, oldPrice: 3499, brand: 'Govindraj Bags', desc: 'MOLLE webbing system outdoor camping backpack.' },
  { id: 'tb10', name: 'Govindraj Vintage Genuine Leather Travel Bag', category: 'tour-bags', subCategory: 'Travel Bags', price: 4999, oldPrice: 9999, brand: 'Govindraj Bags', desc: 'Handcrafted luxury leather Holdall travel bag.' },
  { id: 'tb11', name: 'Garment Suit Carrier Travel Bag', category: 'tour-bags', subCategory: 'Travel Bags', price: 2199, oldPrice: 4299, brand: 'Govindraj Bags', desc: 'Keeps suits & formal dresses wrinkle-free during flight trips.' },
  { id: 'tb12', name: 'Underseat Flight Cabin Carry-on Bag', category: 'tour-bags', subCategory: 'Travel Bags', price: 1299, oldPrice: 2499, brand: 'Skybags', desc: 'Fits under airline seats for fast quick weekend flights.' },
  { id: 'tb13', name: 'Waterproof Dry Bag Sack for Rafting & Beach 20L', category: 'tour-bags', subCategory: 'Travel Bags', price: 599, oldPrice: 1199, brand: 'Govindraj Bags', desc: '100% submersible floating dry sack for water sports.' },
  { id: 'tb14', name: 'Kids Cartoon 18-Inch Ride-On Trolley Suitcase', category: 'tour-bags', subCategory: 'Trolley Bags', price: 2499, oldPrice: 4899, brand: 'Govindraj Kids', desc: 'Fun ride-on suitcase children can sit on during airport waits.' },
  { id: 'tb15', name: 'Heavy Canvas Barrel Gym Duffel Bag', category: 'tour-bags', subCategory: 'Duffel Bags', price: 899, oldPrice: 1799, brand: 'Govindraj Bags', desc: 'Classic cylindrical canvas duffel with heavy cotton Webbing.' },

  // ---------------- GIFT COLLECTION (15 Items) ----------------
  { id: 'gt1', name: 'Govindraj Royal Gold Men Accessories Gift Box Set', category: 'gifts', subCategory: 'Luxury Gifts', price: 2499, oldPrice: 4999, brand: 'Govindraj Gift', desc: 'Includes luxury watch, leather belt, wallet, tie pin & cufflink set.' },
  { id: 'gt2', name: 'Engraved Wooden Music Box Couple Gift', category: 'gifts', subCategory: 'Anniversary Gifts', price: 799, oldPrice: 1599, brand: 'Govindraj Gift', desc: 'Hand-cranked wooden music box playing soothing romantic melody.' },
  { id: 'gt3', name: 'Crystal LED Rose Flower in Glass Dome', category: 'gifts', subCategory: 'Birthday Gifts', price: 899, oldPrice: 1799, brand: 'Govindraj Gift', desc: 'Enchanted glowing rose under glass dome with fairy light strings.' },
  { id: 'gt4', name: 'Corporate Metal Pen & Leather Notebook Gift Set', category: 'gifts', subCategory: 'Corporate Gifts', price: 699, oldPrice: 1399, brand: 'Govindraj Gift', desc: 'Executive diary notebook with metallic rollerball pen in presentation box.' },
  { id: 'gt5', name: 'Personalized Photo Keychain & Wallet Combo', category: 'gifts', subCategory: 'Custom Gifts', price: 999, oldPrice: 1999, brand: 'Govindraj Gift', desc: 'Custom name laser engraved genuine leather wallet & keychain.' },
  { id: 'gt6', name: 'Festival Metallic Diya & Brass Ganesha Hamper', category: 'gifts', subCategory: 'Festival Gifts', price: 1199, oldPrice: 2299, brand: 'Govindraj Gift', desc: 'Auspicious Diwali / Festival gift box with oil lamps & Ganesha idol.' },
  { id: 'gt7', name: '3D Laser Engraved Crystal Photo Cube LED Base', category: 'gifts', subCategory: 'Custom Gifts', price: 1499, oldPrice: 2899, brand: 'Govindraj Gift', desc: '3D photo converted inside optical crystal cube with rotating LED stand.' },
  { id: 'gt8', name: 'Kids Chocolate & Toys Celebration Hamper Box', category: 'gifts', subCategory: 'Kids Gifts', price: 699, oldPrice: 1299, brand: 'Govindraj Gift', desc: 'Fun surprise gift package filled with toys, stationery & treats.' },
  { id: 'gt9', name: 'Golden Metallic Trophy & Custom Certificate Frame', category: 'gifts', subCategory: 'Corporate Gifts', price: 849, oldPrice: 1699, brand: 'Govindraj Gift', desc: 'Best Employee / Best Friend award trophy with wood plaque.' },
  { id: 'gt10', name: 'Heart Lamp 3D Touch Color Change Night Light', category: 'gifts', subCategory: 'Decorative Gifts', price: 799, oldPrice: 1499, brand: 'Govindraj Gift', desc: 'USB rechargeable 16-color touch sensor bedside lamp.' },
  { id: 'gt11', name: 'Golden Brass Antique Compass & Telescope Box', category: 'gifts', subCategory: 'Premium Gifts', price: 1899, oldPrice: 3599, brand: 'Govindraj Gift', desc: 'Vintage nautical brass gift items inside handcrafted velvet wood box.' },
  { id: 'gt12', name: 'Customized Name Temperature Display Water Flask', category: 'gifts', subCategory: 'Custom Gifts', price: 599, oldPrice: 1199, brand: 'Govindraj Gift', desc: 'Smart LED touch temperature sensor stainless vacuum bottle.' },
  { id: 'gt13', name: 'Luxury Velvet Jewelry Storage Gift Chest', category: 'gifts', subCategory: 'Anniversary Gifts', price: 1299, oldPrice: 2499, brand: 'Govindraj Gift', desc: 'Multi-layer wooden organizer chest lined with plush velvet.' },
  { id: 'gt14', name: 'Personalized Marriage Couple Name Cushion Pillow', category: 'gifts', subCategory: 'Marriage Gifts', price: 499, oldPrice: 999, brand: 'Govindraj Gift', desc: 'Soft satin print cushion personalized with wedding couple names.' },
  { id: 'gt15', name: 'Govindraj Signature VIP Platinum Surprise Hamper', category: 'gifts', subCategory: 'Luxury Gifts', price: 4999, oldPrice: 9999, brand: 'Govindraj Gift', desc: 'Grand gift basket containing luxury watch, wallet, belt, eyewear, and chocolates.' }
];

// Custom image overrides map for key products
const FEATURED_IMAGE_MAP = {
  // Watches Collection
  'w1': 'assets/images/watch-edge.webp',
  'w2': 'assets/images/watch-titan.webp',
  'w3': 'assets/images/watch-raga.webp',
  'w4': 'assets/images/hero-watch.webp',
  'w5': 'assets/images/titan-watch-ai.webp',
  'w6': 'assets/images/watch-smart.webp',
  'w7': 'assets/images/watch-smart.webp',
  'w8': 'assets/images/cat-watches.webp',
  'w9': 'assets/images/watch-gshock.webp',
  'w10': 'assets/images/cat-watches.webp',
  'w11': 'assets/images/titan-watch-ai.webp',
  'w12': 'assets/images/watch-fossil.webp',
  'w13': 'assets/images/watch-seiko.webp',
  'w14': 'assets/images/hero-watch.webp',
  'w15': 'assets/images/titan-watch-ai.webp',
  'w16': 'assets/images/watch-smart.webp',
  'w17': 'assets/images/watch-smart.webp',
  'w18': 'assets/images/watch-smart.webp',

  // Belts Collection
  'b1': 'assets/images/leather-set.webp',
  'b2': 'assets/images/cat-belts-wallets.webp',
  'b3': 'assets/images/leather-set.webp',
  'b7': 'assets/images/cat-belts-wallets.webp',
  'b11': 'assets/images/leather-set.webp',

  // Wallets Collection
  'wl1': 'assets/images/wallet-collection.webp',
  'wl2': 'assets/images/leather-wallet-ai.webp',
  'wl3': 'assets/images/wallet-collection.webp',
  'wl4': 'assets/images/cat-belts-wallets.webp',
  'wl5': 'assets/images/leather-wallet-ai.webp',
  'wl12': 'assets/images/wallet-collection.webp',

  // Wall Clocks Collection
  'wc1': 'assets/images/wall-clock.webp',
  'wc2': 'assets/images/cat-wall-clocks.webp',
  'wc3': 'assets/images/wall-clock.webp',

  // Goggles & Sunglasses Collection
  'g1': 'assets/images/cat-goggles.webp',
  'g5': 'assets/images/cat-goggles.webp',

  // Gifts & Gift Frames Collection
  'gt1': 'assets/images/cat-gifts.webp',
  'gt5': 'assets/images/cat-gifts.webp',
  'gt15': 'assets/images/cat-gifts.webp',
  'gf1': 'assets/images/cat-gifts.webp'
};

// Enrich product list with dynamic SVGs and AI images
const ALL_PRODUCTS = RAW_PRODUCTS.map(p => ({
  ...p,
  image: FEATURED_IMAGE_MAP[p.id] || generateProductSVG(p.name, p.category)
}));

// --------------------------------------------------------------------------
// DYNAMIC LOCALSTORAGE DATA & SITE CONFIGURATION ENGINE
// --------------------------------------------------------------------------
function getSiteConfig() {
  const defaultConfig = {
    brandName: 'GOVINDRAJ WATCH AND GIFTS ACCESSORIES SHOP',
    brandSubtitle: 'NAIGAON BAZAAR • AUTHORIZED DEALER',
    phone: '8484080732',
    whatsapp: '8484080732',
    email: 'contact@govindrajwatchshop.com',
    address: 'Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazaar',
    announcement: 'Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazaar',
    openingHours: 'Mon - Sun: 9:00 AM - 9:00 PM',
    heroBadge: 'Premium Luxury Collection 2026',
    heroTitle: 'Elegance & Style For Every Occasion',
    heroDesc: 'Discover Naigaon Bazaar\'s finest selection of luxury branded watches, genuine leather belts, wallets, designer sunglasses, and premium gift frames.',
    aboutStoryTitle: '15+ Years of Trust & Quality',
    aboutStoryText: 'Founded by Govindraj Ambatwar, Govindraj Watch & Men Accessories Shop started with a vision to make luxury wristwatches and high-end men\'s accessories accessible to everyone in Naigaon Bazaar and surrounding regions in Maharashtra.',
    ownerName: 'Govindraj Ambatwar',
    ownerPhone: '8484080732',
    upiId: '8484080732@upi',
    upiNumber: '8484080732',
    upiName: 'Govindraj Watch Shop',
    razorpayKey: 'rzp_test_GovindrajShopKey123',
    developerName: 'Omkar Katturwar',
    developerPhone: '7219290885',
    brands: [
      { code: 'T', brand: 'TITAN', desc: 'Edge • Nebula • Raga' },
      { code: 'F', brand: 'FASTRACK', desc: 'Trendy • Revoltt Smart' },
      { code: 'C', brand: 'CASIO', desc: 'G-Shock • Edifice' },
      { code: 'F', brand: 'FOSSIL', desc: 'Grant • Machine' },
      { code: 'S', brand: 'SEIKO', desc: 'Automatic 5 Sports' },
      { code: 'S', brand: 'SONATA', desc: 'Wedding Collection' },
      { code: 'W', brand: 'WILDHORN', desc: 'Leather Wallets & Belts' }
    ],
    categories: [
      { key: 'watches', title: 'Watches', count: 'Titan, Fastrack, Casio & Fossil', image: 'assets/images/cat-watches.webp', url: 'watches.html' },
      { key: 'wall-clocks', title: 'Wall Clocks', count: '15+ Designer Clocks', image: 'assets/images/cat-wall-clocks.webp', url: 'wall-clocks.html' },
      { key: 'belts', title: 'Belts', count: 'Leather & Formal', image: 'assets/images/cat-belts-wallets.webp', url: 'belts.html' },
      { key: 'wallets', title: 'Wallets', count: 'RFID Leather Wallets', image: 'assets/images/cat-belts-wallets.webp', url: 'wallets.html' },
      { key: 'goggles', title: 'Goggles', count: 'Sunglasses & Eyewear', image: 'assets/images/cat-goggles.webp', url: 'goggles.html' },
      { key: 'gifts', title: 'Gift Collection', count: 'Custom Hampers & Frames', image: 'assets/images/cat-gifts.webp', url: 'gifts.html' },
      { key: 'college-bags', title: 'College & School Bags', count: 'School, Student & Travel', image: 'assets/images/cat-watches.webp', url: 'college-bags.html' },
      { key: 'stationery', title: 'School Stationery', count: 'Pens, Diaries & Kits', image: 'assets/images/cat-gifts.webp', url: 'stationery.html' }
    ]
  };
  try {
    const saved = localStorage.getItem('govind_site_config');
    return saved ? { ...defaultConfig, ...JSON.parse(saved) } : defaultConfig;
  } catch (e) {
    return defaultConfig;
  }
}

function saveSiteConfig(newConfig) {
  localStorage.setItem('govind_site_config', JSON.stringify(newConfig));
}

function getLiveProducts() {
  try {
    const custom = localStorage.getItem('govind_custom_products');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error parsing custom products:', e);
  }
  return ALL_PRODUCTS;
}

function saveLiveProducts(productsList) {
  localStorage.setItem('govind_custom_products', JSON.stringify(productsList));
}

function addOrUpdateProduct(productData) {
  let products = getLiveProducts();
  const existingIdx = products.findIndex(p => p.id === productData.id);
  if (existingIdx >= 0) {
    products[existingIdx] = { ...products[existingIdx], ...productData };
  } else {
    if (!productData.id) {
      productData.id = 'custom_' + Date.now();
    }
    if (!productData.image) {
      productData.image = generateProductSVG(productData.name, productData.category);
    }
    products.unshift(productData);
  }
  saveLiveProducts(products);
  return products;
}

function deleteLiveProduct(id) {
  let products = getLiveProducts();
  products = products.filter(p => p.id !== id);
  saveLiveProducts(products);
  return products;
}

// Quick getter helper
function getProductsByCategory(categoryKey) {
  const products = getLiveProducts();
  if (!categoryKey || categoryKey === 'all') return products;
  if (categoryKey === 'bags') {
    return products.filter(p => ['school-bags', 'college-bags', 'laptop-bags', 'tour-bags', 'bags'].includes(p.category));
  }
  return products.filter(p => p.category === categoryKey);
}

function getProductById(id) {
  const products = getLiveProducts();
  return products.find(p => p.id === id);
}

// --------------------------------------------------------------------------
// ORDERS & INVENTORY STOCK PERSISTENCE ENGINE
// --------------------------------------------------------------------------
function getLiveOrders() {
  try {
    const saved = localStorage.getItem('govind_store_orders');
    return saved ? JSON.parse(saved) : getSampleOrders();
  } catch (e) {
    return getSampleOrders();
  }
}

function saveLiveOrders(orders) {
  localStorage.setItem('govind_store_orders', JSON.stringify(orders));
}

function addOrderToStore(orderData) {
  let orders = getLiveOrders();
  orderData.id = 'ORD_' + Date.now();
  orderData.date = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  orderData.status = orderData.status || 'Pending';
  orders.unshift(orderData);
  saveLiveOrders(orders);

  // Deduct inventory stock
  if (Array.isArray(orderData.cart)) {
    let products = getLiveProducts();
    orderData.cart.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if (p) {
        p.stock = Math.max(0, (p.stock !== undefined ? p.stock : 12) - item.qty);
      }
    });
    saveLiveProducts(products);
  }
  return orderData;
}

function updateOrderStatus(orderId, newStatus, newPaymentStatus) {
  let orders = getLiveOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    if (newStatus) order.status = newStatus;
    if (newPaymentStatus) order.paymentStatus = newPaymentStatus;
    saveLiveOrders(orders);
  }
  return orders;
}

function deleteStoreOrder(orderId) {
  let orders = getLiveOrders().filter(o => o.id !== orderId);
  saveLiveOrders(orders);
  return orders;
}

function getSampleOrders() {
  return [
    {
      id: 'ORD_1785749001',
      name: 'Omkar Katturwar',
      phone: '7219290885',
      address: 'Navle Complex, Naigaon Bazaar',
      payment: 'UPI / GPay (UTR: 4098129381)',
      paymentStatus: 'Paid',
      status: 'Completed',
      date: '03 Aug 2026, 04:15 PM',
      cart: [
        { id: 'watch-1', name: 'Titan Nebula 18K Gold Craftsmanship Watch', price: 12999, qty: 1 },
        { id: 'watch-3', name: 'Casio G-Shock Oak GA-2100 Black', price: 6499, qty: 1 }
      ],
      total: 19498
    },
    {
      id: 'ORD_1785749002',
      name: 'Rahul Sharma',
      phone: '9822012345',
      address: 'Near Buldhana Bank, Main Road',
      payment: 'Razorpay Online (ID: pay_P99x88y77z)',
      paymentStatus: 'Paid',
      status: 'Shipped',
      date: '03 Aug 2026, 02:30 PM',
      cart: [
        { id: 'wallet-1', name: 'Wildhorn Genuine Leather RFID Wallet', price: 1299, qty: 2 }
      ],
      total: 2598
    }
  ];
}

// --------------------------------------------------------------------------
// REPAIR SERVICE REQUESTS PERSISTENCE ENGINE
// --------------------------------------------------------------------------
function getLiveRepairs() {
  try {
    const saved = localStorage.getItem('govind_store_repairs');
    return saved ? JSON.parse(saved) : getSampleRepairs();
  } catch (e) {
    return getSampleRepairs();
  }
}

function saveLiveRepairs(repairs) {
  localStorage.setItem('govind_store_repairs', JSON.stringify(repairs));
}

function addRepairToStore(repairData) {
  let repairs = getLiveRepairs();
  if (!repairData.id) repairData.id = 'REP_' + Date.now();
  if (!repairData.createdAt) repairData.createdAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  repairData.status = repairData.status || 'Pending';
  repairs.unshift(repairData);
  saveLiveRepairs(repairs);
  return repairData;
}

function updateRepairStatus(repairId, newStatus) {
  let repairs = getLiveRepairs();
  const repair = repairs.find(r => r.id === repairId);
  if (repair) {
    repair.status = newStatus;
    saveLiveRepairs(repairs);
  }
  return repairs;
}

function deleteStoreRepair(repairId) {
  let repairs = getLiveRepairs().filter(r => r.id !== repairId);
  saveLiveRepairs(repairs);
  return repairs;
}

function getSampleRepairs() {
  return [
    {
      id: 'REP_1785751001',
      name: 'Omkar Katturwar',
      phone: '7219290885',
      category: 'Wrist Watch - Battery / Cell Replacement',
      brandModel: 'Titan Octane Chronograph',
      issue: 'Battery drained, needs original Sony Maxell SR927SW battery replacement',
      date: '05 Aug 2026',
      timeSlot: 'Morning (10:00 AM - 01:00 PM)',
      status: 'Pending',
      createdAt: '04 Aug 2026, 11:30 AM'
    },
    {
      id: 'REP_1785751002',
      name: 'Aniket Deshmukh',
      phone: '9422187654',
      category: 'Wall Clock Repair & Machine Change',
      brandModel: 'Ajanta Quartz Wall Clock',
      issue: 'Clock pendulum stopped moving, machine servicing required',
      date: '06 Aug 2026',
      timeSlot: 'Evening (05:00 PM - 09:00 PM)',
      status: 'Completed',
      createdAt: '03 Aug 2026, 03:20 PM'
    }
  ];
}
