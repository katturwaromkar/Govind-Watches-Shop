/* ==========================================================================
   GOVINDRAJ WATCH & ACCESSORIES SHOP - MASTER STORE MANAGEMENT SYSTEM (admin.js)
   Handles Orders, Payment Gateways, Inventory Stock Monitor, Analytics & Security
   ========================================================================== */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', checkAdminSession);
} else {
  checkAdminSession();
}

function getAdminCredentials() {
  try {
    const saved = localStorage.getItem('govind_admin_creds');
    return saved ? JSON.parse(saved) : { user: 'admin', pass: 'govindraj123' };
  } catch (e) {
    return { user: 'admin', pass: 'govindraj123' };
  }
}

function saveAdminCredentials(user, pass) {
  localStorage.setItem('govind_admin_creds', JSON.stringify({ user, pass }));
}

function checkAdminSession() {
  const sessAuth = sessionStorage.getItem('govind_admin_auth');
  const localAuth = localStorage.getItem('govind_admin_auth');
  const isAuth = (sessAuth === 'true' || localAuth === 'true');

  const loginScreen = document.getElementById('loginScreen');
  const dashboard = document.getElementById('adminDashboard');
  const topActions = document.getElementById('adminTopActions');

  if (isAuth) {
    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    if (topActions) topActions.style.display = 'flex';
    loadAdminAnalytics();
    loadAdminOrders();
    loadAdminRepairs();
    loadAdminStock();
    loadAdminProducts();
    loadAdminSettings();
  } else {
    if (loginScreen) loginScreen.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    if (topActions) topActions.style.display = 'none';
  }
}

function handleAdminLogin(event) {
  if (event && event.preventDefault) event.preventDefault();

  const userEl = document.getElementById('adminUser');
  const passEl = document.getElementById('adminPass');

  if (!userEl || !passEl) return false;

  const inputUser = userEl.value.toLowerCase().trim();
  const inputPass = passEl.value.trim();
  const creds = getAdminCredentials();

  if (inputUser === creds.user.toLowerCase() && inputPass === creds.pass) {
    sessionStorage.setItem('govind_admin_auth', 'true');
    localStorage.setItem('govind_admin_auth', 'true');
    checkAdminSession();
  } else {
    alert('Invalid Admin Credentials!\nPlease check your username and password.');
  }
  return false;
}

function logoutAdmin() {
  sessionStorage.removeItem('govind_admin_auth');
  localStorage.removeItem('govind_admin_auth');
  checkAdminSession();
}

function switchAdminTab(tabName) {
  const tabs = ['orders', 'repairs', 'stock', 'products', 'header', 'banners', 'footer', 'security'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}Btn`);
    const div = document.getElementById(`${t}Tab`);
    if (btn) btn.classList.toggle('active', t === tabName);
    if (div) div.style.display = t === tabName ? 'block' : 'none';
  });

  if (tabName === 'repairs') loadAdminRepairs();
}

function handleChangeAdminPassword(event) {
  event.preventDefault();
  const currPass = document.getElementById('currPass').value.trim();
  const newUser = document.getElementById('newAdminUser').value.trim();
  const newPass = document.getElementById('newAdminPass').value.trim();
  const confirmPass = document.getElementById('confirmAdminPass').value.trim();

  const creds = getAdminCredentials();

  if (currPass !== creds.pass) {
    alert('Current password entered is incorrect!');
    return;
  }

  if (newPass.length < 4) {
    alert('New password must be at least 4 characters long!');
    return;
  }

  if (newPass !== confirmPass) {
    alert('New password and Confirm Password do not match!');
    return;
  }

  saveAdminCredentials(newUser, newPass);
  alert('Admin credentials updated successfully! Please login with your new credentials.');
  logoutAdmin();
}

// --------------------------------------------------------------------------
// STORE ANALYTICS KPI DASHBOARD ENGINE
// --------------------------------------------------------------------------
function loadAdminAnalytics() {
  const orders = typeof getLiveOrders === 'function' ? getLiveOrders() : [];
  const products = typeof getLiveProducts === 'function' ? getLiveProducts() : [];

  let totalRevenue = 0;
  orders.forEach(o => {
    if (o.paymentStatus === 'Paid' || o.status === 'Completed' || o.payment.includes('UTR') || o.payment.includes('Successful')) {
      totalRevenue += o.total || 0;
    }
  });

  let totalStockCount = 0;
  let lowStockCount = 0;
  products.forEach(p => {
    const s = p.stock !== undefined ? p.stock : 12;
    totalStockCount += s;
    if (s <= 3) lowStockCount++;
  });

  const revEl = document.getElementById('kpiRevenue');
  const ordEl = document.getElementById('kpiTotalOrders');
  const stkEl = document.getElementById('kpiTotalStock');
  const lowEl = document.getElementById('kpiLowStock');

  if (revEl) revEl.textContent = '₹' + totalRevenue.toLocaleString('en-IN');
  if (ordEl) ordEl.textContent = orders.length;
  if (stkEl) stkEl.textContent = totalStockCount;
  if (lowEl) lowEl.textContent = lowStockCount;
}

// --------------------------------------------------------------------------
// ORDERS & PAYMENTS MANAGEMENT TAB
// --------------------------------------------------------------------------
function loadAdminOrders() {
  const orders = typeof getLiveOrders === 'function' ? getLiveOrders() : [];
  renderAdminOrdersTable(orders);
}

function renderAdminOrdersTable(ordersList) {
  const tbody = document.getElementById('adminOrdersTableBody');
  if (!tbody) return;

  if (ordersList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px;">No customer orders logged yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = ordersList.map(o => {
    const itemsSummary = (o.cart || []).map(i => `${i.name} (x${i.qty})`).join('<br>');
    const isPaid = o.paymentStatus === 'Paid' || o.payment.includes('UTR') || o.payment.includes('Successful');

    return `
      <tr>
        <td><strong>${o.id}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${o.date}</span></td>
        <td><strong>${o.name}</strong><br><span style="font-size:0.85rem; color:var(--primary-color);">📞 ${o.phone}</span><br><span style="font-size:0.8rem; color:var(--text-secondary);">${o.address}</span></td>
        <td style="font-size:0.88rem; max-width:240px;">${itemsSummary}</td>
        <td><strong style="font-size:1.1rem; color:var(--primary-color);">₹${(o.total || 0).toLocaleString('en-IN')}</strong></td>
        <td>
          <span class="badge-status ${isPaid ? 'badge-paid' : 'badge-pending'}">${isPaid ? 'Paid' : 'Pending'}</span><br>
          <span style="font-size:0.8rem; color:var(--text-secondary);">${o.payment}</span>
        </td>
        <td>
          <select onchange="handleOrderStatusChange('${o.id}', this.value)" class="form-control" style="padding:6px 10px; font-size:0.82rem;">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
            <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <button class="btn btn-primary" style="padding:6px 10px; font-size:0.8rem; background:#ef4444; border-color:#ef4444;" onclick="handleDeleteOrder('${o.id}')" title="Delete Order"><i class="ri-delete-bin-line"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function handleOrderStatusChange(orderId, newStatus) {
  if (typeof updateOrderStatus === 'function') {
    const isPaid = newStatus === 'Completed' ? 'Paid' : null;
    updateOrderStatus(orderId, newStatus, isPaid);
    loadAdminAnalytics();
    loadAdminOrders();
  }
}

function handleDeleteOrder(orderId) {
  if (confirm('Are you sure you want to delete this customer order record?')) {
    if (typeof deleteStoreOrder === 'function') {
      deleteStoreOrder(orderId);
      loadAdminAnalytics();
      loadAdminOrders();
    }
  }
}

// --------------------------------------------------------------------------
// WATCH & ACCESSORIES REPAIR BOOKINGS MANAGEMENT TAB
// --------------------------------------------------------------------------
async function loadAdminRepairs() {
  let repairs = [];
  try {
    const res = await fetch('/api/repairs');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.repairs) {
        repairs = data.repairs;
      }
    }
  } catch (e) {
    console.warn('Failed to fetch repairs from API, fallback local:', e);
  }

  if (!repairs || repairs.length === 0) {
    if (typeof getLiveRepairs === 'function') {
      repairs = getLiveRepairs();
    }
  }

  renderAdminRepairsTable(repairs);
}

function renderAdminRepairsTable(repairsList) {
  const tbody = document.getElementById('adminRepairsTableBody');
  if (!tbody) return;

  if (!repairsList || repairsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px;">No repair requests logged yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = repairsList.map(r => {
    const isPending = (r.status || 'Pending') === 'Pending';
    const isCompleted = (r.status || 'Pending') === 'Completed' || (r.status || 'Pending') === 'Fixed';
    const statusClass = isCompleted ? 'badge-paid' : (isPending ? 'badge-pending' : 'badge-status');

    return `
      <tr>
        <td><strong>${r.id || 'REP_' + Date.now()}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${r.createdAt || r.date || ''}</span></td>
        <td><strong>${r.name}</strong><br><span style="font-size:0.85rem; color:var(--primary-color);">📞 ${r.phone}</span></td>
        <td><strong style="font-size:0.88rem;">${r.category}</strong><br><span style="font-size:0.8rem; color:var(--text-secondary);">${r.brandModel || 'Unspecified'}</span></td>
        <td style="font-size:0.85rem; max-width:260px;">${r.issue}</td>
        <td><strong>📅 ${r.date}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${r.timeSlot || ''}</span></td>
        <td>
          <span class="badge-status ${statusClass}">${r.status || 'Pending'}</span><br>
          <select onchange="handleRepairStatusChange('${r.id}', this.value)" class="form-control" style="padding:4px 8px; font-size:0.8rem; margin-top:4px;">
            <option value="Pending" ${(r.status || 'Pending') === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="In Progress" ${r.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Waiting for Parts" ${r.status === 'Waiting for Parts' ? 'selected' : ''}>Waiting for Parts</option>
            <option value="Ready for Pickup" ${r.status === 'Ready for Pickup' ? 'selected' : ''}>Ready for Pickup</option>
            <option value="Completed" ${r.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${r.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div style="display:flex; gap:6px;">
            <a href="https://wa.me/91${r.phone}?text=${encodeURIComponent(`Hello ${r.name}, updating you regarding your ${r.category} repair request (${r.id}) at Govindraj Watch Shop. Status: ${r.status || 'Pending'}.`)}" target="_blank" class="btn btn-whatsapp" style="padding:5px 8px; font-size:0.8rem;" title="WhatsApp Customer"><i class="ri-whatsapp-line"></i></a>
            <button class="btn btn-primary" style="padding:5px 8px; font-size:0.8rem; background:#ef4444; border-color:#ef4444;" onclick="handleDeleteRepair('${r.id}')" title="Delete Repair Record"><i class="ri-delete-bin-line"></i></button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

async function handleRepairStatusChange(repairId, newStatus) {
  if (typeof updateRepairStatus === 'function') {
    updateRepairStatus(repairId, newStatus);
  }
  try {
    await fetch(`/api/repairs/${repairId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
  } catch (e) {
    console.warn('API update failed:', e);
  }
  loadAdminRepairs();
}

async function handleDeleteRepair(repairId) {
  if (confirm('Are you sure you want to delete this repair request record?')) {
    if (typeof deleteStoreRepair === 'function') {
      deleteStoreRepair(repairId);
    }
    try {
      await fetch(`/api/repairs/${repairId}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('API delete failed:', e);
    }
    loadAdminRepairs();
  }
}

// --------------------------------------------------------------------------
// INVENTORY & STOCK RECORD MONITOR TAB
// --------------------------------------------------------------------------
function loadAdminStock() {
  const products = getLiveProducts();
  renderAdminStockTable(products);
}

function renderAdminStockTable(productsList) {
  const tbody = document.getElementById('adminStockTableBody');
  if (!tbody) return;

  if (productsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px;">No inventory items found.</td></tr>`;
    return;
  }

  tbody.innerHTML = productsList.map(p => {
    const stock = p.stock !== undefined ? p.stock : 12;
    let badgeClass = 'badge-paid';
    let badgeLabel = 'In Stock';

    if (stock === 0) {
      badgeClass = 'badge-status';
      badgeLabel = 'Out of Stock';
    } else if (stock <= 3) {
      badgeClass = 'badge-pending';
      badgeLabel = 'Low Stock Alert';
    }

    return `
      <tr>
        <td><img src="${p.image}" alt="${p.name}" class="product-thumb"></td>
        <td><strong>${p.name}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${p.brand}</span></td>
        <td><span class="badge-gold" style="font-size:0.75rem;">${p.category}</span></td>
        <td><strong>₹${p.price.toLocaleString('en-IN')}</strong></td>
        <td><strong style="font-size:1.1rem; color:${stock <= 3 ? '#ef4444' : 'var(--text-primary)'};">${stock} units</strong></td>
        <td><span class="badge-status ${badgeClass}" style="${stock === 0 ? 'background:#fee2e2; color:#dc2626;' : ''}">${badgeLabel}</span></td>
        <td>
          <button class="btn btn-outline" style="padding:4px 10px; font-size:0.8rem; margin-right:4px;" onclick="adjustProductStock('${p.id}', 1)" title="Add 1 Unit">+1</button>
          <button class="btn btn-outline" style="padding:4px 10px; font-size:0.8rem;" onclick="adjustProductStock('${p.id}', -1)" title="Deduct 1 Unit">-1</button>
        </td>
      </tr>
    `;
  }).join('');
}

function filterAdminStock() {
  const q = document.getElementById('stockSearchInput').value.toLowerCase().trim();
  const products = getLiveProducts();
  if (!q) {
    renderAdminStockTable(products);
    return;
  }
  const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
  renderAdminStockTable(filtered);
}

function adjustProductStock(productId, delta) {
  let products = getLiveProducts();
  const p = products.find(prod => prod.id === productId);
  if (p) {
    p.stock = Math.max(0, (p.stock !== undefined ? p.stock : 12) + delta);
    saveLiveProducts(products);
    loadAdminAnalytics();
    loadAdminStock();
  }
}

// --------------------------------------------------------------------------
// PRODUCT CATALOG MANAGER TAB
// --------------------------------------------------------------------------
function loadAdminProducts() {
  const products = getLiveProducts();
  renderAdminProductsTable(products);
}

function renderAdminProductsTable(productsList) {
  const tbody = document.getElementById('adminProductsTableBody');
  if (!tbody) return;

  if (productsList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px;">No products found.</td></tr>`;
    return;
  }

  tbody.innerHTML = productsList.map(p => `
    <tr>
      <td><img src="${p.image}" alt="${p.name}" class="product-thumb"></td>
      <td><strong>${p.name}</strong><br><span style="font-size:0.8rem; color:var(--text-muted);">${p.id}</span></td>
      <td><span class="badge-gold" style="font-size:0.75rem;">${p.category}</span></td>
      <td>${p.brand}</td>
      <td><strong>₹${p.price.toLocaleString('en-IN')}</strong> ${p.oldPrice ? `<span style="font-size:0.8rem; text-decoration:line-through; color:var(--text-muted);">₹${p.oldPrice.toLocaleString('en-IN')}</span>` : ''}</td>
      <td>
        <button class="btn btn-outline" style="padding:6px 12px; font-size:0.8rem; margin-right:6px;" onclick="openEditProductModal('${p.id}')"><i class="ri-edit-line"></i> Edit</button>
        <button class="btn btn-primary" style="padding:6px 12px; font-size:0.8rem; background:#ef4444; border-color:#ef4444;" onclick="handleDeleteProduct('${p.id}')"><i class="ri-delete-bin-line"></i></button>
      </td>
    </tr>
  `).join('');
}

function filterAdminProducts() {
  const q = document.getElementById('adminSearchInput').value.toLowerCase().trim();
  const products = getLiveProducts();
  if (!q) {
    renderAdminProductsTable(products);
    return;
  }
  const filtered = products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderAdminProductsTable(filtered);
}

function openAddProductModal() {
  document.getElementById('productModalTitle').textContent = 'Add New Product';
  document.getElementById('productForm').reset();
  document.getElementById('prodId').value = '';
  document.getElementById('prodStock').value = '12';
  document.getElementById('productModal').classList.add('active');
}

function openEditProductModal(id) {
  const product = getProductById(id);
  if (!product) return;

  document.getElementById('productModalTitle').textContent = 'Edit Product';
  document.getElementById('prodId').value = product.id;
  document.getElementById('prodName').value = product.name;
  document.getElementById('prodCategory').value = product.category;
  document.getElementById('prodBrand').value = product.brand;
  document.getElementById('prodPrice').value = product.price;
  document.getElementById('prodOldPrice').value = product.oldPrice || '';
  document.getElementById('prodStock').value = product.stock !== undefined ? product.stock : 12;
  document.getElementById('prodImage').value = product.image;
  document.getElementById('prodDesc').value = product.desc || '';

  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function handleSaveProduct(event) {
  event.preventDefault();
  const id = document.getElementById('prodId').value;
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const brand = document.getElementById('prodBrand').value.trim();
  const price = parseFloat(document.getElementById('prodPrice').value);
  const oldPriceVal = document.getElementById('prodOldPrice').value;
  const oldPrice = oldPriceVal ? parseFloat(oldPriceVal) : null;
  const stock = parseInt(document.getElementById('prodStock').value) || 12;
  const image = document.getElementById('prodImage').value.trim();
  const desc = document.getElementById('prodDesc').value.trim();

  const productData = {
    id: id || ('custom_' + Date.now()),
    name,
    category,
    subCategory: category,
    brand,
    price,
    oldPrice,
    stock,
    image,
    desc
  };

  addOrUpdateProduct(productData);
  closeProductModal();
  loadAdminAnalytics();
  loadAdminProducts();
  loadAdminStock();
  alert('Product & Stock saved successfully!');
}

function handleDeleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    deleteLiveProduct(id);
    loadAdminAnalytics();
    loadAdminProducts();
    loadAdminStock();
  }
}

function setFieldValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val || '';
}

function getFieldValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function loadAdminSettings() {
  const config = getSiteConfig();
  setFieldValue('cfgBrandName', config.brandName);
  setFieldValue('cfgBrandSubtitle', config.brandSubtitle);
  setFieldValue('cfgPhone', config.phone);
  setFieldValue('cfgWhatsapp', config.whatsapp || config.phone);
  setFieldValue('cfgAddress', config.address);
  setFieldValue('cfgHeroBadge', config.heroBadge);
  setFieldValue('cfgHeroTitle', config.heroTitle);
  setFieldValue('cfgHeroDesc', config.heroDesc);
  setFieldValue('cfgAboutTitle', config.aboutStoryTitle);
  setFieldValue('cfgOwnerName', config.ownerName);
  setFieldValue('cfgOwnerPhone', config.ownerPhone);
  setFieldValue('cfgDevName', config.developerName);
  setFieldValue('cfgDevPhone', config.developerPhone);
  setFieldValue('cfgUpiId', config.upiId);
  setFieldValue('cfgRazorpayKey', config.razorpayKey);
}

function saveAdminSettings(event) {
  event.preventDefault();
  const current = getSiteConfig();
  const newConfig = {
    ...current,
    brandName: getFieldValue('cfgBrandName') || current.brandName,
    brandSubtitle: getFieldValue('cfgBrandSubtitle') || current.brandSubtitle,
    phone: getFieldValue('cfgPhone') || current.phone,
    whatsapp: getFieldValue('cfgWhatsapp') || current.phone,
    address: getFieldValue('cfgAddress') || current.address,
    announcement: getFieldValue('cfgAddress') || current.address,
    heroBadge: getFieldValue('cfgHeroBadge') || current.heroBadge,
    heroTitle: getFieldValue('cfgHeroTitle') || current.heroTitle,
    heroDesc: getFieldValue('cfgHeroDesc') || current.heroDesc,
    aboutStoryTitle: getFieldValue('cfgAboutTitle') || current.aboutStoryTitle,
    ownerName: getFieldValue('cfgOwnerName') || current.ownerName,
    ownerPhone: getFieldValue('cfgOwnerPhone') || current.ownerPhone,
    developerName: getFieldValue('cfgDevName') || current.developerName,
    developerPhone: getFieldValue('cfgDevPhone') || current.developerPhone,
    upiId: getFieldValue('cfgUpiId') || current.upiId,
    razorpayKey: getFieldValue('cfgRazorpayKey') || current.razorpayKey
  };

  saveSiteConfig(newConfig);
  alert('All Store Management & Site Configuration settings saved successfully!');
}

// --------------------------------------------------------------------------
// ENTERPRISE DATA BACKUP, EXPORT & RESTORE ENGINE
// --------------------------------------------------------------------------
function exportOrdersToCSV() {
  const orders = typeof getLiveOrders === 'function' ? getLiveOrders() : [];
  if (orders.length === 0) {
    alert('No customer orders found to export.');
    return;
  }

  let csvContent = 'Order ID,Date,Customer Name,Phone,Address,Items,Payment Method,Payment Status,Order Status,Total Amount (INR)\n';
  orders.forEach(o => {
    const items = (o.cart || []).map(i => `${i.name} (x${i.qty})`).join(' | ');
    csvContent += `"${o.id}","${o.date}","${o.name}","${o.phone}","${o.address.replace(/"/g, '""')}","${items.replace(/"/g, '""')}","${o.payment.replace(/"/g, '""')}","${o.paymentStatus}","${o.status}",${o.total}\n`;
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Govindraj_Store_Orders_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function exportDatabaseJSON() {
  const backup = {
    siteConfig: getSiteConfig(),
    products: getLiveProducts(),
    orders: typeof getLiveOrders === 'function' ? getLiveOrders() : [],
    timestamp: new Date().toISOString()
  };

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `Govindraj_Store_Full_Backup_${Date.now()}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function importDatabaseJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.siteConfig) saveSiteConfig(data.siteConfig);
      if (Array.isArray(data.products)) saveLiveProducts(data.products);
      if (Array.isArray(data.orders) && typeof saveLiveOrders === 'function') saveLiveOrders(data.orders);

      alert('Database backup restored successfully!');
      location.reload();
    } catch (err) {
      alert('Invalid backup JSON file!');
    }
  };
  reader.readAsText(file);
}

function resetStoreData() {
  if (confirm('Are you sure you want to reset all custom products, settings, and orders back to defaults?')) {
    localStorage.removeItem('govind_custom_products');
    localStorage.removeItem('govind_site_config');
    localStorage.removeItem('govind_store_orders');
    alert('Store data reset to defaults successfully!');
    location.reload();
  }
}
