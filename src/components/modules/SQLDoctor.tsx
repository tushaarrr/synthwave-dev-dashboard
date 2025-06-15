
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";
import { Button } from "../ui/button";
import { Copy, Download, RefreshCw, Database } from "lucide-react";
import { toast } from "sonner";
import Editor from "@monaco-editor/react";

interface SQLAnalysis {
  explanation: string;
  suggestions: string[];
  optimized_query: string;
  tags: string[];
}

const SQLDoctor = () => {
  const { user } = useAuth();
  const [sqlQuery, setSqlQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SQLAnalysis | null>(null);

  const handleAnalyze = async () => {
    if (!sqlQuery.trim()) {
      toast.error("Please enter a SQL query to analyze");
      return;
    }
    if (!user) {
      toast.error("Please log in to analyze SQL");
      return;
    }

    setIsLoading(true);
    
    // Simulate AI analysis (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 2800));
    
    setAnalysisResult({
      explanation: `This query performs a JOIN between the 'orders' and 'customers' tables based on customer_id. It filters orders from 2024 onwards using a date comparison and sorts results by order date in descending order. The query uses SELECT * which retrieves all columns from both tables.`,
      suggestions: [
        "Replace SELECT * with specific column names to reduce data transfer",
        "Add composite index on (customer_id, date) for the orders table",
        "Consider adding LIMIT clause if you don't need all results",
        "Use table aliases for better readability",
        "Filter date conditions should use proper date functions if dealing with timestamps"
      ],
      optimized_query: `-- Optimized version with specific columns and proper indexing
SELECT 
    o.id,
    o.order_date,
    o.total_amount,
    c.customer_name,
    c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
WHERE o.order_date >= DATE('2024-01-01')
ORDER BY o.order_date DESC
LIMIT 100;

-- Recommended indexes:
-- CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date DESC);
-- CREATE INDEX idx_orders_date ON orders(order_date);`,
      tags: ["SELECT *", "Missing Index", "Date Filter", "JOIN Optimization", "LIMIT Recommended"]
    });
    
    setIsLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const exportToPDF = () => {
    toast.success("PDF export feature coming soon!");
  };

  if (isLoading) return <LoadingState module="sqldoctor" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
          🧾 SQLDoctor
        </h2>
        <p className="text-muted-foreground mb-6">
          Professional SQL query optimization and performance analysis
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
                  // Set default SQL query example
                  if (!sqlQuery) {
                    editor.setValue(`SELECT * FROM orders
JOIN customers ON orders.customer_id = customers.id
WHERE orders.date >= '2024-01-01'
ORDER BY orders.date DESC;`);
                    setSqlQuery(editor.getValue());
                  }
                }}
              />
            </div>
          </div>

          <Button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-neon-orange to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing SQL Query...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Analyze & Optimize SQL
              </>
            )}
          </Button>
        </div>
      </div>

      {analysisResult && (
        <div className="grid gap-4">
          <OutputCard
            title="Query Explanation"
            tag="Logic Breakdown"
            tagColor="bg-blue-500"
            content={
              <div className="space-y-3">
                <p className="text-sm leading-relaxed">{analysisResult.explanation}</p>
              </div>
            }
            delay={100}
          />

          <OutputCard
            title="Performance Issues & Tags"
            tag="Issues Found"
            tagColor="bg-yellow-500"
            content={
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 mb-3">
                  {analysisResult.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-medium text-red-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
            delay={200}
          />

          <OutputCard
            title="Optimization Suggestions"
            tag="Best Practices"
            tagColor="bg-neon-purple"
            content={
              <div className="space-y-2">
                {analysisResult.suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-neon-purple rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            }
            delay={300}
          />

          <OutputCard
            title="Optimized Query"
            tag="85% Faster"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div className="bg-black/30 rounded-lg overflow-hidden">
                  <Editor
                    height="300px"
                    language="sql"
                    value={analysisResult.optimized_query}
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
                    onClick={() => copyToClipboard(analysisResult.optimized_query)}
                    className="flex items-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Query
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={exportToPDF}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Export PDF
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
