
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TestTube, Zap, Code, Database, Play, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Project {
  id: string;
  project_name: string;
  tech_stack: string;
  description: string;
  created_at: string;
  modules: any;
  architecture: any;
  testing_strategy: any;
}

const TestCaseGen = () => {
  const [inputCode, setInputCode] = useState('');
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [testCases, setTestCases] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('jest');
  const { toast } = useToast();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load projects. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const typedProjects: Project[] = data.map(project => ({
          id: project.id,
          project_name: project.project_name || '',
          tech_stack: project.tech_stack || '',
          description: project.description || '',
          created_at: project.created_at,
          modules: project.modules || {},
          architecture: project.architecture || {},
          testing_strategy: project.testing_strategy || {}
        }));
        setProjects(typedProjects);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching projects.",
        variant: "destructive",
      });
    }
  };

  const generateTestCases = async () => {
    setLoading(true);
    
    try {
      let analysisInput = '';
      
      if (selectedProject) {
        const project = projects.find(p => p.id === selectedProject);
        if (project) {
          analysisInput = `
Project: ${project.project_name}
Description: ${project.description}
Tech Stack: ${project.tech_stack}
Architecture: ${JSON.stringify(project.architecture, null, 2)}
Testing Strategy: ${JSON.stringify(project.testing_strategy, null, 2)}
`;
        }
      } else {
        analysisInput = inputCode;
      }

      if (!analysisInput.trim()) {
        toast({
          title: "Input Required",
          description: "Please provide code or select a project to generate test cases.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Simulate test case generation based on project or code
      setTimeout(() => {
        const project = selectedProject ? projects.find(p => p.id === selectedProject) : null;
        const projectName = project?.project_name || 'Code Module';
        const techStack = project?.tech_stack || 'JavaScript/TypeScript';
        
        const mockTestCases = `
// Generated Test Cases for ${selectedFramework} - ${projectName}
// Tech Stack: ${techStack}

describe('${projectName}', () => {
  
  // Unit Tests
  describe('Unit Tests', () => {
    beforeEach(() => {
      // Setup test environment
      jest.clearAllMocks();
    });

    test('should initialize application correctly', () => {
      // Test application initialization
      const app = initializeApp();
      expect(app).toBeDefined();
      expect(app.isReady).toBe(true);
    });

    test('should handle user authentication', () => {
      // Test authentication flow
      const user = { id: '123', email: 'test@example.com' };
      const result = authenticateUser(user);
      expect(result.success).toBe(true);
    });

    test('should validate input data', () => {
      // Test input validation
      const invalidData = { name: '', email: 'invalid-email' };
      const result = validateInput(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name is required');
    });
  });

  // Integration Tests
  describe('Integration Tests', () => {
    test('should integrate with database', async () => {
      // Test database integration
      const testData = { name: 'Test User', email: 'test@example.com' };
      const result = await saveToDatabase(testData);
      expect(result.id).toBeDefined();
    });

    test('should handle API requests', async () => {
      // Test API integration
      const response = await makeApiRequest('/api/users');
      expect(response.status).toBe(200);
      expect(response.data).toBeDefined();
    });

    test('should manage state correctly', () => {
      // Test state management
      const initialState = getInitialState();
      const action = { type: 'UPDATE_USER', payload: { id: '123' } };
      const newState = reducer(initialState, action);
      expect(newState.user.id).toBe('123');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    test('should handle empty responses', async () => {
      // Test empty data scenarios
      const result = await fetchData({ limit: 0 });
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });

    test('should handle large datasets', async () => {
      // Test performance with large data
      const largeDataset = generateLargeDataset(10000);
      const startTime = Date.now();
      const result = await processLargeDataset(largeDataset);
      const endTime = Date.now();
      
      expect(result.processed).toBe(true);
      expect(endTime - startTime).toBeLessThan(5000); // Should complete within 5 seconds
    });

    test('should handle network failures gracefully', async () => {
      // Mock network failure
      jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
      
      const result = await makeNetworkRequest('/api/test');
      expect(result.error).toBe('Network error');
      expect(result.data).toBeNull();
    });

    test('should handle concurrent operations', async () => {
      // Test concurrent operations
      const operations = Array.from({ length: 10 }, (_, i) => 
        performOperation({ id: i })
      );
      
      const results = await Promise.all(operations);
      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
    });
  });

  // ${techStack.includes('React') ? 'React Component Tests' : 'Framework-Specific Tests'}
  ${techStack.includes('React') ? `
  describe('React Component Tests', () => {
    test('should render component correctly', () => {
      const { getByTestId } = render(<TestComponent />);
      expect(getByTestId('test-component')).toBeInTheDocument();
    });

    test('should handle user interactions', () => {
      const { getByRole } = render(<InteractiveComponent />);
      const button = getByRole('button');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    test('should update state on props change', () => {
      const { rerender } = render(<StatefulComponent data={[]} />);
      expect(screen.queryByText('No data')).toBeInTheDocument();
      
      rerender(<StatefulComponent data={[{ id: 1, name: 'Test' }]} />);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });` : `
  describe('Framework-Specific Tests', () => {
    test('should handle framework-specific functionality', () => {
      // Add framework-specific test cases here
      expect(true).toBeTruthy();
    });
  });`}

  // Performance Tests
  describe('Performance Tests', () => {
    test('should meet performance benchmarks', async () => {
      const startTime = performance.now();
      await performHeavyOperation();
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(1000); // Should complete within 1 second
    });

    test('should handle memory usage efficiently', () => {
      const initialMemory = process.memoryUsage().heapUsed;
      performMemoryIntensiveOperation();
      const finalMemory = process.memoryUsage().heapUsed;
      
      // Memory increase should be reasonable
      expect(finalMemory - initialMemory).toBeLessThan(50 * 1024 * 1024); // Less than 50MB
    });
  });
});

// Helper functions for testing
function initializeApp() {
  return { isReady: true };
}

function authenticateUser(user) {
  return { success: true, user };
}

function validateInput(data) {
  const errors = [];
  if (!data.name) errors.push('Name is required');
  if (!data.email.includes('@')) errors.push('Valid email required');
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

async function saveToDatabase(data) {
  // Mock database save
  return { id: Date.now().toString(), ...data };
}

async function makeApiRequest(url) {
  // Mock API request
  return { status: 200, data: { success: true } };
}
`;
        setTestCases(mockTestCases);
        setLoading(false);
        
        toast({
          title: "Test Cases Generated!",
          description: `Comprehensive test cases generated for ${projectName}`,
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error generating test cases:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate test cases. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const frameworks = [
    { value: 'jest', label: 'Jest', icon: TestTube },
    { value: 'vitest', label: 'Vitest', icon: Zap },
    { value: 'cypress', label: 'Cypress', icon: Play },
    { value: 'playwright', label: 'Playwright', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <Card className="glass-dark border-white/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-coral to-pink-500 rounded-xl flex items-center justify-center">
              <TestTube className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">TestCaseGen</CardTitle>
              <CardDescription className="text-gray-400">Generate comprehensive test cases automatically</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="project" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass-dark">
              <TabsTrigger value="project" className="data-[state=active]:bg-neon-coral/20">Saved Project</TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-neon-coral/20">Raw Code</TabsTrigger>
            </TabsList>
            
            <TabsContent value="project" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Select Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="glass-dark border-white/20 text-white">
                    <SelectValue placeholder="Choose a saved project..." />
                  </SelectTrigger>
                  <SelectContent className="glass-dark border-white/20">
                    {projects.length === 0 ? (
                      <SelectItem value="no-projects" disabled>No projects found</SelectItem>
                    ) : (
                      projects.map((project) => (
                        <SelectItem key={project.id} value={project.id} className="text-white hover:bg-white/10">
                          <div className="flex flex-col">
                            <span>{project.project_name}</span>
                            <span className="text-xs text-gray-400">{project.tech_stack}</span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Paste Your Code</label>
                <Textarea
                  placeholder="Paste your code here to generate test cases..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[200px] glass-dark border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Testing Framework</label>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="glass-dark border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-dark border-white/20">
                {frameworks.map((framework) => (
                  <SelectItem key={framework.value} value={framework.value} className="text-white hover:bg-white/10">
                    <div className="flex items-center gap-2">
                      <framework.icon className="w-4 h-4" />
                      {framework.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={generateTestCases} 
            disabled={loading || (!selectedProject && !inputCode.trim())}
            className="w-full bg-gradient-to-r from-neon-coral to-pink-500 hover:from-neon-coral/80 hover:to-pink-500/80"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Generating Test Cases...
              </>
            ) : (
              <>
                <TestTube className="w-4 h-4 mr-2" />
                Generate Test Cases
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {testCases && (
        <Card className="glass-dark border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Generated Test Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                  <TestTube className="w-3 h-3 mr-1" />
                  Unit Tests
                </Badge>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Code className="w-3 h-3 mr-1" />
                  Integration Tests
                </Badge>
                <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Edge Cases
                </Badge>
              </div>
              
              <div className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap overflow-x-auto">
                  {testCases}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestCaseGen;
