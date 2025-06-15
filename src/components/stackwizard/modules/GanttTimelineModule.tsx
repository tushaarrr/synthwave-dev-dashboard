
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, ChevronDown, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TimelineWeek {
  week: number;
  title: string;
  tasks: string[];
  progress: number;
}

interface GanttTimelineModuleProps {
  timeline: string | TimelineWeek[];
  timelineData?: TimelineWeek[];
}

interface Task {
  id: string;
  name: string;
  duration: string;
  progress: number;
  startDate: string;
  endDate: string;
  dependencies: string[];
  subtasks?: Task[];
  status: 'pending' | 'in-progress' | 'completed';
}

const GanttTimelineModule = ({ timeline, timelineData }: GanttTimelineModuleProps) => {
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());

  const parseTimeline = (timelineInput: string | TimelineWeek[]): Task[] => {
    // If we have structured timeline data, use that instead
    if (timelineData && timelineData.length > 0) {
      return timelineData.map((week, index) => {
        const baseDate = new Date();
        const startDate = new Date(baseDate);
        startDate.setDate(baseDate.getDate() + ((week.week - 1) * 7));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return {
          id: `week-${week.week}`,
          name: week.title,
          duration: '7 days',
          progress: week.progress || Math.min(100, (week.week - 1) * 25),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          dependencies: week.week > 1 ? [`week-${week.week - 1}`] : [],
          status: week.week === 1 ? 'in-progress' : week.week <= 2 ? 'pending' : 'completed',
          subtasks: week.tasks.map((task, taskIndex) => ({
            id: `${week.week}-${taskIndex}`,
            name: task,
            duration: '2-3 days',
            progress: week.week === 1 ? 50 : 0,
            startDate: startDate.toLocaleDateString(),
            endDate: new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            dependencies: [],
            status: 'pending' as const
          }))
        };
      });
    }

    // Handle array format
    if (Array.isArray(timelineInput)) {
      return timelineInput.map((week, index) => {
        const baseDate = new Date();
        const startDate = new Date(baseDate);
        startDate.setDate(baseDate.getDate() + ((week.week - 1) * 7));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        return {
          id: `week-${week.week}`,
          name: week.title,
          duration: '7 days',
          progress: week.progress || Math.min(100, (week.week - 1) * 25),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          dependencies: week.week > 1 ? [`week-${week.week - 1}`] : [],
          status: week.week === 1 ? 'in-progress' : week.week <= 2 ? 'pending' : 'completed',
          subtasks: week.tasks.map((task, taskIndex) => ({
            id: `${week.week}-${taskIndex}`,
            name: task,
            duration: '2-3 days',
            progress: week.week === 1 ? 50 : 0,
            startDate: startDate.toLocaleDateString(),
            endDate: new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            dependencies: [],
            status: 'pending' as const
          }))
        };
      });
    }

    // Fallback to text parsing only if timeline is a string
    if (typeof timelineInput !== 'string') {
      return [];
    }

    const tasks: Task[] = [];
    const lines = timelineInput.split('\n').filter(line => line.trim());
    
    let currentWeek = 1;
    const baseDate = new Date();

    for (const line of lines) {
      const cleanLine = line.replace(/[#*-]/g, '').trim();
      if (cleanLine.toLowerCase().includes('week') && cleanLine.includes(':')) {
        const [weekPart, ...taskParts] = cleanLine.split(':');
        const weekNumber = weekPart.match(/\d+/)?.[0] || String(currentWeek);
        const taskName = taskParts.join(':').trim();
        
        const startDate = new Date(baseDate);
        startDate.setDate(baseDate.getDate() + ((parseInt(weekNumber) - 1) * 7));
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);

        tasks.push({
          id: `week-${weekNumber}`,
          name: taskName,
          duration: '7 days',
          progress: Math.min(100, (parseInt(weekNumber) - 1) * 25),
          startDate: startDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          dependencies: parseInt(weekNumber) > 1 ? [`week-${parseInt(weekNumber) - 1}`] : [],
          status: parseInt(weekNumber) === 1 ? 'in-progress' : parseInt(weekNumber) <= 2 ? 'pending' : 'completed',
          subtasks: [
            {
              id: `${weekNumber}-1`,
              name: 'Setup & Configuration',
              duration: '2 days',
              progress: parseInt(weekNumber) === 1 ? 75 : 0,
              startDate: startDate.toLocaleDateString(),
              endDate: new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              dependencies: [],
              status: 'in-progress'
            },
            {
              id: `${weekNumber}-2`,
              name: 'Development',
              duration: '4 days',
              progress: parseInt(weekNumber) === 1 ? 50 : 0,
              startDate: new Date(startDate.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              endDate: new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
              dependencies: [`${weekNumber}-1`],
              status: 'pending'
            }
          ]
        });
        currentWeek++;
      }
    }

    return tasks.length > 0 ? tasks : [
      {
        id: 'week-1',
        name: 'Project Setup & Planning',
        duration: '7 days',
        progress: 85,
        startDate: new Date().toLocaleDateString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        dependencies: [],
        status: 'in-progress'
      }
    ];
  };

  const toggleTaskExpansion = (taskId: string) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const tasks = parseTimeline(timeline);

  return (
    <Card className="glass-dark border-0 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-neon-green" />
          <div>
            <div className="text-2xl font-bold font-sora">Development Timeline</div>
            <div className="text-sm text-muted-foreground">Gantt-style project roadmap</div>
          </div>
          <Badge variant="secondary" className="ml-auto bg-neon-green/20 text-neon-green">
            {tasks.length} Phases
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={task.id} className="space-y-3">
              <Collapsible>
                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <CollapsibleTrigger 
                      onClick={() => toggleTaskExpansion(task.id)}
                      className="flex items-center gap-2"
                    >
                      {expandedTasks.has(task.id) ? 
                        <ChevronDown className="w-4 h-4" /> : 
                        <ChevronRight className="w-4 h-4" />
                      }
                      {getStatusIcon(task.status)}
                    </CollapsibleTrigger>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{task.name}</h4>
                        <Badge variant="outline" className="bg-neon-blue/20 border-neon-blue text-neon-blue text-xs">
                          {task.duration}
                        </Badge>
                        {task.dependencies.length > 0 && (
                          <Badge variant="secondary" className="text-xs bg-orange-500/20 text-orange-400">
                            After: {task.dependencies.length} task(s)
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>📅 {task.startDate} → {task.endDate}</span>
                        <span>📈 {task.progress}% complete</span>
                      </div>
                      
                      <div className="mt-2">
                        <Progress 
                          value={task.progress} 
                          className="h-2 bg-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <CollapsibleContent className="pl-8 space-y-2">
                  {task.subtasks?.map((subtask) => (
                    <div key={subtask.id} className="flex items-center justify-between p-3 rounded bg-white/5">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(subtask.status)}
                        <span className="text-sm">{subtask.name}</span>
                        <Badge variant="outline" className="text-xs">{subtask.duration}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{subtask.progress}%</span>
                        <Progress value={subtask.progress} className="w-16 h-1" />
                      </div>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GanttTimelineModule;
