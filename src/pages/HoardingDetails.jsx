import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MapPin,
  Maximize,
  Eye,
  IndianRupee,
  Phone,
  Star,
  Heart,
  Loader2,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import BookingModal from "../components/booking/BookingModal";
import { useHoarding } from "../hooks/useHoardings";
import { useFavorites } from "../hooks/useBookings";
import { useAuth } from "../context/AuthContext";
import { hoardingTypes } from "../data/dummyData";

export default function HoardingDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { hoarding, isLoading } = useHoarding(id);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites(user?.id);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const typeInfo = hoardingTypes.find((t) => t.id === hoarding?.type);
  const imageUrl = hoarding?.images?.[0] || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop";
  const isHoardingFavorite = isFavorite(hoarding?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!hoarding) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Hoarding not found</h2>
            <Link to="/search" className="text-primary hover:underline">
              Browse all hoardings
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) {
      toast.error("Please login to save hoardings");
      return;
    }

    setIsSaving(true);
    const result = isHoardingFavorite
      ? await removeFavorite(hoarding.id)
      : await addFavorite(hoarding.id);
    setIsSaving(false);

    if (result.success) {
      toast.success(
        isHoardingFavorite ? "Removed from favorites" : "Added to favorites"
      );
    } else {
      toast.error(result.error || "Failed to update favorites");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={hoarding.title}
                  className="w-full aspect-video object-cover rounded-2xl"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=500&fit=crop";
                  }}
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all ${
                      isHoardingFavorite
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/80 hover:bg-background"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isHoardingFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge
                    variant={
                      hoarding.status === "available" ? "success" : "warning"
                    }
                  >
                    {hoarding.status}
                  </Badge>
                  <Badge variant="primary">
                    {typeInfo?.icon} {typeInfo?.label}
                  </Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-display font-bold mb-2">
                  {hoarding.title}
                </h1>
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  {hoarding.location}, {hoarding.city}
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-secondary/50 rounded-xl">
                <div>
                  <p className="text-xs text-muted-foreground">Dimensions</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Maximize className="w-4 h-4" />
                    {hoarding.dimensions}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Daily Traffic</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {hoarding.traffic || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {hoarding.views_count || 0}
                  </p>
                </div>
              </div>
              {hoarding.features?.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-semibold mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {hoarding.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {hoarding.description && (
                <div className="bg-card border border-border rounded-xl p-4">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{hoarding.description}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h2 className="font-display font-semibold text-lg">Pricing</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Daily Rate</span>
                    <span className="text-xl font-bold text-primary flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {hoarding.daily_rate.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Monthly Rate</span>
                    <span className="text-xl font-bold flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {hoarding.monthly_rate.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
                {user && (
                  <Button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                )}
                {!user && (
                  <Link to="/login">
                    <Button className="w-full">Login to Book</Button>
                  </Link>
                )}
              </div>
              {hoarding.vendor && (
                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                  <h2 className="font-display font-semibold text-lg">
                    Vendor Info
                  </h2>
                  <p className="font-medium">
                    {hoarding.vendor.company_name || hoarding.vendor.full_name}
                  </p>
                  {hoarding.vendor.rating > 0 && (
                    <p className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="font-medium">{hoarding.vendor.rating.toFixed(1)}</span>
                      <span className="text-muted-foreground">
                        ({hoarding.vendor.total_reviews || 0} reviews)
                      </span>
                    </p>
                  )}
                  {hoarding.vendor.phone && (
                    <p className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-primary" />
                      {hoarding.vendor.phone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {hoarding && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
          hoarding={hoarding}
        />
      )}
    </div>
  );
}
