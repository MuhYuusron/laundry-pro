import { Search, User, Home, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export default function Navbar({ isAdmin, onAdminLogin, onAdminLogout, orders = [], currentPage = 'home', onNavigate = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminLogin = () => {
    setShowAdminLogin(false);
    onAdminLogin();
  };

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-4 cursor-pointer group" onClick={handleHomeClick}>
          <div className="bg-gradient-to-br from-amber-500 to-yellow-500 p-2.5 rounded-xl group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeOpacity="0.4" strokeWidth="2"/>
              <path d="M19.3639 15.273C17.4145 17.8463 14.8613 19.5 12 19.5C8.96243 19.5 6.5 17.0376 6.5 14C6.5 10.9624 8.96243 8.5 12 8.5C15.0376 8.5 17.5 10.9624 17.5 14C17.5 14.8284 17.2863 15.6067 16.9261 16.273" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500">
           Nyook Laundry
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1 font-medium">
          <a href="#" onClick={handleHomeClick} className="flex items-center gap-2 text-slate-700 hover:text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all group">
            <Home size={18} className="group-hover:scale-110 transition-transform" />
            <span>Beranda</span>
          </a>
          <a href="#tentang" className="text-slate-700 hover:text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all font-semibold">
            Tentang Kami
          </a>
          <a href="#layanan" className="text-slate-700 hover:text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all font-semibold">
            Layanan
          </a>
          <a href="#proses" className="text-slate-700 hover:text-amber-600 px-4 py-2 rounded-lg hover:bg-amber-50 transition-all font-semibold">
            Proses
          </a>
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={() => onNavigate('track-order')}
            className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-slate-900 text-slate-900 hover:bg-slate-50 transition-all font-semibold hover:scale-105"
          >
            <Search size={18} />
            <span className="hidden lg:inline">Lacak</span>
          </button>
          {isAdmin ? (
            <button
              onClick={onAdminLogout}
              className="flex items-center gap-2 bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700 transition-all shadow-lg font-semibold hover:scale-105"
            >
              <LogOut size={18} />
              <span className="hidden lg:inline">Logout</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('admin-login')}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full hover:scale-105 shadow-lg font-semibold hover:shadow-slate-300 hover:bg-slate-800"
            >
              <User size={18} />
              <span className="hidden lg:inline">Masuk</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <a href="#" onClick={(e) => { handleHomeClick(e); setIsOpen(false); }} className="flex items-center gap-2 text-slate-700 hover:text-amber-600 px-4 py-3 rounded-lg hover:bg-amber-50 transition-all block font-semibold">
              <Home size={18} />
              <span>Beranda</span>
            </a>
            <a href="#tentang" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-amber-600 px-4 py-3 rounded-lg hover:bg-amber-50 transition-all block font-semibold">
              Tentang Kami
            </a>
            <a href="#layanan" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-amber-600 px-4 py-3 rounded-lg hover:bg-amber-50 transition-all block font-semibold">
              Layanan
            </a>
            <a href="#proses" onClick={() => setIsOpen(false)} className="text-slate-700 hover:text-amber-600 px-4 py-3 rounded-lg hover:bg-amber-50 transition-all block font-semibold">
              Proses
            </a>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  onNavigate('track-order');
                  setIsOpen(false);
                }}
                className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-900 text-slate-900 px-4 py-3 rounded-lg hover:bg-slate-50 transition-all font-semibold"
              >
                <Search size={18} />
                <span>Lacak</span>
              </button>
              {isAdmin ? (
                <button
                  onClick={() => {
                    onAdminLogout();
                    setIsOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-rose-600 text-white px-4 py-3 rounded-lg hover:bg-rose-700 transition-all font-semibold"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onNavigate('admin-login');
                    setIsOpen(false);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-lg hover:bg-slate-800 transition-all font-semibold"
                >
                  <User size={18} />
                  <span>Masuk</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
