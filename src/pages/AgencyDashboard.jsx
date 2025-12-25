import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/common/Navbar";
import SummaryCard from "../components/dashboard/SummaryCard";
import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import { Megaphone, Heart, IndianRupee } from "lucide-react";
import {
  hoardings,
  mockBookings,
  mockSavedHoardings,
  formatPrice,
} from "../data/dummyData";

export default function AgencyDashboard() {
  const { user, isAuthenticated, isAgency } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isAgency) return <Navigate to="/dashboard/vendor" />;

  const bookedHoardings = mockBookings.map((b) => ({
    ...b,
    hoarding: hoardings.find((h) => h.id === b.hoardingId),
  }));
  const savedHoardings = hoardings.filter((h) =>
    mockSavedHoardings.includes(h.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold mb-1">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted-foreground">Your advertising campaigns</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Active Campaigns", value: bookedHoardings.length, icon: Megaphone, variant: "primary" },
              { title: "Saved Hoardings", value: savedHoardings.length, icon: Heart, variant: "success" },
              { title: "Total Spent", value: "₹12.5L", icon: IndianRupee, variant: "warning" },
            ].map((item, idx) => (
              <div key={idx} style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}>
                <SummaryCard {...item} />
              </div>
            ))}
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-4">
              Active Bookings
            </h2>
            <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
              {bookedHoardings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-secondary/50 border-b border-border">
                      <tr>
                        <th className="p-4 text-left font-semibold">Hoarding</th>
                        <th className="p-4 text-left font-semibold">Duration</th>
                        <th className="p-4 text-left font-semibold">Amount</th>
                        <th className="p-4 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookedHoardings.map((b, idx) => (
                        <tr key={b.id} className="border-t border-border hover:bg-secondary/30 transition-all" style={{ animation: `slideIn 0.3s ease-out ${idx * 0.05}s both` }}>
                          <td className="p-4 font-medium">{b.hoarding?.title}</td>
                          <td className="p-4 text-muted-foreground">
                            {b.startDate} - {b.endDate}
                          </td>
                          <td className="p-4 font-semibold text-primary">{formatPrice(b.totalAmount)}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                b.status === "active" ? "success" : "default"
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
                  <p className="text-muted-foreground">No active bookings</p>
                  <Link to="/search">
                    <Button className="mt-4">Browse Hoardings</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold mb-4">
              Saved Hoardings
            </h2>
            {savedHoardings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {savedHoardings.map((h, idx) => (
                  <div key={h.id} className="bg-card border border-border rounded-xl p-4 hover:border-primary/30 hover:shadow-lg transition-all" style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.05}s both` }}>
                    <p className="font-semibold text-foreground mb-1">{h.title}</p>
                    <p className="text-sm text-muted-foreground mb-3">{h.city}</p>
                    <Link to={`/hoarding/${h.id}`}>
                      <Button size="sm" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-secondary/30 rounded-xl border border-border">
                <Heart className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No saved hoardings</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
