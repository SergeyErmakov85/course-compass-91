import { motion } from "framer-motion";

interface ToolData {
  name: string;
  purpose: string;
  description: string;
  features: string[];
  usage: string;
}

const tools: ToolData[] = [
  {
    name: "PsyToolkit",
    purpose: "Платформа для когнитивных экспериментов",
    description:
      "Свободное ПО для создания и проведения психологических экспериментов и опросов онлайн. Отличается высокой точностью измерения времени реакции, что критично для когнитивных тестов.",
    features: [
      "Создание тестов Струпа, Фланкера, задач на память",
      "Интеграция шкал и анкет",
      "Выгрузка «сырых» данных для анализа",
    ],
    usage:
      "Студенты программируют классический эксперимент на время реакции, собирают данные на одногруппниках и анализируют результаты.",
  },
  {
    name: "Qualtrics CoreXM",
    purpose: "Сложное анкетирование и Experience Management",
    description:
      "Индустриальный стандарт для сбора данных. Позволяет реализовывать сложную логику ветвления, рандомизацию блоков вопросов и A/B тестирование стимульного материала.",
    features: [
      "Условная логика отображения (Skip logic)",
      "Контроль качества данных (капчи, таймеры)",
      "Продвинутая генерация отчетов и экспорт",
    ],
    usage:
      "Проектирование комплексного опросника для изучения социальной установки с рандомизацией виньеток для минимизации систематической ошибки.",
  },
];

const ToolsSection = () => {
  return (
    <section id="tools" className="py-[12vh] bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-12"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-3 block">
            Специализированное ПО
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Инструменты диагностики
          </h2>
          <p className="text-primary-foreground/60 max-w-[560px] font-body">
            Практическое освоение решений для сбора данных и проведения экспериментов, востребованных в научной и прикладной психологии.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-xl border border-primary-foreground/10 p-8 bg-primary-foreground/5 hover:border-accent/40 transition-colors"
            >
              <h3 className="font-display text-2xl font-bold mb-1 tracking-tight">{tool.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">
                {tool.purpose}
              </p>
              <p className="text-sm text-primary-foreground/60 mb-5 font-body leading-relaxed">
                {tool.description}
              </p>
              <ul className="space-y-2 mb-6">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-primary-foreground/70">
                    <span className="text-accent mt-0.5 shrink-0">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-lg p-4">
                <p className="text-xs text-primary-foreground/50 uppercase tracking-widest font-mono mb-2">
                  В учебном процессе
                </p>
                <p className="text-sm text-primary-foreground/70 font-body">{tool.usage}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
