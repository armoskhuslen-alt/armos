import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Heart, History } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLocale();

  const values = [
    {
      icon: Target,
      titleKey: "about.mission.title",
      descKey: "about.mission.description",
    },
    {
      icon: Eye,
      titleKey: "about.vision.title",
      descKey: "about.vision.description",
    },
    {
      icon: Heart,
      titleKey: "about.values.title",
      descKey: "about.values.description",
    },
    {
      icon: History,
      titleKey: "about.history.title",
      descKey: "about.history.description",
    },
  ];

  return (
    <section id="about" className="py-24 bg-secondary" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            {t("about.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t("about.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("about.description")}
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.titleKey}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/0 via-accent to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(value.descKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
