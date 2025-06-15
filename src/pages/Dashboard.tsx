
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import StackWizard from "@/components/modules/StackWizard";
import PromptRefiner from "@/components/modules/PromptRefiner";
import CodeLens from "@/components/modules/CodeLens";
import SQLDoctor from "@/components/modules/SQLDoctor";
import TestCaseGen from "@/components/modules/TestCaseGen";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [activeModule, setActiveModule] = useState("stackwizard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle navigation state for SQL Doctor
  useEffect(() => {
    if (location.state?.activeModule) {
      setActiveModule(location.state.activeModule);
    }
  }, [location.state]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-violet-500/30 border-t-violet-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = '/login';
    return null;
  }

  const renderModule = () => {
    switch (activeModule) {
      case "stackwizard":
        return <StackWizard />;
      case "promptrefiner":
        return <PromptRefiner />;
      case "codelens":
        return <CodeLens />;
      case "sqldoctor":
        return <SQLDoctor />;
      case "testcasegen":
        return <TestCaseGen />;
      default:
        return <StackWizard />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-black to-blue-950/20"></div>
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="relative z-10 flex h-screen">
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav activeModule={activeModule} />
          <div className="flex-1 p-8 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="animate-fade-in">
                {renderModule()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
