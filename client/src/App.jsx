import { useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import BubbleBackground from "./components/BubbleBackground";
import AdminDashboard from "./components/AdminDashboard";
import AdminLoginPage from "./components/AdminLoginPage";
import OrderTrackerPage from "./components/OrderTrackerPage";
import AnimateOnScroll from "./components/AnimateOnScroll";
import { OrderService } from "./lib/databaseService";
import {
  ArrowRight,
  ShieldCheck,
  Phone,
  MapPin,
  Mail,
  Instagram,
  MessageCircle,
  Truck,
  Search,
  Settings,
  Sparkles,
  Facebook,
  Twitter,
  Linkedin,
  Zap
} from "lucide-react";

// Import gambar dari folder assets
import bgHero from "./assets/bg-laundry.png";
import aboutImg from "./assets/image.png";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    service: "Daily Kiloan",
    weight: "",
    pickupDate: "",
  });
  
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await OrderService.getAllOrders();
      setOrders(data || []);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentPage('home');
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentPage('home');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.weight || !formData.pickupDate) {
      alert("❌ Harap isi semua field!");
      return;
    }

    try {
      setLoading(true);
      const newOrder = await OrderService.createOrder(formData);
      if (newOrder) {
        setOrders(prev => [...prev, newOrder]);
        const whatsappMessage = `Selamat Datang di Nyook Laundry👕🫧\nSaya ingin pesan Laundry\nNama: ${formData.name}\nNo Whatsapp: ${formData.phone}\nAlamat: ${formData.address}\nLayanan: ${formData.service}\nBerat: ${formData.weight}\nTanggal jemput: ${formData.pickupDate}`;
        const whatsappUrl = `https://wa.me/6285893638145?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, "_blank");
        
        setFormData({ name: "", phone: "", address: "", service: "Daily Kiloan", weight: "", pickupDate: "" });
        alert("✅ Pesanan berhasil dicatat!");
      }
    } catch (error) {
      alert("❌ Gagal menyimpan pesanan.");
    } finally {
      setLoading(false);
    }
  };

  // RENDER LOGIC
  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* 1. BACKGROUND (Fixed agar tidak mendorong konten) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BubbleBackground />
      </div>

      {/* 2. NAVBAR (Fixed di atas) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar 
          isAdmin={isAdmin} 
          onAdminLogin={handleAdminLogin} 
          onAdminLogout={handleAdminLogout}
          orders={orders}
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        />
      </div>

      {/* 3. CONTENT AREA */}
      <main className="relative z-10">
        {/* Konten Berdasarkan Halaman */}
        {currentPage === 'admin-login' ? (
          <AdminLoginPage onLogin={handleAdminLogin} onNavigate={setCurrentPage} />
        ) : currentPage === 'track-order' ? (
          <OrderTrackerPage onNavigate={setCurrentPage} orders={orders} />
        ) : (
          /* HOME PAGE */
          <>
            {isAdmin && (
              <AdminDashboard
                orders={orders}
                onUpdateOrder={async (id, updates) => {
                  try {
                    await OrderService.updateOrder(id, updates);
                    // Update state lokal agar tampilan langsung berubah tanpa refresh
                    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
                    alert("✅ Status pesanan berhasil diperbarui!");
                  } catch (error) {
                    console.error("Error updating order:", error);
                    alert("❌ Gagal memperbarui status pesanan.");
                  }
                }}
                onDeleteOrder={async (id) => {
                  try {
                    await OrderService.deleteOrder(id);
                    // Hapus dari state lokal
                    setOrders(prev => prev.filter(o => o.id !== id));
                    alert("🗑️ Pesanan berhasil dihapus.");
                  } catch (error) {
                    console.error("Error deleting order:", error);
                    alert("❌ Gagal menghapus pesanan.");
                  }
                }}
                onCreateOrder={async (newOrderData) => {
                  // Fungsi ini akan dipanggil oleh AdminDashboard saat tambah manual
                  const createdOrder = await OrderService.createOrder(newOrderData);
                  if (createdOrder) {
                    setOrders(prev => [createdOrder, ...prev]);
                    return createdOrder;
                  } else {
                    throw new Error("Gagal membuat pesanan");
                  }
                }}
                onLogout={handleAdminLogout}
              />
            )}

            {/* HERO SECTION */}
            <section
              className="relative w-full h-[650px] md:h-[850px] flex items-center bg-cover bg-center"
              style={{ backgroundImage: `url(${bgHero})` }}
            >
              <div className="absolute inset-0 bg-black/60"></div>
              <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-white pt-20">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase mb-6">
                    ⭐ Perlayanan Terbaik Se-Indonesia
                  </div>
                  <h1 className="text-6xl md:text-8xl font-black leading-tight mb-2">Cucian Bersih</h1>
                  <h2 className="text-5xl md:text-7xl font-black text-amber-400 mb-8 drop-shadow-lg">Tanpa Antri.</h2>
                  <p className="text-lg md:text-xl text-slate-100 mb-10 max-w-lg">
                    Layanan laundry profesional premium. Kami jemput, cuci, dan antar dengan hasil sempurna.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button onClick={scrollToForm} className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-amber-900/20">
                      Pesan Sekarang <ArrowRight size={20} />
                    </button>
                    <button onClick={() => document.getElementById('layanan').scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 backdrop-blur-md border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                      Lihat Layanan
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS SECTION */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 mb-12">
              <AnimateOnScroll>
                <div className="bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <StatItem count="1000+" label="Pelanggan Puas" icon="👥" />
                  <StatItem count="24 Jam" label="Proses Cepat" icon="⚡" />
                  <StatItem count="100%" label="Kepuasan" icon="✓" />
                  <StatItem count="Gratis" label="Jemput & Antar" icon="🚚" />
                </div>
              </AnimateOnScroll>
            </div>


      {/* --- 3. SECTION TENTANG KAMI --- */}
      <section id="tentang" className="py-32 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <AnimateOnScroll className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              {/* Animated Background Blobs */}
              <div className="absolute -top-10 -left-10 w-72 h-72 bg-amber-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl border border-white/50 group-hover:shadow-3xl transition-shadow duration-500">
                <img
                  src={aboutImg}
                  alt="Workshop Kami"
                  className="w-full h-[500px] object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 bg-gradient-to-br from-white to-slate-50 backdrop-blur-xl px-8 py-6 rounded-2xl shadow-2xl border border-white/50 z-20 text-center group-hover:shadow-3xl transition-all">
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
                  9+
                </span>
                <p className="text-slate-700 font-bold text-sm uppercase tracking-wider mt-2">
                  Tahun Berpengalaman
                </p>
              </div>
            </div>
            
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase mb-8 tracking-wider border border-amber-100">
                🏆 Modern Laundry Solution
              </div>
              <h3 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
                Perawatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Mewah</span> Untuk Pakaian Anda
              </h3>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed font-light">
                Kami menghadirkan standar higienis tertinggi dengan teknologi filtrasi air modern dan deterjen organik premium yang lembut di serat kain. Setiap pakaian ditangani dengan perhatian khusus untuk hasil maksimal.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <AboutGridIcon
                  icon={<ShieldCheck size={20} />}
                  title="Garansi Steril"
                  color="from-slate-800 to-slate-900"
                />
                <AboutGridIcon
                  icon={<Zap size={20} />}
                  title="Kilat 3 Jam"
                  color="from-amber-400 to-orange-500"
                />
              </div>
              
              <button onClick={scrollToForm} className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Mulai Pesan Sekarang
              </button>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* --- 4. LAYANAN SECTION --- */}
      <section
        id="layanan"
        className="py-32 bg-gradient-to-b from-white via-slate-50 to-white px-6 relative overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-slate-50 to-amber-50 text-amber-700 text-xs font-bold uppercase mb-8 tracking-wider border border-amber-100">
                ✨ Layanan Profesional & Terpercaya
              </div>
              <h3 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
                Pilihan Layanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Terbaik</span> Kami
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Dapatkan layanan laundry berkualitas premium dengan harga kompetitif. Kami siap melayani semua kebutuhan pakaian Anda dengan profesional.
              </p>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimateOnScroll delay={0}>
              <ServiceCard
                title="Daily Kiloan"
                price="7.000"
                unit="kg"
                icon="👕"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <ServiceCard
                title="Cuci & Setrika"
                price="10.000"
                unit="kg"
                icon="👔"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <ServiceCard
                title="Laundry Sepatu"
                price="35.000"
                unit="psg"
                icon="👟"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <ServiceCard
                title="Laundry Tas"
                price="45.000"
                unit="pcs"
                icon="🎒"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={0}>
              <ServiceCard
                title="Express Service"
                price="15.000"
                unit="kg"
                icon="⚡"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <ServiceCard
                title="Blouse Kantor"
                price="12.000"
                unit="pcs"
                icon="👗"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <ServiceCard
                title="Laundry Selimut"
                price="50.000"
                unit="pcs"
                icon="🛏️"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <ServiceCard
                title="Laundry Premium"
                price="20.000"
                unit="kg"
                icon="✨"
                color="bg-white"
                onOrderClick={scrollToForm}
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* --- 5. PROSES SECTION (BARU) --- */}
      <section id="proses" className="py-32 px-6 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl -ml-48 -mt-48 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <AnimateOnScroll className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-slate-50 to-amber-50 text-amber-700 text-xs font-bold uppercase mb-8 tracking-wider border border-amber-100">
                🔄 Proses Mudah & Transparan
              </div>
              <h3 className="text-6xl md:text-7xl font-black text-slate-900 mb-6">
                Cara <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Kerja</span> Kami
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
                Proses yang mudah, cepat, dan transparan mulai dari jemput hingga antar balik.
              </p>
          </AnimateOnScroll>

          <div className="relative">
            {/* Garis Penghubung (Hidden on Mobile) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent -translate-y-1/2 z-0"></div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              <AnimateOnScroll delay={0}>
                <StepItem
                  number="01"
                  icon={<Truck size={32} />}
                  title="Penjemputan"
                  desc="Kurir kami menjemput cucian langsung ke rumah Anda."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={150}>
                <StepItem
                  number="02"
                  icon={<Search size={32} />}
                  title="Sortir & Cek"
                  desc="Pakaian dicek satu-persatu untuk memastikan noda hilang."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
                <StepItem
                  number="03"
                  icon={<Settings size={32} />}
                  title="Proses Cuci"
                  desc="Dicuci higienis sesuai standar 1 mesin 1 pelanggan."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={450}>
                <StepItem
                  number="04"
                  icon={<Sparkles size={32} />}
                  title="Selesai & Antar"
                  desc="Pakaian wangi siap diantar kembali ke lokasi Anda."
                />
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* --- 6. FORM PESAN SEKARANG SECTION --- */}
      <section ref={formRef} id="pesan" className="py-32 px-6 bg-gradient-to-b from-slate-50 via-amber-50/30 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-200/20 rounded-full blur-3xl -ml-48 -mb-48 pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <AnimateOnScroll className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-slate-100 to-amber-100 text-amber-700 text-xs font-bold uppercase mb-8 tracking-wider border border-amber-200/50">
                📝 Form Pemesanan Mudah
              </div>
              <h3 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
                Pesan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">Sekarang</span>
              </h3>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light">
                Isi form di bawah dan kami akan menghubungi Anda dalam 5 menit untuk konfirmasi pesanan.
              </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-900 to-slate-800"></div>
            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">👤 Nama Anda</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Masukkan nama lengkap"
                    autoComplete="off"
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition bg-slate-50/50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">📱 No. WhatsApp</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Masukan No. WhatsApp Anda"
                    autoComplete="off"
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition bg-slate-50/50 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">📍 Alamat Lengkap</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Jln., No., RT/RW, Kelurahan, Kecamatan, Kota"
                  autoComplete="off"
                  required
                  rows="3"
                  className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition resize-none bg-slate-50/50 font-medium"
                ></textarea>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">🧺 Pilih Layanan</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition bg-slate-50/50 font-medium"
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
                  <label className="block text-sm font-bold text-slate-700 mb-3">⚖️ Berat/Jumlah</label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleFormChange}
                    placeholder="Misal: 5kg, 10pcs"
                    autoComplete="off"
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition bg-slate-50/50 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">📅 Tanggal Jemput</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleFormChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition bg-slate-50/50 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-slate-300 transition-all hover:shadow-xl hover:scale-105 uppercase tracking-wider"
              >
                ✓ Kirim ke WhatsApp
              </button>
            </form>
          </AnimateOnScroll>
        </div>
      </section>

      {/* --- 7. FOOTER SECTION --- */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white px-6 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="group">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">Laundry Kyyuss</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Penyedia layanan laundry profesional dengan standar kualitas internasional, harga terjangkau, dan pelayanan terbaik untuk semua pelanggan setia kami.
              </p>
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-amber-600 rounded-full flex items-center justify-center transition-all">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Kontak */}
            <div>
              <h4 className="font-bold text-lg mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">📞 Kontak</h4>
              <div className="space-y-4">
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition group">
                  <div className="w-10 h-10 bg-slate-800 group-hover:bg-amber-600/20 rounded-lg flex items-center justify-center transition">
                    <Phone size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Telepon</p>
                    <p className="text-slate-300 font-semibold">085893638145</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition group">
                  <div className="w-10 h-10 bg-slate-800 group-hover:bg-amber-600/20 rounded-lg flex items-center justify-center transition">
                    <Mail size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">Email</p>
                    <p className="text-slate-300 font-semibold">info@laundrykyuss.com</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-amber-400 transition group">
                  <div className="w-10 h-10 bg-slate-800 group-hover:bg-amber-600/20 rounded-lg flex items-center justify-center transition">
                    <MessageCircle size={18} className="text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase">WhatsApp</p>
                    <p className="text-slate-300 font-semibold">Chat Instan</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Alamat */}
            <div>
              <h4 className="font-bold text-lg mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">📍 Lokasi</h4>
              <div className="flex items-start gap-4 mb-6 group">
                <div className="w-10 h-10 bg-slate-800 group-hover:bg-amber-600/20 rounded-lg flex items-center justify-center flex-shrink-0 transition mt-1">
                  <MapPin size={18} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Kantor Utama</p>
                  <p className="text-slate-300 text-sm leading-relaxed mt-1">
                    Jl. Laundry Modern No. 123, Jakarta Selatan 12345
                  </p>
                </div>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-sm font-semibold">⏰ Jam Operasional</p>
                <p className="text-slate-400 text-xs mt-2">Setiap hari 07:00 - 21:00</p>
                <p className="text-slate-400 text-xs mt-1">Libur: Hari Raya Idul Fitri & Hari Raya Idul Adha</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-8 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">🔗 Quick Links</h4>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition group">
                  <span className="group-hover:translate-x-1 transition-transform">›</span>
                  <span>Tentang Kami</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition group">
                  <span className="group-hover:translate-x-1 transition-transform">›</span>
                  <span>Layanan</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition group">
                  <span className="group-hover:translate-x-1 transition-transform">›</span>
                  <span>Proses Kerja</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition group">
                  <span className="group-hover:translate-x-1 transition-transform">›</span>
                  <span>Hubungi Kami</span>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs gap-4">
              <p className="font-light">© 2024 Laundry Kyyuss. Semua hak dilindungi. Built with ❤️ for excellence.</p>
              <div className="flex gap-6 flex-wrap justify-center md:justify-end">
                <a href="#" className="hover:text-amber-400 transition font-medium">Privacy Policy</a>
                <a href="#" className="hover:text-amber-400 transition font-medium">Terms & Conditions</a>
                <a href="#" className="hover:text-amber-400 transition font-medium">Kebijakan Privasi</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
          </>
        )}
      </main>
    </div>
  );
}

// --- KOMPONEN PEMBANTU ---
function StatItem({ count, label, icon }) {
  return (
    <div className="text-center group">
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-4xl font-black bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent">{count}</h3>
      <p className="text-slate-600 text-sm font-bold uppercase tracking-wider mt-2">
        {label}
      </p>
    </div>
  );
}

function ServiceCard({ title, price, icon, color, unit, onOrderClick }) {
  return (
    <div className={`group ${color} p-8 rounded-2xl border border-slate-100 hover:border-amber-300 hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center overflow-hidden relative backdrop-blur-sm`}>
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" style={{ backgroundColor: 'currentColor' }}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon dengan Animasi */}
        <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-6xl mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 bg-white shadow-lg border-3 border-white/50 group-hover:shadow-xl">
          {icon}
        </div>
        
        {/* Title */}
        <h4 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">{title}</h4>
        
        {/* Description Text */}
        <p className="text-slate-600 text-sm mb-6 h-10 flex items-center justify-center font-light">
          Layanan berkualitas premium untuk kebutuhan Anda
        </p>
        
        {/* Price dengan styling lebih menarik */}
        <div className="bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl mb-6 border border-slate-100 group-hover:shadow-lg transition-all group-hover:border-amber-300">
          <p className="text-amber-600 font-black text-3xl">
            Rp {price}
          </p>
          <p className="text-slate-600 text-xs font-bold uppercase tracking-wider mt-1">
            per {unit}
          </p>
        </div>

        {/* CTA Button */}
        <button onClick={onOrderClick} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-300 group-hover:shadow-slate-400/50 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500 uppercase tracking-wider text-sm">
          Pesan Sekarang →
        </button>
      </div>
    </div>
  );
}

function StepItem({ number, icon, title, desc }) {
  return (
    <div className="flex flex-col items-center text-center group">
      <div className="w-24 h-24 bg-gradient-to-br from-slate-50 to-amber-50 border-3 border-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-8 relative z-10 group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-500 shadow-lg group-hover:shadow-xl group-hover:shadow-amber-200">
        <div className="text-3xl group-hover:scale-110 transition-transform">{icon}</div>
        <span className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
          {number}
        </span>
      </div>
      <h5 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-amber-600 transition-colors">{title}</h5>
      <p className="text-slate-600 text-sm leading-relaxed font-light">{desc}</p>
    </div>
  );
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 text-white group cursor-pointer">
      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-amber-500 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-xs uppercase font-bold tracking-widest">
          {label}
        </p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}

function AboutGridIcon({ icon, title, color }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white to-slate-50 border border-slate-100/50 hover:shadow-lg hover:border-amber-200 transition-all group">
      <div
        className={`w-12 h-12 bg-gradient-to-br ${color} text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
      >
        {icon}
      </div>
      <h5 className="font-bold text-slate-800 text-base group-hover:text-amber-600 transition-colors">{title}</h5>
    </div>
  );
}

export default App;
