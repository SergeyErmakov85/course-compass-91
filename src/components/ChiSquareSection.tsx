import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChiSquareSection = () => {
  return (
    <section id="chi-square" className="py-[12vh] max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Практический материал
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
          Критерий χ² (хи-квадрат)
        </h2>

        <div className="rounded-xl border border-border bg-card p-6 md:p-8" style={{ boxShadow: "var(--shadow-md)" }}>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Критерий χ² — один из ключевых инструментов статистического анализа в психологии. Он применяется к <strong className="text-foreground">номинальным (категориальным)</strong> данным: пол, диагноз, ответ «да/нет», тип терапии, стратегия совладания и т.п.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <h4 className="font-display font-semibold text-sm text-foreground mb-1">Критерий согласия</h4>
              <p className="text-xs text-muted-foreground font-body">
                Сравнение наблюдаемых частот категорий с теоретическим распределением (например, равные доли при случайном угадывании).
              </p>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg border border-border">
              <h4 className="font-display font-semibold text-sm text-foreground mb-1">Критерий независимости</h4>
              <p className="text-xs text-muted-foreground font-body">
                Проверка связи двух номинальных переменных в выборке (например, тип психообразования и готовность обратиться за помощью).
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <p className="font-display font-semibold text-sm text-foreground">Jupyter Notebook</p>
              <p className="text-xs text-muted-foreground font-body">
                Интерактивный ноутбук с примерами расчётов вручную и в Python (NumPy, SciPy).
              </p>
            </div>
            <Button asChild variant="default" size="sm" className="shrink-0">
              <a href="/files/Chi_Square.ipynb" download="Chi_Square.ipynb">
                <Download className="mr-2 h-4 w-4" />
                Скачать .ipynb
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ChiSquareSection;
