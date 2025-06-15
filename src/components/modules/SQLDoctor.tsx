
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const SQLDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [sqlQuery, setSqlQuery] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2800));
    setIsLoading(false);
    setHasResults(true);
  };

  if (isLoading) return <LoadingState module="sqldoctor" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
          🧾 SQLDoctor
        </h2>
        <p className="text-muted-foreground mb-6">
          Analyze your SQL queries for performance issues and get optimized versions
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SQL Query</label>
            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              placeholder={`SELECT * FROM users 
WHERE created_at > '2023-01-01' 
AND status = 'active'
ORDER BY created_at DESC;`}
              rows={8}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-orange transition-all resize-none font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-orange to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Analyze & Optimize SQL
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Query Analysis"
            tag="Performance Issues"
            tagColor="bg-yellow-500"
            content={
              <div className="space-y-3">
                <div><strong>Execution Time:</strong> ~245ms (Slow)</div>
                <div><strong>Rows Scanned:</strong> 1.2M rows</div>
                <div><strong>Index Usage:</strong> Partial (created_at)</div>
                <div><strong>Issues Found:</strong> Missing composite index, SELECT *</div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Optimized Query"
            tag="85% Faster"
            tagColor="bg-neon-green"
            content={
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-xs font-mono text-neon-green block leading-relaxed">
                  {`SELECT id, name, email, created_at 
FROM users 
WHERE status = 'active' 
  AND created_at > '2023-01-01'
ORDER BY created_at DESC;

-- Recommended Index:
CREATE INDEX idx_users_status_created 
ON users(status, created_at DESC);`}
                </code>
              </div>
            }
            delay={200}
          />
        </div>
      )}
    </div>
  );
};

export default SQLDoctor;
