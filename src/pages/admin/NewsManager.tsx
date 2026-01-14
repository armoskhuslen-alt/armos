import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, FileText, X, Upload } from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  cat: string;
  pdf_file_path: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function NewsManager() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cat: "",
    published: false,
  });
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let pdfPath = editingNews?.pdf_file_path || null;

      if (pdfFile) {
        const fileExt = pdfFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("news-pdfs")
          .upload(fileName, pdfFile);

        if (uploadError) throw uploadError;
        pdfPath = fileName;

        if (editingNews?.pdf_file_path) {
          await supabase.storage
            .from("news-pdfs")
            .remove([editingNews.pdf_file_path]);
        }
      }

      if (editingNews) {
        const { error } = await supabase
          .from("news")
          .update({
            ...formData,
            pdf_file_path: pdfPath,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingNews.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([
          {
            ...formData,
            pdf_file_path: pdfPath,
          },
        ]);

        if (error) throw error;
      }

      await fetchNews();
      closeModal();
    } catch (error) {
      console.error("Error saving news:", error);
      alert("Error saving news");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, pdfPath: string | null) => {
    if (!confirm("Are you sure you want to delete this news item?")) return;

    try {
      if (pdfPath) {
        await supabase.storage.from("news-pdfs").remove([pdfPath]);
      }

      const { error } = await supabase.from("news").delete().eq("id", id);

      if (error) throw error;
      await fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Error deleting news");
    }
  };

  const openModal = (newsItem?: News) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        content: newsItem.content,
        cat: newsItem.cat,
        published: newsItem.published,
      });
    } else {
      setEditingNews(null);
      setFormData({ title: "", content: "", cat: "", published: false });
    }
    setPdfFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({ title: "", content: "", cat: "", published: false });
    setPdfFile(null);
  };

  const getPdfUrl = (path: string) => {
    const { data } = supabase.storage.from("news-pdfs").getPublicUrl(path);
    return data.publicUrl;
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-900">News Management</h2>
        <button
          onClick={() => openModal()}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition">
          <Plus className="w-5 h-5" />
          Add News
        </button>
      </div>

      <div className="grid gap-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  {item.published && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Published
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mb-3">{item.content}</p>
                {item.pdf_file_path && (
                  <a
                    href={getPdfUrl(item.pdf_file_path)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    show image
                  </a>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.pdf_file_path)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {news.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
            <p className="text-slate-500">
              No news items yet. Create your first one!
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">
                {editingNews ? "Edit News" : "Add News"}
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
                  Category
                </label>
                <input
                  type="text"
                  value={formData.cat}
                  onChange={(e) =>
                    setFormData({ ...formData, cat: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
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
                    onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="pdf-upload"
                  />
                  <label htmlFor="pdf-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      {pdfFile ? pdfFile.name : "Click to upload PDF"}
                    </p>
                  </label>
                  {editingNews?.pdf_file_path && !pdfFile && (
                    <p className="text-xs text-slate-500 mt-2">
                      Current file will be kept if no new file is uploaded
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900"
                />
                <label
                  htmlFor="published"
                  className="text-sm font-medium text-slate-700">
                  Published
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
