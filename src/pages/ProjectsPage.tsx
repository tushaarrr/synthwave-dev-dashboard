import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FolderOpen, 
  Calendar, 
  Eye, 
  Download, 
  Trash2, 
  Search,
  Plus,
  AlertCircle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import LoadingState from '@/components/LoadingState';

interface SavedProject {
  id: string;
  project_name: string;
  description: string;
  created_at: string;
  tech_stack: string;
  timeline: string;
  suggestions: string;
  modules?: any;
  bonus_modules?: any;
  architecture?: any;
  testing_strategy?: any;
  team_plan?: any;
  budget_estimate?: any;
  product_scope?: string;
}

const ProjectsPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  console.log('ProjectsPage render - User:', user, 'AuthLoading:', authLoading, 'Loading:', loading);

  useEffect(() => {
    console.log('ProjectsPage useEffect - User changed:', user);
    if (user) {
      fetchProjects();
    } else if (!authLoading) {
      console.log('No user and auth not loading, setting loading to false');
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchProjects = async () => {
    if (!user) {
      console.log('No user available for fetching projects');
      return;
    }

    console.log('Fetching projects for user:', user.id);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      console.log('Supabase response:', { data, error });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Projects fetched successfully:', data?.length || 0, 'projects');
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch saved projects';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('plans')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
      
      setProjects(projects.filter(p => p.id !== projectId));
      toast({
        title: "Deleted",
        description: "Project deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    }
  };

  const exportProjectToPDF = async (project: SavedProject) => {
    try {
      const jsPDF = (await import('jspdf')).default;
      const pdf = new jsPDF();
      
      // Helper function to safely parse JSON or return fallback
      const safeParseJson = (jsonString: string | any, fallback: any = null) => {
        if (!jsonString) return fallback;
        try {
          return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
        } catch {
          return fallback;
        }
      };

      // Parse all project data
      const techStack = safeParseJson(project.tech_stack, {});
      const timeline = safeParseJson(project.timeline, []);
      const suggestions = safeParseJson(project.suggestions, []);
      const modules = project.modules || [];
      const bonusModules = project.bonus_modules || [];
      const architecture = project.architecture || {};
      const testingStrategy = project.testing_strategy || {};
      const teamPlan = project.team_plan || {};
      const budgetEstimate = project.budget_estimate || {};

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

      // Title Page
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(project.project_name || 'Untitled Project', margin, yPos);
      yPos += 15;

      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Complete SaaS Development Blueprint', margin, yPos);
      yPos += 10;

      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date(project.created_at).toLocaleDateString()}`, margin, yPos);
      yPos += 25;

      // Project Description & Scope
      checkPageBreak(40);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Project Overview', margin, yPos);
      yPos += 12;

      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      const descLines = pdf.splitTextToSize(project.description || 'No description available', 170);
      pdf.text(descLines, margin, yPos);
      yPos += descLines.length * lineHeight + 15;

      // Technology Stack
      checkPageBreak(50);
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Technology Stack', margin, yPos);
      yPos += 15;

      if (techStack && typeof techStack === 'object' && Object.keys(techStack).length > 0) {
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
      }

      yPos += 10;

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

      pdf.save(`${project.project_name || 'project'}-complete-blueprint.pdf`);
      
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

  const extractTags = (techStack: string) => {
    const commonTechs = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Vercel', 'Supabase', 'Stripe', 'GraphQL', 'REST', 'Docker'];
    return commonTechs.filter(tech => 
      techStack && techStack.toLowerCase().includes(tech.toLowerCase())
    ).slice(0, 3);
  };

  console.log('Rendering ProjectsPage - AuthLoading:', authLoading, 'User:', !!user, 'Loading:', loading, 'Error:', error);

  if (authLoading) {
    console.log('Showing auth loading state');
    return <LoadingState module="authentication" />;
  }

  if (!user) {
    console.log('Redirecting to login - no user');
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    console.log('Showing projects loading state');
    return <LoadingState module="projects" />;
  }

  if (error) {
    console.log('Showing error state:', error);
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-16">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Error Loading Projects
            </h3>
            <p className="text-muted-foreground mb-6 text-center max-w-md">
              {error}
            </p>
            <Button 
              onClick={() => {
                setError(null);
                fetchProjects();
              }}
              className="bg-neon-blue hover:bg-neon-blue/80 text-black"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const filteredProjects = projects.filter(project => {
    const projectName = project.project_name || '';
    const description = project.description || '';
    const searchLower = searchTerm.toLowerCase();
    
    return projectName.toLowerCase().includes(searchLower) ||
           description.toLowerCase().includes(searchLower);
  });

  console.log('Projects to display:', projects.length, 'Filtered:', filteredProjects.length);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <FolderOpen className="w-8 h-8 text-neon-green" />
            <div>
              <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
                Saved Projects
              </h1>
              <p className="text-muted-foreground">Your development strategy workspace</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/')}
            className="bg-neon-blue hover:bg-neon-blue/80 text-black font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
          />
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground mb-2">
              {searchTerm ? 'No projects found' : 'No saved projects yet'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? 'Try a different search term' : 'Create your first project with StackWizard+'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => navigate('/')}
                className="bg-neon-blue hover:bg-neon-blue/80 text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id}
                className="glass-dark border-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold line-clamp-2">
                    {project.project_name || 'Untitled Project'}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description || 'No description available'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {extractTags(project.tech_stack || '').map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs bg-white/10 hover:bg-white/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportProjectToPDF(project)}
                      className="flex-1 border-white/20 hover:bg-white/10"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      className="border-red-500/20 hover:bg-red-500/10 text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
