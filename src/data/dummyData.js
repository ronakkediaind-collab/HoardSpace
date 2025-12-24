export const cities = [
  {
    id: 1,
    name: "Mumbai",
    state: "Maharashtra",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=300&fit=crop",
    hoardingCount: 156,
  },
  {
    id: 2,
    name: "Delhi",
    state: "Delhi NCR",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    hoardingCount: 142,
  },
  {
    id: 3,
    name: "Bangalore",
    state: "Karnataka",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&h=300&fit=crop",
    hoardingCount: 98,
  },
  {
    id: 4,
    name: "Chennai",
    state: "Tamil Nadu",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=300&fit=crop",
    hoardingCount: 87,
  },
  {
    id: 5,
    name: "Hyderabad",
    state: "Telangana",
    image:
      "https://images.unsplash.com/photo-1572278116640-2e0c8c0e6c94?w=400&h=300&fit=crop",
    hoardingCount: 76,
  },
  {
    id: 6,
    name: "Pune",
    state: "Maharashtra",
    image:
      "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=400&h=300&fit=crop",
    hoardingCount: 64,
  },
  {
    id: 7,
    name: "Jaipur",
    state: "Rajasthan",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=300&fit=crop",
    hoardingCount: 52,
  },
  {
    id: 8,
    name: "Lucknow",
    state: "Uttar Pradesh",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
    hoardingCount: 41,
  },
];

export const hoardingTypes = [
  { id: "billboard", label: "Billboard", icon: "📋" },
  { id: "bus-shelter", label: "Bus Shelter", icon: "🚌" },
  { id: "digital-screen", label: "Digital Screen", icon: "📺" },
];

export const vendors = [
  {
    id: 1,
    name: "AdVision Media Pvt. Ltd.",
    email: "contact@advisionmedia.in",
    phone: "+91 98765 43210",
    rating: 4.8,
    totalHoardings: 24,
  },
  {
    id: 2,
    name: "Skyline Outdoor Ads",
    email: "info@skylineads.com",
    phone: "+91 87654 32109",
    rating: 4.6,
    totalHoardings: 18,
  },
  {
    id: 3,
    name: "Metro Billboard Solutions",
    email: "hello@metrobillboard.in",
    phone: "+91 76543 21098",
    rating: 4.9,
    totalHoardings: 32,
  },
];

export const hoardings = [
  {
    id: 1,
    title: "Premium Billboard - Marine Drive",
    city: "Mumbai",
    location: "Marine Drive, Near NCPA",
    type: "billboard",
    dimensions: "40ft x 20ft",
    dailyRate: 15000,
    monthlyRate: 350000,
    traffic: "50,000+ daily",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    vendorId: 1,
    status: "available",
    features: ["Lit 24/7", "High visibility", "Prime location"],
  },
  {
    id: 2,
    title: "Digital LED Screen - Connaught Place",
    city: "Delhi",
    location: "Connaught Place, Block A",
    type: "digital-screen",
    dimensions: "20ft x 15ft",
    dailyRate: 25000,
    monthlyRate: 600000,
    traffic: "75,000+ daily",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2uj98?w=600&h=400&fit=crop",
    vendorId: 2,
    status: "available",
    features: ["HD Display", "Video capable", "Day & night visibility"],
  },
  {
    id: 3,
    title: "Bus Shelter Ad - MG Road",
    city: "Bangalore",
    location: "MG Road, Near Trinity Metro",
    type: "bus-shelter",
    dimensions: "6ft x 4ft",
    dailyRate: 3000,
    monthlyRate: 75000,
    traffic: "30,000+ daily",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
    vendorId: 3,
    status: "available",
    features: ["Eye-level visibility", "Backlit", "Waiting area"],
  },
  {
    id: 4,
    title: "Highway Billboard - Expressway",
    city: "Pune",
    location: "Mumbai-Pune Expressway, KM 45",
    type: "billboard",
    dimensions: "60ft x 30ft",
    dailyRate: 20000,
    monthlyRate: 450000,
    traffic: "100,000+ daily",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    vendorId: 1,
    status: "booked",
    features: ["Unipole", "Highway facing", "Visible from 500m"],
  },
  {
    id: 5,
    title: "Digital Billboard - Anna Nagar",
    city: "Chennai",
    location: "Anna Nagar, 2nd Avenue",
    type: "digital-screen",
    dimensions: "25ft x 15ft",
    dailyRate: 18000,
    monthlyRate: 420000,
    traffic: "45,000+ daily",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2uj98?w=600&h=400&fit=crop",
    vendorId: 2,
    status: "available",
    features: ["4K Display", "Rotating ads", "Weather proof"],
  },
  {
    id: 6,
    title: "Bus Shelter - Hitech City",
    city: "Hyderabad",
    location: "Hitech City Main Road",
    type: "bus-shelter",
    dimensions: "8ft x 4ft",
    dailyRate: 4500,
    monthlyRate: 100000,
    traffic: "55,000+ daily",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
    vendorId: 3,
    status: "available",
    features: ["IT corridor", "Young demographic", "Premium location"],
  },
  {
    id: 7,
    title: "Gantry Billboard - JLN Marg",
    city: "Jaipur",
    location: "JLN Marg, Near Birla Temple",
    type: "billboard",
    dimensions: "50ft x 25ft",
    dailyRate: 12000,
    monthlyRate: 280000,
    traffic: "40,000+ daily",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    vendorId: 1,
    status: "available",
    features: ["Tourist area", "Both sides visible", "Heritage zone"],
  },
  {
    id: 8,
    title: "LED Screen - Hazratganj",
    city: "Lucknow",
    location: "Hazratganj, Main Market",
    type: "digital-screen",
    dimensions: "15ft x 10ft",
    dailyRate: 10000,
    monthlyRate: 220000,
    traffic: "35,000+ daily",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2uj98?w=600&h=400&fit=crop",
    vendorId: 2,
    status: "available",
    features: ["Shopping district", "Animated content", "Prime footfall"],
  },
  {
    id: 9,
    title: "Unipole - Bandra Worli Sea Link",
    city: "Mumbai",
    location: "Near Bandra Toll Plaza",
    type: "billboard",
    dimensions: "80ft x 40ft",
    dailyRate: 35000,
    monthlyRate: 800000,
    traffic: "150,000+ daily",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    vendorId: 3,
    status: "available",
    features: ["Landmark location", "Iconic views", "Premium pricing"],
  },
  {
    id: 10,
    title: "Metro Station Display - Rajiv Chowk",
    city: "Delhi",
    location: "Rajiv Chowk Metro Station",
    type: "digital-screen",
    dimensions: "12ft x 8ft",
    dailyRate: 22000,
    monthlyRate: 500000,
    traffic: "200,000+ daily",
    image:
      "https://images.unsplash.com/photo-1568702846914-96b305d2uj98?w=600&h=400&fit=crop",
    vendorId: 1,
    status: "booked",
    features: ["Highest footfall", "Central Delhi", "Multiple screens"],
  },
  {
    id: 11,
    title: "Bus Shelter - Koramangala",
    city: "Bangalore",
    location: "Koramangala 5th Block",
    type: "bus-shelter",
    dimensions: "6ft x 4ft",
    dailyRate: 5000,
    monthlyRate: 110000,
    traffic: "40,000+ daily",
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
    vendorId: 2,
    status: "available",
    features: ["Startup hub", "Young crowd", "Food street nearby"],
  },
  {
    id: 12,
    title: "Billboard - FC Road",
    city: "Pune",
    location: "Fergusson College Road",
    type: "billboard",
    dimensions: "30ft x 15ft",
    dailyRate: 8000,
    monthlyRate: 180000,
    traffic: "35,000+ daily",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
    vendorId: 3,
    status: "available",
    features: ["College crowd", "Café strip", "High engagement"],
  },
];

export const mockBookings = [
  {
    id: 1,
    hoardingId: 1,
    agencyId: 1,
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    status: "active",
    totalAmount: 350000,
  },
  {
    id: 2,
    hoardingId: 4,
    agencyId: 1,
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    status: "active",
    totalAmount: 900000,
  },
  {
    id: 3,
    hoardingId: 10,
    agencyId: 2,
    startDate: "2024-02-10",
    endDate: "2024-02-20",
    status: "completed",
    totalAmount: 220000,
  },
];

export const mockSavedHoardings = [2, 5, 9];

export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const getVendorById = (id) => vendors.find((v) => v.id === id);

export const getHoardingById = (id) => hoardings.find((h) => h.id === id);

export const getHoardingsByCity = (city) =>
  hoardings.filter((h) => h.city.toLowerCase() === city.toLowerCase());

export const getHoardingsByType = (type) =>
  hoardings.filter((h) => h.type === type);

export const filterHoardings = ({ city, type, minPrice, maxPrice }) => {
  return hoardings.filter((h) => {
    if (city && h.city.toLowerCase() !== city.toLowerCase()) return false;
    if (type && h.type !== type) return false;
    if (minPrice && h.dailyRate < minPrice) return false;
    if (maxPrice && h.dailyRate > maxPrice) return false;
    return true;
  });
};
