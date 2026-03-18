import { useState } from "react";
import { motion } from "framer-motion";

type TabId = "outcomes" | "methods" | "examples";

const tabs: { id: TabId; label: string }[] = [
  { id: "outcomes", label: "Компетенции" },
  { id: "methods", label: "Методы вовлечения" },
  { id: "examples", label: "Кейсы и Задания" },
];

const outcomes = [
  {
    title: "Базовая IT-грамотность",
    text: "Понимать архитектуру ПО и ПК, соблюдать правила цифровой гигиены и информационной безопасности при работе с клиентскими данными.",
  },
  {
    title: "Работа с данными",
    text: "Уверенно использовать электронные таблицы и спецПО (JASP/Jamovi) для обработки, визуализации и базового статистического анализа.",
  },
  {
    title: "Прикладное использование",
    text: "Самостоятельно проектировать и реализовывать онлайн-исследования с использованием современных платформ.",
  },
  {
    title: "Критическое мышление",
    text: "Оценивать этические риски и валидность применения алгоритмов, ИИ и Big Data в психологической диагностике и терапии.",
  },
];

const methods = [
  { title: "Проектное обучение (PBL)", text: "Сквозной проект через весь семестр: от гипотезы до создания инструмента, сбора данных и визуализации." },
  { title: "Разбор реальных кейсов", text: "Анализ утечек данных медицинских платформ, обсуждение UX/UI дизайна приложений для ментального здоровья." },
  { title: "Peer-Review", text: "Студенты тестируют опросники друг друга на предмет логических ошибок и удобства интерфейса." },
  { title: "Фасилитируемые дискуссии", text: "Дебаты по спорным вопросам интеграции ИИ в психотерапевтический процесс." },
];

const discussions = [
  "Диагностика по цифровому следу: где граница между научным профайлингом и нарушением приватности?",
  "Заменит ли чат-бот на базе LLM телефон доверия? Этические и технологические барьеры.",
  "VR-экспозиция в лечении фобий: дополнение к традиционной терапии или самостоятельный метод?",
];

const homework = [
  { id: "ДЗ №2", module: "Модуль Данных", text: "Импортировать «сырые» данные CSV (с ошибками и пропусками) в Excel/JASP, провести очистку, рассчитать описательные статистики и построить гистограмму." },
  { id: "ДЗ №5", module: "Когнитивные ИТ", text: "Собрать эксперимент на визуальный поиск: фиксационный крест (500 мс), вывод целевого стимула. Приложить скриншоты логики и ссылку на тестовый запуск." },
];

const MethodsSection = () => {
  const [activeTab, setActiveTab] = useState<TabId>("outcomes");

  return (
    <section id="methods" className="py-[12vh] max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-10 text-center">
          Организация обучения
        </h2>

        <div className="rounded-xl border border-border bg-card overflow-hidden" style={{ boxShadow: "var(--shadow-md)" }}>
          {/* Tab header */}
          <div className="flex border-b border-border bg-muted/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-6 md:p-8 min-h-[320px]">
            {activeTab === "outcomes" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <p className="text-sm text-muted-foreground mb-6 font-body">По завершении курса студент будет способен:</p>
                <div className="space-y-4">
                  {outcomes.map((o) => (
                    <div key={o.title} className="flex items-start gap-3">
                      <span className="text-accent mt-0.5 shrink-0">✓</span>
                      <div>
                        <span className="font-display font-semibold text-sm text-foreground">{o.title}: </span>
                        <span className="text-sm text-muted-foreground font-body">{o.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "methods" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {methods.map((m) => (
                    <div key={m.title} className="bg-muted/50 p-4 rounded-lg border border-border">
                      <h4 className="font-display font-semibold text-sm text-foreground mb-1">{m.title}</h4>
                      <p className="text-xs text-muted-foreground font-body">{m.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "examples" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <div className="mb-6">
                  <h4 className="font-display font-semibold text-sm text-foreground mb-3 border-b border-border pb-2">Темы для дискуссий</h4>
                  <ul className="space-y-2">
                    {discussions.map((d) => (
                      <li key={d} className="text-sm text-muted-foreground font-body italic pl-3 border-l-2 border-accent/30">
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-foreground mb-3 border-b border-border pb-2">Домашние задания</h4>
                  <div className="space-y-3">
                    {homework.map((hw) => (
                      <div key={hw.id} className="bg-muted/50 p-4 rounded-lg text-sm font-body">
                        <span className="font-mono text-[11px] text-accent uppercase tracking-widest">{hw.id} · {hw.module}</span>
                        <p className="text-muted-foreground mt-1">{hw.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MethodsSection;
