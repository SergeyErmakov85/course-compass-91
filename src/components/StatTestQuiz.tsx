import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

/* ─── Types ─── */
type Groups = "1" | "2" | "3+";
type Dependence = "paired" | "independent";
type Normality = "yes" | "no" | "unknown";
type VarType = "quantitative" | "ordinal" | "nominal";

interface Answers {
  groups?: Groups;
  dependence?: Dependence;
  normality?: Normality;
  varType?: VarType;
}

interface Result {
  name: string;
  description: string;
  formula?: string;
}

/* ─── Decision tree ─── */
const resolve = (a: Answers): Result => {
  const { groups, dependence, normality, varType } = a;

  if (varType === "nominal")
    return { name: "Критерий χ² (хи-квадрат)", description: "Используется для анализа связи между двумя номинальными переменными. Сравнивает наблюдаемые частоты с ожидаемыми.", formula: "χ² = Σ (O−E)² / E" };

  if (groups === "1")
    return normality === "yes"
      ? { name: "Одновыборочный t-критерий", description: "Сравнение среднего одной выборки с известным значением генеральной совокупности.", formula: "t = (M − μ₀) / (s / √n)" }
      : { name: "Критерий знаков / Уилкоксона", description: "Непараметрическая альтернатива одновыборочному t-критерию для данных, не подчиняющихся нормальному распределению." };

  if (groups === "2" && dependence === "independent") {
    if (normality === "yes" && varType === "quantitative")
      return { name: "t-критерий Стьюдента (независимые)", description: "Сравнение средних двух независимых групп при нормальном распределении данных.", formula: "t = (M₁ − M₂) / √(s²₁/n₁ + s²₂/n₂)" };
    return { name: "U-критерий Манна-Уитни", description: "Непараметрическая альтернатива t-критерию для независимых выборок. Работает с рангами, не требует нормальности." };
  }

  if (groups === "2" && dependence === "paired") {
    if (normality === "yes" && varType === "quantitative")
      return { name: "t-критерий для связанных выборок", description: "Сравнение средних в двух измерениях одних и тех же испытуемых (напр., до и после вмешательства).", formula: "t = M_d / (s_d / √n)" };
    return { name: "Критерий Уилкоксона", description: "Непараметрическая альтернатива парному t-критерию. Анализирует ранги разностей между связанными наблюдениями." };
  }

  if (groups === "3+" && dependence === "independent") {
    if (normality === "yes" && varType === "quantitative")
      return { name: "Однофакторный дисперсионный анализ (ANOVA)", description: "Сравнение средних трёх и более независимых групп. Проверяет, различаются ли группы значимо.", formula: "F = MS_между / MS_внутри" };
    return { name: "Критерий Краскела-Уоллиса", description: "Непараметрическая альтернатива ANOVA для трёх и более независимых групп. Основан на рангах." };
  }

  if (groups === "3+" && dependence === "paired") {
    if (normality === "yes" && varType === "quantitative")
      return { name: "ANOVA с повторными измерениями", description: "Сравнение средних в трёх и более условиях для одних и тех же испытуемых." };
    return { name: "Критерий Фридмана", description: "Непараметрическая альтернатива ANOVA с повторными измерениями." };
  }

  return { name: "Корреляция", description: normality === "yes" ? "Коэффициент корреляции Пирсона (r) для линейной связи между двумя количественными переменными." : "Коэффициент корреляции Спирмена (ρ) — ранговая корреляция, не требующая нормальности." };
};

/* ─── Step config ─── */
interface Option { value: string; label: string; sub?: string }
interface Step { key: keyof Answers; question: string; options: Option[] }

const steps: Step[] = [
  {
    key: "groups",
    question: "Сколько у вас групп / условий?",
    options: [
      { value: "1", label: "1 группа", sub: "Сравнение с нормой" },
      { value: "2", label: "2 группы", sub: "Экспериментальная vs контрольная" },
      { value: "3+", label: "3+ группы", sub: "Несколько условий" },
    ],
  },
  {
    key: "dependence",
    question: "Связанные или независимые выборки?",
    options: [
      { value: "paired", label: "Связанные", sub: "Одни и те же люди (до/после)" },
      { value: "independent", label: "Независимые", sub: "Разные люди в группах" },
    ],
  },
  {
    key: "normality",
    question: "Данные нормально распределены?",
    options: [
      { value: "yes", label: "Да", sub: "Шапиро-Уилк p > .05" },
      { value: "no", label: "Нет", sub: "Распределение скошено" },
      { value: "unknown", label: "Не знаю", sub: "Проверьте критерием Шапиро-Уилка" },
    ],
  },
  {
    key: "varType",
    question: "Тип зависимой переменной?",
    options: [
      { value: "quantitative", label: "Количественная", sub: "Баллы, время, IQ…" },
      { value: "ordinal", label: "Порядковая", sub: "Ранги, шкала Ликерта" },
      { value: "nominal", label: "Номинальная", sub: "Пол, диагноз, да/нет" },
    ],
  },
];

/* ─── Component ─── */
const StatTestQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const totalSteps = steps.length;
  const progress = showResult ? 100 : (currentStep / totalSteps) * 100;

  const handleSelect = (key: keyof Answers, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep((s) => s + 1);
      } else {
        // Treat "unknown" normality as "no"
        if (updated.normality === "unknown") updated.normality = "no";
        setAnswers(updated);
        setShowResult(true);
      }
    }, 250);
  };

  const goBack = () => {
    if (showResult) {
      setShowResult(false);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const result = showResult ? resolve(answers) : null;

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
      {/* Progress bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
              {showResult ? "Результат" : `Шаг ${currentStep + 1} из ${totalSteps}`}
            </span>
          </div>
          {(currentStep > 0 || showResult) && (
            <div className="flex gap-2">
              <button onClick={goBack} className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-3 h-3" /> Назад
              </button>
              <button onClick={reset} className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="w-3 h-3" /> Сначала
              </button>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`step-${currentStep}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h3 className="font-display font-semibold text-foreground text-lg mb-4">
                {steps[currentStep].question}
              </h3>
              <div className="grid gap-3">
                {steps[currentStep].options.map((opt) => {
                  const isSelected = answers[steps[currentStep].key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(steps[currentStep].key, opt.value)}
                      className={`text-left rounded-lg border p-4 transition-all ${
                        isSelected
                          ? "border-accent bg-accent/5 shadow-sm"
                          : "border-border hover:border-accent/40 hover:bg-muted/30"
                      }`}
                    >
                      <span className="font-display font-semibold text-sm text-foreground">{opt.label}</span>
                      {opt.sub && <p className="text-xs text-muted-foreground font-body mt-0.5">{opt.sub}</p>}
                    </button>
                  );
                })}
              </div>

              {/* "Unknown" hint */}
              {steps[currentStep].key === "normality" && (
                <p className="text-[11px] text-muted-foreground font-body mt-3 italic">
                  Совет: используйте критерий Шапиро-Уилка (n {"<"} 50) или Колмогорова-Смирнова (n ≥ 50) для проверки нормальности.
                </p>
              )}
            </motion.div>
          ) : result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-foreground text-xl">{result.name}</h3>
                  {result.formula && (
                    <p className="font-mono text-sm text-accent mt-1">{result.formula}</p>
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-body mb-4">{result.description}</p>

              {/* Summary of choices */}
              <div className="bg-muted/40 rounded-lg p-4 border border-border mb-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">Ваши ответы</p>
                <div className="flex flex-wrap gap-2">
                  {answers.groups && (
                    <span className="font-mono text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {answers.groups === "1" ? "1 группа" : answers.groups === "2" ? "2 группы" : "3+ группы"}
                    </span>
                  )}
                  {answers.dependence && (
                    <span className="font-mono text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {answers.dependence === "paired" ? "связанные" : "независимые"}
                    </span>
                  )}
                  {answers.normality && (
                    <span className="font-mono text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {answers.normality === "yes" ? "нормальные" : "ненормальные"}
                    </span>
                  )}
                  {answers.varType && (
                    <span className="font-mono text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded">
                      {answers.varType === "quantitative" ? "количественная" : answers.varType === "ordinal" ? "порядковая" : "номинальная"}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={reset}
                className="inline-flex items-center gap-2 font-mono text-[11px] text-accent hover:underline"
              >
                <ArrowRight className="w-3 h-3" /> Попробовать другую комбинацию
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StatTestQuiz;
