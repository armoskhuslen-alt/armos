import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const { locale, t } = useLocale();

  const mottoItems = [
    { icon: Shield, textEn: "Quality", textMn: "Чанартай" },
    { icon: Shield, textEn: "Safety", textMn: "Аюулгүй" },
    { icon: Zap, textEn: "Rapidity", textMn: "Шуурхай" },
  ];

  return (
    <section className="relative min-h-screen flex items-center px-10 justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Industrial inspection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-transparent" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 py-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mt-20 md:mt-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm mb-8">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary-foreground/90">
              {t("hero.badge")}
            </span>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-primary-foreground mb-4 tracking-tight">
            ARMOS
          </motion.h1>

          {/* Motto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-8">
            {mottoItems.map((item, index) => (
              <motion.div
                key={item.textEn}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20">
                <item.icon className="w-4 h-4 text-accent" />
                <span className="font-semibold text-primary-foreground">
                  {locale === "mn" ? item.textMn : item.textEn}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl sm:text-2xl text-primary-foreground/80 mb-12 leading-relaxed max-w-3xl mx-auto">
            {t("hero.description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="default" size="lg" className="group">
              {t("hero.cta")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
              {t("hero.learnMore")}
            </Button>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-primary-foreground/10">
            <p className="text-primary-foreground/50 text-sm mb-4">
              {t("hero.certified")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                "ISO 9001:2015",
                "MNS ISO/IEC 17020:2013",
                "ISO 45001:2018",
              ].map((cert) => (
                <div
                  key={cert}
                  className="px-4 py-2 rounded-md bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground/70 text-sm font-medium">
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
