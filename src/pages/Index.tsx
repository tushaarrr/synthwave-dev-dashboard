
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import StackWizard from "@/components/modules/StackWizard";
import PromptRefiner from "@/components/modules/PromptRefiner";
import CodeLens from "@/components/modules/CodeLens";
import SQLDoctor from "@/components/modules/SQLDoctor";
import TestCaseGen from "@/components/modules/TestCaseGen";

const Index = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [activeModule, setActiveModule] = useState("stackwizard");

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
        <div className="w-auto flex-shrink-0 p-4">
          <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        </div>
        <div className="flex-1 p-6 overflow-auto">
          {renderModule()}
        </div>
      </div>
    </div>
  );
};

export default Index;
