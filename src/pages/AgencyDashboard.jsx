import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBookings, useFavorites } from "../hooks/useBookings";
import Navbar from "../components/common/Navbar";
import SummaryCard from "../components/dashboard/SummaryCard";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import { Megaphone, Heart, IndianRupee, Loader2 } from "lucide-react";

export default function AgencyDashboard() {
  const { user, profile, isAuthenticated, isAgency } = useAuth();
  const { bookings, isLoading: bookingsLoading } = useBookings(user?.id, "agency");
  const { favorites, isLoading: favoritesLoading } = useFavorites(user?.id);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAgency) return <Navigate to="/dashboard/vendor" />;

  const activeBookings = bookings.filter(b => b.status === "active" || b.status === "confirmed");
  const totalSpent = bookings
    .filter(b => b.payment_status === "paid")
    .reduce((sum, b) => sum + b.total_amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-2xl font-display font-bold mb-6">
            Welcome, {profile?.full_name || profile?.company_name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in">
            <SummaryCard
              title="Active Campaigns"
              value={activeBookings.length}
              icon={Megaphone}
              variant="primary"
            />
            <SummaryCard
              title="Saved Hoardings"
              value={favorites.length}
              icon={Heart}
              variant="success"
            />
            <SummaryCard
              title="Total Spent"
              value={`₹${(totalSpent / 100000).toFixed(1)}L`}
              icon={IndianRupee}
              variant="warning"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-4">
              Active Bookings
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              {bookingsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="p-3 text-left">Hoarding</th>
                        <th className="p-3 text-left">Location</th>
                        <th className="p-3 text-left">Duration</th>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-3 font-medium">{b.hoarding?.title}</td>
                          <td className="p-3 text-muted-foreground">{b.hoarding?.city}</td>
                          <td className="p-3">
                            {new Date(b.start_date).toLocaleDateString()} - {new Date(b.end_date).toLocaleDateString()}
                          </td>
                          <td className="p-3">₹{b.total_amount.toLocaleString("en-IN")}</td>
                          <td className="p-3">
                            <Badge
                              variant={
                                b.status === "active" || b.status === "confirmed" ? "success" : b.status === "pending" ? "warning" : "default"
                              }
                            >
                              {b.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Megaphone className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">No bookings yet. Browse hoardings to get started!</p>
                  <Link to="/search">
                    <Button className="mt-4">Explore Hoardings</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold mb-4">
              Saved Hoardings
            </h2>
            {favoritesLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : favorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favorites.map((fav) => (
                  <div
                    key={fav.id}
                    className="bg-card border border-border rounded-xl p-4 flex justify-between items-center hover:border-primary/30 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{fav.hoarding?.title}</p>
                      <p className="text-sm text-muted-foreground">{fav.hoarding?.city}</p>
                    </div>
                    <Link to={`/hoarding/${fav.hoarding_id}`}>
                      <Button size="sm">View</Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/30 rounded-xl">
                <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No saved hoardings yet</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
