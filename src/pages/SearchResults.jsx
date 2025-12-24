import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HoardingCard from "../components/hoarding/HoardingCard";
import HoardingFilters from "../components/hoarding/HoardingFilters";
import { hoardings } from "../data/dummyData";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";
  const [filters, setFilters] = useState({
    city: initialCity,
    type: "",
    priceRange: "",
  });

  const filtered = useMemo(() => {
    return hoardings.filter((h) => {
      if (filters.city && h.city.toLowerCase() !== filters.city) return false;
      if (filters.type && h.type !== filters.type) return false;
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
          .split("-")
          .map((v) => (v === "30000+" ? Infinity : Number(v)));
        if (h.dailyRate < (min || 0) || (max !== Infinity && h.dailyRate > max))
          return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-display font-bold mb-6">
            Explore Hoardings
          </h1>
          <div className="flex gap-6">
            <HoardingFilters
              filters={filters}
              onFilterChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
              onClear={() => setFilters({ city: "", type: "", priceRange: "" })}
            />
            <div className="flex-1">
              {filtered.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filtered.map((h) => (
                    <HoardingCard key={h.id} hoarding={h} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-muted-foreground">
                  No hoardings found. Try adjusting filters.
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
