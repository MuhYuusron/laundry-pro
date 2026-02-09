# 🚀 QUICK START - SUPABASE INTEGRATION

## ⚡ 3 LANGKAH SETUP

### 1️⃣ Buat Database Tables (5 menit)
```
1. Login ke https://app.supabase.com/ → Project "laundry-pro"
2. Buka SQL Editor di sidebar
3. Copy-paste semua SQL dari file: database_setup.sql
4. Klik "Run"
5. ✅ Done!
```

### 2️⃣ Verify Configuration (1 menit)
File sudah di-set:
- ✅ `src/lib/supabaseClient.js` - API keys sudah ada
- ✅ `src/lib/databaseService.js` - Database functions siap
- ✅ `src/App.jsx` - Sudah pakai Supabase
- ✅ Semua components sudah update

### 3️⃣ Test Aplikasi (5 menit)
```bash
cd client
npm run dev
```

Buka http://localhost:5174 dan test:
- ✅ Isi form pesanan
- ✅ Klik "Pesan Sekarang" 
- ✅ Klik "Masuk" → password: admin123
- ✅ Lihat pesanan di dashboard
- ✅ Klik "Lacak" → cari pesanan

---

## 📁 File Structure Baru

```
client/src/lib/
├── supabaseClient.js      ← Config Supabase
└── databaseService.js     ← Database operations (CRUD)

client/
├── database_setup.sql     ← SQL untuk buat tables
└── .env.example          ← Environment template

Folder root/
├── SUPABASE_SETUP_GUIDE.md    ← Detail setup guide
└── database_setup.sql         ← SQL file
```

---

## 🎯 Fitur yang Sudah Siap

| Fitur | Status | DB | Notes |
|-------|--------|----|----|
| Customer Order | ✅ | Supabase | Otomatis save ke database |
| Admin Dashboard | ✅ | Supabase | Real-time data dari DB |
| Update Status | ✅ | Supabase | Langsung update ke DB |
| Delete Order | ✅ | Supabase | Hard delete dari DB |
| Track Order | ✅ | Supabase | Query by phone number |
| localStorage | ❌ | Removed | Semua pakai database sekarang |

---

## 🔑 API Keys (Already Set)

```javascript
URL: https://hjgjpuyfdakplayknqbb.supabase.co
KEY: sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6
```

✅ No action needed!

---

## 🐛 Troubleshoot

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
cd client
npm install
```

### Error: "Gagal memuat pesanan"
- Check internet connection
- Verify Supabase project status
- Check browser console untuk error detail

### Orders tidak muncul di admin
- Pastikan SQL sudah di-execute di Supabase
- Refresh halaman
- Check di Supabase Dashboard → table orders data

---

## 📞 Support

Jika ada error:
1. Check browser console (F12)
2. Check Supabase logs (Dashboard → Logs)
3. Verify Internet connection
4. Verify API keys di supabaseClient.js

---

## 🎉 Selesai!

Aplikasi Anda sekarang production-ready dengan database!

**Next**: Deploy ke Vercel atau hosting lainnya.
