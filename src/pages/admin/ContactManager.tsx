import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Save, Upload, X } from "lucide-react";
import ContactsInbox from "./ContactsInbox";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image_path: string | null;
  updated_at: string;
}

export default function ContactManager() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const { data, error } = await supabase
        .from("contact")
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setContact(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
        });

        if (data.image_path) {
          const { data: urlData } = supabase.storage
            .from("contact-images")
            .getPublicUrl(data.image_path);
          setImagePreview(urlData.publicUrl);
        }
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imagePath = contact?.image_path || null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("contact-images")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        imagePath = fileName;

        if (contact?.image_path) {
          await supabase.storage
            .from("contact-images")
            .remove([contact.image_path]);
        }
      }

      if (contact) {
        const { error } = await supabase
          .from("contact")
          .update({
            ...formData,
            image_path: imagePath,
            updated_at: new Date().toISOString(),
          })
          .eq("id", contact.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("contact").insert([
          {
            ...formData,
            image_path: imagePath,
          },
        ]);

        if (error) throw error;
      }

      await fetchContact();
      setImageFile(null);
      alert("Contact information saved successfully!");
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Error saving contact information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Contact Information
        </h2>
        <p className="text-slate-600 mt-1">
          Manage your contact details displayed on the website
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="Company or Contact Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="contact@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="+1 234 567 8900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                placeholder="123 Main St, City, Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Contact Image
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Contact preview"
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 mb-1">Click to upload image</p>
                    <p className="text-xs text-slate-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-slate-900 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition disabled:opacity-50">
              <Save className="w-5 h-5" />
              {saving ? "Saving..." : "Save Contact Information"}
            </button>
          </div>
        </form>
      </div>
      <ContactsInbox />
    </div>
  );
}
