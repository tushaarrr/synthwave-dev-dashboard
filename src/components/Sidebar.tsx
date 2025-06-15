
import { useState } from "react";
import { 
  Zap, 
  FileText, 
  Code, 
  Settings as SettingsIcon, 
  Download 
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar = ({ activeModule, onModuleChange }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const modules = [
    { id: 'stackwizard', name: 'StackWizard+', icon: Zap, color: 'text-neon-blue' },
    { id: 'promptrefiner', name: 'PromptRefiner', icon: FileText, color: 'text-neon-purple' },
    { id: 'codelens', name: 'CodeLens', icon: Code, color: 'text-neon-green' },
    { id: 'sqldoctor', name: 'SQLDoctor', icon: SettingsIcon, color: 'text-neon-orange' },
    { id: 'testcasegen', name: 'TestCaseGen', icon: Download, color: 'text-neon-pink' },
  ];

  return (
    <div className={`glass-dark rounded-2xl p-4 transition-all duration-500 ${isExpanded ? 'w-64' : 'w-20'} animate-slide-in`}>
      <div className="flex items-center justify-between mb-8">
        <div className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          <h1 className="text-2xl font-bold font-sora bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
            DevSynth AI
          </h1>
          <p className="text-sm text-muted-foreground">Productivity Suite</p>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <Code className="w-5 h-5" />
        </button>
      </div>

      <nav className="space-y-3">
        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => onModuleChange(module.id)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              activeModule === module.id 
                ? 'glass neon-glow transform scale-105' 
                : 'hover:bg-white/5'
            }`}
          >
            <module.icon className={`w-6 h-6 ${activeModule === module.id ? module.color : 'text-muted-foreground'} ${activeModule === module.id ? 'animate-glow' : ''}`} />
            <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium ${
              activeModule === module.id ? 'text-white' : 'text-muted-foreground'
            }`}>
              {module.name}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
