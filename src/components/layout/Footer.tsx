import { Shield, Award, CheckCircle } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLocale();

  return (
    <footer className="py-12 bg-primary text-primary-foreground">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="text-3xl font-display font-bold mb-2">ARMOS</div>
            <p className="text-primary-foreground/60 mb-4">
              Quality • Safety • Rapidity
            </p>
            <p className="text-sm text-primary-foreground/50">
              Чанартай • Аюулгүй • Шуурхай
            </p>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="font-display font-semibold mb-4 flex items-center text-white gap-2">
              <Award className="w-4 h-4 text-accent" />
              {t("footer.certifications")}
            </h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex items-center text-white gap-2">
                <CheckCircle className="w-3 h-3 text-accent" />
                ISO 9001:2015
              </li>
              <li className="flex items-center text-white gap-2">
                <CheckCircle className="w-3 h-3 text-accent" />
                MNS ISO/IEC 17020:2013
              </li>
              <li className="flex items-center text-white gap-2">
                <CheckCircle className="w-3 h-3 text-accent" />
                ISO 45001:2018
              </li>
              <li className="flex items-center text-white gap-2">
                <CheckCircle className="w-3 h-3 text-accent" />
                MNS ISO 9712:2019
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2 text-sm  text-white">
              <li className="text-white">
                <Link
                  to="/#about"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#services"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#impact"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.impact")}
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.news")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#partners"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.partners")}
                </Link>
              </li>
              <li>
                <Link
                  to="/#contact"
                  className="text-white hover:text-accent transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-2 text-sm text-white">
              <li className="text-white">+976-7015 7000</li>
              <li className="text-white">+976-8888 1520</li>
              <li className="text-white">info@armos.mn</li>
              <li className="text-white">www.armos.mn</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {currentYear} ARMOS. All rights reserved.
          </p>
          <div className="flex items-center text-white gap-2 text-sm text-primary-foreground/50">
            <Shield className="w-4 h-4" />
            <span>{t("footer.years")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
