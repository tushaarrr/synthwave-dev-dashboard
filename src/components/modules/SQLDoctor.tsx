
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { useSQLDoctor } from "@/hooks/useSQLDoctor";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";
import { Button } from "../ui/button";
import { Copy, Download, RefreshCw, Database, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

const SQLDoctor = () => {
  const { user } = useAuth();
  const [sqlQuery, setSqlQuery] = useState("");
  const { analyzeSQL, isAnalyzing, analysis } = useSQLDoctor();

  const handleAnalyze = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please enter a SQL query to analyze");
      return;
    }
    if (!user) {
      toast.error("Please log in to analyze SQL");
      return;
    }

    await analyzeSQL(sqlQuery);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getTagIcon = (tag: string) => {
    if (tag.includes('*') || tag.includes('Missing') || tag.includes('Inefficient')) {
      return <XCircle className="w-3 h-3 text-red-400" />;
    }
    if (tag.includes('Recommended') || tag.includes('Optimizable')) {
      return <AlertTriangle className="w-3 h-3 text-yellow-400" />;
    }
    return <CheckCircle className="w-3 h-3 text-green-400" />;
  };

  if (isAnalyzing) return <LoadingState module="sqldoctor" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
          🧾 SQLDoctor
        </h2>
        <p className="text-muted-foreground mb-6">
          AI-powered SQL query optimization and performance analysis
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SQL Query</label>
            <div className="glass rounded-xl overflow-hidden">
              <Editor
                height="300px"
                language="sql"
                value={sqlQuery}
                onChange={(value) => setSqlQuery(value || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                }}
                onMount={(editor) => {
                  if (!sqlQuery) {
                    const defaultQuery = `SELECT * FROM orders
JOIN customers ON orders.customer_id = customers.id
WHERE orders.date >= '2024-01-01'
ORDER BY orders.date DESC;`;
                    editor.setValue(defaultQuery);
                    setSqlQuery(defaultQuery);
                  }
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-neon-orange to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing SQL Query...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Analyze SQL
              </>
            )}
          </Button>
        </div>
      </div>

      {analysis && (
        <div className="grid gap-4">
          <OutputCard
            title="✅ SQL Explanation"
            tag="AI Analysis"
            tagColor="bg-blue-500"
            content={
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{analysis.explanation}</p>
                </div>
              </div>
            }
            delay={100}
          />

          <OutputCard
            title="🏷️ Performance Tags"
            tag="Issues Detected"
            tagColor="bg-yellow-500"
            content={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {analysis.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-medium text-red-300"
                    >
                      {getTagIcon(tag)}
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            }
            delay={200}
          />

          <OutputCard
            title="⚙️ Optimization Suggestions"
            tag="AI Recommendations"
            tagColor="bg-neon-purple"
            content={
              <div className="space-y-2">
                {analysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            }
            delay={300}
          />

          <OutputCard
            title="🧬 Optimized Query"
            tag="Enhanced Version"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg overflow-hidden">
                  <Editor
                    height="300px"
                    language="sql"
                    value={analysis.optimized_query}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 12,
                      lineNumbers: "on",
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      wordWrap: "on",
                    }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(analysis.optimized_query)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Query
                  </Button>
                </div>
              </div>
            }
            delay={400}
          />
        </div>
      )}
    </div>
  );
};

export default SQLDoctor;
