import { motion } from "framer-motion";
import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const literature = [
  { title: "Наследов А.Д. Математические методы психологического исследования", category: "Учебник" },
  { title: "Field A. Discovering Statistics Using IBM SPSS Statistics", category: "Учебник" },
  { title: "Tufte E. The Visual Display of Quantitative Information", category: "Визуализация" },
  { title: "Гласс Дж., Стэнли Дж. Статистические методы в педагогике и психологии", category: "Учебник" },
];

const links = [
  { name: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov/", desc: "База рецензируемых биомедицинских публикаций" },
  { name: "Google Scholar", url: "https://scholar.google.com/", desc: "Поиск по академическим публикациям" },
  { name: "eLibrary.ru", url: "https://elibrary.ru/", desc: "Российская научная электронная библиотека" },
  { name: "PsyToolkit", url: "https://www.psytoolkit.org/", desc: "Платформа когнитивных экспериментов" },
  { name: "JASP", url: "https://jasp-stats.org/", desc: "Бесплатный статистический пакет" },
  { name: "Zotero", url: "https://www.zotero.org/", desc: "Менеджер библиографических ссылок" },
];

const ResourcesPage = () => {
  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Библиотека
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
          Ресурсы
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 max-w-[640px]">
          Рекомендованная литература, полезные ссылки и материалы для скачивания.
        </p>

        {/* Literature */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Литература</h2>
          <div className="space-y-3">
            {literature.map((book, i) => (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded shrink-0 mt-0.5">
                  {book.category}
                </span>
                <span className="text-sm text-foreground font-body">{book.title}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Links */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Полезные ссылки</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:shadow-[var(--shadow-card-hover)] transition-shadow group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-body">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </section>

        {/* Downloads */}
        <section>
          <h2 className="font-display text-xl font-semibold text-foreground mb-4">Материалы для скачивания</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
            <div className="flex-1">
              <p className="font-display font-semibold text-sm text-foreground">Критерий χ² — Jupyter Notebook</p>
              <p className="text-xs text-muted-foreground font-body">
                Интерактивный ноутбук с примерами расчётов хи-квадрат в Python.
              </p>
            </div>
            <Button asChild variant="default" size="sm" className="shrink-0">
              <a href="/files/Chi_Square.ipynb" download="Chi_Square.ipynb">
                <Download className="mr-2 h-4 w-4" />
                Скачать .ipynb
              </a>
            </Button>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;
