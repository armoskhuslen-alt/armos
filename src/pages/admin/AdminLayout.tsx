import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Newspaper,
  Briefcase,
  Mail,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: "news" | "services" | "contact" | "partners";
  onTabChange: (tab: "news" | "services" | "contact" | "partners") => void;
}

export default function AdminLayout({
  children,
  activeTab,
  onTabChange,
}: AdminLayoutProps) {
  const { signOut, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "news" as const, label: "News", icon: Newspaper },
    { id: "services" as const, label: "Services", icon: Briefcase },
    { id: "contact" as const, label: "Contact", icon: Mail },
    { id: "partners" as const, label: "Partners", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 transition">
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="flex">
        <aside
          className={`${
            mobileMenuOpen ? "block" : "hidden"
          } lg:block fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 z-50`}>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-slate-900 hidden lg:block">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-600 mt-1 hidden lg:block">
              {user?.email}
            </p>
          </div>

          <nav className="px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}>
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
