import { Trash2, Edit2, Check, Clock, X, Plus } from "lucide-react";
import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "pending", label: "Menunggu", color: "bg-yellow-100 text-yellow-700" },
  { value: "processing", label: "Diproses", color: "bg-blue-100 text-blue-700" },
  { value: "ready", label: "Siap Diambil", color: "bg-green-100 text-green-700" },
  { value: "completed", label: "Selesai", color: "bg-slate-100 text-slate-700" },
];

export default function AdminDashboard({ orders, onUpdateOrder, onDeleteOrder, onCreateOrder, onLogout }) {
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newOrder, setNewOrder] = useState({
    name: "",
    phone: "",
    address: "",
    service: "Daily Kiloan",
    weight: "",
    pickupDate: "",
  });

  const handleEdit = (order) => {
    setEditingId(order.id);
    setEditStatus(order.status || "pending");
    setEditNotes(order.notes || "");
  };

  const handleSave = () => {
    onUpdateOrder(editingId, {
      status: editStatus,
      notes: editNotes,
    });
    setEditingId(null);
  };

  const handleAddOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    if (!newOrder.name || !newOrder.phone || !newOrder.weight || !newOrder.pickupDate) {
      alert("❌ Harap isi semua field yang diperlukan!");
      return;
    }

    try {
      setIsCreating(true);
      await onCreateOrder(newOrder);
      
      // Reset form
      setNewOrder({
        name: "",
        phone: "",
        address: "",
        service: "Daily Kiloan",
        weight: "",
        pickupDate: "",
      });
      setShowAddForm(false);
      alert("✅ Pesanan berhasil ditambahkan!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("❌ Gagal membuat pesanan");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusColor = (status) => {
    return STATUS_OPTIONS.find((opt) => opt.value === status)?.color ||
      "bg-slate-100 text-slate-700";
  };

  const getStatusLabel = (status) => {
    return STATUS_OPTIONS.find((opt) => opt.value === status)?.label || status;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl p-8 my-8 relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            📋 Dashboard Admin
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              <Plus size={20} />
              Tambah Pesanan
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Add Order Form */}
        {showAddForm && (
          <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-blue-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">➕ Input Pesanan Baru (Manual)</h3>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Nama Pelanggan</label>
                  <input
                    type="text"
                    name="name"
                    value={newOrder.name}
                    onChange={handleAddOrderChange}
                    placeholder="Nama lengkap"
                    required
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">No. HP</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newOrder.phone}
                    onChange={handleAddOrderChange}
                    placeholder="085893638145"
                    required
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Lengkap</label>
                <textarea
                  name="address"
                  value={newOrder.address}
                  onChange={handleAddOrderChange}
                  placeholder="Alamat pengiriman"
                  rows="2"
                  className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none bg-white font-medium"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Layanan</label>
                  <select
                    name="service"
                    value={newOrder.service}
                    onChange={handleAddOrderChange}
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-medium"
                  >
                    <option>Daily Kiloan</option>
                    <option>Cuci & Setrika</option>
                    <option>Laundry Sepatu</option>
                    <option>Laundry Tas</option>
                    <option>Express Service</option>
                    <option>Blouse Kantor</option>
                    <option>Laundry Selimut</option>
                    <option>Laundry Premium</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Berat/Jumlah</label>
                  <input
                    type="text"
                    name="weight"
                    value={newOrder.weight}
                    onChange={handleAddOrderChange}
                    placeholder="Misal: 5kg, 10pcs"
                    required
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Tanggal Jemput</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={newOrder.pickupDate}
                    onChange={handleAddOrderChange}
                    required
                    className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 bg-white font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-bold disabled:opacity-50"
                >
                  {isCreating ? "Menyimpan..." : "✓ Simpan Pesanan"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewOrder({
                      name: "",
                      phone: "",
                      address: "",
                      service: "Daily Kiloan",
                      weight: "",
                      pickupDate: "",
                    });
                  }}
                  className="px-6 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors font-semibold"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">Belum ada pesanan</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Nama
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    No. HP
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Layanan
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Berat (kg)
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Tanggal
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-slate-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    {editingId === order.id ? (
                      <>
                        <td colSpan="6" className="px-4 py-4">
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Status
                                </label>
                                <select
                                  value={editStatus}
                                  onChange={(e) =>
                                    setEditStatus(e.target.value)
                                  }
                                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                                >
                                  {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                  Catatan
                                </label>
                                <input
                                  type="text"
                                  value={editNotes}
                                  onChange={(e) => setEditNotes(e.target.value)}
                                  placeholder="Catatan untuk pelanggan"
                                  className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                              >
                                Simpan
                              </button>
                              <button
                                onClick={() => setEditingId(null)}
                                className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors font-semibold"
                              >
                                Batal
                              </button>
                            </div>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-4 font-semibold text-slate-900">
                          {order.name}
                        </td>
                        <td className="px-4 py-4 text-slate-700">{order.phone}</td>
                        <td className="px-4 py-4 text-slate-700">{order.service}</td>
                        <td className="px-4 py-4 text-slate-700">{order.weight}</td>
                        <td className="px-4 py-4 text-slate-700">{order.pickup_date}</td>
                        <td className="px-4 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(order)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Hapus pesanan ini? Pastikan barang sudah diambil."
                                  )
                                ) {
                                  onDeleteOrder(order.id);
                                }
                              }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Total Pesanan:</strong> {orders.length} |{" "}
            <strong>Menunggu:</strong> {orders.filter((o) => o.status === "pending").length} |{" "}
            <strong>Diproses:</strong> {orders.filter((o) => o.status === "processing").length} |{" "}
            <strong>Siap Diambil:</strong> {orders.filter((o) => o.status === "ready").length}
          </p>
        </div>
      </div>
    </div>
  );
}
