
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Users, Server, TrendingUp } from 'lucide-react';

const BudgetEstimationModule = () => {
  const [teamSize, setTeamSize] = React.useState([2]);
  const [projectDuration, setProjectDuration] = React.useState([3]);

  const calculateCosts = () => {
    const devCostPerMonth = 8000; // Average developer cost
    const infraBaseCost = 100; // Base infrastructure cost
    const infraScaling = teamSize[0] * 50; // Scaling factor
    
    const totalDevCost = teamSize[0] * devCostPerMonth * projectDuration[0];
    const monthlyInfraCost = infraBaseCost + infraScaling;
    const totalInfraCost = monthlyInfraCost * projectDuration[0];
    
    return {
      totalDevCost,
      monthlyInfraCost,
      totalInfraCost,
      totalProjectCost: totalDevCost + totalInfraCost
    };
  };

  const costs = calculateCosts();

  const teamStructures = [
    { size: 1, title: 'Solo Developer', roles: ['Full-stack Developer'], cost: costs.totalDevCost / teamSize[0] },
    { size: 2, title: 'Small Team', roles: ['Frontend Dev', 'Backend Dev'], cost: costs.totalDevCost },
    { size: 3, title: 'Core Team', roles: ['Frontend Dev', 'Backend Dev', 'DevOps'], cost: costs.totalDevCost * 1.5 },
    { size: 5, title: 'Full Team', roles: ['Frontend Dev', 'Backend Dev', 'DevOps', 'Designer', 'PM'], cost: costs.totalDevCost * 2.5 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Budget Calculator */}
      <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-neon-orange" />
            <div>
              <div className="text-xl font-bold font-sora">Budget Estimation</div>
              <div className="text-sm text-muted-foreground">Interactive cost calculator</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Team Size</label>
                <Badge variant="secondary">{teamSize[0]} developers</Badge>
              </div>
              <Slider
                value={teamSize}
                onValueChange={setTeamSize}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium">Project Duration</label>
                <Badge variant="secondary">{projectDuration[0]} months</Badge>
              </div>
              <Slider
                value={projectDuration}
                onValueChange={setProjectDuration}
                max={12}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400">Development</span>
              </div>
              <div className="text-lg font-bold">${costs.totalDevCost.toLocaleString()}</div>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
              <div className="flex items-center gap-2 mb-1">
                <Server className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-blue-400">Infrastructure</span>
              </div>
              <div className="text-lg font-bold">${costs.monthlyInfraCost}/mo</div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="font-semibold">Total Project Cost</span>
              </div>
              <div className="text-xl font-bold text-purple-400">
                ${costs.totalProjectCost.toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Structure */}
      <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Users className="w-6 h-6 text-neon-purple" />
            <div>
              <div className="text-xl font-bold font-sora">Team Planning</div>
              <div className="text-sm text-muted-foreground">Recommended team structures</div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamStructures.map((team, index) => (
            <div 
              key={team.size}
              className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                teamSize[0] === team.size 
                  ? 'border-neon-purple bg-purple-500/20' 
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{team.title}</h4>
                  <div className="text-xs text-muted-foreground">{team.size} team members</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  ${Math.round(team.cost / 1000)}k
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {team.roles.map((role) => (
                  <Badge key={role} variant="secondary" className="text-xs bg-white/10">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetEstimationModule;
