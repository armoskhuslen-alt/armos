import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  X,
  Upload,
  Icon,
  LucideIcon,
} from "lucide-react";
import {
  Radio,
  Scan,
  Magnet,
  Eye,
  Droplets,
  Ruler,
  Building2,
  Flame,
  ArrowRight,
} from "lucide-react";
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null; // ✅ ADD
  files: string[] | null;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Radio", // ✅ default icon
    active: true,
  });

  const [files, setFiles] = useState<File[]>([]);

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedPaths: string[] = editingService?.files || [];

      if (files && files.length > 0) {
        const newPaths: string[] = [];

        for (const file of files) {
          const ext = file.name.split(".").pop();
          const fileName = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

          const { error } = await supabase.storage
            .from("service-pdfs")
            .upload(fileName, file);

          if (error) throw error;
          newPaths.push(fileName);
        }

        uploadedPaths = editingService
          ? [...uploadedPaths, ...newPaths]
          : newPaths;
      }

      if (editingService) {
        const { error } = await supabase
          .from("services")
          .update({
            ...formData,
            files: uploadedPaths,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingService.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([
          {
            ...formData,
            files: uploadedPaths,
          },
        ]);

        if (error) throw error;
      }

      await fetchServices();
      closeModal();
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Error saving service");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, item: string[] | null) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      if (item?.length) {
        await supabase.storage.from("service-pdfs").remove(item);
      }

      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Error deleting service");
    }
  };

  const openModal = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        title: service.title,
        description: service.description,
        icon: service.icon || "Radio",
        active: service.active,
      });
    } else {
      setEditingService(null);
      setFormData({ title: "", description: "", icon: "Radio", active: true });
    }
    setFiles(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setFormData({ title: "", description: "", icon: "Radio", active: true });
    setFiles(null);
  };

  const getPdfUrl = (path: string) => {
    const { data } = supabase.storage.from("service-pdfs").getPublicUrl(path);
    return data.publicUrl;
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Services Management
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      <div className="grid gap-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {item.active && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Active
                    </span>
                  )}
                </div>
                {item.icon &&
                  (() => {
                    const icons: Record<string, LucideIcon> = {
                      Radio,
                      Scan,
                      Magnet,
                      Eye,
                      Droplets,
                      Ruler,
                      Building2,
                      Flame,
                      ArrowRight,
                    };

                    const IconComponent = icons[item.icon];

                    return IconComponent ? (
                      <div className="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    ) : null;
                  })()}

                <p className="text-slate-600 mb-3">{item.description}</p>
                {item.files?.map((path) => (
                  <a
                    key={path}
                    href={getPdfUrl(path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    View PDF
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() =>
                    handleDelete(
                      item.id,
                      item?.files?.length ? item.files : null
                    )
                  }
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {services.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">
              No services yet. Create your first one!
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Icon
                </label>

                <select
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg">
                  {[
                    "Radio",
                    "Scan",
                    "Magnet",
                    "Eye",
                    "Droplets",
                    "Ruler",
                    "Building2",
                    "Flame",
                    "ArrowRight",
                  ].map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  PDF File
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                    className="hidden"
                    id="pdf-upload"
                  />

                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      {files && files?.length > 0
                        ? files.map((f) => f.name).join(", ")
                        : "Click to upload PDFs"}
                    </p>
                  </label>
                  {editingService?.files && !files && (
                    <p className="text-xs text-slate-500 mt-2">
                      Current file will be kept if no new file is uploaded
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) =>
                    setFormData({ ...formData, active: e.target.checked })
                  }
                  className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                />
                <label
                  htmlFor="active"
                  className="text-sm font-medium text-slate-700">
                  Active
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition disabled:opacity-50">
                  {uploading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
