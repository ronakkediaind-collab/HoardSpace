import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useVendorHoardings } from "../hooks/useHoardings";
import { useBookings } from "../hooks/useBookings";
import Navbar from "../components/common/Navbar";
import SummaryCard from "../components/dashboard/SummaryCard";
import HoardingForm from "../components/dashboard/HoardingForm";
import Modal from "../components/common/Modal";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import {
  Package,
  IndianRupee,
  Calendar,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

export default function VendorDashboard() {
  const { user, profile, isAuthenticated, isVendor } = useAuth();
  const { hoardings, isLoading, addHoarding, deleteHoarding } = useVendorHoardings(user?.id);
  const { bookings } = useBookings(user?.id, "vendor");
  const [showForm, setShowForm] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isVendor) return <Navigate to="/dashboard/agency" />;

  const handleAdd = async (data) => {
    const result = await addHoarding(data);
    if (result.success) {
      toast.success("Hoarding added successfully!");
      setShowForm(false);
    } else {
      toast.error(result.error || "Failed to add hoarding");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this hoarding?")) return;

    const result = await deleteHoarding(id);
    if (result.success) {
      toast.success("Hoarding deleted successfully");
    } else {
      toast.error(result.error || "Failed to delete hoarding");
    }
  };

  const activeBookings = bookings.filter(b => b.status === "active" || b.status === "confirmed");
  const totalRevenue = bookings
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
              title="Total Hoardings"
              value={hoardings.length}
              icon={Package}
              variant="primary"
            />
            <SummaryCard
              title="Active Bookings"
              value={activeBookings.length}
              icon={Calendar}
              variant="success"
            />
            <SummaryCard
              title="Total Revenue"
              value={`₹${(totalRevenue / 100000).toFixed(1)}L`}
              icon={IndianRupee}
              variant="warning"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-semibold">My Hoardings</h2>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : hoardings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/50">
                    <tr>
                      <th className="p-3 text-left">Title</th>
                      <th className="p-3 text-left">City</th>
                      <th className="p-3 text-left">Daily Rate</th>
                      <th className="p-3 text-left">Status</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoardings.map((h) => (
                      <tr key={h.id} className="border-t border-border hover:bg-secondary/30 transition-colors">
                        <td className="p-3 font-medium">{h.title}</td>
                        <td className="p-3">{h.city}</td>
                        <td className="p-3">₹{h.daily_rate.toLocaleString("en-IN")}</td>
                        <td className="p-3">
                          <Badge
                            variant={
                              h.status === "available" ? "success" : "warning"
                            }
                          >
                            {h.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDelete(h.id)}
                            className="p-2 hover:bg-destructive/10 rounded text-destructive transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-muted-foreground">No hoardings yet. Add your first hoarding!</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        title="Add New Hoarding"
        size="lg"
      >
        <HoardingForm
          onSubmit={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      </Modal>
    </div>
  );
}
