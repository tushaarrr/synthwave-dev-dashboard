
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const CodeLens = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setHasResults(true);
  };

  if (isLoading) return <LoadingState module="codelens" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
          🧠 CodeLens
        </h2>
        <p className="text-muted-foreground mb-6">
          Analyze your code for complexity, performance bottlenecks, and optimization opportunities
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Paste Your Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}
              rows={12}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-green transition-all resize-none font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-green to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Analyze Code Complexity
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Complexity Analysis"
            tag="High Complexity"
            tagColor="bg-red-500"
            content={
              <div className="space-y-3">
                <div><strong>Time Complexity:</strong> O(n²) - Quadratic</div>
                <div><strong>Space Complexity:</strong> O(1) - Constant</div>
                <div><strong>Cyclomatic Complexity:</strong> 4 (Moderate)</div>
                <div><strong>Lines of Code:</strong> 8</div>
                <div><strong>Critical Issues:</strong> 2 performance bottlenecks detected</div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Performance Bottlenecks"
            tag="Critical"
            tagColor="bg-red-500"
            content={
              <div className="space-y-3">
                <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <strong>Line 2-3:</strong> Nested loops causing O(n²) complexity
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                  <strong>Line 4:</strong> Repeated array access could be optimized
                </div>
              </div>
            }
            delay={200}
          />
          <OutputCard
            title="Optimization Suggestions"
            tag="AI Recommended"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div className="bg-black/30 p-4 rounded-lg">
                  <p className="text-sm mb-2"><strong>Recommended:</strong> Use Array.sort() or merge sort</p>
                  <code className="text-xs font-mono text-neon-green">
                    {`// O(n log n) solution
const optimizedSort = arr => [...arr].sort((a, b) => a - b);`}
                  </code>
                </div>
                <ul className="space-y-1 list-disc list-inside text-sm">
                  <li>Replace bubble sort with more efficient algorithm</li>
                  <li>Consider using built-in sorting methods</li>
                  <li>Add input validation for edge cases</li>
                </ul>
              </div>
            }
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default CodeLens;
