import { motion } from "framer-motion";
import { Scenario, Decision } from "@/data/scenarios";

interface ScenarioCardProps {
  scenario: Scenario;
  onDecision: (decision: Decision) => void;
  disabled: boolean;
}

export const ScenarioCard = ({ scenario, onDecision, disabled }: ScenarioCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Role Badge */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/10">
          {scenario.role}
        </span>
        <span className="text-xs font-mono text-muted-foreground">
          Level {scenario.level}
        </span>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-mono font-bold text-foreground">
        {scenario.title}
      </h2>

      {/* Context */}
      <div className="rounded-lg border border-border bg-secondary/50 p-4">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          Konteks Situasi
        </p>
        <p className="text-sm text-secondary-foreground leading-relaxed">
          {scenario.context}
        </p>
      </div>

      {/* Narrative */}
      <div className="rounded-lg border border-primary/20 bg-card p-5">
        <p className="text-foreground leading-relaxed">
          {scenario.narrative}
        </p>
      </div>

      {/* Decisions */}
      <div className="space-y-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Pilih Keputusan Anda
        </p>
        {scenario.decisions.map((decision, index) => (
          <motion.button
            key={decision.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onDecision(decision)}
            disabled={disabled}
            className="w-full text-left p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-md bg-secondary flex items-center justify-center font-mono text-sm font-bold text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                {String.fromCharCode(65 + index)}
              </span>
              <p className="text-sm text-card-foreground group-hover:text-foreground transition-colors">
                {decision.text}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
