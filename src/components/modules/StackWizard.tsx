
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

  console.log('StackWizard render state:', {
    isLoading,
    hasResult: !!result,
    hasProjectData: !!projectData,
    authLoading,
    user: !!user
  });

  if (authLoading) {
    return <LoadingState module="stackwizard" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: { projectName: string; description: string; requirements: string }) => {
    try {
      console.log('Starting plan generation with data:', data);
      setProjectData(data);
      const planResult = await generatePlan(data.projectName, data.description, data.requirements);
      console.log('Generated plan result:', planResult);
      toast({
        title: "Success!",
        description: "Complete SaaS development blueprint generated",
      });
    } catch (error) {
      console.error('StackWizard generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate SaaS blueprint. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    console.log('Showing loading state');
    return <LoadingState module="stackwizard" />;
  }

  console.log('Deciding what to render:', {
    showForm: !result,
    showDashboard: result && projectData
  });

  return (
    <div className="space-y-6">
      {!result && (
        <StackWizardForm onSubmit={handleSubmit} isLoading={isLoading} />
      )}
      {result && projectData ? (
        <StackWizardDashboard
          projectName={projectData.projectName}
          projectDescription={projectData.description}
          requirements={projectData.requirements}
          planData={result}
        />
      ) : result && !projectData ? (
        <div className="p-8 text-center">
          <p className="text-red-500">Error: Result received but project data is missing</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Reload Page
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default StackWizard;
