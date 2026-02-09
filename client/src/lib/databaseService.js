import { supabase } from "./supabaseClient";

// ============ ORDERS OPERATIONS ============

export const OrderService = {
  // Get all orders
  async getAllOrders() {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      return [];
    }
  },

  // Get orders by phone number
  async getOrdersByPhone(phone) {
    try {
      const normalizedPhone = phone.replace(/\D/g, "");
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .filter("phone", "ilike", `%${normalizedPhone}%`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching orders by phone:", error.message);
      return [];
    }
  },

  // Create new order
  async createOrder(orderData) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            service: orderData.service,
            weight: parseFloat(orderData.weight),
            pickup_date: orderData.pickupDate,
            status: "pending",
            notes: "",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error("Error creating order:", error.message);
      throw error;
    }
  },

  // Update order
  async updateOrder(orderId, updates) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId)
        .select();

      if (error) throw error;
      return data?.[0] || null;
    } catch (error) {
      console.error("Error updating order:", error.message);
      throw error;
    }
  },

  // Delete order
  async deleteOrder(orderId) {
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting order:", error.message);
      throw error;
    }
  },

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching order:", error.message);
      return null;
    }
  },

  // Get orders by status
  async getOrdersByStatus(status) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching orders by status:", error.message);
      return [];
    }
  },
};

// ============ ADMIN AUTH OPERATIONS ============

export const AuthService = {
  // Simple password check (consider using Supabase Auth for production)
  validateAdminPassword(password) {
    // Using a simple hardcoded password for now
    // In production, use proper authentication with bcrypt
    return password === "admin123";
  },

  // Get admin users (optional - for future enhancement)
  async getAdminUsers() {
    try {
      const { data, error } = await supabase.from("admin_users").select("*");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching admin users:", error.message);
      return [];
    }
  },
};
