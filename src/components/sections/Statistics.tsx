import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Building2,
  Waves,
  Container,
  Flame,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { AnimatedCounter } from "../ui/AnimatedCounter";

const stats = [
  {
    icon: Building2,
    value: 51400,
    suffix: " m³",
    labelEn: "Concrete Structures",
    labelMn: "Бетон байгууламж",
    descEn: "Inspected concrete volume",
    descMn: "Шалгасан бетоны эзэлхүүн",
  },
  {
    icon: Waves,
    value: 2350,
    suffix: " km",
    labelEn: "Long Pipes",
    labelMn: "Урт хоолой",
    descEn: "Water and gas pipes inspected",
    descMn: "Шалгасан ус, хийн хоолой",
  },
  {
    icon: Container,
    value: 2250,
    suffix: "+",
    labelEn: "Pressure Vessels",
    labelMn: "Даралтат сав",
    descEn: "Vessels and pipes inspected",
    descMn: "Шалгасан сав, хоолой",
  },
  {
    icon: Flame,
    value: 1875,
    suffix: "+",
    labelEn: "Steam Boilers",
    labelMn: "Уурын зуух",
    descEn: "Boilers and turbines inspected",
    descMn: "Шалгасан зуух, турбин",
  },
  {
    icon: Gauge,
    value: 7500,
    suffix: "+",
    labelEn: "Pressure Gauges",
    labelMn: "Даралт хэмжигч",
    descEn: "Gauges tested and supplied",
    descMn: "Турших, нийлүүлсэн",
  },
  {
    icon: ShieldCheck,
    value: 1950,
    suffix: "+",
    labelEn: "Safety Valves",
    labelMn: "Аюулгүйн хавхлага",
    descEn: "Valves tested and certified",
    descMn: "Турших, баталгаажуулсан",
  },
];

export const Statistics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, t } = useLocale();

  return (
    <section
      id="impact"
      className="py-24 hero-gradient relative overflow-hidden"
      ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-4">
            {t("stats.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
            {t("stats.title")}
          </h2>
          <p className="text-lg text-primary-foreground/70 leading-relaxed">
            {t("stats.description")}
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative p-8 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <stat.icon className="w-10 h-10 text-accent mb-4" />

              <div className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-2">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  duration={2.5}
                />
              </div>

              <h3 className="text-lg font-semibold text-primary-foreground mb-1">
                {locale === "mn" ? stat.labelMn : stat.labelEn}
              </h3>
              <p className="text-primary-foreground/60 text-sm">
                {locale === "mn" ? stat.descMn : stat.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
