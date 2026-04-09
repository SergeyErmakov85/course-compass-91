import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

type License = "Free" | "Freemium" | "Paid";
type Difficulty = "Beginner" | "Intermediate" | "Advanced";

interface ToolItem {
  name: string;
  purpose: string;
  description: string;
  features: string[];
  usage: string;
  license: License;
  difficulty: Difficulty;
  url: string;
  category: string;
}

const tools: ToolItem[] = [
  // ── Сбор данных ──
  {
    name: "PsyToolkit",
    purpose: "Когнитивные эксперименты онлайн",
    description:
      "Платформа для создания когнитивных экспериментов с высокой точностью измерения времени реакции. Поддерживает опросники и батареи тестов.",
    features: ["Точное измерение RT", "Готовые парадигмы", "Экспорт в CSV", "Бесплатный хостинг"],
    usage: "Создание экспериментов по когнитивной психологии, предъявление стимулов с миллисекундной точностью.",
    license: "Free",
    difficulty: "Intermediate",
    url: "https://www.psytoolkit.org",
    category: "Сбор данных",
  },
  {
    name: "Qualtrics CoreXM",
    purpose: "Профессиональное анкетирование",
    description:
      "Индустриальный стандарт для создания опросов: условная логика, рандомизация блоков, A/B тестирование, интеграция с SPSS.",
    features: ["Условная логика", "Рандомизация", "A/B тесты", "API-интеграции"],
    usage: "Масштабные исследования с разветвлёнными анкетами, корпоративные опросы.",
    license: "Freemium",
    difficulty: "Intermediate",
    url: "https://www.qualtrics.com",
    category: "Сбор данных",
  },
  {
    name: "Google Forms",
    purpose: "Простые опросники",
    description:
      "Бесплатный инструмент для базового анкетирования. Данные автоматически поступают в Google Sheets для анализа.",
    features: ["Бесплатный", "Совместный доступ", "Экспорт в Sheets", "Валидация ответов"],
    usage: "Сбор обратной связи, пилотное тестирование, учебные опросы.",
    license: "Free",
    difficulty: "Beginner",
    url: "https://docs.google.com/forms",
    category: "Сбор данных",
  },

  // ── Статистический анализ ──
  {
    name: "JASP",
    purpose: "Байесовская и частотная статистика",
    description:
      "Свободный статистический пакет с графическим интерфейсом. Байесовская статистика доступна «из коробки» наравне с классическими тестами.",
    features: ["Байесовский анализ", "Drag-and-drop GUI", "APA-таблицы", "Воспроизводимые отчёты"],
    usage: "Описательная статистика, t-тесты, ANOVA, регрессия, факторный анализ.",
    license: "Free",
    difficulty: "Beginner",
    url: "https://jasp-stats.org",
    category: "Статистический анализ",
  },
  {
    name: "Jamovi",
    purpose: "Модульный статпакет на R",
    description:
      "Свободный статистический пакет с интуитивным GUI. Под капотом — R, что даёт расширяемость через модули.",
    features: ["Модульность", "R под капотом", "Живые результаты", "Расширения сообщества"],
    usage: "Учебные курсы статистики, быстрый анализ данных без программирования.",
    license: "Free",
    difficulty: "Beginner",
    url: "https://www.jamovi.org",
    category: "Статистический анализ",
  },
  {
    name: "IBM SPSS Statistics",
    purpose: "Индустриальный стандарт",
    description:
      "Проприетарный статпакет, де-факто стандарт в социальных науках. Мощный синтаксис, обширная документация.",
    features: ["Полный набор тестов", "Синтаксис", "Макросы", "Техподдержка"],
    usage: "Масштабные исследования, диссертации, публикации в рецензируемых журналах.",
    license: "Paid",
    difficulty: "Intermediate",
    url: "https://www.ibm.com/spss",
    category: "Статистический анализ",
  },
  {
    name: "Python + Jupyter",
    purpose: "Продвинутый анализ и автоматизация",
    description:
      "Экосистема Python для анализа данных: pandas для обработки, scipy/pingouin для статистики, matplotlib/seaborn для визуализации. Jupyter Notebook обеспечивает воспроизводимость.",
    features: ["scipy / pingouin", "pandas", "matplotlib", "Воспроизводимость"],
    usage: "NLP-анализ текстов, автоматизация пайплайнов, машинное обучение.",
    license: "Free",
    difficulty: "Advanced",
    url: "https://jupyter.org",
    category: "Статистический анализ",
  },

  // ── Визуализация и отчётность ──
  {
    name: "Datawrapper",
    purpose: "Интерактивные графики без кода",
    description:
      "Онлайн-сервис для создания публикационных графиков, карт и таблиц. Достаточно вставить данные — инструмент сам предложит подходящий тип визуализации.",
    features: ["Без программирования", "Встраивание в веб", "Адаптивные графики", "Экспорт PNG/SVG"],
    usage: "Визуализация результатов для презентаций, отчётов и публикаций.",
    license: "Freemium",
    difficulty: "Beginner",
    url: "https://www.datawrapper.de",
    category: "Визуализация и отчётность",
  },
];

const categories = ["Все", "Сбор данных", "Статистический анализ", "Визуализация и отчётность"];
const difficulties: Difficulty[] = ["Beginner", "Intermediate", "Advanced"];
const difficultyLabels: Record<Difficulty, string> = {
  Beginner: "Начинающий",
  Intermediate: "Средний",
  Advanced: "Продвинутый",
};
const licenseColors: Record<License, string> = {
  Free: "text-emerald-600 bg-emerald-500/10",
  Freemium: "text-amber-600 bg-amber-500/10",
  Paid: "text-rose-600 bg-rose-500/10",
};

const ToolsPage = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeDifficulties, setActiveDifficulties] = useState<Set<Difficulty>>(new Set());

  const toggleDifficulty = (d: Difficulty) => {
    setActiveDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(d)) next.delete(d);
      else next.add(d);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      if (activeCategory !== "Все" && t.category !== activeCategory) return false;
      if (activeDifficulties.size > 0 && !activeDifficulties.has(t.difficulty)) return false;
      return true;
    });
  }, [activeCategory, activeDifficulties]);

  return (
    <div className="py-12 max-w-[1000px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Каталог
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Инструменты
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-8 max-w-[640px]">
          Программное обеспечение и платформы, используемые в курсе — от простых анкет до продвинутого статистического анализа.
        </p>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 rounded-md border transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-muted-foreground border-border hover:border-foreground/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty chips */}
        <div className="flex flex-wrap gap-2 mb-10">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => toggleDifficulty(d)}
              className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border transition-colors ${
                activeDifficulties.has(d)
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-muted-foreground border-border hover:border-accent/40"
              }`}
            >
              {difficultyLabels[d]}
            </button>
          ))}
        </div>

        {/* Tool cards */}
        <motion.div layout className="grid sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((tool) => (
              <motion.a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] as const }}
                className="group rounded-xl border border-border bg-card p-5 hover:border-accent/40 transition-colors block"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-sm flex items-center gap-1.5">
                      {tool.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                    </h3>
                    <p className="text-[11px] text-muted-foreground font-mono">{tool.purpose}</p>
                  </div>
                  <span className={`shrink-0 font-mono text-[10px] px-2 py-0.5 rounded ${licenseColors[tool.license]}`}>
                    {tool.license}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground font-body mb-3">{tool.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-mono text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground italic">
                    {tool.usage}
                  </span>
                </div>

                {/* Difficulty badge */}
                <div className="mt-3 pt-3 border-t border-border">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Уровень: {difficultyLabels[tool.difficulty]}
                  </span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body mt-12">
            Нет инструментов по выбранным фильтрам.
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default ToolsPage;
