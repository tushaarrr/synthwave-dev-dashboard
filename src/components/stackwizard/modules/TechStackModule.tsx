
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Server, Database, Globe, Zap, Monitor, Cloud, Wrench } from 'lucide-react';

interface TechStackModuleProps {
  techStack: string;
}

const TechStackModule = ({ techStack }: TechStackModuleProps) => {
  const categories = {
    Frontend: { icon: Palette, color: 'from-blue-500 to-cyan-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> },
    Backend: { icon: Server, color: 'from-green-500 to-emerald-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> },
    Database: { icon: Database, color: 'from-purple-500 to-violet-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> },
    DevOps: { icon: Cloud, color: 'from-orange-500 to-red-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> },
    Monitoring: { icon: Monitor, color: 'from-pink-500 to-rose-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> },
    Tools: { icon: Wrench, color: 'from-yellow-500 to-amber-500', items: [] as Array<{name: string, purpose: string, tags: string[]}> }
  };

  // Parse tech stack and categorize
  const lines = techStack.split('\n').filter(line => line.trim());
  let currentCategory = 'Tools';

  lines.forEach(line => {
    const cleanLine = line.replace(/[#*-]/g, '').trim();
    if (!cleanLine) return;

    if (cleanLine.toLowerCase().includes('frontend') || cleanLine.toLowerCase().includes('ui')) {
      currentCategory = 'Frontend';
    } else if (cleanLine.toLowerCase().includes('backend') || cleanLine.toLowerCase().includes('server')) {
      currentCategory = 'Backend';
    } else if (cleanLine.toLowerCase().includes('database') || cleanLine.toLowerCase().includes('db')) {
      currentCategory = 'Database';
    } else if (cleanLine.toLowerCase().includes('deploy') || cleanLine.toLowerCase().includes('devops')) {
      currentCategory = 'DevOps';
    } else if (cleanLine.toLowerCase().includes('monitor')) {
      currentCategory = 'Monitoring';
    } else if (cleanLine.includes(':')) {
      const [tech, desc] = cleanLine.split(':');
      const name = tech.trim();
      const purpose = desc.trim();
      const tags = purpose.includes('real') ? ['Realtime'] : purpose.includes('fast') ? ['Performance'] : ['Core'];
      
      categories[currentCategory as keyof typeof categories].items.push({
        name,
        purpose: purpose.substring(0, 50) + (purpose.length > 50 ? '...' : ''),
        tags
      });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Zap className="w-6 h-6 text-neon-blue" />
        <h2 className="text-2xl font-bold font-sora">Technology Stack</h2>
        <Badge variant="secondary" className="bg-neon-blue/20 text-neon-blue">
          {Object.values(categories).reduce((sum, cat) => sum + cat.items.length, 0)} Technologies
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([category, data], index) => {
          const IconComponent = data.icon;
          if (data.items.length === 0) return null;

          return (
            <Card 
              key={category}
              className="glass-dark border-0 hover:scale-[1.02] transition-all duration-300 animate-fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${data.color} flex items-center justify-center`}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold">{category}</div>
                    <div className="text-xs text-muted-foreground">{data.items.length} tools</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group/item">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex gap-1">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex}
                            variant="secondary" 
                            className="text-xs bg-white/10 hover:bg-white/20"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.purpose}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TechStackModule;
