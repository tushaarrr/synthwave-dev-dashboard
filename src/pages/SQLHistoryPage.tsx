
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Copy, RefreshCw, Calendar, Database, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface SQLHistoryEntry {
  id: string;
  original_query: string;
  explanation: string;
  suggestions: string[];
  optimized_query: string;
  tags: string[];
  created_at: string;
}

const SQLHistoryPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState<SQLHistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('sql_analysis_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching SQL history:', error);
      toast.error('Failed to load SQL history');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const reAnalyze = (query: string) => {
    navigate('/', { state: { sqlQuery: query, activeModule: 'sqldoctor' } });
  };

  const truncateQuery = (query: string, maxLength = 100) => {
    return query.length > maxLength ? query.substring(0, maxLength) + '...' : query;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your SQL history</p>
          <Button onClick={() => navigate('/login')}>Go to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DevSynth
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
              SQL Analysis History
            </h1>
            <p className="text-muted-foreground">Review your past SQL optimizations and insights</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-neon-orange" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No SQL Analysis History</h2>
            <p className="text-muted-foreground mb-6">Start analyzing SQL queries to see them here</p>
            <Button onClick={() => navigate('/')}>Analyze SQL Queries</Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {history.map((entry) => (
              <Card key={entry.id} className="glass-dark border-white/10">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-sora text-white mb-2">
                        SQL Query Analysis
                      </CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(entry.created_at), 'MMM dd, yyyy • hh:mm a')}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => reAnalyze(entry.original_query)}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Re-analyze
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(entry.original_query)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Query Preview */}
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-neon-orange">Original Query</h4>
                    <div className="bg-black/30 rounded-lg p-3 font-mono text-sm">
                      {truncateQuery(entry.original_query)}
                    </div>
                  </div>

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-neon-purple flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Performance Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {entry.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs text-red-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation */}
                  {entry.explanation && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-neon-blue">Explanation</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.explanation}
                      </p>
                    </div>
                  )}

                  {/* Suggestions Preview */}
                  {entry.suggestions && entry.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-neon-green">Key Suggestions</h4>
                      <div className="space-y-1">
                        {entry.suggestions.slice(0, 2).map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                            {suggestion}
                          </div>
                        ))}
                        {entry.suggestions.length > 2 && (
                          <p className="text-xs text-muted-foreground/70 italic">
                            +{entry.suggestions.length - 2} more suggestions
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SQLHistoryPage;
