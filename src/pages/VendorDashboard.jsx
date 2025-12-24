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
  Edit,
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
          <h1 className="text-2xl font-display font-bold mb-6">
            Welcome, {user?.name}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <SummaryCard
              title="Total Hoardings"
              value={myHoardings.length}
              icon={Package}
              variant="primary"
            />
            <SummaryCard
              title="Active Bookings"
              value="3"
              icon={Calendar}
              variant="success"
            />
            <SummaryCard
              title="Revenue"
              value="₹4.2L"
              icon={IndianRupee}
              variant="warning"
              trend="+12%"
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
                  {myHoardings.map((h) => (
                    <tr key={h.id} className="border-t border-border">
                      <td className="p-3 font-medium">{h.title}</td>
                      <td className="p-3">{h.city}</td>
                      <td className="p-3">{formatPrice(h.dailyRate)}</td>
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
                          className="p-2 hover:bg-destructive/10 rounded text-destructive"
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
