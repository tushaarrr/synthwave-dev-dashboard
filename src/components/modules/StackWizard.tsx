
import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import LoadingState from '../LoadingState';
import StackWizardForm from '../stackwizard/StackWizardForm';
import StackWizardDashboard from '../stackwizard/StackWizardDashboard';
import { useStackWizard } from '@/hooks/useStackWizard';
import { toast } from '@/hooks/use-toast';

const StackWizard = () => {
  const { user, loading: authLoading } = useAuth();
  const { generatePlan, isLoading, result } = useStackWizard();
  const [projectData, setProjectData] = useState<{
    projectName: string;
    description: string;
    requirements: string;
  } | null>(null);

  if (authLoading) {
    return <LoadingState module="stackwizard" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: { projectName: string; description: string; requirements: string }) => {
    try {
      setProjectData(data);
      await generatePlan(data.projectName, data.description, data.requirements);
      toast({
        title: "Success!",
        description: "Complete development strategy generated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate strategy plan. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <LoadingState module="stackwizard" />;
  }

  return (
    <div className="space-y-6">
      {!result && (
        <StackWizardForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
      {result && projectData && (
        <StackWizardDashboard
          projectName={projectData.projectName}
          projectDescription={projectData.description}
          requirements={projectData.requirements}
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
