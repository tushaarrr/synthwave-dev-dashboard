
import { useState } from "react";
import { useAuth } from "./auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  LogOut,
  Settings,
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
      'stackwizard': { name: 'StackWizard+', icon: '⚡' },
      'promptrefiner': { name: 'PromptRefiner', icon: '📝' },
      'codelens': { name: 'CodeLens', icon: '🔍' },
      'sqldoctor': { name: 'SQLDoctor', icon: '🔧' },
      'testcasegen': { name: 'TestCaseGen', icon: '🧪' },
    };
    return modules[moduleId as keyof typeof modules] || { name: 'Dashboard', icon: '🏠' };
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const moduleInfo = getModuleInfo(activeModule);

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{moduleInfo.icon}</span>
            <div>
              <h1 className="text-lg font-semibold text-white">
                <span className="text-orange-400">OneAI /</span>
                <span className="ml-2 text-orange-300 font-bold">
                  {moduleInfo.name}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - User Menu Only */}
      <div className="flex items-center">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800 border border-zinc-700 hover:border-orange-300/50 transition-all duration-300 hover:bg-zinc-700"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                {user?.email?.split('@')[0] || 'User'}
                <Crown className="w-3 h-3 text-orange-400" />
              </div>
              <div className="text-xs text-zinc-400">Pro Developer</div>
            </div>
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-72 bg-zinc-800 rounded-lg border border-zinc-700 py-3 z-50 shadow-xl">
              {/* User Info */}
              <div className="px-6 py-4 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {user?.email?.split('@')[0] || 'User'}
                      <Crown className="w-3 h-3 text-orange-400" />
                    </div>
                    <div className="text-xs text-zinc-400">{user?.email}</div>
                    <div className="inline-flex items-center gap-1 mt-1">
                      <span className="text-xs text-orange-400 font-medium">Pro Plan</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-zinc-700 transition-colors flex items-center gap-3 text-zinc-300 hover:text-white"
                >
                  <User className="w-4 h-4" />
                  <span>Profile Settings</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-zinc-700 transition-colors flex items-center gap-3 text-zinc-300 hover:text-white"
                >
                  <Settings className="w-4 h-4" />
                  <span>Preferences</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="w-full px-6 py-3 text-left hover:bg-zinc-700 transition-colors flex items-center gap-3 text-zinc-300 hover:text-white"
                >
                  <Crown className="w-4 h-4 text-orange-400" />
                  <span>Upgrade Plan</span>
                </button>
              </div>
              
              {/* Sign Out */}
              <div className="border-t border-zinc-700 pt-2">
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
