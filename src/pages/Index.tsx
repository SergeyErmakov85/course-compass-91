import { useState } from "react";
import { motion } from "framer-motion";
import CourseNav from "@/components/CourseNav";
import HeroSection from "@/components/HeroSection";
import RationaleSection from "@/components/RationaleSection";
import ModuleCard from "@/components/ModuleCard";
import type { ModuleData } from "@/components/ModuleCard";
import ToolsSection from "@/components/ToolsSection";
import MethodsSection from "@/components/MethodsSection";
import ChiSquareSection from "@/components/ChiSquareSection";

const modules: ModuleData[] = [
  {
    id: 1,
    number: "01",
    title: "Архитектура ПК и Цифровая Среда Психолога",
    type: "basic",
    percent: "15%",
    summary: "Основы аппаратного обеспечения, защита данных и цифровая гигиена.",
    details:
      "Изучение принципов работы компьютерных систем, типов носителей информации. Особое внимание — защите персональных данных клиентов, основам шифрования, созданию надежных паролей и правилам гигиены в цифровом пространстве. Правовые основы хранения медицинских и психологических данных.",
    topics: ["Архитектура ПК", "Кибергигиена", "Шифрование", "GDPR"],
    colorVar: "--module-1",
  },
  {
    id: 2,
    number: "02",
    title: "Сбор, Обработка и Визуализация Данных",
    type: "basic",
    percent: "40%",
    summary: "От сырых таблиц к наглядным результатам. Самый объёмный базовый модуль.",
    details:
      "Продвинутые функции табличных процессоров (Excel/Google Sheets): формулы, ВПР, сводные таблицы, фильтрация выбросов. Введение в JASP/Jamovi. Принципы грамотной визуализации данных: выбор типа графика, избегание манипуляций масштабом.",
    topics: ["Excel", "JASP", "Визуализация", "Статистика", "Сводные таблицы"],
    colorVar: "--module-2",
  },
  {
    id: 3,
    number: "03",
    title: "Интернет-технологии и Научный Поиск",
    type: "basic",
    percent: "20%",
    summary: "Навигация в море информации, академические базы и облачные сервисы.",
    details:
      "Стратегии поиска в PubMed, Google Scholar, eLibrary. Менеджеры цитирования (Zotero/Mendeley). Облачные технологии для совместной работы. Цифровая этика и проблема фейковой информации в психологии.",
    topics: ["PubMed", "Zotero", "Google Scholar", "Облако"],
    colorVar: "--module-3",
  },
  {
    id: 4,
    number: "04",
    title: "ИТ в Психодиагностике и Терапии",
    type: "applied",
    percent: "25%",
    summary: "VR/AR, AI, когнитивное моделирование и специализированные платформы.",
    details:
      "Обзор систем автоматизированной психодиагностики. VR/AR в экспозиционной терапии и реабилитации. Введение в когнитивное моделирование и машинное обучение для анализа текстов пациентов. Обзор PsyToolkit и Qualtrics.",
    topics: ["VR/AR", "AI/ML", "PsyToolkit", "Qualtrics", "Профайлинг"],
    colorVar: "--module-4",
  },
];

const Index = () => {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <CourseNav />
      <HeroSection />
      <RationaleSection />

      {/* Syllabus Section */}
      <section id="syllabus" className="py-[12vh] max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
            Curriculum
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Учебные модули
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              isHovered={hoveredModule === null ? null : hoveredModule === mod.id}
              onHover={() => setHoveredModule(mod.id)}
              onLeave={() => setHoveredModule(null)}
            />
          ))}
        </div>
      </section>

      <ToolsSection />
      <ChiSquareSection />
      <MethodsSection />

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-card">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
          <span className="text-sm font-display font-semibold text-foreground">Учебный план</span>
          </div>
          <span className="font-mono text-[11px] text-muted-foreground">
            © 2024—2025 · Учебный план
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
