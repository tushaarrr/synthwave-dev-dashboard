
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  Zap, 
  FileText, 
  Code, 
  Database, 
  Download,
  FolderOpen,
  History,
  CodeXml,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity
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
    { 
      id: 'stackwizard', 
      name: 'StackWizard+', 
      icon: Zap, 
      gradient: 'from-orange-500 to-orange-600',
      description: 'Tech stack & roadmap generation'
    },
    { 
      id: 'promptrefiner', 
      name: 'PromptRefiner', 
      icon: FileText, 
      gradient: 'from-orange-400 to-orange-500',
      description: 'AI prompt optimization'
    },
    { 
      id: 'codelens', 
      name: 'CodeLens', 
      icon: Code, 
      gradient: 'from-orange-500 to-orange-600',
      description: 'Code analysis & insights'
    },
    { 
      id: 'sqldoctor', 
      name: 'SQLDoctor', 
      icon: Database, 
      gradient: 'from-orange-400 to-orange-600',
      description: 'SQL optimization & debugging'
    },
    { 
      id: 'testcasegen', 
      name: 'TestCaseGen', 
      icon: Download, 
      gradient: 'from-orange-500 to-orange-600',
      description: 'Automated test generation'
    },
  ];

  const workspaceRoutes = [
    { 
      path: '/projects', 
      name: 'Projects', 
      icon: FolderOpen, 
      gradient: 'from-orange-400 to-orange-500',
      description: 'Manage your projects'
    },
    { 
      path: '/prompt-history', 
      name: 'Prompt History', 
      icon: History, 
      gradient: 'from-orange-500 to-orange-600',
      description: 'View prompt refinements'
    },
    { 
      path: '/code-history', 
      name: 'Code History', 
      icon: CodeXml, 
      gradient: 'from-orange-400 to-orange-600',
      description: 'Track code analysis'
    },
    { 
      path: '/sql-history', 
      name: 'SQL History', 
      icon: Database, 
      gradient: 'from-orange-500 to-orange-600',
      description: 'SQL analysis history'
    },
  ];

  const handleModuleClick = (moduleId: string) => {
    navigate('/dashboard');
    onModuleChange(moduleId);
  };

  const isOnDashboard = location.pathname === '/dashboard';

  return (
    <div className={`relative glass-dark border-r border-orange-200/20 transition-all duration-500 flex flex-col h-full shadow-lg ${
      collapsed ? 'w-20' : 'w-80'
    }`}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="relative p-6 border-b border-orange-200/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-50 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold font-sora gradient-text">
                  OneAI
                </h1>
                <p className="text-xs text-orange-200/60 font-medium">Developer Suite</p>
              </div>
            </div>
          )}
          
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="relative p-2 rounded-xl glass-dark border border-orange-200/30 hover:border-orange-300/50 transition-all duration-300 hover:scale-110 group"
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4 text-orange-300 group-hover:text-orange-200 transition-colors" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-orange-300 group-hover:text-orange-200 transition-colors" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-8 overflow-y-auto">
        {/* AI Modules */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="w-3 h-3" />
              AI Modules
            </h3>
          )}
          <div className="space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => handleModuleClick(module.id)}
                className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  activeModule === module.id && isOnDashboard
                    ? 'glass-dark border border-orange-300/40 shadow-lg' 
                    : 'hover:bg-orange-200/5 border border-transparent hover:border-orange-200/30'
                }`}
                title={collapsed ? module.name : undefined}
              >
                {/* Glow effect for active module */}
                {activeModule === module.id && isOnDashboard && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${module.gradient}/10 rounded-2xl`}></div>
                )}
                
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${module.gradient}/20 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <module.icon 
                      className={`w-5 h-5 transition-colors ${
                        activeModule === module.id && isOnDashboard 
                          ? 'text-orange-400' 
                          : 'text-orange-300 group-hover:text-orange-400'
                      }`} 
                    />
                    {activeModule === module.id && isOnDashboard && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient}/30 rounded-xl blur`}></div>
                    )}
                  </div>
                  
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className={`font-semibold transition-colors ${
                        activeModule === module.id && isOnDashboard 
                          ? 'text-orange-200' 
                          : 'text-orange-200/80 group-hover:text-orange-200'
                      }`}>
                        {module.name}
                      </div>
                      <div className="text-xs text-orange-200/50 mt-1">
                        {module.description}
                      </div>
                    </div>
                  )}
                  
                  {!collapsed && activeModule === module.id && isOnDashboard && (
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Workspace */}
        <div>
          {!collapsed && (
            <h3 className="text-xs font-semibold text-orange-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FolderOpen className="w-3 h-3" />
              Workspace
            </h3>
          )}
          <div className="space-y-2">
            {workspaceRoutes.map((route) => (
              <button
                key={route.path}
                onClick={() => navigate(route.path)}
                className={`group relative w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 hover:scale-105 ${
                  location.pathname === route.path
                    ? 'glass-dark border border-orange-300/40 shadow-lg' 
                    : 'hover:bg-orange-200/5 border border-transparent hover:border-orange-200/30'
                }`}
                title={collapsed ? route.name : undefined}
              >
                {/* Glow effect for active route */}
                {location.pathname === route.path && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${route.gradient}/10 rounded-2xl`}></div>
                )}
                
                <div className="relative z-10 flex items-center gap-4 w-full">
                  <div className={`relative p-3 rounded-xl bg-gradient-to-br ${route.gradient}/20 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <route.icon 
                      className={`w-5 h-5 transition-colors ${
                        location.pathname === route.path 
                          ? 'text-orange-400' 
                          : 'text-orange-300 group-hover:text-orange-400'
                      }`} 
                    />
                    {location.pathname === route.path && (
                      <div className={`absolute inset-0 bg-gradient-to-br ${route.gradient}/30 rounded-xl blur`}></div>
                    )}
                  </div>
                  
                  {!collapsed && (
                    <div className="flex-1 text-left">
                      <div className={`font-semibold transition-colors ${
                        location.pathname === route.path 
                          ? 'text-orange-200' 
                          : 'text-orange-200/80 group-hover:text-orange-200'
                      }`}>
                        {route.name}
                      </div>
                      <div className="text-xs text-orange-200/50 mt-1">
                        {route.description}
                      </div>
                    </div>
                  )}
                  
                  {!collapsed && location.pathname === route.path && (
                    <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="p-6 border-t border-orange-200/20">
          <div className="relative p-4 rounded-2xl bg-gradient-to-r from-green-500/10 via-green-500/10 to-green-500/10 border border-green-500/20 glass-dark shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full blur animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-green-400">System Online</div>
                <div className="text-xs text-orange-200/50">All modules operational</div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-green-500/5 rounded-2xl"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
