
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
  techStack: string;
  timeline: string;
  ganttChart: string;
  suggestions: string;
  projectDescription: string;
  requirements: string;
}

const StackWizardDashboard = ({ 
  projectName, 
  techStack, 
  timeline, 
  ganttChart, 
  suggestions,
  projectDescription,
  requirements
}: StackWizardDashboardProps) => {
  const { user } = useAuth();

  const copyAllContent = async () => {
    const content = `Project: ${projectName}\n\nTech Stack:\n${techStack}\n\nTimeline:\n${timeline}\n\nSuggestions:\n${suggestions}`;
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Complete project plan copied to clipboard",
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
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      const element = document.getElementById('stackwizard-dashboard');
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 1.5,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${projectName}-strategy-plan.pdf`);
      
      toast({
        title: "Success!",
        description: "Strategy plan exported as PDF",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF",
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
          tech_stack: techStack,
          timeline: timeline,
          gantt_chart: ganttChart,
          suggestions: suggestions
        });

      if (error) throw error;

      toast({
        title: "Saved!",
        description: "Project plan saved to your workspace",
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
            <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
              {projectName}
            </h1>
            <p className="text-muted-foreground mt-1">Complete Development Strategy Dashboard</p>
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
              <Copy className="w-4 h-4 text-neon-blue" />
              <span className="text-sm font-medium">Copy All</span>
            </button>
            <button
              onClick={exportToPDF}
              className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
            >
              <Download className="w-4 h-4 text-neon-purple" />
              <span className="text-sm font-medium">Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      <div id="stackwizard-dashboard" className="space-y-12">
        {/* Tech Stack */}
        <TechStackModule techStack={techStack} />

        {/* Gantt Timeline */}
        <GanttTimelineModule timeline={timeline} />

        {/* Budget & Team Planning */}
        <BudgetEstimationModule />

        {/* Project Roadmap */}
        <ProjectRoadmapModule />

        {/* Pro Tips */}
        <ProTipsModule suggestions={suggestions} />
      </div>
    </div>
  );
};

export default StackWizardDashboard;
