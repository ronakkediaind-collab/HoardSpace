import { Link } from "react-router-dom";
import { MapPin, Maximize, IndianRupee, Eye } from "lucide-react";
import Card from "../common/Card";
import Badge from "../common/Badge";
import Button from "../common/Button";
import { formatPrice, hoardingTypes } from "../../data/dummyData";

export default function HoardingCard({ hoarding }) {
  const typeInfo = hoardingTypes.find((t) => t.id === hoarding.type);

  return (
    <Card hover className="group">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={hoarding.image}
          alt={hoarding.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={hoarding.status === "available" ? "success" : "warning"}
          >
            {hoarding.status === "available" ? "Available" : "Booked"}
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="primary">
            {typeInfo?.icon} {typeInfo?.label}
          </Badge>
        </div>
      </div>

      <Card.Body className="space-y-3">
        {/* Title */}
        <h3 className="font-display font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {hoarding.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="line-clamp-1">{hoarding.location}</span>
        </div>

        {/* Details */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Maximize className="w-4 h-4" />
            <span>{hoarding.dimensions}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{hoarding.traffic}</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Daily Rate</p>
              <p className="font-semibold text-primary flex items-center">
                <IndianRupee className="w-3.5 h-3.5" />
                {hoarding.dailyRate.toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Monthly Rate</p>
              <p className="font-semibold flex items-center">
                <IndianRupee className="w-3.5 h-3.5" />
                {hoarding.monthlyRate.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <Link to={`/hoarding/${hoarding.id}`}>
          <Button variant="secondary" className="w-full mt-2">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
