import { ArrowLeft, Search, Phone, MapPin, Truck, Calendar } from "lucide-react";
import { useState } from "react";
import { OrderService } from "../lib/databaseService";

const STATUS_OPTIONS = {
  pending: { label: "Menunggu", color: "bg-yellow-100 text-yellow-700", icon: "⏳" },
  processing: { label: "Diproses", color: "bg-blue-100 text-blue-700", icon: "⚙️" },
  ready: { label: "Siap Diambil", color: "bg-green-100 text-green-700", icon: "✅" },
  completed: { label: "Selesai", color: "bg-slate-100 text-slate-700", icon: "✓" },
};

export default function OrderTrackerPage({ onNavigate, orders = [] }) {
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
    <div className="h-screen overflow-y-auto pt-24 pb-12 px-6 bg-gradient-to-br from-white via-blue-50 to-cyan-50">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 rounded-xl transition-all hover:scale-105 font-semibold"
      >
        <ArrowLeft size={20} />
        <span>Kembali</span>
      </button>

      <div className="max-w-2xl mx-auto">
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            📦 Lacak Pesanan Anda
          </h2>
          <p className="text-slate-600 text-base">
            Masukkan nomor HP untuk melihat status pesanan laundry Anda
          </p>
        </div>

        {/* Search Form */}
        {!hasSearched && (
          <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-100 mb-8">
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
              <div className="mt-3 text-xs text-slate-500">
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
          <div className="space-y-8">
            {searchedOrders.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-slate-100">
                <p className="text-slate-500 text-xl font-semibold mb-4">
                  😕 Pesanan Tidak Ditemukan
                </p>
                <p className="text-slate-600 text-base mb-8">
                  Tidak ada pesanan dengan nomor HP: <br />
                  <span className="font-mono font-bold text-slate-700 text-lg">{phone}</span>
                </p>
                <button
                  onClick={() => {
                    setHasSearched(false);
                    setPhone("");
                    setSearchedOrders([]);
                  }}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                >
                  ← Cari Nomor Lain
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col md:flex-row items-start justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      📋 {searchedOrders.length} Pesanan Ditemukan
                    </h3>
                    <p className="text-sm text-slate-600">
                      Nomor HP: <span className="font-mono font-semibold text-slate-700">{phone}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setHasSearched(false);
                      setPhone("");
                      setSearchedOrders([]);
                    }}
                    className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold whitespace-nowrap"
                  >
                    🔄 Ubah Nomor
                  </button>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                  {searchedOrders.map((order, idx) => {
                    const statusInfo = STATUS_OPTIONS[order.status] || STATUS_OPTIONS.pending;
                    return (
                      <div
                        key={order.id}
                        className="bg-white border-2 border-slate-200 rounded-3xl p-8 hover:border-blue-400 hover:shadow-lg transition-all shadow-md"
                      >
                        {/* Order Header */}
                        <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-slate-200">
                          <div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-2">
                              Pesanan #{idx + 1}
                            </h4>
                            <p className="text-base text-slate-600 font-semibold">
                              A.n. {order.name}
                            </p>
                          </div>
                          <span
                            className={`px-5 py-2 rounded-full text-base font-bold flex items-center gap-2 ${statusInfo.color}`}
                          >
                            {statusInfo.icon} {statusInfo.label}
                          </span>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {/* Service */}
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
                            <p className="text-xs text-slate-600 uppercase font-bold mb-2">
                              Layanan
                            </p>
                            <p className="text-base font-bold text-slate-900">
                              {order.service}
                            </p>
                          </div>

                          {/* Weight */}
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200">
                            <p className="text-xs text-slate-600 uppercase font-bold mb-2">
                              Berat
                            </p>
                            <p className="text-base font-bold text-slate-900">
                              {order.weight} kg
                            </p>
                          </div>

                          {/* Pickup Date */}
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200 col-span-2">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar size={16} className="text-slate-600" />
                              <p className="text-xs text-slate-600 uppercase font-bold">
                                Tanggal Jemput
                              </p>
                            </div>
                            <p className="text-base font-bold text-slate-900">
                              {order.pickup_date}
                            </p>
                          </div>

                          {/* Address */}
                          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-5 border border-slate-200 col-span-2">
                            <div className="flex items-start gap-2 mb-2">
                              <MapPin size={16} className="text-slate-600 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-slate-600 uppercase font-bold">
                                Alamat Pengiriman
                              </p>
                            </div>
                            <p className="text-base font-semibold text-slate-900">
                              {order.address}
                            </p>
                          </div>
                        </div>

                        {/* Admin Notes */}
                        {order.notes && (
                          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-6">
                            <p className="text-xs text-blue-700 font-bold uppercase mb-2">
                              💬 Catatan dari Admin
                            </p>
                            <p className="text-base text-blue-900 font-semibold">
                              {order.notes}
                            </p>
                          </div>
                        )}

                        {/* Timeline */}
                        <div className="pt-6 border-t-2 border-slate-200">
                          <p className="text-sm text-slate-600">
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
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
                  <p className="text-green-700 text-base font-semibold mb-2">
                    ✅ Pesanan Anda sedang diproses dengan baik
                  </p>
                  <p className="text-green-600 text-sm">
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
