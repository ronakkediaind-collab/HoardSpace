import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import HoardingCard from "../components/hoarding/HoardingCard";
import HoardingFilters from "../components/hoarding/HoardingFilters";
import { useHoardings } from "../hooks/useHoardings";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "";
  const [filters, setFilters] = useState({
    city: initialCity,
    type: "",
    priceRange: "",
  });

  const filterParams = {
    city: filters.city,
    type: filters.type,
    ...(filters.priceRange && (() => {
      const [min, max] = filters.priceRange.split("-");
      return {
        minPrice: min === "30000+" ? 30000 : Number(min) || 0,
        maxPrice: max ? (max === "+" ? 999999 : Number(max)) : undefined,
      };
    })()),
  };

  const { hoardings, isLoading } = useHoardings(filterParams);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-display font-bold">
                Explore Hoardings
              </h1>
              <p className="text-muted-foreground mt-1">
                {isLoading ? "Loading..." : `${hoardings.length} hoardings found`}
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <HoardingFilters
              filters={filters}
              onFilterChange={(k, v) => setFilters((p) => ({ ...p, [k]: v }))}
              onClear={() => setFilters({ city: "", type: "", priceRange: "" })}
            />
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : hoardings.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                  {hoardings.map((h) => (
                    <HoardingCard key={h.id} hoarding={h} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-secondary/30 rounded-2xl">
                  <p className="text-xl font-medium text-muted-foreground mb-2">
                    No hoardings found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your filters or search in a different city
                  </p>
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
