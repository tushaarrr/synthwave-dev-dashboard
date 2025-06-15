export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      code_lens_history: {
        Row: {
          bottlenecks: string[] | null
          complexity: string | null
          created_at: string
          explanation: string | null
          id: string
          language: string
          optimized_code: string | null
          original_code: string
          suggestions: string | null
          user_id: string
        }
        Insert: {
          bottlenecks?: string[] | null
          complexity?: string | null
          created_at?: string
          explanation?: string | null
          id?: string
          language: string
          optimized_code?: string | null
          original_code: string
          suggestions?: string | null
          user_id: string
        }
        Update: {
          bottlenecks?: string[] | null
          complexity?: string | null
          created_at?: string
          explanation?: string | null
          id?: string
          language?: string
          optimized_code?: string | null
          original_code?: string
          suggestions?: string | null
          user_id?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string | null
          description: string | null
          gantt_chart: string | null
          id: string
          project_name: string | null
          requirements: string | null
          suggestions: string | null
          tech_stack: string | null
          timeline: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          gantt_chart?: string | null
          id?: string
          project_name?: string | null
          requirements?: string | null
          suggestions?: string | null
          tech_stack?: string | null
          timeline?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          gantt_chart?: string | null
          id?: string
          project_name?: string | null
          requirements?: string | null
          suggestions?: string | null
          tech_stack?: string | null
          timeline?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      prompt_history: {
        Row: {
          created_at: string
          id: string
          original_prompt: string
          refined_prompt: string
          score: number
          tags: string[]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          original_prompt: string
          refined_prompt: string
          score: number
          tags?: string[]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          original_prompt?: string
          refined_prompt?: string
          score?: number
          tags?: string[]
          user_id?: string
        }
        Relationships: []
      }
      sql_analysis_history: {
        Row: {
          created_at: string
          explanation: string | null
          id: string
          optimized_query: string | null
          original_query: string
          suggestions: string[] | null
          tags: string[] | null
          user_id: string
        }
        Insert: {
          created_at?: string
          explanation?: string | null
          id?: string
          optimized_query?: string | null
          original_query: string
          suggestions?: string[] | null
          tags?: string[] | null
          user_id: string
        }
        Update: {
          created_at?: string
          explanation?: string | null
          id?: string
          optimized_query?: string | null
          original_query?: string
          suggestions?: string[] | null
          tags?: string[] | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
