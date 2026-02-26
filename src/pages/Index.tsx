import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Terminal, Shield, Users, Scale, Cpu, ChevronRight, Zap, Brain, Target } from "lucide-react";
import { getMaxLevel } from "@/data/scenarios";

const Index = () => {
  const navigate = useNavigate();
  const maxLevel = getMaxLevel();

  const features = [
    {
      icon: Brain,
      title: "Berpikir Kritis",
      desc: "Latih kemampuan analisis risiko dan pengambilan keputusan di dunia digital.",
    },
    {
      icon: Zap,
      title: "Feedback Real-time",
      desc: "Setiap keputusan langsung memengaruhi indikator sistem secara dinamis.",
    },
    {
      icon: Target,
      title: "Tantangan Bertahap",
      desc: "Dari skenario sederhana hingga dilema kompleks dengan konsekuensi tersembunyi.",
    },
  ];

  const indicators = [
    { icon: Shield, label: "Security", color: "text-success" },
    { icon: Users, label: "Trust", color: "text-primary" },
    { icon: Scale, label: "Ethics", color: "text-warning" },
    { icon: Cpu, label: "Stability", color: "text-accent-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background bg-grid relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none scanline z-50" />

      {/* Hero */}
      <section className="relative z-10 container max-w-5xl mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-primary font-mono">
            <Terminal className="w-6 h-6" />
            <span className="text-xl font-bold tracking-wider">CyberSim</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-mono font-bold text-foreground leading-tight">
            Simulasi Keputusan
            <br />
            <span className="text-gradient-primary">Dunia Digital</span>
          </h1>

          <p className="max-w-xl mx-auto text-muted-foreground text-lg leading-relaxed">
            Platform edukasi interaktif berbasis gamifikasi. Hadapi skenario nyata,
            ambil keputusan, dan pelajari konsekuensinya secara real-time.
          </p>

          {/* Indicators Preview */}
          <div className="flex items-center justify-center gap-6 py-4">
            {indicators.map((ind) => (
              <div key={ind.label} className="flex items-center gap-1.5">
                <ind.icon className={`w-4 h-4 ${ind.color}`} />
                <span className="text-xs font-mono text-muted-foreground">{ind.label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => navigate("/game?level=1")}
              className="flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-mono font-bold text-sm glow-primary hover:opacity-90 transition-opacity"
            >
              Mulai Simulasi <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Level selector */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {Array.from({ length: maxLevel }, (_, i) => i + 1).map((lvl) => (
              <button
                key={lvl}
                onClick={() => navigate(`/game?level=${lvl}`)}
                className="px-4 py-2 rounded-md border border-border bg-card text-card-foreground font-mono text-xs hover:border-primary/50 hover:text-primary transition-colors"
              >
                Level {lvl}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 container max-w-5xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15 }}
              className="rounded-lg border border-border bg-card p-6 space-y-3 hover:border-primary/30 transition-colors"
            >
              <feat.icon className="w-8 h-8 text-primary" />
              <h3 className="font-mono font-bold text-foreground">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs font-mono text-muted-foreground">
            CyberSim — Platform Edukasi Keamanan Digital Berbasis Simulasi
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
