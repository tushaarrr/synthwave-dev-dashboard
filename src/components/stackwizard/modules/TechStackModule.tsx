
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Database, Globe, Server, Palette, Brain, Plus } from 'lucide-react';

interface Module {
  name: string;
  description: string;
  dependencies: string[];
  ai_used: boolean;
}

interface BonusModule {
  name: string;
  description: string;
}

interface TechStackModuleProps {
  techStack: any;
  modules?: Module[];
  bonusModules?: BonusModule[];
}

const TechStackModule = ({ techStack, modules = [], bonusModules = [] }: TechStackModuleProps) => {
  // Handle both string and object formats for backward compatibility
  const parseTechStack = (stack: any) => {
    if (typeof stack === 'string') {
      // Legacy string parsing
      const categories = {
        Frontend: { icon: Palette, color: 'bg-orange-500', items: [] as string[] },
        Backend: { icon: Server, color: 'bg-coral-500', items: [] as string[] },
        Database: { icon: Database, color: 'bg-yellow-500', items: [] as string[] },
        DevOps: { icon: Globe, color: 'bg-green-500', items: [] as string[] },
        Other: { icon: Zap, color: 'bg-pink-500', items: [] as string[] }
      };

      const lines = stack.split('\n').filter((line: string) => line.trim());
      let currentCategory = 'Other';

      lines.forEach((line: string) => {
        const cleanLine = line.replace(/[#*-]/g, '').trim();
        if (!cleanLine) return;

        if (cleanLine.toLowerCase().includes('frontend') || cleanLine.toLowerCase().includes('ui')) {
          currentCategory = 'Frontend';
        } else if (cleanLine.toLowerCase().includes('backend') || cleanLine.toLowerCase().includes('server') || cleanLine.toLowerCase().includes('api')) {
          currentCategory = 'Backend';
        } else if (cleanLine.toLowerCase().includes('database') || cleanLine.toLowerCase().includes('db') || cleanLine.toLowerCase().includes('storage')) {
          currentCategory = 'Database';
        } else if (cleanLine.toLowerCase().includes('deploy') || cleanLine.toLowerCase().includes('hosting') || cleanLine.toLowerCase().includes('devops')) {
          currentCategory = 'DevOps';
        } else if (!Object.keys(categories).some(cat => cleanLine.toLowerCase().includes(cat.toLowerCase()))) {
          if (cleanLine.includes(':')) {
            const [tech, desc] = cleanLine.split(':');
            categories[currentCategory as keyof typeof categories].items.push(tech.trim());
          } else if (cleanLine.length > 3) {
            categories[currentCategory as keyof typeof categories].items.push(cleanLine);
          }
        }
      });

      return categories;
    } else if (typeof stack === 'object' && stack !== null) {
      // New object format
      return {
        Frontend: { 
          icon: Palette, 
          color: 'bg-orange-500', 
          items: stack.frontend || [] 
        },
        Backend: { 
          icon: Server, 
          color: 'bg-coral-500', 
          items: stack.backend || [] 
        },
        Database: { 
          icon: Database, 
          color: 'bg-yellow-500', 
          items: stack.database || [] 
        },
        DevOps: { 
          icon: Globe, 
          color: 'bg-green-500', 
          items: [...(stack.hosting || []), ...(stack.analytics || [])] 
        },
        AI: {
          icon: Brain,
          color: 'bg-purple-500',
          items: stack.ai_services || []
        },
        Payments: {
          icon: Zap,
          color: 'bg-pink-500',
          items: stack.payments || []
        }
      };
    }

    return {};
  };

  const techCategories = parseTechStack(techStack);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-neon-orange" />
        <h3 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-orange to-neon-coral bg-clip-text text-transparent">
          Technology Stack
        </h3>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(techCategories).map(([category, data], index) => {
          const IconComponent = data.icon;
          if (!data.items || data.items.length === 0) return null;
          
          return (
            <Card 
              key={category} 
              className="glass-dark border-0 animate-fade-in hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <IconComponent className="w-4 h-4" />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {data.items.slice(0, 6).map((item: string, itemIndex: number) => (
                    <Badge 
                      key={itemIndex}
                      variant="secondary"
                      className="text-xs bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Core Modules Section */}
      {modules.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-coral" />
            Core Modules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modules.map((module, index) => (
              <Card 
                key={index}
                className="glass-dark border-0 animate-fade-in hover:scale-[1.02] transition-all duration-300"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    {module.ai_used && <Brain className="w-4 h-4 text-purple-400" />}
                    <Zap className="w-4 h-4" />
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                  {module.dependencies.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-neon-coral">Dependencies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {module.dependencies.map((dep, depIndex) => (
                          <Badge 
                            key={depIndex}
                            variant="outline"
                            className="text-xs border-coral-500/30"
                          >
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bonus Modules Section */}
      {bonusModules.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Plus className="w-5 h-5 text-neon-green" />
            Bonus Modules
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusModules.map((module, index) => (
              <Card 
                key={index}
                className="glass-dark border-0 animate-fade-in hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-neon-green"
                style={{ animationDelay: `${(index + 10) * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Plus className="w-4 h-4 text-green-400" />
                    {module.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackModule;
