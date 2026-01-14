import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const News = () => {
  const { locale, t } = useLocale();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching news:", error);
      } else {
        setNews(data || []);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className=" ">
        {/* Hero */}
        <section className="py-32 hero-gradient">
          <div className="container px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-4">
                {t("news.tag")}
              </span>
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-primary-foreground mb-6">
                {t("news.title")}
              </h1>
              <p className="text-lg text-primary-foreground/70">
                {t("news.description")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((news, index) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                  <Link to={`/news/${news.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={
                          "https://hbtlxsfdeocqytdoktrk.supabase.co/storage/v1/object/public/news-pdfs/" +
                          news.pdf_file_path
                        }
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(news.created_at).toLocaleDateString(
                              locale === "en" ? "en-US" : "mn-MN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <h2 className="text-xl font-display font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {news.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {news.cat}
                      </p>
                      <div className="flex items-center gap-2 text-accent font-medium">
                        <span>{t("news.readMore")}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default News;
