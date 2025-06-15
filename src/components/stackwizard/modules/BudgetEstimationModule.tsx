
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Clock, Server, Zap, Target } from 'lucide-react';

interface TeamRole {
  role: string;
  responsibilities: string;
  hourly_rate?: string;
  hours_per_week?: string;
}

interface TeamPlan {
  roles?: TeamRole[];
  team_size?: string;
  duration?: string;
  team_composition?: {
    total_size: string;
    duration: string;
    cost_range: string;
  };
}

interface BudgetEstimate {
  development?: {
    team_cost: string;
    duration: string;
    total: string;
  };
  infrastructure?: {
    hosting: string;
    ai_services: string;
    third_party: string;
    total_monthly: string;
  };
  total_project?: string;
  total_mvp?: string;
}

interface BudgetEstimationModuleProps {
  budgetEstimate: BudgetEstimate;
  teamPlan: TeamPlan;
}

const BudgetEstimationModule = ({ budgetEstimate, teamPlan }: BudgetEstimationModuleProps) => {
  console.log('BudgetEstimationModule - budgetEstimate:', budgetEstimate);
  console.log('BudgetEstimationModule - teamPlan:', teamPlan);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <DollarSign className="w-6 h-6 text-neon-green" />
        <h3 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-green to-neon-aqua bg-clip-text text-transparent">
          Budget & Team Planning
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Budget Estimation */}
        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-neon-green" />
              <div>
                <div className="text-xl font-bold font-sora">Budget Estimation</div>
                <div className="text-sm text-muted-foreground">Complete cost breakdown</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Total MVP Cost */}
            {budgetEstimate?.total_mvp && (
              <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total MVP Cost</span>
                  <Badge className="bg-neon-green text-black font-bold text-lg px-4 py-2">
                    {budgetEstimate.total_mvp}
                  </Badge>
                </div>
              </div>
            )}

            {/* Development Costs */}
            {budgetEstimate?.development && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-coral flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Development Team
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 rounded bg-white/5">
                    <span className="text-sm text-muted-foreground">Team Cost:</span>
                    <Badge variant="secondary" className="bg-neon-coral/20 text-neon-coral">
                      {budgetEstimate.development.team_cost}
                    </Badge>
                  </div>
                  {budgetEstimate.development.duration && (
                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <Badge variant="secondary" className="bg-neon-blue/20 text-neon-blue">
                        {budgetEstimate.development.duration}
                      </Badge>
                    </div>
                  )}
                  {budgetEstimate.development.total && (
                    <div className="flex justify-between items-center p-2 rounded bg-white/5">
                      <span className="text-sm text-muted-foreground">Total:</span>
                      <Badge variant="secondary" className="bg-neon-green/20 text-neon-green">
                        {budgetEstimate.development.total}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Infrastructure Costs */}
            {budgetEstimate?.infrastructure && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-blue flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Monthly Infrastructure
                </h4>
                <div className="space-y-2">
                  {budgetEstimate.infrastructure.hosting && (
                    <div className="flex justify-between items-center p-2 rounded bg-blue-500/5">
                      <span className="text-sm text-muted-foreground">Hosting:</span>
                      <Badge variant="outline" className="bg-neon-blue/20 border-neon-blue text-neon-blue">
                        {budgetEstimate.infrastructure.hosting}
                      </Badge>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.ai_services && (
                    <div className="flex justify-between items-center p-2 rounded bg-blue-500/5">
                      <span className="text-sm text-muted-foreground">AI Services:</span>
                      <Badge variant="outline" className="bg-purple-500/20 border-purple-500 text-purple-300">
                        {budgetEstimate.infrastructure.ai_services}
                      </Badge>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.third_party && (
                    <div className="flex justify-between items-center p-2 rounded bg-blue-500/5">
                      <span className="text-sm text-muted-foreground">Third Party:</span>
                      <Badge variant="outline" className="bg-neon-orange/20 border-neon-orange text-neon-orange">
                        {budgetEstimate.infrastructure.third_party}
                      </Badge>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.total_monthly && (
                    <div className="flex justify-between items-center p-3 rounded bg-neon-blue/10 border border-neon-blue/20 mt-3">
                      <span className="font-medium">Total Monthly:</span>
                      <Badge className="bg-neon-blue text-white font-bold">
                        {budgetEstimate.infrastructure.total_monthly}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Team Planning */}
        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '350ms' }}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-6 h-6 text-neon-coral" />
              <div>
                <div className="text-xl font-bold font-sora">Team Planning</div>
                <div className="text-sm text-muted-foreground">Recommended team structure</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Team Composition Summary */}
            {teamPlan?.team_composition && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-orange flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Team Overview
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Team Size:</span>
                      <Badge className="bg-neon-orange/20 border-neon-orange text-neon-orange">
                        {teamPlan.team_composition.total_size}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-neon-coral/10 border border-neon-coral/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <Badge className="bg-neon-coral/20 border-neon-coral text-neon-coral">
                        {teamPlan.team_composition.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cost Range:</span>
                      <Badge className="bg-neon-green/20 border-neon-green text-neon-green">
                        {teamPlan.team_composition.cost_range}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Legacy format support */}
            {teamPlan?.team_size && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-orange">Team Size</h4>
                <Badge className="bg-neon-orange/20 text-neon-orange">
                  {teamPlan.team_size}
                </Badge>
              </div>
            )}

            {teamPlan?.duration && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-coral">Project Duration</h4>
                <Badge className="bg-neon-coral/20 text-neon-coral">
                  {teamPlan.duration}
                </Badge>
              </div>
            )}

            {/* Team Roles */}
            {teamPlan?.roles && teamPlan.roles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-purple">Team Roles</h4>
                <div className="space-y-3">
                  {teamPlan.roles.map((role, index) => (
                    <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-neon-purple">{role.role}</h5>
                        <div className="flex gap-2">
                          {role.hourly_rate && (
                            <Badge variant="outline" className="text-xs bg-green-500/20 text-green-300">
                              {role.hourly_rate}/hr
                            </Badge>
                          )}
                          {role.hours_per_week && (
                            <Badge variant="outline" className="text-xs bg-blue-500/20 text-blue-300">
                              {role.hours_per_week}h/week
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{role.responsibilities}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetEstimationModule;
