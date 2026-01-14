import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const partners = [
  { name: "MCS", type: "Domestic" },
  { name: "Oyu Tolgoi", type: "Mining" },
  { name: "APU Company", type: "Beverage" },
  { name: "Coca-Cola", type: "International" },
  { name: "KOSEN", type: "Distribution" },
  { name: "HUATEC", type: "Distribution" },
];

export const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLocale();

  return (
    <section id="partners" className="py-24 bg-secondary" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            {t("partners.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t("partners.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("partners.description")}
          </p>
        </motion.div>

        {/* Official Distributor Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl bg-card border border-accent/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Award className="w-6 h-6 text-accent" />
            <h3 className="text-xl font-display font-semibold text-foreground">
              {t("partners.distributor")}
            </h3>
          </div>
          <p className="text-muted-foreground">
            {t("partners.distributorDesc")}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * index }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 text-center">
              <Handshake className="w-8 h-8 text-steel mx-auto mb-3 group-hover:text-accent transition-colors" />
              <h4 className="font-display font-semibold text-foreground">
                {partner.name}
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                {partner.type}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
