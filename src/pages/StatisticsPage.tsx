import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "katex/dist/katex.min.css";
import katex from "katex";

/* ── tiny helper to render inline KaTeX ── */
const Tex = ({ math, display = false }: { math: string; display?: boolean }) => (
  <span
    dangerouslySetInnerHTML={{
      __html: katex.renderToString(math, { throwOnError: false, displayMode: display }),
    }}
  />
);

/* ──────────── Section components ──────────── */

const ScalesSection = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground font-body">
      Стэнли Стивенс (1946) выделил четыре уровня измерения, определяющих допустимые
      статистические операции.
    </p>
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Шкала</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Определение</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Пример</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Операции</th>
            <th className="py-2 font-display font-semibold text-foreground">Критерии</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground">Номинальная</td>
            <td className="py-2 pr-3">Классификация без порядка</td>
            <td className="py-2 pr-3">Пол, диагноз, группа</td>
            <td className="py-2 pr-3">=, ≠</td>
            <td className="py-2">χ², мода</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground">Порядковая</td>
            <td className="py-2 pr-3">Ранги без равных интервалов</td>
            <td className="py-2 pr-3">Шкала Ликерта, рейтинг</td>
            <td className="py-2 pr-3">{"=, ≠, <, >"}</td>
            <td className="py-2">Спирмен, Манн-Уитни</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground">Интервальная</td>
            <td className="py-2 pr-3">Равные интервалы, нет абс. нуля</td>
            <td className="py-2 pr-3">IQ, температура °C</td>
            <td className="py-2 pr-3">+, −</td>
            <td className="py-2">t-тест, ANOVA, Пирсон</td>
          </tr>
          <tr>
            <td className="py-2 pr-3 font-semibold text-foreground">Отношений</td>
            <td className="py-2 pr-3">Равные интервалы + абсолютный ноль</td>
            <td className="py-2 pr-3">Время реакции, возраст</td>
            <td className="py-2 pr-3">×, ÷</td>
            <td className="py-2">Все параметрические</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="bg-muted/40 rounded-lg p-4 border border-border mt-2">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> Исследователь измеряет уровень тревожности по шкале STAI (порядковая).
        Хотя данные выглядят числовыми, применение t-теста формально некорректно — стоит использовать
        критерий Манна-Уитни или обосновать допущение интервальности.
      </p>
    </div>
  </div>
);

const DescriptiveSection = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground font-body">
      Описательные статистики сжимают данные до ключевых показателей: где «центр» выборки и
      насколько данные разбросаны.
    </p>

    <h4 className="font-display font-semibold text-foreground text-sm">Меры центральной тенденции</h4>
    <div className="grid sm:grid-cols-3 gap-3">
      {[
        {
          label: "Среднее (M)",
          formula: "M = \\frac{\\sum x_i}{n}",
          when: "Интервальная / отношений, нормальное распределение",
        },
        {
          label: "Медиана (Md)",
          formula: "Md = x_{\\lceil n/2 \\rceil}",
          when: "Порядковая+, выбросы, скошенное распределение",
        },
        {
          label: "Мода (Mo)",
          formula: "Mo = \\arg\\max f(x)",
          when: "Номинальная+, любое распределение",
        },
      ].map((m) => (
        <div key={m.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-foreground text-xs mb-2">{m.label}</p>
          <div className="mb-2"><Tex math={m.formula} display /></div>
          <p className="text-[10px] text-muted-foreground font-mono">{m.when}</p>
        </div>
      ))}
    </div>

    <h4 className="font-display font-semibold text-foreground text-sm mt-4">Меры рассеяния</h4>
    <div className="grid sm:grid-cols-3 gap-3">
      {[
        { label: "SD", formula: "SD = \\sqrt{\\frac{\\sum(x_i - M)^2}{n-1}}", when: "С M, нормальное" },
        { label: "IQR", formula: "IQR = Q_3 - Q_1", when: "С Md, выбросы" },
        { label: "Размах", formula: "R = x_{max} - x_{min}", when: "Общее представление" },
      ].map((m) => (
        <div key={m.label} className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-foreground text-xs mb-2">{m.label}</p>
          <div className="mb-2"><Tex math={m.formula} display /></div>
          <p className="text-[10px] text-muted-foreground font-mono">{m.when}</p>
        </div>
      ))}
    </div>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> В выборке из 30 студентов средний балл
        тревожности <Tex math="M = 42.3" />, <Tex math="SD = 8.1" />. Один студент набрал 98 баллов —
        медиана (<Tex math="Md = 40" />) устойчивее к такому выбросу.
      </p>
    </div>
  </div>
);

const NormalitySection = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground font-body">
      Нормальное распределение — колоколообразная кривая, описываемая функцией:
    </p>
    <div className="text-center my-3">
      <Tex math="f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}" display />
    </div>

    <h4 className="font-display font-semibold text-foreground text-sm">Зачем проверять?</h4>
    <p className="text-sm text-muted-foreground font-body">
      Параметрические критерии (t-тест, ANOVA, Пирсон) предполагают нормальность. Если распределение
      значимо отклоняется — следует использовать непараметрические аналоги.
    </p>

    <h4 className="font-display font-semibold text-foreground text-sm mt-3">Критерии проверки</h4>
    <div className="grid sm:grid-cols-2 gap-3">
      <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-foreground text-xs mb-1">Шапиро-Уилка (W)</p>
        <p className="text-[11px] text-muted-foreground">Рекомендуется при <Tex math="n < 50" />. Чувствителен к отклонениям в хвостах.</p>
      </div>
      <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <p className="font-display font-semibold text-foreground text-xs mb-1">Колмогорова-Смирнова (D)</p>
        <p className="text-[11px] text-muted-foreground">Для больших выборок (<Tex math="n > 50" />). Менее мощен, но универсален.</p>
      </div>
    </div>

    <h4 className="font-display font-semibold text-foreground text-sm mt-3">Визуальная проверка</h4>
    <p className="text-sm text-muted-foreground font-body">
      <strong>Гистограмма</strong> — форма распределения. <strong>Q-Q плот</strong> — точки должны лежать
      на диагонали. Визуальная проверка дополняет, но не заменяет формальные тесты.
    </p>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> Исследователь сравнивает уровень
        тревожности до и после экзамена (<Tex math="n = 28" />). Тест Шапиро-Уилка даёт{" "}
        <Tex math="W = 0.94,\; p = 0.11" /> — нормальность не отвергается, можно использовать парный t-тест.
      </p>
    </div>
  </div>
);

const ParametricSection = () => (
  <div className="space-y-5">
    {/* t-test */}
    <div>
      <h4 className="font-display font-semibold text-foreground text-sm mb-2">t-критерий Стьюдента</h4>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-xs text-foreground mb-1">Независимые выборки</p>
          <div className="mb-2"><Tex math="t = \frac{M_1 - M_2}{\sqrt{\frac{s_1^2}{n_1} + \frac{s_2^2}{n_2}}}" display /></div>
          <p className="text-[10px] text-muted-foreground">Условия: нормальность, равенство дисперсий (Левене), интервальная шкала.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
          <p className="font-display font-semibold text-xs text-foreground mb-1">Связанные выборки</p>
          <div className="mb-2"><Tex math="t = \frac{\bar{d}}{s_d / \sqrt{n}}" display /></div>
          <p className="text-[10px] text-muted-foreground">Условия: нормальность разностей, интервальная шкала.</p>
        </div>
      </div>
    </div>

    {/* ANOVA */}
    <div>
      <h4 className="font-display font-semibold text-foreground text-sm mb-2">Однофакторный ANOVA</h4>
      <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mb-2"><Tex math="F = \frac{MS_{between}}{MS_{within}} = \frac{SS_b / (k-1)}{SS_w / (N-k)}" display /></div>
        <p className="text-[10px] text-muted-foreground">Сравнение 3+ групп. Условия: нормальность, гомогенность дисперсий, независимость наблюдений.</p>
      </div>
    </div>

    {/* Pearson */}
    <div>
      <h4 className="font-display font-semibold text-foreground text-sm mb-2">Корреляция Пирсона</h4>
      <div className="rounded-lg border border-border bg-card p-4" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="mb-2"><Tex math="r = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2 \cdot \sum(y_i - \bar{y})^2}}" display /></div>
        <p className="text-[10px] text-muted-foreground">Линейная связь двух количественных переменных. <Tex math="-1 \le r \le 1" />.</p>
      </div>
    </div>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> Исследователь сравнивает уровень
        тревожности у студентов до и после экзамена (парный дизайн, <Tex math="n = 35" />). Разности
        нормальны → парный t-тест: <Tex math="t(34) = 3.12,\; p = .004" /> — тревожность значимо снизилась.
      </p>
    </div>
  </div>
);

const NonparametricSection = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground font-body">
      Непараметрические критерии не требуют нормальности и работают с ранговыми данными.
    </p>

    <div className="overflow-x-auto">
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Параметрический</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Непараметрический аналог</th>
            <th className="py-2 font-display font-semibold text-foreground">Когда использовать</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3">t-тест (незав.)</td>
            <td className="py-2 pr-3 font-semibold text-foreground">Манна-Уитни (U)</td>
            <td className="py-2">2 независимые группы, порядковые данные</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3">t-тест (связ.)</td>
            <td className="py-2 pr-3 font-semibold text-foreground">Уилкоксона (W)</td>
            <td className="py-2">Повторные измерения, асимметрия</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3">ANOVA</td>
            <td className="py-2 pr-3 font-semibold text-foreground">Краскела-Уоллиса (H)</td>
            <td className="py-2">3+ группы, ранговые данные</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3">—</td>
            <td className="py-2 pr-3 font-semibold text-foreground"><Tex math="\chi^2" /> (хи-квадрат)</td>
            <td className="py-2">Категориальные данные, частоты</td>
          </tr>
          <tr>
            <td className="py-2 pr-3">Пирсон (r)</td>
            <td className="py-2 pr-3 font-semibold text-foreground">Спирмен (<Tex math="r_s" />)</td>
            <td className="py-2">Порядковые, нелинейные связи</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> Исследователь сравнивает уровень
        тревожности до и после тренинга (<Tex math="n = 18" />). Тест Шапиро-Уилка отвергает нормальность
        (<Tex math="p = .02" />) → используем критерий Уилкоксона вместо парного t-теста:{" "}
        <Tex math="W = 24,\; p = .009" />.
      </p>
    </div>
  </div>
);

const EffectSizeSection = () => (
  <div className="space-y-4">
    <p className="text-sm text-muted-foreground font-body">
      Статистическая значимость (<Tex math="p < .05" />) говорит лишь о наличии эффекта, но не о его величине.
      Размер эффекта показывает <em>практическую</em> значимость результата.
    </p>

    <div className="overflow-x-auto">
      <table className="w-full text-xs font-body border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Мера</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Формула</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Малый</th>
            <th className="py-2 pr-3 font-display font-semibold text-foreground">Средний</th>
            <th className="py-2 font-display font-semibold text-foreground">Большой</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground">Cohen's d</td>
            <td className="py-2 pr-3"><Tex math="d = \frac{M_1 - M_2}{SD_{pooled}}" /></td>
            <td className="py-2 pr-3">0.2</td>
            <td className="py-2 pr-3">0.5</td>
            <td className="py-2">0.8</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground"><Tex math="\eta^2" /></td>
            <td className="py-2 pr-3"><Tex math="\eta^2 = \frac{SS_b}{SS_{total}}" /></td>
            <td className="py-2 pr-3">0.01</td>
            <td className="py-2 pr-3">0.06</td>
            <td className="py-2">0.14</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="py-2 pr-3 font-semibold text-foreground">r</td>
            <td className="py-2 pr-3"><Tex math="r = \frac{Z}{\sqrt{N}}" /></td>
            <td className="py-2 pr-3">0.1</td>
            <td className="py-2 pr-3">0.3</td>
            <td className="py-2">0.5</td>
          </tr>
          <tr>
            <td className="py-2 pr-3 font-semibold text-foreground">Cramér's V</td>
            <td className="py-2 pr-3"><Tex math="V = \sqrt{\frac{\chi^2}{n \cdot (k-1)}}" /></td>
            <td className="py-2 pr-3">0.1</td>
            <td className="py-2 pr-3">0.3</td>
            <td className="py-2">0.5</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h4 className="font-display font-semibold text-foreground text-sm mt-3">G*Power</h4>
    <p className="text-sm text-muted-foreground font-body">
      Бесплатная программа для расчёта необходимого размера выборки (a priori power analysis) и
      мощности уже проведённого исследования (post hoc). Стандарт: мощность{" "}
      <Tex math="1 - \beta \ge 0.80" />.
    </p>

    <div className="bg-muted/40 rounded-lg p-4 border border-border">
      <p className="text-xs text-muted-foreground font-body italic">
        <span className="font-semibold text-foreground">Пример:</span> Парный t-тест показал{" "}
        <Tex math="t(34) = 2.10,\; p = .043" />. Звучит значимо, но{" "}
        <Tex math="d = 0.22" /> — малый эффект. Практическая значимость вмешательства сомнительна,
        несмотря на статистическую значимость.
      </p>
    </div>
  </div>
);

/* ──────────── Main page ──────────── */

const sections = [
  { id: "scales", title: "Уровни измерения (шкалы Стивенса)", content: <ScalesSection /> },
  { id: "descriptive", title: "Описательная статистика", content: <DescriptiveSection /> },
  { id: "normality", title: "Нормальность распределения", content: <NormalitySection /> },
  { id: "parametric", title: "Параметрические критерии", content: <ParametricSection /> },
  { id: "nonparametric", title: "Непараметрические критерии", content: <NonparametricSection /> },
  { id: "effectsize", title: "Размер эффекта и мощность", content: <EffectSizeSection /> },
];

const StatisticsPage = () => {
  return (
    <div className="py-12 max-w-[900px] mx-auto px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-3 block">
          Справочник
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Математическая статистика
        </h1>
        <p className="text-lg text-muted-foreground font-body mb-10 max-w-[640px]">
          От шкал измерения до размера эффекта — всё, что нужно для анализа
          данных психологического исследования.
        </p>

        <Accordion type="multiple" className="space-y-3 mb-10">
          {sections.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] as const }}
            >
              <AccordionItem
                value={s.id}
                className="rounded-xl border border-border bg-card px-5 data-[state=open]:shadow-sm transition-shadow"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <AccordionTrigger className="hover:no-underline text-left">
                  <span className="font-display font-semibold text-foreground text-sm">{s.title}</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-5">{s.content}</AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* Chi-square notebook download */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border border-border">
          <div className="flex-1">
            <p className="font-display font-semibold text-sm text-foreground">Jupyter Notebook: χ²</p>
            <p className="text-xs text-muted-foreground font-body">
              Интерактивный ноутбук с примерами расчётов критерия хи-квадрат.
            </p>
          </div>
          <Button asChild variant="default" size="sm" className="shrink-0">
            <a href="/files/Chi_Square.ipynb" download="Chi_Square.ipynb">
              <Download className="mr-2 h-4 w-4" />
              Скачать .ipynb
            </a>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default StatisticsPage;
