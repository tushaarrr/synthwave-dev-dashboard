import React from 'react';
import { Copy, Download, Save, ExternalLink } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TechStackModule from './modules/TechStackModule';
import GanttTimelineModule from './modules/GanttTimelineModule';
import BudgetEstimationModule from './modules/BudgetEstimationModule';
import ProjectRoadmapModule from './modules/ProjectRoadmapModule';
import ProTipsModule from './modules/ProTipsModule';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

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

  console.log('=== StackWizardDashboard Debug ===');
  console.log('Plan data received:', planData);
  console.log('Plan data type:', typeof planData);

  // Handle both legacy and new data formats safely
  const techStack = planData?.tech_stack || planData?.techStack || {};
  const timeline = planData?.timeline || [];
  const suggestions = planData?.suggestions || [];
  const modules = planData?.modules || [];
  const bonusModules = planData?.bonus_modules || [];
  const architecture = planData?.architecture || {};
  const testingStrategy = planData?.testing_strategy || {};
  const teamPlan = planData?.team_plan || {};
  const budgetEstimate = planData?.budget_estimate || {};
  const productScope = planData?.product_scope || projectDescription;

  console.log('Processed data for dashboard:', {
    techStack,
    timeline,
    suggestions,
    modules,
    bonusModules,
    architecture,
    testingStrategy,
    teamPlan,
    budgetEstimate
  });

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

  const exportToPDF = async () => {
    try {
      toast({
        title: "Generating PDF...",
        description: "Creating your SaaS development blueprint document",
      });

      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF();
      let yPos = 30;

      // Title Page
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(projectName, 20, yPos);
      
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text('SaaS Development Blueprint', 20, yPos + 15);
      
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPos + 30);
      pdf.text(`Created by: ${user?.email || 'DevSynth AI'}`, 20, yPos + 40);

      yPos = 90;

      // Product Scope
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Product Scope & Vision', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const scopeLines = pdf.splitTextToSize(productScope, 170);
      pdf.text(scopeLines, 20, yPos + 10);
      
      yPos += 20 + (scopeLines.length * 5);

      // Modules Section
      if (modules.length > 0) {
        if (yPos > 250) {
          pdf.addPage();
          yPos = 30;
        }

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Core Modules', 20, yPos);
        yPos += 15;

        modules.forEach((module: any) => {
          if (yPos > 260) {
            pdf.addPage();
            yPos = 30;
          }
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`• ${module.name}`, 25, yPos);
          
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          const descLines = pdf.splitTextToSize(module.description, 160);
          pdf.text(descLines, 30, yPos + 6);
          
          yPos += 12 + (descLines.length * 4);
          
          if (module.dependencies && module.dependencies.length > 0) {
            pdf.text(`Dependencies: ${module.dependencies.join(', ')}`, 30, yPos);
            yPos += 6;
          }
          
          if (module.ai_used) {
            pdf.text('🤖 AI-Powered Feature', 30, yPos);
            yPos += 6;
          }
          
          yPos += 5;
        });
      }

      // Architecture Section
      if (architecture.pattern) {
        if (yPos > 220) {
          pdf.addPage();
          yPos = 30;
        }

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Architecture Recommendations', 20, yPos);
        yPos += 15;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`Pattern: ${architecture.pattern}`, 25, yPos);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const patternLines = pdf.splitTextToSize(architecture.reason, 160);
        pdf.text(patternLines, 30, yPos + 6);
        yPos += 12 + (patternLines.length * 4);

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(`API Style: ${architecture.api_style}`, 25, yPos);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        const apiLines = pdf.splitTextToSize(architecture.api_reason, 160);
        pdf.text(apiLines, 30, yPos + 6);
        yPos += 12 + (apiLines.length * 4);
      }

      // Budget Estimate
      if (budgetEstimate.development || budgetEstimate.total_mvp) {
        if (yPos > 220) {
          pdf.addPage();
          yPos = 30;
        }

        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Budget Estimation', 20, yPos);
        yPos += 15;

        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        if (budgetEstimate.total_mvp) {
          pdf.text(`Total MVP Cost: ${budgetEstimate.total_mvp}`, 25, yPos);
          yPos += 10;
        }

        if (budgetEstimate.development) {
          pdf.text(`Development Team: ${budgetEstimate.development.team_cost}`, 25, yPos);
          yPos += 8;
          pdf.text(`Duration: ${budgetEstimate.development.duration}`, 25, yPos);
          yPos += 8;
        }

        if (budgetEstimate.infrastructure) {
          pdf.text(`Monthly Infrastructure: ${budgetEstimate.infrastructure.total_monthly}`, 25, yPos);
          yPos += 8;
        }
      }

      // Add footer to all pages
      const totalPages = (pdf as any).internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Generated by DevSynth AI StackWizard+ | Page ${i} of ${totalPages}`, 20, 285);
      }

      pdf.save(`${projectName}-saas-blueprint.pdf`);
      
      toast({
        title: "Success!",
        description: "SaaS blueprint exported as PDF document",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Error",
        description: "Failed to export PDF document",
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-white/10 p-6 -mx-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-orange via-neon-coral to-neon-yellow bg-clip-text text-transparent">
              {projectName}
            </h1>
            <p className="text-muted-foreground mt-1">Complete SaaS Development Blueprint</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={saveProject}
              className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
            >
              <Save className="w-4 h-4 text-neon-green" />
              <span className="text-sm font-medium">Save Project</span>
            </button>
            <button
              onClick={copyAllContent}
              className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
            >
              <Copy className="w-4 h-4 text-neon-coral" />
              <span className="text-sm font-medium">Copy All</span>
            </button>
            <button
              onClick={exportToPDF}
              className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
            >
              <Download className="w-4 h-4 text-neon-orange" />
              <span className="text-sm font-medium">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div id="stackwizard-dashboard" className="space-y-12">
        {/* Tech Stack & Core Modules */}
        <TechStackModule 
          techStack={techStack} 
          modules={modules} 
          bonusModules={bonusModules} 
        />

        {/* Gantt Timeline */}
        <GanttTimelineModule 
          timeline={timeline} 
          timelineData={Array.isArray(timeline) ? timeline : []} 
        />

        {/* Budget & Team Planning */}
        <BudgetEstimationModule 
          budgetEstimate={budgetEstimate} 
          teamPlan={teamPlan} 
        />

        {/* Project Roadmap - Architecture & Testing */}
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
