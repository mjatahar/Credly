import { cn } from "@/lib/utils";

interface TrustScoreProps {
  score: number;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  animated?: boolean;
}

export function TrustScore({ score, size = "md", showLabel = true, animated = true }: TrustScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-trust-high";
    if (score >= 50) return "text-trust-medium";
    return "text-trust-low";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 75) return "Very Good";
    if (score >= 60) return "Good";
    if (score >= 45) return "Fair";
    return "Needs Work";
  };

  const getBgColor = (score: number) => {
    if (score >= 75) return "bg-trust-high/10";
    if (score >= 50) return "bg-trust-medium/10";
    return "bg-trust-low/10";
  };

  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-20 h-20 text-2xl",
    xl: "w-28 h-28 text-4xl",
  };

  const strokeWidth = {
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
  };

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={cn("relative flex items-center justify-center", sizeClasses[size])}>
        {/* Background circle */}
        <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className="stroke-muted"
            strokeWidth={strokeWidth[size]}
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            className={cn(
              "stroke-current transition-all duration-1000",
              getScoreColor(score)
            )}
            strokeWidth={strokeWidth[size]}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? strokeDashoffset : circumference}
            style={{
              animation: animated ? "trustScoreReveal 1.2s ease-out forwards" : "none",
              "--target-offset": strokeDashoffset,
            } as React.CSSProperties}
          />
        </svg>
        {/* Score number */}
        <span className={cn("font-bold", getScoreColor(score))}>{score}</span>
      </div>
      {showLabel && (
        <div className="text-center">
          <span
            className={cn(
              "inline-block px-2.5 py-1 rounded-full text-xs font-medium",
              getBgColor(score),
              getScoreColor(score)
            )}
          >
            {getScoreLabel(score)}
          </span>
        </div>
      )}
      <style>{`
        @keyframes trustScoreReveal {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: var(--target-offset);
          }
        }
      `}</style>
    </div>
  );
}
