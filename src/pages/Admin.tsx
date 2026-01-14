import { useState } from "react";
import AdminLayout from "./admin/AdminLayout";
import NewsManager from "./admin/NewsManager";
import ServicesManager from "./admin/ServicesManager";
import ContactManager from "./admin/ContactManager";
import PartnersManager from "./admin/PartnersManager";

type Tab = "news" | "services" | "contact" | "partners";

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("news");

  const renderContent = () => {
    switch (activeTab) {
      case "news":
        return <NewsManager />;
      case "services":
        return <ServicesManager />;
      case "contact":
        return <ContactManager />;
      case "partners":
        return <PartnersManager />;
      default:
        return <NewsManager />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AdminLayout>
  );
}
