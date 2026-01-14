import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  GraduationCap,
  Award,
  Target,
  HeartHandshake,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const features = [
  {
    icon: GraduationCap,
    titleEn: "Certified Professionals",
    titleMn: "Мэргэжлийн баталгаат боловсон хүчин",
    descEn:
      "Workforce qualified under MNS ISO 9712:2019 for employee qualification and certification.",
    descMn: "MNS ISO 9712:2019 стандартын дагуу ажилтнуудыг гэрчилгээжүүлсэн.",
  },
  {
    icon: Target,
    titleEn: "Continuous Education",
    titleMn: "Тасралтгүй боловсрол",
    descEn:
      "Ongoing training programs to keep our team updated with the latest NDT technologies.",
    descMn:
      "Манай багийг хамгийн сүүлийн үеийн NDT технологиудаар шинэчилж байх сургалтын хөтөлбөрүүд.",
  },
  {
    icon: HeartHandshake,
    titleEn: "Team Culture",
    titleMn: "Багийн соёл",
    descEn:
      "A collaborative environment fostering teamwork, innovation, and professional growth.",
    descMn:
      "Багаар ажиллах, инноваци, мэргэжлийн өсөлтийг дэмжих хамтын орчин.",
  },
];

export const HumanResources = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { locale, t } = useLocale();

  return (
    <section id="team" className="py-24 bg-background" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            {t("hr.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t("hr.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("hr.description")}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleEn}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {locale === "mn" ? feature.titleMn : feature.titleEn}
              </h3>
              <p className="text-muted-foreground">
                {locale === "mn" ? feature.descMn : feature.descEn}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto text-center p-6 rounded-2xl steel-gradient border border-border">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Award className="w-6 h-6 text-accent" />
            <h4 className="font-display font-semibold text-foreground">
              MNS ISO 9712:2019
            </h4>
          </div>
          <p className="text-muted-foreground text-sm">
            {locale === "mn"
              ? "Манай бүх NDT мэргэжилтнүүд боловсон хүчний гэрчилгээжүүлэлтийн олон улсын стандартын дагуу гэрчилгээтэй."
              : "All our NDT professionals are certified according to international standards for personnel qualification and certification."}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
