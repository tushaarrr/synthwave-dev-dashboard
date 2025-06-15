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
  deployment_strategy: string;
}

interface TestingStrategy {
  types: string[];
  tools: Record<string, string>;
  coverage_targets: Record<string, string>;
  ai_testing?: string;
  testing_environments: string[];
  automated_testing: string;
  manual_testing: string;
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
    if (!user) {
      console.error('No user authenticated');
      throw new Error('User not authenticated');
    }
    
    console.log('=== useStackWizard.generatePlan START ===');
    console.log('User ID:', user.id);
    console.log('Project name:', projectName);
    
    setIsLoading(true);
    try {
      console.log('Calling supabase function...');
      const { data, error } = await supabase.functions.invoke('generate-stack-plan', {
        body: {
          projectName,
          projectDescription: description,
          specificRequirements: requirements
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('=== RAW FUNCTION RESPONSE ===');
      console.log('Response type:', typeof data);
      console.log('Response data:', data);
      console.log('==============================');

      // Process the response data
      let planData: ProjectPlan;
      
      if (data && typeof data === 'object') {
        console.log('Processing structured response data');
        
        // Ensure all required fields exist with proper defaults
        planData = {
          product_scope: data.product_scope || description,
          tech_stack: data.tech_stack || {
            frontend: ['React', 'TypeScript'],
            backend: ['Node.js'],
            database: ['PostgreSQL'],
            hosting: ['Vercel']
          },
          modules: Array.isArray(data.modules) ? data.modules : [],
          bonus_modules: Array.isArray(data.bonus_modules) ? data.bonus_modules : [],
          architecture: data.architecture || {
            pattern: 'Modular Monolith',
            reason: 'Good for MVP development',
            api_style: 'REST',
            api_reason: 'Simple and widely supported',
            database_type: 'PostgreSQL',
            database_reason: 'Reliable and feature-rich',
            deployment_strategy: 'Container-based deployment'
          },
          testing_strategy: data.testing_strategy || {
            types: ['Unit Testing', 'Integration Testing'],
            tools: {
              unit: 'Jest',
              integration: 'Supertest'
            },
            coverage_targets: {
              unit: '80%',
              integration: '70%'
            },
            ai_testing: 'Test AI integrations and fallback scenarios',
            testing_environments: ['Development', 'Staging', 'Production'],
            automated_testing: 'CI/CD with automated testing',
            manual_testing: 'User acceptance and cross-browser testing'
          },
          timeline: Array.isArray(data.timeline) ? data.timeline : [],
          team_plan: data.team_plan || {
            roles: [
              {
                role: 'Full-Stack Developer',
                responsibilities: 'Full application development'
              }
            ],
            team_size: '2-3 people',
            duration: '4-6 weeks'
          },
          budget_estimate: data.budget_estimate || {
            development: {
              team_cost: '$10,000 - $15,000',
              duration: '4-6 weeks',
              total: '$12,500'
            },
            infrastructure: {
              hosting: '$50/month',
              ai_services: '$100/month',
              third_party: '$50/month',
              total_monthly: '$200/month'
            },
            total_project: '$13,100'
          },
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [
            'Focus on MVP features first',
            'Implement proper error handling',
            'Plan for mobile responsiveness'
          ]
        };
      } else {
        throw new Error('Invalid response format from AI service');
      }

      console.log('=== FINAL PROCESSED DATA ===');
      console.log('Modules count:', planData.modules?.length || 0);
      console.log('Timeline count:', planData.timeline?.length || 0);
      console.log('Budget exists:', !!planData.budget_estimate);
      console.log('Team plan exists:', !!planData.team_plan);
      console.log('Architecture exists:', !!planData.architecture);
      console.log('Testing strategy exists:', !!planData.testing_strategy);
      console.log('=============================');

      setResult(planData);

      // Save to Supabase
      try {
        console.log('Saving to database...');
        const { error: saveError } = await supabase
          .from('plans')
          .insert({
            user_id: user.id,
            project_name: projectName,
            description,
            requirements,
            product_scope: planData.product_scope,
            tech_stack: JSON.stringify(planData.tech_stack),
            timeline: JSON.stringify(planData.timeline),
            gantt_chart: JSON.stringify(planData.timeline),
            suggestions: JSON.stringify(planData.suggestions),
            modules: planData.modules,
            bonus_modules: planData.bonus_modules,
            architecture: planData.architecture,
            testing_strategy: planData.testing_strategy,
            team_plan: planData.team_plan,
            budget_estimate: planData.budget_estimate
          } as any);

        if (saveError) {
          console.error('Error saving plan to database:', saveError);
        } else {
          console.log('Plan saved successfully to database');
        }
      } catch (dbError) {
        console.error('Database save failed:', dbError);
      }

      console.log('=== useStackWizard.generatePlan SUCCESS ===');
      return planData;
    } catch (error) {
      console.error('=== useStackWizard.generatePlan ERROR ===');
      console.error('Error generating plan:', error);
      throw error;
    } finally {
      setIsLoading(false);
      console.log('=== useStackWizard.generatePlan END ===');
    }
  };

  return {
    generatePlan,
    isLoading,
    result,
    setResult
  };
};
