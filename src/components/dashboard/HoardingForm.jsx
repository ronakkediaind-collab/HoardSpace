import { useState } from "react";
import { cities, hoardingTypes } from "../../data/dummyData";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";

export default function HoardingForm({
  onSubmit,
  onCancel,
  initialData = null,
}) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    city: initialData?.city?.toLowerCase() || "",
    location: initialData?.location || "",
    type: initialData?.type || "",
    dimensions: initialData?.dimensions || "",
    dailyRate: initialData?.dailyRate || "",
    monthlyRate: initialData?.monthlyRate || "",
    traffic: initialData?.traffic || "",
    image: initialData?.image || "",
  });

  const [errors, setErrors] = useState({});

  const cityOptions = cities.map((c) => ({
    value: c.name.toLowerCase(),
    label: c.name,
  }));

  const typeOptions = hoardingTypes.map((t) => ({
    value: t.id,
    label: `${t.icon} ${t.label}`,
  }));

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.dimensions.trim())
      newErrors.dimensions = "Dimensions are required";
    if (!formData.dailyRate) newErrors.dailyRate = "Daily rate is required";
    if (!formData.monthlyRate)
      newErrors.monthlyRate = "Monthly rate is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        dailyRate: Number(formData.dailyRate),
        monthlyRate: Number(formData.monthlyRate),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Hoarding Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        placeholder="e.g., Premium Billboard - Marine Drive"
        error={errors.title}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="City"
          value={formData.city}
          onChange={(e) => handleChange("city", e.target.value)}
          options={cityOptions}
          placeholder="Select city"
          error={errors.city}
        />

        <Select
          label="Type"
          value={formData.type}
          onChange={(e) => handleChange("type", e.target.value)}
          options={typeOptions}
          placeholder="Select type"
          error={errors.type}
        />
      </div>

      <Input
        label="Location"
        value={formData.location}
        onChange={(e) => handleChange("location", e.target.value)}
        placeholder="e.g., Marine Drive, Near NCPA"
        error={errors.location}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Dimensions"
          value={formData.dimensions}
          onChange={(e) => handleChange("dimensions", e.target.value)}
          placeholder="e.g., 40ft x 20ft"
          error={errors.dimensions}
        />

        <Input
          label="Daily Traffic"
          value={formData.traffic}
          onChange={(e) => handleChange("traffic", e.target.value)}
          placeholder="e.g., 50,000+ daily"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Daily Rate (₹)"
          type="number"
          value={formData.dailyRate}
          onChange={(e) => handleChange("dailyRate", e.target.value)}
          placeholder="15000"
          error={errors.dailyRate}
        />

        <Input
          label="Monthly Rate (₹)"
          type="number"
          value={formData.monthlyRate}
          onChange={(e) => handleChange("monthlyRate", e.target.value)}
          placeholder="350000"
          error={errors.monthlyRate}
        />
      </div>

      <Input
        label="Image URL"
        value={formData.image}
        onChange={(e) => handleChange("image", e.target.value)}
        placeholder="https://..."
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {initialData ? "Update Hoarding" : "Add Hoarding"}
        </Button>
      </div>
    </form>
  );
}
