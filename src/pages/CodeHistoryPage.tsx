
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, RotateCcw, FileDown, Calendar, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Editor from '@monaco-editor/react';

interface CodeHistory {
  id: string;
  language: string;
  original_code: string;
  complexity: string | null;
  bottlenecks: string[] | null;
  suggestions: string | null;
  optimized_code: string | null;
  explanation: string | null;
  created_at: string;
}

const CodeHistoryPage = () => {
  const [history, setHistory] = useState<CodeHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchHistory();
  }, [user, navigate]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('code_lens_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast({
        title: "Failed to load history",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: `${type} copied`,
      description: `${type} has been copied to clipboard`,
    });
  };

  const reAnalyze = (code: string, language: string) => {
    navigate('/', { state: { code, language, reanalyze: true } });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            size="sm"
            className="glass"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
            Code Analysis History
          </h1>
        </div>

        {history.length === 0 ? (
          <div className="glass-dark rounded-2xl p-12 text-center">
            <Code className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No analysis history yet</h2>
            <p className="text-muted-foreground mb-6">
              Start analyzing code to build your history
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-neon-green to-neon-blue"
            >
              Analyze Code
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((item, index) => (
              <div key={item.id} className="glass-dark rounded-2xl p-6 animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.language.toUpperCase()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Calendar className="w-4 h-4" />
                      {formatDate(item.created_at)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => reAnalyze(item.original_code, item.language)}
                      variant="outline"
                      className="glass"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Re-analyze
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(item.original_code, "Original code")}
                      variant="outline"
                      className="glass"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-2 text-neon-blue">Original Code</h3>
                    <div className="rounded-lg overflow-hidden border border-white/10">
                      <Editor
                        height="200px"
                        language={item.language}
                        value={item.original_code}
                        theme="vs-dark"
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          lineNumbers: "on",
                          fontFamily: "'JetBrains Mono', monospace",
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {item.complexity && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-green">Complexity</h4>
                        <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                          <p className="text-sm">{item.complexity}</p>
                        </div>
                      </div>
                    )}

                    {item.bottlenecks && item.bottlenecks.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-red-400">Bottlenecks</h4>
                        <div className="space-y-2">
                          {item.bottlenecks.slice(0, 2).map((bottleneck, idx) => (
                            <div key={idx} className="bg-red-500/10 p-2 rounded border border-red-500/20">
                              <p className="text-xs">{bottleneck}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {expandedCard === item.id && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                    {item.optimized_code && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-purple">Optimized Code</h4>
                        <div className="rounded-lg overflow-hidden border border-purple-500/20">
                          <Editor
                            height="200px"
                            language={item.language}
                            value={item.optimized_code}
                            theme="vs-dark"
                            options={{
                              readOnly: true,
                              minimap: { enabled: false },
                              fontSize: 12,
                              lineNumbers: "on",
                              fontFamily: "'JetBrains Mono', monospace",
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {item.explanation && (
                      <div>
                        <h4 className="text-sm font-semibold mb-2 text-neon-orange">AI Explanation</h4>
                        <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20">
                          <p className="text-sm leading-relaxed">{item.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 flex justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedCard(expandedCard === item.id ? null : item.id)}
                    className="text-neon-blue hover:bg-blue-500/10"
                  >
                    {expandedCard === item.id ? 'Show Less' : 'Show More'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeHistoryPage;
