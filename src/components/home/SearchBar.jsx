import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, MapPin } from "lucide-react";
import { cities } from "../../data/dummyData";
import Button from "../common/Button";
import Select from "../common/Select";

export default function SearchBar() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const cityOptions = cities.map((c) => ({
    value: c.name.toLowerCase(),
    label: c.name,
  }));

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl mx-auto bg-card border border-border rounded-2xl p-4 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* City Select */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">City</span>
          </div>
          <Select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            options={cityOptions}
            placeholder="Select city"
          />
        </div>

        {/* Start Date */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Start Date</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* End Date */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">End Date</span>
          </div>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Search Button */}
        <div className="md:col-span-1 flex items-end">
          <Button type="submit" className="w-full gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
