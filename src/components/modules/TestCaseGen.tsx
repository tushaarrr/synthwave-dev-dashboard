
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
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
          🧪 TestCaseGen
        </h2>
        <p className="text-muted-foreground mb-6">
          Generate comprehensive test cases with edge case coverage for your code
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Testing Framework</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full glass rounded-xl px-4 py-3 bg-white/5 border-0 focus:ring-2 focus:ring-neon-pink transition-all"
            >
              <option value="jest">Jest (JavaScript/TypeScript)</option>
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
            className="w-full bg-gradient-to-r from-neon-pink to-neon-purple rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Generate Test Cases
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Test Coverage Analysis"
            tag="95% Coverage"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Statements:</span>
                  <span className="text-neon-green">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Branches:</span>
                  <span className="text-neon-green">95%</span>
                </div>
                <div className="flex justify-between">
                  <span>Functions:</span>
                  <span className="text-neon-green">100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Lines:</span>
                  <span className="text-neon-green">100%</span>
                </div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Generated Test Suite"
            tag="12 Test Cases"
            tagColor="bg-neon-blue"
            content={
              <div className="bg-black/30 p-4 rounded-lg">
                <code className="text-xs font-mono text-neon-blue whitespace-pre">
{`describe('calculateDiscount', () => {
  // Happy path tests
  test('should calculate discount correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(80);
    expect(calculateDiscount(50, 10)).toBe(45);
  });

  // Edge cases
  test('should handle zero discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  test('should handle 100% discount', () => {
    expect(calculateDiscount(100, 100)).toBe(0);
  });

  // Error cases
  test('should throw error for invalid price', () => {
    expect(() => calculateDiscount(-10, 20))
      .toThrow('Invalid input');
    expect(() => calculateDiscount(0, 20))
      .toThrow('Invalid input');
  });

  test('should throw error for invalid percentage', () => {
    expect(() => calculateDiscount(100, -5))
      .toThrow('Invalid input');
    expect(() => calculateDiscount(100, 150))
      .toThrow('Invalid input');
  });
});`}
                </code>
              </div>
            }
            delay={200}
          />
          <OutputCard
            title="Edge Cases Covered"
            tag="Comprehensive"
            tagColor="bg-neon-orange"
            content={
              <ul className="space-y-2 list-disc list-inside">
                <li>Boundary values (0%, 100% discount)</li>
                <li>Negative price inputs</li>
                <li>Invalid percentage ranges</li>
                <li>Floating point precision handling</li>
                <li>Large number inputs</li>
                <li>Type validation tests</li>
                <li>Error message verification</li>
                <li>Performance stress tests</li>
              </ul>
            }
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default TestCaseGen;
