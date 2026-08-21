"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BarChart3,
  Package,
  ShoppingBag,
  Wrench,
  Settings,
  Download,
  ToggleLeft,
  ToggleRight,
  LogOut,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "products" | "orders" | "repairs" | "settings">("overview");

  const [analytics, setAnalytics] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [analyticsRes, productsRes, ordersRes, repairsRes, settingsRes] = await Promise.all([
        fetch("/api/admin/analytics"),
        fetch("/api/products"),
        fetch("/api/orders"),
        fetch("/api/repairs"),
        fetch("/api/admin/settings"),
      ]);

      const aData = await analyticsRes.json();
      const pData = await productsRes.json();
      const oData = await ordersRes.json();
      const rData = await repairsRes.json();
      const sData = await settingsRes.json();

      setAnalytics(aData.analytics);
      setProducts(pData.products || []);
      setOrders(oData.orders || []);
      setRepairs(rData.repairs || []);
      setSiteSettings(sData.settings);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSettingToggle = async (key: string, value: boolean) => {
    try {
      const updated = { ...siteSettings, [key]: value };
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (res.ok) setSiteSettings(updated);
    } catch (e) {
      alert("Failed to update setting");
    }
  };

  const handleUpdateOrderStatus = async (id: string, orderStatus: string) => {
    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, orderStatus }),
      });
      fetchAdminData();
    } catch (e) {
      alert("Failed to update order");
    }
  };

  const handleUpdateRepairStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/repairs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      fetchAdminData();
    } catch (e) {
      alert("Failed to update repair");
    }
  };

  const handleExportJSON = () => {
    const backup = {
      timestamp: new Date().toISOString(),
      siteSettings,
      products,
      orders,
      repairs,
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `govindraj-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  if (!user || (!isAdmin && user.role !== "ADMIN")) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-[#121212]">Admin Authentication Required</h2>
        <p className="text-xs text-gray-600">
          Please sign in with administrator credentials (<code className="text-[#C5A880]">admin@govindrajwatch.shop</code> / <code className="text-[#C5A880]">admin123</code>).
        </p>
        <Link
          href="/account"
          className="inline-block bg-[#121212] hover:bg-[#C5A880] text-white font-medium text-xs py-2.5 px-6 rounded-full transition"
        >
          Sign In to Admin Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <nav className="flex items-center space-x-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#C5A880]">Home</Link>
        <ChevronRight className="w-3 h-3 text-gray-400" />
        <span className="text-[#121212] font-medium">Admin Portal</span>
      </nav>

      {/* Admin Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DC] pb-6">
        <div>
          <span className="text-xs text-[#B89768] font-semibold uppercase tracking-wider">
            Store Control Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#121212]">
            Govindraj Store Management
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportJSON}
            className="bg-white hover:bg-[#FAF9F6] text-[#121212] font-medium text-xs py-2.5 px-4 rounded-xl flex items-center space-x-1.5 border border-[#E5E2DC] transition shadow-sm"
          >
            <Download className="w-4 h-4 text-[#C5A880]" />
            <span>Export Backup</span>
          </button>

          <button
            onClick={fetchAdminData}
            className="bg-white hover:bg-[#FAF9F6] text-[#121212] p-2.5 rounded-xl border border-[#E5E2DC] shadow-sm"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4 text-[#C5A880]" />
          </button>

          <button
            onClick={logout}
            className="bg-red-50 text-red-600 font-medium text-xs py-2.5 px-4 rounded-xl border border-red-200 hover:bg-red-100 transition flex items-center space-x-1"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E5E2DC] space-x-6 text-xs font-bold uppercase tracking-wider overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 flex items-center space-x-1.5 whitespace-nowrap transition ${
            activeTab === "overview"
              ? "text-[#121212] border-b-2 border-[#C5A880]"
              : "text-gray-400 hover:text-[#121212]"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`pb-3 flex items-center space-x-1.5 whitespace-nowrap transition ${
            activeTab === "products"
              ? "text-[#121212] border-b-2 border-[#C5A880]"
              : "text-gray-400 hover:text-[#121212]"
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`pb-3 flex items-center space-x-1.5 whitespace-nowrap transition ${
            activeTab === "orders"
              ? "text-[#121212] border-b-2 border-[#C5A880]"
              : "text-gray-400 hover:text-[#121212]"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("repairs")}
          className={`pb-3 flex items-center space-x-1.5 whitespace-nowrap transition ${
            activeTab === "repairs"
              ? "text-[#121212] border-b-2 border-[#C5A880]"
              : "text-gray-400 hover:text-[#121212]"
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Repairs ({repairs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 flex items-center space-x-1.5 whitespace-nowrap transition ${
            activeTab === "settings"
              ? "text-[#121212] border-b-2 border-[#C5A880]"
              : "text-gray-400 hover:text-[#121212]"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Site Controls</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW ANALYTICS */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Total Orders</span>
              <p className="font-serif text-3xl font-bold text-[#121212]">{analytics?.totalOrders || 0}</p>
            </div>

            <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Total Revenue</span>
              <p className="font-serif text-3xl font-bold text-[#C5A880]">
                ₹{(analytics?.totalRevenue || 0).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Repair Requests</span>
              <p className="font-serif text-3xl font-bold text-[#121212]">{analytics?.totalRepairs || 0}</p>
            </div>

            <div className="bg-white border border-[#E5E2DC] rounded-3xl p-6 space-y-2 shadow-sm">
              <span className="text-xs text-gray-500 font-medium">Total Catalog Products</span>
              <p className="font-serif text-3xl font-bold text-[#121212]">{analytics?.totalProducts || 0}</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === "products" && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-xl font-bold text-[#121212]">Catalog Product Inventory</h3>
          </div>

          <div className="bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden text-xs shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DC] text-[#B89768] bg-[#FAF9F6] uppercase font-semibold text-[10px]">
                  <th className="p-4">Product Name</th>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Brand</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DC] text-gray-700">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF9F6]">
                    <td className="p-4 font-semibold text-[#121212] truncate max-w-xs">{p.name}</td>
                    <td className="p-4 font-mono text-[11px] text-gray-500">{p.sku}</td>
                    <td className="p-4 text-[#B89768] font-medium">{p.brand?.name || "Govindraj"}</td>
                    <td className="p-4 font-bold text-[#121212]">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.stock > 3 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                        {p.stock} units
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS */}
      {activeTab === "orders" && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#121212]">Recent Customer Orders</h3>

          <div className="bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden text-xs shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DC] text-[#B89768] bg-[#FAF9F6] uppercase font-semibold text-[10px]">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DC] text-gray-700">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#FAF9F6]">
                    <td className="p-4 font-mono text-[#121212] font-bold">{o.orderId}</td>
                    <td className="p-4 text-[#121212] font-medium">{o.customerName}</td>
                    <td className="p-4 text-gray-600">{o.customerPhone}</td>
                    <td className="p-4 font-bold text-[#121212]">₹{o.totalAmount.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span className="bg-amber-50 border border-amber-200 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={o.orderStatus}
                        onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                        className="bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-lg py-1 px-2 text-[11px] font-medium"
                      >
                        <option value="PROCESSING">Processing</option>
                        <option value="SHIPPED">Shipped</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: REPAIRS */}
      {activeTab === "repairs" && (
        <div className="space-y-6 animate-fadeIn">
          <h3 className="font-serif text-xl font-bold text-[#121212]">Watch & Accessories Repair Requests</h3>

          <div className="bg-white border border-[#E5E2DC] rounded-3xl overflow-hidden text-xs shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DC] text-[#B89768] bg-[#FAF9F6] uppercase font-semibold text-[10px]">
                  <th className="p-4">Repair ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Issue Description</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DC] text-gray-700">
                {repairs.map((r) => (
                  <tr key={r.id} className="hover:bg-[#FAF9F6]">
                    <td className="p-4 font-mono text-[#121212] font-bold">{r.repairId}</td>
                    <td className="p-4 text-[#121212] font-medium">{r.customerName} ({r.phone})</td>
                    <td className="p-4 text-[#B89768] font-semibold">{r.serviceType}</td>
                    <td className="p-4 truncate max-w-xs text-gray-600">{r.problemDescription}</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleUpdateRepairStatus(r.id, e.target.value)}
                        className="bg-[#FAF9F6] border border-[#E5E2DC] text-[#121212] rounded-lg py-1 px-2 text-[11px] font-medium"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="READY">Ready for Pickup</option>
                        <option value="COMPLETED">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SITE SETTINGS & TOGGLES */}
      {activeTab === "settings" && (
        <div className="max-w-2xl bg-white border border-[#E5E2DC] rounded-3xl p-6 sm:p-8 space-y-6 animate-fadeIn text-xs shadow-sm">
          <h3 className="font-serif text-xl font-bold text-[#121212] border-b border-[#E5E2DC] pb-3">
            Global Store Controls & Feature Toggles
          </h3>

          <div className="space-y-4">
            {/* Online Orders Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl">
              <div>
                <h4 className="font-bold text-[#121212]">Online Ordering System</h4>
                <p className="text-[11px] text-gray-500">
                  When OFF, online checkout is paused and customers are guided to WhatsApp order placement.
                </p>
              </div>
              <button
                onClick={() => handleUpdateSettingToggle("onlineOrdersEnabled", !siteSettings?.onlineOrdersEnabled)}
                className="text-[#C5A880]"
              >
                {siteSettings?.onlineOrdersEnabled ? (
                  <ToggleRight className="w-8 h-8 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
              </button>
            </div>

            {/* Online Payment Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#FAF9F6] border border-[#E5E2DC] rounded-2xl">
              <div>
                <h4 className="font-bold text-[#121212]">Razorpay Online Payments</h4>
                <p className="text-[11px] text-gray-500">
                  When OFF, online card and UPI gateways are hidden during checkout.
                </p>
              </div>
              <button
                onClick={() => handleUpdateSettingToggle("onlinePaymentEnabled", !siteSettings?.onlinePaymentEnabled)}
                className="text-[#C5A880]"
              >
                {siteSettings?.onlinePaymentEnabled ? (
                  <ToggleRight className="w-8 h-8 text-emerald-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

