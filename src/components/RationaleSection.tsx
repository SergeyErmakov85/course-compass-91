import { motion } from "framer-motion";

const RationaleSection = () => {
  return (
    <section id="rationale" className="py-[12vh] border-y border-border bg-card">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
              Обоснование
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Зачем психологу IT?
            </h2>
            <p className="text-muted-foreground mb-4 font-body">
              Современная психология неразрывно связана с данными, аппаратными методами диагностики и цифровой этикой. Цель курса — преодолеть разрыв между гуманитарным мышлением и технической реальностью.
            </p>
            <div className="border-l-2 border-accent pl-4 py-2 bg-accent/5 rounded-r-lg">
              <p className="text-sm text-foreground/80 font-body">
                Архитектура курса гарантирует, что студент не просто узнает о «модных» VR-технологиях, но будет иметь прочный фундамент для самостоятельной работы с данными.
              </p>
            </div>
          </motion.div>

          {/* Right — Balance visualization */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="bg-muted/30 rounded-xl p-8 border border-border">
              <h3 className="font-display font-semibold text-foreground mb-6 text-sm">Баланс учебного времени</h3>

              {/* Bar visualization */}
              <div className="space-y-6">
                <BalanceBar
                  label="Базовые компьютерные науки"
                  sublabel="Адаптация для психологов"
                  percent={75}
                  color="hsl(var(--accent))"
                />
                <BalanceBar
                  label="Специализированные ИТ"
                  sublabel="Когнитивные науки и терапия"
                  percent={25}
                  color="hsl(var(--module-4))"
                />
              </div>

              <p className="text-[11px] text-muted-foreground font-mono mt-6 uppercase tracking-widest">
                75% времени — прочный фундамент · 25% — погружение в специализацию
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BalanceBar = ({ label, sublabel, percent, color }: { label: string; sublabel: string; percent: number; color: string }) => (
  <div>
    <div className="flex justify-between items-baseline mb-2">
      <div>
        <span className="text-sm font-display font-semibold text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground ml-2 font-body">({sublabel})</span>
      </div>
      <span className="font-mono text-sm font-semibold text-foreground">{percent}%</span>
    </div>
    <div className="h-3 bg-muted rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
      />
    </div>
  </div>
);

export default RationaleSection;
