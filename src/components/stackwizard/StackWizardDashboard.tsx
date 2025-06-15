
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
      toast({
        title: "Generating PDF...",
        description: "Creating your development strategy document",
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
      pdf.text('Development Strategy Report', 20, yPos + 15);
      
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPos + 30);
      pdf.text(`Created by: ${user?.email || 'DevSynth AI'}`, 20, yPos + 40);

      yPos = 90;

      // Project Description
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Project Overview', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const descLines = pdf.splitTextToSize(projectDescription, 170);
      pdf.text(descLines, 20, yPos + 10);
      
      yPos += 20 + (descLines.length * 5);

      // Requirements
      if (requirements) {
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Requirements', 20, yPos);
        
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const reqLines = pdf.splitTextToSize(requirements, 170);
        pdf.text(reqLines, 20, yPos + 10);
        
        yPos += 20 + (reqLines.length * 5);
      }

      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 30;
      }

      // Technology Stack
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Technology Stack', 20, yPos);
      
      const techLines = techStack.split('\n').filter(line => line.trim());
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPos += 15;

      for (const line of techLines) {
        const cleanLine = line.replace(/[#*-]/g, '').trim();
        if (!cleanLine) continue;

        if (cleanLine.toLowerCase().includes('frontend') || 
            cleanLine.toLowerCase().includes('backend') || 
            cleanLine.toLowerCase().includes('database') ||
            cleanLine.toLowerCase().includes('devops')) {
          
          if (yPos > 270) {
            pdf.addPage();
            yPos = 30;
          }
          
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${cleanLine}`, 25, yPos);
          pdf.setFont('helvetica', 'normal');
          yPos += 8;
        } else if (cleanLine.includes(':')) {
          const [tech, desc] = cleanLine.split(':');
          pdf.text(`  - ${tech.trim()}: ${desc.trim()}`, 30, yPos);
          yPos += 6;
        } else {
          pdf.text(`  - ${cleanLine}`, 30, yPos);
          yPos += 6;
        }

        if (yPos > 270) {
          pdf.addPage();
          yPos = 30;
        }
      }

      yPos += 10;

      // Development Timeline
      if (yPos > 240) {
        pdf.addPage();
        yPos = 30;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Development Timeline', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPos += 15;

      const timelineLines = timeline.split('\n').filter(line => line.trim());
      for (const line of timelineLines) {
        const cleanLine = line.replace(/[#*-]/g, '').trim();
        if (!cleanLine) continue;

        if (cleanLine.toLowerCase().includes('week') || cleanLine.toLowerCase().includes('phase')) {
          if (yPos > 270) {
            pdf.addPage();
            yPos = 30;
          }
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${cleanLine}`, 25, yPos);
          pdf.setFont('helvetica', 'normal');
          yPos += 8;
        } else {
          const wrappedLines = pdf.splitTextToSize(cleanLine, 160);
          pdf.text(wrappedLines, 30, yPos);
          yPos += wrappedLines.length * 6;
        }

        if (yPos > 270) {
          pdf.addPage();
          yPos = 30;
        }
      }

      yPos += 10;

      // Budget Estimation
      if (yPos > 240) {
        pdf.addPage();
        yPos = 30;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Budget Estimation', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPos += 15;

      const budgetItems = [
        'Development Team (1-2 developers): $8,000 - $15,000/month',
        'Infrastructure (Hosting, DB, Services): $100 - $500/month',
        'Third-party Services (APIs, Tools): $200 - $800/month',
        'Total Project Cost (3-6 months): $25,000 - $95,000'
      ];

      for (const item of budgetItems) {
        pdf.text(`• ${item}`, 25, yPos);
        yPos += 8;
      }

      yPos += 10;

      // Team Structure
      if (yPos > 240) {
        pdf.addPage();
        yPos = 30;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommended Team Structure', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPos += 15;

      const teamRoles = [
        'Frontend Developer: UI/UX implementation, responsive design',
        'Backend Developer: API development, database design, security',
        'DevOps Engineer: CI/CD setup, infrastructure management',
        'Product Manager: Requirements gathering, project coordination'
      ];

      for (const role of teamRoles) {
        pdf.text(`• ${role}`, 25, yPos);
        yPos += 8;
      }

      yPos += 10;

      // Recommendations
      if (yPos > 200) {
        pdf.addPage();
        yPos = 30;
      }

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recommendations & Best Practices', 20, yPos);
      
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      yPos += 15;

      const suggestionLines = suggestions.split('\n').filter(line => line.trim());
      for (const line of suggestionLines) {
        const cleanLine = line.replace(/[#*-]/g, '').trim();
        if (!cleanLine) continue;

        if (yPos > 270) {
          pdf.addPage();
          yPos = 30;
        }

        const wrappedLines = pdf.splitTextToSize(`• ${cleanLine}`, 170);
        pdf.text(wrappedLines, 25, yPos);
        yPos += wrappedLines.length * 6 + 3;
      }

      // Add footer to all pages
      const totalPages = (pdf as any).internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Generated by DevSynth AI StackWizard+ | Page ${i} of ${totalPages}`, 20, 285);
      }

      pdf.save(`${projectName}-development-strategy.pdf`);
      
      toast({
        title: "Success!",
        description: "Development strategy exported as PDF document",
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
