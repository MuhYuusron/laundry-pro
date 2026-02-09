import { X, Search, Phone, MapPin, Truck, Calendar } from "lucide-react";
import { useState } from "react";
import { OrderService } from "../lib/databaseService";

const STATUS_OPTIONS = {
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700", icon: "⚙️" },
  ready: { label: "Siap Diambil", color: "bg-green-100 text-green-700", icon: "✅" },
  completed: { label: "Selesai", color: "bg-slate-100 text-slate-700", icon: "✓" },
};

export default function OrderTracker({ onClose, orders = [] }) {
  const [phone, setPhone] = useState("");
  const [searchedOrders, setSearchedOrders] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    // Validate phone memiliki minimal 10 digits
    const digitsOnly = value.replace(/\D/g, "");
    setIsPhoneValid(digitsOnly.length >= 10);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (phone.trim() && isPhoneValid) {
      try {
        setLoading(true);
        const filtered = await OrderService.getOrdersByPhone(phone);
        setSearchedOrders(filtered);
        setHasSearched(true);
      } catch (error) {
        console.error("Error searching orders:", error);
        alert("❌ Gagal mencari pesanan");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative my-8 animate-surge">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-xl transition-all hover:scale-110"
        >
          <X size={24} className="text-slate-600" />
        </button>

        {/* Header dengan Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg">
              <Truck size={36} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            📦 Lacak Pesanan Anda
          </h2>
          <p className="text-slate-500 text-sm">
            Masukkan nomor HP untuk melihat status pesanan laundry Anda
          </p>
        </div>

        {/* Search Form */}
        {!hasSearched && (
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Phone Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Nomor Telepon
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600">
                  <Phone size={20} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder="628123456789"
                  className={`w-full pl-14 pr-5 py-4 text-lg border-2 rounded-xl transition-all focus:outline-none ${
                    isPhoneValid && phone
                      ? "border-green-400 focus:border-green-600 bg-green-50"
                      : phone
                      ? "border-red-400 focus:border-red-600 bg-red-50"
                      : "border-slate-300 focus:border-blue-600 bg-slate-50"
                  }`}
                  autoFocus
                  disabled={loading}
                />
              </div>
              <div className="mt-2 text-xs text-slate-500">
                {phone && !isPhoneValid && (
                  <p className="text-red-600 font-semibold">
                    ❌ Nomor HP harus minimal 10 angka
                  </p>
                )}
                {isPhoneValid && (
                  <p className="text-green-600 font-semibold">
                    ✓ Nomor HP valid - siap dicari
                  </p>
                )}
                {!phone && (
                  <p className="text-slate-600">
                    Contoh: 628123456789 atau 0812-3456-789
                  </p>
                )}
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading || !isPhoneValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform flex items-center justify-center gap-2 ${
                loading || !isPhoneValid
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Mencari Pesanan...
                </>
              ) : (
                <>
                  <Search size={20} />
                  Cari Pesanan
                </>
              )}
            </button>
          </form>
        )}

        {/* Search Results */}
        {hasSearched && (
          <div className="space-y-6">
            {searchedOrders.length === 0 ? (
              <div className="text-center py-12 bg-slate-50 rounded-xl border-2 border-slate-200">
                <p className="text-slate-500 text-lg font-semibold mb-4">
                  😕 Pesanan Tidak Ditemukan
                </p>
                <p className="text-slate-600 text-sm mb-6">
                  Tidak ada pesanan dengan nomor HP: <br />
                  <span className="font-mono font-bold text-slate-700">{phone}</span>
                </p>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setPhone("");
                    setSearchedOrders([]);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  ← Cari Nomor Lain
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      📋 {searchedOrders.length} Pesanan Ditemukan
                    </h3>
                    <p className="text-sm text-slate-500">
                      Nomor HP: <span className="font-mono font-semibold text-slate-700">{phone}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setHasSearched(false);
                      setPhone("");
                      setSearchedOrders([]);
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors text-sm font-semibold"
                  >
                    🔄 Ubah Nomor
                  </button>
                </div>

                {/* Orders List */}
                <div className="space-y-4">
                  {searchedOrders.map((order, idx) => {
                    const statusInfo = STATUS_OPTIONS[order.status] || STATUS_OPTIONS.pending;
                    return (
                      <div
                        key={order.id}
                        className="border-2 border-slate-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-lg transition-all bg-gradient-to-br from-slate-50 to-slate-100"
                      >
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-5">
                          <div>
                            <h4 className="text-xl font-bold text-slate-900 mb-1">
                              Pesanan #{idx + 1}
                            </h4>
                            <p className="text-sm text-slate-600 font-semibold">
                              A.n. {order.name}
                            </p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${statusInfo.color}`}
                          >
                            {statusInfo.icon} {statusInfo.label}
                          </span>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-2 gap-4 mb-5">
                          {/* Service */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <p className="text-xs text-slate-600 uppercase font-bold mb-1">
                              Layanan
                            </p>
                            <p className="text-sm font-bold text-slate-900">
                              {order.service}
                            </p>
                          </div>

                          {/* Weight */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200">
                            <p className="text-xs text-slate-600 uppercase font-bold mb-1">
                              Berat
                            </p>
                            <p className="text-sm font-bold text-slate-900">
                              {order.weight} kg
                            </p>
                          </div>

                          {/* Pickup Date */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200 col-span-2">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar size={14} className="text-slate-600" />
                              <p className="text-xs text-slate-600 uppercase font-bold">
                                Tanggal Jemput
                              </p>
                            </div>
                            <p className="text-sm font-bold text-slate-900">
                              {order.pickup_date}
                            </p>
                          </div>

                          {/* Address */}
                          <div className="bg-white rounded-xl p-4 border border-slate-200 col-span-2">
                            <div className="flex items-start gap-2 mb-1">
                              <MapPin size={14} className="text-slate-600 mt-0.5" />
                              <p className="text-xs text-slate-600 uppercase font-bold">
                                Alamat Pengiriman
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-slate-900 line-clamp-2">
                              {order.address}
                            </p>
                          </div>
                        </div>

                        {/* Admin Notes */}
                        {order.notes && (
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4">
                            <p className="text-xs text-blue-700 font-bold uppercase mb-2">
                              💬 Catatan dari Admin
                            </p>
                            <p className="text-sm text-blue-900 font-semibold">
                              {order.notes}
                            </p>
                          </div>
                        )}

                        {/* Timeline */}
                        <div className="pt-4 border-t-2 border-slate-200">
                          <p className="text-xs text-slate-500">
                            📅 Pesanan dibuat:{" "}
                            <span className="font-bold text-slate-700">
                              {new Date(order.created_at).toLocaleDateString("id-ID", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Info Box */}
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                  <p className="text-green-700 text-sm font-semibold text-center">
                    ✅ Pesanan Anda sedang diproses dengan baik
                  </p>
                  <p className="text-green-600 text-xs mt-2 text-center">
                    Hubungi Admin jika ada pertanyaan: 085893638145
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
