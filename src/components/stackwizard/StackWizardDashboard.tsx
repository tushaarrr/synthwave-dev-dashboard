
import React from 'react';
import { Copy, Download, Save, ExternalLink, Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TechStackModule from './modules/TechStackModule';
import GanttTimelineModule from './modules/GanttTimelineModule';
import BudgetEstimationModule from './modules/BudgetEstimationModule';
import ProjectRoadmapModule from './modules/ProjectRoadmapModule';
import ProTipsModule from './modules/ProTipsModule';
import ActionButtons from '@/components/ActionButtons';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent } from '@/components/ui/card';

interface StackWizardDashboardProps {
  projectName: string;
  projectDescription: string;
  requirements: string;
  planData: any;
}

const StackWizardDashboard = ({ 
  projectName, 
  projectDescription,
  requirements,
  planData
}: StackWizardDashboardProps) => {
  const { user } = useAuth();

  console.log('=== StackWizardDashboard RENDER DEBUG ===');
  console.log('Full planData:', planData);
  console.log('Type of planData:', typeof planData);
  console.log('Keys in planData:', Object.keys(planData || {}));

  // Extract data with comprehensive fallbacks
  const techStack = planData?.tech_stack || {};
  const modules = planData?.modules || [];
  const bonusModules = planData?.bonus_modules || [];
  const architecture = planData?.architecture || {};
  const testingStrategy = planData?.testing_strategy || {};
  const teamPlan = planData?.team_plan || {};
  const budgetEstimate = planData?.budget_estimate || {};
  const timeline = planData?.timeline || [];
  const suggestions = planData?.suggestions || [];
  const productScope = planData?.product_scope || projectDescription;

  console.log('=== EXTRACTED VALUES ===');
  console.log('modules:', modules);
  console.log('architecture:', architecture);
  console.log('testingStrategy:', testingStrategy);
  console.log('teamPlan:', teamPlan);
  console.log('budgetEstimate:', budgetEstimate);
  console.log('timeline:', timeline);
  console.log('===========================');

  const copyAllContent = async () => {
    const content = `Project: ${projectName}\n\nProduct Scope:\n${productScope}\n\nTech Stack:\n${JSON.stringify(techStack, null, 2)}\n\nModules:\n${JSON.stringify(modules, null, 2)}\n\nTimeline:\n${JSON.stringify(timeline, null, 2)}\n\nSuggestions:\n${JSON.stringify(suggestions, null, 2)}`;
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Complete SaaS blueprint copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const saveProject = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('plans')
        .insert({
          user_id: user.id,
          project_name: projectName,
          description: projectDescription,
          requirements: requirements,
          product_scope: productScope,
          tech_stack: typeof techStack === 'string' ? techStack : JSON.stringify(techStack),
          timeline: typeof timeline === 'string' ? timeline : JSON.stringify(timeline),
          gantt_chart: planData.ganttChart || JSON.stringify(timeline),
          suggestions: typeof suggestions === 'string' ? suggestions : JSON.stringify(suggestions),
          modules: modules,
          bonus_modules: bonusModules,
          architecture: architecture,
          testing_strategy: testingStrategy,
          team_plan: teamPlan,
          budget_estimate: budgetEstimate
        });

      if (error) throw error;

      toast({
        title: "Saved!",
        description: "SaaS blueprint saved to your workspace",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save project",
        variant: "destructive",
      });
    }
  };

  // Calculate data completeness for status display
  const dataCompleteness = {
    modules: modules?.length || 0,
    timeline: timeline?.length || 0,
    architecture: Object.keys(architecture).length || 0,
    testing: Object.keys(testingStrategy).length || 0,
    team: Object.keys(teamPlan).length || 0,
    budget: Object.keys(budgetEstimate).length || 0
  };

  const totalSections = Object.keys(dataCompleteness).length;
  const completedSections = Object.values(dataCompleteness).filter(count => count > 0).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-zinc-800 border-b border-zinc-700 p-6 -mx-6 rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-sora text-white">
              {projectName}
            </h1>
            <p className="text-zinc-400 mt-1">Complete SaaS Development Blueprint</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={saveProject}
              className="bg-zinc-700 rounded-lg px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 border border-zinc-600 hover:border-orange-300/50 shadow-md"
            >
              <Save className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-white">Save Project</span>
            </button>
            <ActionButtons 
              projectData={{
                ...planData,
                description: projectDescription,
                product_scope: productScope
              }}
              projectName={projectName}
              onCopy={copyAllContent}
            />
          </div>
        </div>
        
        {/* Data Completeness Status */}
        <div className="mt-4">
          <Card className="bg-zinc-700 border-zinc-600 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-orange-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    Blueprint Completion: {completedSections}/{totalSections} sections
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    {modules.length} modules • {timeline.length} timeline items • {Object.keys(architecture).length > 0 ? '✓' : '○'} architecture • {Object.keys(testingStrategy).length > 0 ? '✓' : '○'} testing strategy
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-orange-400">
                    {Math.round((completedSections / totalSections) * 100)}%
                  </div>
                  <div className="text-xs text-zinc-400">Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div id="stackwizard-dashboard" className="space-y-12">
        {/* Tech Stack & Core Modules */}
        <TechStackModule 
          techStack={techStack} 
          modules={modules} 
          bonusModules={bonusModules} 
        />

        {/* Timeline Module */}
        <GanttTimelineModule 
          timeline={timeline} 
          timelineData={timeline} 
        />

        {/* Budget & Team Planning */}
        <BudgetEstimationModule 
          budgetEstimate={budgetEstimate} 
          teamPlan={teamPlan} 
        />

        {/* Architecture & Testing Strategy */}
        <ProjectRoadmapModule 
          architecture={architecture} 
          testingStrategy={testingStrategy} 
        />

        {/* Pro Tips */}
        <ProTipsModule suggestions={suggestions} />
      </div>
    </div>
  );
};

export default StackWizardDashboard;
