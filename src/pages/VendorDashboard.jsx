import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
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
} from "lucide-react";
import { hoardings as initialHoardings, formatPrice } from "../data/dummyData";

export default function VendorDashboard() {
  const { user, isAuthenticated, isVendor } = useAuth();
  const [myHoardings, setMyHoardings] = useState(initialHoardings.slice(0, 4));
  const [showForm, setShowForm] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!isVendor) return <Navigate to="/dashboard/agency" />;

  const handleAdd = (data) => {
    setMyHoardings((p) => [
      ...p,
      {
        ...data,
        id: Date.now(),
        status: "available",
        vendorId: 1,
        features: [],
      },
    ]);
    toast.success("Hoarding added!");
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setMyHoardings((p) => p.filter((h) => h.id !== id));
    toast.success("Hoarding deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-display font-bold mb-1">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted-foreground">Manage your hoarding listings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { title: "Total Hoardings", value: myHoardings.length, icon: Package, variant: "primary" },
              { title: "Active Bookings", value: "3", icon: Calendar, variant: "success" },
              { title: "Revenue", value: "₹4.2L", icon: IndianRupee, variant: "warning", trend: "+12%" },
            ].map((item, idx) => (
              <div key={idx} style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}>
                <SummaryCard {...item} />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-display font-semibold">My Hoardings</h2>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/20 transition-colors">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 border-b border-border">
                  <tr>
                    <th className="p-4 text-left font-semibold">Title</th>
                    <th className="p-4 text-left font-semibold">City</th>
                    <th className="p-4 text-left font-semibold">Daily Rate</th>
                    <th className="p-4 text-left font-semibold">Status</th>
                    <th className="p-4 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myHoardings.map((h, idx) => (
                    <tr key={h.id} className="border-t border-border hover:bg-secondary/30 transition-all" style={{ animation: `slideIn 0.3s ease-out ${idx * 0.05}s both` }}>
                      <td className="p-4 font-medium text-foreground">{h.title}</td>
                      <td className="p-4 text-muted-foreground">{h.city}</td>
                      <td className="p-4 font-semibold text-primary">{formatPrice(h.dailyRate)}</td>
                      <td className="p-4">
                        <Badge
                          variant={h.status === "available" ? "success" : "warning"}
                        >
                          {h.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDelete(h.id)}
                          className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-all hover:scale-110"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
