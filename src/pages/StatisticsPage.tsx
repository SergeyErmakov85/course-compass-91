import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const topics = [
  {
    title: "Описательная статистика",
    content: "Меры центральной тенденции (среднее, медиана, мода), меры разброса (дисперсия, стандартное отклонение, размах). Интерпретация в контексте психологических данных.",
  },
  {
    title: "Нормальное распределение",
    content: "Кривая Гаусса, z-оценки, правило 68-95-99.7. Почему нормальность распределения важна для выбора статистических критериев.",
  },
  {
    title: "Проверка гипотез",
    content: "Нулевая и альтернативная гипотезы, уровень значимости α, p-value, ошибки I и II рода. Практическая vs. статистическая значимость.",
  },
  {
    title: "Критерий χ² (хи-квадрат)",
    content: "Критерий согласия и критерий независимости для категориальных данных. Широко используется в психологии для анализа номинальных переменных.",
  },
  {
    title: "Корреляционный анализ",
    content: "Коэффициенты Пирсона и Спирмена, интерпретация силы и направления связи, корреляция ≠ причинность.",
  },
  {
    title: "Непараметрические методы",
    content: "U-критерий Манна-Уитни, критерий Уилкоксона, критерий Краскела-Уоллиса. Когда данные не подчиняются нормальному распределению.",
  },
];

const StatisticsPage = () => {
  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Теория
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Математическая статистика
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 max-w-[640px]">
          Статистические методы, необходимые для анализа данных психологических исследований — от описательных показателей до проверки гипотез.
        </p>

        <div className="space-y-4 mb-10">
          {topics.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
              className="rounded-xl border border-border bg-card p-6"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h3 className="font-display font-semibold text-foreground mb-2">{t.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{t.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
          <div className="flex-1">
            <p className="font-display font-semibold text-sm text-foreground">Jupyter Notebook: χ²</p>
            <p className="text-xs text-muted-foreground font-body">
              Интерактивный ноутбук с примерами расчётов критерия хи-квадрат.
            </p>
          </div>
          <Button asChild variant="default" size="sm" className="shrink-0">
            <a href="/files/Chi_Square.ipynb" download="Chi_Square.ipynb">
              <Download className="mr-2 h-4 w-4" />
              Скачать .ipynb
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
