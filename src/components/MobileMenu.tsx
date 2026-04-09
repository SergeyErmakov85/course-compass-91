import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Home, BookOpen, Lightbulb, Wrench, Library } from "lucide-react";

interface NavGroup {
  label: string;
  items: { label: string; to: string; icon?: React.ReactNode }[];
}

const navGroups: NavGroup[] = [
  {
    label: "Обзор курса",
    items: [
      { label: "Главная", to: "/", icon: <Home className="w-4 h-4" /> },
    ],
  },
  {
    label: "Модули",
    items: [
      { label: "01 — Архитектура ПК", to: "/module/1", icon: <BookOpen className="w-4 h-4" /> },
      { label: "02 — Данные", to: "/module/2", icon: <BookOpen className="w-4 h-4" /> },
      { label: "03 — Интернет и Поиск", to: "/module/3", icon: <BookOpen className="w-4 h-4" /> },
      { label: "04 — Психодиагностика", to: "/module/4", icon: <BookOpen className="w-4 h-4" /> },
    ],
  },
  {
    label: "Теория",
    items: [
      { label: "Теория множеств", to: "/set-theory", icon: <Lightbulb className="w-4 h-4" /> },
      { label: "Матстатистика", to: "/statistics", icon: <Lightbulb className="w-4 h-4" /> },
    ],
  },
  {
    label: "Практика",
    items: [
      { label: "Инструменты", to: "/tools", icon: <Wrench className="w-4 h-4" /> },
      { label: "Ресурсы", to: "/resources", icon: <Library className="w-4 h-4" /> },
    ],
  },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Burger button — visible only on mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Открыть меню"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-foreground/20 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="fixed top-0 right-0 z-[70] h-screen w-72 bg-card border-l border-border flex flex-col shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-border shrink-0">
                <span className="font-display font-bold text-foreground text-sm tracking-tight">
                  IT-Психология
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Закрыть меню"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Nav */}
              <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
                {navGroups.map((group) => (
                  <MobileNavGroup key={group.label} group={group} currentPath={location.pathname} />
                ))}
              </nav>

              {/* Footer */}
              <div className="px-5 py-3 border-t border-border shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground">04 модуля · 14 недель</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const MobileNavGroup = ({ group, currentPath }: { group: NavGroup; currentPath: string }) => {
  const hasActive = group.items.some((item) => item.to === currentPath);
  const [expanded, setExpanded] = useState(hasActive || group.label === "Обзор курса");

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors rounded"
      >
        {group.label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${expanded ? "rotate-0" : "-rotate-90"}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5 mt-0.5">
              {group.items.map((item) => {
                const active = item.to === currentPath;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-md transition-colors ${
                      active
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
