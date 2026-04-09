import { motion } from "framer-motion";

const sections = [
  {
    title: "Множества и операции",
    content: "Множество — базовое понятие математики. Операции объединения (∪), пересечения (∩), разности (\\) и дополнения позволяют формализовать логические связи между категориями данных.",
  },
  {
    title: "Диаграммы Венна",
    content: "Визуализация пересечений множеств. Широко используются в психологии для отображения коморбидности, пересечения симптомов и общих факторов в разных шкалах.",
  },
  {
    title: "Декартово произведение",
    content: "Все возможные пары элементов из двух множеств. Основа для понимания таблиц сопряжённости и корреляционных матриц.",
  },
  {
    title: "Применение в психологии",
    content: "Логические операции над множествами используются при формулировке критериев включения/исключения в выборке, при кодировании категорий и при описании таксономий расстройств (DSM/МКБ).",
  },
];

const SetTheoryPage = () => {
  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Теория
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Теория множеств
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 max-w-[640px]">
          Фундаментальные концепции, лежащие в основе работы с данными, классификациями и логическими структурами в психологических исследованиях.
        </p>

        <div className="space-y-4">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{s.content}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SetTheoryPage;
