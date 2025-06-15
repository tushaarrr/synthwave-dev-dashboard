
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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-neon-blue"></div>
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
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        <Sidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopNav activeModule={activeModule} />
          <div className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              {renderModule()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
