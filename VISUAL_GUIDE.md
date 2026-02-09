# 🗄️ SUPABASE INTEGRATION - VISUAL GUIDE

## 1️⃣ PROJECT OVERVIEW

```
┌─────────────────────────────────────────────────────────┐
│                  LAUNDRY-PRO APPLICATION                │
│                  (Powered by Supabase)                  │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐
│   CUSTOMER PORTAL    │      │   ADMIN DASHBOARD    │
│  (Frontend React)    │      │  (Frontend React)    │
│                      │      │                      │
│ • Order Form         │      │ • View All Orders    │
│ • Order Tracking     │      │ • Edit Status        │
│ • View Status        │      │ • Add Notes          │
└──────────┬───────────┘      └──────────┬───────────┘
           │                             │
           └─────────────┬───────────────┘
                         │
          ┌──────────────▼──────────────┐
          │   SUPABASE (Database)       │
          │                             │
          │  • Orders Table             │
          │  • Admin Users Table        │
          │  • Authentication           │
          │  • Real-time Sync           │
          └─────────────────────────────┘
```

---

## 2️⃣ FILE CHANGES VISUALIZATION

### Created Files (NEW ✨)
```
src/lib/
├── supabaseClient.js       [NEW] Config Supabase
└── databaseService.js      [NEW] CRUD operations

Root/
├── database_setup.sql           [NEW] SQL tables
├── SUPABASE_SETUP_GUIDE.md     [NEW] Detailed guide
├── QUICK_START.md              [NEW] Quick reference
├── EXECUTE_GUIDE.md            [NEW] Step-by-step
├── INTEGRATION_VERIFICATION.md [NEW] Verification
└── SUPABASE_INTEGRATION_SUMMARY.md [NEW] This summary
```

### Modified Files (✏️)
```
src/
├── App.jsx                      [MODIFIED] Supabase integration
├── components/
│   ├── AdminDashboard.jsx      [MODIFIED] Use database
│   ├── OrderTracker.jsx        [MODIFIED] Database search
│   └── Navbar.jsx              [MODIFIED] Pass orders prop
│
└── lib/ (CREATED)
    └── databaseService.js      [NEW] Database functions
```

### Unchanged Files (✅)
```
AdminLogin.jsx  - Works as-is with App.jsx
App.css         - No changes needed
```

---

## 3️⃣ DATA FLOW DIAGRAM

```
CUSTOMER SIDE                    ADMIN SIDE
═════════════════════════════════════════════════════════

                    HOMEPAGE
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    [FORM]         [TRACKING]       [LOGIN]
    (Order)        (Status)         (Dashboard)
        │               │               │
        └───────────────┼───────────────┘
                        │
              ┌─────────▼─────────┐
              │ REACT COMPONENTS  │
              │  (App.jsx)        │
              └─────────┬─────────┘
                        │
        ┌───────────────▼───────────────┐
        │                               │
    OrderService              AuthService
    (CRUD operations)      (Validation)
        │                       │
        └───────────────┬───────┘
                        │
            ┌───────────▼───────────┐
            │ Supabase Client SDK   │
            │ (@supabase/js)        │
            └───────────┬───────────┘
                        │
            ┌───────────▼───────────┐
            │  SUPABASE DATABASE    │
            │  (Cloud Backend)      │
            │                       │
            │  • orders table       │
            │  • admin_users table  │
            │  • Backups            │
            └───────────────────────┘
```

---

## 4️⃣ FUNCTION FLOW

### ORDER CREATION
```
Customer fills form
         │
         ▼
handleSubmit() in App.jsx
         │
         ▼
OrderService.createOrder(formData)
         │
         ▼
supabase.from('orders').insert()
         │
         ▼
✅ Order saved to Supabase
✅ WhatsApp notification sent
✅ Form reset
```

### ADMIN UPDATE
```
Admin clicks Edit
         │
         ▼
Modal opens (edit form)
         │
         ▼
Admin changes status + notes
         │
         ▼
Click "Simpan"
         │
         ▼
handleUpdateOrder()
         │
         ▼
OrderService.updateOrder()
         │
         ▼
supabase.from('orders').update()
         │
         ▼
✅ Database updated
✅ UI updated with new data
✅ Success alert shown
```

### CUSTOMER TRACKING
```
Customer clicks "Lacak"
         │
         ▼
Modal opens (search form)
         │
         ▼
Customer enters phone number
         │
         ▼
Click "Cari Pesanan"
         │
         ▼
OrderService.getOrdersByPhone(phone)
         │
         ▼
supabase.from('orders').select().filter()
         │
         ▼
✅ Matching orders loaded
✅ Display with status & notes
```

---

## 5️⃣ SUPABASE TABLE STRUCTURE

### Table: ORDERS
```
┌─────────┬────────────────────┬──────────┬─────────────┐
│ Column  │ Type               │ Required │ Default     │
├─────────┼────────────────────┼──────────┼─────────────┤
│ id      │ UUID               │ Yes ✅   │ Auto        │
│ name    │ VARCHAR(255)       │ Yes ✅   │ -           │
│ phone   │ VARCHAR(20)        │ Yes ✅   │ -           │
│ address │ TEXT               │ Yes ✅   │ -           │
│ service │ VARCHAR(100)       │ Yes ✅   │ -           │
│ weight  │ DECIMAL(10,2)      │ Yes ✅   │ -           │
│ pickup_ │ VARCHAR(100)       │ Yes ✅   │ -           │
│ date    │                    │          │             │
│ status  │ VARCHAR(50)        │ No      │ 'pending'   │
│ notes   │ TEXT               │ No      │ ''          │
│ created │ TIMESTAMP          │ No      │ NOW()       │
│ _at     │                    │          │             │
│ updated │ TIMESTAMP          │ No      │ NOW()       │
│ _at     │                    │          │             │
└─────────┴────────────────────┴──────────┴─────────────┘

Status VALUES: pending | processing | ready | completed
```

---

## 6️⃣ API ENDPOINTS (Supabase)

```
┌──────────────────────────────────────────────────────┐
│  SUPABASE ENDPOINT: https://hjgjpuyfdakplayknqbb.supabase.co
│  Project ID: hjgjpuyfdakplayknqbb
└──────────────────────────────────────────────────────┘

Operations (Auto-generated by Supabase):
─────────────────────────────────────────

SELECT:   GET /rest/v1/orders
INSERT:   POST /rest/v1/orders
UPDATE:   PATCH /rest/v1/orders?id=eq.{id}
DELETE:   DELETE /rest/v1/orders?id=eq.{id}

Authentication:
───────────────
Header: Authorization: Bearer {ANON_KEY}
ANON_KEY: sb_publishable_7C8HDCoRzKLcrsdmZbftqw_nxE4RRG6

(Automatically handled by Supabase SDK!)
```

---

## 7️⃣ COMPONENT HIERARCHY

```
┌─────────────────────────────────────────┐
│              App.jsx                    │
│  (Main logic, state management)         │
│                                         │
│  State:                                 │
│  • orders (from Supabase)              │
│  • formData (customer order)           │
│  • isAdmin (login status)              │
│  • loading (async states)              │
└────┬────────────────┬───────────────────┘
     │                │
     ▼                ▼
┌──────────┐    ┌──────────────┐
│ Navbar   │    │ Sections     │
│ • Auth   │    │ • Hero       │
│ • Nav    │    │ • About      │
│ • Login  │    │ • Services   │
│ • Logout │    │ • Form       │
│ • Track  │    │ • Footer     │
└────┬─────┘    └──────────────┘
     │                │
     ├─────────┬──────┘
     ▼         ▼
  ┌────────────────────┐
  │ AdminLogin (Modal) │
  └──────────────────┬─┘
                     ▼
  ┌─────────────────────────┐
  │ AdminDashboard (Modal)  │
  │ • View Orders           │
  │ • Edit Status           │
  │ • Delete Order          │
  └─────────────────────────┘
     
     ▼
  ┌────────────────────┐
  │ OrderTracker Modal │
  │ • Search by phone  │
  │ • View status      │
  └────────────────────┘
```

---

## 8️⃣ STATUS FLOW

```
Order Lifecycle:
────────────────

  1. pending          (Pesanan baru - belum diproses)
       │
       ▼
  2. processing       (Admin sedang memproses)
       │
       ▼
  3. ready            (Siap untuk diambil pelanggan)
       │
       ▼
  4. Delete           (Admin menghapus setelah diambil)


Visual Timeline:
────────────────

Customer Orders
       ↓
    ⏳ pending          [Customer dapat notification]
       ↓
Admin Updates Status
       ↓
    ⚙️ processing       [Customer can track]
       ↓
Admin Updates Status
       ↓
    ✅ ready            [Customer knows to pickup]
       ↓
Customer Takes Item
       ↓
Admin Delete Order
       ↓
    ✓ Archived         [Record gone from table]
```

---

## 9️⃣ AUTHENTICATION FLOW

```
Current (Simple):
─────────────────

User clicks "Masuk"
         │
         ▼
AdminLogin Modal appears
         │
         ▼
User enters password
         │
         ▼
validateAdminPassword("password")
         │
         ▼
Compare: password === "admin123"
         │
    ┌────┴────┐
    │          │
   YES        NO
    │          │
    ▼          ▼
✅ Login   ❌ Error
setIsAdmin(true)


Future (Recommended):
─────────────────────

User enters email + password
         │
         ▼
supabase.auth.signInWithPassword()
         │
         ▼
Supabase validates (using password_hash)
         │
    ┌────┴────┐
    │          │
   OK        ERROR
    │          │
    ▼          ▼
✅ JWT     ❌ Invalid
   Token
```

---

## 🔟 DEPLOYMENT ARCHITECTURE

```
Development
───────────
Local Machine
    │
    ├─ React App (localhost:5174)
    └─ Supabase DB (Cloud)


Production
──────────
                    ┌────────────────┐
                    │  Your Domain   │
                    │   (yoursite)   │
                    └────────┬───────┘
                             │
                    ┌────────▼───────┐
                    │ Vercel/Netlify │ (CDN)
                    │ (Server Host)  │
                    └────────┬───────┘
                             │
                    ┌────────▼───────┐
                    │  Supabase      │ (Database)
                    │  (Backend)     │
                    └────────────────┘
```

---

## 🎯 QUICK REFERENCE

| What | Where | How |
|------|-------|-----|
| Create Order | OrderService | `.createOrder(data)` |
| Get All Orders | OrderService | `.getAllOrders()` |
| Search Orders | OrderService | `.getOrdersByPhone(phone)` |
| Update Order | OrderService | `.updateOrder(id, data)` |
| Delete Order | OrderService | `.deleteOrder(id)` |
| Login Check | AuthService | `.validateAdminPassword(pwd)` |
| Database | Supabase | https://app.supabase.com |

---

## 📌 REMEMBER

✅ All code is ready
✅ All packages installed
✅ Configuration complete
⏳ **PENDING**: Execute SQL in Supabase (5 minutes)
✅ Then test locally
✅ Then deploy

---

**You got this! 🚀**
