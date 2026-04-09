import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const landingLinks = [
  { id: "rationale", label: "Концепция" },
  { id: "syllabus", label: "Программа" },
  { id: "tools", label: "Инструменты" },
  { id: "methods", label: "Методика" },
];

const breadcrumbMap: Record<string, { label: string; parent?: { to: string; label: string } }> = {
  "/set-theory": { label: "Теория множеств" },
  "/statistics": { label: "Матстатистика" },
  "/tools": { label: "Инструменты" },
  "/resources": { label: "Ресурсы" },
};

const CourseNav = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) return <LandingNav />;

  // Module page breadcrumb
  const moduleMatch = location.pathname.match(/^\/module\/(\d+)$/);
  if (moduleMatch) {
    return (
      <BreadcrumbNav
        items={[
          { label: "Главная", to: "/" },
          { label: `Модуль ${moduleMatch[1].padStart(2, "0")}` },
        ]}
      />
    );
  }

  const info = breadcrumbMap[location.pathname];
  if (info) {
    return (
      <BreadcrumbNav
        items={[
          { label: "Главная", to: "/" },
          { label: info.label },
        ]}
      />
    );
  }

  return null;
};

const LandingNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = landingLinks.map((l) => document.getElementById(l.id));
      const current = sections.reverse().find((s) => {
        if (!s) return false;
        return s.getBoundingClientRect().top <= 120;
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
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-surface border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="hidden md:flex items-center gap-1">
            {landingLinks.map((link) => (
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
            <span className="font-mono text-[11px] text-muted-foreground">04 модуля · 14 недель</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const BreadcrumbNav = ({ items }: { items: { label: string; to?: string }[] }) => {
  return (
    <nav className="sticky top-0 z-40 glass-surface border-b border-border">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center h-14 gap-2">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
              {item.to ? (
                <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-sm text-foreground font-medium">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CourseNav;
