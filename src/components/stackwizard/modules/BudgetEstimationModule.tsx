
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Calendar, TrendingUp } from 'lucide-react';

interface BudgetEstimate {
  development: {
    team_cost: string;
    duration: string;
    total: string;
  };
  infrastructure: {
    hosting: string;
    ai_services: string;
    third_party: string;
    total_monthly: string;
  };
  total_project: string;
}

interface TeamRole {
  role: string;
  responsibilities: string;
}

interface TeamPlan {
  roles: TeamRole[];
  team_size: string;
  duration: string;
}

interface BudgetEstimationModuleProps {
  budgetEstimate: BudgetEstimate;
  teamPlan: TeamPlan;
}

const BudgetEstimationModule = ({ budgetEstimate, teamPlan }: BudgetEstimationModuleProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Budget Estimation */}
      <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-neon-green" />
            <div>
              <div className="text-2xl font-bold font-sora">Budget Estimation</div>
              <div className="text-sm text-muted-foreground">Project cost breakdown</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {budgetEstimate?.total_project && (
            <div className="text-center p-4 rounded-lg bg-neon-green/10 border border-neon-green/20">
              <div className="text-3xl font-bold text-neon-green">{budgetEstimate.total_project}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Project Cost</div>
            </div>
          )}

          {budgetEstimate?.development && (
            <div className="space-y-3">
              <h4 className="font-semibold text-neon-coral">Development Costs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Team Cost:</span>
                  <span className="font-medium">{budgetEstimate.development.team_cost}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{budgetEstimate.development.duration}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span>Development Total:</span>
                  <span className="font-bold text-neon-green">{budgetEstimate.development.total}</span>
                </div>
              </div>
            </div>
          )}

          {budgetEstimate?.infrastructure && (
            <div className="space-y-3">
              <h4 className="font-semibold text-neon-blue">Infrastructure (Monthly)</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Hosting:</span>
                  <span className="font-medium">{budgetEstimate.infrastructure.hosting}</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Services:</span>
                  <span className="font-medium">{budgetEstimate.infrastructure.ai_services}</span>
                </div>
                <div className="flex justify-between">
                  <span>Third Party:</span>
                  <span className="font-medium">{budgetEstimate.infrastructure.third_party}</span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-2">
                  <span>Monthly Total:</span>
                  <span className="font-bold text-neon-blue">{budgetEstimate.infrastructure.total_monthly}</span>
                </div>
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
              <div className="text-2xl font-bold font-sora">Team Planning</div>
              <div className="text-sm text-muted-foreground">Recommended team structure</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {teamPlan?.team_size && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-lg bg-neon-coral/10 border border-neon-coral/20">
                <div className="text-xl font-bold text-neon-coral">{teamPlan.team_size}</div>
                <div className="text-xs text-muted-foreground">Team Size</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                <div className="text-xl font-bold text-neon-orange">{teamPlan.duration}</div>
                <div className="text-xs text-muted-foreground">Duration</div>
              </div>
            </div>
          )}

          {teamPlan?.roles && teamPlan.roles.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-semibold text-neon-yellow">Team Roles</h4>
              <div className="space-y-3">
                {teamPlan.roles.map((role, index) => (
                  <div key={index} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-neon-purple/20 border-neon-purple text-neon-purple">
                        {role.role}
                      </Badge>
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
  );
};

export default BudgetEstimationModule;
