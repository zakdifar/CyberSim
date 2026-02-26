import { motion } from "framer-motion";
import { SystemState, Decision } from "@/data/scenarios";
import { SystemIndicator } from "./SystemIndicator";
import { RotateCcw, Home } from "lucide-react";

interface SessionSummaryProps {
  finalState: SystemState;
  decisions: Decision[];
  level: number;
  onRestart: () => void;
  onHome: () => void;
  failed: boolean;
}

export const SessionSummary = ({
  finalState,
  decisions,
  level,
  onRestart,
  onHome,
  failed,
}: SessionSummaryProps) => {
  const optimalCount = decisions.filter((d) => d.isOptimal).length;
  const totalAvg =
    (finalState.security + finalState.trust + finalState.ethics + finalState.stability) / 4;

  const getGrade = () => {
    if (totalAvg >= 80) return { label: "Luar Biasa", color: "text-success" };
    if (totalAvg >= 60) return { label: "Baik", color: "text-primary" };
    if (totalAvg >= 40) return { label: "Perlu Perbaikan", color: "text-warning" };
    return { label: "Kritis", color: "text-danger" };
  };

  const grade = getGrade();

  const getStrengths = () => {
    const entries = Object.entries(finalState) as [keyof SystemState, number][];
    return entries.filter(([, v]) => v >= 60).map(([k]) => k);
  };

  const getWeaknesses = () => {
    const entries = Object.entries(finalState) as [keyof SystemState, number][];
    return entries.filter(([, v]) => v < 60).map(([k]) => k);
  };

  const labelMap: Record<string, string> = {
    security: "Keamanan",
    trust: "Kepercayaan",
    ethics: "Etika",
    stability: "Stabilitas",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-mono font-bold text-foreground">
          {failed ? "Sistem Gagal" : "Ringkasan Sesi"}
        </h2>
        <p className="text-muted-foreground">Level {level}</p>
      </div>

      {failed && (
        <div className="rounded-lg border-2 border-danger/40 bg-danger/10 p-4 text-center">
          <p className="text-danger font-mono font-semibold">
            ⚠ Salah satu indikator turun ke level kritis. Simulasi dihentikan.
          </p>
        </div>
      )}

      {/* Grade */}
      <div className="text-center p-6 rounded-lg border border-border bg-card">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
          Penilaian Keseluruhan
        </p>
        <p className={`text-4xl font-mono font-bold ${grade.color}`}>{grade.label}</p>
        <p className="text-sm text-muted-foreground mt-2">
          {optimalCount}/{decisions.length} keputusan optimal
        </p>
      </div>

      {/* Final Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <SystemIndicator label="Keamanan" value={finalState.security} icon="security" />
        <SystemIndicator label="Kepercayaan" value={finalState.trust} icon="trust" />
        <SystemIndicator label="Etika" value={finalState.ethics} icon="ethics" />
        <SystemIndicator label="Stabilitas" value={finalState.stability} icon="stability" />
      </div>

      {/* Reflection */}
      <div className="rounded-lg border border-border bg-card p-5 space-y-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Refleksi
        </p>
        {getStrengths().length > 0 && (
          <div>
            <p className="text-sm text-success font-semibold mb-1">💪 Kekuatan Anda:</p>
            <p className="text-sm text-secondary-foreground">
              {getStrengths().map((s) => labelMap[s]).join(", ")}
            </p>
          </div>
        )}
        {getWeaknesses().length > 0 && (
          <div>
            <p className="text-sm text-warning font-semibold mb-1">📈 Area Perbaikan:</p>
            <p className="text-sm text-secondary-foreground">
              {getWeaknesses().map((s) => labelMap[s]).join(", ")}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-primary bg-primary/10 text-primary font-mono font-semibold text-sm hover:bg-primary/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Ulangi Level
        </button>
        <button
          onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-mono font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          <Home className="w-4 h-4" /> Kembali
        </button>
      </div>
    </motion.div>
  );
};
