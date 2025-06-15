
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, TestTube, Layers, Database, Globe, Shield } from 'lucide-react';

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
  console.log('ProjectRoadmapModule props:', { architecture, testingStrategy });

  const hasArchitectureData = architecture && Object.keys(architecture).length > 0;
  const hasTestingData = testingStrategy && Object.keys(testingStrategy).length > 0;

  if (!hasArchitectureData && !hasTestingData) {
    return (
      <Card className="glass-dark border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-neon-purple" />
            <div>
              <div className="text-2xl font-bold font-sora">Architecture & Testing Strategy</div>
              <div className="text-sm text-muted-foreground">Technical foundation and quality assurance</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No architecture or testing strategy data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '600ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-neon-purple" />
          <div>
            <div className="text-2xl font-bold font-sora">Architecture & Testing Strategy</div>
            <div className="text-sm text-muted-foreground">Technical foundation and quality assurance</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Architecture Section */}
        {hasArchitectureData && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <Layers className="w-5 h-5 text-neon-blue" />
              System Architecture
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Architecture Pattern */}
              {architecture.pattern && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-600/20 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-blue-400" />
                    <h5 className="font-semibold text-blue-400">Architecture Pattern</h5>
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {architecture.pattern}
                  </div>
                  {architecture.reason && (
                    <p className="text-sm text-muted-foreground">
                      {architecture.reason}
                    </p>
                  )}
                </div>
              )}

              {/* API Style */}
              {architecture.api_style && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Globe className="w-5 h-5 text-green-400" />
                    <h5 className="font-semibold text-green-400">API Style</h5>
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {architecture.api_style}
                  </div>
                  {architecture.api_reason && (
                    <p className="text-sm text-muted-foreground">
                      {architecture.api_reason}
                    </p>
                  )}
                </div>
              )}

              {/* Database */}
              {architecture.database_type && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-purple-400" />
                    <h5 className="font-semibold text-purple-400">Database Strategy</h5>
                  </div>
                  <div className="text-xl font-bold text-white mb-2">
                    {architecture.database_type}
                  </div>
                  {architecture.database_reason && (
                    <p className="text-sm text-muted-foreground">
                      {architecture.database_reason}
                    </p>
                  )}
                </div>
              )}

              {/* Deployment */}
              {architecture.deployment_strategy && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-orange-400" />
                    <h5 className="font-semibold text-orange-400">Deployment Strategy</h5>
                  </div>
                  <div className="text-lg font-bold text-white">
                    {architecture.deployment_strategy}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Testing Strategy Section */}
        {hasTestingData && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <TestTube className="w-5 h-5 text-neon-green" />
              Testing Strategy
            </h4>

            {/* Testing Types & Tools */}
            {(testingStrategy.types || testingStrategy.tools) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Testing Types */}
                {testingStrategy.types && testingStrategy.types.length > 0 && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h5 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <TestTube className="w-4 h-4" />
                      Testing Types
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {testingStrategy.types.map((type, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-500/20 text-green-300">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testing Tools */}
                {testingStrategy.tools && Object.keys(testingStrategy.tools).length > 0 && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h5 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Testing Tools
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(testingStrategy.tools).map(([type, tool], index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm capitalize">{type}:</span>
                          <Badge variant="outline" className="text-xs">
                            {tool}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Coverage Targets */}
            {testingStrategy.coverage_targets && Object.keys(testingStrategy.coverage_targets).length > 0 && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <h5 className="font-semibold text-yellow-400 mb-3">Coverage Targets</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(testingStrategy.coverage_targets).map(([type, target], index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm text-muted-foreground capitalize">{type.replace('_', ' ')}</div>
                      <div className="text-lg font-bold text-yellow-300">{target}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Testing */}
            {testingStrategy.ai_testing && (
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h5 className="font-semibold text-purple-400 mb-2">🤖 AI Testing Strategy</h5>
                <p className="text-sm text-muted-foreground">{testingStrategy.ai_testing}</p>
              </div>
            )}

            {/* Testing Environments */}
            {testingStrategy.testing_environments && testingStrategy.testing_environments.length > 0 && (
              <div>
                <h5 className="font-semibold text-cyan-400 mb-2">Testing Environments</h5>
                <div className="flex flex-wrap gap-2">
                  {testingStrategy.testing_environments.map((env, index) => (
                    <Badge key={index} variant="outline" className="bg-cyan-500/20 text-cyan-300">
                      {env}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Automated Testing */}
            {testingStrategy.automated_testing && (
              <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <h5 className="font-semibold text-indigo-400 mb-2">Automated Testing</h5>
                <p className="text-sm text-muted-foreground">{testingStrategy.automated_testing}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectRoadmapModule;
