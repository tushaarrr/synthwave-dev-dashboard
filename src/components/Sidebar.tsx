
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Zap, 
  FileText, 
  Code, 
  Settings as SettingsIcon, 
  Download,
  LogOut,
  User,
  FolderOpen,
  History
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar = ({ activeModule, onModuleChange }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { id: 'stackwizard', name: 'StackWizard+', icon: Zap, color: 'text-neon-blue' },
    { id: 'promptrefiner', name: 'PromptRefiner', icon: FileText, color: 'text-neon-purple' },
    { id: 'codelens', name: 'CodeLens', icon: Code, color: 'text-neon-green' },
    { id: 'sqldoctor', name: 'SQLDoctor', icon: SettingsIcon, color: 'text-neon-orange' },
    { id: 'testcasegen', name: 'TestCaseGen', icon: Download, color: 'text-neon-pink' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProjectsClick = () => {
    navigate('/projects');
  };

  const handlePromptHistoryClick = () => {
    navigate('/prompt-history');
  };

  const isProjectsActive = location.pathname === '/projects';
  const isPromptHistoryActive = location.pathname === '/prompt-history';

  return (
    <div className={`glass-dark rounded-2xl p-4 transition-all duration-500 ${isExpanded ? 'w-64' : 'w-20'} animate-slide-in flex flex-col h-full`}>
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

      <nav className="space-y-3 flex-1">
        {/* Saved Projects */}
        <button
          onClick={handleProjectsClick}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
            isProjectsActive 
              ? 'glass neon-glow transform scale-105' 
              : 'hover:bg-white/5'
          }`}
        >
          <FolderOpen className={`w-6 h-6 ${isProjectsActive ? 'text-neon-green animate-glow' : 'text-muted-foreground'}`} />
          <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium ${
            isProjectsActive ? 'text-white' : 'text-muted-foreground'
          }`}>
            Saved Projects
          </span>
        </button>

        {/* Prompt History */}
        <button
          onClick={handlePromptHistoryClick}
          className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
            isPromptHistoryActive 
              ? 'glass neon-glow transform scale-105' 
              : 'hover:bg-white/5'
          }`}
        >
          <History className={`w-6 h-6 ${isPromptHistoryActive ? 'text-neon-purple animate-glow' : 'text-muted-foreground'}`} />
          <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium ${
            isPromptHistoryActive ? 'text-white' : 'text-muted-foreground'
          }`}>
            Prompt History
          </span>
        </button>

        {/* Module Separators */}
        <div className="border-t border-white/10 my-4"></div>

        {modules.map((module) => (
          <button
            key={module.id}
            onClick={() => {
              navigate('/');
              onModuleChange(module.id);
            }}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:scale-105 ${
              activeModule === module.id && location.pathname === '/' 
                ? 'glass neon-glow transform scale-105' 
                : 'hover:bg-white/5'
            }`}
          >
            <module.icon className={`w-6 h-6 ${activeModule === module.id && location.pathname === '/' ? module.color : 'text-muted-foreground'} ${activeModule === module.id && location.pathname === '/' ? 'animate-glow' : ''}`} />
            <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium ${
              activeModule === module.id && location.pathname === '/' ? 'text-white' : 'text-muted-foreground'
            }`}>
              {module.name}
            </span>
          </button>
        ))}
      </nav>

      {user && (
        <div className="mt-auto pt-4 border-t border-white/10">
          <div className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 mb-3`}>
            <div className="flex items-center gap-3 p-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.email}</p>
              </div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-red-500/10 text-red-400 hover:text-red-300"
          >
            <LogOut className="w-5 h-5" />
            <span className={`${isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 font-medium`}>
              Sign Out
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
