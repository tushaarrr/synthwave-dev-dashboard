
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const TestCaseGen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [code, setCode] = useState("");
  const [framework, setFramework] = useState("jest");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3200));
    setIsLoading(false);
    setHasResults(true);
  };

  if (isLoading) return <LoadingState module="testcasegen" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-pink to-neon-blue bg-clip-text text-transparent">
          🧪 TestCaseGen
        </h2>
        <p className="text-muted-foreground mb-6">
          Generate comprehensive test cases for your code with edge case coverage
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Testing Framework</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-pink transition-all"
            >
              <option value="jest">Jest (JavaScript)</option>
              <option value="pytest">Pytest (Python)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Your Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`function calculateDiscount(price, percentage) {
  if (price <= 0 || percentage < 0 || percentage > 100) {
    throw new Error('Invalid input');
  }
  return price * (1 - percentage / 100);
}`}
              rows={10}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-pink transition-all resize-none font-mono text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Generate Test Cases
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Test Coverage Analysis"
            tag="92% Coverage"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div><strong>Total Test Cases:</strong> 8 generated</div>
                <div><strong>Edge Cases:</strong> 5 covered</div>
                <div><strong>Happy Path:</strong> 3 scenarios</div>
                <div><strong>Error Handling:</strong> Comprehensive</div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Generated Test Suite"
            tag="Jest Ready"
            tagColor="bg-neon-blue"
            content={
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-xs font-mono text-neon-blue block leading-relaxed">
                  {`describe('calculateDiscount', () => {
  // Happy path tests
  test('calculates 10% discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });
  
  // Edge cases
  test('throws error for negative price', () => {
    expect(() => calculateDiscount(-10, 20))
      .toThrow('Invalid input');
  });
  
  test('handles 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });
});`}
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

export default TestCaseGen;
