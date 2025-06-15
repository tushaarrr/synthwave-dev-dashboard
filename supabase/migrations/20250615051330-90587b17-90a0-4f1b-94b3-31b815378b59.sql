
-- Create table for SQL analysis history
CREATE TABLE public.sql_analysis_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  original_query TEXT NOT NULL,
  explanation TEXT,
  suggestions TEXT[],
  optimized_query TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.sql_analysis_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own SQL analysis history" 
  ON public.sql_analysis_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own SQL analysis" 
  ON public.sql_analysis_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own SQL analysis" 
  ON public.sql_analysis_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own SQL analysis" 
  ON public.sql_analysis_history 
  FOR DELETE 
  USING (auth.uid() = user_id);
