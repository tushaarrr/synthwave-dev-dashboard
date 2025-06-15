
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const SQLDoctor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [sql, setSql] = useState("");

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
          Analyze and optimize your SQL queries for better performance and readability
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SQL Query</label>
            <textarea
              value={sql}
              onChange={(e) => setSql(e.target.value)}
              placeholder={`SELECT * FROM users 
WHERE age > 18 
AND created_at > '2023-01-01' 
ORDER BY created_at DESC;`}
              rows={8}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-orange transition-all resize-none font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-orange to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Analyze & Optimize Query
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Query Explanation"
            tag="Analysis"
            tagColor="bg-neon-blue"
            content={
              <div className="space-y-3">
                <p><strong>Operation:</strong> SELECT with filtering and sorting</p>
                <p><strong>Table:</strong> users</p>
                <p><strong>Filters:</strong> Age greater than 18, created after 2023</p>
                <p><strong>Sorting:</strong> By creation date, newest first</p>
                <p><strong>Estimated Rows:</strong> ~2,500 records</p>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Performance Issues"
            tag="Needs Optimization"
            tagColor="bg-yellow-500"
            content={
              <div className="space-y-3">
                <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <strong>SELECT *:</strong> Retrieving all columns is inefficient
                </div>
                <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <strong>Missing Index:</strong> No index on age + created_at combination
                </div>
                <div className="bg-orange-500/10 p-3 rounded-lg border border-orange-500/20">
                  <strong>Date Comparison:</strong> String comparison instead of proper date handling
                </div>
              </div>
            }
            delay={200}
          />
          <OutputCard
            title="Optimized Query"
            tag="Performance Boost"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div className="bg-black/30 p-4 rounded-lg">
                  <code className="text-xs font-mono text-neon-green whitespace-pre">
{`-- Optimized version with specific columns
SELECT id, name, email, created_at 
FROM users 
WHERE age > 18 
  AND created_at > DATE('2023-01-01')
ORDER BY created_at DESC
LIMIT 100;

-- Recommended index
CREATE INDEX idx_users_age_created 
ON users(age, created_at DESC);`}
                  </code>
                </div>
                <div className="text-sm space-y-1">
                  <p><strong>Improvements:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Selected only required columns</li>
                    <li>Added proper date handling</li>
                    <li>Included LIMIT for pagination</li>
                    <li>Suggested composite index</li>
                  </ul>
                </div>
              </div>
            }
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default SQLDoctor;
