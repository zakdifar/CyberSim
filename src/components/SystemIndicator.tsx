import { motion } from "framer-motion";
import { Shield, Users, Scale, Cpu } from "lucide-react";

interface SystemIndicatorProps {
  label: string;
  value: number;
  icon: "security" | "trust" | "ethics" | "stability";
  change?: number;
}

const iconMap = {
  security: Shield,
  trust: Users,
  ethics: Scale,
  stability: Cpu,
};

const getColor = (value: number) => {
  if (value >= 60) return "bg-success";
  if (value >= 35) return "bg-warning";
  return "bg-danger";
};

const getGlow = (value: number) => {
  if (value >= 60) return "glow-success";
  if (value >= 35) return "glow-warning";
  return "glow-danger";
};

const getTextColor = (value: number) => {
  if (value >= 60) return "text-success";
  if (value >= 35) return "text-warning";
  return "text-danger";
};

export const SystemIndicator = ({ label, value, icon, change }: SystemIndicatorProps) => {
  const Icon = iconMap[icon];
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="rounded-lg border border-border bg-card p-3 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${getTextColor(clampedValue)}`} />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-sm font-mono font-bold ${getTextColor(clampedValue)}`}>
            {clampedValue}
          </span>
          {change !== undefined && change !== 0 && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-xs font-mono font-bold ${change > 0 ? "text-success" : "text-danger"}`}
            >
              {change > 0 ? `+${change}` : change}
            </motion.span>
          )}
        </div>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getColor(clampedValue)} ${getGlow(clampedValue)}`}
          initial={{ width: "75%" }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
