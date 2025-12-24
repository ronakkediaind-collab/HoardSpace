import { useState } from "react";
import { Filter, X } from "lucide-react";
import { cities, hoardingTypes } from "../../data/dummyData";
import Select from "../common/Select";
import Button from "../common/Button";

export default function HoardingFilters({ filters, onFilterChange, onClear }) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const cityOptions = cities.map((c) => ({
    value: c.name.toLowerCase(),
    label: c.name,
  }));

  const typeOptions = hoardingTypes.map((t) => ({
    value: t.id,
    label: `${t.icon} ${t.label}`,
  }));

  const priceOptions = [
    { value: "0-5000", label: "Under ₹5,000/day" },
    { value: "5000-15000", label: "₹5,000 - ₹15,000/day" },
    { value: "15000-30000", label: "₹15,000 - ₹30,000/day" },
    { value: "30000+", label: "Above ₹30,000/day" },
  ];

  const FilterContent = () => (
    <div className="space-y-4">
      <Select
        label="City"
        value={filters.city || ""}
        onChange={(e) => onFilterChange("city", e.target.value)}
        options={cityOptions}
        placeholder="All Cities"
      />

      <Select
        label="Type"
        value={filters.type || ""}
        onChange={(e) => onFilterChange("type", e.target.value)}
        options={typeOptions}
        placeholder="All Types"
      />

      <Select
        label="Price Range"
        value={filters.priceRange || ""}
        onChange={(e) => onFilterChange("priceRange", e.target.value)}
        options={priceOptions}
        placeholder="Any Price"
      />

      <Button variant="outline" onClick={onClear} className="w-full gap-2">
        <X className="w-4 h-4" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="bg-card border border-border rounded-xl p-4 sticky top-24">
          <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            Filters
          </h3>
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setShowMobileFilters(true)}
          className="gap-2 shadow-lg"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl p-4 animate-slide-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filters
              </h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterContent />
            <Button
              onClick={() => setShowMobileFilters(false)}
              className="w-full mt-4"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
