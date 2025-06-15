
import { ReactNode } from "react";

interface OutputCardProps {
  title: string;
  content: ReactNode;
  tag?: string;
  tagColor?: string;
  delay?: number;
}

const OutputCard = ({ title, content, tag, tagColor = "bg-neon-blue", delay = 0 }: OutputCardProps) => {
  return (
    <div 
      className="glass-dark rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold font-sora">{title}</h3>
        {tag && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${tagColor} text-black animate-glow`}>
            {tag}
          </span>
        )}
      </div>
      <div className="text-muted-foreground">
        {content}
      </div>
    </div>
  );
};

export default OutputCard;
