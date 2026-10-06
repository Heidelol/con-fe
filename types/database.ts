/**
 * Tipos TypeScript de la base de datos Supabase para Con Fe.
 *
 * En un entorno con Supabase CLI conectado a un proyecto remoto, estos tipos
 * pueden generarse automáticamente ejecutando:
 * `npx supabase gen types typescript --project-id <id> > types/database.ts`
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      intentions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          note: string | null;
          category: string | null;
          status: "praying" | "answered" | "gratitude" | "archived";
          created_at: string;
          updated_at: string;
          resolved_at: string | null;
        };
        Insert: {
          id?: string;
          user_id?: string; // Default auth.uid() asignado por PostgreSQL
          title: string;
          note?: string | null;
          category?: string | null;
          status?: "praying" | "answered" | "gratitude" | "archived";
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          note?: string | null;
          category?: string | null;
          status?: "praying" | "answered" | "gratitude" | "archived";
          created_at?: string;
          updated_at?: string;
          resolved_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "intentions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      intention_status: "praying" | "answered" | "gratitude" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
