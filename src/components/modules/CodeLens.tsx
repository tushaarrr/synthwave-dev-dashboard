
import { useState } from "react";
import Editor from '@monaco-editor/react';
import { useCodeLens } from "@/hooks/useCodeLens";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, FileDown, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CodeLens = () => {
  const [code, setCode] = useState(`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`);
  const [language, setLanguage] = useState("javascript");
  const [viewMode, setViewMode] = useState<"analysis" | "diff">("analysis");
  
  const { analyzeCode, isAnalyzing, analysis, setAnalysis } = useCodeLens();
  const { toast } = useToast();

  const languages = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "sql", label: "SQL" },
  ];

  const handleAnalyze = () => {
    if (!code.trim()) {
      toast({
        title: "No code provided",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }
    analyzeCode(code, language);
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied`,
      description: `${type} has been copied to clipboard`,
    });
  };

  const exportToPDF = () => {
    toast({
      title: "Export initiated",
      description: "Generating PDF export...",
    });
  };

  if (isAnalyzing) return <LoadingState module="codelens" />;

  return (
    <div className="space-y-6">
      {/* Code Input Section */}
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
            🧠 CodeLens
          </h2>
          <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-40 glass">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {analysis && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAnalysis(null)}
                className="glass"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">
          Paste your code below for comprehensive analysis of complexity, bottlenecks, and optimization opportunities
        </p>

        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <Editor
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              }}
            />
          </div>
          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-neon-green to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            disabled={isAnalyzing}
          >
            Analyze Code Complexity
          </Button>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          {/* View Mode Toggle */}
          <div className="flex justify-center">
            <div className="glass-dark rounded-xl p-1 flex">
              <button
                onClick={() => setViewMode("analysis")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "analysis" ? "bg-neon-green text-black" : "text-white hover:bg-white/10"
                }`}
              >
                Analysis View
              </button>
              <button
                onClick={() => setViewMode("diff")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  viewMode === "diff" ? "bg-neon-blue text-black" : "text-white hover:bg-white/10"
                }`}
              >
                Diff View
              </button>
            </div>
          </div>

          {viewMode === "analysis" ? (
            <div className="grid gap-4">
              <OutputCard
                title="Complexity Analysis"
                tag="Performance"
                tagColor="bg-neon-blue"
                content={
                  <div className="space-y-3">
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <strong className="text-neon-blue">Time & Space Complexity:</strong>
                      <p className="mt-2 text-sm">{analysis.complexity}</p>
                    </div>
                  </div>
                }
                delay={100}
              />

              <OutputCard
                title="Performance Bottlenecks"
                tag="Critical Issues"
                tagColor="bg-red-500"
                content={
                  <div className="space-y-3">
                    {analysis.bottlenecks.map((bottleneck, index) => (
                      <div key={index} className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                        <span className="text-sm">{bottleneck}</span>
                      </div>
                    ))}
                  </div>
                }
                delay={200}
              />

              <OutputCard
                title="AI Suggestions"
                tag="Recommendations"
                tagColor="bg-neon-green"
                content={
                  <div className="space-y-3">
                    <p className="text-sm">{analysis.suggestions}</p>
                  </div>
                }
                delay={300}
              />

              <OutputCard
                title="Optimized Code"
                tag="AI Enhanced"
                tagColor="bg-neon-purple"
                content={
                  <div className="space-y-3">
                    <div className="bg-black/40 rounded-lg overflow-hidden">
                      <Editor
                        height="200px"
                        language={language}
                        value={analysis.optimizedCode}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: "on",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(analysis.optimizedCode, "Optimized code")}
                        className="glass"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Code
                      </Button>
                      <Button
                        size="sm"
                        onClick={exportToPDF}
                        variant="outline"
                        className="glass"
                      >
                        <FileDown className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </div>
                }
                delay={400}
              />

              <OutputCard
                title="AI Explanation"
                tag="Code Analysis"
                tagColor="bg-neon-orange"
                content={
                  <div className="space-y-3">
                    <p className="text-sm leading-relaxed">{analysis.explanation}</p>
                  </div>
                }
                delay={500}
              />
            </div>
          ) : (
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4 text-neon-blue">Side-by-Side Comparison</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-red-400">Original Code</h4>
                  <div className="rounded-lg overflow-hidden border border-red-500/20">
                    <Editor
                      height="300px"
                      language={language}
                      value={code}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2 text-neon-green">Optimized Code</h4>
                  <div className="rounded-lg overflow-hidden border border-green-500/20">
                    <Editor
                      height="300px"
                      language={language}
                      value={analysis.optimizedCode}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeLens;
