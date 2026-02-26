import { motion } from "framer-motion";
import { Decision } from "@/data/scenarios";
import { ArrowRight } from "lucide-react";

interface FeedbackPanelProps {
  decision: Decision;
  onContinue: () => void;
}

export const FeedbackPanel = ({ decision, onContinue }: FeedbackPanelProps) => {
  const borderColor = decision.isOptimal
    ? "border-success/40"
    : decision.impacts.security + decision.impacts.trust + decision.impacts.ethics + decision.impacts.stability > -20
    ? "border-warning/40"
    : "border-danger/40";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-lg border-2 ${borderColor} bg-card p-6 space-y-4`}
    >
      <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
        Analisis Keputusan
      </p>
      <p className="text-foreground leading-relaxed">{decision.feedback}</p>

      {/* Impact Summary */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(decision.impacts).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-xs font-mono px-3 py-2 rounded bg-secondary">
            <span className="text-muted-foreground capitalize">{key}</span>
            <span className={val > 0 ? "text-success font-bold" : val < 0 ? "text-danger font-bold" : "text-muted-foreground"}>
              {val > 0 ? `+${val}` : val}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onContinue}
        className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Lanjutkan <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
