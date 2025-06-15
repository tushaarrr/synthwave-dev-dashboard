
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
      'stackwizard': { name: 'StackWizard+', icon: '⚡', color: 'from-violet-400 to-purple-400' },
      'promptrefiner': { name: 'PromptRefiner', icon: '📝', color: 'from-blue-400 to-cyan-400' },
      'codelens': { name: 'CodeLens', icon: '🔍', color: 'from-emerald-400 to-teal-400' },
      'sqldoctor': { name: 'SQLDoctor', icon: '🔧', color: 'from-orange-400 to-red-400' },
      'testcasegen': { name: 'TestCaseGen', icon: '🧪', color: 'from-pink-400 to-rose-400' },
    };
    return modules[moduleId as keyof typeof modules] || { name: 'Dashboard', icon: '🏠', color: 'from-gray-400 to-gray-500' };
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
    <nav className="relative backdrop-blur-xl bg-black/20 border-b border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-blue-500/5 pointer-events-none"></div>
      
      {/* Left Section */}
      <div className="relative z-10 flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full blur animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moduleInfo.icon}</span>
            <div>
              <h1 className="text-lg font-semibold">
                <span className="text-gray-400">DevSynth /</span>
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
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search modules, history, commands..."
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 text-white placeholder-gray-400 backdrop-blur-sm hover:bg-white/10"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <kbd className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded-lg text-gray-400">⌘K</kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={handleNewProject}
            className="group relative px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={handleExportAll}
            className="group relative px-6 py-3 bg-white/5 border border-white/20 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
          
          <button className="group relative p-3 bg-white/5 border border-white/20 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Notifications */}
        <button className="relative p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group">
          <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="group flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition-opacity"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                {user?.email?.split('@')[0] || 'User'}
                <Crown className="w-3 h-3 text-yellow-400" />
              </div>
              <div className="text-xs text-gray-400">Pro Developer</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-72 backdrop-blur-xl bg-black/40 rounded-3xl border border-white/20 py-3 z-50 shadow-2xl">
              {/* User Info */}
              <div className="px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-blue-500 rounded-2xl blur opacity-50"></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {user?.email?.split('@')[0] || 'User'}
                      <Crown className="w-3 h-3 text-yellow-400" />
                    </div>
                    <div className="text-xs text-gray-400">{user?.email}</div>
                    <div className="inline-flex items-center gap-1 mt-1">
                      <Zap className="w-3 h-3 text-violet-400" />
                      <span className="text-xs text-violet-400 font-medium">Pro Plan</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-gray-300 hover:text-white"
                >
                  <Crown className="w-4 h-4 text-yellow-400" />
                  <span>Upgrade Plan</span>
                </button>
              </div>
              
              {/* Sign Out */}
              <div className="border-t border-white/10 pt-2">
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
