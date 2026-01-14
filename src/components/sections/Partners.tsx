import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Award, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/lib/supabase";

interface Partner {
  id: string;
  name: string;
  description: string;
  logo_path: string;
  website: string | null;
  order_index: number;
}

export const Partners = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLocale();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("id, name, description, website, order_index, logo_path")
      .order("order_index", { ascending: true });

    if (!error && data) {
      setPartners(data);
    }

    setLoading(false);
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPartners();
  }, []);

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
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * index }}
                className="group p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-md transition-all duration-300 text-center">
                <img
                  src={
                    "https://hbtlxsfdeocqytdoktrk.supabase.co/storage/v1/object/public/partner-logos/" +
                    partner?.logo_path
                  }
                  alt="logo"
                  className="w-auto h-8 text-steel mx-auto mb-3 group-hover:text-accent transition-colors"
                />
                <h4 className="font-display font-semibold text-foreground">
                  {partner.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {partner.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
