import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Statistics } from "@/components/sections/Statistics";
import { HumanResources } from "@/components/sections/HumanResources";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Statistics />
        <HumanResources />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
