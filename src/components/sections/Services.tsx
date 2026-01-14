import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
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
  LucideIcon,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";
import test from "@/assets/testing.jpg";

const ICON_MAP: Record<string, LucideIcon> = {
  Radio,
  Scan,
  Magnet,
  Eye,
  Droplets,
  Ruler,
  Building2,
  Flame,
};
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null; // ✅ ADD
  files: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}
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
  const [methods, setMethods] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("created_at");

      if (!error && data) {
        setMethods(data);
      } else {
        console.error(error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      id="services"
      className="py-24 bg-background relative  overflow-hidden"
      ref={ref}>
      <img
        src={test}
        alt="Services Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      {/* Optional Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-1"></div>
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-4">
            {t("services.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            {t("services.title")}
          </h2>
          <p className="text-lg leading-relaxed text-gray-200">
            {t("services.description")}
          </p>
        </motion.div>

        {/* Methods Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {methods.map((method, index) => {
            const Icon = method.icon ? ICON_MAP[method.icon] : null;

            return (
              <Link key={method.id} to={`/service/${method.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                  className="group p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  {Icon && (
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:bg-accent transition-colors">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  )}

                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {method.description.slice(0, 40)}
                  </p>
                </motion.div>
              </Link>
            );
          })}
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
            {(locale === "mn" ? applicationsMn : applicationsEn).map((app) => (
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
