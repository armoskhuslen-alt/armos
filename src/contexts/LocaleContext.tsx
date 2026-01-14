import { createContext, useContext, useState, ReactNode } from "react";

type Locale = "en" | "mn";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navigation
    "nav.about": "About",
    "nav.services": "Services",
    "nav.impact": "Impact",
    "nav.team": "Team",
    "nav.partners": "Partners",
    "nav.news": "News",
    "nav.contact": "Contact",
    "nav.getQuote": "Get a Quote",

    // Hero
    "hero.badge": "15+ Years of Excellence • Since 2008",
    "hero.quality": "Quality",
    "hero.safety": "Safety",
    "hero.rapidity": "Rapidity",
    "hero.description":
      "Providing highly experienced professional non-destructive testing (NDT) and independent inspection for energy, industrial, and construction sectors.",
    "hero.cta": "Request an Inspection",
    "hero.learnMore": "Learn More",
    "hero.certified": "Certified & Accredited",

    // About
    "about.tag": "About Us",
    "about.title": "15 Years of Technical Excellence",
    "about.description":
      "ARMOS has been Mongolia's trusted partner in non-destructive testing and independent inspection since 2008. Our commitment to international standards ensures the highest quality and safety for your projects.",
    "about.mission.title": "Mission",
    "about.mission.description":
      "To implement novel international practices based on standards and cutting-edge technology to remain a reliable service for customers.",
    "about.vision.title": "Vision",
    "about.vision.description":
      "To be a leader in all aspects of progress in the non-destructive testing industry.",
    "about.values.title": "Values",
    "about.values.description":
      "Transparency, honesty, independence, ethical culture, and high competence.",
    "about.history.title": "History",
    "about.history.description":
      "Founded in 2008, celebrating over 15 years of continuous operations in the NDT field.",

    // Services
    "services.tag": "Our Services",
    "services.title": "Comprehensive NDT Solutions",
    "services.description":
      "We offer a complete range of non-destructive testing methods for installation and operational inspection across all industrial sectors.",
    "services.applications": "Applications",

    // Statistics
    "stats.tag": "Our Impact",
    "stats.title": "Proven Track Record",
    "stats.description":
      "Our extensive experience speaks through numbers. Here's the impact we've made across Mongolia's industrial sector.",

    // Human Resources
    "hr.tag": "Our Team",
    "hr.title": "Expert Workforce",
    "hr.description":
      "Our strategy focuses on cultivating a competitive workforce based on modern human resource approaches, continuous education, and teamwork.",

    // Partners
    "partners.tag": "Partners",
    "partners.title": "Trusted by Industry Leaders",
    "partners.description":
      "We are proud to work with Mongolia's leading companies and serve as official distributors for international brands.",
    "partners.distributor": "Official Distributor",
    "partners.distributorDesc":
      "Representing premium brands KOSEN and HUATEC in Mongolia",

    // Contact
    "contact.tag": "Contact",
    "contact.title": "Get in Touch",
    "contact.description":
      "Ready to ensure the safety and quality of your industrial projects? Reach out to our team of experts.",
    "contact.headOffice": "Head Office",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.website": "Website",
    "contact.requestInspection": "Request an Inspection",
    "contact.ctaDescription":
      "Our team of certified professionals is ready to assist you with comprehensive NDT solutions tailored to your specific needs.",
    "contact.ctaButton": "Contact Us Today",
    "contact.businessHours": "Business Hours: Mon - Fri, 9:00 - 18:00",
    "contact.modalTitle": "Contact Us",
    "contact.modalDescription":
      "Have a question or need assistance? Please fill out the form below and we will get back to you shortly.",
    "contact.form.name": "Full Name",
    "contact.form.namePlaceholder": "Enter your full name",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "Enter your email address",
    "contact.form.message": "Message",
    "contact.form.messagePlaceholder": "Write your message here",
    "contact.form.send": "Send Message",
    "contact.form.cancel": "Cancel",
    // News
    "news.tag": "News & Milestones",
    "news.title": "Latest Updates",
    "news.description":
      "Stay informed about our latest projects, achievements, and industry insights.",
    "news.readMore": "Read More",
    "news.backToNews": "Back to News",

    // Footer
    "footer.certifications": "Certifications",
    "footer.quickLinks": "Quick Links",
    "footer.contactInfo": "Contact Info",
    "footer.years": "15+ Years of Technical Excellence",
  },
  mn: {
    // Navigation
    "nav.about": "Бидний тухай",
    "nav.services": "Үйлчилгээ",
    "nav.impact": "Амжилт",
    "nav.team": "Хүний нөөц",
    "nav.partners": "Түншүүд",
    "nav.news": "Мэдээ",
    "nav.contact": "Холбоо барих",
    "nav.getQuote": "Үнийн санал авах",

    // Hero
    "hero.badge": "15+ жилийн туршлага • 2008 оноос",
    "hero.quality": "Чанартай",
    "hero.safety": "Аюулгүй",
    "hero.rapidity": "Шуурхай",
    "hero.description":
      "Эрчим хүч, аж үйлдвэр, барилгын салбарт мэргэжлийн өндөр туршлагатай эвдэлгүй шалгалт (NDT) болон бие даасан хяналтын үйлчилгээ үзүүлж байна.",
    "hero.cta": "Шалгалт захиалах",
    "hero.learnMore": "Дэлгэрэнгүй",
    "hero.certified": "Гэрчилгээ, итгэмжлэл",

    // About
    "about.tag": "Бидний тухай",
    "about.title": "15 жилийн техникийн туршлага",
    "about.description":
      "АРМОС нь 2008 оноос хойш Монголын эвдэлгүй шалгалт, бие даасан хяналтын найдвартай түнш байсаар ирсэн. Олон улсын стандартад нийцсэн манай амлалт нь таны төслүүдэд хамгийн өндөр чанар, аюулгүй байдлыг хангана.",
    "about.mission.title": "Эрхэм зорилго",
    "about.mission.description":
      "Стандарт болон орчин үеийн технологи дээр суурилсан олон улсын шинэлэг туршлагыг нэвтрүүлж, үйлчлүүлэгчдэд найдвартай үйлчилгээ үзүүлэх.",
    "about.vision.title": "Алсын хараа",
    "about.vision.description":
      "Эвдэлгүй шалгалтын салбарын хөгжлийн бүх талаар тэргүүлэгч байх.",
    "about.values.title": "Үнэт зүйлс",
    "about.values.description":
      "Ил тод байдал, үнэнч шударга байдал, бие даасан байдал, ёс зүйн соёл, өндөр мэргэшил.",
    "about.history.title": "Түүх",
    "about.history.description":
      "2008 онд үүсгэн байгуулагдсан, NDT салбарт 15 гаруй жил тасралтгүй үйл ажиллагаа явуулж байна.",

    // Services
    "services.tag": "Үйлчилгээ",
    "services.title": "NDT шийдлүүд",
    "services.description":
      "Бид бүх аж үйлдвэрийн салбарт суурилуулалт болон ашиглалтын үеийн хяналт шалгалтын бүрэн хүрээний эвдэлгүй шалгалтын аргуудыг санал болгодог.",
    "services.applications": "Хэрэглээ",

    // Statistics
    "stats.tag": "Амжилт",
    "stats.title": "Батлагдсан туршлага",
    "stats.description":
      "Манай өргөн туршлага тоон үзүүлэлтээр илэрхийлэгддэг. Монголын аж үйлдвэрийн салбарт бидний үзүүлсэн нөлөөллийг танилцуулж байна.",

    // Human Resources
    "hr.tag": "Хүний нөөц",
    "hr.title": "Мэргэжлийн баг",
    "hr.description":
      "Манай стратеги нь орчин үеийн хүний нөөцийн арга барил, тасралтгүй боловсрол, багаар ажиллах чадварт суурилсан өрсөлдөхүйц ажиллах хүчинг бэлтгэхэд чиглэгддэг.",

    // Partners
    "partners.tag": "Түншүүд",
    "partners.title": "Салбарын тэргүүлэгчдийн итгэл",
    "partners.description":
      "Бид Монголын тэргүүлэх компаниудтай хамтран ажиллаж, олон улсын брэндүүдийн албан ёсны борлуулагч болж ажилладаг.",
    "partners.distributor": "Албан ёсны борлуулагч",
    "partners.distributorDesc":
      "Монголд KOSEN болон HUATEC брэндүүдийг төлөөлж байна",

    // Contact
    "contact.tag": "Холбоо барих",
    "contact.title": "Бидэнтэй холбогдох",
    "contact.description":
      "Таны аж үйлдвэрийн төслүүдийн аюулгүй байдал, чанарыг хангахад бэлэн үү? Манай мэргэжилтнүүдтэй холбогдоорой.",
    "contact.headOffice": "Төв оффис",
    "contact.phone": "Утас",
    "contact.email": "Имэйл",
    "contact.website": "Вэб",
    "contact.requestInspection": "Шалгалт захиалах",
    "contact.ctaDescription":
      "Манай гэрчилгээтэй мэргэжилтнүүд таны хэрэгцээнд нийцсэн NDT шийдлүүдээр туслахад бэлэн байна.",
    "contact.ctaButton": "Өнөөдөр холбогдох",
    "contact.businessHours": "Ажлын цаг: Даваа - Баасан, 9:00 - 18:00",
    "contact.modalTitle": "Холбоо барих",
    "contact.modalDescription":
      "Танд асуулт байна уу эсвэл тусламж хэрэгтэй юу? Доорх маягтыг бөглөнө үү, бид тантай удахгүй холбогдох болно.",
    "contact.form.name": "Овог нэр",
    "contact.form.namePlaceholder": "Овог нэрээ оруулна уу",
    "contact.form.email": "Имэйл хаяг",
    "contact.form.emailPlaceholder": "Имэйл хаягаа оруулна уу",
    "contact.form.message": "Зурвас",
    "contact.form.messagePlaceholder": "Энд зурвасаа бичнэ үү",
    "contact.form.send": "Илгээх",
    "contact.form.cancel": "Цуцлах",

    // News
    "news.tag": "Мэдээ, мэдээлэл",
    "news.title": "Сүүлийн үеийн мэдээ",
    "news.description":
      "Манай сүүлийн үеийн төслүүд, амжилтууд болон салбарын мэдээллийг авах.",
    "news.readMore": "Дэлгэрэнгүй",
    "news.backToNews": "Мэдээ рүү буцах",

    // Footer
    "footer.certifications": "Гэрчилгээ",
    "footer.quickLinks": "Холбоосууд",
    "footer.contactInfo": "Холбоо барих",
    "footer.years": "15+ жилийн техникийн туршлага",
  },
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>("en");

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};
