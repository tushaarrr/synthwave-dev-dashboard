
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Download, 
  HelpCircle, 
  Settings, 
  User, 
  LogOut,
  Bell,
  Search
} from "lucide-react";

interface TopNavProps {
  activeModule: string;
}

const TopNav = ({ activeModule }: TopNavProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getModuleName = (moduleId: string) => {
    const modules = {
      'stackwizard': 'StackWizard+',
      'promptrefiner': 'PromptRefiner',
      'codelens': 'CodeLens',
      'sqldoctor': 'SQLDoctor',
      'testcasegen': 'TestCaseGen',
    };
    return modules[moduleId as keyof typeof modules] || 'Dashboard';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNewProject = () => {
    // TODO: Implement new project functionality
    console.log('New project clicked');
  };

  const handleExportAll = () => {
    // TODO: Implement export all functionality
    console.log('Export all clicked');
  };

  return (
    <nav className="glass-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <h1 className="text-xl font-semibold">
            <span className="text-muted-foreground">DevSynth /</span>
            <span className="ml-2 text-white">{getModuleName(activeModule)}</span>
          </h1>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules, history..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neon-blue/50 focus:border-neon-blue transition-all duration-300 text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={handleNewProject}
            className="bg-gradient-to-r from-neon-blue to-neon-purple px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Project
          </button>
          
          <button
            onClick={handleExportAll}
            className="glass-dark px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-all duration-300 flex items-center gap-2 border border-white/10"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
          
          <button className="glass-dark p-2 rounded-xl hover:scale-105 transition-all duration-300 border border-white/10">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-orange rounded-full"></div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium truncate max-w-32">
                {user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="text-xs text-muted-foreground">Developer</div>
            </div>
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 glass-dark rounded-xl border border-white/10 py-2 z-50">
              <div className="px-4 py-3 border-b border-white/10">
                <div className="text-sm font-medium">{user?.email}</div>
                <div className="text-xs text-muted-foreground">Free Plan</div>
              </div>
              
              <div className="py-2">
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-3"
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-white/5 transition-colors flex items-center gap-3"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>
              
              <div className="border-t border-white/10 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
