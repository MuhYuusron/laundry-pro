# 🗄️ SETUP SUPABASE DATABASE - LAUNDRY PRO

## ✅ CHECKLIST SETUP

### 1. ✅ Sudah Dilakukan
- [x] Install `@supabase/supabase-js` package
- [x] Create `supabaseClient.js` config
- [x] Create `databaseService.js` untuk database operations
- [x] Update App.jsx untuk gunakan Supabase
- [x] Update AdminDashboard.jsx untuk field names yang sesuai
- [x] Update OrderTracker.jsx untuk fetch dari Supabase

---

## 📋 STEP 1: Create Database Tables di Supabase

1. **Login ke Supabase Dashboard**: https://app.supabase.com/
2. **Pilih project**: `laundry-pro`
3. **Buka SQL Editor** (sidebar left → SQL)
4. **Copy & paste** SQL dari file `database_setup.sql`
5. **Klik "Run"** untuk execute semua queries

✅ **Hasilnya**: 3 tables akan dibuat:
- `orders` - menyimpan semua pesanan customer
- `admin_users` - untuk future authentication
- Indexes untuk performa

---

## 🔑 STEP 2: Verify API Keys

Sudah di-set di `src/lib/supabaseClient.js`:
```javascript
const SUPABASE_URL = "https://hjgjpuyfdakplayknqbb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6";
```

✅ **Status**: READY

---

## 🚀 STEP 3: Test di Development

1. **Start development server**:
   ```bash
   cd client
   npm run dev
   ```

2. **Test Customer Order**:
   - Isi form pesanan
   - Klik "Pesan Sekarang"
   - Check di Supabase: Data harus muncul di tabel `orders`

3. **Test Admin**:
   - Klik "Masuk" → Password: `admin123`
   - Dashboard muncul dengan pesanan dari database
   - Edit, update, dan delete harus berfungsi

4. **Test Customer Tracking**:
   - Klik "Lacak"
   - Masukkan nomor HP yang ada di database
   - Pesanan harus muncul dengan status terbaru

---

## 🔒 SECURITY NOTES

### ⚠️ Risk Areas (untuk production):
1. **API Key di client** - Sudah OK untuk demo, tapi restrict di production:
   - Di Supabase Dashboard: Settings → API → Row Level Security
   - Enable RLS dan set proper policies

2. **Admin password hardcoded** - Ubah ke proper authentication:
   - Gunakan Supabase Auth built-in
   - Atau implementasikan proper JWT

3. **Data encryption** - Pertimbangkan enkripsi untuk data sensitif

### ✅ RLS Sudah Di-Enable di SQL:
```sql
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all to read orders" ON orders FOR SELECT TO anon USING (true);
-- dst...
```

---

## 📊 Database Schema

### Table: orders
```
id              UUID (Primary Key)
name            VARCHAR(255)      - Nama customer
phone           VARCHAR(20)       - Nomor HP
address         TEXT              - Alamat pengiriman
service         VARCHAR(100)      - Jenis layanan
weight          DECIMAL(10, 2)    - Berat barang (kg)
pickup_date     VARCHAR(100)      - Tanggal jemput
status          VARCHAR(50)       - pending/processing/ready/completed
notes           TEXT              - Catatan dari admin
created_at      TIMESTAMP         - Waktu pesanan dibuat (auto)
updated_at      TIMESTAMP         - Waktu terakhir diupdate (auto)
```

### Table: admin_users (untuk future)
```
id              UUID (Primary Key)
email           VARCHAR(255) UNIQUE
password_hash   VARCHAR(255)
created_at      TIMESTAMP
```

---

## 🛠️ Database Operations (from databaseService.js)

### OrderService Functions:
- `getAllOrders()` - Get semua orders sorted by created_at desc
- `getOrdersByPhone(phone)` - Cari orders by nomor HP (fuzzy search)
- `getOrdersByStatus(status)` - Cari orders by status
- `getOrderById(orderId)` - Get single order
- `createOrder(data)` - Buat order baru
- `updateOrder(id, updates)` - Update order status & notes
- `deleteOrder(id)` - Delete order

### AuthService Functions:
- `validateAdminPassword(password)` - Currently hardcoded "admin123"
- `getAdminUsers()` - Get list admin users (future use)

---

## 🔄 Real-time Updates

Untuk enable real-time updates (automatic refresh saat admin update):
```javascript
// Di App.jsx, tambahkan:
useEffect(() => {
  const subscription = supabase
    .from('orders')
    .on('*', payload => {
      console.log('Change received!', payload)
      loadOrders() // Reload orders
    })
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

---

## 📱 Deployment (untuk production)

### Frontend (Vercel / Netlify):
1. Push ke GitHub
2. Connect ke Vercel
3. Masukkan environment variables di Vercel dashboard
4. Deploy!

### Environment Variables:
```
VITE_SUPABASE_URL=https://hjgjpuyfdakplayknqbb.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6
```

Update `src/lib/supabaseClient.js`:
```javascript
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
```

---

## ❓ TROUBLESHOOTING

### "Gagal memuat pesanan dari database"
- Check Supabase connection
- Verify API key di supabaseClient.js
- Check console untuk error messages

### "Pesanan tidak tersimpan"
- Verify table `orders` sudah ada
- Check RLS policies allow INSERT
- Check console untuk error detail

### "Lacak pesanan tidak ada hasil"
- Verify nomor HP format sesuai yang tersimpan
- Check di Supabase: apakah data sudah ada?

---

## 📞 NEXT STEPS

1. ✅ Execute SQL untuk buat tables
2. ✅ Test order creation
3. ✅ Test admin dashboard
4. ✅ Test customer tracking
5. 🔐 Setup proper authentication (optional)
6. 🚀 Deploy ke production

---

**Happy coding! 🎉**
