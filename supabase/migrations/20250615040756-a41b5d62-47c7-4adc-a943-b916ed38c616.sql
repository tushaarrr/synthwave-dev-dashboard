
-- Create table for storing prompt refinement history
CREATE TABLE public.prompt_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  original_prompt TEXT NOT NULL,
  refined_prompt TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 10),
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.prompt_history ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own prompt history" 
  ON public.prompt_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompt history" 
  ON public.prompt_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompt history" 
  ON public.prompt_history 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompt history" 
  ON public.prompt_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_prompt_history_user_created ON public.prompt_history(user_id, created_at DESC);
