-- ==========================================
-- LAUNDRY PRO DATABASE SETUP
-- Execute this SQL in Supabase SQL Editor
-- ==========================================

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  service VARCHAR(100) NOT NULL,
  weight DECIMAL(10, 2) NOT NULL,
  pickup_date VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'ready', 'completed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create Admin Users Table (optional - for future auth)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Create Indexes untuk Performance
CREATE INDEX IF NOT EXISTS idx_orders_phone ON orders(phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- 4. Enable RLS (Row Level Security) - Optional tetapi recommended
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS Policies (Allow all for now - restrict in production)
CREATE POLICY "Allow all to read orders" 
  ON orders 
  FOR SELECT 
  TO anon 
  USING (true);

CREATE POLICY "Allow all to insert orders" 
  ON orders 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Allow all to update orders" 
  ON orders 
  FOR UPDATE 
  TO anon 
  USING (true);

CREATE POLICY "Allow all to delete orders" 
  ON orders 
  FOR DELETE 
  TO anon 
  USING (true);

-- 6. Create Function untuk auto-update `updated_at` timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7. Create Trigger untuk update timestamp
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- SELESAI! Database siap digunakan
-- ==========================================
