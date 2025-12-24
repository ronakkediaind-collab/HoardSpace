import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useHoardings(filters = {}) {
  const [hoardings, setHoardings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHoardings();
  }, [JSON.stringify(filters)]);

  const fetchHoardings = async () => {
    try {
      setIsLoading(true);
      let query = supabase
        .from("hoardings")
        .select(`
          *,
          vendor:profiles!vendor_id(full_name, company_name, rating)
        `)
        .eq("status", "available");

      if (filters.city) {
        query = query.ilike("city", `%${filters.city}%`);
      }

      if (filters.type) {
        query = query.eq("type", filters.type);
      }

      if (filters.minPrice) {
        query = query.gte("daily_rate", filters.minPrice);
      }

      if (filters.maxPrice) {
        query = query.lte("daily_rate", filters.maxPrice);
      }

      const { data, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) throw error;
      setHoardings(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching hoardings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { hoardings, isLoading, error, refetch: fetchHoardings };
}

export function useHoarding(id) {
  const [hoarding, setHoarding] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchHoarding();
    }
  }, [id]);

  const fetchHoarding = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("hoardings")
        .select(`
          *,
          vendor:profiles!vendor_id(full_name, company_name, phone, rating, avatar_url),
          reviews(
            id,
            rating,
            comment,
            created_at,
            reviewer:profiles!reviewer_id(full_name, avatar_url)
          )
        `)
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      setHoarding(data);

      if (data) {
        await supabase.rpc("increment_hoarding_views", {
          hoarding_id: id,
        });
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching hoarding:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { hoarding, isLoading, error, refetch: fetchHoarding };
}

export function useVendorHoardings(vendorId) {
  const [hoardings, setHoardings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (vendorId) {
      fetchVendorHoardings();
    }
  }, [vendorId]);

  const fetchVendorHoardings = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("hoardings")
        .select("*")
        .eq("vendor_id", vendorId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHoardings(data || []);
    } catch (err) {
      console.error("Error fetching vendor hoardings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addHoarding = async (hoardingData) => {
    try {
      const { data, error } = await supabase
        .from("hoardings")
        .insert({
          ...hoardingData,
          vendor_id: vendorId,
        })
        .select()
        .single();

      if (error) throw error;
      setHoardings((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateHoarding = async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from("hoardings")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      setHoardings((prev) =>
        prev.map((h) => (h.id === id ? data : h))
      );
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteHoarding = async (id) => {
    try {
      const { error } = await supabase
        .from("hoardings")
        .delete()
        .eq("id", id);

      if (error) throw error;
      setHoardings((prev) => prev.filter((h) => h.id !== id));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    hoardings,
    isLoading,
    addHoarding,
    updateHoarding,
    deleteHoarding,
    refetch: fetchVendorHoardings,
  };
}
