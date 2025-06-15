
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Clock, Zap, Database, Globe, Server, Palette } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PlanOutputProps {
  techStack: string;
  timeline: string;
  ganttChart: string;
  suggestions: string;
}

const PlanOutput = ({ techStack, timeline, ganttChart, suggestions }: PlanOutputProps) => {
  const copyToClipboard = async () => {
    const content = `Tech Stack:\n${techStack}\n\nTimeline:\n${timeline}\n\nGantt Chart:\n${ganttChart}\n\nSuggestions:\n${suggestions}`;
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Plan copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const exportToPDF = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const jsPDF = (await import('jspdf')).default;
      
      const element = document.getElementById('stackwizard-output');
      if (!element) return;

      const canvas = await html2canvas(element, {
        backgroundColor: '#0a0a0a',
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('tech-stack-plan.pdf');
      
      toast({
        title: "Success!",
        description: "PDF exported successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to export PDF",
        variant: "destructive",
      });
    }
  };

  const parseTechStack = (stackText: string) => {
    const categories = {
      Frontend: { icon: Palette, color: 'bg-blue-500', items: [] as string[] },
      Backend: { icon: Server, color: 'bg-green-500', items: [] as string[] },
      Database: { icon: Database, color: 'bg-purple-500', items: [] as string[] },
      DevOps: { icon: Globe, color: 'bg-orange-500', items: [] as string[] },
      Other: { icon: Zap, color: 'bg-pink-500', items: [] as string[] }
    };

    const lines = stackText.split('\n').filter(line => line.trim());
    let currentCategory = 'Other';

    lines.forEach(line => {
      const cleanLine = line.replace(/[#*-]/g, '').trim();
      if (!cleanLine) return;

      if (cleanLine.toLowerCase().includes('frontend') || cleanLine.toLowerCase().includes('ui')) {
        currentCategory = 'Frontend';
      } else if (cleanLine.toLowerCase().includes('backend') || cleanLine.toLowerCase().includes('server') || cleanLine.toLowerCase().includes('api')) {
        currentCategory = 'Backend';
      } else if (cleanLine.toLowerCase().includes('database') || cleanLine.toLowerCase().includes('db') || cleanLine.toLowerCase().includes('storage')) {
        currentCategory = 'Database';
      } else if (cleanLine.toLowerCase().includes('deploy') || cleanLine.toLowerCase().includes('hosting') || cleanLine.toLowerCase().includes('devops')) {
        currentCategory = 'DevOps';
      } else if (!Object.keys(categories).some(cat => cleanLine.toLowerCase().includes(cat.toLowerCase()))) {
        if (cleanLine.includes(':')) {
          const [tech, desc] = cleanLine.split(':');
          categories[currentCategory as keyof typeof categories].items.push(tech.trim());
        } else if (cleanLine.length > 3) {
          categories[currentCategory as keyof typeof categories].items.push(cleanLine);
        }
      }
    });

    return categories;
  };

  const parseTimeline = (timelineText: string) => {
    const weeks = [];
    const lines = timelineText.split('\n').filter(line => line.trim());
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].replace(/[#*-]/g, '').trim();
      if (line.toLowerCase().includes('week') && line.includes(':')) {
        const [weekPart, ...taskParts] = line.split(':');
        const weekNumber = weekPart.match(/\d+/)?.[0] || String(weeks.length + 1);
        const tasks = taskParts.join(':').trim();
        weeks.push({
          week: parseInt(weekNumber),
          title: `Week ${weekNumber}`,
          tasks: tasks,
          progress: Math.min(100, (parseInt(weekNumber) - 1) * 25)
        });
      }
    }

    return weeks.length > 0 ? weeks : [
      { week: 1, title: 'Week 1', tasks: 'Project Setup & Planning', progress: 0 },
      { week: 2, title: 'Week 2', tasks: 'Core Development', progress: 25 },
      { week: 3, title: 'Week 3', tasks: 'Feature Implementation', progress: 50 },
      { week: 4, title: 'Week 4', tasks: 'Testing & Deployment', progress: 75 }
    ];
  };

  const parseSuggestions = (suggestionsText: string) => {
    const lines = suggestionsText.split('\n').filter(line => line.trim());
    const suggestions = [];
    
    for (const line of lines) {
      const cleanLine = line.replace(/[#*-]/g, '').trim();
      if (cleanLine.length > 10) {
        suggestions.push(cleanLine);
      }
    }

    return suggestions.length > 0 ? suggestions : [
      'Consider implementing CI/CD pipelines from the start',
      'Set up proper error tracking and monitoring',
      'Plan for scalability in your architecture'
    ];
  };

  const techCategories = parseTechStack(techStack);
  const timelineData = parseTimeline(timeline);
  const suggestionsList = parseSuggestions(suggestions);

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Your AI-Generated Project Plan
          </h2>
          <p className="text-muted-foreground mt-1">Optimized tech stack and development roadmap</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
          >
            <Copy className="w-4 h-4 text-neon-green" />
            <span className="text-sm font-medium">Copy All</span>
          </button>
          <button
            onClick={exportToPDF}
            className="glass-dark rounded-xl px-4 py-2 flex items-center gap-2 hover:scale-105 transition-all duration-300 neon-glow"
          >
            <Download className="w-4 h-4 text-neon-purple" />
            <span className="text-sm font-medium">Export PDF</span>
          </button>
        </div>
      </div>

      <div id="stackwizard-output" className="space-y-8">
        {/* Tech Stack Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-blue" />
            Technology Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(techCategories).map(([category, data], index) => {
              const IconComponent = data.icon;
              if (data.items.length === 0) return null;
              
              return (
                <Card 
                  key={category} 
                  className="glass-dark border-0 animate-fade-in hover:scale-[1.02] transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <IconComponent className="w-4 h-4" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2">
                      {data.items.slice(0, 6).map((item, itemIndex) => (
                        <Badge 
                          key={itemIndex}
                          variant="secondary"
                          className="text-xs bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Timeline Gantt Chart */}
        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold font-sora flex items-center gap-2">
              <Clock className="w-5 h-5 text-neon-green" />
              Development Timeline
              <Badge variant="secondary" className="ml-auto bg-neon-green text-black">
                4 Weeks
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {timelineData.map((week, index) => (
                <div key={week.week} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className="bg-neon-blue/20 border-neon-blue text-neon-blue"
                      >
                        {week.title}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{week.tasks}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{week.progress}% complete</span>
                  </div>
                  <div className="relative">
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${week.progress}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggestions Grid */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold font-sora flex items-center gap-2">
            <Zap className="w-5 h-5 text-neon-orange" />
            Pro Tips & Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestionsList.map((suggestion, index) => (
              <Card 
                key={index}
                className="glass-dark border-0 animate-fade-in hover:scale-[1.02] transition-all duration-300 border-l-4 border-l-neon-orange"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {suggestion}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanOutput;
