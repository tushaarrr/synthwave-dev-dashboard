
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Layers, Database, Cloud, Zap, Users, CheckCircle, Clock, DollarSign, Star, AlertCircle } from 'lucide-react';

interface Module {
  name: string;
  description: string;
  dependencies: string[];
  ai_used: boolean;
  estimated_hours?: number;
  complexity?: 'Low' | 'Medium' | 'High';
  priority?: 'Critical' | 'Important' | 'Nice-to-have';
}

interface BonusModule {
  name: string;
  description: string;
  estimated_hours?: number;
  cost_estimate?: string;
}

interface TechStackModuleProps {
  techStack: any;
  modules: Module[];
  bonusModules: BonusModule[];
}

const TechStackModule = ({ techStack, modules, bonusModules }: TechStackModuleProps) => {
  console.log('TechStackModule props:', { techStack, modules, bonusModules });

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend': return <Code className="w-4 h-4" />;
      case 'backend': return <Layers className="w-4 h-4" />;
      case 'database': return <Database className="w-4 h-4" />;
      case 'hosting': return <Cloud className="w-4 h-4" />;
      case 'ai_services': return <Zap className="w-4 h-4" />;
      case 'testing': return <CheckCircle className="w-4 h-4" />;
      case 'monitoring': return <AlertCircle className="w-4 h-4" />;
      case 'tools': return <Star className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Important': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Nice-to-have': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'High': return 'bg-red-500/20 text-red-300';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'Low': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const calculateTotalHours = () => {
    return modules.reduce((total, module) => total + (module.estimated_hours || 0), 0);
  };

  const calculateEstimatedCost = (hours: number) => {
    return Math.round(hours * 25); // $25/hour estimate
  };

  return (
    <Card className="glass-dark border-0 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Code className="w-6 h-6 text-neon-blue" />
          <div>
            <div className="text-2xl font-bold font-sora">Tech Stack & Modules</div>
            <div className="text-sm text-muted-foreground">Foundation and core components</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Tech Stack Overview */}
        {Object.keys(techStack).length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <Layers className="w-5 h-5 text-neon-purple" />
              Technology Stack
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(techStack).map(([category, technologies]) => (
                <div key={category} className="p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-neon-blue/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-3">
                    {getIconForCategory(category)}
                    <h5 className="font-semibold capitalize text-white">
                      {category.replace('_', ' ')}
                    </h5>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(technologies) ? technologies.map((tech: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {tech}
                      </Badge>
                    )) : (
                      <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {String(technologies)}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Summary */}
        {modules && modules.length > 0 && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20">
            <h4 className="text-lg font-semibold text-purple-300 mb-3">📊 Development Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">{modules.length}</div>
                <div className="text-xs text-muted-foreground">Core Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{calculateTotalHours()}h</div>
                <div className="text-xs text-muted-foreground">Total Hours</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">${calculateEstimatedCost(calculateTotalHours())}</div>
                <div className="text-xs text-muted-foreground">Est. Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{Math.ceil(calculateTotalHours() / 40)}</div>
                <div className="text-xs text-muted-foreground">Weeks (2-person)</div>
              </div>
            </div>
          </div>
        )}

        {/* Core Modules */}
        {modules && modules.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-neon-green" />
              Core Development Modules
            </h4>
            <div className="grid grid-cols-1 gap-6">
              {modules.map((module, index) => (
                <div key={index} className="p-6 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/20 hover:border-neon-blue/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h5 className="font-semibold text-lg text-white">{module.name}</h5>
                        {module.ai_used && (
                          <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
                            🤖 AI-Powered
                          </Badge>
                        )}
                      </div>
                      
                      {/* Priority and Complexity */}
                      <div className="flex gap-2 mb-3">
                        {module.priority && (
                          <Badge className={`text-xs ${getPriorityColor(module.priority)}`}>
                            {module.priority}
                          </Badge>
                        )}
                        {module.complexity && (
                          <Badge className={`text-xs ${getComplexityColor(module.complexity)}`}>
                            {module.complexity} Complexity
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Estimated Hours */}
                    {module.estimated_hours && (
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-blue-300">
                          <Clock className="w-3 h-3" />
                          {module.estimated_hours}h
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ~${calculateEstimatedCost(module.estimated_hours)} value
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  
                  {/* Dependencies */}
                  {module.dependencies && module.dependencies.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-orange-300">Dependencies:</div>
                      <div className="flex flex-wrap gap-1">
                        {module.dependencies.map((dep, depIndex) => (
                          <Badge key={depIndex} variant="outline" className="text-xs bg-orange-500/10 text-orange-200 border-orange-500/20">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bonus Modules */}
        {bonusModules && bonusModules.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-yellow" />
              Future Enhancement Modules
            </h4>
            <div className="text-sm text-muted-foreground mb-4">
              Optional features to add after MVP launch (Phase 2+)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bonusModules.map((bonus, index) => (
                <div key={index} className="p-4 rounded-lg bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-white">{bonus.name}</h5>
                    {bonus.cost_estimate && (
                      <div className="flex items-center gap-1 text-sm text-green-300">
                        <DollarSign className="w-3 h-3" />
                        {bonus.cost_estimate}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {bonus.description}
                  </p>
                  {bonus.estimated_hours && (
                    <div className="flex items-center gap-1 text-xs text-blue-300">
                      <Clock className="w-3 h-3" />
                      {bonus.estimated_hours} hours additional development
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Development Phases */}
        <div className="p-6 rounded-lg bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <h4 className="text-lg font-semibold text-green-300 mb-3">🚀 Bootstrap Strategy</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-300">1</div>
              <div>
                <div className="font-medium text-white">MVP Phase ($500-800)</div>
                <div className="text-muted-foreground">Core features only. Use free tiers, 2-person team, 12-week timeline.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-300">2</div>
              <div>
                <div className="font-medium text-white">Growth Phase ($2K-5K)</div>
                <div className="text-muted-foreground">Add bonus modules, improve UX, scale infrastructure, hire specialists.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-300">3</div>
              <div>
                <div className="font-medium text-white">Scale Phase ($10K+)</div>
                <div className="text-muted-foreground">Advanced features, team expansion, enterprise readiness, mobile apps.</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStackModule;
