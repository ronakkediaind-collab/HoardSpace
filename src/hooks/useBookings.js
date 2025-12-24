import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export function useBookings(userId, role) {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId, role]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const filterField = role === "vendor" ? "vendor_id" : "agency_id";

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          hoarding:hoardings(id, title, city, location, images),
          agency:profiles!agency_id(full_name, company_name, phone),
          vendor:profiles!vendor_id(full_name, company_name, phone)
        `)
        .eq(filterField, userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert(bookingData)
        .select(`
          *,
          hoarding:hoardings(id, title, city, location),
          agency:profiles!agency_id(full_name, company_name),
          vendor:profiles!vendor_id(full_name, company_name)
        `)
        .single();

      if (error) throw error;
      setBookings((prev) => [data, ...prev]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", bookingId)
        .select()
        .single();

      if (error) throw error;
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, ...data } : b))
      );
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    bookings,
    isLoading,
    createBooking,
    updateBookingStatus,
    refetch: fetchBookings,
  };
}

export function useFavorites(userId) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          *,
          hoarding:hoardings(*)
        `)
        .eq("user_id", userId);

      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const addFavorite = async (hoardingId) => {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .insert({ user_id: userId, hoarding_id: hoardingId })
        .select(`
          *,
          hoarding:hoardings(*)
        `)
        .single();

      if (error) throw error;
      setFavorites((prev) => [...prev, data]);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const removeFavorite = async (hoardingId) => {
    try {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("hoarding_id", hoardingId);

      if (error) throw error;
      setFavorites((prev) =>
        prev.filter((f) => f.hoarding_id !== hoardingId)
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const isFavorite = (hoardingId) => {
    return favorites.some((f) => f.hoarding_id === hoardingId);
  };

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
