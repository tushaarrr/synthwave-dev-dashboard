
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, Code, Database, Server, Palette, Globe, Shield, Bot } from 'lucide-react';

interface Module {
  name: string;
  description: string;
  detailed_description?: string;
  technical_details?: string;
  dependencies?: string[];
  ai_used?: boolean;
  complexity?: string;
  estimated_hours?: string;
  key_features?: string[];
  acceptance_criteria?: string[];
}

interface BonusModule {
  name: string;
  description: string;
}

interface TechStackModuleProps {
  techStack: any;
  modules: Module[];
  bonusModules: BonusModule[];
}

const TechStackModule = ({ techStack, modules, bonusModules }: TechStackModuleProps) => {
  console.log('TechStackModule received:', { techStack, modules: modules?.length, bonusModules: bonusModules?.length });

  const parseTechStack = (stackData: any) => {
    const categories = {
      Frontend: { icon: Palette, color: 'text-blue-400', items: [] as string[] },
      Backend: { icon: Server, color: 'text-green-400', items: [] as string[] },
      Database: { icon: Database, color: 'text-purple-400', items: [] as string[] },
      Hosting: { icon: Globe, color: 'text-orange-400', items: [] as string[] },
      'AI Services': { icon: Bot, color: 'text-pink-400', items: [] as string[] },
      Development: { icon: Code, color: 'text-cyan-400', items: [] as string[] }
    };

    if (typeof stackData === 'object' && stackData !== null) {
      if (stackData.frontend) categories.Frontend.items = stackData.frontend;
      if (stackData.backend) categories.Backend.items = stackData.backend;
      if (stackData.database) categories.Database.items = stackData.database;
      if (stackData.hosting) categories.Hosting.items = stackData.hosting;
      if (stackData.ai_services) categories['AI Services'].items = stackData.ai_services;
      if (stackData.development) categories.Development.items = stackData.development;
      if (stackData.payments) categories.Backend.items = [...(categories.Backend.items || []), ...stackData.payments];
      if (stackData.analytics) categories.Backend.items = [...(categories.Backend.items || []), ...stackData.analytics];
    }

    return categories;
  };

  const techCategories = parseTechStack(techStack);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-neon-blue" />
        <h3 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          Technology Stack & Core Modules
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
                  <IconComponent className={`w-4 h-4 ${data.color}`} />
                  {category}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2">
                  {data.items.slice(0, 6).map((item, itemIndex) => (
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

      {/* Core Modules */}
      {modules && modules.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Code className="w-5 h-5 text-neon-green" />
            Core Modules ({modules.length})
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <Card 
                key={index}
                className="glass-dark border-0 animate-fade-in"
                style={{ animationDelay: `${(index + 6) * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-neon-coral" />
                      <span className="text-lg font-bold">{module.name}</span>
                    </div>
                    {module.ai_used && (
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        🤖 AI-Powered
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {module.detailed_description || module.description}
                  </p>

                  {module.technical_details && (
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <h5 className="text-sm font-medium text-blue-300 mb-2">Technical Details</h5>
                      <p className="text-xs text-muted-foreground">{module.technical_details}</p>
                    </div>
                  )}

                  {module.key_features && module.key_features.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-neon-green mb-2">Key Features</h5>
                      <div className="flex flex-wrap gap-1">
                        {module.key_features.map((feature, fIndex) => (
                          <Badge key={fIndex} variant="outline" className="text-xs bg-green-500/20 text-green-300">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {module.complexity && (
                      <Badge variant="secondary" className="text-xs">
                        {module.complexity} Complexity
                      </Badge>
                    )}
                    {module.estimated_hours && (
                      <Badge variant="outline" className="text-xs">
                        {module.estimated_hours}
                      </Badge>
                    )}
                  </div>

                  {module.dependencies && module.dependencies.length > 0 && (
                    <div className="text-xs text-muted-foreground">
                      <span className="font-medium">Dependencies:</span> {module.dependencies.join(', ')}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bonus Modules */}
      {bonusModules && bonusModules.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-yellow" />
            Bonus Modules ({bonusModules.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bonusModules.map((module, index) => (
              <Card 
                key={index}
                className="glass-dark border-0 animate-fade-in border-l-4 border-l-neon-yellow"
                style={{ animationDelay: `${(index + 10) * 100}ms` }}
              >
                <CardContent className="p-4">
                  <h5 className="font-semibold text-neon-yellow mb-2">{module.name}</h5>
                  <p className="text-sm text-muted-foreground">{module.description}</p>
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
