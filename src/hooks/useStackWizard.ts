
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface ProjectPlan {
  techStack: string;
  timeline: string;
  ganttChart: string;
  suggestions: string;
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

      const planData = {
        techStack: data.techStack,
        timeline: data.timeline,
        ganttChart: data.ganttChart,
        suggestions: data.suggestions
      };

      setResult(planData);

      // Save to Supabase
      const { error: saveError } = await supabase
        .from('plans')
        .insert({
          user_id: user.id,
          project_name: projectName,
          description,
          requirements,
          tech_stack: data.techStack,
          timeline: data.timeline,
          gantt_chart: data.ganttChart,
          suggestions: data.suggestions
        });

      if (saveError) {
        console.error('Error saving plan:', saveError);
      }

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
