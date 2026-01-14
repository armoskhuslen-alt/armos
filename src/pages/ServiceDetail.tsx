import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, FileText } from "lucide-react";

import {
  Radio,
  Scan,
  Magnet,
  Eye,
  Droplets,
  Ruler,
  Building2,
  Flame,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

/* Icon map */
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
  icon: string | null;
  files: string[] | null;
  created_at: string;
}

const ServiceDetail = () => {
  const { slug } = useParams(); // /services/:id
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useLocale();

  useEffect(() => {
    if (!slug) return;

    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", slug)
        .eq("active", true)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setService(data);
      setLoading(false);
    };

    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Link to="/services">
            <Button variant="secondary">Back to Services</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = service.icon ? ICON_MAP[service.icon] : null;

  const getFileUrl = (path: string) => {
    const { data } = supabase.storage.from("service-pdfs").getPublicUrl(path);
    return data.publicUrl;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className=" pb-16">
        <section className="py-32 hero-gradient">
          <div className="container px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
                {t("service.title")}
              </h1>
              <p className="text-lg text-primary-foreground/70">
                {t("service.description")}
              </p>
            </motion.div>
          </div>
        </section>
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-lg">
            {/* Back */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>

            {/* Icon */}
            {Icon && (
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-6">
                <Icon className="w-7 h-7 text-primary-foreground" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              {service.title}
            </h1>

            {/* Date */}
            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Calendar className="w-4 h-4" />
              {new Date(service.created_at).toLocaleDateString()}
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-muted-foreground">
              {service.description.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Files */}
            {service.files && service.files.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Documents</h3>

                <div className="space-y-2">
                  {service.files.map((file) => (
                    <a
                      key={file}
                      href={getFileUrl(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-accent hover:underline">
                      <FileText className="w-4 h-4" />
                      {file}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
