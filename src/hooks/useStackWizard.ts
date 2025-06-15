import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Module {
  name: string;
  description: string;
  dependencies: string[];
  ai_used: boolean;
}

interface BonusModule {
  name: string;
  description: string;
}

interface Architecture {
  pattern: string;
  reason: string;
  api_style: string;
  api_reason: string;
  database_type: string;
  database_reason: string;
}

interface TestingStrategy {
  types: string[];
  tools: Record<string, string>;
  ai_testing?: string;
}

interface TeamRole {
  role: string;
  responsibilities: string;
}

interface TeamPlan {
  roles: TeamRole[];
  team_size: string;
  duration: string;
}

interface BudgetEstimate {
  development: {
    team_cost: string;
    duration: string;
    total: string;
  };
  infrastructure: {
    hosting: string;
    ai_services: string;
    third_party: string;
    total_monthly: string;
  };
  total_project: string;
}

interface TimelineWeek {
  week: number;
  title: string;
  tasks: string[];
  progress: number;
}

interface ProjectPlan {
  product_scope: string;
  tech_stack: any;
  modules: Module[];
  bonus_modules: BonusModule[];
  architecture: Architecture;
  testing_strategy: TestingStrategy;
  timeline: TimelineWeek[];
  team_plan: TeamPlan;
  budget_estimate: BudgetEstimate;
  suggestions: string[];
  // Legacy fields for backward compatibility
  techStack?: string;
  ganttChart?: string;
}

export const useStackWizard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProjectPlan | null>(null);
  const { user } = useAuth();

  const generatePlan = async (projectName: string, description: string, requirements: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-stack-plan', {
        body: {
          projectName,
          projectDescription: description,
          specificRequirements: requirements
        }
      });

      if (error) throw error;

      console.log('Received plan data:', data);

      // Handle both new JSON format and legacy format
      let planData: ProjectPlan;
      
      if (data.product_scope && data.modules) {
        // New JSON format
        planData = {
          product_scope: data.product_scope,
          tech_stack: data.tech_stack,
          modules: data.modules || [],
          bonus_modules: data.bonus_modules || [],
          architecture: data.architecture || {
            pattern: '',
            reason: '',
            api_style: '',
            api_reason: '',
            database_type: '',
            database_reason: ''
          },
          testing_strategy: data.testing_strategy || {
            types: [],
            tools: {}
          },
          timeline: data.timeline || [],
          team_plan: data.team_plan || {
            roles: [],
            team_size: '',
            duration: ''
          },
          budget_estimate: data.budget_estimate || {
            development: {
              team_cost: '',
              duration: '',
              total: ''
            },
            infrastructure: {
              hosting: '',
              ai_services: '',
              third_party: '',
              total_monthly: ''
            },
            total_project: ''
          },
          suggestions: data.suggestions || []
        };
      } else {
        // Legacy format - convert to new structure
        planData = {
          product_scope: description,
          tech_stack: data.techStack || data.tech_stack,
          modules: [],
          bonus_modules: [],
          architecture: {
            pattern: '',
            reason: '',
            api_style: '',
            api_reason: '',
            database_type: '',
            database_reason: ''
          },
          testing_strategy: {
            types: [],
            tools: {}
          },
          timeline: [],
          team_plan: {
            roles: [],
            team_size: '',
            duration: ''
          },
          budget_estimate: {
            development: {
              team_cost: '',
              duration: '',
              total: ''
            },
            infrastructure: {
              hosting: '',
              ai_services: '',
              third_party: '',
              total_monthly: ''
            },
            total_project: ''
          },
          suggestions: typeof data.suggestions === 'string' ? [data.suggestions] : (data.suggestions || []),
          // Keep legacy fields for backward compatibility
          techStack: data.techStack,
          ganttChart: data.ganttChart
        };
      }

      setResult(planData);

      // Note: Saving to database is temporarily disabled due to type mismatch
      // This will be re-enabled once the database types are properly synced
      console.log('Plan generated successfully, database save skipped due to type issues');

      return planData;
    } catch (error) {
      console.error('Error generating plan:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generatePlan,
    isLoading,
    result,
    setResult
  };
};
