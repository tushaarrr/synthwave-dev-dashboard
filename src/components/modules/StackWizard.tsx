
import React from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import StackWizardForm from '../stackwizard/StackWizardForm';
import PlanOutput from '../stackwizard/PlanOutput';
import { useStackWizard } from '@/hooks/useStackWizard';
import { toast } from '@/hooks/use-toast';

const StackWizard = () => {
  const { user, loading: authLoading } = useAuth();
  const { generatePlan, isLoading, result } = useStackWizard();

  if (authLoading) {
    return <LoadingState module="stackwizard" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: { projectName: string; description: string; requirements: string }) => {
    try {
      await generatePlan(data.projectName, data.description, data.requirements);
      toast({
        title: "Success!",
        description: "Tech stack plan generated and saved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <LoadingState module="stackwizard" />;
  }

  return (
    <div className="space-y-6">
      <StackWizardForm onSubmit={handleSubmit} isLoading={isLoading} />
      {result && (
        <PlanOutput
          techStack={result.techStack}
          timeline={result.timeline}
          ganttChart={result.ganttChart}
          suggestions={result.suggestions}
        />
      )}
    </div>
  );
};

export default StackWizard;
