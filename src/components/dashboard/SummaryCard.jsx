import { TrendingUp, Package, IndianRupee, Calendar } from "lucide-react";
import Card from "../common/Card";

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  trend,
  variant = "default",
}) {
  const variants = {
    default: "text-foreground",
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
  };

  const iconBgVariants = {
    default: "bg-secondary",
    primary: "bg-primary/10",
    success: "bg-success/10",
    warning: "bg-warning/10",
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className={`text-2xl font-display font-bold ${variants[variant]}`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-1 text-success text-sm">
              <TrendingUp className="w-3 h-3" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBgVariants[variant]}`}>
          <Icon className={`w-5 h-5 ${variants[variant]}`} />
        </div>
      </div>
    </Card>
  );
}
