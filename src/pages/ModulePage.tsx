import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, BookOpen, Wrench, ClipboardList, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Topic {
  title: string;
  content: string;
}

interface Assignment {
  title: string;
  description: string;
  result: string;
}

interface Tool {
  name: string;
  description: string;
  link?: string;
}

interface Source {
  author: string;
  title: string;
  year: string;
}

interface ModuleDetail {
  id: number;
  number: string;
  title: string;
  type: "basic" | "applied";
  percent: string;
  colorVar: string;
  weeks: string;
  description: string;
  topics: Topic[];
  assignments: Assignment[];
  tools: Tool[];
  sources: Source[];
}

const modulesData: ModuleDetail[] = [
  {
    id: 1,
    number: "01",
    title: "Архитектура ПК и Цифровая Среда Психолога",
    type: "basic",
    percent: "15%",
    colorVar: "--module-1",
    weeks: "1–3",
    description:
      "Изучение принципов работы компьютерных систем, типов носителей информации. Особое внимание — защите персональных данных клиентов, основам шифрования, созданию надежных паролей и правилам гигиены в цифровом пространстве.",
    topics: [
      {
        title: "Системы счисления и кодирование информации",
        content:
          "Двоичная, восьмеричная и шестнадцатеричная системы. Кодирование текста (ASCII, UTF-8), изображений и звука. Понимание того, как компьютер хранит психологические данные на уровне битов.",
      },
      {
        title: "Операционные системы: файловая система, процессы",
        content:
          "Структура файловых систем (NTFS, APFS, ext4). Управление процессами и памятью. Практические навыки организации рабочего пространства психолога: иерархия папок для клиентских данных, исследований и отчётов.",
      },
      {
        title: "Резервное копирование и облачное хранение",
        content:
          "Стратегии 3-2-1 для резервного копирования. Сравнение облачных сервисов (Google Drive, OneDrive, Яндекс.Диск) с точки зрения безопасности и конфиденциальности клиентских данных.",
      },
      {
        title: "Законодательство: ФЗ-152, GDPR, врачебная тайна",
        content:
          "Правовые основы обработки персональных данных в России и ЕС. Особенности хранения медицинских и психологических записей. Информированное согласие на обработку данных в цифровом формате.",
      },
      {
        title: "Парольные менеджеры и двухфакторная аутентификация",
        content:
          "Обзор менеджеров паролей (Bitwarden, KeePass, 1Password). Настройка 2FA через TOTP и аппаратные ключи. Создание политики паролей для частной практики.",
      },
    ],
    assignments: [
      {
        title: "Аудит цифровой безопасности",
        description: "Провести аудит собственных учётных записей и устройств по чек-листу кибергигиены.",
        result: "Отчёт с выявленными уязвимостями и планом их устранения.",
      },
      {
        title: "Настройка безопасного рабочего места",
        description: "Настроить шифрование диска, менеджер паролей и 2FA на учебном компьютере.",
        result: "Скриншоты настроек и краткая инструкция для коллег.",
      },
      {
        title: "Анализ политики конфиденциальности",
        description: "Проанализировать политику конфиденциальности популярного психологического сервиса на соответствие ФЗ-152.",
        result: "Таблица соответствия требованиям закона с рекомендациями.",
      },
    ],
    tools: [
      { name: "Bitwarden", description: "Менеджер паролей с открытым исходным кодом", link: "https://bitwarden.com" },
      { name: "VeraCrypt", description: "Шифрование дисков и контейнеров", link: "https://veracrypt.fr" },
      { name: "Google Workspace", description: "Облачное хранение и совместная работа", link: "https://workspace.google.com" },
    ],
    sources: [
      { author: "Столлингс У.", title: "Компьютерные сети и защита информации", year: "2021" },
      { author: "Шнайер Б.", title: "Секреты и ложь: безопасность данных в цифровом мире", year: "2020" },
      { author: "Роскомнадзор", title: "Методические рекомендации по ФЗ-152", year: "2023" },
      { author: "ENISA", title: "Handbook on Security of Personal Data Processing", year: "2022" },
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Сбор, Обработка и Визуализация Данных",
    type: "basic",
    percent: "40%",
    colorVar: "--module-2",
    weeks: "4–8",
    description:
      "Продвинутые функции табличных процессоров, введение в статистические пакеты и принципы грамотной визуализации данных для психологических исследований.",
    topics: [
      {
        title: "Типы данных и шкалы измерений (Стивенс)",
        content:
          "Номинальная, порядковая, интервальная и шкала отношений. Влияние типа шкалы на выбор статистического метода. Примеры из психологических опросников и тестов.",
      },
      {
        title: "Формулы и функции Excel для психолога",
        content:
          "СРЗНАЧ, СТАНДОТКЛОН, СЧЁТЕСЛИ, ВПР — базовые функции для обработки данных. Условное форматирование для визуального анализа. Построение формул для автоматического подсчёта баллов тестов.",
      },
      {
        title: "Очистка данных: выбросы, пропуски, дубликаты",
        content:
          "Методы обнаружения выбросов (z-score, IQR). Стратегии работы с пропущенными данными (listwise, pairwise, импутация). Идентификация и удаление дубликатов в больших датасетах.",
      },
      {
        title: "Описательная статистика в JASP/Jamovi",
        content:
          "Импорт данных, расчёт мер центральной тенденции и разброса. Проверка нормальности распределения (Шапиро-Уилк, Q-Q plot). Интерфейс и возможности свободных статистических пакетов.",
      },
      {
        title: "Визуализация: гистограммы, боксплоты, скаттерплоты",
        content:
          "Принципы Эдварда Тафти. Выбор типа графика в зависимости от данных. Частые ошибки визуализации: обрезание осей, 3D-эффекты, pie charts для большого числа категорий.",
      },
      {
        title: "Сводные таблицы и кросс-табуляция",
        content:
          "Агрегирование данных по группам. Построение таблиц сопряжённости. Анализ частот и процентов для категориальных переменных. Фильтры и срезы данных.",
      },
    ],
    assignments: [
      {
        title: "Обработка результатов опросника",
        description: "Импортировать данные психологического опросника (50+ респондентов), очистить, рассчитать шкалы.",
        result: "Таблица с чистыми данными и рассчитанными шкалами, отчёт об очистке.",
      },
      {
        title: "Визуализация результатов исследования",
        description: "Построить набор графиков для представления результатов: гистограмму, боксплот и скаттерплот.",
        result: "Файл с графиками и пояснительной запиской о выбранных типах визуализации.",
      },
      {
        title: "Анализ в JASP",
        description: "Провести описательный анализ датасета в JASP, включая проверку нормальности.",
        result: "Экспортированный отчёт JASP с интерпретацией результатов.",
      },
    ],
    tools: [
      { name: "Microsoft Excel", description: "Табличный процессор для обработки данных", link: "https://www.microsoft.com/microsoft-365/excel" },
      { name: "Google Sheets", description: "Облачные таблицы для совместной работы", link: "https://sheets.google.com" },
      { name: "JASP", description: "Свободный статистический пакет с GUI", link: "https://jasp-stats.org" },
      { name: "Jamovi", description: "Статистический пакет на базе R", link: "https://www.jamovi.org" },
    ],
    sources: [
      { author: "Наследов А.Д.", title: "Математические методы психологического исследования", year: "2022" },
      { author: "Tufte E.", title: "The Visual Display of Quantitative Information", year: "2001" },
      { author: "Field A.", title: "Discovering Statistics Using IBM SPSS Statistics", year: "2024" },
      { author: "Стивенс С.С.", title: "О теории шкал измерения", year: "1946" },
      { author: "Waskom M.", title: "Seaborn: statistical data visualization", year: "2021" },
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Интернет-технологии и Научный Поиск",
    type: "basic",
    percent: "20%",
    colorVar: "--module-3",
    weeks: "9–11",
    description:
      "Стратегии эффективного поиска научной литературы, менеджеры цитирования и критическая оценка информации в эпоху информационного шума.",
    topics: [
      {
        title: "Булевы операторы в поисковых запросах (AND, OR, NOT)",
        content:
          "Построение сложных поисковых запросов для PubMed, Google Scholar и eLibrary. Комбинирование терминов, использование кавычек и подстановочных символов. Стратегия PICO для формулирования запроса.",
      },
      {
        title: "PRISMA-протокол для систематического обзора",
        content:
          "Этапы систематического обзора литературы: идентификация, скрининг, оценка, включение. PRISMA-диаграмма. Практика регистрации протоколов обзора в PROSPERO.",
      },
      {
        title: "Менеджеры цитирования: Zotero vs Mendeley — сравнение",
        content:
          "Установка, импорт источников из браузера, организация библиотеки. Автоматическая генерация списков литературы в Word и Google Docs. Сравнение функциональности, облачного хранения и совместного доступа.",
      },
      {
        title: "Google Forms и Google Sheets для совместного сбора данных",
        content:
          "Создание онлайн-опросников с различными типами вопросов. Настройка валидации ответов. Автоматический экспорт в Sheets и базовый анализ данных.",
      },
      {
        title: "Распознавание фейковых исследований: чек-лист",
        content:
          "Признаки хищнических журналов (Beall's list). Проверка через Retraction Watch. Оценка методологического качества: размер выборки, p-hacking, HARKing. Критический анализ пресс-релизов.",
      },
    ],
    assignments: [
      {
        title: "Систематический поиск литературы",
        description: "Провести поиск по заданной теме в трёх базах данных с использованием булевых операторов.",
        result: "PRISMA-диаграмма и таблица найденных источников с аннотациями.",
      },
      {
        title: "Библиотека в Zotero",
        description: "Создать тематическую библиотеку из 20+ источников, организовать коллекции и теги.",
        result: "Экспортированная библиотека и автоматически сгенерированный список литературы в APA 7.",
      },
      {
        title: "Анализ фейкового исследования",
        description: "Проанализировать предложенную статью по чек-листу критической оценки.",
        result: "Заполненный чек-лист с обоснованием оценок по каждому критерию.",
      },
    ],
    tools: [
      { name: "Zotero", description: "Свободный менеджер библиографии", link: "https://www.zotero.org" },
      { name: "Mendeley", description: "Менеджер цитирования от Elsevier", link: "https://www.mendeley.com" },
      { name: "Google Scholar", description: "Поиск научных публикаций", link: "https://scholar.google.com" },
      { name: "PubMed", description: "База данных биомедицинской литературы", link: "https://pubmed.ncbi.nlm.nih.gov" },
    ],
    sources: [
      { author: "Higgins J., Thomas J.", title: "Cochrane Handbook for Systematic Reviews of Interventions", year: "2023" },
      { author: "Moher D. et al.", title: "PRISMA 2020 explanation and elaboration", year: "2021" },
      { author: "Beall J.", title: "Predatory Publishing: An Emerging Threat", year: "2021" },
      { author: "Gusenbauer M., Haddaway N.", title: "Which academic search systems are suitable for systematic reviews?", year: "2020" },
    ],
  },
  {
    id: 4,
    number: "04",
    title: "ИТ в Психодиагностике и Терапии",
    type: "applied",
    percent: "25%",
    colorVar: "--module-4",
    weeks: "12–14",
    description:
      "Обзор передовых технологий в психологической практике: от VR-терапии до анализа текстов методами искусственного интеллекта.",
    topics: [
      {
        title: "Автоматизированные психодиагностические комплексы",
        content:
          "Обзор платформ компьютерной психодиагностики (1С:Психодиагностика, Иматон). Адаптивное тестирование (CAT). Автоматическая интерпретация профилей и генерация отчётов. Вопросы валидности компьютерных версий тестов.",
      },
      {
        title: "VR-среды для экспозиционной терапии (обзор платформ)",
        content:
          "Платформы Psious, Limbix, BehaVR для лечения фобий и ПТСР. Создание градуированных иерархий экспозиции. Результаты мета-анализов эффективности VR-терапии. Технические требования и стоимость.",
      },
      {
        title: "Чат-боты в психологическом консультировании",
        content:
          "Обзор Woebot, Wysa, Replika. Возможности и ограничения AI-консультирования. Этические дилеммы: конфиденциальность, границы компетенции, кризисные ситуации. Регуляторные перспективы.",
      },
      {
        title: "Анализ текстов пациентов методами NLP",
        content:
          "Анализ тональности (sentiment analysis) дневниковых записей. Тематическое моделирование (LDA) транскриптов сессий. LIWC для лингвистического анализа. Этические рамки автоматизированного анализа.",
      },
      {
        title: "Eye-tracking и физиологические датчики в UX-исследованиях",
        content:
          "Технология eye-tracking: фиксации, саккады, тепловые карты. Измерение кожно-гальванической реакции (КГР), ЧСС и ЭЭГ в UX-исследованиях. Интеграция данных для комплексной оценки пользовательского опыта.",
      },
    ],
    assignments: [
      {
        title: "Обзор VR-платформы",
        description: "Подготовить структурированный обзор одной VR-платформы для терапии по заданным критериям.",
        result: "Презентация с описанием платформы, доказательной базой и SWOT-анализом.",
      },
      {
        title: "Анализ тональности текстов",
        description: "Провести sentiment-анализ набора текстов (дневниковые записи) с помощью онлайн-инструментов или Python.",
        result: "Отчёт с визуализацией динамики тональности и интерпретацией результатов.",
      },
      {
        title: "Этическая экспертиза чат-бота",
        description: "Протестировать психологического чат-бота и оценить его по этическим критериям APA.",
        result: "Заполненная матрица этической оценки с рекомендациями.",
      },
    ],
    tools: [
      { name: "PsyToolkit", description: "Платформа для когнитивных экспериментов", link: "https://www.psytoolkit.org" },
      { name: "Qualtrics", description: "Профессиональная платформа для опросов", link: "https://www.qualtrics.com" },
      { name: "LIWC", description: "Лингвистический анализ текстов", link: "https://www.liwc.app" },
      { name: "Tobii Pro", description: "Eye-tracking для исследований", link: "https://www.tobii.com" },
    ],
    sources: [
      { author: "Mohr D. et al.", title: "Digital Mental Health: Current Status and Future Directions", year: "2023" },
      { author: "Carl E. et al.", title: "Virtual reality exposure therapy for anxiety: A meta-analysis", year: "2019" },
      { author: "Tausczik Y., Pennebaker J.", title: "The Psychological Meaning of Words: LIWC and Computerized Text Analysis", year: "2010" },
      { author: "Vaidyam A. et al.", title: "Chatbots and Conversational Agents in Mental Health", year: "2019" },
      { author: "Duchowski A.", title: "Eye Tracking Methodology: Theory and Practice", year: "2017" },
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.2, 0.8, 0.2, 1] as const },
  }),
};

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

  const accentColor = `hsl(var(${module.colorVar}))`;
  const accentBg = `hsl(var(${module.colorVar}) / 0.08)`;
  const accentBorder = `hsl(var(${module.colorVar}) / 0.2)`;

  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Все модули
        </Link>

        {/* Hero */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-md font-semibold"
            style={{ color: accentColor, backgroundColor: accentBg }}
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

        <p className="text-muted-foreground font-body mb-12 text-lg leading-relaxed">
          {module.description}
        </p>
      </motion.div>

      {/* Темы занятий */}
      <motion.section
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-14"
      >
        <div className="flex items-center gap-2 mb-5">
          <GraduationCap className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-bold text-foreground">Темы занятий</h2>
        </div>
        <Accordion type="single" collapsible className="space-y-2">
          {module.topics.map((topic, i) => (
            <AccordionItem
              key={i}
              value={`topic-${i}`}
              className="rounded-xl border px-5 data-[state=open]:shadow-sm transition-shadow"
              style={{
                borderColor: accentBorder,
                backgroundColor: accentBg,
              }}
            >
              <AccordionTrigger className="hover:no-underline text-left gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[11px] font-bold shrink-0 w-6 h-6 flex items-center justify-center rounded"
                    style={{ color: accentColor, backgroundColor: `hsl(var(${module.colorVar}) / 0.15)` }}
                  >
                    {i + 1}
                  </span>
                  <span className="font-display font-semibold text-sm text-foreground">{topic.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground font-body pl-9">
                {topic.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.section>

      {/* Практические задания */}
      <motion.section
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-14"
      >
        <div className="flex items-center gap-2 mb-5">
          <ClipboardList className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-bold text-foreground">Практические задания</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {module.assignments.map((a, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-display font-semibold text-foreground text-sm">{a.title}</h3>
              <p className="text-xs text-muted-foreground font-body flex-1">{a.description}</p>
              <div
                className="text-[11px] font-mono rounded-md px-3 py-2"
                style={{ color: accentColor, backgroundColor: accentBg, border: `1px solid ${accentBorder}` }}
              >
                <span className="font-semibold">Результат:</span> {a.result}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Рекомендуемые инструменты */}
      <motion.section
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="mb-14"
      >
        <div className="flex items-center gap-2 mb-5">
          <Wrench className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-bold text-foreground">Рекомендуемые инструменты</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {module.tools.map((tool, i) => (
            <a
              key={i}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 hover:border-accent transition-colors"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div>
                <span className="font-display font-semibold text-sm text-foreground">{tool.name}</span>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{tool.description}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 ml-3" />
            </a>
          ))}
        </div>
      </motion.section>

      {/* Литература модуля */}
      <motion.section
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <div className="flex items-center gap-2 mb-5">
          <BookOpen className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-display text-xl font-bold text-foreground">Литература модуля</h2>
        </div>
        <ol className="space-y-3 list-decimal list-inside">
          {module.sources.map((s, i) => (
            <li key={i} className="text-sm text-muted-foreground font-body">
              <span className="text-foreground font-medium">{s.author}</span>{" "}
              ({s.year}). <em>{s.title}</em>.
            </li>
          ))}
        </ol>
      </motion.section>
    </div>
  );
};

export default ModulePage;
