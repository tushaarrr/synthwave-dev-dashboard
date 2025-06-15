
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
  Search,
  Zap,
  Crown,
  ChevronDown
} from "lucide-react";

interface TopNavProps {
  activeModule: string;
}

const TopNav = ({ activeModule }: TopNavProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getModuleInfo = (moduleId: string) => {
    const modules = {
      'stackwizard': { name: 'StackWizard+', icon: '⚡', color: 'from-orange-400 to-orange-600' },
      'promptrefiner': { name: 'PromptRefiner', icon: '📝', color: 'from-orange-400 to-orange-600' },
      'codelens': { name: 'CodeLens', icon: '🔍', color: 'from-orange-400 to-orange-600' },
      'sqldoctor': { name: 'SQLDoctor', icon: '🔧', color: 'from-orange-400 to-orange-600' },
      'testcasegen': { name: 'TestCaseGen', icon: '🧪', color: 'from-orange-400 to-orange-600' },
    };
    return modules[moduleId as keyof typeof modules] || { name: 'Dashboard', icon: '🏠', color: 'from-orange-400 to-orange-600' };
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
    console.log('New project clicked');
  };

  const handleExportAll = () => {
    console.log('Export all clicked');
  };

  const moduleInfo = getModuleInfo(activeModule);

  return (
    <nav className="relative glass-dark border-b border-orange-200/20 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-orange-500/5 pointer-events-none"></div>
      
      {/* Left Section */}
      <div className="relative z-10 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full blur animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moduleInfo.icon}</span>
            <div>
              <h1 className="text-lg font-semibold">
                <span className="text-orange-300">OneAI /</span>
                <span className={`ml-2 bg-gradient-to-r ${moduleInfo.color} bg-clip-text text-transparent font-bold`}>
                  {moduleInfo.name}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="hidden lg:flex flex-1 max-w-lg mx-8">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-300" />
          <input
            type="text"
            placeholder="Search modules, history, commands..."
            className="w-full pl-12 pr-4 py-3 glass-dark border border-orange-200/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300 text-orange-200 placeholder-orange-200/50 hover:border-orange-300/50"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-orange-400/20 border border-orange-400/30 rounded-lg text-orange-300">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleNewProject}
            className="group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={handleExportAll}
            className="group relative px-6 py-3 glass-dark border border-orange-200/30 rounded-2xl font-semibold hover:border-orange-300/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-orange-200 hover:text-orange-100"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
          
          <button className="group relative p-3 glass-dark border border-orange-200/30 rounded-2xl hover:border-orange-300/50 transition-all duration-300 hover:scale-105">
            <HelpCircle className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-2xl glass-dark border border-orange-200/30 hover:border-orange-300/50 transition-all duration-300 hover:scale-105 group">
          <Bell className="w-5 h-5 text-orange-300 group-hover:text-orange-200 transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="group flex items-center gap-3 p-3 rounded-2xl glass-dark border border-orange-200/30 hover:border-orange-300/50 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-orange-200 flex items-center gap-2">
                {user?.email?.split('@')[0] || 'User'}
                <Crown className="w-3 h-3 text-orange-400" />
              </div>
              <div className="text-xs text-orange-200/60">Pro Developer</div>
            </div>
            <ChevronDown className="w-4 h-4 text-orange-300 group-hover:text-orange-200 transition-colors" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-72 glass-dark rounded-3xl border border-orange-200/20 py-3 z-50 shadow-xl">
              {/* User Info */}
              <div className="px-6 py-4 border-b border-orange-200/20">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-50"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-orange-200 flex items-center gap-2">
                      {user?.email?.split('@')[0] || 'User'}
                      <Crown className="w-3 h-3 text-orange-400" />
                    </div>
                    <div className="text-xs text-orange-200/60">{user?.email}</div>
                    <div className="inline-flex items-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-orange-400" />
                      <span className="text-xs text-orange-400 font-medium">Pro Plan</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-orange-200/5 transition-colors flex items-center gap-3 text-orange-200/80 hover:text-orange-200"
                >
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-orange-200/5 transition-colors flex items-center gap-3 text-orange-200/80 hover:text-orange-200"
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-orange-200/5 transition-colors flex items-center gap-3 text-orange-200/80 hover:text-orange-200"
                >
                  <Crown className="w-4 h-4 text-orange-400" />
                  <span>Upgrade Plan</span>
                </button>
              </div>
              
              {/* Sign Out */}
              <div className="border-t border-orange-200/20 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full px-6 py-3 text-left hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors flex items-center gap-3"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
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
