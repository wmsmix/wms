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
      // Define your tables here as you create them in Supabase
      instruments: {
        Row: {
          id: number;
          name: string;
          count: number;
        };
        Insert: {
          id?: number;
          name: string;
          count?: number;
        };
        Update: {
          id?: number;
          name?: string;
          count?: number;
        };
      },
      // Example:
      // products: {
      //   Row: {
      //     id: string;
      //     name: string;
      //     description: string | null;
      //     price: number | null;
      //     created_at: string;
      //   };
      //   Insert: {
      //     id?: string;
      //     name: string;
      //     description?: string | null;
      //     price?: number | null;
      //     created_at?: string;
      //   };
      //   Update: {
      //     id?: string;
      //     name?: string;
      //     description?: string | null;
      //     price?: number | null;
      //     created_at?: string;
      //   };
      // };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Helper type for table rows
export type TableRow<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Row"];

// Helper type for inserting data
export type TableInsert<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Insert"];

// Helper type for updating data
export type TableUpdate<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Update"]; 