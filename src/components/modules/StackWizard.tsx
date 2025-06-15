
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const StackWizard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsLoading(false);
    setHasResults(true);
  };

  if (isLoading) return <LoadingState module="stackwizard" />;

  return (
    <div className="space-y-6">
      <div className="glass-dark rounded-2xl p-6 animate-scale-in">
        <h2 className="text-2xl font-bold font-sora mb-2 bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          🔧 StackWizard+
        </h2>
        <p className="text-muted-foreground mb-6">
          Describe your project and get AI-powered tech stack recommendations with timeline
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <textarea
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="Describe your project idea, target audience, and key features..."
              rows={4}
              className="w-full glass rounded-xl px-4 py-3 bg-black/20 border-0 focus:ring-2 focus:ring-neon-blue transition-all resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300"
          >
            Generate Tech Stack
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Recommended Tech Stack"
            tag="AI Optimized"
            tagColor="bg-neon-blue"
            content={
              <div className="space-y-3">
                <div><strong>Frontend:</strong> React.js, TypeScript, Tailwind CSS</div>
                <div><strong>Backend:</strong> Node.js, Express.js, PostgreSQL</div>
                <div><strong>Infrastructure:</strong> Vercel, Supabase, Redis</div>
                <div><strong>Additional:</strong> Prisma ORM, NextAuth.js, Stripe</div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Development Timeline"
            tag="8 Weeks"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-2">
                <div className="flex justify-between"><span>Week 1-2:</span><span>Project Setup & UI</span></div>
                <div className="flex justify-between"><span>Week 3-4:</span><span>Core Features</span></div>
                <div className="flex justify-between"><span>Week 5-6:</span><span>Backend Integration</span></div>
                <div className="flex justify-between"><span>Week 7-8:</span><span>Testing & Deployment</span></div>
              </div>
            }
            delay={200}
          />
        </div>
      )}
    </div>
  );
};

export default StackWizard;
