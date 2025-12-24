import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function CityCard({ city }) {
  return (
    <Link
      to={`/search?city=${city.name.toLowerCase()}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-muted">
        <img
          src={city.image}
          alt={city.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-display font-bold text-foreground mb-1">
            {city.name}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>{city.state}</span>
          </div>
          <p className="mt-2 text-primary font-medium text-sm">
            {city.hoardingCount}+ Hoardings
          </p>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
}
