
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

  console.log('=== StackWizard Debug Info ===');
  console.log('Auth loading:', authLoading);
  console.log('User exists:', !!user);
  console.log('Is loading plan:', isLoading);
  console.log('Has result:', !!result);
  console.log('Project data:', projectData);
  console.log('Result data:', result);
  console.log('==============================');

  if (authLoading) {
    console.log('Returning auth loading state');
    return <LoadingState module="stackwizard" />;
  }

  if (!user) {
    console.log('No user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (data: { projectName: string; description: string; requirements: string }) => {
    try {
      console.log('=== Starting Plan Generation ===');
      console.log('Form data:', data);
      
      setProjectData(data);
      console.log('Set project data:', data);
      
      const planResult = await generatePlan(data.projectName, data.description, data.requirements);
      console.log('=== Plan Generation Complete ===');
      console.log('Plan result:', planResult);
      
      toast({
        title: "Success!",
        description: "Complete SaaS development blueprint generated",
      });
    } catch (error) {
      console.error('=== Plan Generation Error ===');
      console.error('Error details:', error);
      toast({
        title: "Error",
        description: "Failed to generate SaaS blueprint. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    console.log('Plan is loading, showing loading state');
    return <LoadingState module="stackwizard" />;
  }

  // Debug rendering decision
  const shouldShowForm = !result;
  const shouldShowDashboard = result && projectData;
  
  console.log('=== Rendering Decision ===');
  console.log('Should show form:', shouldShowForm);
  console.log('Should show dashboard:', shouldShowDashboard);
  console.log('=========================');

  return (
    <div className="space-y-6">
      {shouldShowForm && (
        <>
          <div className="text-sm text-gray-500 mb-4">
            Debug: Showing form (result: {!!result ? 'exists' : 'none'})
          </div>
          <StackWizardForm onSubmit={handleSubmit} isLoading={isLoading} />
        </>
      )}
      
      {shouldShowDashboard && (
        <>
          <div className="text-sm text-gray-500 mb-4">
            Debug: Showing dashboard (result: {!!result ? 'exists' : 'none'}, projectData: {!!projectData ? 'exists' : 'none'})
          </div>
          <StackWizardDashboard
            projectName={projectData.projectName}
            projectDescription={projectData.description}
            requirements={projectData.requirements}
            planData={result}
          />
        </>
      )}
      
      {result && !projectData && (
        <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 font-medium">Debug: Result exists but project data is missing</p>
          <p className="text-sm text-red-500 mt-2">Result: {JSON.stringify(result, null, 2).slice(0, 100)}...</p>
          <button 
            onClick={() => {
              console.log('Reloading page...');
              window.location.reload();
            }} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reload Page
          </button>
        </div>
      )}
      
      {!shouldShowForm && !shouldShowDashboard && !result && (
        <div className="p-8 text-center bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-600 font-medium">Debug: No content to show</p>
          <p className="text-sm text-yellow-500 mt-2">This shouldn't happen - please check console</p>
        </div>
      )}
    </div>
  );
};

export default StackWizard;
