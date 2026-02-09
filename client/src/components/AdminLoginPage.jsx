import { Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLoginPage({ onLogin, onNavigate }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Reset password setiap kali halaman ini diakses
    useEffect(() => {
      setPassword("");
      setError("");
      setShowPassword(false);
    }, []);

    const handleLogin = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      // Simulate delay untuk UX yang lebih baik
      await new Promise(resolve => setTimeout(resolve, 500));

      // Default admin password: admin123
      if (password === "admin123") {
        onLogin();
        setPassword("");
        setShowPassword(false);
      } else {
        setError("❌ Password salah! Coba lagi.");
        setPassword("");
        setShowPassword(false);
      }
    
      setIsLoading(false);
    };

    const isPasswordValid = password.length > 0;

    return (
      <div className="h-screen overflow-hidden pt-24 pb-12 px-6 bg-gradient-to-br from-white via-blue-50 to-cyan-50 flex items-center justify-center">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('home')}
          className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border-2 border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 rounded-xl transition-all hover:scale-105 font-semibold"
        >
          <ArrowLeft size={20} />
          <span>Kembali</span>
        </button>

        <div className="w-full max-w-md">
          {/* Header dengan Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-cyan-600 p-4 rounded-2xl shadow-lg">
                <Lock size={36} className="text-white" />
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-3">
              🔐 Admin Login
            </h2>
            <p className="text-slate-600 text-base">
              Masukkan password untuk mengakses dashboard admin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} autoComplete="off" className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border border-slate-100">
            {/* Dummy inputs untuk mencegah autofill browser */}
            <input type="text" style={{display: "none"}} />
            <input type="password" style={{display: "none"}} />

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
                Password Admin
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="admin_password_input"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-5 py-4 text-lg border-2 rounded-xl transition-all focus:outline-none ${
                    error
                      ? "border-red-400 focus:border-red-600 bg-red-50"
                      : isPasswordValid
                      ? "border-green-400 focus:border-green-600 bg-green-50"
                      : "border-slate-300 focus:border-blue-600 bg-slate-50"
                  }`}
                  autoFocus
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {isPasswordValid && !error && (
                <p className="text-xs text-green-600 font-semibold mt-2">
                  ✓ Password dimasukkan
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl">
                <p className="text-red-700 text-sm font-bold">{error}</p>
                <p className="text-red-600 text-xs mt-1">
                  Hubungi owner jika lupa password
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !isPasswordValid}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform ${
                isLoading || !isPasswordValid
                  ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Verifikasi...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Lock size={20} />
                  Masuk ke Dashboard
                </span>
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl text-center">
            <p className="text-blue-700 text-sm font-semibold">
              🔐 Akses Admin Terbatas
            </p>
            <p className="text-blue-600 text-xs mt-3">
              Hanya admin yang dapat mengakses dashboard untuk mengelola pesanan dan status laundry.
            </p>
          </div>
        </div>
      </div>
    );
}
