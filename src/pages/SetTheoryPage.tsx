import { motion } from "framer-motion";
import { Brain } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "katex/dist/katex.min.css";
import katex from "katex";

const Tex = ({ math, display = false }: { math: string; display?: boolean }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, { throwOnError: false, displayMode: display }),
    }}
  />
);

/* ─── Venn Diagram SVG ─── */
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
        <linearGradient id={`lg-${highlight}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent1} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent2} stopOpacity="0.25" />
        </linearGradient>
        <clipPath id="clip-left"><circle cx="95" cy="80" r="55" /></clipPath>
        <clipPath id="clip-right"><circle cx="165" cy="80" r="55" /></clipPath>
      </defs>

      {/* Universe rect for complement */}
      {complementFill && (
        <rect x="5" y="5" width="250" height="150" rx="12" fill={accent1} fillOpacity="0.12" stroke="hsl(var(--border))" strokeWidth="1" />
      )}

      {/* Left circle body */}
      <circle cx="95" cy="80" r="55" fill={leftFill ? accent1 : "transparent"} fillOpacity={leftFill ? 0.18 : 0} stroke={accent1} strokeWidth="1.5" />

      {/* Right circle body */}
      <circle cx="165" cy="80" r="55" fill={rightFill ? accent2 : "transparent"} fillOpacity={rightFill ? 0.18 : 0} stroke={accent2} strokeWidth="1.5" />

      {/* Intersection overlay */}
      {interFill && (
        <g clipPath="url(#clip-left)">
          <circle cx="165" cy="80" r="55" fill={blended} fillOpacity="0.3" />
        </g>
      )}

      {/* Sym-diff: remove intersection highlight */}
      {highlight === "sym-diff" && (
        <g clipPath="url(#clip-left)">
          <circle cx="165" cy="80" r="55" fill="hsl(var(--background))" fillOpacity="0.9" />
        </g>
      )}

      {/* Diff-left: only left minus intersection */}
      {highlight === "diff-left" && (
        <g clipPath="url(#clip-right)">
          <circle cx="95" cy="80" r="55" fill="hsl(var(--background))" fillOpacity="0.95" />
        </g>
      )}

      {/* Complement: white out circles */}
      {complementFill && (
        <>
          <circle cx="95" cy="80" r="55" fill="hsl(var(--background))" />
          <circle cx="165" cy="80" r="55" fill="hsl(var(--background))" />
          <circle cx="95" cy="80" r="55" fill="none" stroke={accent1} strokeWidth="1.5" />
          <circle cx="165" cy="80" r="55" fill="none" stroke={accent2} strokeWidth="1.5" />
        </>
      )}

      {/* Labels */}
      <text x="72" y="84" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">A</text>
      <text x="188" y="84" textAnchor="middle" className="fill-foreground text-[13px] font-display font-semibold">B</text>
    </svg>
  );
};

/* ─── Psychology example card ─── */
const PsyExample = ({ text }: { text: string }) => (
  <div className="flex gap-3 bg-muted/40 rounded-lg p-4 border border-border mt-3">
    <Brain className="w-5 h-5 text-accent shrink-0 mt-0.5" />
    <p className="text-xs text-muted-foreground font-body italic">{text}</p>
  </div>
);

/* ════════════════════════════════════════════
   Section 1 — Базовые понятия
   ════════════════════════════════════════════ */

const concepts = [
  {
    name: "Множество и элемент",
    formula: "a \\in A",
    definition: "Множество — неупорядоченная совокупность различных объектов (элементов). Запись a ∈ A означает, что элемент a принадлежит множеству A.",
    example: "Пусть A = {тревожность, депрессия, ОКР} — множество диагнозов пациента. Тогда тревожность ∈ A, а шизофрения ∉ A.",
  },
  {
    name: "Пустое и универсальное множества",
    formula: "\\emptyset,\\; U",
    definition: "Пустое множество ∅ не содержит элементов. Универсальное множество U — совокупность всех рассматриваемых элементов.",
    example: "U — все студенты университета. ∅ — множество студентов, набравших 200 баллов по 100-балльной шкале (таких не существует).",
  },
  {
    name: "Подмножество",
    formula: "A \\subseteq B \\;\\Leftrightarrow\\; \\forall x(x \\in A \\Rightarrow x \\in B)",
    definition: "A является подмножеством B, если каждый элемент A также принадлежит B. Собственное подмножество (⊂) исключает равенство множеств.",
    example: "A — клинические психологи, B — все психологи. Тогда A ⊂ B: каждый клинический психолог — психолог, но не наоборот.",
  },
  {
    name: "Мощность множества",
    formula: "|A| = n",
    definition: "Мощность (кардинальное число) — количество элементов в множестве. Для конечных множеств |A| — натуральное число.",
    example: "Если A = {испытуемый₁, испытуемый₂, …, испытуемый₃₀}, то |A| = 30 — размер выборки.",
  },
];

const BasicsSection = () => (
  <div className="space-y-4">
    {concepts.map((c) => (
      <div
        key={c.name}
        className="rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
          <h4 className="font-display font-semibold text-foreground text-sm">{c.name}</h4>
          <span className="shrink-0"><Tex math={c.formula} /></span>
        </div>
        <p className="text-xs text-muted-foreground font-body mb-1">{c.definition}</p>
        <PsyExample text={c.example} />
      </div>
    ))}

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body">
        <span className="font-semibold text-foreground">Ключевой пример:</span> Пусть{" "}
        <Tex math="U" /> — все студенты университета, <Tex math="A" /> — студенты-психологи,{" "}
        <Tex math="B" /> — студенты с высокой тревожностью. Тогда <Tex math="A \cap B" /> —
        тревожные студенты-психологи.
      </p>
    </div>
  </div>
);

/* ════════════════════════════════════════════
   Section 2 — Операции над множествами
   ════════════════════════════════════════════ */

const operations: {
  name: string;
  formula: string;
  formal: string;
  highlight: VennHighlight;
  example: string;
}[] = [
  {
    name: "Объединение",
    formula: "A \\cup B",
    formal: "A \\cup B = \\{x : x \\in A \\;\\lor\\; x \\in B\\}",
    highlight: "union",
    example: "Если A — пациенты с депрессией, B — с тревожностью, то A ∪ B — все пациенты, имеющие хотя бы одно из расстройств.",
  },
  {
    name: "Пересечение",
    formula: "A \\cap B",
    formal: "A \\cap B = \\{x : x \\in A \\;\\land\\; x \\in B\\}",
    highlight: "intersection",
    example: "A ∩ B — пациенты с коморбидностью депрессии и тревожности (оба диагноза одновременно).",
  },
  {
    name: "Разность",
    formula: "A \\setminus B",
    formal: "A \\setminus B = \\{x : x \\in A \\;\\land\\; x \\notin B\\}",
    highlight: "diff-left",
    example: "A \\ B — пациенты с депрессией, но без тревожности. Это «чистая» депрессия без коморбидности.",
  },
  {
    name: "Симметрическая разность",
    formula: "A \\triangle B",
    formal: "A \\triangle B = (A \\setminus B) \\cup (B \\setminus A)",
    highlight: "sym-diff",
    example: "A △ B — пациенты, имеющие ровно одно расстройство (депрессию ИЛИ тревожность, но не оба).",
  },
  {
    name: "Дополнение",
    formula: "\\bar{A} = U \\setminus A",
    formal: "\\bar{A} = \\{x \\in U : x \\notin A\\}",
    highlight: "complement",
    example: "Ā — все студенты университета, НЕ являющиеся психологами (дополнение до генеральной совокупности).",
  },
];

const OperationsSection = () => (
  <div className="space-y-6">
    {operations.map((op) => (
      <div
        key={op.name}
        className="rounded-xl border border-border bg-card p-5"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
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

/* ════════════════════════════════════════════
   Page
   ════════════════════════════════════════════ */

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

      <Accordion type="multiple" defaultValue={["basics", "operations"]} className="space-y-3">
        {/* Section 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <AccordionItem
            value="basics"
            className="rounded-xl border border-border bg-card px-5 data-[state=open]:shadow-sm transition-shadow"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <AccordionTrigger className="hover:no-underline text-left">
              <span className="font-display font-semibold text-foreground">Базовые понятия</span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-5">
              <BasicsSection />
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: [0.2, 0.8, 0.2, 1] as const }}
        >
          <AccordionItem
            value="operations"
            className="rounded-xl border border-border bg-card px-5 data-[state=open]:shadow-sm transition-shadow"
            style={{ boxShadow: "var(--shadow-card)" }}
          >
            <AccordionTrigger className="hover:no-underline text-left">
              <span className="font-display font-semibold text-foreground">Операции над множествами</span>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-5">
              <OperationsSection />
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      </Accordion>
    </motion.div>
  </div>
);

export default SetTheoryPage;
