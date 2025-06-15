
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Download } from 'lucide-react';
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

  const formatGanttChart = (ganttText: string) => {
    const lines = ganttText.split('\n').filter(line => line.trim());
    const tableRows = lines.filter(line => 
      line.includes('|') || 
      line.toLowerCase().includes('task') || 
      line.toLowerCase().includes('week')
    );
    
    if (tableRows.length === 0) {
      return <div className="whitespace-pre-wrap">{ganttText}</div>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left p-2 text-neon-blue">Task</th>
              <th className="text-left p-2 text-neon-purple">Start Date</th>
              <th className="text-left p-2 text-neon-pink">End Date</th>
            </tr>
          </thead>
          <tbody>
            {tableRows.slice(1).map((row, index) => {
              const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
              if (cells.length >= 3) {
                return (
                  <tr key={index} className="border-b border-white/10">
                    <td className="p-2">{cells[0]}</td>
                    <td className="p-2">{cells[1]}</td>
                    <td className="p-2">{cells[2]}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-3 mb-4">
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

      <div id="stackwizard-output" className="space-y-4">
        <Card className="glass-dark border-0 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-sora flex items-center justify-between">
              Recommended Tech Stack
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-blue text-black animate-glow">
                AI Optimized
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground whitespace-pre-wrap">
              {techStack}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-sora flex items-center justify-between">
              Development Timeline
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-green text-black animate-glow">
                4 Weeks
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground whitespace-pre-wrap">
              {timeline}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-sora flex items-center justify-between">
              Gantt Chart
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-purple text-black animate-glow">
                Schedule
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground">
              {formatGanttChart(ganttChart)}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold font-sora flex items-center justify-between">
              Suggestions
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon-orange text-black animate-glow">
                Pro Tips
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground whitespace-pre-wrap">
              {suggestions}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanOutput;
