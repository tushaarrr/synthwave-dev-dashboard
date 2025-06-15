
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Zap, 
  FileText, 
  Code, 
  Settings as SettingsIcon, 
  Download,
  FolderOpen,
  History,
  CodeXml,
  Database,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ activeModule, onModuleChange, collapsed = false, onToggleCollapse }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const modules = [
    { id: 'stackwizard', name: 'StackWizard+', icon: Zap, color: 'text-neon-blue' },
    { id: 'promptrefiner', name: 'PromptRefiner', icon: FileText, color: 'text-neon-purple' },
    { id: 'codelens', name: 'CodeLens', icon: Code, color: 'text-neon-green' },
    { id: 'sqldoctor', name: 'SQLDoctor', icon: SettingsIcon, color: 'text-neon-orange' },
    { id: 'testcasegen', name: 'TestCaseGen', icon: Download, color: 'text-neon-pink' },
  ];

  const historyRoutes = [
    { path: '/projects', name: 'Projects', icon: FolderOpen, color: 'text-neon-green' },
    { path: '/prompt-history', name: 'Prompt History', icon: History, color: 'text-neon-purple' },
    { path: '/code-history', name: 'Code History', icon: CodeXml, color: 'text-neon-green' },
    { path: '/sql-history', name: 'SQL History', icon: Database, color: 'text-neon-orange' },
  ];

  const handleModuleClick = (moduleId: string) => {
    navigate('/dashboard');
    onModuleChange(moduleId);
  };

  const isOnDashboard = location.pathname === '/dashboard';

  return (
    <div className={`glass-dark border-r border-white/10 transition-all duration-300 flex flex-col h-full relative ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white animate-glow" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-sora bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  DevSynth AI
                </h1>
                <p className="text-xs text-muted-foreground">Developer Suite</p>
              </div>
            </div>
          )}
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-6">
        {/* AI Modules */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              AI Modules
            </h3>
          )}
          <div className="space-y-1">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                  activeModule === module.id && isOnDashboard
                    ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/10 shadow-lg' 
                    : 'hover:bg-white/5'
                }`}
                title={collapsed ? module.name : undefined}
              >
                <module.icon 
                  className={`w-5 h-5 transition-colors ${
                    activeModule === module.id && isOnDashboard 
                      ? `${module.color} animate-glow` 
                      : 'text-muted-foreground group-hover:text-white'
                  }`} 
                />
                {!collapsed && (
                  <span className={`font-medium transition-colors ${
                    activeModule === module.id && isOnDashboard 
                      ? 'text-white' 
                      : 'text-muted-foreground group-hover:text-white'
                  }`}>
                    {module.name}
                  </span>
                )}
                {!collapsed && activeModule === module.id && isOnDashboard && (
                  <div className="ml-auto w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* History & Projects */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Workspace
            </h3>
          )}
          <div className="space-y-1">
            {historyRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-105 group ${
                  location.pathname === route.path
                    ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/10 shadow-lg' 
                    : 'hover:bg-white/5'
                }`}
                title={collapsed ? route.name : undefined}
              >
                <route.icon 
                  className={`w-5 h-5 transition-colors ${
                    location.pathname === route.path 
                      ? `${route.color} animate-glow` 
                      : 'text-muted-foreground group-hover:text-white'
                  }`} 
                />
                {!collapsed && (
                  <span className={`font-medium transition-colors ${
                    location.pathname === route.path 
                      ? 'text-white' 
                      : 'text-muted-foreground group-hover:text-white'
                  }`}>
                    {route.name}
                  </span>
                )}
                {!collapsed && location.pathname === route.path && (
                  <div className="ml-auto w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/20">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="text-sm font-medium text-neon-green">System Online</div>
              <div className="text-xs text-muted-foreground">All modules operational</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
