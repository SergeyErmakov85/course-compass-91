import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "katex/dist/katex.min.css";
import katex from "katex";

/* ─── KaTeX helper ─── */
const Tex = ({ math, display = false }: { math: string; display?: boolean }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, { throwOnError: false, displayMode: display }),
    }}
  />
);

/* ─── Psych example card ─── */
const PsyExample = ({ text }: { text: string }) => (
  <div className="flex gap-3 bg-muted/40 rounded-lg p-4 border border-border mt-3">
    <Brain className="w-5 h-5 text-accent shrink-0 mt-0.5" />
    <p className="text-xs text-muted-foreground font-body italic">{text}</p>
  </div>
);

/* ═══════════════════════════════════════════
   Venn Diagram (sections 1-2)
   ═══════════════════════════════════════════ */
type VennHighlight = "left" | "right" | "intersection" | "union" | "diff-left" | "sym-diff" | "complement";

const VennDiagram = ({ highlight }: { highlight: VennHighlight }) => {
  const leftFill = ["left", "union", "diff-left", "sym-diff"].includes(highlight);
  const rightFill = ["right", "union", "sym-diff"].includes(highlight);
  const interFill = ["intersection", "union"].includes(highlight);
  const complementFill = highlight === "complement";
  const accent1 = "hsl(var(--module-1))";
  const accent2 = "hsl(var(--module-3))";
  const blended = "hsl(var(--module-2))";

  return (
    <svg viewBox="0 0 260 160" className="w-full max-w-[260px] mx-auto" aria-hidden>
      <defs>
        <clipPath id="clip-left"><circle cx="95" cy="80" r="55" /></clipPath>
        <clipPath id="clip-right"><circle cx="165" cy="80" r="55" /></clipPath>
      </defs>
      {complementFill && (
        <rect x="5" y="5" width="250" height="150" rx="12" fill={accent1} fillOpacity="0.12" stroke="hsl(var(--border))" strokeWidth="1" />
      )}
      <circle cx="95" cy="80" r="55" fill={leftFill ? accent1 : "transparent"} fillOpacity={leftFill ? 0.18 : 0} stroke={accent1} strokeWidth="1.5" />
      <circle cx="165" cy="80" r="55" fill={rightFill ? accent2 : "transparent"} fillOpacity={rightFill ? 0.18 : 0} stroke={accent2} strokeWidth="1.5" />
      {interFill && <g clipPath="url(#clip-left)"><circle cx="165" cy="80" r="55" fill={blended} fillOpacity="0.3" /></g>}
      {highlight === "sym-diff" && <g clipPath="url(#clip-left)"><circle cx="165" cy="80" r="55" fill="hsl(var(--background))" fillOpacity="0.9" /></g>}
      {highlight === "diff-left" && <g clipPath="url(#clip-right)"><circle cx="95" cy="80" r="55" fill="hsl(var(--background))" fillOpacity="0.95" /></g>}
      {complementFill && (
        <>
          <circle cx="95" cy="80" r="55" fill="hsl(var(--background))" />
          <circle cx="165" cy="80" r="55" fill="hsl(var(--background))" />
          <circle cx="95" cy="80" r="55" fill="none" stroke={accent1} strokeWidth="1.5" />
          <circle cx="165" cy="80" r="55" fill="none" stroke={accent2} strokeWidth="1.5" />
        </>
      )}
      <text x="72" y="84" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">A</text>
      <text x="188" y="84" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">B</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════
   Section 1 — Базовые понятия
   ═══════════════════════════════════════════ */
const concepts = [
  { name: "Множество и элемент", formula: "a \\in A", definition: "Множество — неупорядоченная совокупность различных объектов. Запись a ∈ A означает принадлежность элемента множеству.", example: "Пусть A = {тревожность, депрессия, ОКР} — множество диагнозов. Тогда тревожность ∈ A, а шизофрения ∉ A." },
  { name: "Пустое и универсальное множества", formula: "\\emptyset,\\; U", definition: "Пустое множество ∅ не содержит элементов. Универсальное множество U — совокупность всех рассматриваемых элементов.", example: "U — все студенты университета. ∅ — множество студентов, набравших 200 баллов по 100-балльной шкале." },
  { name: "Подмножество", formula: "A \\subseteq B", definition: "A является подмножеством B, если каждый элемент A также принадлежит B. Собственное подмножество (⊂) исключает равенство.", example: "A — клинические психологи, B — все психологи. Тогда A ⊂ B." },
  { name: "Мощность множества", formula: "|A| = n", definition: "Мощность — количество элементов в множестве. Для конечных множеств |A| — натуральное число.", example: "Если A = {испытуемый₁, …, испытуемый₃₀}, то |A| = 30 — размер выборки." },
];

const BasicsSection = () => (
  <div className="space-y-4">
    {concepts.map((c) => (
      <div key={c.name} className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
          <h4 className="font-display font-semibold text-foreground text-sm">{c.name}</h4>
          <span className="shrink-0"><Tex math={c.formula} /></span>
        </div>
        <p className="text-xs text-muted-foreground font-body">{c.definition}</p>
        <PsyExample text={c.example} />
      </div>
    ))}
    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body">
        <span className="font-semibold text-foreground">Ключевой пример:</span> Пусть <Tex math="U" /> — все студенты, <Tex math="A" /> — психологи, <Tex math="B" /> — с высокой тревожностью. Тогда <Tex math="A \cap B" /> — тревожные студенты-психологи.
      </p>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   Section 2 — Операции
   ═══════════════════════════════════════════ */
const operations: { name: string; formula: string; formal: string; highlight: VennHighlight; example: string }[] = [
  { name: "Объединение", formula: "A \\cup B", formal: "A \\cup B = \\{x : x \\in A \\lor x \\in B\\}", highlight: "union", example: "A — пациенты с депрессией, B — с тревожностью. A ∪ B — все, имеющие хотя бы одно расстройство." },
  { name: "Пересечение", formula: "A \\cap B", formal: "A \\cap B = \\{x : x \\in A \\land x \\in B\\}", highlight: "intersection", example: "A ∩ B — пациенты с коморбидностью депрессии и тревожности." },
  { name: "Разность", formula: "A \\setminus B", formal: "A \\setminus B = \\{x : x \\in A \\land x \\notin B\\}", highlight: "diff-left", example: "A \\ B — пациенты с «чистой» депрессией без тревожности." },
  { name: "Симметрическая разность", formula: "A \\triangle B", formal: "A \\triangle B = (A \\setminus B) \\cup (B \\setminus A)", highlight: "sym-diff", example: "A △ B — пациенты с ровно одним расстройством." },
  { name: "Дополнение", formula: "\\bar{A}", formal: "\\bar{A} = U \\setminus A", highlight: "complement", example: "Ā — все студенты, НЕ являющиеся психологами." },
];

const OperationsSection = () => (
  <div className="space-y-6">
    {operations.map((op) => (
      <div key={op.name} className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-baseline gap-3 mb-3">
          <h4 className="font-display font-semibold text-foreground text-sm">{op.name}</h4>
          <Tex math={op.formula} />
        </div>
        <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-start">
          <div>
            <div className="mb-2"><Tex math={op.formal} display /></div>
            <PsyExample text={op.example} />
          </div>
          <VennDiagram highlight={op.highlight} />
        </div>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════
   Section 3 — Множества в формировании выборки
   ═══════════════════════════════════════════ */
const sampleSteps = [
  {
    id: 0,
    label: "Генеральная совокупность",
    formula: "\\Omega = \\{\\text{все жители города}\\}",
    description: "Определяем генеральную совокупность — множество всех потенциальных участников исследования. Это отправная точка, из которой мы будем формировать выборку.",
    svg: (
      <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
        <motion.circle cx="120" cy="80" r="70" fill="hsl(var(--module-1))" fillOpacity="0.12" stroke="hsl(var(--module-1))" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }} />
        <text x="120" y="84" textAnchor="middle" className="fill-foreground text-[12px] font-display font-semibold">Ω</text>
      </svg>
    ),
  },
  {
    id: 1,
    label: "Критерий включения (18–65 лет)",
    formula: "A = \\{x \\in \\Omega : 18 \\le \\text{возраст}(x) \\le 65\\}",
    description: "Первый фильтр: оставляем только участников трудоспособного возраста. Множество A — собственное подмножество Ω.",
    svg: (
      <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
        <circle cx="120" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4 3" />
        <motion.circle cx="120" cy="80" r="50" fill="hsl(var(--module-2))" fillOpacity="0.15" stroke="hsl(var(--module-2))" strokeWidth="1.5" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }} />
        <text x="120" y="76" textAnchor="middle" className="fill-foreground text-[12px] font-display font-semibold">A</text>
        <text x="120" y="92" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">⊂ Ω</text>
      </svg>
    ),
  },
  {
    id: 2,
    label: "Критерий исключения (психиатрический диагноз)",
    formula: "A \\setminus B,\\quad B = \\{x : \\text{псих. диагноз}\\}",
    description: "Исключаем участников с текущим психиатрическим диагнозом. Операция разности множеств «вырезает» нежелательную подгруппу.",
    svg: (
      <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
        <defs><clipPath id="clip-sample-a"><circle cx="110" cy="80" r="50" /></clipPath></defs>
        <motion.circle cx="110" cy="80" r="50" fill="hsl(var(--module-2))" fillOpacity="0.15" stroke="hsl(var(--module-2))" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
        <motion.circle cx="155" cy="90" r="28" fill="hsl(var(--destructive))" fillOpacity="0.12" stroke="hsl(var(--destructive))" strokeWidth="1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
        <g clipPath="url(#clip-sample-a)">
          <motion.circle cx="155" cy="90" r="28" fill="hsl(var(--background))" fillOpacity="0.9" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
        </g>
        <text x="90" y="78" textAnchor="middle" className="fill-foreground text-[11px] font-display font-semibold">A\B</text>
        <text x="162" y="94" textAnchor="middle" className="fill-destructive text-[10px] font-display">B</text>
      </svg>
    ),
  },
  {
    id: 3,
    label: "Стратификация по полу",
    formula: "M \\cap F = \\emptyset,\\quad M \\cup F = A \\setminus B",
    description: "Финальная выборка разбивается на непересекающиеся страты по полу. Это разбиение (partition): страты не пересекаются и в сумме дают всю выборку.",
    svg: (
      <svg viewBox="0 0 240 160" className="w-full max-w-[240px] mx-auto">
        <motion.rect x="20" y="30" width="90" height="100" rx="12" fill="hsl(var(--module-1))" fillOpacity="0.12" stroke="hsl(var(--module-1))" strokeWidth="1.5" initial={{ x: 120, opacity: 0 }} animate={{ x: 20, opacity: 1 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }} />
        <motion.rect x="130" y="30" width="90" height="100" rx="12" fill="hsl(var(--module-4))" fillOpacity="0.12" stroke="hsl(var(--module-4))" strokeWidth="1.5" initial={{ x: 120, opacity: 0 }} animate={{ x: 130, opacity: 1 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay: 0.15 }} />
        <text x="65" y="84" textAnchor="middle" className="fill-foreground text-[12px] font-display font-semibold">M</text>
        <text x="175" y="84" textAnchor="middle" className="fill-foreground text-[12px] font-display font-semibold">F</text>
      </svg>
    ),
  },
];

const SamplingSection = () => {
  const [step, setStep] = useState(0);
  const current = sampleSteps[step];

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground font-body">
        Формирование выборки — последовательность теоретико-множественных операций над генеральной совокупностью.
      </p>

      {/* Step navigation */}
      <div className="flex gap-2 flex-wrap">
        {sampleSteps.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setStep(i)}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
              step === i
                ? "bg-foreground text-background border-foreground"
                : "bg-card text-muted-foreground border-border hover:border-foreground/30"
            }`}
          >
            Шаг {i + 1}
          </button>
        ))}
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          className="rounded-xl border border-border bg-card p-5"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h4 className="font-display font-semibold text-foreground text-sm mb-1 flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-foreground">Шаг {step + 1}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground" />
            {current.label}
          </h4>
          <div className="my-3"><Tex math={current.formula} display /></div>
          <div className="grid sm:grid-cols-[1fr_auto] gap-4 items-center">
            <p className="text-xs text-muted-foreground font-body">{current.description}</p>
            <div className="w-[200px] shrink-0">{current.svg}</div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next / prev */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep((p) => Math.max(0, p - 1))}
          disabled={step === 0}
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          ← Назад
        </button>
        <button
          onClick={() => setStep((p) => Math.min(sampleSteps.length - 1, p + 1))}
          disabled={step === sampleSteps.length - 1}
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30"
        >
          Далее →
        </button>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Section 4 — Множества в психодиагностике (interactive Venn)
   ═══════════════════════════════════════════ */
type DiagRegion = "depression" | "anxiety" | "comorbid" | "norm" | null;

const regionData: Record<Exclude<DiagRegion, null>, { title: string; description: string; characteristics: string }> = {
  depression: {
    title: "«Чистая» депрессия (D \\ T)",
    description: "Пациенты с BDI-II > 20, но STAI-S ≤ 45. Депрессивная симптоматика без выраженной тревожности.",
    characteristics: "Ангедония, психомоторная заторможенность, руминации. Хороший ответ на КПТ и антидепрессанты (СИОЗС).",
  },
  anxiety: {
    title: "«Чистая» тревожность (T \\ D)",
    description: "Пациенты с STAI-S > 45, но BDI-II ≤ 20. Тревожная симптоматика без клинической депрессии.",
    characteristics: "Соматические симптомы, гипервигильность, избегание. Эффективны экспозиционная терапия и релаксация.",
  },
  comorbid: {
    title: "Коморбидная группа (D ∩ T)",
    description: "Пациенты с BDI-II > 20 И STAI-S > 45 одновременно. Наиболее тяжёлая клиническая картина.",
    characteristics: "Выше суицидальный риск, хуже прогноз, требуется комбинированная терапия. Составляют ≈45% клинической выборки.",
  },
  norm: {
    title: "Норма ((D ∪ T)ᶜ)",
    description: "Пациенты с BDI-II ≤ 20 И STAI-S ≤ 45. Отсутствие клинически значимой симптоматики.",
    characteristics: "Контрольная группа в исследовании. Базовый уровень для сравнения с клиническими группами.",
  },
};

const ComorbidityVenn = () => {
  const [active, setActive] = useState<DiagRegion>(null);

  const dBlue = "hsl(220, 70%, 55%)";
  const tOrange = "hsl(35, 85%, 55%)";

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground font-body">
        Кейс: <strong>Коморбидность депрессии и тревожности</strong>. Кликните на область диаграммы, чтобы увидеть описание группы.
      </p>

      <div className="flex flex-col items-center">
        <svg viewBox="0 0 340 220" className="w-full max-w-[380px]">
          <defs>
            <clipPath id="clip-d"><circle cx="120" cy="110" r="70" /></clipPath>
            <clipPath id="clip-t"><circle cx="220" cy="110" r="70" /></clipPath>
            <linearGradient id="comorbid-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={dBlue} stopOpacity="0.35" />
              <stop offset="100%" stopColor={tOrange} stopOpacity="0.35" />
            </linearGradient>
          </defs>

          {/* Outer rect = norm (clickable) */}
          <rect
            x="5" y="5" width="330" height="210" rx="14"
            fill={active === "norm" ? "hsl(var(--module-2))" : "transparent"}
            fillOpacity={active === "norm" ? 0.08 : 0}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="cursor-pointer"
            onClick={() => setActive(active === "norm" ? null : "norm")}
          />
          <text x="310" y="25" textAnchor="end" className="fill-muted-foreground text-[10px] font-mono">U</text>

          {/* Depression-only (left crescent) */}
          <g className="cursor-pointer" onClick={() => setActive(active === "depression" ? null : "depression")}>
            <circle
              cx="120" cy="110" r="70"
              fill={active === "depression" || active === "comorbid" ? dBlue : dBlue}
              fillOpacity={active === "depression" ? 0.25 : 0.1}
              stroke={dBlue}
              strokeWidth="2"
            />
          </g>

          {/* Anxiety-only (right crescent) */}
          <g className="cursor-pointer" onClick={() => setActive(active === "anxiety" ? null : "anxiety")}>
            <circle
              cx="220" cy="110" r="70"
              fill={active === "anxiety" || active === "comorbid" ? tOrange : tOrange}
              fillOpacity={active === "anxiety" ? 0.25 : 0.1}
              stroke={tOrange}
              strokeWidth="2"
            />
          </g>

          {/* Intersection (comorbid) — drawn on top */}
          <g clipPath="url(#clip-d)" className="cursor-pointer" onClick={() => setActive(active === "comorbid" ? null : "comorbid")}>
            <circle
              cx="220" cy="110" r="70"
              fill={active === "comorbid" ? "url(#comorbid-grad)" : "url(#comorbid-grad)"}
              fillOpacity={active === "comorbid" ? 1 : 0.5}
            />
          </g>

          {/* Labels */}
          <text x="90" y="108" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">D</text>
          <text x="90" y="124" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">BDI-II{">"}20</text>
          <text x="250" y="108" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">T</text>
          <text x="250" y="124" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">STAI-S{">"}45</text>
          <text x="170" y="114" textAnchor="middle" className="fill-foreground text-[11px] font-display font-semibold">D∩T</text>
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {([
            { key: "depression" as const, color: dBlue, label: "Депрессия (D)" },
            { key: "anxiety" as const, color: tOrange, label: "Тревожность (T)" },
            { key: "comorbid" as const, color: undefined, label: "Коморбидность (D∩T)" },
            { key: "norm" as const, color: "hsl(var(--muted-foreground))", label: "Норма" },
          ]).map((l) => (
            <button
              key={l.key}
              onClick={() => setActive(active === l.key ? null : l.key)}
              className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                active === l.key ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: l.key === "comorbid"
                    ? `linear-gradient(135deg, ${dBlue}, ${tOrange})`
                    : l.color,
                }}
              />
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-border bg-card p-5"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <h4 className="font-display font-semibold text-foreground text-sm mb-1">
              {regionData[active].title}
            </h4>
            <p className="text-xs text-muted-foreground font-body mb-2">{regionData[active].description}</p>
            <div className="bg-muted/40 rounded-lg p-3 border border-border">
              <p className="text-[11px] text-muted-foreground font-body">
                <span className="font-semibold text-foreground">Характеристики:</span> {regionData[active].characteristics}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Section 5 — Булева алгебра и логика фильтрации
   ═══════════════════════════════════════════ */
const booleanRows = [
  {
    set: "A \\cap B",
    bool: "AND",
    excel: '=И(A2>18; B2="жен")',
    qualtrics: "Skip logic: IF age>18 AND gender=F",
  },
  {
    set: "A \\cup B",
    bool: "OR",
    excel: '=ИЛИ(C2="да"; D2="да")',
    qualtrics: "Display logic: IF q1=yes OR q2=yes",
  },
  {
    set: "\\bar{A}",
    bool: "NOT",
    excel: '=НЕ(E2="исключён")',
    qualtrics: "Branch: IF NOT consent=yes",
  },
];

const BooleanSection = () => (
  <div className="space-y-5">
    <p className="text-sm text-muted-foreground font-body">
      Операции над множествами напрямую соответствуют булевым операторам, которые используются
      при фильтрации данных в Excel, SPSS и платформах для опросов.
    </p>

    <div className="overflow-x-auto">
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Множественная операция</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Булев оператор</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Пример в Excel/SPSS</th>
            <th className="py-2 font-display font-semibold text-foreground">Пример в Qualtrics</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          {booleanRows.map((r, i) => (
            <tr key={i} className={i < booleanRows.length - 1 ? "border-b border-border/50" : ""}>
              <td className="py-2.5 pr-3"><Tex math={r.set} /></td>
              <td className="py-2.5 pr-3 font-mono font-semibold text-foreground">{r.bool}</td>
              <td className="py-2.5 pr-3 font-mono text-[11px]">{r.excel}</td>
              <td className="py-2.5 font-mono text-[11px]">{r.qualtrics}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Practical assignment */}
    <div
      className="rounded-xl border border-border bg-card p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">
          Практическое задание
        </span>
      </div>
      <p className="text-sm text-muted-foreground font-body mb-3">
        Используя Excel, отфильтруйте из набора данных (<Tex math="N = 200" />) подгруппу:
        женщины в возрасте 20–30 лет, <strong>НЕ</strong> имеющие диагноза, с уровнем стресса
        выше среднего.
      </p>

      <div className="bg-muted/40 rounded-lg p-4 border border-border space-y-2">
        <p className="text-xs text-muted-foreground font-body">
          <span className="font-semibold text-foreground">Теоретико-множественная нотация:</span>
        </p>
        <div className="text-center">
          <Tex
            math="S = \{x \in U : \text{пол}(x) = \text{Ж}\} \;\cap\; \{x : 20 \le \text{возр}(x) \le 30\} \;\cap\; \overline{\{x : \text{диагноз}(x)\}} \;\cap\; \{x : \text{стресс}(x) > \bar{X}_{\text{стресс}}\}"
            display
          />
        </div>
        <p className="text-xs text-muted-foreground font-body">
          <span className="font-semibold text-foreground">Excel:</span>{" "}
          <code className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">
            =СЧЁТЕСЛИМН(B:B;"Ж"; C:C;"&gt;=20"; C:C;"&lt;=30"; D:D;"нет"; E:E;"&gt;"&amp;СРЗНАЧ(E:E))
          </code>
        </p>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   Section 6 — Декартово произведение и корреляционная матрица
   ═══════════════════════════════════════════ */
const variables = ["Тревожность", "Депрессия", "Стресс"] as const;
const corrValues: number[][] = [
  [1.0, 0.72, 0.58],
  [0.72, 1.0, 0.65],
  [0.58, 0.65, 1.0],
];
const corrDescriptions: string[][] = [
  [
    "Диагональ: корреляция тревожности с самой собой (всегда 1.00).",
    "Сильная положительная связь (r = .72). Депрессия и тревожность — частая коморбидность.",
    "Умеренная связь (r = .58). Стресс повышает тревожность, но не детерминирует её.",
  ],
  [
    "Сильная положительная связь (r = .72). Депрессия и тревожность — частая коморбидность.",
    "Диагональ: корреляция депрессии с самой собой.",
    "Умеренно-сильная связь (r = .65). Хронический стресс — фактор риска депрессии.",
  ],
  [
    "Умеренная связь (r = .58). Стресс повышает тревожность, но не детерминирует её.",
    "Умеренно-сильная связь (r = .65). Хронический стресс — фактор риска депрессии.",
    "Диагональ: корреляция стресса с самим собой.",
  ],
];

const getCorrColor = (v: number): string => {
  if (v >= 1) return "hsl(var(--module-1) / 0.15)";
  if (v >= 0.7) return "hsl(var(--module-1) / 0.35)";
  if (v >= 0.5) return "hsl(var(--module-2) / 0.3)";
  if (v >= 0.3) return "hsl(var(--module-4) / 0.2)";
  return "hsl(var(--muted) / 0.5)";
};

const CartesianSection = () => {
  const [hovered, setHovered] = useState<[number, number] | null>(null);

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground font-body">
        Если <Tex math="X = \{\text{тревожность, депрессия, стресс}\}" /> — множество переменных,
        то <Tex math="X \times X" /> — все возможные пары. Корреляционная матрица — это функция:
      </p>
      <div className="text-center my-2">
        <Tex math="r : X \times X \to [-1,\; 1]" display />
      </div>

      {/* Interactive matrix */}
      <div className="flex flex-col items-center">
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="w-24" />
                {variables.map((v) => (
                  <th
                    key={v}
                    className="px-3 py-2 font-display font-semibold text-[11px] text-foreground text-center min-w-[100px]"
                  >
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variables.map((rowVar, ri) => (
                <tr key={rowVar}>
                  <td className="px-3 py-2 font-display font-semibold text-[11px] text-foreground text-right">
                    {rowVar}
                  </td>
                  {corrValues[ri].map((val, ci) => (
                    <td
                      key={ci}
                      className="px-3 py-3 text-center cursor-default transition-all duration-200 border border-border/40 rounded-sm"
                      style={{
                        backgroundColor: getCorrColor(val),
                        transform:
                          hovered && hovered[0] === ri && hovered[1] === ci
                            ? "scale(1.1)"
                            : "scale(1)",
                        boxShadow:
                          hovered && hovered[0] === ri && hovered[1] === ci
                            ? "var(--shadow-md)"
                            : "none",
                      }}
                      onMouseEnter={() => setHovered([ri, ci])}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span
                        className={`font-mono text-sm font-semibold ${
                          val >= 1 ? "text-muted-foreground" : "text-foreground"
                        }`}
                      >
                        {val.toFixed(2)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tooltip description */}
        <AnimatePresence mode="wait">
          {hovered && (
            <motion.div
              key={`${hovered[0]}-${hovered[1]}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="mt-4 text-xs text-muted-foreground font-body text-center max-w-[400px]"
            >
              <span className="font-semibold text-foreground">
                {variables[hovered[0]]} × {variables[hovered[1]]}:
              </span>{" "}
              {corrDescriptions[hovered[0]][hovered[1]]}
            </motion.div>
          )}
        </AnimatePresence>

        {!hovered && (
          <p className="mt-4 text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
            Наведите на ячейку для описания
          </p>
        )}
      </div>

      {/* Color legend */}
      <div className="flex flex-wrap gap-3 justify-center mt-2">
        {[
          { label: "r = 1.00", color: getCorrColor(1) },
          { label: "r ≥ 0.70", color: getCorrColor(0.72) },
          { label: "r ≥ 0.50", color: getCorrColor(0.58) },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-4 h-3 rounded" style={{ backgroundColor: l.color, border: "1px solid hsl(var(--border))" }} />
            <span className="font-mono text-[10px] text-muted-foreground">{l.label}</span>
          </div>
        ))}
      </div>

      <PsyExample text="Корреляционная матрица показывает, что тревожность и депрессия связаны сильнее (r = .72), чем стресс и тревожность (r = .58). Это согласуется с трансдиагностическим подходом к эмоциональным расстройствам." />
    </div>
  );
};

/* ═══════════════════════════════════════════
   Section 7 — Отношения и классификация
   ═══════════════════════════════════════════ */
const RelationsSection = () => (
  <div className="space-y-6">
    {/* 7a — Equivalence */}
    <div>
      <h4 className="font-display font-semibold text-foreground text-sm mb-3">
        7a. Отношение эквивалентности
      </h4>
      <p className="text-sm text-muted-foreground font-body mb-3">
        Отношение <Tex math="R" /> на множестве <Tex math="A" /> является эквивалентностью, если выполнены три свойства:
      </p>
      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        {[
          { title: "Рефлексивность", formula: "\\forall a \\in A:\\; aRa", example: "Каждый пациент принадлежит своей диагностической категории." },
          { title: "Симметричность", formula: "aRb \\Rightarrow bRa", example: "Если пациент А в одной группе с Б, то и Б — с А." },
          { title: "Транзитивность", formula: "aRb \\land bRc \\Rightarrow aRc", example: "Если А и Б в одном кластере, и Б и В — тоже, то А и В — в одном." },
        ].map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
            <p className="font-display font-semibold text-xs text-foreground mb-1">{p.title}</p>
            <div className="mb-2"><Tex math={p.formula} display /></div>
            <p className="text-[10px] text-muted-foreground font-body">{p.example}</p>
          </div>
        ))}
      </div>

      <PsyExample text="Классификация по DSM-5: каждый класс эквивалентности — диагностическая категория (например, все пациенты с F41.1 = ГТР). Кластерный анализ автоматизирует этот процесс, формируя классы эквивалентности по мере сходства профилей." />

      {/* Visual: equivalence classes */}
      <div className="flex justify-center mt-4">
        <svg viewBox="0 0 320 120" className="w-full max-w-[320px]">
          {/* Class 1 */}
          <rect x="10" y="15" width="90" height="90" rx="14" fill="hsl(var(--module-1))" fillOpacity="0.1" stroke="hsl(var(--module-1))" strokeWidth="1.5" />
          <circle cx="35" cy="50" r="6" fill="hsl(var(--module-1))" fillOpacity="0.5" />
          <circle cx="60" cy="40" r="6" fill="hsl(var(--module-1))" fillOpacity="0.5" />
          <circle cx="50" cy="70" r="6" fill="hsl(var(--module-1))" fillOpacity="0.5" />
          <circle cx="78" cy="65" r="6" fill="hsl(var(--module-1))" fillOpacity="0.5" />
          <text x="55" y="112" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">Депрессия</text>

          {/* Class 2 */}
          <rect x="115" y="15" width="90" height="90" rx="14" fill="hsl(var(--module-2))" fillOpacity="0.1" stroke="hsl(var(--module-2))" strokeWidth="1.5" />
          <circle cx="140" cy="45" r="6" fill="hsl(var(--module-2))" fillOpacity="0.5" />
          <circle cx="165" cy="55" r="6" fill="hsl(var(--module-2))" fillOpacity="0.5" />
          <circle cx="185" cy="40" r="6" fill="hsl(var(--module-2))" fillOpacity="0.5" />
          <text x="160" y="112" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">ГТР</text>

          {/* Class 3 */}
          <rect x="220" y="15" width="90" height="90" rx="14" fill="hsl(var(--module-4))" fillOpacity="0.1" stroke="hsl(var(--module-4))" strokeWidth="1.5" />
          <circle cx="250" cy="50" r="6" fill="hsl(var(--module-4))" fillOpacity="0.5" />
          <circle cx="275" cy="60" r="6" fill="hsl(var(--module-4))" fillOpacity="0.5" />
          <text x="265" y="112" textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">ОКР</text>
        </svg>
      </div>
    </div>

    {/* 7b — Order */}
    <div>
      <h4 className="font-display font-semibold text-foreground text-sm mb-3">
        7b. Отношение порядка
      </h4>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-xs text-foreground mb-1">Частичный порядок</p>
          <p className="text-[11px] text-muted-foreground font-body mb-2">
            Рефлексивность + антисимметричность + транзитивность. Не все элементы сравнимы.
          </p>
          <div className="mb-2"><Tex math="a \le b \;\land\; b \le a \;\Rightarrow\; a = b" display /></div>
          <PsyExample text="Ранжирование предпочтений в психосемантике: «важность» и «интерес» могут быть несравнимы между собой (не всё можно упорядочить)." />
        </div>

        <div className="rounded-xl border border-border bg-card p-5" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-xs text-foreground mb-1">Линейный (полный) порядок</p>
          <p className="text-[11px] text-muted-foreground font-body mb-2">
            Частичный порядок, где все элементы сравнимы.
          </p>
          <div className="mb-2"><Tex math="a_1 < a_2 < a_3 < a_4 < a_5" display /></div>
          <PsyExample text="Шкала Ликерта: «Полностью не согласен» < … < «Полностью согласен» — линейная цепочка. Критерий Манна-Уитни работает с рангами — именно с линейным порядком." />
        </div>
      </div>

      {/* Visual: Likert chain */}
      <div className="flex justify-center">
        <svg viewBox="0 0 360 50" className="w-full max-w-[360px]">
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 40 + i * 72;
            const labels = ["1", "2", "3", "4", "5"];
            const sublabels = ["не согл.", "скорее нет", "нейтр.", "скорее да", "согл."];
            return (
              <g key={i}>
                {i < 4 && <line x1={x + 12} y1={16} x2={x + 60} y2={16} stroke="hsl(var(--border))" strokeWidth="1.5" />}
                {i < 4 && <polygon points={`${x + 56},13 ${x + 60},16 ${x + 56},19`} fill="hsl(var(--muted-foreground))" />}
                <circle cx={x} cy={16} r="10" fill="hsl(var(--module-2))" fillOpacity={0.12 + i * 0.08} stroke="hsl(var(--module-2))" strokeWidth="1.5" />
                <text x={x} y={20} textAnchor="middle" className="fill-foreground text-[10px] font-mono font-semibold">{labels[i]}</text>
                <text x={x} y={42} textAnchor="middle" className="fill-muted-foreground text-[7px] font-mono">{sublabels[i]}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════
   Section 8 — Функции и модели S→R
   ═══════════════════════════════════════════ */

interface MappingProps {
  leftItems: string[];
  rightItems: string[];
  arrows: [number, number][];
  leftLabel: string;
  rightLabel: string;
  colorVar: string;
}

const MappingDiagram = ({ leftItems, rightItems, arrows, leftLabel, rightLabel, colorVar }: MappingProps) => {
  const lx = 50;
  const rx = 220;
  const spacing = 36;
  const topOffset = 30;
  const h = Math.max(leftItems.length, rightItems.length) * spacing + topOffset + 20;
  const accent = `hsl(var(${colorVar}))`;

  return (
    <svg viewBox={`0 0 270 ${h}`} className="w-full max-w-[270px]">
      {/* Left set oval */}
      <ellipse cx={lx} cy={topOffset + (leftItems.length - 1) * spacing / 2} rx="42" ry={leftItems.length * spacing / 2 + 14} fill={accent} fillOpacity="0.06" stroke={accent} strokeWidth="1.5" />
      {/* Right set oval */}
      <ellipse cx={rx} cy={topOffset + (rightItems.length - 1) * spacing / 2} rx="42" ry={rightItems.length * spacing / 2 + 14} fill="hsl(var(--module-3))" fillOpacity="0.06" stroke="hsl(var(--module-3))" strokeWidth="1.5" />

      {/* Arrows */}
      {arrows.map(([from, to], i) => {
        const y1 = topOffset + from * spacing;
        const y2 = topOffset + to * spacing;
        return (
          <g key={i}>
            <line x1={lx + 20} y1={y1} x2={rx - 20} y2={y2} stroke="hsl(var(--muted-foreground))" strokeWidth="1" markerEnd="url(#arrowhead)" />
          </g>
        );
      })}

      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="hsl(var(--muted-foreground))" />
        </marker>
      </defs>

      {/* Left labels */}
      {leftItems.map((item, i) => (
        <text key={item} x={lx} y={topOffset + i * spacing + 4} textAnchor="middle" className="fill-foreground text-[10px] font-mono">{item}</text>
      ))}
      {/* Right labels */}
      {rightItems.map((item, i) => (
        <text key={item} x={rx} y={topOffset + i * spacing + 4} textAnchor="middle" className="fill-foreground text-[10px] font-mono">{item}</text>
      ))}

      {/* Set names */}
      <text x={lx} y={h - 4} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">{leftLabel}</text>
      <text x={rx} y={h - 4} textAnchor="middle" className="fill-muted-foreground text-[9px] font-mono">{rightLabel}</text>
    </svg>
  );
};

const FunctionsSection = () => (
  <div className="space-y-6">
    <p className="text-sm text-muted-foreground font-body">
      Функция <Tex math="f: X \to Y" /> ставит каждому элементу <Tex math="x \in X" /> в
      соответствие единственный элемент <Tex math="y \in Y" />. Это формализует модель
      «стимул → реакция» (S → R).
    </p>

    <div className="grid sm:grid-cols-2 gap-4 mb-2">
      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-xs text-foreground mb-1">Область определения (X)</p>
        <p className="text-[11px] text-muted-foreground">Набор стимулов: визуальные сцены, слова, изображения лиц.</p>
      </div>
      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-xs text-foreground mb-1">Область значений (Y)</p>
        <p className="text-[11px] text-muted-foreground">Набор реакций: время ответа, оценка, выбор категории.</p>
      </div>
    </div>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body">
        <span className="font-semibold text-foreground">Регрессия как функция:</span>{" "}
        Линейная регрессия <Tex math="y = ax + b" /> — частный случай функции, где стимул (предиктор) <Tex math="x" /> отображается в реакцию (зависимую переменную) <Tex math="y" />.
      </p>
    </div>

    {/* Three types of functions */}
    <h4 className="font-display font-semibold text-foreground text-sm">Типы функций и валидность</h4>

    <div className="grid sm:grid-cols-3 gap-4">
      {/* Injection */}
      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-xs text-foreground mb-1">Инъекция (1-к-1)</p>
        <div className="mb-2"><Tex math="f(a) = f(b) \Rightarrow a = b" display /></div>
        <div className="flex justify-center mb-2">
          <MappingDiagram
            leftItems={["STAI", "BDI", "PSS"]}
            rightItems={["Тревожн.", "Депрес.", "Стресс", "??"]}
            arrows={[[0, 0], [1, 1], [2, 2]]}
            leftLabel="Тесты"
            rightLabel="Конструкты"
            colorVar="--module-1"
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-body">Каждый тест измеряет уникальный конструкт, но не все конструкты покрыты.</p>
      </div>

      {/* Surjection */}
      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-xs text-foreground mb-1">Сюръекция (на)</p>
        <div className="mb-2"><Tex math="\forall y \in Y\; \exists x : f(x) = y" display /></div>
        <div className="flex justify-center mb-2">
          <MappingDiagram
            leftItems={["STAI", "BAI", "BDI", "PHQ-9"]}
            rightItems={["Тревожн.", "Депрес."]}
            arrows={[[0, 0], [1, 0], [2, 1], [3, 1]]}
            leftLabel="Тесты"
            rightLabel="Конструкты"
            colorVar="--module-2"
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-body">Все конструкты покрыты, но несколько тестов измеряют одно и то же (избыточность).</p>
      </div>

      {/* Bijection */}
      <div className="rounded-xl border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-xs text-foreground mb-1">Биекция (идеал)</p>
        <div className="mb-2"><Tex math="f \\text{ — инъекция + сюръекция}" display /></div>
        <div className="flex justify-center mb-2">
          <MappingDiagram
            leftItems={["STAI", "BDI", "PSS"]}
            rightItems={["Тревожн.", "Депрес.", "Стресс"]}
            arrows={[[0, 0], [1, 1], [2, 2]]}
            leftLabel="Тесты"
            rightLabel="Конструкты"
            colorVar="--module-4"
          />
        </div>
        <p className="text-[10px] text-muted-foreground font-body">Один тест ↔ один конструкт. Идеал конструктной валидности (на практике редок).</p>
      </div>
    </div>

    <PsyExample text="На практике соответствие «тест → конструкт» обычно ближе к сюръекции: несколько тестов могут измерять тревожность (STAI, BAI, GAD-7). Задача исследователя — обосновать выбор инструмента и стремиться к максимальной дискриминантной валидности." />
  </div>
);

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
const SetTheoryPage = () => (
  <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
        Теория
      </span>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
        Теория множеств для психолога
      </h1>
      <p className="text-lg text-muted-foreground font-body mb-12 max-w-[640px]">
        Математический фундамент, на котором строятся выборки, диагностика и статистика.
      </p>

      <Accordion type="multiple" defaultValue={["basics", "operations", "sampling", "diagnostics", "boolean", "cartesian", "relations", "functions"]} className="space-y-3">
        {[
          { value: "basics", title: "Базовые понятия", content: <BasicsSection /> },
          { value: "operations", title: "Операции над множествами", content: <OperationsSection /> },
          { value: "sampling", title: "Множества в формировании выборки", content: <SamplingSection /> },
          { value: "diagnostics", title: "Множества в психодиагностике", content: <ComorbidityVenn /> },
          { value: "boolean", title: "Булева алгебра и логика фильтрации", content: <BooleanSection /> },
          { value: "cartesian", title: "Декартово произведение и корреляционная матрица", content: <CartesianSection /> },
          { value: "relations", title: "Отношения и классификация", content: <RelationsSection /> },
          { value: "functions", title: "Функции и модели S → R", content: <FunctionsSection /> },
        ].map((s, i) => (
          <motion.div
            key={s.value}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07, ease: [0.2, 0.8, 0.2, 1] as const }}
          >
            <AccordionItem
              value={s.value}
              className="rounded-xl border border-border bg-card px-5 data-[state=open]:shadow-sm transition-shadow"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <AccordionTrigger className="hover:no-underline text-left">
                <span className="font-display font-semibold text-foreground">{s.title}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 pb-5">{s.content}</AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </motion.div>
  </div>
);

export default SetTheoryPage;
