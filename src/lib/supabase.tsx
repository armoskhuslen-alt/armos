import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      news: {
        Row: {
          id: string;
          title: string;
          content: string;
          cat: string;
          pdf_file_path: string | null;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["news"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["news"]["Insert"]>;
      };
      services: {
        Row: {
          id: string;
          title: string;
          description: string;
          icon: string | null; // 👈 ADD THIS
          files: string[] | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["services"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["services"]["Insert"]>;
      };

      contact: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          address: string;
          image_path: string | null;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["contact"]["Row"],
          "id" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["contact"]["Insert"]>;
      };
      partners: {
        Row: {
          id: string;
          name: string;
          description: string;
          logo_path: string | null;
          website: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["partners"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["partners"]["Insert"]>;
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          content: string;
          created_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["contacts"]["Row"],
          "id" | "created_at"
        >;
        Update: Partial<Database["public"]["Tables"]["contacts"]["Insert"]>;
      };
    };
  };
};
