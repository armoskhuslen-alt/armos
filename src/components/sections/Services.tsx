import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Radio,
  Scan,
  Magnet,
  Eye,
  Droplets,
  Ruler,
  Building2,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const methods = [
  {
    icon: Radio,
    titleEn: "Ultrasonic Testing",
    titleMn: "Хэт авианы шинжилгээ",
    descEn: "High-frequency sound waves detect internal flaws",
    descMn: "Өндөр давтамжийн дуун долгио дотоод гэмтлийг илрүүлнэ",
  },
  {
    icon: Scan,
    titleEn: "Radiography Testing",
    titleMn: "Рентген шинжилгээ",
    descEn: "X-ray imaging for internal structure analysis",
    descMn: "Дотоод бүтцийн рентген дүрс боловсруулалт",
  },
  {
    icon: Magnet,
    titleEn: "Magnetic Particle",
    titleMn: "Соронзон ширхэгийн",
    descEn: "Surface defect detection in ferromagnetic materials",
    descMn: "Ферромагнит материалын гадаргуугийн согог илрүүлэлт",
  },
  {
    icon: Eye,
    titleEn: "Visual Testing",
    titleMn: "Визуаль шинжилгээ",
    descEn: "Direct observation of surface conditions",
    descMn: "Гадаргуугийн нөхцөлийг шууд ажиглах",
  },
  {
    icon: Droplets,
    titleEn: "Liquid Penetrant",
    titleMn: "Шингэн нэвтрүүлгийн",
    descEn: "Surface-breaking defect detection",
    descMn: "Гадаргуугийн согог илрүүлэх",
  },
  {
    icon: Ruler,
    titleEn: "Wall Thickness",
    titleMn: "Ханын зузаан хэмжилт",
    descEn: "Precision measurement of material thickness",
    descMn: "Материалын зузааны нарийвчилсан хэмжилт",
  },
  {
    icon: Building2,
    titleEn: "Concrete NDT",
    titleMn: "Бетон шинжилгээ",
    descEn: "Structural integrity testing of concrete",
    descMn: "Бетон байгууламжийн бүтцийн шалгалт",
  },
  {
    icon: Flame,
    titleEn: "Welding QC",
    titleMn: "Гагнуурын хяналт",
    descEn: "Welding quality inspections",
    descMn: "Гагнуурын чанарын хяналт",
  },
];

const applicationsEn = [
  "Steam boilers and turbines",
  "Steam, water, and gas pipes",
  "Pressure vessels",
  "Fuel and gas storage tanks",
  "Industrial equipment",
];

const applicationsMn = [
  "Уурын зуух, турбин",
  "Уур, ус, хийн хоолой",
  "Даралтат сав",
  "Түлш, хийн сав",
  "Аж үйлдвэрийн тоног төхөөрөмж",
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, t } = useLocale();

  const applications = locale === "mn" ? applicationsMn : applicationsEn;

  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            {t("services.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Methods Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methods.map((method, index) => (
            <motion.div
              key={method.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors duration-300">
                <method.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                {locale === "mn" ? method.titleMn : method.titleEn}
              </h3>
              <p className="text-sm text-muted-foreground">
                {locale === "mn" ? method.descMn : method.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto p-8 rounded-2xl steel-gradient border border-border">
          <h3 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
            {t("services.applications")}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {applications.map((app) => (
              <div
                key={app}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-accent/50 transition-colors">
                <ArrowRight className="w-4 h-4 text-accent" />
                <span className="text-foreground font-medium">{app}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
