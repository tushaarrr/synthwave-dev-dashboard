
import { Copy, Download, FileText } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  projectData?: any;
  projectName?: string;
  onCopy?: () => void;
  onDownload?: () => void;
  onExportPDF?: () => void;
}

const ActionButtons = ({ 
  projectData, 
  projectName = "Project", 
  onCopy, 
  onDownload, 
  onExportPDF 
}: ActionButtonsProps) => {
  
  const handleExportPDF = async () => {
    if (onExportPDF) {
      onExportPDF();
      return;
    }

    if (!projectData) {
      toast({
        title: "No Data",
        description: "No project data available for export",
        variant: "destructive",
      });
      return;
    }

    try {
      toast({
        title: "Generating PDF...",
        description: "Creating your comprehensive project blueprint",
      });

      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF();
      
      let yPos = 30;
      const pageHeight = 280;
      const margin = 20;
      const lineHeight = 6;

      // Helper to add new page if needed
      const checkPageBreak = (requiredSpace: number) => {
        if (yPos + requiredSpace > pageHeight) {
          pdf.addPage();
          yPos = 30;
        }
      };

      // Helper function to safely parse JSON or return fallback
      const safeParseJson = (jsonString: string | any, fallback: any = null) => {
        if (!jsonString) return fallback;
        try {
          return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
        } catch {
          return fallback;
        }
      };

      // Extract data with fallbacks
      const techStack = safeParseJson(projectData.tech_stack, {});
      const modules = projectData.modules || [];
      const bonusModules = projectData.bonus_modules || [];
      const architecture = projectData.architecture || {};
      const testingStrategy = projectData.testing_strategy || {};
      const teamPlan = projectData.team_plan || {};
      const budgetEstimate = projectData.budget_estimate || {};
      const timeline = safeParseJson(projectData.timeline, []);
      const suggestions = safeParseJson(projectData.suggestions, []);
      const productScope = projectData.product_scope || projectData.description || '';

      // Title Page
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(projectName, margin, yPos);
      yPos += 15;

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Complete SaaS Development Blueprint', margin, yPos);
      yPos += 10;

      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
      yPos += 25;

      // Project Description & Scope
      if (productScope) {
        checkPageBreak(40);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Project Overview', margin, yPos);
        yPos += 12;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(productScope, 170);
        pdf.text(descLines, margin, yPos);
        yPos += descLines.length * lineHeight + 15;
      }

      // Technology Stack
      if (techStack && Object.keys(techStack).length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Technology Stack', margin, yPos);
        yPos += 15;

        Object.entries(techStack).forEach(([category, technologies]) => {
          checkPageBreak(25);
          
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ');
          pdf.text(`${categoryTitle}:`, margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          
          if (Array.isArray(technologies)) {
            const techText = `• ${technologies.join(', ')}`;
            const techLines = pdf.splitTextToSize(techText, 160);
            pdf.text(techLines, margin + 10, yPos);
            yPos += techLines.length * lineHeight + 8;
          } else if (typeof technologies === 'string') {
            const techLines = pdf.splitTextToSize(`• ${technologies}`, 160);
            pdf.text(techLines, margin + 10, yPos);
            yPos += techLines.length * lineHeight + 8;
          }
        });
        yPos += 10;
      }

      // Core Modules
      if (modules && modules.length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Core Modules & Features', margin, yPos);
        yPos += 15;

        modules.forEach((module: any, index: number) => {
          checkPageBreak(35);
          
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${module.name || 'Unnamed Module'}`, margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          if (module.description) {
            const descLines = pdf.splitTextToSize(module.description, 165);
            pdf.text(descLines, margin + 10, yPos);
            yPos += descLines.length * lineHeight + 5;
          }

          if (module.dependencies && module.dependencies.length > 0) {
            pdf.setFont('helvetica', 'italic');
            pdf.text(`Dependencies: ${module.dependencies.join(', ')}`, margin + 10, yPos);
            yPos += 8;
          }

          if (module.ai_used) {
            pdf.setFont('helvetica', 'bold');
            pdf.text('🤖 AI-Powered Feature', margin + 10, yPos);
            yPos += 8;
          }

          if (module.estimated_hours) {
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Estimated Hours: ${module.estimated_hours}`, margin + 10, yPos);
            yPos += 8;
          }

          if (module.complexity) {
            pdf.text(`Complexity: ${module.complexity}`, margin + 10, yPos);
            yPos += 8;
          }

          yPos += 5;
        });
      }

      // Architecture & Design Patterns
      if (architecture && Object.keys(architecture).length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Architecture & Design', margin, yPos);
        yPos += 15;

        if (architecture.pattern) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Architecture Pattern: ${architecture.pattern}`, margin + 5, yPos);
          yPos += 10;
          
          if (architecture.reason) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const reasonLines = pdf.splitTextToSize(architecture.reason, 165);
            pdf.text(reasonLines, margin + 10, yPos);
            yPos += reasonLines.length * lineHeight + 10;
          }
        }

        if (architecture.api_style) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`API Style: ${architecture.api_style}`, margin + 5, yPos);
          yPos += 10;
          
          if (architecture.api_reason) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const apiLines = pdf.splitTextToSize(architecture.api_reason, 165);
            pdf.text(apiLines, margin + 10, yPos);
            yPos += apiLines.length * lineHeight + 10;
          }
        }

        if (architecture.database_type) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Database: ${architecture.database_type}`, margin + 5, yPos);
          yPos += 10;
          
          if (architecture.database_reason) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const dbLines = pdf.splitTextToSize(architecture.database_reason, 165);
            pdf.text(dbLines, margin + 10, yPos);
            yPos += dbLines.length * lineHeight + 10;
          }
        }
      }

      // Testing Strategy
      if (testingStrategy && Object.keys(testingStrategy).length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Testing Strategy', margin, yPos);
        yPos += 15;

        // MVP Phase Testing
        if (testingStrategy.mvp_phase) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('MVP Phase Testing', margin + 5, yPos);
          yPos += 10;

          const mvp = testingStrategy.mvp_phase;
          if (mvp.types && Array.isArray(mvp.types)) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Types: ${mvp.types.join(', ')}`, margin + 10, yPos);
            yPos += 8;
          }

          if (mvp.focus) {
            pdf.text(`Focus: ${mvp.focus}`, margin + 10, yPos);
            yPos += 8;
          }

          if (mvp.budget) {
            pdf.text(`Budget: ${mvp.budget}`, margin + 10, yPos);
            yPos += 8;
          }
          yPos += 5;
        }

        // Growth Phase Testing
        if (testingStrategy.growth_phase) {
          checkPageBreak(25);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Growth Phase Testing', margin + 5, yPos);
          yPos += 10;

          const growth = testingStrategy.growth_phase;
          if (growth.types && Array.isArray(growth.types)) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            pdf.text(`Types: ${growth.types.join(', ')}`, margin + 10, yPos);
            yPos += 8;
          }

          if (growth.focus) {
            pdf.text(`Focus: ${growth.focus}`, margin + 10, yPos);
            yPos += 8;
          }

          if (growth.budget) {
            pdf.text(`Budget: ${growth.budget}`, margin + 10, yPos);
            yPos += 8;
          }
          yPos += 5;
        }
      }

      // Team Plan
      if (teamPlan && Object.keys(teamPlan).length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Team Structure & Plan', margin, yPos);
        yPos += 15;

        if (teamPlan.team_size) {
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Team Size: ${teamPlan.team_size}`, margin + 5, yPos);
          yPos += 10;
        }

        if (teamPlan.duration) {
          pdf.text(`Duration: ${teamPlan.duration}`, margin + 5, yPos);
          yPos += 10;
        }

        if (teamPlan.working_methodology) {
          pdf.text(`Methodology: ${teamPlan.working_methodology}`, margin + 5, yPos);
          yPos += 10;
        }

        if (teamPlan.roles && Array.isArray(teamPlan.roles)) {
          yPos += 5;
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Team Roles:', margin + 5, yPos);
          yPos += 10;

          teamPlan.roles.forEach((role: any, index: number) => {
            checkPageBreak(25);
            
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'bold');
            pdf.text(`${index + 1}. ${role.role || 'Unnamed Role'}`, margin + 10, yPos);
            yPos += 8;

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            
            if (role.responsibilities) {
              const respLines = pdf.splitTextToSize(`Responsibilities: ${role.responsibilities}`, 155);
              pdf.text(respLines, margin + 15, yPos);
              yPos += respLines.length * lineHeight + 3;
            }

            if (role.experience_level) {
              pdf.text(`Experience Level: ${role.experience_level}`, margin + 15, yPos);
              yPos += 6;
            }

            if (role.estimated_cost) {
              pdf.text(`Cost: ${role.estimated_cost}`, margin + 15, yPos);
              yPos += 6;
            }

            yPos += 5;
          });
        }
      }

      // Budget Estimate
      if (budgetEstimate && Object.keys(budgetEstimate).length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Budget Estimation', margin, yPos);
        yPos += 15;

        // Development Costs
        if (budgetEstimate.development) {
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Development Costs', margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          
          if (budgetEstimate.development.team_cost) {
            pdf.text(`Team Cost: ${budgetEstimate.development.team_cost}`, margin + 10, yPos);
            yPos += 8;
          }
          
          if (budgetEstimate.development.duration) {
            pdf.text(`Duration: ${budgetEstimate.development.duration}`, margin + 10, yPos);
            yPos += 8;
          }
          
          if (budgetEstimate.development.total) {
            pdf.text(`Total Development: ${budgetEstimate.development.total}`, margin + 10, yPos);
            yPos += 8;
          }
          yPos += 5;
        }

        // Infrastructure Costs
        if (budgetEstimate.infrastructure) {
          checkPageBreak(25);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Infrastructure Costs (Monthly)', margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          
          const infra = budgetEstimate.infrastructure;
          if (infra.hosting) {
            pdf.text(`Hosting: ${infra.hosting}`, margin + 10, yPos);
            yPos += 6;
          }
          if (infra.database) {
            pdf.text(`Database: ${infra.database}`, margin + 10, yPos);
            yPos += 6;
          }
          if (infra.ai_services) {
            pdf.text(`AI Services: ${infra.ai_services}`, margin + 10, yPos);
            yPos += 6;
          }
          if (infra.total_monthly) {
            pdf.setFont('helvetica', 'bold');
            pdf.text(`Total Monthly: ${infra.total_monthly}`, margin + 10, yPos);
            yPos += 8;
          }
          yPos += 5;
        }

        // Summary
        if (budgetEstimate.total_mvp || budgetEstimate.scaling_costs) {
          checkPageBreak(20);
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          pdf.text('Budget Summary', margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          
          if (budgetEstimate.total_mvp) {
            pdf.text(`Total MVP Cost: ${budgetEstimate.total_mvp}`, margin + 10, yPos);
            yPos += 8;
          }
          
          if (budgetEstimate.scaling_costs) {
            pdf.text(`Scaling Costs: ${budgetEstimate.scaling_costs}`, margin + 10, yPos);
            yPos += 8;
          }
        }
      }

      // Development Timeline
      if (Array.isArray(timeline) && timeline.length > 0) {
        checkPageBreak(50);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Development Timeline', margin, yPos);
        yPos += 15;

        timeline.forEach((phase: any, index: number) => {
          checkPageBreak(35);
          
          pdf.setFontSize(14);
          pdf.setFont('helvetica', 'bold');
          const phaseTitle = phase.title || phase.week ? `Week ${phase.week}: ${phase.title || `Phase ${index + 1}`}` : `Phase ${index + 1}`;
          pdf.text(phaseTitle, margin + 5, yPos);
          yPos += 10;

          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');

          // Tasks
          if (phase.tasks) {
            const tasks = Array.isArray(phase.tasks) ? phase.tasks : [phase.tasks];
            tasks.forEach((task: string) => {
              checkPageBreak(8);
              const taskLines = pdf.splitTextToSize(`• ${task}`, 160);
              pdf.text(taskLines, margin + 10, yPos);
              yPos += taskLines.length * lineHeight;
            });
          }

          // Deliverables
          if (phase.deliverables && Array.isArray(phase.deliverables)) {
            yPos += 3;
            pdf.setFont('helvetica', 'italic');
            pdf.text('Deliverables:', margin + 10, yPos);
            yPos += 6;
            pdf.setFont('helvetica', 'normal');
            
            phase.deliverables.forEach((deliverable: string) => {
              checkPageBreak(8);
              const deliverableLines = pdf.splitTextToSize(`- ${deliverable}`, 155);
              pdf.text(deliverableLines, margin + 15, yPos);
              yPos += deliverableLines.length * lineHeight;
            });
          }

          yPos += 8;
        });
      }

      // Bonus Modules (if any)
      if (bonusModules && bonusModules.length > 0) {
        checkPageBreak(40);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Bonus Features & Enhancements', margin, yPos);
        yPos += 15;

        bonusModules.forEach((module: any, index: number) => {
          checkPageBreak(20);
          
          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`${index + 1}. ${module.name || 'Unnamed Feature'}`, margin + 5, yPos);
          yPos += 8;

          if (module.description) {
            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');
            const descLines = pdf.splitTextToSize(module.description, 165);
            pdf.text(descLines, margin + 10, yPos);
            yPos += descLines.length * lineHeight + 5;
          }

          if (module.estimated_hours) {
            pdf.text(`Estimated Hours: ${module.estimated_hours}`, margin + 10, yPos);
            yPos += 6;
          }

          if (module.cost_estimate) {
            pdf.text(`Cost Estimate: ${module.cost_estimate}`, margin + 10, yPos);
            yPos += 6;
          }

          yPos += 5;
        });
      }

      // Recommendations & Best Practices
      if (Array.isArray(suggestions) && suggestions.length > 0) {
        checkPageBreak(40);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Recommendations & Best Practices', margin, yPos);
        yPos += 15;

        suggestions.forEach((suggestion: any, index: number) => {
          checkPageBreak(15);
          
          pdf.setFontSize(11);
          pdf.setFont('helvetica', 'normal');
          
          const suggestionText = typeof suggestion === 'object' 
            ? suggestion.text || suggestion.content || suggestion.title || JSON.stringify(suggestion)
            : suggestion;
          
          const suggestionLines = pdf.splitTextToSize(`${index + 1}. ${suggestionText}`, 170);
          pdf.text(suggestionLines, margin + 5, yPos);
          yPos += suggestionLines.length * lineHeight + 5;
        });
      }

      // Footer on all pages
      const totalPages = (pdf as any).internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Generated by DevSynth AI StackWizard+ | Page ${i} of ${totalPages}`, margin, 290);
      }

      pdf.save(`${projectName}-complete-blueprint.pdf`);
      
      toast({
        title: "Success!",
        description: "Complete project blueprint exported as PDF",
      });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({
        title: "Error",
        description: "Failed to export PDF",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else {
      toast({
        title: "Copy Feature",
        description: "Copy functionality not implemented",
      });
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      toast({
        title: "Download Feature",
        description: "Download functionality not implemented",
      });
    }
  };

  return (
    <div className="flex gap-3">
      <button 
        onClick={handleExportPDF}
        className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow"
      >
        <FileText className="w-4 h-4 text-neon-aqua animate-glow" />
        <span className="text-sm font-medium">Export PDF</span>
      </button>
      <button 
        onClick={handleCopy}
        className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow"
      >
        <Copy className="w-4 h-4 text-neon-coral animate-glow" />
        <span className="text-sm font-medium">Copy Code</span>
      </button>
      <button 
        onClick={handleDownload}
        className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow btn-glow"
      >
        <Download className="w-4 h-4 text-neon-green animate-glow" />
        <span className="text-sm font-medium">Download</span>
      </button>
    </div>
  );
};

export default ActionButtons;
