
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Rocket, TrendingUp, AlertTriangle, TestTube, Zap } from 'lucide-react';

const ProjectRoadmapModule = () => {
  const roadmapPhases = [
    {
      id: 'mvp',
      title: 'MVP',
      subtitle: 'Minimum Viable Product',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      duration: '4-6 weeks',
      features: [
        'Core user authentication',
        'Basic CRUD operations',
        'Essential UI components',
        'Simple dashboard',
        'Mobile responsive design'
      ],
      risks: [
        'Scope creep risk',
        'Technical debt accumulation',
        'User feedback integration'
      ],
      testGoals: [
        'User registration flow',
        'Core functionality tests',
        'Mobile compatibility',
        'Performance benchmarks'
      ]
    },
    {
      id: 'v1',
      title: 'V1 Launch',
      subtitle: 'Production Ready',
      icon: Rocket,
      color: 'from-blue-500 to-cyan-500',
      duration: '8-12 weeks',
      features: [
        'Advanced user management',
        'Real-time notifications',
        'Analytics dashboard',
        'API integrations',
        'Payment processing',
        'Admin panel'
      ],
      risks: [
        'Scalability challenges',
        'Security vulnerabilities',
        'Performance optimization',
        'Third-party dependencies'
      ],
      testGoals: [
        'Load testing (1000+ users)',
        'Security penetration tests',
        'API performance tests',
        'Cross-browser compatibility',
        'Payment flow validation'
      ]
    },
    {
      id: 'v2',
      title: 'V2 Scale',
      subtitle: 'Growth & Optimization',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      duration: '12-16 weeks',
      features: [
        'Advanced analytics',
        'Multi-tenant architecture',
        'AI/ML features',
        'Advanced integrations',
        'Mobile apps',
        'Enterprise features'
      ],
      risks: [
        'Technical complexity',
        'Team scaling challenges',
        'Market competition',
        'Infrastructure costs'
      ],
      testGoals: [
        'Stress testing (10k+ users)',
        'AI model accuracy tests',
        'Multi-tenant isolation',
        'Mobile app store approval',
        'Enterprise security compliance'
      ]
    }
  ];

  return (
    <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '500ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Zap className="w-6 h-6 text-neon-pink" />
          <div>
            <div className="text-2xl font-bold font-sora">Project Roadmap</div>
            <div className="text-sm text-muted-foreground">Strategic development phases</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mvp" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            {roadmapPhases.map((phase) => {
              const IconComponent = phase.icon;
              return (
                <TabsTrigger 
                  key={phase.id} 
                  value={phase.id}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {phase.title}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {roadmapPhases.map((phase) => {
            const IconComponent = phase.icon;
            return (
              <TabsContent key={phase.id} value={phase.id} className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white/5 to-white/10">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{phase.title} - {phase.subtitle}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="bg-white/10">
                        {phase.duration}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Features */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-400" />
                      <h4 className="font-semibold">Features</h4>
                    </div>
                    <div className="space-y-2">
                      {phase.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded bg-blue-500/10">
                          <div className="w-2 h-2 rounded-full bg-blue-400" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <h4 className="font-semibold">Risks</h4>
                    </div>
                    <div className="space-y-2">
                      {phase.risks.map((risk, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded bg-orange-500/10">
                          <div className="w-2 h-2 rounded-full bg-orange-400" />
                          <span className="text-sm">{risk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Test Goals */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TestTube className="w-5 h-5 text-green-400" />
                      <h4 className="font-semibold">Test Goals</h4>
                    </div>
                    <div className="space-y-2">
                      {phase.testGoals.map((goal, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded bg-green-500/10">
                          <div className="w-2 h-2 rounded-full bg-green-400" />
                          <span className="text-sm">{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProjectRoadmapModule;
