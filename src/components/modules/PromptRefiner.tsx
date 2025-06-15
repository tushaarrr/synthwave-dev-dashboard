
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const PromptRefiner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsLoading(false);
    setHasResults(true);
  };

  if (isLoading) return <LoadingState module="promptrefiner" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
          ✍️ PromptRefiner
        </h2>
        <p className="text-muted-foreground mb-6">
          Paste your AI prompt and get an enhanced version with quality rating
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a function that..."
              rows={6}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-purple transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Refine Prompt
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Prompt Quality Score"
            tag="B+ Grade"
            tagColor="bg-yellow-500"
            content={
              <div className="space-y-3">
                <div className="flex justify-between"><span>Clarity:</span><span className="text-neon-green">8/10</span></div>
                <div className="flex justify-between"><span>Specificity:</span><span className="text-yellow-500">6/10</span></div>
                <div className="flex justify-between"><span>Context:</span><span className="text-neon-blue">7/10</span></div>
                <div className="flex justify-between"><span>Overall:</span><span className="text-neon-purple font-bold">7.2/10</span></div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Enhanced Prompt"
            tag="AI Improved"
            tagColor="bg-neon-green"
            content={
              <div className="bg-black/30 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  "Create a TypeScript function called `calculateTotalPrice` that takes an array of product objects (each with `price: number` and `quantity: number` properties) and returns the total cost including a 10% tax. Include input validation for edge cases like empty arrays and negative values. Provide comprehensive JSDoc comments and example usage."
                </p>
              </div>
            }
            delay={200}
          />
        </div>
      )}
    </div>
  );
};

export default PromptRefiner;
