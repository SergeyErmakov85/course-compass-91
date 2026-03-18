import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface ModuleData {
  id: number;
  number: string;
  title: string;
  type: "basic" | "applied";
  percent: string;
  summary: string;
  details: string;
  topics: string[];
  colorVar: string;
}

const ModuleCard = ({ module, isHovered, onHover, onLeave }: {
  module: ModuleData;
  isHovered: boolean | null;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const dimmed = isHovered === false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => setExpanded(!expanded)}
      className={`group relative rounded-xl border border-border bg-card p-8 cursor-pointer transition-all duration-300 ${
        dimmed ? "opacity-40" : "opacity-100"
      } hover:shadow-[var(--shadow-card-hover)]`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Module number */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md"
          style={{
            color: `hsl(var(${module.colorVar}))`,
            backgroundColor: `hsl(var(${module.colorVar}) / 0.08)`,
          }}
        >
          {module.number} · {module.percent}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
          {module.type === "basic" ? "Базовый" : "Прикладной"}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-xl font-semibold text-foreground mb-3 pr-4 tracking-tight">
        {module.title}
      </h3>

      {/* Summary */}
      <p className="text-sm text-muted-foreground mb-4 font-body">
        {module.summary}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {module.topics.map((topic) => (
          <span
            key={topic}
            className="text-[11px] uppercase tracking-widest font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-transparent transition-colors group-hover:border-accent/20"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Expand trigger */}
      <div className="flex items-center gap-1.5 text-accent text-sm font-medium">
        <span>{expanded ? "Свернуть" : "Подробнее"}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-sm text-muted-foreground leading-relaxed font-body">
                {module.details}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ModuleCard;
