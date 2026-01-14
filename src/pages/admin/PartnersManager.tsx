import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, X, Upload, ExternalLink } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  description: string;
  logo_path: string | null;
  website: string | null;
  order_index: number;
  created_at: string;
}

export default function PartnersManager() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    order_index: 0,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let logoPath = editingPartner?.logo_path || null;

      if (logoFile) {
        const fileExt = logoFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("partner-logos")
          .upload(fileName, logoFile);

        if (uploadError) throw uploadError;
        logoPath = fileName;

        if (editingPartner?.logo_path) {
          await supabase.storage
            .from("partner-logos")
            .remove([editingPartner.logo_path]);
        }
      }

      if (editingPartner) {
        const { error } = await supabase
          .from("partners")
          .update({
            ...formData,
            logo_path: logoPath,
          })
          .eq("id", editingPartner.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("partners").insert([
          {
            ...formData,
            logo_path: logoPath,
          },
        ]);

        if (error) throw error;
      }

      await fetchPartners();
      closeModal();
    } catch (error) {
      console.error("Error saving partner:", error);
      alert("Error saving partner");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, logoPath: string | null) => {
    if (!confirm("Are you sure you want to delete this partner?")) return;

    try {
      if (logoPath) {
        await supabase.storage.from("partner-logos").remove([logoPath]);
      }

      const { error } = await supabase.from("partners").delete().eq("id", id);

      if (error) throw error;
      await fetchPartners();
    } catch (error) {
      console.error("Error deleting partner:", error);
      alert("Error deleting partner");
    }
  };

  const openModal = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        description: partner.description,
        website: partner.website || "",
        order_index: partner.order_index,
      });

      if (partner.logo_path) {
        const { data } = supabase.storage
          .from("partner-logos")
          .getPublicUrl(partner.logo_path);
        setLogoPreview(data.publicUrl);
      }
    } else {
      setEditingPartner(null);
      setFormData({
        name: "",
        description: "",
        website: "",
        order_index: partners.length,
      });
      setLogoPreview(null);
    }
    setLogoFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPartner(null);
    setFormData({ name: "", description: "", website: "", order_index: 0 });
    setLogoFile(null);
    setLogoPreview(null);
  };

  const getLogoUrl = (path: string) => {
    const { data } = supabase.storage.from("partner-logos").getPublicUrl(path);
    return data.publicUrl;
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Partners Management
        </h2>
        <button
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition">
          <Plus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            {partner.logo_path && (
              <div className="mb-4 h-24 flex items-center justify-center bg-slate-50 rounded-lg">
                <img
                  src={getLogoUrl(partner.logo_path)}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {partner.name}
            </h3>
            <p className="text-sm text-slate-600 mb-3 line-clamp-2">
              {partner.description}
            </p>
            {partner.website && (
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 mb-3">
                <ExternalLink className="w-3 h-3" />
                Visit Website
              </a>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => openModal(partner)}
                className="flex-1 px-3 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition flex items-center justify-center gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(partner.id, partner.logo_path)}
                className="px-3 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {partners.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">
              No partners yet. Add your first partner!
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {editingPartner ? "Edit Partner" : "Add Partner"}
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
                  Partner Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Partner Company Name"
                />
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
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="Brief description of the partnership"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Website (Optional)
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Partner Logo
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4">
                  {logoPreview ? (
                    <div className="relative">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="max-h-32 mx-auto object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setLogoFile(null);
                          setLogoPreview(null);
                        }}
                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                        id="logo-upload"
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">
                          Click to upload logo
                        </p>
                      </label>
                    </div>
                  )}
                </div>
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
