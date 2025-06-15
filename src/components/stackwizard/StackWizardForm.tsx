
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface StackWizardFormProps {
  onSubmit: (data: { projectName: string; description: string; requirements: string }) => void;
  isLoading: boolean;
}

const StackWizardForm = ({ onSubmit, isLoading }: StackWizardFormProps) => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ projectName, description, requirements });
  };

  return (
    <Card className="glass-dark border-0 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          🔧 StackWizard+
        </CardTitle>
        <p className="text-muted-foreground">
          Describe your project and get AI-powered tech stack recommendations with timeline
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-sm font-medium">
              Project Name
            </Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter your project name..."
              className="glass bg-black/20 border-0 focus:ring-2 focus:ring-neon-blue"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Project Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project idea, target audience, and key features..."
              rows={4}
              className="glass bg-black/20 border-0 focus:ring-2 focus:ring-neon-blue resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements" className="text-sm font-medium">
              Specific Requirements
            </Label>
            <Input
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Any specific technologies, constraints, or requirements..."
              className="glass bg-black/20 border-0 focus:ring-2 focus:ring-neon-blue"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !projectName.trim() || !description.trim()}
            className="w-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl py-3 font-semibold hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? 'Generating Plan...' : 'Generate Tech Stack'}
          </button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StackWizardForm;
