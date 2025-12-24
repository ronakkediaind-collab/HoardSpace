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
          <h1 className="text-2xl font-display font-bold mb-6">
            Welcome, {user?.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SummaryCard
              title="Active Campaigns"
              value={bookedHoardings.length}
              icon={Megaphone}
              variant="primary"
            />
            <SummaryCard
              title="Saved Hoardings"
              value={savedHoardings.length}
              icon={Heart}
              variant="success"
            />
            <SummaryCard
              title="Total Spent"
              value="₹12.5L"
              icon={IndianRupee}
              variant="warning"
            />
          </div>
          <div className="mb-8">
            <h2 className="text-xl font-display font-semibold mb-4">
              Active Bookings
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="p-3 text-left">Hoarding</th>
                    <th className="p-3 text-left">Duration</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookedHoardings.map((b) => (
                    <tr key={b.id} className="border-t border-border">
                      <td className="p-3 font-medium">{b.hoarding?.title}</td>
                      <td className="p-3">
                        {b.startDate} - {b.endDate}
                      </td>
                      <td className="p-3">{formatPrice(b.totalAmount)}</td>
                      <td className="p-3">
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
          </div>
          <div>
            <h2 className="text-xl font-display font-semibold mb-4">
              Saved Hoardings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedHoardings.map((h) => (
                <div
                  key={h.id}
                  className="bg-card border border-border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{h.title}</p>
                    <p className="text-sm text-muted-foreground">{h.city}</p>
                  </div>
                  <Link to={`/hoarding/${h.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
