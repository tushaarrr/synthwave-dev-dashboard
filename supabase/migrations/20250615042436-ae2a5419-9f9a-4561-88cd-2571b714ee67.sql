
-- Create table for storing code analysis history
CREATE TABLE public.code_lens_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  language TEXT NOT NULL,
  original_code TEXT NOT NULL,
  complexity TEXT,
  bottlenecks TEXT[],
  suggestions TEXT,
  optimized_code TEXT,
  explanation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.code_lens_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own code analysis history" 
  ON public.code_lens_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own code analysis history" 
  ON public.code_lens_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own code analysis history" 
  ON public.code_lens_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own code analysis history" 
  ON public.code_lens_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_code_lens_history_user_created ON public.code_lens_history(user_id, created_at DESC);
