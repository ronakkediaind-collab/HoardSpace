/*
  # HoardSpace Core Database Schema
  
  ## Overview
  Complete database schema for HoardSpace - outdoor advertising marketplace platform
  
  ## New Tables
  
  ### 1. profiles
  Extended user profile information linked to auth.users
  - id (uuid, references auth.users)
  - role (text): 'vendor' or 'agency'
  - full_name (text)
  - company_name (text)
  - phone (text)
  - avatar_url (text)
  - rating (decimal)
  - total_reviews (integer)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 2. hoardings
  Billboard/advertising space listings
  - id (uuid, primary key)
  - vendor_id (uuid, references profiles)
  - title (text)
  - description (text)
  - city (text)
  - state (text)
  - location (text)
  - latitude (decimal)
  - longitude (decimal)
  - type (text): 'billboard', 'bus-shelter', 'digital-screen'
  - dimensions (text)
  - daily_rate (integer)
  - monthly_rate (integer)
  - traffic (text)
  - images (jsonb array)
  - features (text array)
  - status (text): 'available', 'booked', 'inactive'
  - views_count (integer)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 3. bookings
  Booking requests and confirmations
  - id (uuid, primary key)
  - hoarding_id (uuid, references hoardings)
  - agency_id (uuid, references profiles)
  - vendor_id (uuid, references profiles)
  - start_date (date)
  - end_date (date)
  - status (text): 'pending', 'confirmed', 'active', 'completed', 'cancelled'
  - total_amount (integer)
  - payment_status (text): 'pending', 'paid', 'refunded'
  - notes (text)
  - created_at (timestamptz)
  - updated_at (timestamptz)
  
  ### 4. reviews
  Reviews and ratings for vendors and hoardings
  - id (uuid, primary key)
  - hoarding_id (uuid, references hoardings)
  - vendor_id (uuid, references profiles)
  - reviewer_id (uuid, references profiles)
  - booking_id (uuid, references bookings)
  - rating (integer 1-5)
  - comment (text)
  - created_at (timestamptz)
  
  ### 5. messages
  Direct messaging between vendors and agencies
  - id (uuid, primary key)
  - sender_id (uuid, references profiles)
  - receiver_id (uuid, references profiles)
  - hoarding_id (uuid, optional reference)
  - booking_id (uuid, optional reference)
  - content (text)
  - is_read (boolean)
  - created_at (timestamptz)
  
  ### 6. favorites
  Saved/favorited hoardings
  - id (uuid, primary key)
  - user_id (uuid, references profiles)
  - hoarding_id (uuid, references hoardings)
  - created_at (timestamptz)
  
  ### 7. analytics
  Daily analytics for vendor hoardings
  - id (uuid, primary key)
  - hoarding_id (uuid, references hoardings)
  - date (date)
  - views (integer)
  - inquiries (integer)
  - bookings (integer)
  - revenue (integer)
  
  ## Security
  - RLS enabled on all tables
  - Users can only read/write their own data
  - Public read access for hoardings and reviews
  - Agencies can create bookings and reviews
  - Vendors can manage their hoardings and respond to bookings
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('vendor', 'agency')),
  full_name text NOT NULL,
  company_name text,
  phone text,
  avatar_url text,
  rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create hoardings table
CREATE TABLE IF NOT EXISTS hoardings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  city text NOT NULL,
  state text,
  location text NOT NULL,
  latitude decimal(10, 8),
  longitude decimal(11, 8),
  type text NOT NULL CHECK (type IN ('billboard', 'bus-shelter', 'digital-screen')),
  dimensions text NOT NULL,
  daily_rate integer NOT NULL CHECK (daily_rate > 0),
  monthly_rate integer NOT NULL CHECK (monthly_rate > 0),
  traffic text,
  images jsonb DEFAULT '[]'::jsonb,
  features text[] DEFAULT ARRAY[]::text[],
  status text DEFAULT 'available' CHECK (status IN ('available', 'booked', 'inactive')),
  views_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hoarding_id uuid NOT NULL REFERENCES hoardings(id) ON DELETE CASCADE,
  agency_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vendor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
  total_amount integer NOT NULL CHECK (total_amount > 0),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hoarding_id uuid NOT NULL REFERENCES hoardings(id) ON DELETE CASCADE,
  vendor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reviewer_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(booking_id, reviewer_id)
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hoarding_id uuid REFERENCES hoardings(id) ON DELETE SET NULL,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  hoarding_id uuid NOT NULL REFERENCES hoardings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, hoarding_id)
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hoarding_id uuid NOT NULL REFERENCES hoardings(id) ON DELETE CASCADE,
  date date NOT NULL DEFAULT CURRENT_DATE,
  views integer DEFAULT 0,
  inquiries integer DEFAULT 0,
  bookings integer DEFAULT 0,
  revenue integer DEFAULT 0,
  UNIQUE(hoarding_id, date)
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hoardings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Hoardings policies
CREATE POLICY "Anyone can view available hoardings"
  ON hoardings FOR SELECT
  USING (status = 'available' OR vendor_id = auth.uid());

CREATE POLICY "Vendors can insert own hoardings"
  ON hoardings FOR INSERT
  TO authenticated
  WITH CHECK (
    vendor_id = auth.uid() AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'vendor')
  );

CREATE POLICY "Vendors can update own hoardings"
  ON hoardings FOR UPDATE
  TO authenticated
  USING (vendor_id = auth.uid())
  WITH CHECK (vendor_id = auth.uid());

CREATE POLICY "Vendors can delete own hoardings"
  ON hoardings FOR DELETE
  TO authenticated
  USING (vendor_id = auth.uid());

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (agency_id = auth.uid() OR vendor_id = auth.uid());

CREATE POLICY "Agencies can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (
    agency_id = auth.uid() AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'agency')
  );

CREATE POLICY "Agencies can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (agency_id = auth.uid())
  WITH CHECK (agency_id = auth.uid());

CREATE POLICY "Vendors can update bookings for their hoardings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (vendor_id = auth.uid())
  WITH CHECK (vendor_id = auth.uid());

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Agencies can create reviews for completed bookings"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (
    reviewer_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM bookings 
      WHERE id = booking_id 
      AND agency_id = auth.uid() 
      AND status = 'completed'
    )
  );

-- Messages policies
CREATE POLICY "Users can view own messages"
  ON messages FOR SELECT
  TO authenticated
  USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can update messages they received"
  ON messages FOR UPDATE
  TO authenticated
  USING (receiver_id = auth.uid())
  WITH CHECK (receiver_id = auth.uid());

-- Favorites policies
CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Analytics policies
CREATE POLICY "Vendors can view own analytics"
  ON analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM hoardings 
      WHERE hoardings.id = analytics.hoarding_id 
      AND hoardings.vendor_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_hoardings_vendor ON hoardings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_hoardings_city ON hoardings(city);
CREATE INDEX IF NOT EXISTS idx_hoardings_type ON hoardings(type);
CREATE INDEX IF NOT EXISTS idx_hoardings_status ON hoardings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_agency ON bookings(agency_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX IF NOT EXISTS idx_bookings_hoarding ON bookings(hoarding_id);
CREATE INDEX IF NOT EXISTS idx_bookings_dates ON bookings(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_reviews_hoarding ON reviews(hoarding_id);
CREATE INDEX IF NOT EXISTS idx_reviews_vendor ON reviews(vendor_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_hoarding_date ON analytics(hoarding_id, date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
DROP TRIGGER IF EXISTS profiles_updated_at ON profiles;
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS hoardings_updated_at ON hoardings;
CREATE TRIGGER hoardings_updated_at
  BEFORE UPDATE ON hoardings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS bookings_updated_at ON bookings;
CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
