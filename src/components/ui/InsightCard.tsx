import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InsightCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  variant?: "default" | "positive" | "warning" | "neutral";
  className?: string;
}

export function InsightCard({
  title,
  description,
  icon: Icon,
  variant = "default",
  className,
}: InsightCardProps) {
  const variantStyles = {
    default: "border-border/60",
    positive: "border-trust-high/20 bg-trust-high/5",
    warning: "border-trust-low/20 bg-trust-low/5",
    neutral: "border-border bg-muted/30",
  };

  const iconStyles = {
    default: "text-muted-foreground bg-secondary",
    positive: "text-trust-high bg-trust-high/10",
    warning: "text-trust-low bg-trust-low/10",
    neutral: "text-muted-foreground bg-muted",
  };

  return (
    <div
      className={cn(
        "insight-card flex gap-4",
        variantStyles[variant],
        className
      )}
    >
      {Icon && (
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            iconStyles[variant]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="min-w-0">
        <h4 className="font-medium text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
