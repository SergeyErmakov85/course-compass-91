import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Download, BookOpen, GraduationCap, Link2, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const anim = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay: i * 0.05, ease: [0.2, 0.8, 0.2, 1] as const },
});

/* ─── Section 1: Textbooks ─── */
const textbooks = [
  { author: "Наследов А.Д.", title: "Математические методы психологического исследования", year: 2012, topic: "Общая методология", access: "Библиотека" },
  { author: "Ермолаев-Томин О.Ю.", title: "Математическая статистика для психологов", year: 2011, topic: "Статистика", access: "Библиотека" },
  { author: "Сидоренко Е.В.", title: "Методы математической обработки в психологии", year: 2003, topic: "Обработка данных", access: "Библиотека" },
  { author: "Field A.", title: "Discovering Statistics Using IBM SPSS Statistics", year: 2024, topic: "SPSS / Статистика", access: "Amazon", url: "https://www.amazon.com/Discovering-Statistics-Using-IBM-SPSS/dp/1526419521" },
  { author: "Navarro D.", title: "Learning Statistics with R", year: 2018, topic: "R / Статистика", access: "Бесплатно онлайн", url: "https://learningstatisticswithr.com/" },
];

const TextbooksSection = () => (
  <section className="mb-14">
    <div className="flex items-center gap-3 mb-5">
      <BookOpen className="w-5 h-5 text-accent" />
      <h2 className="font-display text-xl font-semibold text-foreground">Учебники и пособия</h2>
    </div>
    <div className="overflow-x-auto rounded-xl border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            {["Автор", "Название", "Год", "Тематика", "Доступность"].map((h) => (
              <th key={h} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {textbooks.map((b, i) => (
            <motion.tr key={b.title} {...anim(i)} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-body text-foreground font-medium whitespace-nowrap">{b.author}</td>
              <td className="px-4 py-3 font-body text-foreground">{b.title}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{b.year}</td>
              <td className="px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded">{b.topic}</span>
              </td>
              <td className="px-4 py-3">
                {b.url ? (
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline text-xs font-body">
                    {b.access} <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground font-body">{b.access}</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

/* ─── Section 2: Online courses ─── */
const courses = [
  {
    platform: "Stepik",
    title: "Основы статистики",
    author: "Карпов А.",
    description: "Популярный русскоязычный курс: от описательной статистики до дисперсионного анализа. Много практических заданий с автопроверкой.",
    url: "https://stepik.org/course/76/promo",
    color: "--module-2",
  },
  {
    platform: "Coursera",
    title: "Methods and Statistics in Social Sciences",
    author: "University of Amsterdam",
    description: "Специализация из 5 курсов: от основ до байесовской статистики. Идеальный вариант для тех, кто хочет глубоко разобраться в количественных методах.",
    url: "https://www.coursera.org/specializations/social-science",
    color: "--module-1",
  },
  {
    platform: "YouTube",
    title: "StatQuest with Josh Starmer",
    author: "Josh Starmer",
    description: "Визуальные объяснения статистических концепций — от p-value до машинного обучения. Лучший канал для интуитивного понимания статистики.",
    url: "https://www.youtube.com/@statquest",
    color: "--module-3",
  },
];

const CoursesSection = () => (
  <section className="mb-14">
    <div className="flex items-center gap-3 mb-5">
      <GraduationCap className="w-5 h-5 text-accent" />
      <h2 className="font-display text-xl font-semibold text-foreground">Онлайн-курсы</h2>
    </div>
    <div className="grid sm:grid-cols-3 gap-4">
      {courses.map((c, i) => (
        <motion.a
          key={c.title}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          {...anim(i)}
          className="group rounded-xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded w-fit mb-3"
            style={{ color: `hsl(var(${c.color}))`, backgroundColor: `hsl(var(${c.color}) / 0.1)` }}
          >
            {c.platform}
          </span>
          <h3 className="font-display font-semibold text-foreground text-sm mb-1 group-hover:text-accent transition-colors">{c.title}</h3>
          <p className="text-xs text-muted-foreground font-body mb-3 flex-1">{c.description}</p>
          <span className="text-[11px] text-muted-foreground font-body">{c.author}</span>
        </motion.a>
      ))}
    </div>
  </section>
);

/* ─── Section 3: Useful links ─── */
const linkCategories = [
  {
    category: "Базы данных",
    icon: "🔍",
    items: [
      { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/", desc: "Биомедицинские публикации" },
      { name: "Google Scholar", url: "https://scholar.google.com/", desc: "Академический поиск" },
      { name: "eLibrary.ru", url: "https://elibrary.ru/", desc: "Российская научная библиотека" },
      { name: "PsycINFO (APA)", url: "https://www.apa.org/pubs/databases/psycinfo", desc: "Психологические публикации" },
    ],
  },
  {
    category: "Репозитории опросников",
    icon: "📋",
    items: [
      { name: "PsyToolkit Library", url: "https://www.psytoolkit.org/survey-library/", desc: "Библиотека опросников с демо" },
      { name: "Open Psychometrics", url: "https://openpsychometrics.org/", desc: "Открытые психометрические тесты" },
    ],
  },
  {
    category: "Генераторы размера выборки",
    icon: "📐",
    items: [
      { name: "G*Power", url: "https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower", desc: "Анализ мощности и размера выборки" },
      { name: "ClinCalc", url: "https://clincalc.com/stats/samplesize.aspx", desc: "Онлайн-калькулятор выборки" },
    ],
  },
];

const LinksSection = () => (
  <section className="mb-14">
    <div className="flex items-center gap-3 mb-5">
      <Link2 className="w-5 h-5 text-accent" />
      <h2 className="font-display text-xl font-semibold text-foreground">Полезные ссылки</h2>
    </div>
    <div className="space-y-6">
      {linkCategories.map((cat, ci) => (
        <motion.div key={cat.category} {...anim(ci)}>
          <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <span>{cat.icon}</span> {cat.category}
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {cat.items.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:shadow-[var(--shadow-card-hover)] transition-shadow group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex-1 min-w-0">
                  <span className="font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors">{link.name}</span>
                  <p className="text-xs text-muted-foreground font-body truncate">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ─── Section 4: Cheat sheets carousel ─── */
const cheatSheets = [
  {
    title: "Выбор статистического критерия",
    tag: "Блок-схема",
    color: "--module-1",
    content: [
      "1. Данные количественные? → Да: проверить нормальность → Шапиро-Уилк",
      "2. Нормальные + 2 группы → t-критерий Стьюдента",
      "3. Нормальные + 3+ группы → ANOVA",
      "4. Не нормальные + 2 группы → U Манна-Уитни",
      "5. Не нормальные + 3+ группы → Краскела-Уоллис",
      "6. Данные категориальные? → χ² (хи-квадрат)",
      "7. Связь двух переменных? → Пирсон (норм.) / Спирмен (не норм.)",
    ],
  },
  {
    title: "APA 7th — правила оформления",
    tag: "Стандарт",
    color: "--module-2",
    content: [
      "• Шрифт: Times New Roman 12pt или Calibri 11pt",
      "• Интервал: двойной, поля 2.54 см со всех сторон",
      "• Статистика: t(28) = 2.48, p = .019, d = 0.91",
      "• Таблицы: заголовок над таблицей, курсивом, без вертикальных линий",
      "• Ссылки: (Иванов, 2023) или Иванов (2023)",
      "• Список литературы: APA hanging indent, DOI если есть",
    ],
  },
  {
    title: "Размеры эффекта — интерпретация",
    tag: "Таблица",
    color: "--module-3",
    content: [
      "d Коэна:  малый = 0.2 | средний = 0.5 | большой = 0.8",
      "r Пирсона: малый = 0.1 | средний = 0.3 | большой = 0.5",
      "η²:       малый = 0.01 | средний = 0.06 | большой = 0.14",
      "φ / V Крамера: малый = 0.1 | средний = 0.3 | большой = 0.5",
      "R²:       объяснённая дисперсия в %",
      "⚠ Всегда сообщайте размер эффекта вместе с p-value!",
    ],
  },
];

const CheatSheetsSection = () => {
  const [idx, setIdx] = useState(0);
  const sheet = cheatSheets[idx];

  return (
    <section className="mb-14">
      <div className="flex items-center gap-3 mb-5">
        <FileText className="w-5 h-5 text-accent" />
        <h2 className="font-display text-xl font-semibold text-foreground">Шпаргалки</h2>
      </div>

      {/* Carousel dots */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setIdx((p) => (p - 1 + cheatSheets.length) % cheatSheets.length)} className="p-1 rounded hover:bg-muted transition-colors">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex gap-2">
          {cheatSheets.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
        <button onClick={() => setIdx((p) => (p + 1) % cheatSheets.length)} className="p-1 rounded hover:bg-muted transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <span className="font-mono text-[10px] text-muted-foreground ml-auto">{idx + 1} / {cheatSheets.length}</span>
      </div>

      {/* Card */}
      <motion.div
        key={sheet.title}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="rounded-xl border border-border bg-card p-6"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded"
            style={{ color: `hsl(var(${sheet.color}))`, backgroundColor: `hsl(var(${sheet.color}) / 0.1)` }}
          >
            {sheet.tag}
          </span>
          <h3 className="font-display font-semibold text-foreground">{sheet.title}</h3>
        </div>
        <div className="space-y-1.5">
          {sheet.content.map((line, i) => (
            <p key={i} className="font-mono text-xs text-muted-foreground leading-relaxed">{line}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ─── Downloads ─── */
const DownloadsSection = () => (
  <section>
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
      <div className="flex-1">
        <p className="font-display font-semibold text-sm text-foreground">Критерий χ² — Jupyter Notebook</p>
        <p className="text-xs text-muted-foreground font-body">Интерактивный ноутбук с примерами расчётов хи-квадрат в Python.</p>
      </div>
      <Button asChild variant="default" size="sm" className="shrink-0">
        <a href="/files/Chi_Square.ipynb" download="Chi_Square.ipynb">
          <Download className="mr-2 h-4 w-4" />
          Скачать .ipynb
        </a>
      </Button>
    </div>
  </section>
);

/* ═══════════════════════════════════════════
   Page
   ═══════════════════════════════════════════ */
const ResourcesPage = () => (
  <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
        Библиотека
      </span>
      <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
        Ресурсы
      </h1>
      <p className="text-lg text-muted-foreground font-body mb-12 max-w-[640px]">
        Учебники, курсы, инструменты и шпаргалки для изучения математических методов в психологии.
      </p>

      <TextbooksSection />
      <CoursesSection />
      <LinksSection />
      <CheatSheetsSection />
      <DownloadsSection />
    </motion.div>
  </div>
);

export default ResourcesPage;
