
import { useState } from "react";
import LoadingState from "../LoadingState";
import OutputCard from "../OutputCard";

const StackWizard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    requirements: "",
  });

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
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              value={formData.projectName}
              onChange={(e) => setFormData({...formData, projectName: e.target.value})}
              placeholder="My Awesome App"
              className="w-full glass rounded-xl px-4 py-3 bg-white/5 border-0 focus:ring-2 focus:ring-neon-blue transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Project Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="A social media platform for developers..."
              rows={4}
              className="w-full glass rounded-xl px-4 py-3 bg-white/5 border-0 focus:ring-2 focus:ring-neon-blue transition-all resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Specific Requirements</label>
            <input
              type="text"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              placeholder="Real-time chat, mobile responsive, scalable..."
              className="w-full glass rounded-xl px-4 py-3 bg-white/5 border-0 focus:ring-2 focus:ring-neon-blue transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300 shimmer-bg animate-shimmer"
          >
            Generate Tech Stack & Timeline
          </button>
        </form>
      </div>

      {hasResults && (
        <div className="grid gap-4">
          <OutputCard
            title="Recommended Tech Stack"
            tag="AI Optimized"
            tagColor="bg-neon-green"
            content={
              <div className="space-y-3">
                <div><strong>Frontend:</strong> React 18, TypeScript, Tailwind CSS</div>
                <div><strong>Backend:</strong> Node.js, Express, PostgreSQL</div>
                <div><strong>Deployment:</strong> Vercel, Railway</div>
                <div><strong>Additional:</strong> Socket.io, Redis, JWT</div>
              </div>
            }
            delay={100}
          />
          <OutputCard
            title="Development Timeline"
            tag="8 Weeks"
            tagColor="bg-neon-orange"
            content={
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Week 1-2: Setup & Auth</span>
                  <span className="text-neon-blue">25%</span>
                </div>
                <div className="flex justify-between">
                  <span>Week 3-4: Core Features</span>
                  <span className="text-neon-blue">50%</span>
                </div>
                <div className="flex justify-between">
                  <span>Week 5-6: Real-time Chat</span>
                  <span className="text-neon-blue">75%</span>
                </div>
                <div className="flex justify-between">
                  <span>Week 7-8: Testing & Deploy</span>
                  <span className="text-neon-green">100%</span>
                </div>
              </div>
            }
            delay={200}
          />
          <OutputCard
            title="AI Suggestions"
            tag="Performance Tips"
            tagColor="bg-neon-purple"
            content={
              <ul className="space-y-1 list-disc list-inside">
                <li>Use React.memo for chat message components</li>
                <li>Implement virtual scrolling for message lists</li>
                <li>Add Redis caching for frequently accessed data</li>
                <li>Consider PWA features for mobile experience</li>
              </ul>
            }
            delay={300}
          />
        </div>
      )}
    </div>
  );
};

export default StackWizard;
