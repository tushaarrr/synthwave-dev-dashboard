
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Copy, Download, RefreshCw, ArrowLeft, Code, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  project_name: string;
  tech_stack: string;
  description: string;
  created_at: string;
}

interface TestCase {
  id: string;
  title: string;
  input: string;
  expectedOutput: string;
  reasoning?: string;
  framework: string;
  code: string;
}

interface GeneratedTest {
  testCases: TestCase[];
  framework: string;
  coverage: string;
  totalTests: number;
}

const TestCaseGen = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [inputMode, setInputMode] = useState<"project" | "code">("code");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [rawCode, setRawCode] = useState(`function calculateDiscount(price, percentage) {
  if (price <= 0 || percentage < 0 || percentage > 100) {
    throw new Error('Invalid input');
  }
  return price * (1 - percentage / 100);
}`);
  const [framework, setFramework] = useState("jest");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTests, setGeneratedTests] = useState<GeneratedTest | null>(null);
  const [expandedTests, setExpandedTests] = useState<Set<string>>(new Set());
  const [isProjectsLoading, setIsProjectsLoading] = useState(false);

  useEffect(() => {
    if (inputMode === "project") {
      fetchProjects();
    }
  }, [inputMode]);

  const fetchProjects = async () => {
    if (!user) return;
    
    setIsProjectsLoading(true);
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('id, project_name, tech_stack, description, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } finally {
      setIsProjectsLoading(false);
    }
  };

  const generateTestCases = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to generate test cases",
        variant: "destructive",
      });
      return;
    }

    if (inputMode === "code" && !rawCode.trim()) {
      toast({
        title: "Code Required",
        description: "Please enter code to generate test cases",
        variant: "destructive",
      });
      return;
    }

    if (inputMode === "project" && !selectedProject) {
      toast({
        title: "Project Required",
        description: "Please select a project to generate test cases",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate AI test generation (replace with actual AI integration)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockTests: GeneratedTest = {
        framework: framework,
        coverage: "92%",
        totalTests: 8,
        testCases: [
          {
            id: "1",
            title: "Valid discount calculation",
            input: "calculateDiscount(100, 10)",
            expectedOutput: "90",
            reasoning: "10% discount on $100 should return $90",
            framework: framework,
            code: framework === "jest" 
              ? "test('calculates 10% discount correctly', () => {\n  expect(calculateDiscount(100, 10)).toBe(90);\n});"
              : "def test_calculates_discount_correctly():\n    assert calculate_discount(100, 10) == 90"
          },
          {
            id: "2",
            title: "Zero discount",
            input: "calculateDiscount(100, 0)",
            expectedOutput: "100",
            reasoning: "0% discount should return original price",
            framework: framework,
            code: framework === "jest"
              ? "test('handles 0% discount', () => {\n  expect(calculateDiscount(100, 0)).toBe(100);\n});"
              : "def test_handles_zero_discount():\n    assert calculate_discount(100, 0) == 100"
          },
          {
            id: "3",
            title: "Invalid negative price",
            input: "calculateDiscount(-10, 20)",
            expectedOutput: "Error: Invalid input",
            reasoning: "Negative prices should throw an error",
            framework: framework,
            code: framework === "jest"
              ? "test('throws error for negative price', () => {\n  expect(() => calculateDiscount(-10, 20)).toThrow('Invalid input');\n});"
              : "def test_throws_error_for_negative_price():\n    with pytest.raises(ValueError, match='Invalid input'):\n        calculate_discount(-10, 20)"
          },
          {
            id: "4",
            title: "Invalid percentage over 100",
            input: "calculateDiscount(100, 150)",
            expectedOutput: "Error: Invalid input",
            reasoning: "Percentage over 100 should throw an error",
            framework: framework,
            code: framework === "jest"
              ? "test('throws error for percentage over 100', () => {\n  expect(() => calculateDiscount(100, 150)).toThrow('Invalid input');\n});"
              : "def test_throws_error_for_high_percentage():\n    with pytest.raises(ValueError, match='Invalid input'):\n        calculate_discount(100, 150)"
          }
        ]
      };

      setGeneratedTests(mockTests);

      // Save to database - convert GeneratedTest to JSON-compatible format
      const testsForDb = JSON.parse(JSON.stringify(mockTests));
      
      const { error } = await supabase
        .from('test_cases')
        .insert({
          user_id: user.id,
          project_id: inputMode === "project" ? selectedProject : null,
          raw_code: inputMode === "code" ? rawCode : null,
          framework: framework,
          generated_tests: testsForDb
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: `Generated ${mockTests.totalTests} test cases with ${mockTests.coverage} coverage`,
      });

    } catch (error) {
      console.error('Error generating test cases:', error);
      toast({
        title: "Error",
        description: "Failed to generate test cases",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTestExpansion = (testId: string) => {
    const newExpanded = new Set(expandedTests);
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId);
    } else {
      newExpanded.add(testId);
    }
    setExpandedTests(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Test case copied to clipboard",
    });
  };

  const exportAllAsJSON = () => {
    if (!generatedTests) return;
    
    const exportData = {
      framework: generatedTests.framework,
      coverage: generatedTests.coverage,
      totalTests: generatedTests.totalTests,
      testCases: generatedTests.testCases,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-cases-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Exported",
      description: "Test cases exported as JSON",
    });
  };

  const getSelectedProjectName = () => {
    const project = projects.find(p => p.id === selectedProject);
    return project ? project.project_name : "Choose a saved project";
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-neon-blue hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                🧪 TestCase Generator
              </h1>
              <p className="text-muted-foreground">
                Intelligently generate comprehensive test cases for your code
              </p>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-dark rounded-2xl p-6 mb-8"
        >
          <div className="space-y-6">
            {/* Input Mode Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">Input Source</label>
              <div className="flex gap-4">
                <Button
                  variant={inputMode === "code" ? "default" : "outline"}
                  onClick={() => setInputMode("code")}
                  className="flex items-center gap-2"
                >
                  <Code className="w-4 h-4" />
                  Paste Raw Code
                </Button>
                <Button
                  variant={inputMode === "project" ? "default" : "outline"}
                  onClick={() => setInputMode("project")}
                  className="flex items-center gap-2"
                >
                  <Database className="w-4 h-4" />
                  From Saved Project
                </Button>
              </div>
            </div>

            {/* Framework Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Testing Framework</label>
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger className="w-full glass rounded-xl px-4 py-3 bg-black/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-white/20 backdrop-blur-sm">
                  <SelectItem value="jest">Jest (JavaScript)</SelectItem>
                  <SelectItem value="pytest">Pytest (Python)</SelectItem>
                  <SelectItem value="mocha">Mocha (JavaScript)</SelectItem>
                  <SelectItem value="unittest">Unittest (Python)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Project Selection */}
            {inputMode === "project" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-2">Select Project</label>
                {isProjectsLoading ? (
                  <div className="text-center py-4">Loading projects...</div>
                ) : (
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger className="w-full glass rounded-xl px-4 py-3 bg-black/20">
                      <SelectValue placeholder="Choose a saved project">
                        {getSelectedProjectName()}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 backdrop-blur-sm max-h-60 overflow-y-auto">
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={project.id} className="cursor-pointer">
                          <div className="flex flex-col py-2">
                            <span className="font-medium text-white">{project.project_name}</span>
                            <span className="text-xs text-muted-foreground">
                              {project.tech_stack} • {new Date(project.created_at).toLocaleDateString()}
                            </span>
                            {project.description && (
                              <span className="text-xs text-muted-foreground mt-1 truncate max-w-[300px]">
                                {project.description}
                              </span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </motion.div>
            )}

            {/* Code Input */}
            {inputMode === "code" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="block text-sm font-medium mb-2">Your Code</label>
                <Textarea
                  value={rawCode}
                  onChange={(e) => setRawCode(e.target.value)}
                  placeholder="Paste your code here..."
                  rows={12}
                  className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-pink transition-all resize-none font-mono text-sm"
                />
              </motion.div>
            )}

            {/* Generate Button */}
            <Button
              onClick={generateTestCases}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Test Cases...
                </>
              ) : (
                "Generate Test Cases"
              )}
            </Button>
          </div>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {generatedTests && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Summary Card */}
              <Card className="glass-dark border-neon-blue/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
                      Test Generation Summary
                    </span>
                    <div className="flex gap-2">
                      <Button
                        onClick={generateTestCases}
                        variant="outline"
                        size="sm"
                        className="border-neon-blue/30"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Re-generate
                      </Button>
                      <Button
                        onClick={exportAllAsJSON}
                        variant="outline"
                        size="sm"
                        className="border-neon-green/30"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export JSON
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-green">
                        {generatedTests.totalTests}
                      </div>
                      <div className="text-sm text-muted-foreground">Test Cases</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-neon-blue">
                        {generatedTests.coverage}
                      </div>
                      <div className="text-sm text-muted-foreground">Coverage</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="border-neon-coral/30 text-neon-coral">
                        {generatedTests.framework}
                      </Badge>
                      <div className="text-sm text-muted-foreground mt-1">Framework</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test Cases */}
              <div className="space-y-4">
                {generatedTests.testCases.map((testCase, index) => (
                  <motion.div
                    key={testCase.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="glass-dark border-white/10 hover:border-neon-blue/30 transition-all">
                      <CardHeader 
                        className="cursor-pointer"
                        onClick={() => toggleTestExpansion(testCase.id)}
                      >
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {expandedTests.has(testCase.id) ? (
                              <ChevronDown className="w-5 h-5 text-neon-blue" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-neon-blue" />
                            )}
                            <span className="text-lg">{testCase.title}</span>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(testCase.code);
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-neon-green hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      
                      <AnimatePresence>
                        {expandedTests.has(testCase.id) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium text-neon-blue">Input</label>
                                  <div className="bg-black/30 p-3 rounded-lg font-mono text-sm">
                                    {testCase.input}
                                  </div>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-neon-green">Expected Output</label>
                                  <div className="bg-black/30 p-3 rounded-lg font-mono text-sm">
                                    {testCase.expectedOutput}
                                  </div>
                                </div>
                              </div>
                              
                              {testCase.reasoning && (
                                <div>
                                  <label className="text-sm font-medium text-neon-coral">Reasoning</label>
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {testCase.reasoning}
                                  </div>
                                </div>
                              )}
                              
                              <div>
                                <label className="text-sm font-medium text-neon-pink">Generated Test Code</label>
                                <div className="bg-black/50 p-4 rounded-lg mt-2">
                                  <pre className="text-sm font-mono text-neon-blue overflow-x-auto">
                                    {testCase.code}
                                  </pre>
                                </div>
                              </div>
                            </CardContent>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestCaseGen;
