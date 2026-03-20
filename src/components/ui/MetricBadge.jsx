import { cn } from "@/lib/utils";
export function MetricBadge({ label, value, icon: Icon, variant = "default", className, }) {
    const variantStyles = {
        default: "bg-secondary text-secondary-foreground",
        success: "bg-trust-high/10 text-trust-high",
        warning: "bg-trust-low/10 text-trust-low",
        muted: "bg-muted text-muted-foreground",
    };
    return (<div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-lg", variantStyles[variant], className)}>
      {Icon && <Icon className="w-3.5 h-3.5"/>}
      <span className="text-xs font-medium opacity-70">{label}</span>
      <span className="text-sm font-semibold">{value}</span>
    </div>);
}
