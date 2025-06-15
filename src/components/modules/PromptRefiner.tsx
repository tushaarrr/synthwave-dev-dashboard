
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
          Paste your AI prompt and get professional refinements with quality ratings
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Write a function that sorts an array..."
              rows={6}
              className="w-full glass rounded-xl px-4 py-3 bg-white/5 border-0 focus:ring-2 focus:ring-neon-purple transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Refine & Rate Prompt
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Prompt Quality Rating"
            tag="B+ Grade"
            tagColor="bg-neon-orange"
            content={
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span>Clarity:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-blue h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-neon-blue">80%</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Specificity:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-green h-2 rounded-full w-3/5"></div>
                  </div>
                  <span className="text-neon-green">60%</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Context:</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div className="bg-neon-purple h-2 rounded-full w-4/5"></div>
                  </div>
                  <span className="text-neon-purple">85%</span>
                </div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="AI-Enhanced Prompt"
            tag="Optimized"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <p className="font-mono text-sm bg-black/30 p-4 rounded-lg">
                  "Create a TypeScript function named 'sortArray' that efficiently sorts an array of numbers in ascending order. 
                  Include proper type annotations, handle edge cases (empty arrays, single elements), 
                  and provide JSDoc comments explaining the algorithm used. 
                  Return both the sorted array and the time complexity as an object."
                </p>
              </div>
            }
            delay={200}
          />
          <OutputCard
            title="Improvement Suggestions"
            tag="AI Tips"
            tagColor="bg-neon-blue"
            content={
              <ul className="space-y-2 list-disc list-inside">
                <li>Add specific programming language requirement</li>
                <li>Include expected input/output examples</li>
                <li>Specify performance requirements or constraints</li>
                <li>Request error handling and edge case considerations</li>
                <li>Ask for code documentation and comments</li>
              </ul>
            }
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default PromptRefiner;
