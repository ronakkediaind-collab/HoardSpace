/*
  # Add Database Functions and Additional Features
  
  ## New Functions
  1. increment_hoarding_views - Increment view count for analytics
  2. calculate_booking_amount - Calculate booking amount based on dates
  3. update_vendor_rating - Update vendor rating after review
  
  ## Additional Improvements
  - Add function to track daily analytics
  - Add trigger to update vendor ratings
*/

-- Function to increment hoarding views
CREATE OR REPLACE FUNCTION increment_hoarding_views(hoarding_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE hoardings
  SET views_count = views_count + 1
  WHERE id = hoarding_id;
  
  INSERT INTO analytics (hoarding_id, date, views)
  VALUES (hoarding_id, CURRENT_DATE, 1)
  ON CONFLICT (hoarding_id, date)
  DO UPDATE SET views = analytics.views + 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate booking amount
CREATE OR REPLACE FUNCTION calculate_booking_amount(
  p_daily_rate integer,
  p_start_date date,
  p_end_date date
)
RETURNS integer AS $$
DECLARE
  days_count integer;
BEGIN
  days_count := p_end_date - p_start_date + 1;
  RETURN p_daily_rate * days_count;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Function to update vendor ratings
CREATE OR REPLACE FUNCTION update_vendor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0)
      FROM reviews
      WHERE vendor_id = NEW.vendor_id
    ),
    total_reviews = (
      SELECT COUNT(*)
      FROM reviews
      WHERE vendor_id = NEW.vendor_id
    )
  WHERE id = NEW.vendor_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update vendor rating after review insert
DROP TRIGGER IF EXISTS update_rating_on_review ON reviews;
CREATE TRIGGER update_rating_on_review
  AFTER INSERT ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_vendor_rating();

-- Function to check booking conflicts
CREATE OR REPLACE FUNCTION check_booking_conflict(
  p_hoarding_id uuid,
  p_start_date date,
  p_end_date date,
  p_exclude_booking_id uuid DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM bookings
    WHERE hoarding_id = p_hoarding_id
      AND status IN ('confirmed', 'active')
      AND (p_exclude_booking_id IS NULL OR id != p_exclude_booking_id)
      AND (
        (start_date <= p_end_date AND end_date >= p_start_date)
      )
  );
END;
$$ LANGUAGE plpgsql;

-- Add search function with text search
CREATE OR REPLACE FUNCTION search_hoardings(search_term text)
RETURNS TABLE (
  id uuid,
  title text,
  city text,
  location text,
  daily_rate integer,
  similarity real
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    h.id,
    h.title,
    h.city,
    h.location,
    h.daily_rate,
    GREATEST(
      similarity(h.title, search_term),
      similarity(h.city, search_term),
      similarity(h.location, search_term)
    ) as similarity
  FROM hoardings h
  WHERE h.status = 'available'
    AND (
      h.title ILIKE '%' || search_term || '%'
      OR h.city ILIKE '%' || search_term || '%'
      OR h.location ILIKE '%' || search_term || '%'
    )
  ORDER BY similarity DESC, h.created_at DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Enable pg_trgm extension for similarity search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
