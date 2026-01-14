import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ClientContact {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
}

const PAGE_SIZE = 10;

export default function ContactsInbox() {
  const [contacts, setContacts] = useState<ClientContact[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("contacts")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error) {
      setContacts(data || []);
      setTotal(count || 0);
    }

    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchContacts();
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (loading) return <div className="py-8 text-center">Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Client Messages</h2>

      <div className="bg-white rounded-lg border border-slate-200 divide-y">
        {contacts.map((item) => (
          <div key={item.id} className="p-4 hover:bg-slate-50">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-500">{item.email}</p>
              </div>
              <p className="text-xs text-slate-400">
                {new Date(item.created_at).toLocaleString()}
              </p>
            </div>

            <p className="mt-2 text-slate-700 whitespace-pre-line">
              {item.content}
            </p>
          </div>
        ))}

        {contacts.length === 0 && (
          <p className="p-6 text-center text-slate-500">No messages found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-slate-600">
          Page {page} of {totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50">
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
