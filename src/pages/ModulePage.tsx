import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const modulesData = [
  {
    id: 1,
    number: "01",
    title: "Архитектура ПК и Цифровая Среда Психолога",
    type: "basic" as const,
    percent: "15%",
    colorVar: "--module-1",
    description:
      "Изучение принципов работы компьютерных систем, типов носителей информации. Особое внимание — защите персональных данных клиентов, основам шифрования, созданию надежных паролей и правилам гигиены в цифровом пространстве. Правовые основы хранения медицинских и психологических данных.",
    topics: ["Архитектура ПК", "Кибергигиена", "Шифрование", "GDPR"],
    weeks: "1–3",
    sections: [
      { title: "Устройство компьютера", content: "Процессор, память, устройства ввода-вывода. Понимание основ для грамотной настройки рабочего места психолога." },
      { title: "Защита данных", content: "Шифрование дисков, менеджеры паролей, двухфакторная аутентификация. Конфиденциальность клиентских данных." },
      { title: "Цифровая гигиена", content: "Фишинг, социальная инженерия, безопасное использование облачных сервисов в профессиональной практике." },
      { title: "Правовые аспекты", content: "GDPR, ФЗ-152, требования к хранению персональных и медицинских данных." },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Сбор, Обработка и Визуализация Данных",
    type: "basic" as const,
    percent: "40%",
    colorVar: "--module-2",
    description:
      "Продвинутые функции табличных процессоров (Excel/Google Sheets): формулы, ВПР, сводные таблицы, фильтрация выбросов. Введение в JASP/Jamovi. Принципы грамотной визуализации данных: выбор типа графика, избегание манипуляций масштабом.",
    topics: ["Excel", "JASP", "Визуализация", "Статистика", "Сводные таблицы"],
    weeks: "4–8",
    sections: [
      { title: "Электронные таблицы", content: "Формулы, ВПР/ГПР, условное форматирование, работа с большими массивами данных." },
      { title: "Сводные таблицы", content: "Агрегация и кросс-табуляция данных для быстрого анализа результатов исследований." },
      { title: "Статистический анализ", content: "Описательные статистики, нормальность распределения, введение в JASP/Jamovi." },
      { title: "Визуализация", content: "Принципы Тафти, выбор типа графика, избегание манипуляций масштабом и пропорциями." },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Интернет-технологии и Научный Поиск",
    type: "basic" as const,
    percent: "20%",
    colorVar: "--module-3",
    description:
      "Стратегии поиска в PubMed, Google Scholar, eLibrary. Менеджеры цитирования (Zotero/Mendeley). Облачные технологии для совместной работы. Цифровая этика и проблема фейковой информации в психологии.",
    topics: ["PubMed", "Zotero", "Google Scholar", "Облако"],
    weeks: "9–11",
    sections: [
      { title: "Академический поиск", content: "Стратегии поиска в PubMed, Google Scholar, eLibrary. Операторы Boolean, фильтрация результатов." },
      { title: "Менеджеры цитирования", content: "Zotero и Mendeley: импорт, организация библиотеки, автоматическая генерация списков литературы." },
      { title: "Облачные технологии", content: "Google Workspace, совместное редактирование, управление версиями документов." },
      { title: "Цифровая этика", content: "Фейковые новости в психологии, предвзятость алгоритмов, проверка достоверности источников." },
    ],
  },
  {
    id: 4,
    number: "04",
    title: "ИТ в Психодиагностике и Терапии",
    type: "applied" as const,
    percent: "25%",
    colorVar: "--module-4",
    description:
      "Обзор систем автоматизированной психодиагностики. VR/AR в экспозиционной терапии и реабилитации. Введение в когнитивное моделирование и машинное обучение для анализа текстов пациентов. Обзор PsyToolkit и Qualtrics.",
    topics: ["VR/AR", "AI/ML", "PsyToolkit", "Qualtrics", "Профайлинг"],
    weeks: "12–14",
    sections: [
      { title: "Автоматизированная диагностика", content: "Обзор компьютерных тестовых батарей, адаптивное тестирование, нормирование." },
      { title: "VR/AR в терапии", content: "Экспозиционная терапия фобий, реабилитация после инсульта, обучение социальным навыкам." },
      { title: "Машинное обучение", content: "Анализ тональности текстов, NLP для автоматизации транскрипции сессий." },
      { title: "Платформы исследований", content: "PsyToolkit для когнитивных экспериментов, Qualtrics для сложных опросников." },
    ],
  },
];

const ModulePage = () => {
  const { id } = useParams<{ id: string }>();
  const module = modulesData.find((m) => m.id === Number(id));

  if (!module) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="font-display text-2xl font-bold text-foreground">Модуль не найден</h1>
        <Button asChild variant="outline">
          <Link to="/">На главную</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Все модули
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md"
            style={{
              color: `hsl(var(${module.colorVar}))`,
              backgroundColor: `hsl(var(${module.colorVar}) / 0.08)`,
            }}
          >
            Модуль {module.number} · {module.percent}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {module.type === "basic" ? "Базовый" : "Прикладной"} · Недели {module.weeks}
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          {module.title}
        </h1>

        <p className="text-muted-foreground font-body mb-8 text-lg leading-relaxed">
          {module.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-10">
          {module.topics.map((topic) => (
            <span key={topic} className="text-[11px] uppercase tracking-widest font-mono text-muted-foreground bg-muted/50 px-2 py-1 rounded border border-border">
              {topic}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {module.sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-display font-semibold text-foreground mb-2">{section.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ModulePage;
