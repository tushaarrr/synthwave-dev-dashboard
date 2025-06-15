
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface Module {
  name: string;
  description: string;
  dependencies: string[];
  ai_used: boolean;
  estimated_hours?: number;
  complexity?: 'Low' | 'Medium' | 'High';
  priority?: 'Critical' | 'Important' | 'Nice-to-have';
}

interface BonusModule {
  name: string;
  description: string;
  estimated_hours?: number;
  cost_estimate?: string;
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

interface TestingPhase {
  types: string[];
  tools: Record<string, string>;
  coverage_targets: Record<string, string>;
  focus?: string;
  budget?: string;
  timeline?: string;
}

interface TestingStrategy {
  mvp_phase?: TestingPhase;
  growth_phase?: TestingPhase;
  scale_phase?: TestingPhase;
  ai_testing?: string;
  testing_environments?: string[];
  automated_testing?: string;
  manual_testing?: string;
  // Fallback for simpler structure
  types?: string[];
  tools?: Record<string, string>;
  coverage_targets?: Record<string, string>;
}

interface TeamRole {
  role: string;
  responsibilities: string;
  experience_level?: string;
  time_commitment?: string;
  estimated_cost?: string;
  key_skills?: string[];
  weekly_focus?: string;
}

interface TeamPlan {
  roles: TeamRole[];
  team_size: string;
  duration: string;
  working_methodology?: string;
  communication_tools?: string[];
  collaboration_strategy?: string;
}

interface BudgetEstimate {
  development: {
    team_cost: string;
    duration: string;
    total: string;
  };
  infrastructure: {
    hosting?: string;
    database?: string;
    ai_services?: string;
    domain?: string;
    monitoring?: string;
    total_monthly: string;
  };
  one_time_costs?: {
    domain_registration?: string;
    design_tools?: string;
    development_tools?: string;
    initial_ai_credits?: string;
    legal_setup?: string;
    total?: string;
  };
  total_mvp?: string;
  post_mvp_monthly?: string;
  scaling_costs?: string;
  total_project?: string; // Legacy field
}

interface TimelineWeek {
  week: number;
  title: string;
  tasks: string[];
  progress: number;
  deliverables?: string[];
  team_focus?: string;
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
            mvp_phase: {
              types: ['Manual Testing', 'Unit Tests'],
              tools: {
                manual: 'Browser testing',
                unit: 'Jest'
              },
              coverage_targets: {
                manual: '100% of core features',
                unit: '70% code coverage'
              },
              focus: 'Core functionality validation',
              budget: '$0 (team testing)',
              timeline: 'Weeks 9-10'
            },
            growth_phase: {
              types: ['Automated Testing', 'Performance Testing'],
              tools: {
                automation: 'GitHub Actions',
                performance: 'Lighthouse CI'
              },
              coverage_targets: {
                automated: '80% code coverage',
                performance: '90+ Lighthouse scores'
              },
              focus: 'Stability and scalability',
              budget: '$50-100/month',
              timeline: 'Weeks 13-16'
            },
            scale_phase: {
              types: ['End-to-End Testing', 'A/B Testing'],
              tools: {
                e2e: 'Playwright',
                ab_testing: 'PostHog'
              },
              coverage_targets: {
                e2e: '100% critical flows',
                ab_testing: 'All major features'
              },
              focus: 'Enterprise readiness',
              budget: '$200-500/month',
              timeline: 'Weeks 17+'
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
                responsibilities: 'Full application development',
                experience_level: 'Mid-level',
                time_commitment: '30-35 hours/week',
                estimated_cost: '$0 (co-founder equity)'
              }
            ],
            team_size: '2 people',
            duration: '12 weeks',
            working_methodology: 'Agile with 2-week sprints',
            communication_tools: ['Slack', 'GitHub', 'Figma']
          },
          budget_estimate: data.budget_estimate || {
            development: {
              team_cost: '$0 (co-founder equity)',
              duration: '12 weeks',
              total: '$0'
            },
            infrastructure: {
              hosting: '$0/month (free tier)',
              database: '$0/month (free tier)',
              ai_services: '$30-80/month',
              total_monthly: '$30-80/month'
            },
            one_time_costs: {
              domain_registration: '$15',
              initial_ai_credits: '$100',
              legal_setup: '$200',
              total: '$315'
            },
            total_mvp: '$500-800',
            post_mvp_monthly: '$30-100/month',
            scaling_costs: '$200-500/month at 1000+ users'
          },
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [
            'Focus on MVP features first',
            'Implement proper error handling',
            'Plan for mobile responsiveness',
            'Get user feedback early',
            'Use free tiers to minimize costs'
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
      console.log('Testing phases:', {
        mvp: !!planData.testing_strategy?.mvp_phase,
        growth: !!planData.testing_strategy?.growth_phase,
        scale: !!planData.testing_strategy?.scale_phase
      });
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
