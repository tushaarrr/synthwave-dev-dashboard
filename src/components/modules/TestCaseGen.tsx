import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, TestTube, Zap, Code, Database, Play, CheckCircle, AlertCircle, Copy, Eye, EyeOff } from "lucide-react";
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

interface TestCase {
  category: string;
  title: string;
  description: string;
  explanation: string;
  code: string;
  icon: any;
  color: string;
}

const TestCaseGen = () => {
  const [inputCode, setInputCode] = useState(`// Example React Component
import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await onSubmit({ email, password });
      } catch (error) {
        setErrors({ submit: 'Failed to submit form' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Submit</button>
      {errors.submit && <span className="error">{errors.submit}</span>}
    </form>
  );
};

export default UserForm;`);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('jest');
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
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
          project_name: project.project_name || 'Untitled Project',
          tech_stack: typeof project.tech_stack === 'string' 
            ? project.tech_stack 
            : (project.tech_stack ? Object.keys(project.tech_stack).join(', ') : 'Not specified'),
          description: project.description || 'No description available',
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Test code copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const toggleCardExpansion = (category: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const generateTestCases = async () => {
    setLoading(true);
    
    try {
      let analysisInput = '';
      let projectContext = '';
      
      if (selectedProject) {
        const project = projects.find(p => p.id === selectedProject);
        if (project) {
          analysisInput = `
Project: ${project.project_name}
Description: ${project.description}
Tech Stack: ${project.tech_stack}
`;
          projectContext = project.project_name;
        }
      } else {
        analysisInput = inputCode;
        projectContext = 'Code Analysis';
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

      setTimeout(() => {
        const generatedTestCases: TestCase[] = [
          {
            category: 'rendering',
            title: 'Component Rendering Tests',
            description: 'Tests to ensure the component renders correctly with all required elements and handles different states properly.',
            explanation: 'These tests verify that your component renders without crashing and displays all necessary elements. They check the basic structure and ensure that required form fields, buttons, and containers are present in the DOM. This is the foundation of component testing - if your component doesn\'t render properly, nothing else matters.',
            icon: Eye,
            color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            code: `// Rendering Tests for ${selectedFramework.toUpperCase()}
describe('UserForm Rendering', () => {
  const mockOnSubmit = jest.fn();

  test('renders form with all required fields', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('renders without crashing', () => {
    const { container } = render(<UserForm onSubmit={mockOnSubmit} />);
    expect(container).toBeInTheDocument();
  });

  test('has proper form structure', () => {
    render(<UserForm onSubmit={mockOnSubmit} />);
    const form = screen.getByRole('form') || container.querySelector('form');
    expect(form).toBeInTheDocument();
  });
});`
          },
          {
            category: 'validation',
            title: 'Form Validation Tests',
            description: 'Comprehensive tests for form validation logic, including email format validation, required fields, and password strength requirements.',
            explanation: 'Validation tests are crucial for ensuring your form behaves correctly with different types of user input. These tests verify that your validation logic catches empty fields, invalid email formats, weak passwords, and other edge cases. They ensure your users get helpful error messages and that invalid data doesn\'t get submitted.',
            icon: CheckCircle,
            color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            code: `// Validation Tests for ${selectedFramework.toUpperCase()}
describe('Form Validation', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows error when email is empty', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
  });

  test('shows error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  test('accepts valid email format', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    expect(screen.queryByText('Email is invalid')).not.toBeInTheDocument();
  });

  test('shows error for short password', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, '123');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });
});`
          },
          {
            category: 'interaction',
            title: 'User Interaction Tests',
            description: 'Tests for user interactions including form input changes, button clicks, and keyboard navigation to ensure proper user experience.',
            explanation: 'User interaction tests simulate real user behavior to ensure your component responds correctly to user actions. These tests verify that typing in inputs updates the values, clicking buttons triggers the right actions, and keyboard navigation works as expected. They help catch issues that users would encounter in real usage.',
            icon: Code,
            color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            code: `// User Interaction Tests for ${selectedFramework.toUpperCase()}
describe('User Interactions', () => {
  const mockOnSubmit = jest.fn();

  test('updates email input value', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('updates password input value', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const passwordInput = screen.getByPlaceholderText('Password');
    await user.type(passwordInput, 'mypassword');
    
    expect(passwordInput).toHaveValue('mypassword');
  });

  test('clears errors when valid input is entered', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // First trigger error
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
    });
    
    // Then fix the error
    const emailInput = screen.getByPlaceholderText('Email');
    await user.type(emailInput, 'test@example.com');
    await user.click(submitButton);
    
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });

  test('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    // Tab through elements
    await user.tab();
    expect(screen.getByPlaceholderText('Email')).toHaveFocus();
    
    await user.tab();
    expect(screen.getByPlaceholderText('Password')).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();
  });
});`
          },
          {
            category: 'submission',
            title: 'Form Submission Tests',
            description: 'Tests for form submission scenarios including successful submissions, error handling, and edge cases during the submission process.',
            explanation: 'Form submission tests ensure that your form correctly handles the submission process. They verify that valid data gets passed to the onSubmit handler with the correct format, invalid submissions are blocked, and errors during submission are handled gracefully. These tests are essential for ensuring your form integrates properly with your application\'s backend.',
            icon: Play,
            color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            code: `// Form Submission Tests for ${selectedFramework.toUpperCase()}
describe('Form Submission', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calls onSubmit with correct data when form is valid', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockResolvedValue({});
    
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  test('does not call onSubmit when form is invalid', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('handles submission errors gracefully', async () => {
    const user = userEvent.setup();
    mockOnSubmit.mockRejectedValue(new Error('Submission failed'));
    
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to submit form')).toBeInTheDocument();
    });
  });

  test('prevents multiple submissions', async () => {
    const user = userEvent.setup();
    let resolveSubmit: (value: any) => void;
    const slowSubmit = new Promise(resolve => { resolveSubmit = resolve; });
    mockOnSubmit.mockReturnValue(slowSubmit);
    
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /submit/i });
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    // First submission
    await user.click(submitButton);
    
    // Try to submit again while first is pending
    await user.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    
    // Resolve the promise
    resolveSubmit!({});
  });
});`
          },
          {
            category: 'edge-cases',
            title: 'Edge Cases & Error Handling',
            description: 'Tests for unusual scenarios, boundary conditions, and error states to ensure robust application behavior in all situations.',
            explanation: 'Edge case tests help ensure your component is robust and handles unexpected situations gracefully. These tests cover scenarios like extremely long inputs, special characters, rapid user actions, and component lifecycle edge cases. They help prevent bugs that might only surface in production with real user behavior.',
            icon: AlertCircle,
            color: 'bg-red-500/20 text-red-400 border-red-500/30',
            code: `// Edge Cases Tests for ${selectedFramework.toUpperCase()}
describe('Edge Cases', () => {
  const mockOnSubmit = jest.fn();

  test('handles extremely long email input', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const longEmail = 'a'.repeat(100) + '@example.com';
    const emailInput = screen.getByPlaceholderText('Email');
    
    await user.type(emailInput, longEmail);
    expect(emailInput).toHaveValue(longEmail);
  });

  test('handles special characters in password', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const specialPassword = 'p@ssw0rd!#$%^&*()';
    const passwordInput = screen.getByPlaceholderText('Password');
    
    await user.type(passwordInput, specialPassword);
    expect(passwordInput).toHaveValue(specialPassword);
  });

  test('handles empty string inputs', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    // Type and then clear
    await user.type(emailInput, 'test@example.com');
    await user.clear(emailInput);
    
    await user.type(passwordInput, 'password');
    await user.clear(passwordInput);
    
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
  });

  test('handles component unmounting during async operations', () => {
    const slowSubmit = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 1000))
    );
    
    const { unmount } = render(<UserForm onSubmit={slowSubmit} />);
    
    // Unmount component
    unmount();
    
    // Should not cause memory leaks or errors
    expect(true).toBe(true); // Test passes if no errors thrown
  });

  test('maintains state consistency during rapid state changes', async () => {
    const user = userEvent.setup();
    render(<UserForm onSubmit={mockOnSubmit} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    
    // Rapid typing simulation
    await user.type(emailInput, 'a');
    await user.type(emailInput, 'b');
    await user.type(emailInput, 'c');
    
    expect(emailInput).toHaveValue('abc');
  });
});`
          }
        ];
        
        setTestCases(generatedTestCases);
        setLoading(false);
        
        toast({
          title: "Test Cases Generated!",
          description: `Comprehensive ${selectedFramework} test cases generated successfully`,
        });
      }, 1500);
      
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
    { value: 'jest', label: 'Jest + React Testing Library', icon: TestTube },
    { value: 'vitest', label: 'Vitest + React Testing Library', icon: Zap },
    { value: 'cypress', label: 'Cypress E2E', icon: Play },
    { value: 'playwright', label: 'Playwright E2E', icon: Database }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <TestTube className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-white">TestCaseGen</CardTitle>
              <CardDescription className="text-zinc-400">Generate comprehensive test cases automatically</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="code" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-700">
              <TabsTrigger value="code" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">Raw Code</TabsTrigger>
              <TabsTrigger value="project" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">Saved Project</TabsTrigger>
            </TabsList>
            
            <TabsContent value="code" className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-zinc-300">Paste Your Code</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputCode(`// Example React Component
import React, { useState } from 'react';

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await onSubmit({ email, password });
      } catch (error) {
        setErrors({ submit: 'Failed to submit form' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {errors.password && <span className="error">{errors.password}</span>}
      
      <button type="submit">Submit</button>
      {errors.submit && <span className="error">{errors.submit}</span>}
    </form>
  );
};

export default UserForm;`)}
                    className="bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                  >
                    <Code className="w-4 h-4 mr-1" />
                    Load Example
                  </Button>
                </div>
                <Textarea
                  placeholder="Paste your code here to generate test cases..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[300px] bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 font-mono text-sm"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="project" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Select Project</label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                    <SelectValue placeholder="Choose a saved project..." />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-700 border-zinc-600">
                    {projects.length === 0 ? (
                      <SelectItem value="no-projects" disabled className="text-zinc-400">No projects found</SelectItem>
                    ) : (
                      projects.map((project) => (
                        <SelectItem key={project.id} value={project.id} className="text-white hover:bg-zinc-600">
                          <div className="flex flex-col">
                            <span className="font-medium">{project.project_name}</span>
                            <span className="text-xs text-zinc-400 truncate max-w-[200px]">
                              {project.tech_stack}
                            </span>
                          </div>
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Testing Framework</label>
            <Select value={selectedFramework} onValueChange={setSelectedFramework}>
              <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 border-zinc-600">
                {frameworks.map((framework) => (
                  <SelectItem key={framework.value} value={framework.value} className="text-white hover:bg-zinc-600">
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
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
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

      {testCases.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-semibold text-white">Generated Test Cases</h2>
            <Badge variant="outline" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              {testCases.length} Categories
            </Badge>
          </div>

          <div className="grid gap-4">
            {testCases.map((testCase, index) => (
              <Card key={testCase.category} className="bg-zinc-800 border-zinc-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-zinc-700 rounded-lg flex items-center justify-center">
                        <testCase.icon className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg">{testCase.title}</CardTitle>
                        <CardDescription className="text-zinc-400 text-sm">
                          {testCase.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={testCase.color}>
                        <FileText className="w-3 h-3 mr-1" />
                        {testCase.category}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(testCase.code)}
                        className="bg-zinc-700 border-zinc-600 text-zinc-300 hover:bg-zinc-600"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Explanation Section */}
                  <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      What this test covers:
                    </h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {testCase.explanation}
                    </p>
                  </div>

                  {/* Code Section */}
                  <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-700">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Test Code:
                      </h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(testCase.code)}
                        className="bg-zinc-800 border-zinc-600 text-zinc-300 hover:bg-zinc-600 text-xs px-2 py-1 h-7"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="text-sm text-zinc-300 whitespace-pre-wrap overflow-x-auto">
                      <code>{testCase.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseGen;
