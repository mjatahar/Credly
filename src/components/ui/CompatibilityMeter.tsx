import { cn } from "@/lib/utils";

interface CompatibilityMeterProps {
  label: string;
  score: number;
  maxScore?: number;
  className?: string;
}

export function CompatibilityMeter({
  label,
  score,
  maxScore = 100,
  className,
}: CompatibilityMeterProps) {
  const percentage = (score / maxScore) * 100;

  const getColor = (pct: number) => {
    if (pct >= 75) return "bg-trust-high";
    if (pct >= 50) return "bg-trust-medium";
    return "bg-trust-low";
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{score}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-out", getColor(percentage))}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
