
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Clock, TrendingUp } from 'lucide-react';

interface BudgetEstimate {
  development?: {
    team_cost?: string;
    duration?: string;
    total?: string;
    breakdown?: any;
  };
  infrastructure?: {
    hosting?: string;
    ai_services?: string;
    third_party?: string;
    total_monthly?: string;
  };
  one_time_costs?: any;
  total_mvp?: string;
  total_project?: string;
  post_mvp_monthly?: string;
  scaling_costs?: string;
}

interface TeamRole {
  role: string;
  responsibilities: string;
  experience_level?: string;
  time_commitment?: string;
  estimated_cost?: string;
  key_skills?: string[];
}

interface TeamPlan {
  roles?: TeamRole[];
  team_size?: string;
  duration?: string;
  team_composition?: {
    total_size?: string;
    duration?: string;
    cost_range?: string;
  };
  optional_roles?: any[];
  working_methodology?: string;
  communication_tools?: string[];
}

interface BudgetEstimationModuleProps {
  budgetEstimate: BudgetEstimate;
  teamPlan: TeamPlan;
}

const BudgetEstimationModule = ({ budgetEstimate, teamPlan }: BudgetEstimationModuleProps) => {
  console.log('BudgetEstimationModule props:', { budgetEstimate, teamPlan });

  // Check if we have any meaningful data to display
  const hasBudgetData = budgetEstimate && (
    budgetEstimate.development?.team_cost ||
    budgetEstimate.total_mvp ||
    budgetEstimate.infrastructure?.total_monthly ||
    Object.keys(budgetEstimate).length > 0
  );

  const hasTeamData = teamPlan && (
    teamPlan.roles?.length > 0 ||
    teamPlan.team_size ||
    teamPlan.team_composition?.total_size ||
    Object.keys(teamPlan).length > 0
  );

  console.log('Data check:', { hasBudgetData, hasTeamData });

  if (!hasBudgetData && !hasTeamData) {
    return (
      <Card className="glass-dark border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-neon-green" />
            <div>
              <div className="text-2xl font-bold font-sora">Budget & Team Planning</div>
              <div className="text-sm text-muted-foreground">Cost estimates and team structure</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>No budget or team planning data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <DollarSign className="w-6 h-6 text-neon-green" />
          <div>
            <div className="text-2xl font-bold font-sora">Budget & Team Planning</div>
            <div className="text-sm text-muted-foreground">Cost estimates and team structure</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Budget Overview */}
        {hasBudgetData && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-neon-coral" />
              Budget Breakdown
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* MVP Cost */}
              {(budgetEstimate.total_mvp || budgetEstimate.development?.total || budgetEstimate.total_project) && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Total MVP Cost</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {budgetEstimate.total_mvp || budgetEstimate.development?.total || budgetEstimate.total_project}
                  </div>
                  {budgetEstimate.development?.duration && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Duration: {budgetEstimate.development.duration}
                    </div>
                  )}
                </div>
              )}

              {/* Development Cost */}
              {budgetEstimate.development?.team_cost && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Development Team</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {budgetEstimate.development.team_cost}
                  </div>
                  {budgetEstimate.development.duration && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {budgetEstimate.development.duration}
                    </div>
                  )}
                </div>
              )}

              {/* Monthly Infrastructure */}
              {budgetEstimate.infrastructure?.total_monthly && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm font-medium text-purple-400">Monthly Infrastructure</span>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {budgetEstimate.infrastructure.total_monthly}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Recurring operational costs
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Infrastructure Breakdown */}
            {budgetEstimate.infrastructure && (
              <div className="space-y-3">
                <h5 className="text-lg font-semibold text-neon-blue">Infrastructure Costs</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {budgetEstimate.infrastructure.hosting && (
                    <div className="flex justify-between items-center p-3 rounded bg-white/5">
                      <span className="text-sm">Hosting & Deployment</span>
                      <Badge variant="outline">{budgetEstimate.infrastructure.hosting}</Badge>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.ai_services && (
                    <div className="flex justify-between items-center p-3 rounded bg-white/5">
                      <span className="text-sm">AI Services</span>
                      <Badge variant="outline">{budgetEstimate.infrastructure.ai_services}</Badge>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.third_party && (
                    <div className="flex justify-between items-center p-3 rounded bg-white/5">
                      <span className="text-sm">Third-party Services</span>
                      <Badge variant="outline">{budgetEstimate.infrastructure.third_party}</Badge>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Team Planning */}
        {hasTeamData && (
          <div className="space-y-6">
            <h4 className="text-xl font-semibold font-sora flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-purple" />
              Team Structure & Planning
            </h4>

            {/* Team Overview */}
            {(teamPlan.team_size || teamPlan.team_composition) && (
              <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/20 to-purple-600/20 border border-indigo-500/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(teamPlan.team_size || teamPlan.team_composition?.total_size) && (
                    <div>
                      <div className="text-sm text-indigo-300 mb-1">Team Size</div>
                      <div className="text-lg font-bold">
                        {teamPlan.team_size || teamPlan.team_composition?.total_size}
                      </div>
                    </div>
                  )}
                  {(teamPlan.duration || teamPlan.team_composition?.duration) && (
                    <div>
                      <div className="text-sm text-indigo-300 mb-1">Duration</div>
                      <div className="text-lg font-bold">
                        {teamPlan.duration || teamPlan.team_composition?.duration}
                      </div>
                    </div>
                  )}
                  {teamPlan.team_composition?.cost_range && (
                    <div>
                      <div className="text-sm text-indigo-300 mb-1">Cost Range</div>
                      <div className="text-lg font-bold">
                        {teamPlan.team_composition.cost_range}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Team Roles */}
            {teamPlan.roles && teamPlan.roles.length > 0 && (
              <div className="space-y-4">
                <h5 className="text-lg font-semibold text-neon-yellow">Team Roles</h5>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {teamPlan.roles.map((role, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h6 className="font-semibold text-white">{role.role}</h6>
                          {role.experience_level && (
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {role.experience_level}
                            </Badge>
                          )}
                        </div>
                        {role.estimated_cost && (
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {role.estimated_cost}
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {role.responsibilities}
                      </p>
                      
                      {role.time_commitment && (
                        <div className="text-xs text-blue-300 mb-2">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {role.time_commitment}
                        </div>
                      )}
                      
                      {role.key_skills && role.key_skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {role.key_skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Working Methodology */}
            {teamPlan.working_methodology && (
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h5 className="text-sm font-medium text-orange-300 mb-2">Working Methodology</h5>
                <p className="text-sm text-white">{teamPlan.working_methodology}</p>
              </div>
            )}

            {/* Communication Tools */}
            {teamPlan.communication_tools && teamPlan.communication_tools.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-cyan-300 mb-2">Communication Tools</h5>
                <div className="flex flex-wrap gap-2">
                  {teamPlan.communication_tools.map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-cyan-500/20 text-cyan-300">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetEstimationModule;
