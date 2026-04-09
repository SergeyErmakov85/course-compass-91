import { motion } from "framer-motion";

const toolCategories = [
  {
    category: "Статистический анализ",
    tools: [
      { name: "JASP", desc: "Бесплатный пакет для байесовской и частотной статистики с удобным интерфейсом." },
      { name: "Jamovi", desc: "Открытый статпакет на базе R с интуитивным GUI. Идеален для начинающих исследователей." },
      { name: "Excel / Google Sheets", desc: "Базовые и продвинутые функции: ВПР, сводные таблицы, условное форматирование, визуализация." },
    ],
  },
  {
    category: "Сбор данных и эксперименты",
    tools: [
      { name: "PsyToolkit", desc: "Платформа для создания когнитивных экспериментов онлайн с высокой точностью измерения времени реакции." },
      { name: "Qualtrics CoreXM", desc: "Индустриальный стандарт анкетирования: условная логика, рандомизация, A/B тесты." },
      { name: "Google Forms", desc: "Простой и бесплатный инструмент для базового анкетирования и сбора обратной связи." },
    ],
  },
  {
    category: "Научный поиск и цитирование",
    tools: [
      { name: "Zotero", desc: "Бесплатный менеджер библиографии с плагинами для браузера и текстовых редакторов." },
      { name: "Mendeley", desc: "Менеджер цитирования с облачным хранилищем и социальными функциями для исследователей." },
      { name: "PubMed / Google Scholar", desc: "Академические базы данных для поиска рецензируемых статей и мета-анализов." },
    ],
  },
  {
    category: "Специализированное ПО",
    tools: [
      { name: "VR-системы", desc: "Oculus/Meta Quest, HTC Vive для экспозиционной терапии и когнитивной реабилитации." },
      { name: "Python (NumPy, SciPy)", desc: "Программирование статистических расчётов, автоматизация обработки данных, NLP." },
      { name: "Jupyter Notebook", desc: "Интерактивная среда для воспроизводимых вычислений и документирования анализа." },
    ],
  },
];

const ToolsPage = () => {
  return (
    <div className="py-12 max-w-[1000px] mx-auto px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Каталог
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Инструменты
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 max-w-[640px]">
          Полный каталог программного обеспечения и платформ, используемых в курсе для исследований, анализа и экспериментов.
        </p>

        <div className="space-y-10">
          {toolCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: ci * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{cat.category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-xl border border-border bg-card p-5 hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <h3 className="font-display font-semibold text-foreground mb-1 text-sm">{tool.name}</h3>
                    <p className="text-xs text-muted-foreground font-body">{tool.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ToolsPage;
