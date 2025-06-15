
-- Add new columns to the plans table for the enhanced StackWizard features
ALTER TABLE public.plans 
ADD COLUMN modules JSONB,
ADD COLUMN bonus_modules JSONB,
ADD COLUMN architecture JSONB,
ADD COLUMN testing_strategy JSONB,
ADD COLUMN team_plan JSONB,
ADD COLUMN budget_estimate JSONB,
ADD COLUMN product_scope TEXT;
