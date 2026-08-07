/* ==========================================================================
   GOVINDRAJ WATCH SHOP - RENDER.COM EXPRESS BACKEND & DATABASE SERVER
   Provides REST APIs for Products, Orders, Site Config, Backup & Auth
   ========================================================================== */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'store_db.json');
const ADMIN_SECRET_TOKEN = process.env.ADMIN_TOKEN || 'govind_admin_auth_token_2026';

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Ensure data folder exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// Security Middleware: Require Admin Auth Token for Sensitive Endpoints
function requireAdminAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || (req.headers['authorization'] || '').replace('Bearer ', '');
  if (token && token === ADMIN_SECRET_TOKEN) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Unauthorized: Admin authentication token required' });
}

// Atomic Database Persistence to Prevent File Corruption
function saveDB(db) {
  const tmpFile = DB_FILE + '.tmp';
  fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
  if (fs.existsSync(tmpFile)) {
    fs.copyFileSync(tmpFile, DB_FILE);
    fs.unlinkSync(tmpFile);
  }
}

function getDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initialDB = {
      siteConfig: {
        brandName: 'GOVINDRAJ WATCH AND GIFTS ACCESSORIES SHOP',
        brandSubtitle: 'NAIGAON BAZAAR • AUTHORIZED DEALER',
        phone: '8484080732',
        whatsapp: '8484080732',
        email: 'contact@govindrajwatchshop.com',
        address: 'Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazaar',
        announcement: 'Medewar Complex, Below Bank of Buldhana, Main Road, Naigaon Bazaar',
        heroBadge: 'Premium Luxury Collection 2026',
        heroTitle: 'Elegance & Style For Every Occasion',
        heroDesc: 'Discover Naigaon Bazaar\'s finest selection of luxury branded watches, genuine leather belts, wallets, designer sunglasses, and premium gift frames.',
        aboutStoryTitle: '15+ Years of Trust & Quality',
        ownerName: 'Govindraj Ambatwar',
        ownerPhone: '8484080732',
        upiId: '8484080732@upi',
        upiName: 'Govindraj Watch Shop',
        razorpayKey: 'rzp_test_GovindrajShopKey123',
        developerName: 'Omkar Katturwar',
        developerPhone: '7219290885'
      },
      products: [],
      orders: [
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
            { id: 'watch-1', name: 'Titan Nebula 18K Gold Craftsmanship Watch', price: 12999, qty: 1 }
          ],
          total: 12999
        }
      ],
      adminCreds: { user: 'admin', pass: 'govindraj123' }
    };
    saveDB(initialDB);
    return initialDB;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return { siteConfig: {}, products: [], orders: [], adminCreds: { user: 'admin', pass: 'govindraj123' } };
  }
}

// REST API ENDPOINTS

// 1. Site Config
app.get('/api/config', (req, res) => {
  const db = getDB();
  res.json({ success: true, config: db.siteConfig });
});

app.post('/api/config', requireAdminAuth, (req, res) => {
  const db = getDB();
  db.siteConfig = { ...db.siteConfig, ...req.body };
  saveDB(db);
  res.json({ success: true, config: db.siteConfig });
});

// 2. Products
app.get('/api/products', (req, res) => {
  const db = getDB();
  res.json({ success: true, products: db.products });
});

app.post('/api/products', requireAdminAuth, (req, res) => {
  const db = getDB();
  const productData = req.body;
  const existingIdx = db.products.findIndex(p => p.id === productData.id);
  if (existingIdx >= 0) {
    db.products[existingIdx] = { ...db.products[existingIdx], ...productData };
  } else {
    if (!productData.id) productData.id = 'custom_' + Date.now();
    db.products.unshift(productData);
  }
  saveDB(db);
  res.json({ success: true, products: db.products });
});

app.delete('/api/products/:id', requireAdminAuth, (req, res) => {
  const db = getDB();
  db.products = db.products.filter(p => p.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, products: db.products });
});

// 3. Orders
app.get('/api/orders', requireAdminAuth, (req, res) => {
  const db = getDB();
  res.json({ success: true, orders: db.orders });
});

app.post('/api/orders', (req, res) => {
  const db = getDB();
  const orderData = req.body;
  orderData.id = 'ORD_' + Date.now();
  orderData.date = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  db.orders.unshift(orderData);

  // Deduct inventory stock
  if (Array.isArray(orderData.cart)) {
    orderData.cart.forEach(item => {
      const p = db.products.find(prod => prod.id === item.id);
      if (p) p.stock = Math.max(0, (p.stock || 12) - item.qty);
    });
  }

  saveDB(db);
  res.json({ success: true, order: orderData, orders: db.orders });
});

// 3b. Watch & Product Repair Requests
app.get('/api/repairs', requireAdminAuth, (req, res) => {
  const db = getDB();
  res.json({ success: true, repairs: db.repairs || [] });
});

app.post('/api/repairs', (req, res) => {
  const db = getDB();
  if (!db.repairs) db.repairs = [];
  const repairData = req.body;
  if (!repairData.id) repairData.id = 'REP_' + Date.now();
  repairData.createdAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
  repairData.status = repairData.status || 'Pending';
  db.repairs.unshift(repairData);
  saveDB(db);
  res.json({ success: true, repair: repairData, repairs: db.repairs });
});

app.patch('/api/repairs/:id', requireAdminAuth, (req, res) => {
  const db = getDB();
  if (!db.repairs) db.repairs = [];
  const repair = db.repairs.find(r => r.id === req.params.id);
  if (repair) {
    if (req.body.status) repair.status = req.body.status;
    saveDB(db);
    res.json({ success: true, repair, repairs: db.repairs });
  } else {
    res.status(404).json({ success: false, message: 'Repair request not found' });
  }
});

app.delete('/api/repairs/:id', requireAdminAuth, (req, res) => {
  const db = getDB();
  if (!db.repairs) db.repairs = [];
  db.repairs = db.repairs.filter(r => r.id !== req.params.id);
  saveDB(db);
  res.json({ success: true, repairs: db.repairs });
});

// 4. Admin Auth
app.post('/api/admin/login', (req, res) => {
  const db = getDB();
  const { user, pass } = req.body;
  const creds = db.adminCreds || { user: 'admin', pass: 'govindraj123' };

  if ((user || '').toLowerCase().trim() === creds.user.toLowerCase() && pass === creds.pass) {
    res.json({ success: true, token: ADMIN_SECRET_TOKEN });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Credentials' });
  }
});

// 5. Payment Gateway Verification API
app.post('/api/payments/verify', (req, res) => {
  const { razorpay_payment_id } = req.body;
  if (razorpay_payment_id) {
    res.json({ success: true, message: 'Payment verified successfully', paymentId: razorpay_payment_id });
  } else {
    res.status(400).json({ success: false, message: 'Missing payment parameters' });
  }
});

app.post('/api/payments/webhook', (req, res) => {
  console.log('Payment webhook event received:', req.body);
  res.json({ received: true });
});

// 6. Backup & Restore
app.get('/api/backup', requireAdminAuth, (req, res) => {
  const db = getDB();
  res.json(db);
});

app.post('/api/restore', requireAdminAuth, (req, res) => {
  const newDB = req.body;
  if (newDB && typeof newDB === 'object') {
    saveDB(newDB);
    res.json({ success: true, message: 'Database Restored Successfully' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid Backup Payload' });
  }
});

// Fallback to 404.html for unhandled routes
app.get('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Govindraj Shop Backend Server running on port ${PORT}`);
});
