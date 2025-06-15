
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useCodeLens } from "@/hooks/useCodeLens";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";
import { Button } from "../ui/button";
import { Copy, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

const CodeLens = () => {
  const { user } = useAuth();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const { analyzeCode, isAnalyzing, analysis } = useCodeLens();

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
  ];

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code to analyze");
      return;
    }
    if (!user) {
      toast.error("Please log in to analyze code");
      return;
    }
    await analyzeCode(code, language);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (isAnalyzing) return <LoadingState module="codelens" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
          🔍 CodeLens
        </h2>
        <p className="text-muted-foreground mb-6">
          Analyze your code for complexity, bottlenecks, and optimization opportunities
        </p>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Programming Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-green transition-all"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value} className="bg-black text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Code Input</label>
            <div className="glass rounded-xl overflow-hidden">
              <Editor
                height="300px"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-neon-green to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Code...
              </>
            ) : (
              "Analyze Code"
            )}
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="grid gap-4">
          <OutputCard
            title="Complexity Analysis"
            tag="Big-O"
            tagColor="bg-neon-blue"
            content={
              <div className="space-y-3">
                <div className="font-mono text-sm bg-black/30 p-3 rounded-lg">
                  {analysis.complexity || "Analysis not available"}
                </div>
              </div>
            }
            delay={100}
          />

          {analysis.bottlenecks && analysis.bottlenecks.length > 0 && (
            <OutputCard
              title="Performance Bottlenecks"
              tag="Issues Found"
              tagColor="bg-yellow-500"
              content={
                <div className="space-y-2">
                  {analysis.bottlenecks.map((bottleneck, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm">{bottleneck}</span>
                    </div>
                  ))}
                </div>
              }
              delay={200}
            />
          )}

          {analysis.suggestions && (
            <OutputCard
              title="Optimization Suggestions"
              tag="Improvements"
              tagColor="bg-neon-purple"
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{analysis.suggestions}</p>
                </div>
              }
              delay={300}
            />
          )}

          {analysis.optimizedCode && (
            <OutputCard
              title="Optimized Code"
              tag="Enhanced"
              tagColor="bg-neon-green"
              content={
                <div className="space-y-3">
                  <div className="bg-black/30 rounded-lg overflow-hidden">
                    <Editor
                      height="250px"
                      language={language}
                      value={analysis.optimizedCode}
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 12,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(analysis.optimizedCode || "")}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </Button>
                  </div>
                </div>
              }
              delay={400}
            />
          )}

          {analysis.explanation && (
            <OutputCard
              title="AI Explanation"
              tag="How it Works"
              tagColor="bg-neon-orange"
              content={
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{analysis.explanation}</p>
                </div>
              }
              delay={500}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CodeLens;
