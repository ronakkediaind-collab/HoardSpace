import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MapPin,
  Maximize,
  Eye,
  IndianRupee,
  Phone,
  Mail,
  Star,
  Heart,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import {
  getHoardingById,
  getVendorById,
  hoardingTypes,
  formatPrice,
} from "../data/dummyData";

export default function HoardingDetails() {
  const { id } = useParams();
  const hoarding = getHoardingById(Number(id));
  const vendor = hoarding ? getVendorById(hoarding.vendorId) : null;
  const typeInfo = hoardingTypes.find((t) => t.id === hoarding?.type);

  if (!hoarding)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Hoarding not found
      </div>
    );

  const handleBook = () =>
    toast.success("Booking request sent! Vendor will contact you shortly.");
  const handleSave = () => toast.success("Hoarding saved to your list!");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <img
                src={hoarding.image}
                alt={hoarding.title}
                className="w-full aspect-video object-cover rounded-2xl"
              />
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
                    {hoarding.traffic}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Features</p>
                  <p className="font-semibold">
                    {hoarding.features?.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
                <h2 className="font-display font-semibold text-lg">Pricing</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Daily Rate</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(hoarding.dailyRate)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg">
                    <span className="text-muted-foreground">Monthly Rate</span>
                    <span className="text-xl font-bold">
                      {formatPrice(hoarding.monthlyRate)}
                    </span>
                  </div>
                </div>
                <Button onClick={handleBook} className="w-full">
                  Book Now
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Save
                </Button>
              </div>
              {vendor && (
                <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
                  <h2 className="font-display font-semibold text-lg">
                    Vendor Info
                  </h2>
                  <p className="font-medium">{vendor.name}</p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-warning" />
                    {vendor.rating} rating
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    {vendor.email}
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    {vendor.phone}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
