import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Globe, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLocale();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyContact, setCompanyContact] = useState(null);

  useEffect(() => {
    supabase
      .from("contact")
      .select("*")
      .single()
      .then(({ data }) => setCompanyContact(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("contacts").insert({
      name,
      email,
      content: message,
    });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to send message");
      return;
    }

    // reset
    setName("");
    setEmail("");
    setMessage("");
  };

  const contactInfo = [
    {
      icon: MapPin,
      labelKey: "contact.headOffice",
      value: companyContact?.address || "ХУД 23 хороо тэнгэр плаза 12давхар",
    },
    {
      icon: Phone,
      labelKey: "contact.phone",
      value: companyContact?.phone || "+976-7015 7000, +976-8888 1520",
    },
    {
      icon: Mail,
      labelKey: "contact.email",
      value: companyContact?.email || "info@armos.mn",
    },
    {
      icon: Globe,
      labelKey: "contact.website",
      value: companyContact?.website || "www.armos.mn",
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background" ref={ref}>
      <div className="container px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-semibold text-sm mb-4">
            {t("contact.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-foreground mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("contact.description")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {t(item.labelKey)}
                    </h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-8 rounded-2xl hero-gradient text-primary-foreground">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-primary-foreground/70">
                  Quick Response Time
                </span>
              </div>

              <h3 className="text-3xl font-display font-bold mb-4">
                {t("contact.requestInspection")}
              </h3>

              <p className="text-primary-foreground/80 mb-8 leading-relaxed">
                {t("contact.ctaDescription")}
              </p>

              <div className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full group">
                      {t("contact.ctaButton")}
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {t("contact.modalTitle") || "Contact Us"}
                      </DialogTitle>
                      <DialogDescription>
                        {t("contact.modalDescription") ||
                          "Send us a message and our team will respond shortly."}
                      </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div>
                        <Label className="mb-1">
                          {t("contact.form.name") || "Name"}
                        </Label>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          placeholder={
                            t("contact.form.namePlaceholder") || "Your name"
                          }
                        />
                      </div>

                      <div>
                        <Label className="mb-1">
                          {t("contact.form.email") || "Email"}
                        </Label>
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder={
                            t("contact.form.emailPlaceholder") ||
                            "you@company.com"
                          }
                        />
                      </div>

                      <div>
                        <Label className="mb-1">
                          {t("contact.form.message") || "Message"}
                        </Label>
                        <Textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          placeholder={
                            t("contact.form.messagePlaceholder") ||
                            "How can we help?"
                          }
                        />
                      </div>

                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            variant="secondary"
                            disabled={loading}>
                            {loading
                              ? "Sending..."
                              : t("contact.form.send") || "Send"}
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button variant="ghost">
                            {t("contact.form.cancel") || "Cancel"}
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>

                <div className="text-center">
                  <a
                    href="tel:+97670157000"
                    className="text-accent hover:underline font-semibold">
                    +976-7015 7000
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-primary-foreground/20">
                <p className="text-primary-foreground/60 text-sm">
                  {t("contact.businessHours")}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
