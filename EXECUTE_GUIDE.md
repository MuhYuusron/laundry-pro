# 🎯 STEP-BY-STEP EXECUTION GUIDE

## STEP 1: Create Database Tables (CRITICAL ⚠️)

### Timing: 5 minutes

### Instructions:
1. **Go to Supabase Dashboard**
   - URL: https://app.supabase.com
   - Login dengan email Anda

2. **Select Project**
   - Click pada project "laundry-pro"
   - Tunggu sampai dashboard load

3. **Open SQL Editor**
   - Left sidebar → "SQL Editor" (atau ketik di search)
   - Click "Create Query" atau "New Query"

4. **Copy SQL Code**
   - File: `database_setup.sql` (di root folder)
   - Copy SEMUA content

5. **Paste ke SQL Editor**
   - Paste di query box

6. **Execute Query**
   - Tombol "Run" (atau Ctrl+Enter)
   - Tunggu sampai selesai (should say "No rows returned" atau success message)

7. **Verify Tables Created**
   - Left sidebar → "Table Editor"
   - Harusnya ada: `orders` dan `admin_users` tables

### ✅ Success Indicators:
- No error messages
- Tables appear di "Table Editor"
- Can see columns: id, name, phone, address, service, dll

### ❌ If Error:
- Copy error message
- Check syntax di database_setup.sql
- Try beg query satu-satu
- Check permissions di Supabase project settings

---

## STEP 2: Test Database Connection (2 minutes)

### Instructions:
1. **Go to Terminal**
   ```bash
   cd c:\Users\Hp Victus\laundry-pro\client
   npm run dev
   ```

2. **Open Browser**
   - URL: http://localhost:5174

3. **Check Console untuk Errors**
   - Press F12 (Developer Tools)
   - Console tab
   - Harus clean (no red errors)

4. **Verify Connection**
   - Jika tidak ada error, Supabase connected!

---

## STEP 3: Create Test Order (2 minutes)

### Instructions:
1. **Fill Order Form**
   - Nama: "Test Admin"
   - No. HP: "628123456789"
   - Alamat: "Jl. Test"
   - Layanan: "Daily Kiloan"
   - Berat: "5"
   - Tanggal: "2025-02-10"

2. **Click "Pesan Sekarang"**
   - Should see: "✅ Pesanan berhasil dicatat!"

3. **Check Supabase**
   - Go to: app.supabase.com → Table Editor
   - Click "orders" table
   - New row should appear dengan data Anda

### ✅ Success: Data ada di Supabase! 

---

## STEP 4: Test Admin Dashboard (2 minutes)

### Instructions:
1. **Click "Masuk" Button**
   - Nongol modal login

2. **Enter Password**
   - Password: `admin123`
   - Click "Masuk"

3. **Admin Dashboard Appears**
   - Should show table dengan order dari STEP 3

4. **Test Edit**
   - Click ✏️ icon di row
   - Change status ke "processing"
   - Add note: "Test note"
   - Click "Simpan"

5. **Verify Update**
   - Order row updated dengan status baru
   - Check di Supabase: data should be updated

### ✅ Success: Admin can edit orders in database!

---

## STEP 5: Test Customer Tracking (2 minutes)

### Instructions:
1. **Click "Lacak" Button**
   - Modal puncak

2. **Enter Phone Number**
   - Phone: `628123456789` (dari order kita)
   - Click "Cari Pesanan"

3. **Results Appear**
   - Should show order dari STEP 3
   - Status harus "processing" (dari STEP 4)
   - Notes harus visible: "Test note"

### ✅ Success: Customers dapat track pesanan mereka!

---

## STEP 6: Cleanup & Prepare for Production

### Optional: Delete Test Order
1. Click "Masuk" → password: admin123
2. Click 🗑️ delete icon di test order
3. Confirm deletion

### Before Going Live:
1. **Update Password**
   - Edit file: `src/components/AdminLogin.jsx`
   - Find: `if (password === "admin123")`
   - Change ke password yang strong

2. **Setup Environment Variables** (untuk production)
   - Create: `client/.env.local`
   - Copy dari `.env.example`
   - Keep API keys safe!

3. **Enable RLS Policies** (jika public API)
   - Supabase Dashboard → Authentication → Policies
   - Setup proper authorization

4. **Test di Staging**
   - Deploy ke staging environment
   - Full test sebelum production

---

## 🚀 DEPLOYMENT (Optional)

### Deploy ke Vercel (5 minutes):

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Supabase integration"
   git push
   ```

2. **Connect to Vercel**
   - Go to: vercel.com
   - Click "New Project"
   - Select GitHub repo: laundry-pro
   - Import

3. **Add Environment Variables**
   - Environment tab
   - Add:
     ```
     VITE_SUPABASE_URL = https://hjgjpuyfdakplayknqbb.supabase.co
     VITE_SUPABASE_ANON_KEY = sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait until green checkmark
   - Visit live URL!

---

## 📞 TROUBLESHOOTING

### "Gagal memuat pesanan"
✅ Solution:
1. Check internet connection
2. Verify Supabase project online
3. F12 → Console → lihat error message
4. Try refresh page

### "Cannot find module '@supabase/supabase-js'"
✅ Solution:
```bash
cd client
npm install @supabase/supabase-js
```

### "Connection refused"
✅ Solution:
1. Check Supabase URL di supabaseClient.js
2. Check API key correct
3. Check internet connection

### "Order tidak save"
✅ Solution:
1. Check SQL executed di Supabase
2. Check table "orders" exists
3. Check browser console untuk error
4. Try malagi order

---

## ✅ FINAL CHECKLIST

- [ ] SQL executed di Supabase
- [ ] npm run dev berjalan
- [ ] No errors di browser console
- [ ] Create test order berhasil
- [ ] Order appear di Supabase
- [ ] Admin dashboard buka
- [ ] Admin bisa edit order
- [ ] Customer tracking bekerja
- [ ] All tests passed

---

## 🎉 SELESAI!

Aplikasi Anda sekarang production-ready!

### Summary dari awal:
1. ✅ Created Supabase project
2. ✅ Integrated Supabase client
3. ✅ Created database tables
4. ✅ Updated all components
5. ✅ Tested locally
6. ✅ Ready for production deployment

**Congratulations! 🚀**

---

**Questions?** Check SUPABASE_SETUP_GUIDE.md untuk detail lebih lanjut.
