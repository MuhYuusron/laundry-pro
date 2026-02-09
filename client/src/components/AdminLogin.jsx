import { Lock, X, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLogin({ onClose, onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Reset password setiap kali modal ini dibuka
  useEffect(() => {
    setPassword("");
    setError("");
    setShowPassword(false);
    // Ensure browser autofill is cleared and input blurred
    setTimeout(() => {
      setPassword("");
      const el = document.getElementById("admin-password-modal");
      if (el) {
        try { el.value = ""; el.blur(); } catch (e) {}
      }
    }, 50);
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative animate-surge">
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
              <Lock size={36} className="text-white" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            🔐 Admin Login
          </h2>
          <p className="text-slate-500 text-sm">
            Masukkan password untuk mengakses dashboard admin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
          {/* Hidden dummy inputs to deter browser autofill */}
          <input type="text" name="fake-username" autoComplete="username" style={{display: 'none'}} />
          <input type="password" name="fake-password" autoComplete="new-password" style={{display: 'none'}} />
          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">
              Password Admin
            </label>
            <div className="relative">
              <input
                id="admin-password-modal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInvalid={(e) => e.preventDefault()}
                placeholder="Masukkan password"
                autoComplete="new-password"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                required
                className={`w-full px-5 py-4 text-lg border-2 rounded-xl transition-all focus:outline-none ${
                  error
                    ? "border-red-400 focus:border-red-600 bg-red-50"
                    : isPasswordValid
                    ? "border-green-400 focus:border-green-600 bg-green-50"
                    : "border-slate-300 focus:border-blue-600 bg-slate-50"
                }`}
                // no autoFocus to avoid autofocus triggering autofill
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
            {!password && (
              <p className="text-xs text-slate-500 font-semibold mt-2">
                💡 Silahkan masukkan password
              </p>
            )}
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


      </div>
    </div>
  );
}
