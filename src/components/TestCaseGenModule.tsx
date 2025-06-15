
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TestTube, ArrowLeft, Copy, Download, Code } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

interface SavedProject {
  id: string;
  project_name: string;
  tech_stack: string;
  architecture: any;
}

const TestCaseGenModule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [sourceType, setSourceType] = useState<'code' | 'project'>('code');
  const [rawCode, setRawCode] = useState(`// Example React component
function UserProfile({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    if (!user.name || user.name.trim() === '') {
      throw new Error('Name is required');
    }
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      {isEditing ? (
        <input 
          value={user.name}
          onChange={(e) => user.setName(e.target.value)}
        />
      ) : (
        <h2>{user.name}</h2>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit'}
      </button>
      {isEditing && <button onClick={handleSave}>Save</button>}
    </div>
  );
}`);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [framework, setFramework] = useState('jest');
  const [loading, setLoading] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchSavedProjects();
    }
  }, [user]);

  const fetchSavedProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('id, project_name, tech_stack, architecture')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const generateTestCases = async () => {
    setLoading(true);

    try {
      let codeToTest = rawCode;
      let projectId = null;

      if (sourceType === 'project' && selectedProject) {
        const project = savedProjects.find(p => p.id === selectedProject);
        if (project) {
          codeToTest = `// Test cases for ${project.project_name}\n// Tech Stack: ${project.tech_stack}\n// Architecture: ${JSON.stringify(project.architecture, null, 2)}`;
          projectId = selectedProject;
        }
      }

      // Simulate test generation
      const mockTests = {
        unitTests: [
          {
            name: 'should render user name correctly',
            code: `test('should render user name correctly', () => {
  const mockUser = { name: 'John Doe' };
  render(<UserProfile user={mockUser} />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});`
          },
          {
            name: 'should toggle edit mode',
            code: `test('should toggle edit mode', () => {
  const mockUser = { name: 'John Doe', setName: jest.fn() };
  render(<UserProfile user={mockUser} />);
  
  fireEvent.click(screen.getByText('Edit'));
  expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
});`
          }
        ],
        integrationTests: [
          {
            name: 'should save user changes',
            code: `test('should save user changes', () => {
  const mockUser = { name: 'John Doe', setName: jest.fn() };
  render(<UserProfile user={mockUser} />);
  
  fireEvent.click(screen.getByText('Edit'));
  fireEvent.change(screen.getByDisplayValue('John Doe'), { 
    target: { value: 'Jane Doe' } 
  });
  fireEvent.click(screen.getByText('Save'));
  
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();
});`
          }
        ],
        edgeCases: [
          {
            name: 'should handle empty name validation',
            code: `test('should handle empty name validation', () => {
  const mockUser = { name: '', setName: jest.fn() };
  render(<UserProfile user={mockUser} />);
  
  fireEvent.click(screen.getByText('Edit'));
  
  expect(() => {
    fireEvent.click(screen.getByText('Save'));
  }).toThrow('Name is required');
});`
          }
        ]
      };

      // Save to database
      const { error } = await supabase
        .from('test_cases')
        .insert({
          user_id: user?.id,
          project_id: projectId,
          raw_code: codeToTest,
          generated_tests: mockTests,
          framework
        });

      if (error) throw error;

      setGeneratedTests(mockTests);
      toast({
        title: "Success",
        description: "Test cases generated successfully!"
      });

    } catch (error) {
      console.error('Error generating tests:', error);
      toast({
        title: "Error",
        description: "Failed to generate test cases",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Test code copied to clipboard"
    });
  };

  const exportTests = () => {
    if (generatedTests) {
      const testContent = Object.entries(generatedTests)
        .map(([category, tests]: [string, any]) => {
          return `// ${category.toUpperCase()}\n\n${tests.map((test: any) => test.code).join('\n\n')}`;
        })
        .join('\n\n');

      const blob = new Blob([testContent], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `test-cases-${Date.now()}.test.js`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success",
        description: "Test cases exported successfully"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard')}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-3">
            <TestTube className="w-8 h-8 text-neon-green" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-green to-emerald-400 bg-clip-text text-transparent">
              Test Case Generator
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="glass-dark border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5 text-neon-green" />
                  Source Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Source Type</label>
                  <Select value={sourceType} onValueChange={(value: 'code' | 'project') => setSourceType(value)}>
                    <SelectTrigger className="glass-dark border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-dark border-white/20">
                      <SelectItem value="code">Paste Raw Code</SelectItem>
                      <SelectItem value="project">Select Saved Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {sourceType === 'project' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Select Project</label>
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="glass-dark border-white/20 text-white">
                        <SelectValue placeholder="Choose a project..." />
                      </SelectTrigger>
                      <SelectContent className="glass-dark border-white/20">
                        {savedProjects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.project_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {sourceType === 'code' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Code to Test</label>
                    <Textarea
                      value={rawCode}
                      onChange={(e) => setRawCode(e.target.value)}
                      placeholder="Paste your code here..."
                      className="glass-dark border-white/20 text-white min-h-48 font-mono text-sm"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Testing Framework</label>
                  <Select value={framework} onValueChange={setFramework}>
                    <SelectTrigger className="glass-dark border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-dark border-white/20">
                      <SelectItem value="jest">Jest</SelectItem>
                      <SelectItem value="mocha">Mocha</SelectItem>
                      <SelectItem value="cypress">Cypress</SelectItem>
                      <SelectItem value="vitest">Vitest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={generateTestCases}
                  disabled={loading || (sourceType === 'project' && !selectedProject)}
                  className="w-full bg-gradient-to-r from-neon-green to-emerald-400 hover:scale-105 transition-transform"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Generating...
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
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-dark border-white/10 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  <span className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-neon-green" />
                    Generated Tests
                  </span>
                  {generatedTests && (
                    <Button
                      onClick={exportTests}
                      size="sm"
                      variant="outline"
                      className="border-neon-green/30 text-neon-green hover:bg-neon-green/10"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center space-y-4 py-12">
                    <div className="w-16 h-16 border-4 border-neon-green/30 border-t-neon-green rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-400">Analyzing code and generating tests...</p>
                  </div>
                ) : generatedTests ? (
                  <div className="space-y-6">
                    {Object.entries(generatedTests).map(([category, tests]: [string, any]) => (
                      <div key={category} className="space-y-3">
                        <h3 className="text-lg font-semibold text-white capitalize flex items-center gap-2">
                          {category === 'unitTests' && '🧪'}
                          {category === 'integrationTests' && '🔗'}
                          {category === 'edgeCases' && '⚠️'}
                          {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
                        </h3>
                        {tests.map((test: any, index: number) => (
                          <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-medium text-gray-300">{test.name}</h4>
                              <Button
                                onClick={() => copyToClipboard(test.code)}
                                size="sm"
                                variant="ghost"
                                className="text-gray-400 hover:text-white p-1"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <pre className="text-xs text-gray-300 overflow-x-auto bg-slate-950/50 p-3 rounded border border-white/5">
                              <code>{test.code}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center space-y-4 py-12">
                    <TestTube className="w-16 h-16 text-gray-600 mx-auto" />
                    <p className="text-gray-400">Generated test cases will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestCaseGenModule;
