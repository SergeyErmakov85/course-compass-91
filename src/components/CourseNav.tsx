import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { id: "rationale", label: "Концепция" },
  { id: "syllabus", label: "Программа" },
  { id: "tools", label: "Инструменты" },
  { id: "methods", label: "Методика" },
];

const CourseNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = navLinks.map(l => document.getElementById(l.id));
      const current = sections.reverse().find(s => {
        if (!s) return false;
        const rect = s.getBoundingClientRect();
        return rect.top <= 120;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-surface border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              ПсихИТ
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="text-sm font-display font-semibold text-foreground">
              Учебный план
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  activeSection === link.id
                    ? "text-foreground bg-secondary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <span className="font-mono text-[11px] text-muted-foreground">
              04 модуля · 14 недель
            </span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default CourseNav;
