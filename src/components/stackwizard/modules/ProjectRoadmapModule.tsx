
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, TestTube, Database, Code, Shield, Target, CheckCircle } from 'lucide-react';

interface Architecture {
  pattern?: string;
  reason?: string;
  api_style?: string;
  api_reason?: string;
  database_type?: string;
  database_reason?: string;
  deployment_strategy?: string;
}

interface TestingStrategy {
  types?: string[];
  tools?: Record<string, string>;
  coverage_targets?: Record<string, string>;
  ai_testing?: string;
  testing_environments?: string[];
  automated_testing?: string;
  manual_testing?: string;
}

interface ProjectRoadmapModuleProps {
  architecture: Architecture;
  testingStrategy: TestingStrategy;
}

const ProjectRoadmapModule = ({ architecture, testingStrategy }: ProjectRoadmapModuleProps) => {
  console.log('ProjectRoadmapModule - architecture:', architecture);
  console.log('ProjectRoadmapModule - testingStrategy:', testingStrategy);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GitBranch className="w-6 h-6 text-neon-purple" />
        <h3 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent">
          Architecture & Testing Strategy
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Architecture Recommendations */}
        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <GitBranch className="w-6 h-6 text-neon-purple" />
              <div>
                <div className="text-xl font-bold font-sora">Architecture</div>
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

            {architecture?.deployment_strategy && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-neon-orange" />
                  <h4 className="font-semibold">Deployment Strategy</h4>
                </div>
                <div className="p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                  <p className="text-sm text-muted-foreground">{architecture.deployment_strategy}</p>
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
                <div className="text-xl font-bold font-sora">Testing Strategy</div>
                <div className="text-sm text-muted-foreground">Quality assurance plan</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {testingStrategy?.types && testingStrategy.types.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-orange flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Test Types
                </h4>
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

            {testingStrategy?.coverage_targets && Object.keys(testingStrategy.coverage_targets).length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-blue">Coverage Targets</h4>
                <div className="space-y-2">
                  {Object.entries(testingStrategy.coverage_targets).map(([type, target], index) => (
                    <div key={index} className="flex justify-between items-center p-2 rounded bg-blue-500/5">
                      <span className="text-sm capitalize text-muted-foreground">{type}:</span>
                      <Badge variant="outline" className="bg-neon-blue/20 border-neon-blue text-neon-blue">
                        {target}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {testingStrategy?.testing_environments && testingStrategy.testing_environments.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-coral">Testing Environments</h4>
                <div className="flex flex-wrap gap-2">
                  {testingStrategy.testing_environments.map((env, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="bg-neon-coral/20 border-neon-coral text-neon-coral"
                    >
                      {env}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {testingStrategy?.automated_testing && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-green">Automated Testing</h4>
                <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                  <p className="text-sm text-muted-foreground">{testingStrategy.automated_testing}</p>
                </div>
              </div>
            )}

            {testingStrategy?.manual_testing && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-yellow">Manual Testing</h4>
                <div className="p-3 rounded-lg bg-neon-yellow/10 border border-neon-yellow/20">
                  <p className="text-sm text-muted-foreground">{testingStrategy.manual_testing}</p>
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
    </div>
  );
};

export default ProjectRoadmapModule;
