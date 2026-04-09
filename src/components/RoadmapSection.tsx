import { useRef } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface WeekNode {
  week: number;
  moduleId: number;
  colorVar: string;
  label: string;
  detail: string;
  marker?: "diamond" | "star";
}

const weeks: WeekNode[] = [
  { week: 1, moduleId: 1, colorVar: "--module-1", label: "М01", detail: "Системы счисления, кодирование информации" },
  { week: 2, moduleId: 1, colorVar: "--module-1", label: "М01", detail: "ОС, файловые системы, резервное копирование" },
  { week: 3, moduleId: 2, colorVar: "--module-2", label: "М02", detail: "Типы данных и шкалы измерений (Стивенс)" },
  { week: 4, moduleId: 2, colorVar: "--module-2", label: "М02", detail: "Формулы Excel: СРЗНАЧ, СТАНДОТКЛОН, ВПР" },
  { week: 5, moduleId: 2, colorVar: "--module-2", label: "М02", detail: "Промежуточная контрольная работа", marker: "diamond" },
  { week: 6, moduleId: 2, colorVar: "--module-2", label: "М02", detail: "Описательная статистика в JASP/Jamovi" },
  { week: 7, moduleId: 2, colorVar: "--module-2", label: "М02", detail: "Визуализация и сводные таблицы" },
  { week: 8, moduleId: 3, colorVar: "--module-3", label: "М03", detail: "Булевы операторы, академический поиск" },
  { week: 9, moduleId: 3, colorVar: "--module-3", label: "М03", detail: "PRISMA-протокол, менеджеры цитирования" },
  { week: 10, moduleId: 3, colorVar: "--module-3", label: "М03", detail: "Google Forms, фейковые исследования" },
  { week: 11, moduleId: 4, colorVar: "--module-4", label: "М04", detail: "Автоматизированная психодиагностика" },
  { week: 12, moduleId: 4, colorVar: "--module-4", label: "М04", detail: "VR-среды для экспозиционной терапии" },
  { week: 13, moduleId: 4, colorVar: "--module-4", label: "М04", detail: "NLP, чат-боты, eye-tracking" },
  { week: 14, moduleId: 0, colorVar: "--module-4", label: "Зачёт", detail: "Защита проектов + зачёт", marker: "star" },
];

const CURRENT_WEEK: number | null = null; // set 1–14 to highlight

const legend = [
  { colorVar: "--module-1", label: "Модуль 01 — Архитектура ПК" },
  { colorVar: "--module-2", label: "Модуль 02 — Данные и статистика" },
  { colorVar: "--module-3", label: "Модуль 03 — Интернет и поиск" },
  { colorVar: "--module-4", label: "Модуль 04 — VR / AI / Диагностика" },
];

const NodeShape = ({
  marker,
  color,
  isCurrent,
}: {
  marker?: "diamond" | "star";
  color: string;
  isCurrent: boolean;
}) => {
  const pulse = isCurrent ? "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" : "";
  const base = "relative flex items-center justify-center";

  if (marker === "diamond") {
    return (
      <span className={`${base} ${pulse}`}>
        <span
          className="w-5 h-5 rotate-45 rounded-[3px] border-2"
          style={{ borderColor: color, backgroundColor: `${color}33` }}
        />
      </span>
    );
  }

  if (marker === "star") {
    return (
      <span className={`${base} ${pulse} text-lg leading-none`} style={{ color }}>
        ★
      </span>
    );
  }

  return (
    <span className={`${base} ${pulse}`}>
      <span
        className="w-3.5 h-3.5 rounded-full border-2"
        style={{ borderColor: color, backgroundColor: isCurrent ? color : `${color}33` }}
      />
    </span>
  );
};

const RoadmapSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-[10vh] max-w-[1200px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Roadmap
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-8">
          14 недель курса
        </h2>
      </motion.div>

      {/* Timeline – horizontally scrollable on mobile */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-6 -mx-6 px-6 scrollbar-thin"
      >
        <div className="relative min-w-[900px]">
          {/* Connecting line */}
          <div className="absolute top-[18px] left-4 right-4 h-px bg-border" />

          {/* Week nodes */}
          <div className="relative flex justify-between">
            {weeks.map((w, i) => {
              const color = `hsl(var(${w.colorVar}))`;
              const isCurrent = CURRENT_WEEK === w.week;

              return (
                <Tooltip key={w.week}>
                  <TooltipTrigger asChild>
                    <motion.button
                      type="button"
                      className="flex flex-col items-center gap-2 group cursor-default focus:outline-none"
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.04,
                        ease: [0.2, 0.8, 0.2, 1] as const,
                      }}
                    >
                      {/* Node */}
                      <NodeShape marker={w.marker} color={color} isCurrent={isCurrent} />

                      {/* Week number */}
                      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors">
                        {w.week}
                      </span>

                      {/* Module badge (visible on hover via group) */}
                      <span
                        className="font-mono text-[9px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded"
                        style={{ color, backgroundColor: `hsl(var(${w.colorVar}) / 0.1)` }}
                      >
                        {w.label}
                      </span>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="max-w-[220px] text-xs font-body"
                  >
                    <p className="font-semibold mb-0.5">Неделя {w.week}</p>
                    <p className="text-muted-foreground">{w.detail}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {legend.map((l) => (
          <div key={l.colorVar} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: `hsl(var(${l.colorVar}))` }}
            />
            <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
              {l.label}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rotate-45 rounded-[2px] border border-muted-foreground/40" />
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Контрольная
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm leading-none">★</span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Зачёт
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default RoadmapSection;
