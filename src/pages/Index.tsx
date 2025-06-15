
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ActionButtons from "@/components/ActionButtons";
import ThemeToggle from "@/components/ThemeToggle";
import StackWizard from "@/components/modules/StackWizard";
import PromptRefiner from "@/components/modules/PromptRefiner";
import CodeLens from "@/components/modules/CodeLens";
import SQLDoctor from "@/components/modules/SQLDoctor";
import TestCaseGen from "@/components/modules/TestCaseGen";

const Index = () => {
  const [activeModule, setActiveModule] = useState("stackwizard");

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
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="flex-shrink-0 p-6">
          <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="p-6 flex justify-between items-center border-b border-white/10">
            <div className="animate-float">
              <h1 className="text-3xl font-bold font-sora bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
                DevSynth AI Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                AI-Powered Developer Productivity Suite
              </p>
            </div>
            <div className="flex items-center gap-4">
              <ActionButtons />
              <ThemeToggle />
            </div>
          </header>

          {/* Module Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              {renderModule()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
