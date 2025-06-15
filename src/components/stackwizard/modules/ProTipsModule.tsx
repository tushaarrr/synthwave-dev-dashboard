
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, ExternalLink, Lightbulb, Shield, Wrench, Zap, TrendingUp, Database } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProTipsModuleProps {
  suggestions: string;
}

const ProTipsModule = ({ suggestions }: ProTipsModuleProps) => {
  const [expandedTips, setExpandedTips] = useState<Set<number>>(new Set());

  const proTips = [
    {
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500',
      category: 'Architecture',
      title: 'Start with microservices mindset',
      summary: 'Design loosely coupled components from day one',
      details: 'Even in a monolith, structure your code as if each module could become a separate service. This makes scaling easier later and improves code organization.',
      actionable: 'Use dependency injection, event-driven patterns, and clear API boundaries between modules.'
    },
    {
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      category: 'Security',
      title: 'Implement security layers early',
      summary: 'Security should not be an afterthought',
      details: 'Set up authentication, authorization, input validation, and rate limiting in your MVP. Security debt is expensive to fix later.',
      actionable: 'Use tools like Auth0/Supabase Auth, implement CORS properly, sanitize inputs, and add API rate limiting.'
    },
    {
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      category: 'Database',
      title: 'Plan for data growth',
      summary: 'Design your database schema with scaling in mind',
      details: 'Consider indexing strategies, normalization vs denormalization trade-offs, and potential sharding needs even if you start small.',
      actionable: 'Add proper indexes, use UUIDs for distributed systems, implement soft deletes, and plan backup strategies.'
    },
    {
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      category: 'Performance',
      title: 'Monitor from day one',
      summary: 'You cannot optimize what you cannot measure',
      details: 'Implement logging, metrics, and error tracking before you have performance issues. Understanding your baseline is crucial.',
      actionable: 'Set up application monitoring (DataDog/New Relic), error tracking (Sentry), and custom metrics for business KPIs.'
    },
    {
      icon: Wrench,
      color: 'from-blue-500 to-cyan-500',
      category: 'DevOps',
      title: 'Automate deployment pipeline',
      summary: 'Manual deployments are error-prone and slow',
      details: 'Set up CI/CD early with automated testing, code quality checks, and deployment to staging/production environments.',
      actionable: 'Use GitHub Actions, implement automated testing, set up staging environment, and use infrastructure as code.'
    },
    {
      icon: Zap,
      color: 'from-orange-500 to-red-500',
      category: 'Development',
      title: 'Embrace fail-fast principles',
      summary: 'Fail quickly and learn faster',
      details: 'Build MVPs, gather user feedback early, and iterate rapidly. Perfect is the enemy of good in early-stage development.',
      actionable: 'Release weekly, A/B test features, collect user analytics, and maintain a rapid feedback loop with stakeholders.'
    }
  ];

  // Parse additional suggestions from the AI
  const aiSuggestions = suggestions.split('\n').filter(line => line.trim().length > 10).slice(0, 3);

  const copyTip = async (tip: string) => {
    try {
      await navigator.clipboard.writeText(tip);
      toast({
        title: "Copied!",
        description: "Tip copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy tip",
        variant: "destructive",
      });
    }
  };

  const toggleTipExpansion = (index: number) => {
    const newExpanded = new Set(expandedTips);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedTips(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="w-6 h-6 text-neon-orange" />
        <h2 className="text-2xl font-bold font-sora">Pro Tips & Best Practices</h2>
        <Badge variant="secondary" className="bg-neon-orange/20 text-neon-orange">
          {proTips.length + aiSuggestions.length} Tips
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pro Tips */}
        {proTips.map((tip, index) => {
          const IconComponent = tip.icon;
          const isExpanded = expandedTips.has(index);

          return (
            <Collapsible key={index}>
              <Card className="glass-dark border-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in group">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tip.color} flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className="text-xs bg-white/10">
                          {tip.category}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{tip.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3">{tip.summary}</p>
                      
                      <div className="flex items-center gap-2">
                        <CollapsibleTrigger 
                          onClick={() => toggleTipExpansion(index)}
                          className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition-colors"
                        >
                          {isExpanded ? 'Show Less' : 'Learn More'}
                        </CollapsibleTrigger>
                        <button
                          onClick={() => copyTip(`${tip.title}: ${tip.details}`)}
                          className="text-xs bg-neon-blue/20 hover:bg-neon-blue/30 px-2 py-1 rounded transition-colors flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" />
                          Copy
                        </button>
                      </div>

                      <CollapsibleContent className="mt-3">
                        <div className="space-y-2 p-3 rounded bg-white/5 border border-white/10">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {tip.details}
                          </p>
                          <div className="pt-2 border-t border-white/10">
                            <p className="text-xs font-medium text-green-400 mb-1">Action Items:</p>
                            <p className="text-xs text-green-300/80 leading-relaxed">
                              {tip.actionable}
                            </p>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Collapsible>
          );
        })}

        {/* AI-Generated Suggestions */}
        {aiSuggestions.map((suggestion, index) => (
          <Card 
            key={`ai-${index}`}
            className="glass-dark border-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in border-l-4 border-l-neon-purple"
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                      AI Insight
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion.replace(/[#*-]/g, '').trim()}
                  </p>
                  <button
                    onClick={() => copyTip(suggestion)}
                    className="mt-2 text-xs bg-purple-500/20 hover:bg-purple-500/30 px-2 py-1 rounded transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Insight
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProTipsModule;
