import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";
import { Link, useLocation } from "react-router-dom";
import { LocaleToggle } from "../ui/LocaleToggle";

const navLinks = [
  { href: "/#about", label: "nav.about" },
  { href: "/#services", label: "nav.services" },
  { href: "/#impact", label: "nav.impact" },
  { href: "/news", label: "nav.news" },
  { href: "/#partners", label: "nav.partners" },
  { href: "/#contact", label: "nav.contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLocale();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "py-5 bg-transparent"
        }`}>
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div
                className={`text-2xl font-display font-bold transition-colors ${
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                }`}>
                ARMOS
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                      : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  }`}>
                  {t(link.label)}
                </Link>
              ))}
            </nav>

            {/* CTA & Locale */}
            <div className="hidden lg:flex items-center gap-3">
              <LocaleToggle isScrolled={isScrolled} />
              <a
                href="tel:+97670157000"
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-muted-foreground"
                    : "text-primary-foreground/80"
                }`}>
                <Phone className="w-4 h-4" />
                <span>+976-7015 7000</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <LocaleToggle isScrolled={isScrolled} />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}>
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="lg:hidden absolute left-0 right-0 top-full mt-2 z-40">
              <div className="mx-4 mb-4 rounded-lg bg-card border border-border shadow-md overflow-hidden">
                <nav className="flex flex-col p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full text-left py-3 px-3 rounded-md text-base font-medium transition-colors text-foreground hover:bg-muted">
                      {t(link.label)}
                    </Link>
                  ))}

                  <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                    <a
                      href="tel:+97670157000"
                      className="flex items-center gap-2 text-accent font-semibold px-3">
                      <Phone className="w-5 h-5" />
                      <span>+976-7015 7000</span>
                    </a>
                    <div className="px-3">
                      <LocaleToggle isScrolled={isScrolled} />
                    </div>
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
