
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Users, Calendar, TrendingUp, Clock, Target } from 'lucide-react';

interface BudgetEstimate {
  development?: {
    team_cost?: string;
    duration?: string;
    total?: string;
    breakdown?: Record<string, string>;
  };
  infrastructure?: {
    hosting?: string;
    ai_services?: string;
    third_party?: string;
    total_monthly?: string;
  };
  one_time_costs?: {
    design_tools?: string;
    development_tools?: string;
    legal?: string;
  };
  total_mvp?: string;
  post_mvp_monthly?: string;
  scaling_costs?: string;
}

interface TeamRole {
  role: string;
  responsibilities?: string;
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
  optional_roles?: Array<{
    role: string;
    when_needed?: string;
    responsibilities?: string;
    estimated_cost?: string;
  }>;
  working_methodology?: string;
  communication_tools?: string[];
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
        <h3 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-green to-neon-blue bg-clip-text text-transparent">
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
                <div className="text-sm text-muted-foreground">MVP cost breakdown</div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {budgetEstimate?.total_mvp && (
              <div className="text-center p-4 rounded-lg bg-neon-green/10 border border-neon-green/20">
                <div className="text-2xl font-bold text-neon-green">{budgetEstimate.total_mvp}</div>
                <div className="text-sm text-muted-foreground mt-1">Total MVP Cost</div>
              </div>
            )}

            {budgetEstimate?.development && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-coral flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Development Costs
                </h4>
                <div className="space-y-2 text-sm">
                  {budgetEstimate.development.team_cost && (
                    <div className="flex justify-between">
                      <span>Team Cost:</span>
                      <span className="font-medium text-neon-green">{budgetEstimate.development.team_cost}</span>
                    </div>
                  )}
                  {budgetEstimate.development.duration && (
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{budgetEstimate.development.duration}</span>
                    </div>
                  )}
                  {budgetEstimate.development.breakdown && (
                    <div className="mt-3 space-y-1">
                      <span className="text-xs font-medium text-neon-blue">Breakdown:</span>
                      {Object.entries(budgetEstimate.development.breakdown).map(([role, cost]) => (
                        <div key={role} className="flex justify-between text-xs">
                          <span className="capitalize">{role.replace('_', ' ')}:</span>
                          <span className="text-neon-blue">{cost}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {budgetEstimate?.infrastructure && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-blue flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Infrastructure (Monthly)
                </h4>
                <div className="space-y-2 text-sm">
                  {budgetEstimate.infrastructure.hosting && (
                    <div className="flex justify-between">
                      <span>Hosting:</span>
                      <span className="font-medium">{budgetEstimate.infrastructure.hosting}</span>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.ai_services && (
                    <div className="flex justify-between">
                      <span>AI Services:</span>
                      <span className="font-medium">{budgetEstimate.infrastructure.ai_services}</span>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.third_party && (
                    <div className="flex justify-between">
                      <span>Third Party:</span>
                      <span className="font-medium">{budgetEstimate.infrastructure.third_party}</span>
                    </div>
                  )}
                  {budgetEstimate.infrastructure.total_monthly && (
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span>Monthly Total:</span>
                      <span className="font-bold text-neon-blue">{budgetEstimate.infrastructure.total_monthly}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {budgetEstimate?.one_time_costs && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-yellow">One-time Costs</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(budgetEstimate.one_time_costs).map(([type, cost]) => (
                    <div key={type} className="flex justify-between">
                      <span className="capitalize">{type.replace('_', ' ')}:</span>
                      <span className="font-medium">{cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {budgetEstimate?.post_mvp_monthly && (
              <div className="p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                <div className="text-sm">
                  <span className="font-medium text-neon-orange">Post-MVP Monthly: </span>
                  {budgetEstimate.post_mvp_monthly}
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
            {(teamPlan?.team_composition || teamPlan?.team_size) && (
              <div className="grid grid-cols-1 gap-4">
                {teamPlan.team_composition ? (
                  <>
                    <div className="text-center p-3 rounded-lg bg-neon-coral/10 border border-neon-coral/20">
                      <div className="text-lg font-bold text-neon-coral">{teamPlan.team_composition.total_size}</div>
                      <div className="text-xs text-muted-foreground">Team Size</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                      <div className="text-lg font-bold text-neon-orange">{teamPlan.team_composition.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                    {teamPlan.team_composition.cost_range && (
                      <div className="text-center p-3 rounded-lg bg-neon-green/10 border border-neon-green/20 col-span-full">
                        <div className="text-lg font-bold text-neon-green">{teamPlan.team_composition.cost_range}</div>
                        <div className="text-xs text-muted-foreground">Cost Range</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-center p-3 rounded-lg bg-neon-coral/10 border border-neon-coral/20">
                      <div className="text-lg font-bold text-neon-coral">{teamPlan.team_size}</div>
                      <div className="text-xs text-muted-foreground">Team Size</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/20">
                      <div className="text-lg font-bold text-neon-orange">{teamPlan.duration}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </>
                )}
              </div>
            )}

            {teamPlan?.roles && teamPlan.roles.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-semibold text-neon-yellow flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Core Team Roles
                </h4>
                <div className="space-y-3">
                  {teamPlan.roles.map((role, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="bg-neon-purple/20 border-neon-purple text-neon-purple">
                          {role.role}
                        </Badge>
                        {role.estimated_cost && (
                          <Badge variant="secondary" className="bg-neon-green/20 text-neon-green text-xs">
                            {role.estimated_cost}
                          </Badge>
                        )}
                      </div>
                      
                      {role.experience_level && (
                        <div className="text-xs text-neon-blue mb-1">
                          Experience: {role.experience_level}
                        </div>
                      )}
                      
                      {role.time_commitment && (
                        <div className="text-xs text-neon-orange mb-2">
                          Commitment: {role.time_commitment}
                        </div>
                      )}
                      
                      {role.responsibilities && (
                        <p className="text-sm text-muted-foreground mb-2">{role.responsibilities}</p>
                      )}
                      
                      {role.key_skills && role.key_skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {role.key_skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex}
                              variant="outline" 
                              className="text-xs bg-neon-coral/10 border-neon-coral/30 text-neon-coral"
                            >
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

            {teamPlan?.optional_roles && teamPlan.optional_roles.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-neon-green text-sm">Optional Roles</h4>
                <div className="space-y-2">
                  {teamPlan.optional_roles.map((role, index) => (
                    <div key={index} className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-neon-green">{role.role}</span>
                        {role.estimated_cost && (
                          <Badge variant="outline" className="text-xs bg-green-500/10 border-green-500/30">
                            {role.estimated_cost}
                          </Badge>
                        )}
                      </div>
                      {role.when_needed && (
                        <div className="text-xs text-green-300 mb-1">When: {role.when_needed}</div>
                      )}
                      {role.responsibilities && (
                        <div className="text-xs text-muted-foreground">{role.responsibilities}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {teamPlan?.working_methodology && (
              <div className="p-3 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                <h5 className="text-sm font-medium text-neon-purple mb-1">Methodology</h5>
                <p className="text-xs text-muted-foreground">{teamPlan.working_methodology}</p>
              </div>
            )}

            {teamPlan?.communication_tools && teamPlan.communication_tools.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-neon-blue mb-2">Communication Tools</h5>
                <div className="flex flex-wrap gap-1">
                  {teamPlan.communication_tools.map((tool, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="text-xs bg-neon-blue/10 border-neon-blue/30 text-neon-blue"
                    >
                      {tool}
                    </Badge>
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
