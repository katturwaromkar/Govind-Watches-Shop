/* ==========================================================================
   GOVINDRAJ WATCH & MEN ACCESSORIES SHOP - MAIN APP CONTROLLER (app.js)
   Handles UI Filters, Search, Wishlist, WhatsApp Builder, QuickView & Animations
   ========================================================================== */

let currentProducts = [];
let activeCategory = 'all';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initWishlistCounter();
  updateCartCounterBadge();
  applyDynamicSiteConfig();
  initScrollAnimations();
  initCounterAnimations();
  initHeroBackgroundSlideshow();

  // Page specific initialization
  const pageCategory = document.body.getAttribute('data-category');
  if (pageCategory) {
    activeCategory = pageCategory;
    renderCatalogPage(pageCategory);
    if (pageCategory === 'bags') {
      const urlParams = new URLSearchParams(window.location.search);
      const bagType = urlParams.get('category') || urlParams.get('filter');
      if (bagType && bagType !== 'all') {
        const targetBtn = document.querySelector(`.filter-pill[data-filter="${bagType}"]`);
        filterBags(bagType, targetBtn);
      }
    } else if (pageCategory === 'watches') {
      const urlParams = new URLSearchParams(window.location.search);
      const watchType = urlParams.get('category') || urlParams.get('filter');
      if (watchType && watchType !== 'all') {
        const targetBtn = document.querySelector(`.filter-pill[data-filter="${watchType}"]`);
        filterWatchesPage(watchType, targetBtn);
      }
    }
  } else if (document.getElementById('popularProductsGrid')) {
    renderHomePageProducts();
    renderMostLovedCollection();
  }

  // Search listener
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterProductsBySearch(e.target.value);
    });
  }
});

function applyDynamicSiteConfig() {
  if (typeof getSiteConfig !== 'function') return;
  const config = getSiteConfig();

  // 1. Header Brand Title & Subtitle
  document.querySelectorAll('.brand-title').forEach(el => {
    if (config.brandName) el.textContent = config.brandName;
  });
  document.querySelectorAll('.brand-subtitle').forEach(el => {
    if (config.brandSubtitle) el.textContent = config.brandSubtitle;
  });

  // 2. Top Bar Announcement & Address
  document.querySelectorAll('[data-i18n="address"]').forEach(el => {
    if (config.address || config.announcement) el.textContent = config.address || config.announcement;
  });

  // 3. Hero Section Text
  const heroBadge = document.querySelector('.hero-tag');
  if (heroBadge && config.heroBadge) {
    heroBadge.innerHTML = `<i class="ri-vip-crown-fill"></i> ${config.heroBadge}`;
  }

  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && config.heroTitle) heroTitle.textContent = config.heroTitle;

  const heroDesc = document.querySelector('.hero-desc');
  if (heroDesc && config.heroDesc) heroDesc.textContent = config.heroDesc;

  // 4. Authorized Brands Marquee (100% Dynamic)
  const brandsTrack = document.querySelector('.brands-marquee-track');
  if (brandsTrack && Array.isArray(config.brands) && config.brands.length > 0) {
    const brandCardsHTML = config.brands.map(b => `
      <div class="brand-item-card">
        <div class="brand-badge-circle">${b.code || b.brand.charAt(0)}</div>
        <div class="brand-item-info">
          <span class="brand-item-name">${b.brand}</span>
          <span class="brand-item-desc">${b.desc}</span>
        </div>
      </div>
    `).join('');
    // Duplicate set to guarantee continuous marquee scroll loop
    brandsTrack.innerHTML = brandCardsHTML + brandCardsHTML;
  }

  // 5. Shop Categories Marquee (100% Dynamic)
  const categoriesTrack = document.querySelector('.categories-marquee-track');
  if (categoriesTrack && Array.isArray(config.categories) && config.categories.length > 0) {
    const catCardsHTML = config.categories.map(c => `
      <a href="${c.url || '#'}" class="category-card">
        <img src="${c.image || 'assets/images/cat-watches.webp'}" alt="${c.title}" loading="lazy">
        <div class="category-card-overlay"></div>
        <div class="category-card-content">
          <h3 class="category-card-title">${c.title}</h3>
          <span class="category-card-count">${c.count}</span>
        </div>
      </a>
    `).join('');
    categoriesTrack.innerHTML = catCardsHTML + catCardsHTML;
  }

  // 6. About Story Section
  const storyTitle = document.querySelector('.owner-card h2');
  if (storyTitle && config.aboutStoryTitle) storyTitle.textContent = config.aboutStoryTitle;

  // 7. Footer Credits (Developed by Info)
  const creditBox = document.querySelector('.footer-credits-bar .credit-box');
  if (creditBox && config.ownerPhone) {
    creditBox.innerHTML = `
      <i class="ri-user-star-line text-primary-color"></i>
      <div>
        <span data-i18n="footer_developed_by">Developed by : Govindraj Ambatwar</span><br>
        <strong>📞 ${config.ownerPhone}</strong>
      </div>
    `;
  }
}

function initHeroSlideshow() {
  const heroImg = document.getElementById('heroSlideImage');
  if (!heroImg) return;

  const slides = [
    { src: 'assets/images/hero-watch.webp', alt: 'Luxury Wristwatches' },
    { src: 'assets/images/cat-wall-clocks.webp', alt: 'Designer Wall Clocks' },
    { src: 'assets/images/cat-belts-wallets.webp', alt: 'Genuine Leather Belts & Wallets' },
    { src: 'assets/images/cat-goggles.webp', alt: 'Designer Sunglasses & Eyewear' },
    { src: 'assets/images/cat-gifts.webp', alt: 'Royal Gift Hampers & Frames' },
    { src: 'assets/images/watch-gshock.webp', alt: 'Casio G-Shock Watches' },
    { src: 'assets/images/wallet-collection.webp', alt: 'RFID Leather Wallets' }
  ];

  let currentIndex = 0;
  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = slides[currentIndex].src;
      heroImg.alt = slides[currentIndex].alt;
      heroImg.style.opacity = '1';
    }, 400);
  }, 3000);
}

// --------------------------------------------------------------------------
// 1. HEADER & NAVIGATION LOGIC
// --------------------------------------------------------------------------
function initHeader() {
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('scrolled');
      document.getElementById('backToTop')?.classList.add('active');
    } else {
      header?.classList.remove('scrolled');
      document.getElementById('backToTop')?.classList.remove('active');
    }
  });

  // Mobile menu toggle & static overlay locking
  const mobileBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      document.body.style.overflow = isActive ? 'hidden' : '';
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.className = isActive ? 'ri-close-line' : 'ri-menu-line';
      }
    });

    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'ri-menu-line';
      });
    });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// 2. WHATSAPP INTEGRATION BUILDER
// --------------------------------------------------------------------------
// 2. WHATSAPP INTEGRATION BUILDER & DIRECT ORDER
// --------------------------------------------------------------------------
function getWhatsAppUrl(productName, price) {
  const shopPhone = '918484080732';
  const text = `Hello Govindraj Watch Shop,\n\nI want to order / enquire about this item:\n\n📦 Product: ${productName}\n💰 Price: ₹${price.toLocaleString('en-IN')}\n📍 Shop: Naigaon Bazaar\n\nPlease confirm availability and payment details.`;
  return `https://wa.me/${shopPhone}?text=${encodeURIComponent(text)}`;
}

function enquireOnWhatsApp(productName, price) {
  const url = getWhatsAppUrl(productName, price);
  window.open(url, '_blank');
}

// --------------------------------------------------------------------------
// 3. PRODUCT RENDERING & CARDS
// --------------------------------------------------------------------------
function createProductCardHTML(product) {
  const isWishlisted = isItemWishlisted(product.id);

  return `
    <div class="product-card scroll-reveal">
      <div class="product-img-wrapper">
        <span class="product-badge badge-gold">${product.brand}</span>
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)" title="Add to Wishlist">
          <i class="${isWishlisted ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
        </button>
        <img src="${product.image}" alt="${product.name} available at Govindraj Watch & Gift Center Naigaon" loading="lazy">
        <button class="quickview-btn" onclick="openQuickView('${product.id}')">
          <i class="ri-eye-line"></i> <span data-i18n="quick_view">Quick View</span>
        </button>
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price-row">
          <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
          ${product.oldPrice ? `<span class="product-price-old">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
        <div style="display:flex; gap:8px; margin-top:10px;">
          <button class="btn btn-primary" style="flex:1; padding:10px 12px; font-size:0.88rem; justify-content:center;" onclick="addToCart('${product.id}')">
            <i class="ri-shopping-cart-2-line"></i> Add to Cart
          </button>
          <button class="btn btn-whatsapp" style="padding:10px 14px;" onclick="enquireOnWhatsApp('${product.name.replace(/'/g, "\\'")}', ${product.price})" title="Instant WhatsApp">
            <i class="ri-whatsapp-line"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

function initHeroBackgroundSlideshow() {
  const heroSection = document.querySelector('.hero');
  if (!heroSection) return;

  const bgImages = [
    'assets/images/hero-watch.webp',
    'assets/images/cat-watches.webp',
    'assets/images/leather-set.webp',
    'assets/images/cat-belts-wallets.webp',
    'assets/images/cat-wall-clocks.webp',
    'assets/images/cat-goggles.webp',
    'assets/images/cat-gifts.webp'
  ];

  let currentBgIndex = 0;

  setInterval(() => {
    currentBgIndex = (currentBgIndex + 1) % bgImages.length;
    const img = new Image();
    img.src = bgImages[currentBgIndex];
    img.onload = () => {
      heroSection.style.backgroundImage = `url('${bgImages[currentBgIndex]}')`;
    };
  }, 4000);
}

function renderHomePageProducts() {
  const container = document.getElementById('popularProductsGrid');
  if (!container) return;

  // Pick top trending featured items from diverse categories
  const featuredIds = ['w1', 'w2', 'w9', 'wl1', 'b1', 'wc1', 'g1', 'gt1'];
  const featured = ALL_PRODUCTS.filter(p => featuredIds.includes(p.id));
  // Duplicate array for seamless infinite marquee loop (scrolling left to right)
  const items = featured.length > 0 ? featured : ALL_PRODUCTS.slice(0, 8);
  const marqueeItems = [...items, ...items];

  container.innerHTML = marqueeItems.map(createProductCardHTML).join('');
  translateCurrentUI();
  initScrollAnimations();
}

function createMostLovedCardHTML(product, index) {
  const discountPercent = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 22;
  const rating = product.rating || 4.9;
  const reviews = product.reviews || 120;
  const isWishlisted = isInWishlist(product.id);

  const COLLECTION_VIDEOS = [
    'assets/vedios/video-watch-1.mp4',
    'assets/vedios/video-watch-2.mp4',
    'assets/vedios/video-watch-3.mp4'
  ];
  const videoUrl = COLLECTION_VIDEOS[index % COLLECTION_VIDEOS.length];

  return `
    <div class="most-loved-card scroll-reveal" style="animation-delay: ${index * 0.08}s">
      <div class="most-loved-img-wrapper most-loved-video-wrapper">
        <span class="most-loved-badge"><i class="ri-vip-crown-2-fill"></i> Most Loved</span>
        <span class="video-hd-badge"><i class="ri-vidicon-fill"></i> 4K VIDEO</span>
        
        <button class="most-loved-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)" title="Add to Wishlist">
          <i class="${isWishlisted ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
        </button>

        <video autoplay loop muted playsinline poster="${product.image}" class="most-loved-video">
          <source src="${videoUrl}" type="video/mp4">
          <img src="${product.image}" alt="${product.name}" class="most-loved-img">
        </video>

        <div class="video-play-pulse"><i class="ri-play-fill"></i></div>

        <div class="most-loved-overlay-btns">
          <button class="btn-loved-quickview" onclick="openQuickView('${product.id}')">
            <i class="ri-eye-line"></i> Quick View
          </button>
        </div>
      </div>

      <div class="most-loved-content">
        <div class="most-loved-brand-row">
          <span class="most-loved-brand-name">${product.brand}</span>
          <span class="stock-badge-indicator"><i class="ri-checkbox-circle-fill"></i> In Stock</span>
        </div>

        <h3 class="most-loved-title">${product.name}</h3>

        <div class="most-loved-rating-row">
          <span class="stars">★★★★★</span>
          <span class="rating-val">${rating} (${reviews}+ Happy Customers)</span>
        </div>

        <div class="most-loved-price-row">
          <div class="price-container">
            <span class="curr-price">₹${product.price.toLocaleString('en-IN')}</span>
            ${product.oldPrice ? `<span class="orig-price">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
          </div>
          <span class="discount-pill">${discountPercent}% OFF</span>
        </div>

        <div class="most-loved-badge-bar">
          <span class="emi-pill"><i class="ri-bank-card-line"></i> EMI Available</span>
          <span class="warranty-pill"><i class="ri-shield-check-line"></i> Authentic Warranty</span>
        </div>

        <div class="most-loved-card-actions">
          <button class="btn btn-primary btn-shop-now" onclick="enquireOnWhatsApp('${product.name.replace(/'/g, "\\'")}', ${product.price})">
            <i class="ri-shopping-bag-line"></i> Shop Now
          </button>
          <button class="btn btn-outline btn-quick-view-sm" onclick="openQuickView('${product.id}')">
            <i class="ri-eye-line"></i> Quick View
          </button>
        </div>
      </div>
    </div>
  `;
}

function renderMostLovedCollection() {
  const container = document.getElementById('mostLovedCarouselTrack');
  if (!container) return;

  const lovedIds = ['w1', 'w2', 'w9', 'wc1', 'b1', 'g1', 'wl1', 'gt1'];
  const lovedProducts = ALL_PRODUCTS.filter(p => lovedIds.includes(p.id));
  const products = lovedProducts.length > 0 ? lovedProducts : ALL_PRODUCTS.slice(0, 8);

  container.innerHTML = products.map((p, i) => createMostLovedCardHTML(p, i)).join('');
  translateCurrentUI();
}

function scrollMostLovedCarousel(direction) {
  const container = document.getElementById('mostLovedCarouselTrack');
  if (!container) return;
  const scrollAmount = 320;
  container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}

function renderCatalogPage(categoryKey) {
  const container = document.getElementById('catalogProductsGrid');
  if (!container) return;

  if (categoryKey === 'watches') {
    const wristWatches = getProductsByCategory('watches');
    const wallClocks = getProductsByCategory('wall-clocks');
    currentProducts = [...wristWatches, ...wallClocks];
  } else {
    currentProducts = getProductsByCategory(categoryKey);
  }
  displayProducts(currentProducts);
}

function filterWatchesPage(type, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.filter-toolbar .filter-pill').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }

  const wristWatches = getProductsByCategory('watches');
  const wallClocks = getProductsByCategory('wall-clocks');
  const allTimepieces = [...wristWatches, ...wallClocks];

  if (type === 'all') {
    currentProducts = allTimepieces;
  } else if (type === 'wrist') {
    currentProducts = wristWatches;
  } else if (type === 'clocks') {
    currentProducts = wallClocks;
  } else if (type === 'smart') {
    currentProducts = allTimepieces.filter(p => (p.movement && p.movement.toLowerCase().includes('smart')) || (p.name && p.name.toLowerCase().includes('smart')) || (p.collection && p.collection.toLowerCase().includes('smart')));
  } else if (type === 'couple') {
    currentProducts = allTimepieces.filter(p => (p.subCategory && p.subCategory.toLowerCase().includes('couple')) || (p.name && (p.name.toLowerCase().includes('pair') || p.name.toLowerCase().includes('wedding') || p.name.toLowerCase().includes('couple'))));
  }
  displayProducts(currentProducts);
}

function displayProducts(productsList) {
  const container = document.getElementById('catalogProductsGrid');
  const countBadge = document.getElementById('productsCountBadge');

  if (countBadge) countBadge.textContent = `${productsList.length} Products`;

  if (productsList.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 60px 20px;">
        <i class="ri-search-line" style="font-size: 50px; color: var(--text-muted);"></i>
        <h3 style="margin-top:15px; color: var(--text-primary);">No products found</h3>
        <p style="color: var(--text-secondary);">Try resetting your filter search query.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = productsList.map(createProductCardHTML).join('');
  translateCurrentUI();
  initScrollAnimations();
}

// --------------------------------------------------------------------------
// 4. LIVE FILTERS & SEARCH
// --------------------------------------------------------------------------
function filterBags(subCategory, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
    btnElement.classList.add('active');
  }

  const allBags = getProductsByCategory('bags');
  if (!subCategory || subCategory === 'all') {
    currentProducts = allBags;
  } else {
    currentProducts = allBags.filter(p => p.category === subCategory);
  }
  displayProducts(currentProducts);
}

function filterProductsBySearch(query) {
  if (!query) {
    displayProducts(currentProducts);
    return;
  }

  const q = query.toLowerCase().trim();
  const filtered = currentProducts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q)
  );

  displayProducts(filtered);
}

function applyGenderFilter(gender) {
  const subCategorySelect = document.getElementById('subCategoryFilter');
  if (subCategorySelect) subCategorySelect.value = 'all';

  if (gender === 'all') {
    displayProducts(currentProducts);
    return;
  }

  const filtered = currentProducts.filter(p => p.gender === gender || p.subCategory.toLowerCase().includes(gender));
  displayProducts(filtered);
}

function applySort(sortKey) {
  let sorted = [...currentProducts];
  if (sortKey === 'low-high') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortKey === 'high-low') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortKey === 'newest') {
    sorted.reverse();
  }
  displayProducts(sorted);
}

function applySubCategoryFilter(subCat) {
  if (subCat === 'all') {
    displayProducts(currentProducts);
    return;
  }
  const filtered = currentProducts.filter(p => p.subCategory.toLowerCase() === subCat.toLowerCase());
  displayProducts(filtered);
}

function filterByBrand(brandName, element) {
  const pills = document.querySelectorAll('.filter-pill');
  pills.forEach(p => p.classList.remove('active'));
  if (element) element.classList.add('active');

  if (!brandName || brandName === 'all') {
    displayProducts(currentProducts);
    return;
  }

  const filtered = currentProducts.filter(p => p.brand.toLowerCase().includes(brandName.toLowerCase()));
  displayProducts(filtered);
}

// --------------------------------------------------------------------------
// 5. WISHLIST ENGINE (LOCALSTORAGE)
// --------------------------------------------------------------------------
function getWishlist() {
  return JSON.parse(localStorage.getItem('govind_wishlist') || '[]');
}

function isItemWishlisted(id) {
  return getWishlist().includes(id);
}

function toggleWishlist(id, btn) {
  let wishlist = getWishlist();
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    if (btn) btn.classList.remove('active');
    showToast('Removed from Wishlist');
  } else {
    wishlist.push(id);
    if (btn) btn.classList.add('active');
    showToast('Added to Wishlist!');
  }
  localStorage.setItem('govind_wishlist', JSON.stringify(wishlist));
  initWishlistCounter();
}

function initWishlistCounter() {
  const count = getWishlist().length;
  const badges = document.querySelectorAll('.wishlist-counter');
  badges.forEach(b => b.textContent = count);
}

// --------------------------------------------------------------------------
// 6. QUICK VIEW MODAL WITH TECH SPECS
// --------------------------------------------------------------------------
function openQuickView(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const modal = document.getElementById('quickViewModal');
  const body = document.getElementById('quickViewBody');
  if (!modal || !body) return;

  const specsHTML = (product.movement || product.strap || product.waterResistance) ? `
    <div class="tech-spec-grid">
      <div class="tech-spec-item">
        <span class="tech-spec-label">Movement</span>
        <span class="tech-spec-value">${product.movement || 'Quartz Precision'}</span>
      </div>
      <div class="tech-spec-item">
        <span class="tech-spec-label">Strap Material</span>
        <span class="tech-spec-value">${product.strap || 'Premium Material'}</span>
      </div>
      <div class="tech-spec-item">
        <span class="tech-spec-label">Water Resistance</span>
        <span class="tech-spec-value">${product.waterResistance || 'Splashproof'}</span>
      </div>
      <div class="tech-spec-item">
        <span class="tech-spec-label">Warranty</span>
        <span class="tech-spec-value">${product.warranty || '1 Year Guarantee'}</span>
      </div>
    </div>
  ` : '';

  body.innerHTML = `
    <button class="modal-close-btn" onclick="closeQuickView()" aria-label="Close Modal" style="position: absolute; top: 18px; right: 18px; width: 38px; height: 38px; border-radius: 50%; background: var(--bg-secondary); border: 1px solid var(--border-color); color: var(--text-primary); font-size: 22px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10; transition: all 0.3s ease;"><i class="ri-close-line"></i></button>
    <div class="quickview-layout" style="position: relative;">
      <div>
        <img src="${product.image}" alt="${product.name}" class="quickview-img">
      </div>
      <div>
        <span class="badge-gold">${product.brand} ${product.collection ? '• ' + product.collection : ''}</span>
        <h2 style="font-size: 1.8rem; margin: 15px 0 10px; color: var(--text-primary);">${product.name}</h2>
        <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary-color); margin-bottom: 15px;">
          ₹${product.price.toLocaleString('en-IN')}
          ${product.oldPrice ? `<span style="font-size:1rem; text-decoration:line-through; color:var(--text-muted); margin-left:10px;">₹${product.oldPrice.toLocaleString('en-IN')}</span>` : ''}
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 15px; line-height:1.6;">${product.desc}</p>
        
        ${specsHTML}

        <div style="display:flex; gap:15px; flex-wrap:wrap; margin-top: 25px;">
          <button class="btn btn-whatsapp" onclick="enquireOnWhatsApp('${product.name.replace(/'/g, "\\'")}', ${product.price})">
            <i class="ri-whatsapp-line"></i> Enquire on WhatsApp
          </button>
          <button class="btn btn-outline" onclick="toggleWishlist('${product.id}', null); closeQuickView();">
            <i class="ri-heart-line"></i> Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  modal.onclick = (e) => {
    if (e.target === modal) closeQuickView();
  };
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  if (modal) modal.classList.remove('active');
}

// --------------------------------------------------------------------------
// 7. TOAST NOTIFICATIONS & ANIMATIONS
// --------------------------------------------------------------------------
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 30px;
      background: var(--bg-glass);
      backdrop-filter: blur(15px);
      border: 1px solid var(--primary-color);
      color: var(--text-primary);
      padding: 14px 24px;
      border-radius: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      z-index: 3000;
      font-weight: 600;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(20px);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
  }, 3000);
}

function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-reveal');
  elements.forEach(el => {
    // Immediately reveal product cards inside grids to guarantee visibility
    if (el.closest('.products-grid') || el.closest('.categories-grid')) {
      el.classList.add('revealed');
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.05 });

  elements.forEach(el => observer.observe(el));
}

function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const targetNum = parseInt(entry.target.getAttribute('data-target') || '0', 10);
        let startNum = 0;
        const duration = 2000;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = targetNum / totalSteps;

        const timer = setInterval(() => {
          startNum += increment;
          if (startNum >= targetNum) {
            entry.target.textContent = targetNum.toLocaleString('en-IN') + '+';
            clearInterval(timer);
          } else {
            entry.target.textContent = Math.floor(startNum).toLocaleString('en-IN') + '+';
          }
        }, stepTime);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// --------------------------------------------------------------------------
// 8. WATCH & GIFT FINDER INTERACTIVE QUIZ ENGINE
// --------------------------------------------------------------------------
let quizSelections = {
  recipient: 'men',
  budget: 'under-1500',
  style: 'classic'
};

function selectQuizStep(stepNumber, selectedValue) {
  if (stepNumber === 1) quizSelections.recipient = selectedValue;
  if (stepNumber === 2) quizSelections.budget = selectedValue;
  if (stepNumber === 3) quizSelections.style = selectedValue;

  const currentStep = document.getElementById(`quizStep${stepNumber}`);
  const nextStep = document.getElementById(`quizStep${stepNumber + 1}`);
  const dots = document.querySelectorAll('.quiz-step-dot');

  if (currentStep) currentStep.style.display = 'none';

  if (nextStep) {
    nextStep.style.display = 'block';
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === stepNumber);
    });
  } else {
    // Finish Quiz & Render Results
    dots.forEach(dot => dot.classList.add('active'));
    renderQuizResults();
  }
}

function resetQuiz() {
  quizSelections = { recipient: 'men', budget: 'under-1500', style: 'classic' };
  
  [1, 2, 3].forEach(stepNum => {
    const el = document.getElementById(`quizStep${stepNum}`);
    if (el) el.style.display = stepNum === 1 ? 'block' : 'none';
  });

  const resultsWrapper = document.getElementById('quizResultsWrapper');
  if (resultsWrapper) {
    resultsWrapper.style.display = 'none';
    resultsWrapper.classList.remove('active');
  }

  const dots = document.querySelectorAll('.quiz-step-dot');
  dots.forEach((dot, idx) => dot.classList.toggle('active', idx === 0));
}

function renderQuizResults() {
  const resultsGrid = document.getElementById('quizResultsGrid');
  const resultsWrapper = document.getElementById('quizResultsWrapper');
  if (!resultsGrid || !resultsWrapper) return;

  // Filter items matching criteria
  let matched = ALL_PRODUCTS.filter(p => {
    const isWatchOrGift = p.category === 'watches' || p.category === 'gifts' || p.category === 'gift-frames';
    const matchRecipient = !p.gender || p.gender === 'unisex' || p.gender === quizSelections.recipient;
    
    let matchBudget = true;
    if (quizSelections.budget === 'under-1500') matchBudget = p.price <= 1500;
    else if (quizSelections.budget === '1500-4000') matchBudget = p.price > 1500 && p.price <= 4000;
    else if (quizSelections.budget === 'above-4000') matchBudget = p.price > 4000;

    return isWatchOrGift && matchRecipient && matchBudget;
  });

  if (matched.length === 0) matched = ALL_PRODUCTS.slice(0, 4);
  else matched = matched.slice(0, 4);

  resultsGrid.innerHTML = matched.map(createProductCardHTML).join('');
  resultsWrapper.style.display = 'block';
  resultsWrapper.classList.add('active');
  initScrollAnimations();
}

function translateCurrentUI() {
  const lang = localStorage.getItem('govind_lang') || 'en';
  if (typeof translatePageContent === 'function') {
    translatePageContent(lang);
  }
}

// --------------------------------------------------------------------------
// 9. E-COMMERCE SHOPPING CART & CHECKOUT ENGINE
// --------------------------------------------------------------------------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('govind_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('govind_cart', JSON.stringify(cart));
  updateCartCounterBadge();
}

function addToCart(productId) {
  const product = getProductById(productId);
  if (!product) return;

  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      qty: 1
    });
  }

  saveCart(cart);
  showCartToastPill(product.name, cart.reduce((sum, i) => sum + i.qty, 0));
}

function showCartToastPill(productName, totalCount) {
  let pill = document.getElementById('cartToastPill');
  if (!pill) {
    pill = document.createElement('div');
    pill.id = 'cartToastPill';
    pill.className = 'cart-toast-pill';
    document.body.appendChild(pill);
  }

  pill.innerHTML = `
    <div style="display:flex; align-items:center; gap:8px;">
      <i class="ri-checkbox-circle-fill" style="color:var(--primary-color); font-size:20px;"></i>
      <span style="font-size:0.9rem; color:var(--text-primary);">Added to Cart</span>
    </div>
    <button class="btn btn-primary" onclick="openCartDrawer(); hideCartToastPill();" style="padding:6px 14px; font-size:0.85rem; border-radius:20px;">
      <i class="ri-shopping-cart-2-line"></i> View Cart (${totalCount})
    </button>
  `;

  pill.classList.add('active');

  if (window.cartPillTimer) clearTimeout(window.cartPillTimer);
  window.cartPillTimer = setTimeout(() => {
    hideCartToastPill();
  }, 5000);
}

function hideCartToastPill() {
  const pill = document.getElementById('cartToastPill');
  if (pill) pill.classList.remove('active');
}

function updateCartQty(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart(cart);
  renderCartDrawer();
}

function removeFromCart(productId) {
  let cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
  renderCartDrawer();
}

function updateCartCounterBadge() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-counter').forEach(el => el.textContent = totalCount);
}

function renderCartDrawer() {
  let drawer = document.getElementById('cartDrawerModal');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'cartDrawerModal';
    drawer.className = 'cart-drawer-backdrop';
    drawer.innerHTML = `
      <div class="cart-drawer-panel">
        <div class="cart-drawer-header">
          <h3><i class="ri-shopping-cart-2-line"></i> Shopping Cart</h3>
          <button class="cart-close-btn" onclick="closeCartDrawer()"><i class="ri-close-line"></i></button>
        </div>
        <div class="cart-drawer-body" id="cartDrawerItems"></div>
        <div class="cart-drawer-footer">
          <div class="cart-summary-row">
            <span>Total Amount:</span>
            <strong id="cartGrandTotal" style="font-size: 1.4rem; color: var(--primary-color);">₹0</strong>
          </div>
          <button class="btn btn-whatsapp" style="width:100%; font-size:1.1rem; justify-content:center;" onclick="openCheckoutModal()">
            <i class="ri-whatsapp-line"></i> Proceed to Order on WhatsApp
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const itemsContainer = document.getElementById('cartDrawerItems');
  const grandTotalEl = document.getElementById('cartGrandTotal');
  const cart = getCart();

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: var(--text-muted);">
        <i class="ri-shopping-bag-line" style="font-size: 50px; opacity:0.4; display:block; margin-bottom: 15px;"></i>
        <p>Your Shopping Cart is empty.</p>
        <button class="btn btn-outline" style="margin-top:15px;" onclick="closeCartDrawer()">Browse Collections</button>
      </div>
    `;
    if (grandTotalEl) grandTotalEl.textContent = '₹0';
    return;
  }

  let totalSum = 0;
  itemsContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.qty;
    totalSum += itemTotal;
    return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-qty-controls">
            <button onclick="updateCartQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${item.id}')"><i class="ri-delete-bin-line"></i></button>
      </div>
    `;
  }).join('');

  if (grandTotalEl) grandTotalEl.textContent = '₹' + totalSum.toLocaleString('en-IN');
}

function openCartDrawer() {
  renderCartDrawer();
  const drawer = document.getElementById('cartDrawerModal');
  if (drawer) drawer.classList.add('active');
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawerModal');
  if (drawer) drawer.classList.remove('active');
}

function openCheckoutModal() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }
  closeCartDrawer();

  let modal = document.getElementById('checkoutModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'checkoutModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="glass-panel modal-content" style="max-width: 500px; padding:30px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h3 style="font-size:1.4rem; color:var(--text-primary);"><i class="ri-whatsapp-line text-primary-color"></i> Complete Your Order</h3>
          <button onclick="closeCheckoutModal()" style="background:none; color:var(--text-muted); font-size:24px; cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>

        <form id="checkoutForm" onsubmit="submitWhatsAppOrder(event)">
          <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px; font-weight:600; color:var(--text-secondary);">Full Name *</label>
            <input type="text" id="custName" required placeholder="Enter your name" style="width:100%; padding:12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px; font-weight:600; color:var(--text-secondary);">Mobile Number *</label>
            <input type="tel" id="custPhone" required placeholder="10-digit mobile number" style="width:100%; padding:12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
          </div>
          <div style="margin-bottom:15px;">
            <label style="display:block; margin-bottom:5px; font-weight:600; color:var(--text-secondary);">Delivery Address *</label>
            <textarea id="custAddress" required rows="3" placeholder="Full address in Naigaon Bazaar or nearby area..." style="width:100%; padding:12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);"></textarea>
          </div>
          <div style="margin-bottom:20px;">
            <label style="display:block; margin-bottom:5px; font-weight:600; color:var(--text-secondary);">Payment Method</label>
            <select id="custPayment" style="width:100%; padding:12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
              <option value="Razorpay Online Payment (Cards/UPI/Netbanking)">Razorpay Gateway (Cards, Netbanking, UPI, Wallets)</option>
              <option value="UPI / GPay / PhonePe">Direct Shop UPI QR / GPay / PhonePe</option>
              <option value="Cash on Delivery">Cash on Delivery (Pay at Shop/Delivery)</option>
            </select>
          </div>
          <button type="submit" class="btn btn-whatsapp" style="width:100%; justify-content:center; font-size:1.1rem;">
            <i class="ri-whatsapp-line"></i> Confirm & Proceed to Payment
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }
  modal.classList.add('active');
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

function submitWhatsAppOrder(event) {
  if (event && event.preventDefault) event.preventDefault();
  const nameEl = document.getElementById('custName');
  const phoneEl = document.getElementById('custPhone');
  const addressEl = document.getElementById('custAddress');
  const paymentEl = document.getElementById('custPayment');

  if (!nameEl || !phoneEl || !addressEl || !paymentEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const address = addressEl.value.trim();
  const payment = paymentEl.value;
  const cart = getCart();

  if (cart.length === 0) return;

  const orderDetails = { name, phone, address, payment, cart };

  if (payment.includes('Razorpay')) {
    closeCheckoutModal();
    openRazorpayPaymentGateway(orderDetails);
  } else if (payment.includes('UPI')) {
    closeCheckoutModal();
    openUpiGatewayModal(orderDetails);
  } else {
    dispatchWhatsAppMessage(orderDetails, '');
  }
}

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (typeof Razorpay !== 'undefined') {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

async function openRazorpayPaymentGateway(orderDetails) {
  const config = typeof getSiteConfig === 'function' ? getSiteConfig() : {};
  const razorpayKey = config.razorpayKey || 'rzp_test_GovindrajShopKey123';

  let totalSum = 0;
  orderDetails.cart.forEach(item => totalSum += item.price * item.qty);

  showToast('Initializing Payment Gateway...');
  const sdkLoaded = await loadRazorpayScript();

  if (!sdkLoaded || typeof Razorpay === 'undefined') {
    showToast('Razorpay SDK offline. Opening Direct UPI Payment Gateway...');
    openUpiGatewayModal(orderDetails);
    return;
  }

  const options = {
    key: razorpayKey,
    amount: Math.round(totalSum * 100), // Amount in paise
    currency: 'INR',
    name: config.brandName || 'GOVINDRAJ WATCH & GIFTS',
    description: `Order Checkout (${orderDetails.cart.length} items)`,
    image: 'assets/images/logo.png',
    prefill: {
      name: orderDetails.name,
      contact: orderDetails.phone
    },
    theme: {
      color: '#6366f1'
    },
    handler: function (response) {
      const paymentId = response.razorpay_payment_id;
      showToast(`Payment Successful! Payment ID: ${paymentId}`);
      dispatchWhatsAppMessage(orderDetails, `Razorpay Payment Successful (ID: ${paymentId})`);
    },
    modal: {
      ondismiss: function () {
        showToast('Payment window closed. You can complete via UPI or COD.');
      }
    }
  };

  try {
    const rzp = new Razorpay(options);
    rzp.open();
  } catch (e) {
    console.error('Razorpay Initialization Error:', e);
    openUpiGatewayModal(orderDetails);
  }
}

function openUpiGatewayModal(orderDetails) {
  const config = typeof getSiteConfig === 'function' ? getSiteConfig() : {};
  const upiId = config.upiId || '8484080732@upi';
  const upiName = config.upiName || 'Govindraj Watch Shop';
  const phone = config.phone || '8484080732';

  let totalSum = 0;
  orderDetails.cart.forEach(item => totalSum += item.price * item.qty);

  const upiDeepLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName)}&am=${totalSum}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(upiDeepLink)}`;

  let modal = document.getElementById('upiGatewayModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upiGatewayModal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="glass-panel modal-content" style="max-width: 480px; padding:25px; text-align:center;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
        <h3 style="font-size:1.3rem; color:var(--text-primary);"><i class="ri-qr-code-line text-primary-color"></i> Instant UPI Payment</h3>
        <button onclick="closeUpiGatewayModal()" style="background:none; color:var(--text-muted); font-size:24px; cursor:pointer;"><i class="ri-close-line"></i></button>
      </div>

      <div style="background:var(--bg-secondary); border:1px solid var(--border-color); padding:15px; border-radius:16px; margin-bottom:15px;">
        <span style="color:var(--text-secondary); font-size:0.9rem;">Amount Payable</span>
        <div style="font-size:2.2rem; font-weight:800; color:var(--primary-color);">₹${totalSum.toLocaleString('en-IN')}</div>
        <span style="font-size:0.85rem; color:var(--text-muted);">${upiName}</span>
      </div>

      <!-- Live Dynamic QR Code -->
      <div style="background:#ffffff; padding:15px; border-radius:16px; display:inline-block; margin-bottom:15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <img src="${qrCodeUrl}" alt="UPI Payment QR Code" style="width:190px; height:190px; display:block; margin:0 auto;">
        <span style="color:#000; font-size:0.8rem; font-weight:700; display:block; margin-top:8px;">Scan with GPay, PhonePe, Paytm or Cred</span>
      </div>

      <div style="background:rgba(var(--primary-rgb),0.08); border:1px solid var(--border-color); border-radius:12px; padding:12px; margin-bottom:15px; text-align:left; font-size:0.9rem;">
        <div><strong>Shop UPI ID:</strong> <span style="color:var(--primary-color); font-weight:700;">${upiId}</span></div>
        <div><strong>GPay / PhonePe Number:</strong> <span style="font-weight:700;">${phone}</span></div>
      </div>

      <a href="${upiDeepLink}" class="btn btn-primary" style="width:100%; justify-content:center; margin-bottom:12px; font-size:1.05rem;">
        <i class="ri-smartphone-line"></i> Open GPay / PhonePe / UPI App
      </a>

      <div style="margin-bottom:15px; text-align:left;">
        <label style="display:block; font-size:0.85rem; margin-bottom:4px; color:var(--text-secondary);">Transaction UTR / Ref No. (Optional)</label>
        <input type="text" id="upiUtrNo" placeholder="12-digit UTR transaction number" style="width:100%; padding:10px 12px; border-radius:8px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary); font-size:0.9rem;">
      </div>

      <button class="btn btn-whatsapp" style="width:100%; justify-content:center; font-size:1.05rem;" id="confirmUpiBtn">
        <i class="ri-whatsapp-line"></i> Confirm & Send Order to WhatsApp
      </button>
    </div>
  `;

  modal.classList.add('active');

  document.getElementById('confirmUpiBtn').onclick = () => {
    const utr = document.getElementById('upiUtrNo').value.trim();
    closeUpiGatewayModal();
    dispatchWhatsAppMessage(orderDetails, utr);
  };
}

function closeUpiGatewayModal() {
  const modal = document.getElementById('upiGatewayModal');
  if (modal) modal.classList.remove('active');
}

function dispatchWhatsAppMessage(orderDetails, utrNo) {
  const { name, phone, address, payment, cart } = orderDetails;

  let paymentText = payment;
  if (utrNo) paymentText += ` (UTR: ${utrNo})`;

  let message = `🛒 *NEW E-COMMERCE ORDER - GOVINDRAJ SHOP*\n`;
  message += `------------------------------------\n`;
  message += `👤 *Customer*: ${name}\n`;
  message += `📱 *Phone*: ${phone}\n`;
  message += `📍 *Address*: ${address}\n`;
  message += `💳 *Payment*: ${paymentText}\n\n`;
  message += `📦 *ORDER ITEMS*:\n`;

  let totalSum = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    totalSum += itemTotal;
    message += `${index + 1}. *${item.name}*\n   Qty: ${item.qty} x ₹${item.price.toLocaleString('en-IN')} = ₹${itemTotal.toLocaleString('en-IN')}\n`;
  });

  message += `------------------------------------\n`;
  message += `💰 *GRAND TOTAL*: ₹${totalSum.toLocaleString('en-IN')}\n\n`;
  message += `Please confirm my order. Thank you!`;

  // Log order into Store Database & Deduct Stock
  if (typeof addOrderToStore === 'function') {
    const isPaid = paymentText.includes('Paid') || paymentText.includes('Successful') || paymentText.includes('UTR');
    addOrderToStore({
      name,
      phone,
      address,
      payment: paymentText,
      paymentStatus: isPaid ? 'Paid' : 'Pending',
      status: 'Pending',
      cart,
      total: totalSum
    });
  }

  const config = typeof getSiteConfig === 'function' ? getSiteConfig() : { phone: '8484080732' };
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${encodeURIComponent(message)}`;
  
  saveCart([]);
  closeCheckoutModal();
  window.open(whatsappUrl, '_blank');
}

/* ==========================================================================
   WATCH & ACCESSORIES REPAIR SERVICE BOOKING SYSTEM
   ========================================================================== */
function openRepairModal(preselectCategory = '') {
  let modal = document.getElementById('repairModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'repairModal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="glass-panel modal-content" style="max-width: 540px; padding:25px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
          <h3 style="font-size:1.3rem; color:var(--text-primary); display:flex; align-items:center; gap:8px;">
            <i class="ri-tools-line text-primary-color"></i> Watch & Product Repair Request
          </h3>
          <button onclick="closeRepairModal()" style="background:none; border:none; color:var(--text-muted); font-size:24px; cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>
        <p style="color:var(--text-secondary); font-size:0.9rem; margin-bottom:20px;">
          Fill out your watch or product repair details below. Your request will be instantly notified to Govindraj Watch Shop via <strong>WhatsApp</strong> and booked in our store schedule.
        </p>
        
        <form onsubmit="submitRepairRequest(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:15px;">
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Your Name *</label>
              <input type="text" id="custRepairName" required placeholder="e.g. Omkar Katturwar" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">WhatsApp Phone *</label>
              <input type="tel" id="custRepairPhone" required placeholder="10-digit mobile number" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
            </div>
          </div>

          <div style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Repair / Service Category *</label>
            <select id="repairCategory" required style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
              <option value="Wrist Watch - Battery / Cell Change">⌚ Wrist Watch - Battery / Cell Replacement</option>
              <option value="Wrist Watch - Glass / Crystal Repair">⌚ Wrist Watch - Glass / Crystal Repair</option>
              <option value="Wrist Watch - Machine Servicing & Oiling">⌚ Wrist Watch - Machine Servicing & Calibration</option>
              <option value="Wrist Watch - Metal Chain / Leather Strap Fitting">⌚ Wrist Watch - Strap / Chain Fitting & Sizing</option>
              <option value="Wall Clock - Repair & Machine Replacement">🕰️ Wall Clock Repair & Machine Change</option>
              <option value="Sunglasses / Goggles Frame Repair">🕶️ Sunglasses / Goggles Frame Fitting</option>
              <option value="Leather Bag / Belt Stitching & Zipper Repair">👜 Leather Bag / Belt Repair & Stitching</option>
              <option value="Other Gift / Accessory Repair">🎁 Other Product / Gift Accessory Repair</option>
            </select>
          </div>

          <div style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Product Brand & Model Name</label>
            <input type="text" id="repairBrandModel" placeholder="e.g. Titan Octane, Sonata, Ajanta Wall Clock, Leather Bag" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
          </div>

          <div style="margin-bottom:15px;">
            <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Describe the Issue / Problem *</label>
            <textarea id="repairIssue" required rows="3" placeholder="e.g. Watch stopped working, glass broken, battery drained, strap loose..." style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);"></textarea>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px;">
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Preferred Appointment Date</label>
              <input type="date" id="repairDate" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
            </div>
            <div>
              <label style="display:block; font-size:0.85rem; font-weight:600; margin-bottom:5px; color:var(--text-secondary);">Preferred Time Slot</label>
              <select id="repairTimeSlot" style="width:100%; padding:10px 12px; border-radius:10px; border:1px solid var(--border-color); background:var(--bg-secondary); color:var(--text-primary);">
                <option value="Morning (10:00 AM - 01:00 PM)">Morning (10:00 AM - 01:00 PM)</option>
                <option value="Afternoon (01:00 PM - 05:00 PM)">Afternoon (01:00 PM - 05:00 PM)</option>
                <option value="Evening (05:00 PM - 09:00 PM)">Evening (05:00 PM - 09:00 PM)</option>
              </select>
            </div>
          </div>

          <button type="submit" class="btn btn-whatsapp" style="width:100%; justify-content:center; font-size:1.1rem;">
            <i class="ri-whatsapp-line"></i> Send Repair Request to WhatsApp
          </button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  }

  if (preselectCategory) {
    const sel = document.getElementById('repairCategory');
    if (sel) sel.value = preselectCategory;
  }

  // Default date to today
  const dateInput = document.getElementById('repairDate');
  if (dateInput && !dateInput.value) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }

  modal.classList.add('active');
}

function closeRepairModal() {
  const modal = document.getElementById('repairModal');
  if (modal) modal.classList.remove('active');
}

async function submitRepairRequest(event) {
  if (event && event.preventDefault) event.preventDefault();
  const nameEl = document.getElementById('custRepairName');
  const phoneEl = document.getElementById('custRepairPhone');
  const categoryEl = document.getElementById('repairCategory');
  const brandModelEl = document.getElementById('repairBrandModel');
  const issueEl = document.getElementById('repairIssue');
  const dateEl = document.getElementById('repairDate');
  const timeSlotEl = document.getElementById('repairTimeSlot');

  if (!nameEl || !phoneEl || !categoryEl || !issueEl) return;

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const category = categoryEl.value;
  const brandModel = (brandModelEl ? brandModelEl.value.trim() : '') || 'Standard / Unspecified';
  const issue = issueEl.value.trim();
  const date = (dateEl ? dateEl.value : '') || new Date().toLocaleDateString('en-IN');
  const timeSlot = timeSlotEl ? timeSlotEl.value : 'Anytime';

  const repairData = {
    name,
    phone,
    category,
    brandModel,
    issue,
    date,
    timeSlot,
    status: 'Pending'
  };

  if (typeof addRepairToStore === 'function') {
    addRepairToStore(repairData);
  }

  // 1. Send repair record to backend API
  try {
    await fetch('/api/repairs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(repairData)
    });
  } catch (e) {
    console.warn('Backend API save failed, fallback local save:', e);
  }

  // 2. Format WhatsApp notification message
  let message = `🛠️ *GOVINDRAJ WATCH SHOP - REPAIR & SERVICE BOOKING*\n`;
  message += `------------------------------------\n`;
  message += `👤 *Customer Name*: ${name}\n`;
  message += `📱 *Phone / WhatsApp*: ${phone}\n`;
  message += `🏷️ *Service Category*: ${category}\n`;
  message += `⌚ *Brand / Model*: ${brandModel}\n`;
  message += `📝 *Problem Details*: ${issue}\n`;
  message += `📅 *Preferred Date & Time*: ${date} (${timeSlot})\n`;
  message += `📍 *Store*: Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazaar\n\n`;
  message += `Please confirm my repair appointment slot. Thank you!`;

  const config = typeof getSiteConfig === 'function' ? getSiteConfig() : { phone: '8484080732' };
  const whatsappUrl = `https://wa.me/91${config.phone}?text=${encodeURIComponent(message)}`;

  closeRepairModal();
  showToast('Repair Service Booking request generated! Redirecting to WhatsApp...');
  window.open(whatsappUrl, '_blank');
}
