export interface NewsItem {
  id: string;
  slug: string;
  date: string;
  image: string;
  category: string;
  categoryMn: string;
  title: {
    en: string;
    mn: string;
  };
  excerpt: {
    en: string;
    mn: string;
  };
  content: {
    en: string;
    mn: string;
  };
}

export const newsData: NewsItem[] = [
  {
    id: "1",
    slug: "iso-certification-renewal-2024",
    date: "2024-12-15",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    category: "Certification",
    categoryMn: "Гэрчилгээ",
    title: {
      en: "ISO 9001:2015 Certification Successfully Renewed",
      mn: "ISO 9001:2015 гэрчилгээг амжилттай сунгалаа",
    },
    excerpt: {
      en: "ARMOS has successfully renewed its ISO 9001:2015 certification, reaffirming our commitment to quality management systems.",
      mn: "АРМОС ISO 9001:2015 гэрчилгээг амжилттай сунгаж, чанарын удирдлагын тогтолцоонд тууштай хандлагаа баталлаа.",
    },
    content: {
      en: `ARMOS is proud to announce the successful renewal of our ISO 9001:2015 certification. This achievement reflects our ongoing commitment to maintaining the highest standards of quality management across all our non-destructive testing services.

The recertification process involved a comprehensive audit of our quality management systems, procedures, and operational practices. Our team demonstrated exceptional dedication to maintaining and improving our processes.

This certification renewal ensures that our clients continue to receive services that meet international quality standards, reinforcing ARMOS's position as Mongolia's leading NDT service provider.`,
      mn: `АРМОС ISO 9001:2015 гэрчилгээг амжилттай сунгасанаа мэдэгдэж байна. Энэхүү амжилт нь бидний эвдэлгүй шалгалтын бүх үйлчилгээнд чанарын удирдлагын хамгийн өндөр стандартыг хадгалах тууштай хандлагыг илэрхийлж байна.

Дахин гэрчилгээжүүлэх үйл явц нь манай чанарын удирдлагын тогтолцоо, журам, үйл ажиллагааны практикийг иж бүрнээр шалгасан. Манай баг үйл явцыг хадгалах, сайжруулахад онцгой хандлага үзүүлсэн.

Энэхүү гэрчилгээний сунгалт нь манай үйлчлүүлэгчид олон улсын чанарын стандартад нийцсэн үйлчилгээг үргэлжлүүлэн авахыг баталгаажуулж, АРМОС-ын Монголын тэргүүлэх NDT үйлчилгээ үзүүлэгч болохыг бэхжүүлж байна.`,
    },
  },
  {
    id: "2",
    slug: "oyu-tolgoi-partnership-expansion",
    date: "2024-11-20",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
    category: "Partnership",
    categoryMn: "Түншлэл",
    title: {
      en: "Expanded Partnership with Oyu Tolgoi Mining Complex",
      mn: "Оюу толгой уурхайн цогцолбортой түншлэлээ өргөжүүллээ",
    },
    excerpt: {
      en: "ARMOS strengthens its partnership with Oyu Tolgoi, providing comprehensive NDT services for the underground expansion project.",
      mn: "АРМОС Оюу толгойтой түншлэлээ бэхжүүлж, газар доорх өргөтгөлийн төсөлд иж бүрэн NDT үйлчилгээ үзүүлж байна.",
    },
    content: {
      en: `We are pleased to announce the expansion of our partnership with Oyu Tolgoi, one of the world's largest copper-gold mining operations. ARMOS will provide comprehensive non-destructive testing services for the underground expansion project.

Our scope of work includes ultrasonic testing, radiography, and visual inspections of critical infrastructure components. This partnership demonstrates the trust that major industry players place in ARMOS's expertise and capabilities.

The project will span multiple years and involve deploying our most experienced NDT professionals to ensure the highest safety and quality standards are maintained throughout the construction and operational phases.`,
      mn: `Бид дэлхийн хамгийн том зэс-алтны уурхайн үйл ажиллагааны нэг болох Оюу толгойтой түншлэлээ өргөжүүлж байгаагаа мэдэгдэж байна. АРМОС газар доорх өргөтгөлийн төсөлд иж бүрэн эвдэлгүй шалгалтын үйлчилгээ үзүүлнэ.

Манай ажлын хүрээнд чухал дэд бүтцийн хэсгүүдийн хэт авианы шалгалт, рентген, визуаль шалгалт багтана. Энэхүү түншлэл нь томоохон салбарын тоглогчид АРМОС-ын мэргэжил, чадамжид итгэл тавьж байгааг харуулж байна.

Төсөл нь олон жилийн хугацаанд үргэлжлэх бөгөөд барилга угсралт, ашиглалтын бүх үе шатанд аюулгүй байдал, чанарын хамгийн өндөр стандартыг хангахын тулд манай хамгийн туршлагатай NDT мэргэжилтнүүдийг ажиллуулна.`,
    },
  },
  {
    id: "3",
    slug: "new-ultrasonic-equipment",
    date: "2024-10-05",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
    category: "Technology",
    categoryMn: "Технологи",
    title: {
      en: "Investment in Advanced Ultrasonic Testing Equipment",
      mn: "Орчин үеийн хэт авианы шалгалтын тоног төхөөрөмжид хөрөнгө оруулалт",
    },
    excerpt: {
      en: "ARMOS invests in state-of-the-art phased array ultrasonic testing equipment to enhance inspection capabilities.",
      mn: "АРМОС хяналтын чадамжийг сайжруулахын тулд орчин үеийн фазын массив хэт авианы шалгалтын тоног төхөөрөмжид хөрөнгө оруулав.",
    },
    content: {
      en: `ARMOS continues to invest in cutting-edge technology with the acquisition of advanced phased array ultrasonic testing (PAUT) equipment. This investment significantly enhances our inspection capabilities and efficiency.

The new equipment provides superior defect detection and sizing capabilities compared to conventional ultrasonic testing methods. It enables faster inspections while providing more detailed and accurate results.

This technological advancement positions ARMOS at the forefront of NDT services in Mongolia, ensuring our clients have access to the most advanced inspection technologies available in the industry.`,
      mn: `АРМОС орчин үеийн фазын массив хэт авианы шалгалтын (PAUT) тоног төхөөрөмжийг худалдаж авснаар дэвшилтэт технологид хөрөнгө оруулсаар байна. Энэхүү хөрөнгө оруулалт нь манай хяналтын чадамж, үр ашгийг мэдэгдэхүйц сайжруулж байна.

Шинэ тоног төхөөрөмж нь уламжлалт хэт авианы шалгалтын аргуудтай харьцуулахад согог илрүүлэх, хэмжих чадамжийг давуу эрхтэйгээр хангана. Энэ нь илүү нарийвчилсан, үнэн зөв үр дүнг өгөхийн зэрэгцээ хурдан шалгалт хийх боломжийг олгодог.

Энэхүү технологийн дэвшил нь АРМОС-ыг Монголын NDT үйлчилгээний тэргүүн эгнээнд байрлуулж, манай үйлчлүүлэгчид салбарт байгаа хамгийн дэвшилтэт шалгалтын технологиудад хандах боломжтой болгож байна.`,
    },
  },
  {
    id: "4",
    slug: "15-years-anniversary",
    date: "2024-09-01",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800",
    category: "Milestone",
    categoryMn: "Чухал үйл явдал",
    title: {
      en: "Celebrating 15 Years of Excellence in NDT Services",
      mn: "NDT үйлчилгээний 15 жилийн амжилтыг тэмдэглэж байна",
    },
    excerpt: {
      en: "ARMOS celebrates 15 years of providing world-class non-destructive testing services across Mongolia.",
      mn: "АРМОС Монгол даяар дэлхийн түвшний эвдэлгүй шалгалтын үйлчилгээ үзүүлсэн 15 жилийн ойгоо тэмдэглэж байна.",
    },
    content: {
      en: `This year marks a significant milestone for ARMOS as we celebrate 15 years of excellence in non-destructive testing services. Since our founding in 2008, we have grown to become Mongolia's leading NDT service provider.

Over the past 15 years, we have:
- Inspected over 51,400 m³ of concrete structures
- Tested more than 2,350 km of pipelines
- Certified over 7,500 pressure gauges
- Built partnerships with major industry players

We extend our gratitude to our clients, partners, and dedicated team members who have made this journey possible. As we look to the future, we remain committed to innovation, quality, and safety in everything we do.`,
      mn: `Энэ жил АРМОС-д эвдэлгүй шалгалтын үйлчилгээний 15 жилийн алдартай ойг тэмдэглэж буй чухал хөлрөө байна. 2008 онд үүсгэн байгуулагдсанаас хойш бид Монголын тэргүүлэх NDT үйлчилгээ үзүүлэгч болж өссөн.

Сүүлийн 15 жилийн хугацаанд бид:
- 51,400 м³-ээс дээш бетон байгууламжийг шалгасан
- 2,350 км-ээс дээш хоолойг турших
- 7,500 гаруй даралт хэмжигчийг баталгаажуулсан
- Томоохон салбарын тоглогчидтой түншлэл байгуулсан

Энэ замыг боломжтой болгосон үйлчлүүлэгчид, түншүүд, хүлээцтэй багийн гишүүддээ талархлаа илэрхийлж байна. Бид ирээдүй рүү харахдаа бүх үйл хэрэгтээ инноваци, чанар, аюулгүй байдалд тууштай байх болно.`,
    },
  },
  {
    id: "5",
    slug: "employee-certification-program",
    date: "2024-08-10",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    category: "Training",
    categoryMn: "Сургалт",
    title: {
      en: "Launch of Enhanced Employee Certification Program",
      mn: "Ажилтны гэрчилгээжүүлэлтийн сайжруулсан хөтөлбөрийг эхлүүллээ",
    },
    excerpt: {
      en: "ARMOS launches comprehensive certification program to ensure all NDT professionals meet MNS ISO 9712:2019 standards.",
      mn: "АРМОС бүх NDT мэргэжилтнүүд MNS ISO 9712:2019 стандартад нийцэж байгаа эсэхийг баталгаажуулах иж бүрэн гэрчилгээжүүлэлтийн хөтөлбөрийг эхлүүлэв.",
    },
    content: {
      en: `ARMOS has launched an enhanced employee certification program designed to ensure all our NDT professionals meet or exceed the requirements of MNS ISO 9712:2019.

The program includes:
- Comprehensive theoretical training
- Hands-on practical exercises
- Regular competency assessments
- Continuous professional development

This investment in our people reflects our commitment to maintaining the highest standards of professional competence in the industry. Certified professionals are the foundation of reliable NDT services.`,
      mn: `АРМОС бүх NDT мэргэжилтнүүд маань MNS ISO 9712:2019-ийн шаардлагыг хангах эсвэл давахаар бүтээгдсэн ажилтны гэрчилгээжүүлэлтийн сайжруулсан хөтөлбөрийг эхлүүлсэн.

Хөтөлбөрт багтсан зүйлс:
- Иж бүрэн онолын сургалт
- Практик дасгал ажил
- Тогтмол чадамжийн үнэлгээ
- Тасралтгүй мэргэжлийн хөгжил

Хүмүүстээ хийсэн энэхүү хөрөнгө оруулалт нь салбарын мэргэжлийн чадамжийн хамгийн өндөр стандартыг хадгалах манай амлалтыг илэрхийлж байна. Гэрчилгээтэй мэргэжилтнүүд найдвартай NDT үйлчилгээний суурь юм.`,
    },
  },
];
