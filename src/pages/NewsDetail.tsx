import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NewsDetail = () => {
  const { slug } = useParams();
  const { locale, t } = useLocale();

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) return;

    const fetchNews = async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", slug)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setNews(data);

      // related news
      const { data: related } = await supabase
        .from("news")
        .select("*")
        .neq("id", data.id)
        .order("created_at", { ascending: false })
        .limit(2);

      setRelatedNews(related || []);
      setLoading(false);
    };

    fetchNews();
  }, [slug]);

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          <div className="container px-4 py-16 text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              {locale === "en" ? "Article not found" : "Нийтлэл олдсонгүй"}
            </h1>
            <Link to="/news">
              <Button variant="secondary">{t("news.backToNews")}</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Get related news (excluding current)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="">
        {/* Hero Image */}
        <section className="relative h-[40vh] sm:h-[60vh] overflow-hidden">
          <img
            src={
              "https://camnimaofdrycwlmjhtc.supabase.co/storage/v1/object/public/news-pdfs/" +
              news.pdf_file_path
            }
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#004270] to-transparent" />
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto -mt-32 relative z-10">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-2xl border border-border p-8 sm:p-12 shadow-lg">
                {/* Back Link */}
                <Link
                  to="/news"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t("news.backToNews")}</span>
                </Link>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                    {news.cat}
                  </span>
                  <div className="flex items-center gap-2 text-muted-foreground">
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

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-8">
                  {news.title}
                </h1>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {news.content.split("\n\n").map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-muted-foreground leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {locale === "en"
                      ? "Share this article"
                      : "Энэ нийтлэлийг хуваалцах"}
                  </span>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    {locale === "en" ? "Share" : "Хуваалцах"}
                  </Button>
                </div>
              </motion.article>

              {/* Related News */}
              {relatedNews.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-6">
                    {locale === "en" ? "Related News" : "Холбоотой мэдээ"}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {relatedNews.map((related) => (
                      <Link
                        key={related.id}
                        to={`/news/${related.slug}`}
                        className="group bg-card rounded-xl border border-border overflow-hidden hover:border-accent/30 transition-colors">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={related.image}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-display font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                            {related.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;
