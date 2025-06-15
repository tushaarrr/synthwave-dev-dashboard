
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
      
      // Title
      pdf.setFontSize(20);
      pdf.text(project.project_name, 20, 30);
      
      // Date
      pdf.setFontSize(12);
      pdf.text(`Generated: ${new Date(project.created_at).toLocaleDateString()}`, 20, 45);
      
      // Description
      pdf.setFontSize(14);
      pdf.text('Project Description:', 20, 65);
      pdf.setFontSize(10);
      const descLines = pdf.splitTextToSize(project.description, 170);
      pdf.text(descLines, 20, 75);
      
      let yPos = 90 + (descLines.length * 5);
      
      // Tech Stack
      pdf.setFontSize(14);
      pdf.text('Technology Stack:', 20, yPos);
      pdf.setFontSize(10);
      const techLines = pdf.splitTextToSize(project.tech_stack, 170);
      pdf.text(techLines, 20, yPos + 10);
      
      yPos += 25 + (techLines.length * 5);
      
      // Timeline
      pdf.setFontSize(14);
      pdf.text('Development Timeline:', 20, yPos);
      pdf.setFontSize(10);
      const timelineLines = pdf.splitTextToSize(project.timeline, 170);
      pdf.text(timelineLines, 20, yPos + 10);
      
      yPos += 25 + (timelineLines.length * 5);
      
      // Suggestions
      if (yPos > 250) {
        pdf.addPage();
        yPos = 30;
      }
      
      pdf.setFontSize(14);
      pdf.text('Recommendations:', 20, yPos);
      pdf.setFontSize(10);
      const suggestionLines = pdf.splitTextToSize(project.suggestions, 170);
      pdf.text(suggestionLines, 20, yPos + 10);
      
      pdf.save(`${project.project_name}-development-plan.pdf`);
      
      toast({
        title: "Success!",
        description: "Project exported as PDF",
      });
    } catch (error) {
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
      techStack.toLowerCase().includes(tech.toLowerCase())
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

  const filteredProjects = projects.filter(project =>
    project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                    {project.project_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(project.created_at).toLocaleDateString()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {extractTags(project.tech_stack).map((tag, tagIndex) => (
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
