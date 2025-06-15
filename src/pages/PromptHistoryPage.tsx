
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { usePromptRefiner } from "@/hooks/usePromptRefiner";
import { Copy, Clock, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PromptHistoryItem {
  id: string;
  original_prompt: string;
  refined_prompt: string;
  score: number;
  tags: string[];
  created_at: string;
}

const PromptHistoryPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { getHistory } = usePromptRefiner();
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Error loading history:', error);
      toast({
        title: "Error",
        description: "Failed to load prompt history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-orange-400';
    if (score >= 4) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Well-structured': return 'bg-green-500/20 text-green-300';
      case 'Too brief': return 'bg-red-500/20 text-red-300';
      case 'Missing context': return 'bg-orange-500/20 text-orange-300';
      case 'Too generic': return 'bg-yellow-500/20 text-yellow-300';
      case 'Unclear output': return 'bg-red-400/20 text-red-300';
      case 'Verbose': return 'bg-blue-500/20 text-blue-300';
      default: return 'bg-orange-500/20 text-orange-300';
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-400"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-orange-200">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-sora gradient-text mb-2">
            Prompt History
          </h1>
          <p className="text-orange-200/70">
            Review your previously refined prompts and analysis
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-400"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="glass-dark rounded-2xl p-12 text-center">
            <Star className="w-16 h-16 mx-auto mb-4 text-orange-200/40" />
            <h3 className="text-xl font-semibold mb-2">No prompt history yet</h3>
            <p className="text-orange-200/70">
              Start refining prompts to see your analysis history here
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item) => (
              <div key={item.id} className="glass-dark rounded-2xl p-6 border border-orange-200/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                      {item.score}/10
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-orange-200/60">
                        <Clock className="w-4 h-4" />
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-sm text-orange-200/70 mb-2">Original Prompt</h4>
                    <div className="bg-zinc-800/50 p-4 rounded-lg mb-3">
                      <p className="text-sm leading-relaxed">{item.original_prompt}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.original_prompt)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-orange-600/20 hover:bg-orange-600/30 rounded-lg transition-colors text-sm"
                    >
                      <Copy className="w-3 h-3" />
                      Copy Original
                    </button>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-orange-200/70 mb-2">Refined Prompt</h4>
                    <div className="bg-zinc-800/50 p-4 rounded-lg mb-3">
                      <p className="text-sm leading-relaxed font-mono">{item.refined_prompt}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.refined_prompt)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-orange-400/20 hover:bg-orange-400/30 rounded-lg transition-colors text-sm"
                    >
                      <Copy className="w-3 h-3" />
                      Copy Refined
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptHistoryPage;
