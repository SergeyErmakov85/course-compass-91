import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-32 px-6 lg:px-8 max-w-[1200px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="flex items-center gap-3 mb-8">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground bg-secondary px-3 py-1.5 rounded-md">
            Курс лекций
          </span>
          <span className="font-mono text-[11px] text-muted-foreground">
            2024—2025
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 max-w-[900px]">
          Информационные технологии в{" "}
          <span className="text-accent">Психологии</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-[640px] mb-12 font-body">
          От архитектуры данных до когнитивного моделирования. Полный цикл цифровых компетенций для современного психолога.
        </p>

        <div className="flex flex-wrap gap-6 font-mono text-sm">
          <DataChip label="Модули" value="01—04" />
          <DataChip label="Формат" value="Лекции + Практика" />
          <DataChip label="Длительность" value="14 weeks" />
          <DataChip label="Баланс" value="75% / 25%" />
        </div>
      </motion.div>

      {/* Decorative grid */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </section>
  );
};

const DataChip = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-baseline gap-2">
    <span className="text-muted-foreground text-[11px] uppercase tracking-widest">{label}</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);

export default HeroSection;
