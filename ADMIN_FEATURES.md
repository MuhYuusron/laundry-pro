# 🎯 Admin System - Laundry Pro

## Fitur Admin yang Sudah Diimplementasikan

### 1️⃣ Admin Login
- **Tombol:** "Masuk" di navbar (ikon User)
- **Password Default:** `admin123`
- **Akses:** Desktop dan Mobile

### 2️⃣ Admin Dashboard
Setelah login, admin dapat melihat:
- ✅ **Semua Pesanan** dalam format table
- 📊 **Statistik:** Total pesanan, menunggu, diproses, siap diambil

### 3️⃣ Status Pesanan
Admin dapat update status ke:
- ⏳ **Menunggu** (Pending) - Default
- ⚙️ **Diproses** (Processing)
- ✅ **Siap Diambil** (Ready)
- ✓ **Selesai** (Completed)

### 4️⃣ Kelola Pesanan
- **Edit**: Update status dan tambah catatan untuk pelanggan
- **Hapus**: Hapus pesanan setelah diambil (dengan konfirmasi)
- **Logout**: Keluar dari admin panel

### 5️⃣ Pelacakan Pesanan (Customer)
- **Tombol:** "Lacak" di navbar (ikon Search)
- **Cara Kerja:** Pelanggan masukkan nomor HP mereka
- **Hasil:** Melihat semua pesanan mereka + status + catatan admin

### 6️⃣ Penyimpanan Data
- Semua pesanan disimpan di **localStorage** browser
- Data persisten (tetap ada meski direload)
- Tidak perlu backend (berjalan offline)

---

## 🔄 Alur Kerja

### Pelanggan
1. Isi form pesanan di halaman utama
2. Klik "Pesan Sekarang"
3. Pesanan disimpan ke sistem + WhatsApp notif
4. Pelanggan bisa lacak pesanan via "Lacak" tombol dengan nomor HP

### Admin
1. Klik tombol "Masuk" di navbar
2. Input password: `admin123`
3. Lihat semua pesanan di dashboard
4. Update status untuk setiap pesanan
5. Tambah catatan untuk customer
6. Hapus pesanan kalau sudah diambil

---

## 📱 Fitur per Device
- ✅ Desktop: Full functionality
- ✅ Mobile: Responsive hamburger menu, all features accessible

---

## 🔐 Security Notes
- Password hardcoded (untuk demo) - ubah di `AdminLogin.jsx` jika live
- Data di localStorage (tidak terenkripsi) - tambahkan backend untuk production
- Tidak ada login validation di backend - tambahkan server authentication

---

## 🚀 Cara Menggunakan

### Test Admin
1. Buka aplikasi
2. Klik "Masuk" → input `admin123`
3. Dashboard muncul dengan table pesanan

### Test Customer Order
1. Isi form dengan data lengkap
2. Klik "Pesan Sekarang"
3. Order masuk ke sistem + WhatsApp notification
4. Pelanggan bisa lacak via "Lacak" button

### Edit Pesanan
1. Di admin dashboard, klik ✏️ (Edit) pada row pesanan
2. Ubah status dan tambah catatan
3. Klik "Simpan"

### Hapus Pesanan
1. Di admin dashboard, klik 🗑️ (Delete) pada row pesanan
2. Confirm dialog muncul
3. Pesanan dihapus dari sistem
