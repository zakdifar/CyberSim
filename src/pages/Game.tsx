import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  scenarios,
  getLevelScenarios,
  initialState,
  SystemState,
  Decision,
  getMaxLevel,
} from "@/data/scenarios";
import { SystemIndicator } from "@/components/SystemIndicator";
import { ScenarioCard } from "@/components/ScenarioCard";
import { FeedbackPanel } from "@/components/FeedbackPanel";
import { SessionSummary } from "@/components/SessionSummary";
import { Terminal } from "lucide-react";

const CRITICAL_THRESHOLD = 10;

const Game = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const startLevel = parseInt(searchParams.get("level") || "1", 10);

  const [level] = useState(startLevel);
  const [state, setState] = useState<SystemState>({ ...initialState });
  const [changes, setChanges] = useState<Partial<SystemState>>({});
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);
  const [allDecisions, setAllDecisions] = useState<Decision[]>([]);
  const [phase, setPhase] = useState<"playing" | "feedback" | "summary">("playing");
  const [failed, setFailed] = useState(false);

  const levelScenarios = getLevelScenarios(level);
  const currentScenario = levelScenarios[scenarioIndex];

  const handleDecision = useCallback(
    (decision: Decision) => {
      const newState: SystemState = {
        security: Math.max(0, Math.min(100, state.security + decision.impacts.security)),
        trust: Math.max(0, Math.min(100, state.trust + decision.impacts.trust)),
        ethics: Math.max(0, Math.min(100, state.ethics + decision.impacts.ethics)),
        stability: Math.max(0, Math.min(100, state.stability + decision.impacts.stability)),
      };

      setChanges(decision.impacts);
      setState(newState);
      setSelectedDecision(decision);
      setAllDecisions((prev) => [...prev, decision]);

      // Check failure
      if (
        newState.security <= CRITICAL_THRESHOLD ||
        newState.trust <= CRITICAL_THRESHOLD ||
        newState.ethics <= CRITICAL_THRESHOLD ||
        newState.stability <= CRITICAL_THRESHOLD
      ) {
        setFailed(true);
        setPhase("summary");
        return;
      }

      setPhase("feedback");
    },
    [state]
  );

  const handleContinue = () => {
    setSelectedDecision(null);
    setChanges({});
    if (scenarioIndex + 1 < levelScenarios.length) {
      setScenarioIndex(scenarioIndex + 1);
      setPhase("playing");
    } else {
      setPhase("summary");
    }
  };

  const handleRestart = () => {
    setState({ ...initialState });
    setScenarioIndex(0);
    setSelectedDecision(null);
    setAllDecisions([]);
    setChanges({});
    setFailed(false);
    setPhase("playing");
  };

  return (
    <div className="min-h-screen bg-background bg-grid relative">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none scanline z-50" />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary font-mono font-bold text-sm hover:opacity-80 transition-opacity"
          >
            <Terminal className="w-4 h-4" />
            CyberSim
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span>Level {level}/{getMaxLevel()}</span>
            <span className="text-border">|</span>
            <span>
              Skenario {Math.min(scenarioIndex + 1, levelScenarios.length)}/
              {levelScenarios.length}
            </span>
          </div>
        </div>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Indicators Panel */}
          <div className="lg:col-span-1 space-y-3 lg:order-2">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
              Status Sistem
            </p>
            <SystemIndicator
              label="Keamanan"
              value={state.security}
              icon="security"
              change={changes.security}
            />
            <SystemIndicator
              label="Kepercayaan"
              value={state.trust}
              icon="trust"
              change={changes.trust}
            />
            <SystemIndicator
              label="Etika"
              value={state.ethics}
              icon="ethics"
              change={changes.ethics}
            />
            <SystemIndicator
              label="Stabilitas"
              value={state.stability}
              icon="stability"
              change={changes.stability}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 lg:order-1">
            <AnimatePresence mode="wait">
              {phase === "playing" && currentScenario && (
                <ScenarioCard
                  key={currentScenario.id}
                  scenario={currentScenario}
                  onDecision={handleDecision}
                  disabled={false}
                />
              )}
              {phase === "feedback" && selectedDecision && (
                <motion.div key="feedback" className="space-y-6">
                  <ScenarioCard
                    scenario={currentScenario}
                    onDecision={() => {}}
                    disabled={true}
                  />
                  <FeedbackPanel
                    decision={selectedDecision}
                    onContinue={handleContinue}
                  />
                </motion.div>
              )}
              {phase === "summary" && (
                <SessionSummary
                  key="summary"
                  finalState={state}
                  decisions={allDecisions}
                  level={level}
                  onRestart={handleRestart}
                  onHome={() => navigate("/")}
                  failed={failed}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Game;
