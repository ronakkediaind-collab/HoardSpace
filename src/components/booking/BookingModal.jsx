import { useState } from "react";
import { toast } from "react-toastify";
import { Calendar, IndianRupee, AlertCircle } from "lucide-react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";
import { useBookings } from "../../hooks/useBookings";

export default function BookingModal({ isOpen, onClose, hoarding }) {
  const { user, profile } = useAuth();
  const { createBooking } = useBookings(user?.id, profile?.role);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const calculateAmount = () => {
    const days = calculateDays();
    return days * hoarding.daily_rate;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date must be after start date");
      return;
    }

    setIsLoading(true);

    const bookingData = {
      hoarding_id: hoarding.id,
      vendor_id: hoarding.vendor_id,
      agency_id: user.id,
      start_date: formData.startDate,
      end_date: formData.endDate,
      total_amount: calculateAmount(),
      notes: formData.notes,
      status: "pending",
      payment_status: "pending",
    };

    const result = await createBooking(bookingData);
    setIsLoading(false);

    if (result.success) {
      toast.success("Booking request sent successfully!");
      onClose();
      setFormData({ startDate: "", endDate: "", notes: "" });
    } else {
      toast.error(result.error || "Failed to create booking");
    }
  };

  if (!hoarding) return null;

  const days = calculateDays();
  const totalAmount = calculateAmount();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book Hoarding" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-secondary/50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">{hoarding.title}</h3>
          <p className="text-sm text-muted-foreground">
            {hoarding.location}, {hoarding.city}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Daily Rate:</span>
            <span className="font-semibold flex items-center text-primary">
              <IndianRupee className="w-4 h-4" />
              {hoarding.daily_rate.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              <Calendar className="w-4 h-4 inline mr-1" />
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              <Calendar className="w-4 h-4 inline mr-1" />
              End Date
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              min={formData.startDate || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>

        <Input
          label="Additional Notes (Optional)"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any special requirements or questions..."
        />

        {days > 0 && (
          <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Duration</span>
              <span className="font-semibold">
                {days} {days === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Amount</span>
              <span className="text-xl font-bold text-primary flex items-center">
                <IndianRupee className="w-5 h-5" />
                {totalAmount.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-start gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>
            Your booking request will be sent to the vendor for approval. You'll
            be notified once the vendor responds.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={isLoading}>
            {isLoading ? "Sending Request..." : "Send Booking Request"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
