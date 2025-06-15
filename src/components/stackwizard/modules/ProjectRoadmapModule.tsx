
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, TestTube, Database, Code, Shield } from 'lucide-react';

interface Architecture {
  pattern: string;
  reason: string;
  api_style: string;
  api_reason: string;
  database_type: string;
  database_reason: string;
}

interface TestingStrategy {
  types: string[];
  tools: Record<string, string>;
  ai_testing?: string;
}

interface ProjectRoadmapModuleProps {
  architecture: Architecture;
  testingStrategy: TestingStrategy;
}

const ProjectRoadmapModule = ({ architecture, testingStrategy }: ProjectRoadmapModuleProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Architecture Recommendations */}
      <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <GitBranch className="w-6 h-6 text-neon-purple" />
            <div>
              <div className="text-2xl font-bold font-sora">Architecture</div>
              <div className="text-sm text-muted-foreground">System design recommendations</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {architecture?.pattern && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-neon-green" />
                <h4 className="font-semibold">Architecture Pattern</h4>
              </div>
              <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <Badge variant="outline" className="bg-neon-green/20 border-neon-green text-neon-green mb-2">
                  {architecture.pattern}
                </Badge>
                <p className="text-sm text-muted-foreground">{architecture.reason}</p>
              </div>
            </div>
          )}

          {architecture?.api_style && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-neon-blue" />
                <h4 className="font-semibold">API Design</h4>
              </div>
              <div className="p-3 rounded-lg bg-neon-blue/10 border border-neon-blue/20">
                <Badge variant="outline" className="bg-neon-blue/20 border-neon-blue text-neon-blue mb-2">
                  {architecture.api_style}
                </Badge>
                <p className="text-sm text-muted-foreground">{architecture.api_reason}</p>
              </div>
            </div>
          )}

          {architecture?.database_type && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-neon-coral" />
                <h4 className="font-semibold">Database Choice</h4>
              </div>
              <div className="p-3 rounded-lg bg-neon-coral/10 border border-neon-coral/20">
                <Badge variant="outline" className="bg-neon-coral/20 border-neon-coral text-neon-coral mb-2">
                  {architecture.database_type}
                </Badge>
                <p className="text-sm text-muted-foreground">{architecture.database_reason}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Testing Strategy */}
      <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <TestTube className="w-6 h-6 text-neon-yellow" />
            <div>
              <div className="text-2xl font-bold font-sora">Testing Strategy</div>
              <div className="text-sm text-muted-foreground">Quality assurance plan</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {testingStrategy?.types && testingStrategy.types.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-neon-orange">Test Types</h4>
              <div className="flex flex-wrap gap-2">
                {testingStrategy.types.map((type, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-neon-orange/20 border-neon-orange text-neon-orange"
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {testingStrategy?.tools && Object.keys(testingStrategy.tools).length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-neon-purple">Recommended Tools</h4>
              <div className="space-y-2">
                {Object.entries(testingStrategy.tools).map(([type, tool], index) => (
                  <div key={index} className="flex justify-between items-center p-2 rounded bg-white/5">
                    <span className="text-sm capitalize text-muted-foreground">{type}:</span>
                    <Badge variant="secondary" className="bg-neon-purple/20 text-neon-purple">
                      {tool}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {testingStrategy?.ai_testing && (
            <div className="space-y-3">
              <h4 className="font-semibold text-neon-green">AI-Powered Testing</h4>
              <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <p className="text-sm text-muted-foreground">{testingStrategy.ai_testing}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectRoadmapModule;
